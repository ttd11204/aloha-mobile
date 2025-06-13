import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useColorScheme } from '@/hooks/useColorScheme'
import { store } from '@/store'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import './global.css'
import Sidebar from '@/components/SideBar'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })
  const router = useRouter()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  // Enhanced deep link handling for payment callbacks
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url
      console.log('Received deep link:', url)
      
      // Handle path-based payment callback URLs like: aloha://payment-callback/payment-status/
      if (url.startsWith('aloha://payment-callback/payment-status/')) {
        const status = url.split('/').pop() || 'success'
        console.log('Payment callback status:', status)
        
        // Direct navigation to status-specific route - Expo Router will handle it
        // The route files will then redirect to PaymentResult
        return; // Let Expo Router handle the routing naturally
      }
      // Handle query-based payment callback URLs like: aloha://payment-callback?status=success
      else if (url.startsWith('aloha://payment-callback')) {
        // Parse URL parameters more robustly
        const urlObj = new URL(url.replace('aloha://', 'https://dummy.com/'))
        const status = urlObj.searchParams.get('status') || 'success'
        const transactionId = urlObj.searchParams.get('transactionId')
        const amount = urlObj.searchParams.get('amount')
        
        // Navigate with all available parameters
        const params: any = { status }
        if (transactionId) params.transactionId = transactionId
        if (amount) params.amount = amount
        
        router.push({ pathname: '/PaymentResult', params })
      }
      // Handle universal links as fallback
      else if (url.includes('/payment-callback') || url.includes('/app/payment-callback')) {
        try {
          const urlObj = new URL(url)
          const status = urlObj.searchParams.get('status') || 'success'
          const transactionId = urlObj.searchParams.get('transactionId')
          
          const params: any = { status }
          if (transactionId) params.transactionId = transactionId
          
          router.push({ pathname: '/PaymentResult', params })
        } catch (error) {
          console.error('Error parsing universal link:', error)
          router.push({ pathname: '/PaymentResult', params: { status: 'error' } })
        }
      }
    }
    
    const subscription = Linking.addEventListener('url', handleDeepLink)
    
    // Handle app launch from deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url })
      }
    })
    
    return () => {
      subscription.remove()
    }
  }, [router])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Payment" />
          <Stack.Screen name="Leaderboard" />
          <Stack.Screen name="SuccessQuest" />
          <Stack.Screen name="FailQuest" />
          <Stack.Screen name="SideQuest" />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Chat" options={{ headerShown: false }} />
          <Stack.Screen name="ChatConversation" options={{ headerShown: false }} />
          <Stack.Screen name="TestButton" options={{ headerShown: false }} />
          <Stack.Screen name="Clue" />
          <Stack.Screen name="StreetView" />
          <Stack.Screen name="EventDetails" />
          <Stack.Screen name="PaymentResult" />
          <Stack.Screen 
            name="payment-callback" 
            options={{ 
              headerShown: false,
              title: 'Payment Processing'
            }} 
          />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </Provider>
  )
}
