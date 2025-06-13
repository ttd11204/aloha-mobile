import Icon from '@react-native-vector-icons/fontawesome'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Plane } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Animated
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, Feather } from '@expo/vector-icons'

import { useGetPackageDataQuery } from '@/components/api/packageApi'
import { useRouter } from 'expo-router'
import ImageSlider from './components/HomeSlider'
import PopularChallenges from './components/PopularChallenges'
import Testimonials from './components/Testimonials'
import NearbyEvents from './components/event/Event'
import AlohaRewards from './components/reward/Reward'
import NewsletterSubscription from './components/subcriptions/Subcriptions'
import { Package } from './types'

const featuredDestinations = [
  {
    name: 'My Khe Beach',
    location: 'Son Tra District, Da Nang',
    challenges: 5,
    rating: 4.9,
    isNew: true,
    image: {
      uri: 'https://res.cloudinary.com/dtjgueyp2/image/upload/fl_preserve_transparency/v1749824469/des1_yqlxyv.jpg?_s=public-apps'
    }
  },
  {
    name: 'Marble Mountains',
    location: 'Ngu Hanh Son District, Da Nang',
    challenges: 8,
    rating: 4.7,
    isNew: false,
    image: {
      uri: 'https://res.cloudinary.com/dtjgueyp2/image/upload/fl_preserve_transparency/v1749824473/des2_bd35bx.jpg?_s=public-apps'
    }
  },
  {
    name: 'Dragon Bridge',
    location: 'Hai Chau District, Da Nang',
    challenges: 3,
    rating: 4.6,
    isNew: true,
    image: {
      uri: 'https://res.cloudinary.com/dtjgueyp2/image/upload/fl_preserve_transparency/v1749824470/des3_dqo4on.jpg?_s=public-apps'
    }
  },
  {
    name: 'Ba Na Hills',
    location: 'Hoa Vang District, Da Nang',
    challenges: 6,
    rating: 4.8,
    isNew: false,
    image: {
      uri: 'https://res.cloudinary.com/dtjgueyp2/image/upload/fl_preserve_transparency/v1749824469/des4_ewotp6.jpg?_s=public-apps'
    }
  }
  // ... other destinations
]

type PackageApiResponse = {
  image: ImageSourcePropType
  name: string
  location: string
  challenges: number
  rating: number
  isNew: boolean
}
type RootStackParamList = {
  Home: undefined
  PackageDetail: { id: string }
  AnnualPayment: undefined
  DaysPayment: undefined
  // Add other routes here if needed
}

