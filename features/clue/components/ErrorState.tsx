import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

type ErrorStateProps = {
  onRetry?: () => void
  message?: string
}

const ErrorState = ({
  onRetry = () => router.replace('/Leaderboard'),
  message = 'Failed to load clues. Please check your connection and try again.'
}: ErrorStateProps) => {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Ionicons name="alert-circle" size={48} color="#e53e3e" />
      <Text className="mt-4 text-red-500 text-lg text-center">{message}</Text>
      <TouchableOpacity
        className="mt-4 bg-blue-500 py-2 px-6 rounded-lg"
        onPress={onRetry}
      >
        <Text className="text-white font-medium">Retry</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ErrorState
