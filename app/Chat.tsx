import React from 'react'
import ChatScreen from '@/features/chat/components/ChatScreen'
import { StatusBar } from 'react-native'
import './global.css'

export default function ChatPage() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0095ff" />
      <ChatScreen />
    </>
  )
} 