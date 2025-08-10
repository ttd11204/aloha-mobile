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
  useGetFriendRequestsQuery,
  useRespondToFriendRequestMutation,
  useCreateChatRoomMutation,
  useGetChatRoomsQuery,
  type Friend,
  type FriendRequest,
  type ChatRoom
} from '../api/chatApi'
import FriendRequestItem from './FriendRequestItem'

// Custom Toast Component
interface ToastProps {
  visible: boolean
  message: string
  type: 'success' | 'error'
  onHide: () => void
}

const Toast: React.FC<ToastProps> = ({ visible, message, type, onHide }) => {
  const translateY = React.useRef(new Animated.Value(-100)).current
  const timeoutRef = React.useRef<number | null>(null)

  React.useLayoutEffect(() => {
    if (visible) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      translateY.setValue(-100)
      
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()

      // Set timeout for auto hide
      timeoutRef.current = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide())
      }, 3000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [visible, translateY, onHide])

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
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(null)
  
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
  const [respondToFriendRequest] = useRespondToFriendRequestMutation()
  const [createChatRoom] = useCreateChatRoomMutation()
  const { data: friends = [], isLoading: loadingFriends, refetch: refetchFriends } = useGetFriendsQuery(userId || '', {
    skip: !userId
  })
  const { data: friendRequests = [], isLoading: loadingRequests, refetch: refetchRequests } = useGetFriendRequestsQuery(userId || '', {
    skip: !userId
  })
  // Temporarily commented out chat rooms API
  // const { data: chatRooms = [], isLoading: loadingChatRooms, refetch: refetchChatRooms } = useGetChatRoomsQuery(userId || '', {
  //   skip: !userId
  // })
  const chatRooms: any[] = [] // Temporary empty array
  const loadingChatRooms = false

  useEffect(() => {
    const getUserId = async () => {
      try {
        console.log('=== DEBUG GET USER ID ===')
        const token = await AsyncStorage.getItem('accessToken')
        console.log('Token exists:', !!token)
        
        if (token) {
          const decoded: any = jwtDecode(token)
          console.log('Decoded token:', decoded)
          console.log('User ID from token:', decoded?.sub)
          setUserId(decoded?.sub || null)
        } else {
          console.log('No access token found')
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

  const handleFriendRequest = async (requestId: string, accepted: boolean) => {
    console.log('=== DEBUG FRIEND REQUEST RESPONSE ===')
    console.log('Request ID:', requestId)
    console.log('Accepted:', accepted)
    console.log('User ID:', userId)

    if (!userId) {
      console.log('ERROR: No userId for friend request response')
      showToast('You need to be logged in', 'error')
      return
    }

    if (!requestId) {
      console.log('ERROR: No requestId provided')
      showToast('Invalid request', 'error')
      return
    }

    setProcessingRequestId(requestId)
    
    try {
      const requestData = {
        userId: userId,
        requestId: requestId,
        accepted: accepted
      }
      console.log('Friend request response data:', requestData)
      
      const result = await respondToFriendRequest(requestData).unwrap()
      
      console.log('Friend request response result:', result)
      showToast(result.message || `Friend request ${accepted ? 'accepted' : 'rejected'}!`, 'success')
      
      // Refresh both friends and requests lists
      await Promise.all([
        refetchRequests(),
        accepted ? refetchFriends() : Promise.resolve()
      ])
      
    } catch (error: any) {
      console.log('=== FRIEND REQUEST RESPONSE ERROR ===')
      console.error('Full error:', error)
      console.log('Error status:', error.status)
      console.log('Error data:', error.data)
      console.log('Error message:', error.message)
      
      let errorMessage = 'Failed to respond to friend request'
      if (error.status === 404) {
        errorMessage = 'Friend request not found'
      } else if (error.status === 400) {
        errorMessage = 'Invalid request'
      } else if (error.status === 401) {
        errorMessage = 'You need to login again'
      } else if (error.data?.message) {
        errorMessage = error.data.message
      }
      
      showToast(errorMessage, 'error')
    } finally {
      setProcessingRequestId(null)
    }
  }

  const handleStartChat = async (friendUserId: string, friendName: string, friendEmail?: string) => {
    console.log('=== DEBUG START CHAT ===')
    console.log('Current userId:', userId)
    console.log('Target friendUserId:', friendUserId)
    console.log('Friend name:', friendName)

    if (!userId) {
      console.log('❌ ERROR: No userId found')
      showToast('Bạn cần đăng nhập để chat', 'error')
      return
    }

    if (!friendUserId) {
      console.log('❌ ERROR: No friendUserId provided')
      showToast('Không tìm thấy thông tin bạn bè', 'error')
      return
    }

    try {
      console.log('🚀 Creating/Getting chat room...')
      
      const requestData = {
        userId: userId,
        targetUserId: friendUserId
      }
      console.log('📤 POST /Chat/room request data:', requestData)

      // Step 1: Call POST /Chat/room to create or get existing room
      const roomResponse = await createChatRoom(requestData).unwrap()
      
      console.log('✅ Chat room response:', roomResponse)
      console.log('Room ID:', roomResponse.id)
      console.log('Room Name:', roomResponse.name)
      console.log('Is Group:', roomResponse.isGroup)
      console.log('Created At:', roomResponse.createdAt)

      // Step 2: Navigate to ChatConversation with the room ID
      console.log('🧭 Navigating to ChatConversation with chatRoomId:', roomResponse.id)
      
      router.push({
        pathname: '/ChatConversation',
        params: {
          chatRoomId: roomResponse.id,
          chatRoomName: roomResponse.name || friendName,
          friendEmail: friendEmail || friendName,
          friendId: friendUserId
        }
      } as any)

      console.log('✅ Navigation completed')
      
    } catch (error: any) {
      console.log('=== ❌ CREATE CHAT ROOM ERROR ===')
      console.error('Full error object:', error)
      console.log('Error status:', error.status)
      console.log('Error data:', error.data)
      console.log('Error message:', error.message)
      
      let errorMessage = 'Không thể tạo phòng chat'
      
      if (error.status === 401) {
        errorMessage = 'Bạn cần đăng nhập lại'
      } else if (error.status === 404) {
        errorMessage = 'Không tìm thấy người dùng'
      } else if (error.status === 400) {
        errorMessage = 'Thông tin không hợp lệ'
      } else if (error.data?.message) {
        errorMessage = error.data.message
      }
      
      if (error.data) {
        console.log('Server response data:', JSON.stringify(error.data, null, 2))
      }
      
      showToast(errorMessage, 'error')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  // Combine chat rooms and friends for display
  const conversationsForDisplay = React.useMemo(() => {
    // Return empty array if data is still loading or undefined
    if (loadingFriends || loadingChatRooms || !friends || !chatRooms) {
      return []
    }

    const conversations: Array<{
      id: string
      name: string
      email?: string
      avatar: string
      lastMessage: string
      timestamp: string
      unread: number
      type: 'chatroom' | 'friend'
      chatRoomId?: string
    }> = []

    // Add existing chat rooms
    if (Array.isArray(chatRooms)) {
      chatRooms.forEach(room => {
        if (room && !room.isGroup && room.id && room.name) {
          conversations.push({
            id: room.id,
            name: room.name || 'Chat Room',
            avatar: '💬',
            lastMessage: 'Continue conversation...',
            timestamp: formatDate(room.createdAt || new Date().toISOString()),
            unread: 0,
            type: 'chatroom',
            chatRoomId: room.id
          })
        }
      })
    }

    // Add friends without chat rooms
    if (Array.isArray(friends)) {
      friends.forEach(friend => {
        if (friend && friend.friendUserId) {
          const friendName = friend.friendFullname || friend.friendEmail || ''
          const hasExistingRoom = Array.isArray(chatRooms) && chatRooms.some(room => 
            room &&
            !room.isGroup && 
            room.name && 
            friendName && 
            room.name.includes(friendName)
          )
          
          if (!hasExistingRoom) {
            conversations.push({
              id: friend.friendUserId,
              name: friendName || 'Unknown Friend',
              email: friend.friendEmail,
              avatar: friend.friendAvatarUrl || '👤',
              lastMessage: 'Click to start chatting!',
              timestamp: formatDate(friend.friendsSince || new Date().toISOString()),
              unread: 0,
              type: 'friend'
            })
          }
        }
      })
    }

    return conversations.sort((a, b) => {
      try {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      } catch {
        return 0
      }
    })
  }, [friends, chatRooms, loadingFriends, loadingChatRooms])

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
          
          <View className="relative">
            <TouchableOpacity 
              onPress={() => setShowAddFriendModal(true)}
              className="bg-white/20 rounded-full p-2"
            >
              <MaterialIcons name="person-add" size={24} color="white" />
            </TouchableOpacity>
            {friendRequests.length > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {friendRequests.length > 9 ? '9+' : friendRequests.length}
                </Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      {/* Friend Requests Section */}
      {friendRequests.length > 0 && (
        <View className="bg-blue-50 px-4 py-3 border-b border-gray-200">
          <Text className="text-blue-600 font-medium mb-3">Friend Requests ({friendRequests.length})</Text>
          
          {friendRequests.slice(0, 2).map((request) => (
            <FriendRequestItem
              key={request.requestId}
              request={request}
              onAccept={(requestId) => handleFriendRequest(requestId, true)}
              onDecline={(requestId) => handleFriendRequest(requestId, false)}
              isProcessing={processingRequestId === request.requestId}
            />
          ))}
          
          {friendRequests.length > 2 && (
            <TouchableOpacity className="flex-row items-center justify-center pt-2">
              <Text className="text-blue-600 font-medium">View all {friendRequests.length} requests</Text>
              <Ionicons name="chevron-down" size={16} color="#3b82f6" className="ml-1" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Chat List */}
      <ScrollView className="flex-1">
        {(loadingFriends || loadingChatRooms) ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#0095ff" />
            <Text className="text-gray-500 mt-2">Loading conversations...</Text>
          </View>
        ) : conversationsForDisplay.length > 0 ? (
          <View className="px-4 py-2">
            {conversationsForDisplay.map((conversation) => (
              <TouchableOpacity 
                key={conversation.id}
                className="flex-row items-center py-4 border-b border-gray-100"
                onPress={() => {
                  if (conversation.type === 'chatroom') {
                    router.push({
                      pathname: '/ChatConversation',
                      params: {
                        chatRoomId: conversation.chatRoomId || conversation.id,
                        chatRoomName: conversation.name,
                        friendEmail: conversation.email || conversation.name,
                        friendId: conversation.id
                      }
                    } as any)
                  } else {
                    handleStartChat(conversation.id, conversation.name, conversation.email)
                  }
                }}
              >
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                  {typeof conversation.avatar === 'string' && (conversation.avatar.length === 2 || conversation.avatar === '💬') ? (
                    <Text className="text-2xl">{conversation.avatar}</Text>
                  ) : (
                    <Ionicons name="person" size={24} color="#3b82f6" />
                  )}
                </View>
                
                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="font-semibold text-gray-800">{conversation.name}</Text>
                    <Text className="text-xs text-gray-500">{conversation.timestamp}</Text>
                  </View>
                  <Text className="text-gray-600 text-sm" numberOfLines={1}>
                    {conversation.lastMessage}
                  </Text>
                </View>
                
                {conversation.unread > 0 && (
                  <View className="bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center ml-2">
                    <Text className="text-white text-xs font-medium">
                      {conversation.unread > 9 ? '9+' : conversation.unread}
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