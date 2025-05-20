import { ClueData } from '@/features/clue/types'
import {
  BarChart2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  MapPin
} from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export interface ClueProps {
  data: ClueData
  previousClueSolved: boolean
}

export function Clue({ data, previousClueSolved }: ClueProps) {
  const [showHint, setShowHint] = useState(false)

  // Function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    if (!difficulty) return 'bg-gray-100 text-gray-500'

    const level = difficulty.toLowerCase()
    if (level.includes('easy')) return 'bg-green-100 text-green-700'
    if (level.includes('medium')) return 'bg-yellow-100 text-yellow-700'
    if (level.includes('hard')) return 'bg-red-100 text-red-700'
    return 'bg-blue-100 text-blue-700'
  }

  // Extract text color from composite style string
  const getTextColor = (styleString: string) => {
    const parts = styleString.split(' ')
    return parts.find((part) => part.startsWith('text-')) || 'text-gray-800'
  }

  return (
    <View className="p-6 rounded-xl border border-blue-200 bg-white shadow mb-4">
      {/* Clue header with colored accent */}
      <View className="flex-row items-center mb-4">
        <View className="h-8 w-2 bg-blue-500 rounded-full mr-3"></View>
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center shadow">
            <Text className="text-white font-bold">{data.id}</Text>
          </View>
          <Text className="text-xl font-semibold text-blue-700 ml-2">Clue</Text>
        </View>
      </View>

      <View className="flex-col space-y-4">
        {previousClueSolved ? (
          <>
            {/* Question with decorative quotation marks */}
            <View className="relative pl-6 pr-2">
              <Text className="text-3xl text-blue-300 absolute left-0 top-0">
                "
              </Text>
              <Text className="text-gray-800 font-medium py-2">
                {data.question}
              </Text>
              <Text className="text-3xl text-blue-300 absolute right-0 bottom-0">
                "
              </Text>
            </View>

            {/* Metadata section with badge styling */}
            <View className="flex-row flex-wrap mt-4 space-x-2">
              {data.destination && (
                <View className="flex-row items-center bg-blue-100 px-3 py-1 rounded-full">
                  <MapPin size={16} color="#1D4ED8" />
                  <Text className="text-blue-700 font-medium ml-2">
                    Destination:
                  </Text>
                  <Text className="text-blue-700 ml-1">{data.destination}</Text>
                </View>
              )}

              {data.difficulty && (
                <View
                  className={`flex-row items-center px-3 py-1 rounded-full ${getDifficultyColor(data.difficulty)}`}
                >
                  <BarChart2
                    size={16}
                    color={
                      getTextColor(getDifficultyColor(data.difficulty)) ===
                      'text-green-700'
                        ? '#15803D'
                        : getTextColor(getDifficultyColor(data.difficulty)) ===
                            'text-yellow-700'
                          ? '#A16207'
                          : getTextColor(
                                getDifficultyColor(data.difficulty)
                              ) === 'text-red-700'
                            ? '#B91C1C'
                            : '#1D4ED8'
                    }
                  />
                  <Text
                    className={`${getTextColor(getDifficultyColor(data.difficulty))} font-medium ml-2`}
                  >
                    Difficulty:
                  </Text>
                  <Text
                    className={`${getTextColor(getDifficultyColor(data.difficulty))} ml-1`}
                  >
                    {data.difficulty}
                  </Text>
                </View>
              )}
            </View>

            {/* Hint section */}
            <View className="relative mt-4">
              <TouchableOpacity
                onPress={() => setShowHint(!showHint)}
                className="px-4 py-2 rounded-full bg-blue-600 flex-row items-center justify-center shadow"
              >
                <Lightbulb size={18} color="#FEF08A" />
                <Text className="text-white ml-2">
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Text>
                {showHint ? (
                  <ChevronUp size={16} color="#FFFFFF" className="ml-2" />
                ) : (
                  <ChevronDown size={16} color="#FFFFFF" className="ml-2" />
                )}
              </TouchableOpacity>

              {showHint && (
                <View className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <View className="flex-row items-start space-x-2">
                    <View className="h-6 w-6 rounded-full bg-yellow-400 items-center justify-center mt-0.5">
                      <Lightbulb size={14} color="#FFFFFF" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-blue-700 text-sm">
                        <Text className="font-bold text-indigo-600">
                          Hint:{' '}
                        </Text>
                        {data.hint}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </>
        ) : (
          <Text className="text-gray-500 italic text-center">
            Complete the previous clue to unlock this one!
          </Text>
        )}
      </View>
    </View>
  )
}
