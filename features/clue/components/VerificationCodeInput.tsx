// components/treasure-hunt/VerificationCodeInput.tsx
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type VerificationCodeInputProps = {
  verificationCode: string
  setVerificationCode: (code: string) => void
  isVerifying: boolean
  selectedClue: number | null
  error: string | null
  onVerify: () => void
}

const VerificationCodeInput = ({
  verificationCode,
  setVerificationCode,
  isVerifying,
  selectedClue,
  error,
  onVerify
}: VerificationCodeInputProps) => {
  return (
    <View className="bg-gray-50 p-4 rounded-lg mb-6">
      <View className="flex-row items-center mb-4">
        <View className="w-1 h-6 bg-blue-500 mr-2 rounded-full" />
        <Text className="text-lg text-blue-500 font-medium">
          Verification Code
        </Text>
      </View>

      <Text className="text-gray-600 mb-4">
        Found the location? Enter the verification code to confirm:
      </Text>

      <View className="mb-4">
        <View className="bg-blue-50 rounded-full border border-blue-100 px-4 py-3 flex-row items-center">
          <Ionicons name="key-outline" size={20} color="#4299e1" />
          <TextInput
            className="flex-1 ml-2 text-gray-800"
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
        </View>
      </View>

      <TouchableOpacity
        className={`py-3 rounded-lg items-center ${
          isVerifying || !selectedClue || !verificationCode.trim()
            ? 'bg-blue-300'
            : 'bg-blue-500'
        }`}
        onPress={onVerify}
        disabled={isVerifying || !selectedClue || !verificationCode.trim()}
      >
        {isVerifying ? (
          <ActivityIndicator color="white" />
        ) : (
          <View className="flex-row items-center">
            <Text className="text-white font-medium">Verify Code</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </View>
        )}
      </TouchableOpacity>

      {selectedClue && (
        <Text className="text-blue-600 text-center mt-2">
          Verifying code for Clue {selectedClue}
        </Text>
      )}

      {error && <Text className="text-red-500 text-center mt-2">{error}</Text>}
    </View>
  )
}

export default VerificationCodeInput
