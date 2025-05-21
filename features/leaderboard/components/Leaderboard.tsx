import { useGetTop3UserByCityIdQuery } from '@/features/leaderboard/api/leaderboardApi'
import { UserProgress } from '@/features/leaderboard/types'
import { ChevronRight } from 'lucide-react-native'
import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'

const avatarGradients = {
  blue: 'bg-sky-500',
  yellow: 'bg-amber-400',
  green: 'bg-green-500'
}

const badgeColors = {
  '10 vouchers': 'bg-sky-500',
  '5 vouchers': 'bg-amber-500',
  '2 vouchers': 'bg-green-500'
}

type PrizeKey = keyof typeof badgeColors

const getAvatarGradient = (rank: number) => {
  if (rank === 1) return avatarGradients.blue
  if (rank === 2) return avatarGradients.yellow
  return avatarGradients.green
}

const getBadgeColor = (prize: string) => {
  return badgeColors[prize as PrizeKey] || 'bg-gray-500'
}

interface LeaderboardItemProps {
  item: UserProgress
  index: number
}

const LeaderboardItem = ({ item, index }: LeaderboardItemProps) => {
  const isTopThree = item.rank <= 3

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-3 border-b border-gray-200 ${
        isTopThree ? 'bg-amber-50/30' : ''
      }`}
    >
      <View className="flex-row items-center">
        <Text className={`w-8 text-center ${isTopThree ? 'font-bold' : ''}`}>
          {item.rank}
        </Text>

        <View
          className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${getAvatarGradient(item.rank)}`}
        >
          <Text className="text-white font-bold">
            {item.userName.charAt(0)}
          </Text>
        </View>

        <View>
          <Text className="font-semibold">{item.userName}</Text>
          {/* <Text className="text-gray-500 text-xs">{item.numerOfCity}</Text> */}
        </View>
      </View>

      <View className="flex-row items-center">
        <View className="mr-2">
          <Text className="font-bold text-right">{item.totalPoints}</Text>
          {/* <View
            className={`rounded-full px-2 py-1 ${getBadgeColor(item.prize)}`}
          >
            <Text className="text-white text-xs">{item.prize}</Text>
          </View> */}
        </View>
        <ChevronRight width={16} height={16} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  )
}

const Leaderboard = () => {
  const { data: leaderboardData } = useGetTop3UserByCityIdQuery({ cityId: 1 })

  if (!leaderboardData || leaderboardData.data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Loading...</Text>
      </View>
    )
  }

  return (
    <View className="rounded-xl p-4 bg-white shadow border border-gray-200">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold">Top Hunters</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={leaderboardData.data}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => (
          <LeaderboardItem item={item} index={index} />
        )}
        scrollEnabled={false}
        className="bg-white rounded-lg"
      />
    </View>
  )
}

export default Leaderboard
