import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useGetUserRankInCityQuery } from '@/features/leaderboard/api/leaderboardApi'
import { useAppSelector } from '@/store/hooks'
import { skipToken } from '@reduxjs/toolkit/query'
import { LinearGradient } from 'expo-linear-gradient'

export default function AlohaRewards() {
  const cityId = 1
  const userId = useAppSelector((state) => state.auth.userId)
  const { data, isLoading, isError } = useGetUserRankInCityQuery(
    userId ? { userId, cityId } : skipToken
  )

  const nextRewardThreshold = 400
  const totalPoints = data?.data?.totalPoints || 0
  const rank = data?.data?.rank ?? null
  const progressRatio = Math.min(totalPoints / nextRewardThreshold, 1)
  const progressPercentage = Math.round(progressRatio * 100)
  const pointsToNextReward = Math.max(nextRewardThreshold - totalPoints, 0)

  if (!userId) {
    return (
      <LinearGradient
        colors={['#00B2FF', '#0078FF']}
        className="m-4 mb-6 p-6 rounded-2xl shadow-lg"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="items-center py-8">
          <FontAwesome5 name="user-lock" size={32} color="white" />
          <Text className="text-white text-base mt-3 text-center">
            Please log in to view your Aloha Rewards!
          </Text>
        </View>
      </LinearGradient>
    )
  }

  return (
    <LinearGradient
      colors={['#3b82f6', '#06b6d4']}
      className="m-4 mb-6 p-6 rounded-3xl shadow-lg "
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Header */}
      <View className="flex-row justify-center items-center relative mb-4">
        <View className="p-2 bg-blue-200/40 rounded-full shadow-lg">
          <FontAwesome5 name="trophy" size={28} color="#ffffff" />
        </View>
        <Text className="text-white font-bold text-2xl ml-3">
          Aloha Rewards
        </Text>
        <View className="absolute right-0 top-0">
          <FontAwesome5 name="sparkles" size={16} color="#fff" />
        </View>
      </View>

      {/* Loading / Error */}
      {isLoading ? (
        <View className="items-center py-8">
          <FontAwesome5 name="spinner" size={24} color="white" />
          <Text className="text-white text-base mt-3">
            Loading your progress...
          </Text>
        </View>
      ) : isError ? (
        <View className="items-center py-8">
          <FontAwesome5 name="exclamation-triangle" size={24} color="#ff6b6b" />
          <Text className="text-white text-base mt-3 text-center">
            Failed to load rewards. Please try again!
          </Text>
        </View>
      ) : (
        <>
          {/* Description */}
          <Text className="text-white/90 text-center mb-5 text-sm leading-6">
            Complete challenges and earn points to unlock exclusive rewards! 🌴
          </Text>

          {/* Points & Rank */}
          <View className="flex-row justify-between gap-3 mb-5">
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              className="flex-1 p-4 rounded-xl items-center border border-white/30"
            >
              <View className="flex-row items-center mb-2">
                <FontAwesome5 name="coins" size={20} color="#fff" />
                <Text className="text-white text-sm font-semibold ml-2">
                  Your Points
                </Text>
              </View>
              <Text className="text-yellow-300 font-bold text-2xl">
                {totalPoints.toLocaleString()}
              </Text>
            </LinearGradient>

            {rank && (
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                className="flex-1 p-4 rounded-xl items-center border border-white/20"
              >
                <FontAwesome5 name="medal" size={20} color="#fff" />
                <Text className="text-white font-bold text-base mt-2">
                  Rank #{rank}
                </Text>
              </LinearGradient>
            )}
          </View>

          {/* Progress */}
          <View className="bg-white/10 rounded-xl p-5 border border-white/20 mb-5">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white font-semibold text-base">
                Progress to next reward
              </Text>
              <Text className="text-yellow-300 font-bold text-base">
                {progressPercentage}%
              </Text>
            </View>

            <View className="h-3 bg-white/30 rounded-full overflow-hidden relative mb-3">
              <LinearGradient
                colors={['#facc15', '#f59e0b']}
                style={{ width: `${progressPercentage}%` }}
                className="h-full rounded-full"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>

            <View className="flex-row justify-center items-center">
              <FontAwesome5 name="gift" size={16} color="#fff" />
              <Text className="text-white/90 ml-2 text-sm text-center">
                Next: 5 vouchers ({pointsToNextReward} pts to go)
              </Text>
            </View>
          </View>

          {/* Steps Section */}
          <View className="mt-2">
            <Text className="text-white font-bold text-lg text-center mb-4">
              Ways to Earn{' '}
            </Text>

            <View className="flex-row flex-wrap justify-between gap-3">
              {[
                {
                  title: 'Daily Challenges',
                  icon: 'tasks',
                  color: '#38bdf8' // light blue
                },
                {
                  title: 'Share a Photo',
                  icon: 'camera',
                  color: '#60a5fa'
                },
                {
                  title: 'Invite Friends',
                  icon: 'user-friends',
                  color: '#3b82f6'
                },
                {
                  title: 'Redeem Rewards',
                  icon: 'gift',
                  color: '#2563eb'
                }
              ].map((step, index) => (
                <LinearGradient
                  key={index}
                  colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                  className="w-[45%] p-4 rounded-xl items-center border border-white/20 relative min-h-[100px] justify-center"
                >
                  <View
                    className="w-9 h-9 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: step.color }}
                  >
                    <FontAwesome5 name={step.icon} size={16} color="white" />
                  </View>
                  <Text className="text-white text-sm text-center font-medium leading-5">
                    {step.title}
                  </Text>
                  <View className="absolute top-2 right-2 bg-white/20 w-5 h-5 rounded-full items-center justify-center">
                    <Text className="text-white text-xs font-bold">
                      {index + 1}
                    </Text>
                  </View>
                </LinearGradient>
              ))}
            </View>
          </View>
        </>
      )}
    </LinearGradient>
  )
}
