import { useGetTop3UserByCityIdQuery } from '@/features/leaderboard/api/leaderboardApi'
import { UserProgress } from '@/features/leaderboard/types'
import { ChevronRight } from 'lucide-react-native'
import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'

// Define types
const leaderboardData = [
  {
    rank: 1,
    userId: 'user123',
    userName: 'Sarah Johnson',
    totalPoints: 2750,
    numerOfCity: '8 cities',
    prize: '10 vouchers'
  },
  {
    rank: 2,
    userId: 'user456',
    userName: 'Mark Thompson',
    totalPoints: 2320,
    numerOfCity: '7 cities',
    prize: '5 vouchers'
  },
  {
    rank: 3,
    userId: 'user789',
    userName: 'Jenny Kim',
    totalPoints: 2100,
    numerOfCity: '6 cities',
    prize: '5 vouchers'
  },
  {
    rank: 4,
    userId: 'user101',
    userName: 'Alex Rivera',
    totalPoints: 1890,
    numerOfCity: '5 cities',
    prize: '2 vouchers'
  },
  {
    rank: 5,
    userId: 'user202',
    userName: 'Michael Brown',
    totalPoints: 1720,
    numerOfCity: '4 cities',
    prize: '2 vouchers'
  }
]

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
          <Text className="text-gray-500 text-xs">{item.numerOfCity}</Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <View className="mr-2">
          <Text className="font-bold text-right">{item.totalPoints}</Text>
          <View
            className={`rounded-full px-2 py-1 ${getBadgeColor(item.prize)}`}
          >
            <Text className="text-white text-xs">{item.prize}</Text>
          </View>
        </View>
        <ChevronRight width={16} height={16} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  )
}

const Leaderboard = () => {
  // const { data: leaderboardData } = useGetTop3UserByCityIdQuery({ cityId: 1 })

  // if (!leaderboardData || leaderboardData.le) {
  //   return (
  //     <View className="flex-1 items-center justify-center">
  //       <Text className="text-gray-500">Loading...</Text>
  //     </View>
  //   )
  // }
  // console.log('Leaderboard data:', leaderboardData.data)

  return (
    <View className="rounded-xl p-4 bg-white shadow border border-gray-200">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold">Top Hunters</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={leaderboardData}
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
