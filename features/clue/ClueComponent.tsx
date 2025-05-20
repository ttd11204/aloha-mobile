import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getClueApi, GetCluesForCity } from '@/features/clue/api/postClue'
import { CluesList } from '@/features/clue/components/clues-list'
import { VerificationForm } from '@/features/clue/components/verification-form'
import { ClueData } from '@/features/clue/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'

export default function CluesComponent() {
  const [clues, setClues] = useState<ClueData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [userClues, setUserClues] = useState<
    { clueId: number; isSolved: boolean }[]
  >([])

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('id')
        // If no user ID exists, create a temporary one for demo purposes
        if (!storedUserId) {
          const tempId = 'user_' + Math.random().toString(36).substring(2, 10)
          await AsyncStorage.setItem('id', tempId)
          setUserId(tempId)
        } else {
          setUserId(storedUserId)
        }
      } catch (err) {
        console.error('Failed to get user ID:', err)
        setError('Failed to load user data')
      }
    }

    getUserId()
  }, [])

  const fetchClues = useCallback(async () => {
    try {
      if (!userId) throw new Error('User ID not found')

      setLoading(true)
      const allClues = await getClueApi()
      setClues(allClues)

      const cityClues = await GetCluesForCity(userId)
      setUserClues(cityClues.data)
    } catch (err) {
      setError('Failed to fetch clues')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      fetchClues()
    }
  }, [userId, fetchClues])

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />

      {/* Header */}
      <View className="h-16 bg-gradient-to-r from-blue-500 to-cyan-400 items-center justify-center">
        <Text className="text-white text-xl font-bold">Aloha Viet Nam</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-8">
        <Text className="text-3xl font-bold text-center text-blue-700 mb-8">
          Treasure Hunt Clues
        </Text>

        {loading ? (
          <View className="h-80 items-center justify-center">
            <LoadingSpinner size="xlarge" />
          </View>
        ) : (
          <>
            {error ? (
              <Text className="text-center text-red-500 py-4">{error}</Text>
            ) : (
              <View className="space-y-6">
                <VerificationForm
                  clues={clues}
                  userClues={userClues}
                  userId={userId}
                  refetch={fetchClues}
                />

                <CluesList clues={clues} userClues={userClues} />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
