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
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const scrollViewRef = useRef<ScrollView>(null)

  // Debug log for button state (only when text changes)
  React.useEffect(() => {
    console.log('Message text changed:', messageText, 'Has text:', !!messageText.trim())
  }, [messageText])

  const { data: chatMessages = [], isLoading: loadingMessages, refetch } = useGetChatMessagesQuery({
    page: 1,
    pageSize: 50,
    chatRoomId: params.chatRoomId
  }, {
    skip: !params.chatRoomId
  })

  const [sendMessage, { isLoading: sendingMessage }] = useSendMessageMutation()

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

  useEffect(() => {
    setMessages(chatMessages)
  }, [chatMessages])

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [messages])

  const handleSendMessage = async () => {
    if (!messageText.trim() || !userId || !params.chatRoomId) {
      console.log('Cannot send message - missing data:', {
        hasMessage: !!messageText.trim(),
        hasUserId: !!userId,
        hasChatRoomId: !!params.chatRoomId
      })
      return
    }

    console.log('=== SENDING MESSAGE ===')
    console.log('Message text:', messageText.trim())
    console.log('User ID:', userId)
    console.log('Chat Room ID:', params.chatRoomId)

    const tempMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: userId,
      senderFullname: 'You',
      senderAvatarUrl: '',
      content: messageText.trim(),
      sentAt: new Date().toISOString(),
      isRead: false,
      messageType: 'text'
    }

    // Optimistically add message
    setMessages(prev => [...prev, tempMessage])
    const originalMessage = messageText.trim()
    setMessageText('')

    try {
      const requestData = {
        userId: userId,
        chatRoomId: params.chatRoomId,
        content: originalMessage,
        messageType: 'text'
      }
      
      console.log('API Request data:', requestData)
      
      const response = await sendMessage(requestData).unwrap()
      
      console.log('API Response:', response)

      // Replace temp message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id ? response : msg
      ))
      
      // Refresh messages from server
      refetch()
    } catch (error: any) {
      console.error('=== SEND MESSAGE ERROR ===')
      console.error('Full error:', error)
      console.error('Error status:', error.status)
      console.error('Error data:', error.data)
      
      Alert.alert('Error', 'Failed to send message. Please try again.')
      
      // Remove temp message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id))
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
    const isLastMessage = index === messages.length - 1

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
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
            <Ionicons name="person" size={20} color="white" />
          </View>
          
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold" numberOfLines={1}>
              {params.friendEmail || params.chatRoomName || 'Unknown User'}
            </Text>
          </View>
          
          <TouchableOpacity className="p-2">
            <Ionicons name="call" size={22} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity className="p-2 ml-2">
            <Ionicons name="videocam" size={22} color="white" />
          </TouchableOpacity>
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
        ) : messages.length > 0 ? (
          messages.map((message, index) => renderMessage(message, index))
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
              onChangeText={(text) => {
                console.log('Text input changed:', text)
                setMessageText(text)
              }}
              multiline
              textAlignVertical="center"
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="attach" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          {/* Debug info */}
          <View style={{ marginRight: 8 }}>
            <Text style={{ fontSize: 10, color: 'red' }}>
              {messageText.length}
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => {
              console.log('Send button pressed!')
              console.log('messageText:', messageText)
              console.log('messageText length:', messageText.length)
              console.log('canSend:', !!messageText.trim())
              handleSendMessage()
            }}
            disabled={!messageText.trim() || sendingMessage}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: messageText.trim() && !sendingMessage ? '#3b82f6' : '#9ca3af',
              borderWidth: 2,
              borderColor: messageText.trim() ? '#ef4444' : '#10b981'
            }}
          >
            {sendingMessage ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons 
                name={messageText.trim() ? "send" : "send-outline"}
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