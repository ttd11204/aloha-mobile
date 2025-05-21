import TabHeader from '@/components/TabHeader'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

const BLUE_TAB_COLOR = '#0095ff'
const ACTIVE_ICON_COLOR = '#ffff00'
const INACTIVE_ICON_COLOR = '#ffffff'

export default function TabLayout() {
  return (
    <>
      <TabHeader />
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
          name="SideQuest"
          options={{
            title: 'SideQuest',
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
          name="Login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="door-open" size={28} color={color} />
            )
          }}
        />
      </Tabs>
    </>
  )
}
