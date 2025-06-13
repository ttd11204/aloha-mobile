import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useGetUserCityCluesQuery } from '@/features/clue/api/clueApi'
import { LOCATIONS } from '@/features/map/mock/mock'
import { LocationKey } from '@/features/map/types'
import { useAppSelector } from '@/store/hooks'
import { skipToken } from '@reduxjs/toolkit/query'
import { ChevronDown, ChevronUp, MapPin, Search } from 'lucide-react-native'
import React, { useState, useEffect, useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScaledSize
} from 'react-native'

import MapView, { Circle, Marker, Callout } from 'react-native-maps'

type MapComponentProps = {
  focusClueId?: number
}

const MapComponent = ({ focusClueId }: MapComponentProps) => {
  const userId = useAppSelector((state) => state.auth.userId)
  const cityId = 1

  const [selectedLocation, setSelectedLocation] =
    useState<LocationKey>('DANANG')
  const [isExpanded, setIsExpanded] = useState(true)
  const [mapHeight, setMapHeight] = useState(400)
  const [loading, setLoading] = useState(false)
  const { data: userClue } = useGetUserCityCluesQuery(
    userId ? { userId, cityId } : skipToken
  )
  const currentLocation = LOCATIONS[selectedLocation]

  // const visibleMarkers = useMemo(() => {
  //   const clueProgress = userClue?.data ?? []

  //   // Tìm clue có isSolved = false và order nhỏ nhất
  //   const nextClue = [...clueProgress]
  //     .filter((clue) => !clue.isSolved)
  //     .sort((a, b) => a.order - b.order)[0]

  //   if (!nextClue) return []

  //   // Tìm marker tương ứng với clue đó
  //   const targetMarker = currentLocation.markers.find(
  //     (marker) => marker.clueId === nextClue.clueId
  //   )

  //   return targetMarker ? [targetMarker] : []
  // }, [currentLocation, userClue])

  const visibleMarkers = useMemo(() => {
    const clueProgress = userClue?.data ?? []

    if (focusClueId) {
      const targetMarker = currentLocation.markers.find(
        (marker) => marker.clueId === focusClueId
      )
      return targetMarker ? [targetMarker] : []
    }

    const nextClue = [...clueProgress]
      .filter((clue) => !clue.isSolved)
      .sort((a, b) => a.order - b.order)[0]

    if (!nextClue) return []

    const targetMarker = currentLocation.markers.find(
      (marker) => marker.clueId === nextClue.clueId
    )

    return targetMarker ? [targetMarker] : []
  }, [currentLocation, userClue, focusClueId])

  useEffect(() => {
    const { width } = Dimensions.get('window')
    if (width < 640) {
      setMapHeight(350)
    } else if (width < 1024) {
      setMapHeight(450)
    } else {
      setMapHeight(500)
    }

    const handleDimensionsChange = ({ window }: { window: ScaledSize }) => {
      const { width } = window
      if (width < 640) {
        setMapHeight(350)
      } else if (width < 1024) {
        setMapHeight(450)
      } else {
        setMapHeight(500)
      }
    }

    Dimensions.addEventListener('change', handleDimensionsChange)
    return () => {
      // Clean up
    }
  }, [])

  const toggleExpanded = () => setIsExpanded(!isExpanded)

  const handleLocationChange = (locationKey: any) => {
    setLoading(true)
    setSelectedLocation(locationKey)
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
    <View className="w-full rounded-xl p-4 bg-white shadow border border-gray-200">
      <View className="flex-col mb-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <MapPin width={20} height={20} className="mr-2" />
            <Text className="text-lg font-semibold">
              Treasure Hunting Areas
            </Text>
          </View>
          <TouchableOpacity onPress={toggleExpanded} className="p-2">
            {isExpanded ? (
              <ChevronUp width={20} height={20} />
            ) : (
              <ChevronDown width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>

        {isExpanded && (
          <View className="mt-3 flex-row flex-wrap">
            {Object.entries(LOCATIONS).map(([key, location]) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleLocationChange(key)}
                className={`mr-2 mb-2 px-3 py-1 rounded-full ${
                  selectedLocation === key
                    ? 'bg-blue-500'
                    : 'bg-white border border-gray-300'
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedLocation === key ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {location.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View
        className="w-full rounded-lg overflow-hidden border-2 border-amber-200 shadow"
        style={{ height: mapHeight }}
      >
        {loading ? (
          <View className="w-full h-full flex items-center justify-center bg-amber-50/50">
            <View className="items-center">
              <LoadingSpinner size="large" />
              <Text className="mt-4 text-amber-800">
                Loading treasure map...
              </Text>
            </View>
          </View>
        ) : (
          <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
              latitude: currentLocation.center[0],
              longitude: currentLocation.center[1],
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            region={{
              latitude: currentLocation.center[0],
              longitude: currentLocation.center[1],
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            zoomEnabled={true}
            scrollEnabled={true}
          >
            {visibleMarkers.map((marker, index) => (
              <React.Fragment key={index}>
                <Circle
                  center={{
                    latitude: marker.position[0],
                    longitude: marker.position[1]
                  }}
                  radius={marker.radius}
                  strokeWidth={2}
                  strokeColor={marker.color}
                  fillColor={`${marker.color}33`} // 20% opacity
                />
                {marker.name && (
                  <Marker
                    coordinate={{
                      latitude: marker.position[0],
                      longitude: marker.position[1]
                    }}
                    pinColor="#f59e0b"
                  >
                    <Callout tooltip>
                      <View className="bg-white p-2 rounded-lg shadow">
                        <Text className="font-bold text-teal-800">
                          {marker.name}
                        </Text>
                        {marker.description && (
                          <Text className="text-sm mt-1">
                            {marker.description}
                          </Text>
                        )}
                      </View>
                    </Callout>
                  </Marker>
                )}
              </React.Fragment>
            ))}
          </MapView>
        )}
      </View>

      <View className="mt-3 flex-row items-center justify-center">
        <Search width={14} height={14} className="mr-1" />
        <Text className="text-sm text-gray-600">
          Click markers for location details. Pinch to zoom in/out.
        </Text>
      </View>
    </View>
  )
}

export default MapComponent
