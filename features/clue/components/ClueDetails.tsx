// components/treasure-hunt/ClueDetails.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

type Clue = {
  id: number
  order: number
  question: string
  destination: string
  difficulty: string
  hint: string
  answerCode: string
}

type UserClue = {
  id: number
  order: number
  isSolved: boolean
}

type ClueDetailsProps = {
  clue: Clue
  isCompleted: boolean
}

const ClueDetails = ({ clue, isCompleted }: ClueDetailsProps) => {
  const [showHint, setShowHint] = useState(false)

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  // Define color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500'
      case 'Medium':
        return 'text-orange-500'
      case 'Hard':
        return 'text-red-500'
      default:
        return 'text-blue-500'
    }
  }

  const getDifficultyIconColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#48bb78'
      case 'Medium':
        return '#ed8936'
      case 'Hard':
        return '#e53e3e'
      default:
        return '#4299e1'
    }
  }

  return (
    <View className="bg-gray-50 p-4 rounded-lg mb-6">
      <View className="flex-row items-center mb-4">
        <View className="w-1 h-6 bg-blue-500 mr-2 rounded-full" />
        <View className="h-6 w-6 bg-blue-500 rounded-full items-center justify-center">
          <Text className="text-white font-bold">{clue.order}</Text>
        </View>
        <Text className="text-lg text-blue-500 font-medium ml-2">
          Clue Details
        </Text>
        {isCompleted && (
          <View className="ml-auto bg-green-500 px-2 py-1 rounded-full flex-row items-center">
            <Ionicons name="checkmark-circle" size={14} color="white" />
            <Text className="text-white text-xs ml-1">Completed</Text>
          </View>
        )}
      </View>

      <Text className="text-gray-800 italic mb-4">"{clue.question}"</Text>

      <View className="flex-row items-center mb-2">
        <Ionicons name="location" size={18} color="#4299e1" />
        <Text className="ml-2 text-blue-500">
          Destination: {clue.destination}
        </Text>

        <TouchableOpacity
          className="ml-2 bg-emerald-500 px-3 py-1 rounded-full"
          onPress={() => {
            router.push({
              pathname: '/Dashboard',
              params: { clueId: clue.id.toString() }
            })
          }}
        >
          <View className="flex-row items-center">
            <Ionicons name="map-outline" size={16} color="white" />
            <Text className="text-white ml-1 text-sm">View on Map</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-4">
        <Ionicons
          name="speedometer-outline"
          size={18}
          color={getDifficultyIconColor(clue.difficulty)}
        />
        <Text className={`ml-2 ${getDifficultyColor(clue.difficulty)}`}>
          Difficulty: {clue.difficulty}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded-lg items-center flex-row justify-center"
        onPress={toggleHint}
      >
        <Ionicons name="bulb-outline" size={18} color="white" />
        <Text className="text-white font-medium ml-2">
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </Text>
        <Ionicons
          name={showHint ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="white"
          className="ml-1"
        />
      </TouchableOpacity>

      {showHint && (
        <View className="mt-3 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
          <Text className="text-yellow-800">{clue.hint}</Text>
        </View>
      )}
    </View>
  )
}

export default ClueDetails
