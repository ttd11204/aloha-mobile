import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { router } from 'expo-router'

import {
  useGetCluesForCityQuery,
  useGetUserCityCluesQuery,
  usePostClueMutation
} from '@/features/clue/api/clueApi'
import ErrorState from '@/features/clue/components/ErrorState'
import ClueGrid from '@/features/clue/components/ClueGrid'
import VerificationCodeInput from '@/features/clue/components/VerificationCodeInput'
import ClueDetails from '@/features/clue/components/ClueDetails'
import ProgressBar from '@/features/clue/components/ProgressBar'
import { CluebyCityId } from '@/features/clue/types'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useAppSelector } from '@/store/hooks'
import { skipToken } from '@reduxjs/toolkit/query'

const TreasureHunt = () => {
  const userId = useAppSelector((state) => state.auth.userId)
  const cityId = 1

  const [selectedClue, setSelectedClue] = useState<number | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const {
    data: cityClues,
    isLoading: isLoadingClues,
    error: cluesError
  } = useGetCluesForCityQuery(cityId)

  const {
    data: userCluesResponse,
    isLoading: isLoadingUserClues,
    error: userCluesError
  } = useGetUserCityCluesQuery(userId ? { userId, cityId } : skipToken)

  const [postClue, { isLoading: submitClueLoading }] = usePostClueMutation()

  const userClues = userCluesResponse?.data || []

  const getCurrentProgress = () => {
    if (!userClues || userClues.length === 0) return 1
    const firstUnsolved = userClues.find((clue) => !clue.isSolved)
    if (firstUnsolved) return firstUnsolved.order
    const lastClue = [...userClues].sort((a, b) => b.order - a.order)[0]
    return lastClue ? lastClue.order + 1 : 1
  }

  useEffect(() => {
    if (userClues && userClues.length > 0) {
      setSelectedClue(getCurrentProgress())
    } else if (cityClues && cityClues.length > 0) {
      setSelectedClue(1)
    }
  }, [userClues, cityClues])

  const selectClue = (clueNumber: number) => {
    if (clueNumber <= getCurrentProgress()) {
      setSelectedClue(clueNumber)
      setVerificationCode('')
      setError(null)
    }
  }

  const verifyCode = async () => {
    if (!selectedClue || !cityClues || !userId) {
      setError('Missing required data.')
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      const selectedClueData = cityClues.find((c) => c.order === selectedClue)
      if (!selectedClueData) {
        setError('Clue not found')
        return
      }

      if (
        verificationCode.trim().toUpperCase() ===
        selectedClueData.answerCode.toUpperCase()
      ) {
        const res = await postClue({
          clueId: selectedClueData.id,
          answer: verificationCode,
          userId
        }).unwrap()
        console.log('Clue solved:', res)
        // router.push('/dashboard')
      } else {
        setError('Incorrect verification code. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const getClueData = (clueNumber: number): CluebyCityId | undefined => {
    return cityClues?.find((c) => c.order === clueNumber)
  }

  const isClueCompleted = (clueNumber: number): boolean => {
    const clue = userClues?.find((c) => c.order === clueNumber)
    return clue?.isSolved || false
  }

  if (isLoadingClues || isLoadingUserClues) return <LoadingSpinner />
  if (cluesError || userCluesError) return <ErrorState />

  return (
    <ScrollView className="flex-1 bg-white mb-16">
      <View className="p-4">
        <Text className="text-2xl font-bold text-blue-600 mb-4">
          Treasure Hunt Clues
        </Text>

        {cityClues && (
          <ClueGrid
            cityClues={cityClues}
            userClues={userClues}
            selectedClue={selectedClue}
            onSelectClue={selectClue}
          />
        )}

        <VerificationCodeInput
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          isVerifying={isVerifying}
          selectedClue={selectedClue}
          error={error}
          onVerify={verifyCode}
        />

        {cityClues && selectedClue && getClueData(selectedClue) && (
          <ClueDetails
            clue={getClueData(selectedClue)!}
            isCompleted={isClueCompleted(selectedClue)}
          />
        )}

        {cityClues && (
          <ProgressBar
            userClues={userClues}
            totalClues={cityClues.length}
            currentProgress={getCurrentProgress()}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default TreasureHunt
