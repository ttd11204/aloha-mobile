import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function TestButton() {
  const [text, setText] = useState('')
  
  console.log('TestButton render - text:', text, 'hasText:', !!text.trim())
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>
        Test Button Component
      </Text>
      
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
          width: '100%',
          borderRadius: 8
        }}
        placeholder="Type something..."
        value={text}
        onChangeText={(newText) => {
          console.log('Text changed to:', newText)
          setText(newText)
        }}
      />
      
      <Text style={{ marginBottom: 10 }}>
        Text: "{text}" | Length: {text.length} | Has text: {text.trim() ? 'YES' : 'NO'}
      </Text>
      
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: text.trim() ? '#3b82f6' : '#9ca3af',
          borderWidth: 3,
          borderColor: text.trim() ? '#ef4444' : '#10b981'
        }}
        onPress={() => {
          console.log('Button pressed with text:', text)
        }}
      >
        <Ionicons 
          name={text.trim() ? "send" : "send-outline"}
          size={24} 
          color="white" 
        />
      </TouchableOpacity>
      
      <Text style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
        Button should be blue with red border when text exists
      </Text>
    </View>
  )
} 