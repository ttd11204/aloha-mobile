// components/treasure-hunt/ProgressBar.tsx
import { UserCityClues } from '@/features/clue/types'
import React from 'react'
import { View, Text, DimensionValue } from 'react-native'

type ProgressBarProps = {
  userClues: UserCityClues[]
  totalClues: number
  currentProgress: number
}

const ProgressBar = ({
  userClues,
  totalClues,
  currentProgress
}: ProgressBarProps) => {
  const completedClues = userClues.filter((clue) => clue.isSolved).length
  const progressPercentage = `${(Math.max(1, currentProgress - 1) / totalClues) * 100}%`

  return (
    <View className="bg-gray-50 p-4 rounded-lg mb-6">
      <View className="flex-row items-center mb-4">
        <View className="w-1 h-6 bg-blue-500 mr-2 rounded-full" />
        <Text className="text-lg text-blue-500 font-medium">Your Progress</Text>
      </View>

      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-700">Clues Completed:</Text>
        <Text className="font-bold text-blue-500">
          {completedClues} / {totalClues}
        </Text>
      </View>

      <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <View
          className="h-full bg-blue-500"
          style={{ width: progressPercentage as DimensionValue }}
        />
      </View>

      {currentProgress <= totalClues ? (
        <Text className="text-gray-600 text-center">
          Complete{' '}
          {currentProgress === 1
            ? 'the first clue'
            : `clue ${currentProgress - 1}`}{' '}
          to unlock
          {currentProgress === totalClues ? ' the final clue!' : ' more clues!'}
        </Text>
      ) : (
        <Text className="text-green-600 text-center font-bold">
          Congratulations! You've completed all clues!
        </Text>
      )}
    </View>
  )
}

export default ProgressBar
