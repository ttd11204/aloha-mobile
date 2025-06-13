import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { 
  useAddFriendMutation, 
  useGetFriendsQuery,
  useGetFriendRequestsQuery 
} from '../api/chatApi'

// Custom Toast Component
interface ToastProps {
  visible: boolean
  message: string
  type: 'success' | 'error'
  onHide: () => void
}

const Toast: React.FC<ToastProps> = ({ visible, message, type, onHide }) => {
  const translateY = new Animated.Value(-100)

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onHide())
    }
  }, [visible])

  if (!visible) return null

  return (
    <Animated.View 
      style={{
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        zIndex: 9999,
        transform: [{ translateY }],
      }}
    >
      <View className={`rounded-xl p-4 flex-row items-center shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}>
        <Ionicons 
          name={type === 'success' ? 'checkmark-circle' : 'alert-circle'} 
          size={24} 
          color="white" 
        />
        <Text className="text-white font-medium ml-3 flex-1">{message}</Text>
      </View>
    </Animated.View>
  )
}

export default function ChatScreen() {
  const [searchEmail, setSearchEmail] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [showAddFriendModal, setShowAddFriendModal] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  
  // Toast state
  const [toast, setToast] = useState<{
    visible: boolean
    message: string
    type: 'success' | 'error'
  }>({
    visible: false,
    message: '',
    type: 'success'
  })

  const [addFriend, { isLoading: addingFriend }] = useAddFriendMutation()
  const { data: friends = [], isLoading: loadingFriends } = useGetFriendsQuery(userId || '', {
    skip: !userId
  })
  const { data: friendRequests = [], isLoading: loadingRequests } = useGetFriendRequestsQuery(userId || '', {
    skip: !userId
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

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ visible: true, message, type })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }))
  }

  const handleAddFriend = async () => {
    if (!searchEmail.trim()) {
      showToast('Please enter an email address', 'error')
      return
    }

    if (!userId) {
      showToast('You need to be logged in to add friends', 'error')
      return
    }

    setIsSearching(true)
    
    const requestData = { 
      userId: userId,
      targetEmail: searchEmail.trim().toLowerCase() 
    }
    
    try {
      const result = await addFriend(requestData).unwrap()
      
      showToast(result.message || 'Friend request sent successfully!', 'success')
      setSearchEmail('')
      setShowAddFriendModal(false)
    } catch (error: any) {
      console.error('Friend request failed:', {
        status: error.status,
        data: error.data,
        email: searchEmail
      })
      
      // Handle different error cases with custom toast
      let errorMessage = 'Something went wrong. Please try again later.'
      
      if (error.status === 404) {
        errorMessage = 'No user found with this email address'
      } else if (error.status === 400) {
        errorMessage = 'Cannot send friend request to this user'
      } else if (error.status === 409) {
        errorMessage = 'You are already friends with this user'
      } else if (error.status === 401) {
        errorMessage = 'You need to login again'
      } else if (error.data?.message) {
        errorMessage = error.data.message
      }
      
      showToast(errorMessage, 'error')
      setShowAddFriendModal(false)
    } finally {
      setIsSearching(false)
    }
  }

  const mockFriends = [
    { id: '1', name: 'John Doe', email: 'john@example.com', avatar: '👨‍💼', lastMessage: 'Hey! How are you?', timestamp: '2 min ago', unread: 2 },
    { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '👩‍🎨', lastMessage: 'See you tomorrow!', timestamp: '1 hour ago', unread: 0 },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatar: '👨‍💻', lastMessage: 'Thanks for the help', timestamp: '3 hours ago', unread: 1 }
  ]

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#0095ff" />
      
      {/* Toast Notification */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
      
      {/* Header with proper status bar spacing */}
      <LinearGradient
        colors={['#0095ff', '#0080e6']}
        className="pb-4"
        style={{ paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 24 + 20 }}
      >
        <View className="flex-row items-center justify-between px-4">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-semibold">Messages</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => setShowAddFriendModal(true)}
            className="bg-white/20 rounded-full p-2"
          >
            <MaterialIcons name="person-add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Friend Requests Section */}
      {friendRequests.length > 0 && (
        <View className="bg-blue-50 px-4 py-3 border-b border-gray-200">
          <Text className="text-blue-600 font-medium mb-2">Friend Requests ({friendRequests.length})</Text>
          <TouchableOpacity 
            onPress={() => {
              // TODO: Implement Friend Requests screen
              showToast('Friend requests feature will be available soon!', 'success')
            }}
            className="flex-row items-center"
          >
            <Ionicons name="people" size={20} color="#3b82f6" />
            <Text className="text-blue-600 ml-2">View all requests</Text>
            <Ionicons name="chevron-forward" size={16} color="#3b82f6" className="ml-1" />
          </TouchableOpacity>
        </View>
      )}

      {/* Chat List */}
      <ScrollView className="flex-1">
        {loadingFriends ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#0095ff" />
            <Text className="text-gray-500 mt-2">Loading conversations...</Text>
          </View>
        ) : mockFriends.length > 0 ? (
          <View className="px-4 py-2">
            {mockFriends.map((friend) => (
              <TouchableOpacity 
                key={friend.id}
                className="flex-row items-center py-4 border-b border-gray-100"
                onPress={() => {
                  // TODO: Implement Chat Conversation screen
                  showToast(`Start conversation with ${friend.name}`, 'success')
                }}
              >
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">{friend.avatar}</Text>
                </View>
                
                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="font-semibold text-gray-800">{friend.name}</Text>
                    <Text className="text-xs text-gray-500">{friend.timestamp}</Text>
                  </View>
                  <Text className="text-gray-600 text-sm" numberOfLines={1}>
                    {friend.lastMessage}
                  </Text>
                </View>
                
                {friend.unread > 0 && (
                  <View className="bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center ml-2">
                    <Text className="text-white text-xs font-medium">
                      {friend.unread > 9 ? '9+' : friend.unread}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="chatbubbles-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-500 text-lg mt-4 mb-2">No conversations yet</Text>
            <Text className="text-gray-400 text-center px-8">
              Start by adding friends to begin chatting
            </Text>
            <TouchableOpacity 
              onPress={() => setShowAddFriendModal(true)}
              className="bg-blue-500 px-6 py-3 rounded-full mt-6"
            >
              <Text className="text-white font-medium">Add Friends</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Add Friend Modal */}
      <Modal
        visible={showAddFriendModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddFriendModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 bg-black/50 justify-center items-center p-6"
        >
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">Add Friend</Text>
              <TouchableOpacity onPress={() => setShowAddFriendModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <Text className="text-gray-600 mb-4">
              Enter your friend's email address to send a friend request
            </Text>
            
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <MaterialIcons name="email" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-3 text-base text-black"
                  placeholder="friend@example.com"
                  placeholderTextColor="#9ca3af"
                  value={searchEmail}
                  onChangeText={setSearchEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
            
            <View className="flex-row gap-3">
              <TouchableOpacity 
                onPress={() => setShowAddFriendModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300"
                disabled={isSearching}
              >
                <Text className="text-center font-medium text-gray-700">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleAddFriend}
                className="flex-1 py-3 rounded-xl bg-blue-500"
                disabled={isSearching || !searchEmail.trim()}
              >
                {isSearching ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-center font-medium text-white">Send Request</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
} 