import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ClueData } from '@/features/clue/types'
import { Check, KeyRound, Lock } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useRouter } from 'expo-router'
import { useVerification } from '@/hooks/use-verification'

interface VerificationFormProps {
  clues?: ClueData[]
  userClues?: { clueId: number; isSolved: boolean }[]
  userId: string | null
  refetch: () => void
}

export function VerificationForm({
  clues = [],
  userClues = [],
  userId,
  refetch
}: VerificationFormProps) {
  // const router = useRouter()

  const [code, setCode] = useState('')
  const [selectedClueId, setSelectedClueId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock verification function - replace with actual implementation
  const { error, verify, setError } = useVerification()
  // Create a map from userClues for faster lookup
  const solvedCluesMap = new Map(
    userClues.map((clue) => [clue.clueId, clue.isSolved])
  )

  // Determine if a clue can be unlocked based on its order
  const isClueUnlockable = (order: number) => {
    if (order === 1) return true // First clue is always unlockable
    return (
      solvedCluesMap.get(
        clues.find((clue) => clue.order === order - 1)?.id || 0
      ) === true
    )
  }

  const handleSubmit = async () => {
    setError('')

    if (!selectedClueId) {
      setError('Please select a clue to verify.')
      return
    }

    try {
      await verify(
        selectedClueId,
        code,
        userId,
        refetch,
        () => {
          // On success - in a real app you might navigate to a success screen
          console.log('Success!')
        },
        setIsLoading
      )
    } catch (err) {
      setError('Invalid verification code. Please try again.')
    }
  }

  return (
    <View className="p-6 rounded-xl border border-blue-200 bg-white shadow mb-4">
      {/* Form header with blue accent */}
      <View className="flex-row items-center mb-6">
        <View className="h-8 w-2 bg-blue-500 rounded-full mr-3"></View>
        <Text className="text-xl font-semibold text-blue-600">
          Unlock More Clues
        </Text>
      </View>

      <Text className="text-gray-600 mb-4">
        Select a clue and enter its verification code to unlock it:
      </Text>

      {/* Clue selection buttons */}
      <View className="mb-6 flex-row flex-wrap">
        {clues.map(({ id, order }) => {
          const isSolved = solvedCluesMap.get(id) === true
          const isUnlockable = isClueUnlockable(order)

          return (
            <Pressable
              key={id}
              onPress={() => {
                if (isUnlockable) {
                  console.log('Selected clue ID:', id)
                  // Chỉ cập nhật state, không điều hướng
                  setSelectedClueId(id)
                }
              }}
              disabled={!isUnlockable}
              className={`px-4 py-2 rounded-full m-1 border flex-row items-center ${
                isSolved
                  ? 'bg-green-100 border-green-200'
                  : isUnlockable
                    ? 'bg-blue-100 border-blue-200'
                    : 'bg-gray-200 border-gray-300 opacity-60'
              } ${selectedClueId === id ? 'border-blue-500 shadow' : ''}`}
            >
              {isSolved ? (
                <Check size={14} color="#16A34A" />
              ) : (
                <Lock size={14} color="#2563EB" />
              )}
              <Text
                className={`ml-1.5 font-medium ${
                  isSolved
                    ? 'text-green-700'
                    : isUnlockable
                      ? 'text-blue-700'
                      : 'text-gray-500'
                }`}
              >
                Clue {id}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* Verification form */}
      <View className="space-y-4">
        <View className="relative">
          <View className="absolute left-3 top-3 z-10">
            <KeyRound size={18} color="#3B82F6" />
          </View>
          <TextInput
            value={code}
            onChangeText={(text) => setCode(text.toUpperCase())}
            placeholder="Enter verification code"
            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg"
          />
        </View>

        {error && (
          <View className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <Text className="text-red-600 text-sm">{error}</Text>
          </View>
        )}

        <Pressable
          onPress={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-600 py-3 rounded-lg flex-row items-center justify-center"
        >
          {isLoading ? (
            <LoadingSpinner size="small" color="#FFFFFF" />
          ) : (
            <>
              <Text className="text-white font-medium">Verify Code</Text>
              {/* <ChevronRight size={16} color="#FFFFFF" className="ml-2" /> */}
            </>
          )}
        </Pressable>

        {selectedClueId && (
          <Text className="text-sm text-blue-600 text-center mt-2">
            Verifying code for Clue {selectedClueId}
          </Text>
        )}
      </View>
    </View>
  )
}
