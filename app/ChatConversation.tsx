import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
  type ChatMessage
} from '@/features/chat/api/chatApi'

export default function ChatConversation() {
  const params = useLocalSearchParams<{
    chatRoomId: string
    chatRoomName: string
    friendEmail: string
    friendId: string
  }>()

  const [userId, setUserId] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([])
  const scrollViewRef = useRef<ScrollView>(null)

  // Get user ID from token
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

  // Load chat messages from API
  const { 
    data: apiMessages = [], 
    isLoading: loadingMessages, 
    error: messagesError,
    refetch 
  } = useGetChatMessagesQuery({
    page: 1,
    pageSize: 30,
    chatRoomId: params.chatRoomId
  }, {
    skip: !params.chatRoomId
  })

  // Send message mutation
  const [sendMessage, { isLoading: sendingMessage }] = useSendMessageMutation()

  // Update local messages when API data changes
  useEffect(() => {
    if (apiMessages && apiMessages.length > 0) {
      console.log('📥 Loaded messages from API:', apiMessages.length)
      // Sort messages by sentAt to ensure correct order (oldest first)
      const sortedMessages = [...apiMessages].sort((a, b) => 
        new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
      )
      setLocalMessages(sortedMessages)
    }
  }, [apiMessages])

  // Auto scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [localMessages])

  const handleSendMessage = async () => {
    const trimmedMessage = messageText.trim()
    
    if (!trimmedMessage || !userId || !params.chatRoomId) {
      console.log('Cannot send message:', {
        hasMessage: !!trimmedMessage,
        hasUserId: !!userId,
        hasChatRoomId: !!params.chatRoomId
      })
      return
    }

    // Create optimistic message
    const tempMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      senderId: userId,
      senderFullname: 'You',
      senderAvatarUrl: '',
      content: trimmedMessage,
      sentAt: new Date().toISOString(),
      isRead: false,
      messageType: 'text'
    }

    // Add optimistic message to UI
    setLocalMessages(prev => [...prev, tempMessage])
    setMessageText('')

    try {
      console.log('📤 Sending message:', trimmedMessage)
      
      const response = await sendMessage({
        userId: userId,
        chatRoomId: params.chatRoomId,
        content: trimmedMessage,
        messageType: 'text'
      }).unwrap()

      console.log('✅ Message sent successfully:', response)

             // Replace temp message with real response
       setLocalMessages(prev => 
         prev.map(msg => 
           msg.id === tempMessage.id ? response : msg
         )
       )

       // Optional: Refresh messages from server after a short delay
       // This ensures we have the latest state from server but doesn't disrupt UI order
       setTimeout(() => {
         refetch()
       }, 500)
      
    } catch (error: any) {
      console.error('❌ Send message error:', error)
      Alert.alert('Error', 'Failed to send message. Please try again.')
      
      // Remove temp message on error
      setLocalMessages(prev => 
        prev.filter(msg => msg.id !== tempMessage.id)
      )
      
      // Restore message text
      setMessageText(trimmedMessage)
    }
  }

  const formatMessageTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return ''
    }
  }

  const renderMessage = (message: ChatMessage, index: number) => {
    const isMyMessage = message.senderId === userId
    
    return (
      <View
        key={message.id}
        className={`flex-row mb-3 ${isMyMessage ? 'justify-end' : 'justify-start'}`}
      >
        <View
          className={`max-w-[75%] px-4 py-3 rounded-2xl ${
            isMyMessage 
              ? 'bg-blue-500 rounded-br-md' 
              : 'bg-gray-200 rounded-bl-md'
          }`}
        >
          <Text className={`text-base ${isMyMessage ? 'text-white' : 'text-gray-800'}`}>
            {message.content}
          </Text>
          <Text className={`text-xs mt-1 ${isMyMessage ? 'text-blue-100' : 'text-gray-500'}`}>
            {formatMessageTime(message.sentAt)}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#0095ff" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0095ff', '#0080e6']}
        className="pb-4"
        style={{ paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 24 + 20 }}
      >
        <View className="flex-row items-center px-4">
          <TouchableOpacity 
            onPress={() => {
              console.log('🔙 Back button pressed')
              router.back()
            }} 
            className="mr-3 p-2"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
            <Ionicons name="person" size={20} color="white" />
          </View>
          
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold" numberOfLines={1}>
              {params.friendEmail || params.chatRoomName || 'Chat'}
            </Text>
            <Text className="text-white/80 text-sm">
              Room: {params.chatRoomId?.substring(0, 8)}...
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4 py-2"
        showsVerticalScrollIndicator={false}
      >
        {loadingMessages ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#0095ff" />
            <Text className="text-gray-500 mt-2">Loading messages...</Text>
          </View>
        ) : messagesError ? (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="alert-circle" size={64} color="#ef4444" />
            <Text className="text-red-500 text-lg mt-4">Error loading messages</Text>
            <TouchableOpacity 
              onPress={() => refetch()}
              className="mt-4 px-6 py-3 bg-blue-500 rounded-lg"
              activeOpacity={0.8}
            >
              <Text className="text-white font-medium">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : localMessages.length > 0 ? (
          localMessages.map((message, index) => renderMessage(message, index))
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="chatbubbles-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-500 text-lg mt-4">No messages yet</Text>
            <Text className="text-gray-400 text-center px-8">
              Start the conversation with a message!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Message Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="border-t border-gray-200 bg-white"
      >
        <View className="flex-row items-end px-4 py-3">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-3">
            <TextInput
              className="flex-1 text-base text-black max-h-20"
              placeholder="Type a message..."
              placeholderTextColor="#9ca3af"
              value={messageText}
              onChangeText={setMessageText}
              multiline
              textAlignVertical="center"
              editable={!sendingMessage}
            />
          </View>
          
          <TouchableOpacity 
            onPress={() => {
              console.log('📤 Send button pressed, message:', messageText)
              handleSendMessage()
            }}
            disabled={!messageText.trim() || sendingMessage}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              messageText.trim() && !sendingMessage 
                ? 'bg-blue-500' 
                : 'bg-gray-300'
            }`}
            activeOpacity={0.8}
          >
            {sendingMessage ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons 
                name="send"
                size={18} 
                color="white" 
              />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
} 