import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FriendRequest } from '../api/chatApi'

interface FriendRequestItemProps {
  request: FriendRequest
  onAccept: (requestId: string) => void
  onDecline: (requestId: string) => void
  isProcessing: boolean
}

const FriendRequestItem: React.FC<FriendRequestItemProps> = ({
  request,
  onAccept,
  onDecline,
  isProcessing
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
      
      if (diffInHours < 1) return 'Just now'
      if (diffInHours < 24) return `${diffInHours}h ago`
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
      return date.toLocaleDateString()
    } catch {
      return 'Recently'
    }
  }

  return (
    <View className="bg-white rounded-xl p-4 mb-2 flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
          {request.fromUserAvatarUrl ? (
            <Text className="text-lg">👤</Text>
          ) : (
            <Ionicons name="person" size={20} color="#3b82f6" />
          )}
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-800" numberOfLines={1}>
            {request.fromUserFullname || request.fromUserEmail || 'Unknown User'}
          </Text>
          <Text className="text-gray-500 text-sm">{formatDate(request.requestedAt)}</Text>
        </View>
      </View>
      
      <View className="flex-row gap-2">
        <TouchableOpacity 
          onPress={() => onDecline(request.requestId)}
          className="bg-gray-200 px-4 py-2 rounded-lg"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#6b7280" />
          ) : (
            <Text className="text-gray-700 font-medium">Decline</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onAccept(request.requestId)}
          className="bg-blue-500 px-4 py-2 rounded-lg"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-medium">Accept</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FriendRequestItem 