import Sidebar from '@/components/SideBar'
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons
} from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useState } from 'react'
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import { blue } from 'react-native-reanimated/lib/typescript/Colors'

const BLUE_TAB_COLOR = '#0095ff'
const ACTIVE_ICON_COLOR = '#ffff00'
const INACTIVE_ICON_COLOR = '#ffffff'

export default function TabLayout() {
  const [isSidebarVisible, setSidebarVisible] = useState(false)

  return (
    <>
      <Sidebar
        visible={isSidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />

      <View className="h-20 bg-[#0095ff] px-5 py-4">
        <View className="flex-row items-center justify-between gap-3 pt-4">
          <TouchableOpacity onPress={() => setSidebarVisible(true)}>
            <Entypo name="menu" size={28} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: '600'
            }}
          >
            Aloha Vietnam
          </Text>
        </View>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: ACTIVE_ICON_COLOR,
          tabBarInactiveTintColor: INACTIVE_ICON_COLOR,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: BLUE_TAB_COLOR,
            ...(Platform.OS === 'android' && { position: 'absolute' })
          }
        }}
      >
        <Tabs.Screen
          name="PrivacyPolicy"
          options={{
            title: 'PrivacyPolicy',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="privacy-tip" size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="QA"
          options={{
            title: 'Q&A',
            tabBarIcon: ({ color }) => (
              <AntDesign name="questioncircle" size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="Clue"
          options={{
            title: 'Clue',
            tabBarIcon: ({ color }) => (
              <AntDesign name="question" size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="Status"
          options={{
            title: 'Status',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            )
          }}
        />
        <Tabs.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />
      </Tabs>
    </>
  )
}
