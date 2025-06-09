import React from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'

const { width } = Dimensions.get('window')

interface EventDetailsProps {
  route?: {
    params?: {
      event?: {
        title: string
        description: string
        location: string
        distance: string
        status: string
        image: any
      }
    }
  }
  navigation?: any
}

const EventDetails: React.FC<EventDetailsProps> = ({ route, navigation }) => {
  const router = useRouter()
  let event = route?.params?.event
  // Nếu dùng expo-router, lấy từ useLocalSearchParams
  const params = useLocalSearchParams()
  if (!event && params.event) {
    try {
      event = JSON.parse(params.event as string)
    } catch {}
  }

  // Sample event data - in real app, this would come from route params
  event = event || {
    title: 'Cultural Festival',
    description: 'Experience traditional dances and music.',
    location: 'Hanoi',
    distance: '2 km',
    status: 'Now',
    image: require('@/assets/Side_Image/puppet.jpg')
  }

  const eventDetails = {
    date: 'June 9, 2025',
    time: '6:00 PM - 10:00 PM',
    fullLocation: 'Hoan Kiem Lake, Old Quarter, Hanoi',
    organizer: 'Hanoi Cultural Heritage Center',
    price: 'Free',
    capacity: '500 people',
    description: `Join us for an enchanting evening celebrating Vietnamese cultural heritage at the beautiful Hoan Kiem Lake. This spectacular cultural festival features traditional water puppetry performances, folk music concerts, and authentic dance presentations.

Experience the rich tapestry of Vietnamese culture through:
• Traditional water puppet shows every hour
• Live performances by renowned folk musicians
• Interactive workshops on traditional crafts
• Authentic Vietnamese cuisine from local vendors
• Cultural exhibitions showcasing historical artifacts

This family-friendly event is perfect for visitors and locals alike who want to immerse themselves in Vietnam's vibrant cultural traditions. Don't miss this unique opportunity to witness centuries-old art forms in one of Hanoi's most iconic locations.`,
    highlights: [
      'Water puppet performances',
      'Traditional folk music',
      'Cultural workshops',
      'Local food vendors',
      'Historical exhibitions'
    ]
  }

  const nearbyActivities = [
    {
      title: 'Temple of Literature',
      distance: '1.2 km',
      type: 'Historical Site',
      rating: 4.8
    },
    {
      title: "Vietnamese Women's Museum",
      distance: '0.9 km',
      type: 'Museum',
      rating: 4.6
    },
    {
      title: 'Ngoc Son Temple',
      distance: '0.3 km',
      type: 'Temple',
      rating: 4.7
    }
  ]

  const handleStreetView = () => {
    // Handle Street View navigation
    console.log('Opening Street View...')
  }

  const handleBookmark = () => {
    console.log('Bookmarked event')
  }

  const handleShare = () => {
    console.log('Sharing event')
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      {/* Header Image with Gradient Overlay */}
      <View style={{ position: 'relative' }}>
        <Image
          source={event.image}
          style={{ width: '100%', height: 320 }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 128
          }}
        />
        {/* Action Buttons */}
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 16,
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            onPress={handleBookmark}
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 999,
              padding: 12,
              marginRight: 8
            }}
          >
            <FontAwesome5 name="bookmark" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 999,
              padding: 12
            }}
          >
            <FontAwesome5 name="share" size={18} color="white" />
          </TouchableOpacity>
        </View>
        {/* Status Badge */}
        <View
          style={{ position: 'absolute', top: 15, alignSelf: 'flex-start' }}
        >
          <View
            style={{
              backgroundColor: '#ef4444',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 999
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
              {event.status}
            </Text>
          </View>
        </View>
        {/* Event Title Overlay */}
        <View style={{ position: 'absolute', bottom: 24, left: 16, right: 16 }}>
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              marginBottom: 8
            }}
          >
            {event.title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="map-marker-alt" size={16} color="white" />
            <Text style={{ color: 'white', marginLeft: 8, fontSize: 16 }}>
              {eventDetails.fullLocation}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Event Info Cards */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 24
            }}
          >
            <View
              style={{
                backgroundColor: '#dbeafe',
                borderRadius: 16,
                padding: 16,
                flex: 1,
                marginRight: 8
              }}
            >
              <FontAwesome5 name="calendar-alt" size={24} color="#3B82F6" />
              <Text style={{ color: '#4b5563', fontSize: 14, marginTop: 8 }}>
                Date
              </Text>
              <Text style={{ color: '#111827', fontWeight: '600' }}>
                {eventDetails.date}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#d1fae5',
                borderRadius: 16,
                padding: 16,
                flex: 1,
                marginHorizontal: 4
              }}
            >
              <FontAwesome5 name="clock" size={24} color="#10B981" />
              <Text style={{ color: '#4b5563', fontSize: 14, marginTop: 8 }}>
                Time
              </Text>
              <Text style={{ color: '#111827', fontWeight: '600' }}>
                {eventDetails.time}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#ede9fe',
                borderRadius: 16,
                padding: 16,
                flex: 1,
                marginLeft: 8
              }}
            >
              <FontAwesome5 name="ticket-alt" size={24} color="#8B5CF6" />
              <Text style={{ color: '#4b5563', fontSize: 14, marginTop: 8 }}>
                Price
              </Text>
              <Text style={{ color: '#111827', fontWeight: '600' }}>
                {eventDetails.price}
              </Text>
            </View>
          </View>
          {/* Description */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: 16
              }}
            >
              About This Event
            </Text>
            <Text style={{ color: '#374151', fontSize: 16, lineHeight: 24 }}>
              {eventDetails.description}
            </Text>
          </View>
          {/* Highlights */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: 16
              }}
            >
              Event Highlights
            </Text>
            {eventDetails.highlights.map((highlight, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12
                }}
              >
                <View
                  style={{
                    backgroundColor: '#ffedd5',
                    borderRadius: 999,
                    padding: 8,
                    marginRight: 12
                  }}
                >
                  <FontAwesome5 name="star" size={12} color="#F59E0B" />
                </View>
                <Text style={{ color: '#374151', fontSize: 16, flex: 1 }}>
                  {highlight}
                </Text>
              </View>
            ))}
          </View>
          {/* Event Details */}
          <View
            style={{
              backgroundColor: '#f3f4f6',
              borderRadius: 16,
              padding: 16,
              marginBottom: 24
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: 16
              }}
            >
              Event Details
            </Text>
            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: '#4b5563' }}>Organizer</Text>
                <Text style={{ color: '#111827', fontWeight: '500' }}>
                  {eventDetails.organizer}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: '#4b5563' }}>Capacity</Text>
                <Text style={{ color: '#111827', fontWeight: '500' }}>
                  {eventDetails.capacity}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: '#4b5563' }}>Distance</Text>
                <Text style={{ color: '#111827', fontWeight: '500' }}>
                  {event.distance} away
                </Text>
              </View>
            </View>
          </View>
          {/* Nearby Activities */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: 16
              }}
            >
              Nearby Activities
            </Text>
            {nearbyActivities.map((activity, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOpacity: 0.05,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  elevation: 2
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: '#111827',
                        fontWeight: '600',
                        fontSize: 16
                      }}
                    >
                      {activity.title}
                    </Text>
                    <Text style={{ color: '#4b5563', fontSize: 14 }}>
                      {activity.type}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 4
                      }}
                    >
                      <FontAwesome5 name="star" size={12} color="#F59E0B" />
                      <Text
                        style={{
                          color: '#4b5563',
                          fontSize: 14,
                          marginLeft: 4
                        }}
                      >
                        {activity.rating}
                      </Text>
                      <Text
                        style={{
                          color: '#9ca3af',
                          fontSize: 14,
                          marginLeft: 8
                        }}
                      >
                        • {activity.distance}
                      </Text>
                    </View>
                  </View>
                  <FontAwesome5
                    name="chevron-right"
                    size={16}
                    color="#9CA3AF"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* Street View Button */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/StreetView',
                params: { event: JSON.stringify(event) }
              })
            }
            style={{
              backgroundColor: '#2563eb',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24
            }}
          >
            <MaterialIcons name="streetview" size={24} color="white" />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 12
              }}
            >
              Open Street View
            </Text>
          </TouchableOpacity>
          {/* Get Directions Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#16a34a',
              borderRadius: 16,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32
            }}
          >
            <FontAwesome5 name="directions" size={20} color="white" />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 12
              }}
            >
              Get Directions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default EventDetails
