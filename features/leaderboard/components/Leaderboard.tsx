import {
  useGetTop3UserByCityIdQuery,
  useGetUserRankInCityQuery
} from '@/features/leaderboard/api/leaderboardApi'
import { UserProgress } from '@/features/leaderboard/types'
import { useAppSelector } from '@/store/hooks'
import { skipToken } from '@reduxjs/toolkit/query'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface LeaderboardItemProps {
  item: UserProgress
  index: number
  highlight?: boolean
}

const LeaderboardItem = ({ item, highlight }: LeaderboardItemProps) => {
  const isTopThree = item.rank <= 3
  const badgeColor =
    item.rank === 1
      ? '#3b82f6'
      : item.rank === 2
        ? '#facc15'
        : item.rank === 3
          ? '#22c55e'
          : '#d1d5db'

  return (
    <View
      style={[
        styles.itemContainer,
        isTopThree && { backgroundColor: 'rgba(255, 223, 70, 0.1)' },
        highlight && { backgroundColor: '#ecfdf5' } // Màu nền nhạt xanh
      ]}
    >
      <Text style={styles.rank}>{item.rank}</Text>

      <View style={[styles.avatar, { backgroundColor: badgeColor }]}>
        <Text style={styles.avatarText}>{item.userName.charAt(0)}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.userName}</Text>
        {highlight && <Text style={styles.youText}>(You)</Text>}
      </View>

      <View style={styles.scoreBox}>
        <Text style={styles.score}>{item.totalPoints}</Text>
      </View>
    </View>
  )
}

const Leaderboard = () => {
  const {
    data: leaderboardData,
    error,
    isLoading
  } = useGetTop3UserByCityIdQuery({ cityId: 1 })

  const userId = useAppSelector((state) => state.auth.userId)
  console.log('Your userId:', userId)

  const queryArgs = userId ? { userId, cityId: 1 } : skipToken

  const {
    data: userRank,
    isLoading: userRankLoading,
    error: userRankError
  } = useGetUserRankInCityQuery(queryArgs)
  console.log('22222222222:', userRank?.data?.userName)

  if (isLoading || !leaderboardData?.data?.length) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#9ca3af' }}>Loading leaderboard...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Top Hunters</Text>
      </View>

      {leaderboardData.data.map((item, index) => (
        <LeaderboardItem key={item.userId} item={item} index={index} />
      ))}

      {userRank && (
        <>
          <View style={styles.separator} />
          <Text style={styles.yourRankTitle}>Your Rank</Text>
          <LeaderboardItem item={userRank.data} highlight index={-1} />
        </>
      )}

      {userRankLoading && (
        <Text style={{ textAlign: 'center', color: '#9ca3af', marginTop: 8 }}>
          Checking your rank...
        </Text>
      )}

      {userRankError && (
        <Text style={{ textAlign: 'center', color: '#ef4444', marginTop: 8 }}>
          Play some games to see your rank!
        </Text>
      )}
    </View>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1
  },
  rank: {
    width: 24,
    textAlign: 'center',
    fontWeight: '600'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: 'white',
    fontWeight: '700'
  },
  info: {
    flex: 1
  },
  name: {
    fontWeight: '500',
    fontSize: 16
  },
  scoreBox: {
    marginLeft: 8
  },
  score: {
    fontWeight: '700'
  },
  loading: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8
  },
  yourRankTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  youText: {
    fontSize: 12,
    color: '#10b981', // xanh lá đậm
    fontWeight: '500'
  }
})
