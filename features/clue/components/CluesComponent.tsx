// screens/TreasureHunt.tsx
import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { router } from 'expo-router'

import {
  useGetCluesForCityQuery,
  useGetUserCityCluesQuery,
  usePostClueMutation
} from '@/features/clue/api/clueApi'
// import LoadingState from '@/features/clue/components/LoadingState'
import ErrorState from '@/features/clue/components/ErrorState'
import ClueGrid from '@/features/clue/components/ClueGrid'
import VerificationCodeInput from '@/features/clue/components/VerificationCodeInput'
import ClueDetails from '@/features/clue/components/ClueDetails'
import ProgressBar from '@/features/clue/components/ProgressBar'
import { CluebyCityId } from '@/features/clue/types'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const TreasureHunt = () => {
  const userId = '4b702c68-76ed-4e81-b971-71baffe9f5be'
  const cityId = 1

  // State
  const [selectedClue, setSelectedClue] = useState<number | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  // Fetch clues data from API
  const {
    data: cityClues,
    isLoading: isLoadingClues,
    error: cluesError
  } = useGetCluesForCityQuery(cityId)

  // Fetch user's progress for this city
  const {
    data: userCluesResponse,
    isLoading: isLoadingUserClues,
    error: userCluesError
  } = useGetUserCityCluesQuery({ userId, cityId })

  // Post clue response
  const [postClue, { isLoading: submitClueLoading, data: sumbitClueData }] =
    usePostClueMutation()

  const userClues = userCluesResponse?.data || []

  // Get the current progress - the next unsolved clue
  const getCurrentProgress = () => {
    if (!userClues || userClues.length === 0) return 1

    // Find the first unsolved clue
    const firstUnsolved = userClues.find((clue) => !clue.isSolved)
    if (firstUnsolved) return firstUnsolved.order

    // If all are solved, return the last one's order + 1
    const lastClue = [...userClues].sort((a, b) => b.order - a.order)[0]
    return lastClue ? lastClue.order + 1 : 1
  }

  // Set selected clue to current progress when data is loaded
  useEffect(() => {
    if (userClues && userClues.length > 0) {
      setSelectedClue(getCurrentProgress())
    } else if (cityClues && cityClues.length > 0) {
      // Default to first clue if no user progress
      setSelectedClue(1)
    }
  }, [userClues, cityClues])

  const selectClue = (clueNumber: number) => {
    // Can only select clues that are at or below current progress
    if (clueNumber <= getCurrentProgress()) {
      setSelectedClue(clueNumber)
      setVerificationCode('')
      setError(null)
    }
  }

  const verifyCode = async () => {
    if (!selectedClue || !cityClues) return

    setIsVerifying(true)
    setError(null)

    try {
      // Find the clue object for the selected order
      const selectedClueData = cityClues.find((c) => c.order === selectedClue)

      if (!selectedClueData) {
        setError('Clue not found')
        setIsVerifying(false)
        return
      }

      // Check if verification code matches
      if (
        verificationCode.trim().toUpperCase() ===
        selectedClueData.answerCode.toUpperCase()
      ) {
        const res = await postClue({
          clueId: selectedClueData.id,
          answer: verificationCode,
          userId: userId
        }).unwrap()
        console.log('Clue solved:', res)
        // router.push('/dashboard')
      } else {
        setError('Incorrect verification code. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsVerifying(false)
    }
  }

  // Get current clue data
  const getClueData = (clueNumber: number): CluebyCityId | undefined => {
    if (!cityClues) return undefined
    return cityClues.find((c) => c.order === clueNumber)
  }

  // Check if a clue is solved
  const isClueCompleted = (clueNumber: number): boolean => {
    if (!userClues) return false
    const clue = userClues.find((c) => c.order === clueNumber)
    return clue?.isSolved || false
  }

  // Loading state
  if (isLoadingClues || isLoadingUserClues) {
    return <LoadingSpinner />
  }

  // Error state
  if (cluesError || userCluesError) {
    return <ErrorState />
  }

  return (
    <ScrollView className="flex-1 bg-white mb-16">
      <View className="p-4">
        <Text className="text-2xl font-bold text-blue-600 mb-4">
          Treasure Hunt Clues
        </Text>

        {/* Clue Selection Grid */}
        {cityClues && (
          <ClueGrid
            cityClues={cityClues}
            userClues={userClues}
            selectedClue={selectedClue}
            onSelectClue={selectClue}
          />
        )}

        {/* Verification Code Section */}
        <VerificationCodeInput
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          isVerifying={isVerifying}
          selectedClue={selectedClue}
          error={error}
          onVerify={verifyCode}
        />

        {/* Selected Clue Details */}
        {cityClues && selectedClue && getClueData(selectedClue) && (
          <ClueDetails
            clue={getClueData(selectedClue)!}
            isCompleted={isClueCompleted(selectedClue)}
          />
        )}

        {/* Progress Bar */}
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
