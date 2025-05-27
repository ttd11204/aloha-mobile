import React, { useState, useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  interpolate,
  runOnJS
} from 'react-native-reanimated'
import { AntDesign, Ionicons } from '@expo/vector-icons'

export default function SuccessStatus() {
  const { points = 0, progress = '11' } = useLocalSearchParams()
  const [rewardPoints, setRewardPoints] = useState(0)

  const scale = useSharedValue(0.8)
  const opacity = useSharedValue(0)
  const contentY = useSharedValue(20)
  const contentOpacity = useSharedValue(0)
  const rewardsOpacity = useSharedValue(0)
  const progressWidth = useSharedValue(0)
  const badgeScale = useSharedValue(0.5)

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 })
    opacity.value = withTiming(1, { duration: 600 })
    contentY.value = withDelay(500, withTiming(0, { duration: 500 }))
    contentOpacity.value = withDelay(500, withTiming(1, { duration: 500 }))
    rewardsOpacity.value = withDelay(800, withTiming(1, { duration: 500 }))
    badgeScale.value = withDelay(300, withSpring(1, { damping: 10 }))

    const progressValue = Array.isArray(progress) ? progress[0] : progress
    progressWidth.value = withDelay(
      1200,
      withTiming(parseFloat(progressValue) / 100, { duration: 800 })
    )

    const pointsValue = Array.isArray(points) ? points[0] : points.toString()
    const targetPoints = parseInt(pointsValue, 10)
    const timer = setTimeout(() => {
      const incrementPoints = () => {
        setRewardPoints((prev) => {
          if (prev >= targetPoints) return targetPoints
          const nextValue = prev + 25
          setTimeout(() => incrementPoints(), 50)
          return nextValue
        })
      }
      incrementPoints()
    }, 800)

    return () => clearTimeout(timer)
  }, [points, progress])

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }))

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentY.value }],
    opacity: contentOpacity.value
  }))

  const rewardsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: rewardsOpacity.value
  }))

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progressWidth.value, [0, 1], [0, 100])}%`
  }))

  const badgeTextAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
    opacity: badgeScale.value
  }))

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      {/* Achievement Badge */}
      <Animated.View
        style={badgeAnimatedStyle}
        className="w-32 h-32 rounded-full flex items-center justify-center bg-red-500 shadow-lg"
      >
        <View className="w-28 h-28 rounded-full flex items-center justify-center bg-red-600">
          <Animated.Text
            style={badgeTextAnimatedStyle}
            className="text-white text-xl font-bold"
          >
            WON
          </Animated.Text>
          <Text className="text-center text-white text-xs font-medium px-1">
            You Will Receive a Gift
          </Text>
        </View>
      </Animated.View>

      {/* Card Content */}
      <View className="w-full mt-6">
        <Animated.View
          style={contentAnimatedStyle}
          className="mb-6 items-center"
        >
          <Text className="text-xl font-bold text-gray-800 mb-2">
            Quest Completed!
          </Text>
          <Text className="text-gray-600 text-sm text-center">
            You have successfully completed the treasure hunt challenge
          </Text>
        </Animated.View>

        {/* Rewards Section */}
        <Animated.View
          style={rewardsAnimatedStyle}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6"
        >
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Ionicons name="gift" size={18} color="#8b5cf6" />
              <Text className="font-semibold text-gray-800 ml-2">
                Your Rewards
              </Text>
            </View>
            <View className="bg-purple-100 px-2 py-0.5 rounded-full">
              <Text className="text-xs text-purple-600">Premium</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1 border-r border-gray-200 pr-3 items-center">
              <Text className="text-xs text-gray-500 mb-1">Points Earned</Text>
              <Text className="font-bold text-indigo-600">
                {rewardPoints} pts
              </Text>
            </View>

            <View className="flex-1 border-r border-gray-200 px-3 items-center">
              <Text className="text-xs text-gray-500 mb-1">Badge</Text>
              <Text className="font-bold text-indigo-600">Explorer</Text>
            </View>

            <View className="flex-1 pl-3 items-center">
              <Text className="text-xs text-gray-500 mb-1">Rank</Text>
              <View className="flex-row items-center">
                <AntDesign name="star" size={14} color="gold" />
                <Text className="font-bold text-indigo-600 ml-1">Gold</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Achievement Progress */}
        <Animated.View style={contentAnimatedStyle} className="mb-6 px-1">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">
              Your Quest Progress
            </Text>
            <Text className="text-xs font-medium text-teal-600">
              1/11 completed
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-full h-2.5">
            <Animated.View
              style={progressAnimatedStyle}
              className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2.5 rounded-full"
            />
          </View>
          <View className="mt-2 flex-row justify-between">
            <Text className="text-xs text-gray-500">Beginner</Text>
            <Text className="text-xs text-gray-500">Master</Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row justify-center space-x-4 px-6 pb-6 mt-4">
        <Pressable
          className="px-5 py-3 mr-2 rounded-full bg-white border border-indigo-500 flex-1 flex-row items-center justify-center"
          onPress={() => router.replace({ pathname: '/Leaderboard' })}
        >
          <Text className="text-indigo-600 font-semibold">Check Rankings</Text>
        </Pressable>
        <Pressable
          className="px-5 py-3 rounded-full bg-red-500 flex-1 flex-row items-center justify-center"
          onPress={() => router.replace({ pathname: '/SideQuest' })}
        >
          <Text className="text-white font-semibold">Next Quests</Text>
        </Pressable>
      </View>
    </View>
  )
}
