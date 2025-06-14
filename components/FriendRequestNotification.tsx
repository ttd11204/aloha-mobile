import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { useGetFriendRequestsQuery } from '@/features/chat/api/chatApi'

interface FriendRequestNotificationProps {
  onPress?: () => void
}

export default function FriendRequestNotification({ onPress }: FriendRequestNotificationProps) {
  const [userId, setUserId] = useState<string | null>(null)
  const [pulseAnim] = useState(new Animated.Value(1))

  const { data: friendRequests = [], isLoading } = useGetFriendRequestsQuery(userId || '', {
    skip: !userId,
    pollingInterval: 30000 // Poll every 30 seconds for new requests
  })

  useEffect(() => {
    const getUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        if (token) {
          const decoded: any = jwtDecode(token)
          setUserId(decoded?.sub || null)
        }
      } catch (error) {
        console.error('Error getting user ID:', error)
      }
    }
    getUserId()
  }, [])

  // Pulse animation for notification badge
  useEffect(() => {
    if (friendRequests.length > 0) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      )
      pulse.start()
      
      return () => {
        pulse.stop()
      }
    }
  }, [friendRequests.length, pulseAnim])

  if (isLoading || !userId || friendRequests.length === 0) {
    return null
  }

  return (
    <TouchableOpacity onPress={onPress} className="relative">
      <MaterialIcons name="people" size={24} color="white" />
      <Animated.View
        style={{
          transform: [{ scale: pulseAnim }],
        }}
        className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center"
      >
        <Text className="text-white text-xs font-bold">
          {friendRequests.length > 9 ? '9+' : friendRequests.length}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
} 