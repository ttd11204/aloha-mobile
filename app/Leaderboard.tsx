import React from 'react'
import Leaderboard from '@/features/leaderboard/components/Leaderboard'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function LeaderboardScreen() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    </NavigationContainer>
  )
}
