import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRespondToFriendRequestMutation } from '../api/chatApi'
import { FriendRequest } from '../api/chatApi'

interface FriendRequestItemProps {
  request: FriendRequest
  userId: string
}

export default function FriendRequestItem({ request, userId }: FriendRequestItemProps) {
  const [isResponding, setIsResponding] = useState(false)
  const [respondToRequest] = useRespondToFriendRequestMutation()

  const handleResponse = async (accepted: boolean) => {
    setIsResponding(true)
    
    try {
      const result = await respondToRequest({
        userId: userId,
        requestId: request.id,
        accepted: accepted
      }).unwrap()

      Alert.alert(
        'Success', 
        result.message || `Friend request ${accepted ? 'accepted' : 'rejected'} successfully!`
      )
    } catch (error: any) {
      console.error('Respond to friend request error:', error)
      Alert.alert('Error', 'Something went wrong. Please try again.')
    } finally {
      setIsResponding(false)
    }
  }

  return (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-center mb-3">
        <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
          <Text className="text-xl">👤</Text>
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-800">
            {request.fromUser.userName}
          </Text>
          <Text className="text-gray-500 text-sm">
            {request.fromUser.email}
          </Text>
        </View>
      </View>
      
      <Text className="text-gray-600 text-sm mb-4">
        Wants to connect with you
      </Text>
      
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => handleResponse(false)}
          disabled={isResponding}
          className="flex-1 py-2 rounded-lg border border-gray-300"
        >
          {isResponding ? (
            <ActivityIndicator size="small" color="#6b7280" />
          ) : (
            <Text className="text-center font-medium text-gray-700">Decline</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleResponse(true)}
          disabled={isResponding}
          className="flex-1 py-2 rounded-lg bg-blue-500"
        >
          {isResponding ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-center font-medium text-white">Accept</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
} 