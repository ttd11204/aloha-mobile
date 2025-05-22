import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'

const screenWidth = Dimensions.get('window').width

interface SidebarProps {
  visible: boolean
  onClose: () => void
}

const menuItems = [
  { label: 'Dashboard', route: '/dashboard/Leaderboard', icon: '📊' },
  { label: 'Clues', route: '/Clue', icon: '🔍' },
  { label: 'Side Quests', route: '/SideQuest', icon: '⚡' },
  { label: 'Q&A', route: '/tabs/QA', icon: '❓' },
]

export default function Sidebar({ visible, onClose }: SidebarProps) {
  const router = useRouter()
  const translateX = useRef(new Animated.Value(-screenWidth)).current

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: true,
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
        <View 
          className="pt-12 pb-6 px-6"
          style={{ backgroundColor: '#1464c7' }}
        >
          <View className="flex-row items-center">
            <Text className="text-3xl mr-3">🌍</Text>
            <View>
              <Text className="text-2xl font-bold text-white">Aloha</Text>
              <Text className="text-lg text-blue-100">Viet Nam</Text>
            </View>
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
              <Text className="text-white text-lg font-medium flex-1">{item.label}</Text>
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