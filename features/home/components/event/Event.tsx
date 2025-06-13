import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { nearbyEventsStyles } from './EventStyle'
import { useRouter } from 'expo-router'

const nearbyEvents = [
  {
    title: 'Cultural Festival',
    description: 'Experience traditional dances and music.',
    location: 'Da Nang',
    distance: '2 km',
    status: 'Now',
    image: require('@/assets/Side_Image/puppet.jpg')
  },
  {
    title: 'Vietnamese Cooking Class',
    description: 'Learn to make authentic phở and spring rolls',
    location: 'Da Nang Cooking Centre',
    distance: '2.3 km away',
    status: 'Today',
    image: require('@/assets/Side_Image/cooking.jpg')
  },
  {
    title: 'Night Market Tour',
    description: 'Explore local street food and souvenirs',
    location: 'Da Nang',
    distance: '0.8 km away',
    status: 'Tomorrow',
    image: require('@/assets/Side_Image/nightmarket.jpg')
  }
]

const NearbyEvents = () => {
  const router = useRouter()
  return (
    <View style={nearbyEventsStyles.section}>
      <Text style={nearbyEventsStyles.sectionTitle}>
        Nearby Events & Activities
      </Text>
      {nearbyEvents.map((event, index) => (
        <TouchableOpacity
          key={index}
          style={nearbyEventsStyles.eventCard}
          onPress={() =>
            router.push({
              pathname: '/EventDetails',
              params: { event: JSON.stringify(event) }
            })
          }
        >
          <Image source={event.image} style={nearbyEventsStyles.eventImage} />
          <View style={nearbyEventsStyles.eventTextContainer}>
            <View style={nearbyEventsStyles.eventHeader}>
              <Text style={nearbyEventsStyles.eventTitle}>{event.title}</Text>
              <Text style={nearbyEventsStyles.eventStatus}>{event.status}</Text>
            </View>
            <Text style={nearbyEventsStyles.eventDescription}>
              {event.description}
            </Text>
            <View style={nearbyEventsStyles.eventFooter}>
              <FontAwesome5 name="map-marker-alt" size={12} color="#555" />
              <Text style={nearbyEventsStyles.eventLocation}>
                {event.location}
              </Text>
              <Text style={nearbyEventsStyles.eventDistance}>
                {' '}
                • {event.distance}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={nearbyEventsStyles.viewAllButton}>
        <Text style={nearbyEventsStyles.viewAllButtonText}>
          View All Activities
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default NearbyEvents
