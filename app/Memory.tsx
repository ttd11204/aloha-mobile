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
    '4e650601-c6cd-4d2f-82d3-407fa6d0ba1f'

  const { data, isLoading, error } = useGetUserImageQuery(
    userId ? { userId, cityId } : skipToken
  )

  const images = data?.data || []

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌅 Memories in Đà Nẵng</Text>

      {isLoading && <ActivityIndicator size="large" color="#FF8C42" />}
      {error && <Text style={styles.errorText}>Failed to load memories.</Text>}

      <FlatList
        data={images}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerStyle={styles.imageList}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.caption}>#ALOHA VN</Text>
            </View>
          </View>
        )}
      />
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
  }
})
