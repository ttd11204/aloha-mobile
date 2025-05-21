// components/treasure-hunt/LoadingState.tsx
import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const LoadingState = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#4299e1" />
      <Text className="mt-4 text-blue-500">Loading treasure hunt...</Text>
    </View>
  )
}

export default LoadingState