import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image
} from 'react-native'
import { useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'

const screenWidth = Dimensions.get('window').width

interface SidebarProps {
  visible: boolean
  onClose: () => void
}

const menuItems = [
  {
    label: 'Dashboard',
    route: '/Dashboard',
    icon: '📊',
    backgroundColor: '#187af2'
  },
  { label: 'Clues', route: '/Clue', icon: '🔍', backgroundColor: '#187af2' },
  {
    label: 'Side Quests',
    route: '/SideQuest',
    icon: '⚡',
    backgroundColor: '#187af2'
  },
  { label: 'Q&A', route: '/(tabs)/QA', icon: '❓', backgroundColor: '#187af2' },
  { label: 'StreetView', route: '/StreetView', icon: '❓', backgroundColor: '#187af2' }
]

export default function Sidebar({ visible, onClose }: SidebarProps) {
  const router = useRouter()
  const translateX = useRef(new Animated.Value(-screenWidth)).current

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: true
    }).start()
  }, [visible])

  const handleNavigate = (route: string) => {
    onClose()
    router.push(route as any)
  }

  return (
    <Animated.View
      className="absolute z-50 w-full h-full"
      style={{
        transform: [{ translateX }],
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}
    >
      <View
        className="w-80 h-full shadow-2xl"
        style={{ backgroundColor: '#187af2' }}
      >
        {/* Header Section */}
        {/* Header Section */}
        <View
          className="pt-16 pb-8 px-6 relative"
          style={{
            backgroundColor: '#1464c7',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.1)'
          }}
        >
          {/* Decorative Background Pattern */}
          <View
            className="absolute inset-0 opacity-10"
            style={{
              backgroundColor: 'transparent'
            }}
          >
            <View className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white opacity-5" />
            <View className="absolute top-12 right-12 w-12 h-12 rounded-full bg-white opacity-10" />
            <View className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white opacity-5" />
          </View>

          {/* Main Content */}
          <View className="flex-row items-center relative z-10">
            {/* Logo Container */}
            <View
              className="mr-4 relative"
              style={{
                width: 64,
                height: 64
              }}
            >
              {/* Outer Ring */}
              <View
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5
                }}
              />

              {/* Inner Ring */}
              <View
                className="absolute rounded-full"
                style={{
                  top: 4,
                  left: 4,
                  right: 4,
                  bottom: 4,
                  backgroundColor: 'rgba(255,255,255,0.15)'
                }}
              />

              {/* Logo */}
              <View
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  top: 8,
                  left: 8,
                  right: 8,
                  bottom: 8,
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }}
              >
                <Image
                  source={require('../assets/images/aloha.png')}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18
                  }}
                  resizeMode="cover"
                />
              </View>

              {/* Shine Effect */}
              <View
                className="absolute rounded-full"
                style={{
                  top: 8,
                  left: 8,
                  width: 20,
                  height: 20,
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  transform: [{ rotate: '45deg' }]
                }}
              />
            </View>

            {/* Text Content */}
            <View className="flex-1">
              <Text
                className="text-white mb-1"
                style={{
                  fontSize: 26,
                  fontWeight: '700',
                  letterSpacing: 0.5,
                  textShadowColor: 'rgba(0, 0, 0, 0.3)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2
                }}
              >
                Aloha
              </Text>
              <Text
                className="text-blue-100"
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  opacity: 0.9,
                  letterSpacing: 1
                }}
              >
                VIET NAM
              </Text>
            </View>
          </View>

          {/* Welcome Message */}
          <View className="mt-4 pt-4 border-t border-white/10">
            <Text
              className="text-blue-100 text-center"
              style={{
                fontSize: 14,
                fontWeight: '400',
                opacity: 0.8,
                fontStyle: 'italic'
              }}
            >
              Welcome back! 👋
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="flex-1 pt-4 px-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.route}
              onPress={() => handleNavigate(item.route)}
              className="flex-row items-center p-4 mb-2 rounded-lg active:opacity-80"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)'
              }}
            >
              <Text className="text-xl mr-3">{item.icon}</Text>
              <Text className="text-white text-lg font-medium flex-1">
                {item.label}
              </Text>
              <Text className="text-white opacity-60 text-lg">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Close Button */}
        <View className="p-6">
          <TouchableOpacity
            onPress={onClose}
            className="flex-row items-center justify-center p-4 rounded-lg active:opacity-80"
            style={{ backgroundColor: '#dc2626' }}
          >
            <Text className="text-white text-lg font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}
