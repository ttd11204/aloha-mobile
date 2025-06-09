import EventDetails from '@/features/nearbyEvent/components/EventDetails'
import React from 'react'
import { View } from 'react-native'
import './global.css'
export default function EventDetailsPage() {
  return (
    <View className="flex-1 items-center">
      <EventDetails />
    </View>
  )
}
