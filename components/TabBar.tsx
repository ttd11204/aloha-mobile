import ClueScreen from '@/app/Clue'
import { HapticTab } from '@/components/HapticTab'
import LoginRegister from '@/features/auth/components/login-register/LoginRegister'
import CluesComponent from '@/features/clue/CluesComponent'
import HomePage from '@/features/home/Home'
import PrivacyPolicy from '@/features/privacy-policy/PrivacyPolicy'
import QuestionAnswer from '@/features/QA/QuestionAnswer'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform } from 'react-native'

const Tab = createBottomTabNavigator()
const BLUE_TAB_COLOR = '#0095ff'
const ACTIVE_ICON_COLOR = '#ffff00'
const INACTIVE_ICON_COLOR = '#ffffff'

export default function TabBarLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: ACTIVE_ICON_COLOR,
        tabBarInactiveTintColor: INACTIVE_ICON_COLOR,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: BLUE_TAB_COLOR,
          ...(Platform.OS === 'android' && { position: 'absolute' })
        }
      }}
    >
      {/* <Tab.Screen
           name="SideQuest"
           component={SideQuestFull}
           options={{
             title: "SideQuest",
             tabBarIcon: ({ color }) => (
               <Ionicons name="compass" size={24} color={color} />
             ),
           }}
         /> */}
      <Tab.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: 'PrivacyPolicy',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="privacy-tip" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="index"
        component={HomePage}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="QA"
        component={QuestionAnswer}
        options={{
          title: 'Q&A',
          tabBarIcon: ({ color }) => (
            <AntDesign name="questioncircle" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Clue"
        component={ClueScreen}
        options={{
          title: 'Clue',
          tabBarIcon: ({ color }) => (
            <AntDesign name="question" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginRegister}
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="door-open" size={28} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
