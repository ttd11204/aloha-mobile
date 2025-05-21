// components/treasure-hunt/ClueGrid.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { UserCityClues } from '@/features/clue/types'

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

type ClueGridProps = {
  cityClues: Clue[]
  userClues: UserCityClues[]
  selectedClue: number | null
  onSelectClue: (clueNumber: number) => void
}

const ClueGrid = ({
  cityClues,
  userClues,
  selectedClue,
  onSelectClue
}: ClueGridProps) => {
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

  // Determine if a clue button should be enabled
  const isClueEnabled = (clueNumber: number) => {
    return clueNumber <= getCurrentProgress()
  }

  // Check if a clue is solved
  const isClueCompleted = (clueNumber: number) => {
    if (!userClues) return false
    const clue = userClues.find((c) => c.order === clueNumber)
    return clue?.isSolved || false
  }

  return (
    <View className="bg-gray-50 p-4 rounded-lg mb-6">
      <View className="flex-row items-center mb-4">
        <View className="w-1 h-6 bg-blue-500 mr-2 rounded-full" />
        <Text className="text-lg text-blue-500 font-medium">Select a Clue</Text>
      </View>

      <Text className="text-gray-600 mb-4">
        Tap on a clue to view details. Solve each clue to unlock the next one:
      </Text>

      <View className="flex-row flex-wrap gap-2 mb-4">
        {cityClues
          .sort((a, b) => a.order - b.order)
          .map((clue) => (
            <TouchableOpacity
              key={clue.id}
              className={`py-2 px-4 rounded-full flex-row items-center
                ${
                  selectedClue === clue.order
                    ? 'bg-blue-500'
                    : isClueCompleted(clue.order)
                      ? 'bg-green-500'
                      : isClueEnabled(clue.order)
                        ? 'bg-blue-100'
                        : 'bg-gray-300'
                } 
                ${!isClueEnabled(clue.order) ? 'opacity-50' : ''}`}
              onPress={() => onSelectClue(clue.order)}
              disabled={!isClueEnabled(clue.order)}
            >
              <Ionicons
                name={
                  isClueCompleted(clue.order)
                    ? 'checkmark-circle'
                    : isClueEnabled(clue.order)
                      ? 'map-outline'
                      : 'lock-closed'
                }
                size={16}
                color={
                  selectedClue === clue.order || isClueCompleted(clue.order)
                    ? 'white'
                    : isClueEnabled(clue.order)
                      ? '#4299e1'
                      : '#4a5568'
                }
              />
              <Text
                className={`ml-2 ${
                  selectedClue === clue.order || isClueCompleted(clue.order)
                    ? 'text-white'
                    : isClueEnabled(clue.order)
                      ? 'text-blue-500'
                      : 'text-gray-600'
                }`}
              >
                Clue {clue.order}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  )
}

export default ClueGrid
