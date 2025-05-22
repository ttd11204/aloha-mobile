import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="AnnualPayment" />
        <Stack.Screen name="DaysPayment" />
        <Stack.Screen name="dashboard/Leaderboard" />
        {/* <Stack.Screen name="Leaderboard" /> */}
        <Stack.Screen name="SuccessQuest" />
        <Stack.Screen name="FailQuest" />
        <Stack.Screen name="SideQuest" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Clue" />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  )
}
