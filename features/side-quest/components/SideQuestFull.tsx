import { useGetQuestsDataQuery } from '@/features/side-quest/api/sideQuestApi';
import { SideQuestLayout } from '@/features/side-quest/components/SideQuestLayout';
import { Challenge } from '@/features/side-quest/types';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native';

// The bonus challenge definition
const BONUS_CHALLENGE: Challenge = {
  id: 'bonus',
  text: 'Storytelling Through Photography',
  points: 300,
  isBonus: true,
  completed: false,
  description:
    'Capture five photos that tell a story about your day in Da Nang, focusing on cultural elements, interactions with locals, and unique experiences.',
  requirements: [
    'Include at least one cultural element (temple, market, tradition)',
    'Show meaningful interactions with locals',
    'Capture unique Da Nang experiences',
    'Add thoughtful captions to each photo',
    'Post as a cohesive story sequence with #AVNTreasureHunt',
  ],
};

export default function SideQuestFull() {
  const {data: quests, isLoading} = useGetQuestsDataQuery(1) 
  const [error, setError] = useState<string | null>(null);


  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        contentContainerStyle={{ 
          paddingTop: 20, 
          paddingBottom: 40, 
          paddingHorizontal: 16 
        }}
      >
        <Text className="text-3xl font-bold text-center mb-4 text-yellow-800">
          Side Quests
        </Text>
        <Text className="text-center mb-8 text-gray-600 text-base leading-6 px-4">
          Complete side quests to earn points and move up the leaderboard! Each
          side quest offers unique points, and the Side Quest of the Day comes
          with bonus points. Document your adventures and share them with
          #AVNTreasureHunt
        </Text>
        
        {isLoading ? (
          <View className="py-10 items-center justify-center">
            <ActivityIndicator size="large" color="#92400E" />
            <Text className="mt-4 text-gray-600 text-base">Loading quests...</Text>
          </View>
        ) : error ? (
          <View className="py-10 items-center justify-center">
            <Text className="text-red-500 text-base text-center">{error}</Text>
          </View>
        ) : (
          <SideQuestLayout challenges={quests ?? []} bonusChallenge={BONUS_CHALLENGE} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}