export default function HomePage() {
  const {
    data: pks,
    isLoading: pksLoading,
    isFetching: pksFetch
  } = useGetPackageDataQuery()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const packages = pks || []
  const router = useRouter()
  const [showStartModal, setShowStartModal] = useState(false)

  const getPackageDisplayName = (item: Package) => {
    if (item.description.toLowerCase().includes('annual')) {
      return 'Explorer Package'
    } else if (
      item.description.toLowerCase().includes('15 days') ||
      item.description.toLowerCase().includes('days')
    ) {
      return 'Adventure Package'
    }
    return item.name
  }
  const isPopular = (item: Package, index: number) => {
    return index === 0 || item.description.toLowerCase().includes('annual')
  }
  const renderPackage = ({ item, index }: { item: Package; index: number }) => (
    <View style={styles.packageCardContainer}>
      <TouchableOpacity
        style={[
          styles.packageCard,
          isPopular(item, index) && styles.popularPackageCard
        ]}
        onPress={() => {
          console.log('Package ID:', item.id)
          router.push({
            pathname: '/Payment',
            params: { id: item.id.toString() }
          })
        }}
      >
        {/* Popular Badge */}
        {isPopular(item, index) && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>Popular</Text>
          </View>
        )}

        {/* Package Name */}
        <Text style={styles.packageName}>{getPackageDisplayName(item)}</Text>

        {/* Duration */}
        <Text style={styles.packageDuration}>7 days</Text>

        {/* Price */}
        <Text style={styles.packagePrice}>${item.price}</Text>

        {/* Buy Now Button */}
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            console.log('Package ID:', item.id)
            router.push({
              pathname: '/Payment',
              params: { id: item.id.toString() }
            })
          }}
        >
          <Text style={styles.buyButtonText}>Buy now</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )

  const renderDestination = ({ item }: { item: PackageApiResponse }) => (
    <View style={styles.destinationCard}>
      <Image source={item.image} style={styles.destinationImage} />
      {item.isNew && <Text style={styles.newTag}>New</Text>}
      <Text style={styles.destinationTitle}>{item.name}</Text>
      <Text style={styles.destinationMeta}>
        <Icon name="map-marker" size={12} /> {item.location}
      </Text>
      <Text style={styles.destinationMeta}>
        {item.challenges} puzzles • {item.rating} ★
      </Text>
    </View>
  )

  return (
    <ScrollView className="bg-white pt-10">
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={
            require('../../assets/Side_Image/danang.jpg') as ImageSourcePropType
          }
          style={styles.heroImage}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Are you ready? <Plane size={16} />
          </Text>
          <Text style={styles.heroSubtitle}>
            Complete the mission to unlock the next location.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowStartModal(true)}
          >
            <Text style={styles.buttonText}>Start playing</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Packages */}
      <Text style={styles.sectionTitle}>Choose your Plan</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10
        }}
      >
        <FlatList
          style={{ alignSelf: 'stretch' }}
          data={packages}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPackage}
          contentContainerStyle={{
            paddingHorizontal: 10,
            justifyContent: 'center',
            flexGrow: 1
          }}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Image Slider */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local Cultural Events</Text>
        <ImageSlider />
      </View>

      {/* Featured Destinations */}
      <Text style={styles.sectionTitle}>Featured Destinations</Text>
      <FlatList
        data={featuredDestinations}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDestination}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Challenges */}
      <View>
        <PopularChallenges />
      </View>

      {/* Testimonials */}
      <View>
        <Testimonials />
      </View>

      {/* Event */}
      <View>
        <NearbyEvents />
      </View>

      {/* Reward */}
      <View>
        <AlohaRewards />
      </View>

      {/* Subscription */}
      <View>
        <NewsletterSubscription />
      </View>

      {/* Start Playing Modal */}
      <Modal
        transparent
        visible={showStartModal}
        animationType="fade"
        onRequestClose={() => setShowStartModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-[350px] items-center">
            {/* Icon */}
            <LinearGradient
              colors={['#3b82f6', '#06b6d4', '#10b981']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
              className="items-center justify-center mb-6"
            >
              <MaterialIcons name="location-on" size={40} color="white" />
            </LinearGradient>

            {/* Title */}
            <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Ready to Explore?
            </Text>
            
            {/* Description */}
            <Text className="text-gray-600 text-center mb-6 text-base leading-6">
              Complete the mission to unlock the next location and discover amazing experiences in Vietnam!
            </Text>

            {/* Buttons */}
            <View className="w-full space-y-3">
              <TouchableOpacity
                onPress={() => {
                  setShowStartModal(false)
                  router.push('/Clue')
                }}
                className="bg-blue-500 rounded-xl py-4 items-center shadow-lg"
                style={{
                  shadowColor: '#3b82f6',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
                }}
              >
                <View className="flex-row items-center">
                  <Feather name="play" size={20} color="white" />
                  <Text className="text-white text-lg font-semibold ml-2">
                    Start Playing
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowStartModal(false)}
                className="bg-gray-100 rounded-xl py-4 items-center"
              >
                <Text className="text-gray-600 text-base font-medium">
                  Maybe Later
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  heroSection: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden'
  },
  heroImage: {
    width: '50%',
    height: 160
  },
  heroContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  heroTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  heroSubtitle: {
    color: '#555',
    marginVertical: 8
  },
  button: {
    backgroundColor: '#0aaff1',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'auto'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  packageCardContainer: {
    marginHorizontal: 4
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 12,
    padding: 12,
    width: 160,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  popularPackageCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 12,
    padding: 12,
    width: 160,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5
  },
  popularBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    zIndex: 1
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600'
  },
  packageName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 12
  },
  packageDuration: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8
  },
  packagePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12
  },
  buyButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center'
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 12,
    color: '#3B2C04'
  },
  destinationCard: {
    width: 160,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
    elevation: 2
  },
  destinationImage: {
    width: '100%',
    height: 90,
    borderRadius: 8
  },
  destinationTitle: {
    fontWeight: 'bold',
    marginTop: 6
  },
  destinationMeta: {
    fontSize: 12,
    color: '#555'
  },
  newTag: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#e7505f',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12
  }
})
