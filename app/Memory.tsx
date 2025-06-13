import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native'
import React from 'react'
import { useGetUserImageQuery } from '@/features/leaderboard/api/leaderboardApi'
import { useAppSelector } from '@/store/hooks'
import { skipToken } from '@reduxjs/toolkit/query'

export default function Memory() {
  const cityId = 1
  const userId =
    useAppSelector((state) => state.auth.userId) ||
    '53dd1896-fbe2-40b7-9513-cce1f0d6eaa0' // Default userId for testing

  const { data, isLoading, error } = useGetUserImageQuery(
    userId ? { userId, cityId } : skipToken
  )

  const images = data?.data || []

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌅 Memories in Đà Nẵng</Text>

      {!userId && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            🔐 Please log in to view your memories.
          </Text>
          <Text style={styles.emptySubText}>
            Sign in to track your side quest progress and unlock special
            moments!
          </Text>
        </View>
      )}

      {userId && isLoading && (
        <ActivityIndicator size="large" color="#FF8C42" />
      )}

      {userId && error && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🎯 No memories found yet!</Text>
          <Text style={styles.emptySubText}>
            Complete side quests to unlock and collect beautiful moments!
          </Text>
        </View>
      )}

      {/* {userId && !isLoading && !error && images.length === 0 && (
        
      )} */}

      {userId && images.length > 0 && (
        <FlatList
          data={images}
          keyExtractor={(item, index) => `${item}-${index}`}
          contentContainerStyle={styles.imageList}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item }} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.caption}>#AVNTreasureHunt</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF8',
    paddingTop: 40,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333'
  },
  imageList: {
    paddingBottom: 20
  },
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#FFF'
  },
  image: {
    width: screenWidth - 32,
    height: 220,
    resizeMode: 'cover'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center'
  },
  caption: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF8C42',
    marginBottom: 8,
    textAlign: 'center'
  },
  emptySubText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555'
  }
})
