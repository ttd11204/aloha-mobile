import LeaderboardSection from '@/features/leaderboard/components/Leaderboard'
import MapComponent from '@/features/map/Map'
import React from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'

const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-8">
        <Text className="text-3xl font-bold text-center mb-8">
          Treasure Hunt Dashboard
        </Text>

        <View className="space-y-6">
          <MapComponent />
          <LeaderboardSection />

          {/* Uncomment if you want to add gallery later
          <View className="bg-amber-50 rounded-lg p-8">
            <Text className="text-2xl font-bold text-amber-800 mb-6 text-center">
              Adventure Gallery
            </Text>
            <MasonryGallery />
          </View>
          */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard
