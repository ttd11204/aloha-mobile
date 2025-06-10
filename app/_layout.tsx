import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'

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

  // Lắng nghe deep link aloha://payment-callback
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url
      if (url.startsWith('aloha://payment-callback')) {
        const match = url.match(/status=([^&]+)/)
        const status = match ? match[1] : 'success'
        router.push({ pathname: '/PaymentResult', params: { status } })
      }
    }
    const subscription = Linking.addEventListener('url', handleDeepLink)
    Linking.getInitialURL().then((url) => {
      if (url && url.startsWith('aloha://payment-callback')) {
        const match = url.match(/status=([^&]+)/)
        const status = match ? match[1] : 'success'
        router.push({ pathname: '/PaymentResult', params: { status } })
      }
    })
    return () => {
      subscription.remove()
    }
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Payment" />
        <Stack.Screen name="Leaderboard" />
        {/* <Stack.Screen name="Leaderboard" /> */}
        <Stack.Screen name="SuccessQuest" />
        <Stack.Screen name="FailQuest" />
        <Stack.Screen name="SideQuest" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Clue" />
        <Stack.Screen name="StreetView" />
        <Stack.Screen name="EventDetails" />
        <Stack.Screen name="PaymentResult" />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  )
}
