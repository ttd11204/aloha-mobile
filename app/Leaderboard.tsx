import React from 'react'
import Leaderboard from '@/features/leaderboard/components/Leaderboard'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import MapComponent from '@/features/map/Map'

export default function LeaderboardScreen() {
  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1 px-4 py-8">
          <Text className="text-3xl font-bold text-center mb-8">
            Treasure Hunt Dashboard
          </Text>

          <View>
            <View className="mb-10">
              <MapComponent />
            </View>
            <View className="mb-32">
              <Leaderboard />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  )
}
