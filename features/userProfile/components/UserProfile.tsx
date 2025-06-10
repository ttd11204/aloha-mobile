import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/features/auth/slice/authSlice';
import LoginRequired from '@/components/LoginRequired';
import { router } from 'expo-router';
import { useGetUserProfileQuery, useGetUserStatsQuery } from '../api/userProfileApi';

const { width, height } = Dimensions.get('window');

export default function UserProfile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const {data: profile, isFetching: profileFetching, isLoading: profileLoading} = useGetUserProfileQuery(userId ?? '')
  const {data: stat, isFetching: statsFetching, isLoading: statsLoading} = useGetUserStatsQuery(userId ?? '')
  const dispatch = useAppDispatch();

  const profileData = {
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    bio: 'Digital Artist & UI/UX Designer\n✨ Creating beautiful experiences\n📍 San Francisco, CA',
    quest: '10',
    rank: '30',
    clue: '12',
    avatar: require('@/assets/Side_Image/avatar.png'),
    coverImage: require('@/assets/Side_Image/background_profile.jpg'),
  };

  const achievements = [
    { icon: '🏆', title: 'Top Creator', color: 'bg-yellow-500' },
    { icon: '⭐', title: 'Verified', color: 'bg-blue-500' },
    { icon: '🎨', title: 'Artist', color: 'bg-purple-500' },
    { icon: '💎', title: 'Premium', color: 'bg-emerald-500' },
  ];

  const stats = [
    { label: 'Solved Clue', value: stat?.solvedClues },
    { label: 'Solved Quest', value: stat?.solvedQuests },
    { label: 'Current Rank', value: stat?.currentRank },
  ];

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          const decode: any = jwtDecode(token);
          setUserId(decode?.sub || null);
        } else {
          setUserId(null);
        }
      } catch (e) {
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  console.log('userId', userId);

    const handleLogout = async () => { 
      dispatch(logout());
      setUserId('');
      router.push('/Login');
    }

    if (loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;
    if (!userId) return <LoginRequired />;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: height }}
      >
        {/* Header với Cover Image */}
        <View className="relative" style={{ marginTop: 0 }}>
          <Image
            source={profileData.coverImage}
            className="w-full"
            style={{ height: height * 0.3 }}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            className="absolute bottom-0 left-0 right-0 h-24"
          />
          
          {/* Back Button và Settings */}
          <View className="absolute left-0 right-0 flex-row justify-between px-4" style={{ top: 40 }}>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-black/30 items-center justify-center">
              <Text className="text-white text-lg">←</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-black/30 items-center justify-center">
              <Text className="text-white text-lg">⋯</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info Section */}
        <View className="relative z-10" style={{ marginTop: -64, paddingBottom: 40, minHeight: height * 0.7 }}>
          {/* Avatar */}
          <View className="items-center mb-4 px-6">
            <View className="relative">
              <Image
                source={profileData.avatar}
                className="w-32 h-32 rounded-full border-4 border-white"
                resizeMode="cover"
              />
              <View className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white" />
            </View>
          </View>

          {/* Name và Username */}
          <View className="items-center mb-4 px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-1">
              {profile?.userName}
            </Text>
            <Text className="text-gray-500 text-base mb-3">
              {profile?.email}
            </Text>
            
            {/* Bio */}
            <Text className="text-gray-600 text-center leading-5 mb-4">
              {profileData.bio}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around bg-gray-50 py-4 mb-6 mx-6 rounded-2xl">
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} className="items-center">
                <Text className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {stat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mb-6 px-6">
            <TouchableOpacity
              className={`flex-1 py-3 rounded-full ${
                isFollowing ? 'bg-gray-200' : 'bg-blue-500'
              }`}
              onPress={handleLogout}
            >
              <Text className="text-center font-semibold
                text-white"
              >
                Log Out
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 py-3 rounded-full border border-gray-300">
              <Text className="text-center font-semibold text-gray-700">
                Message
              </Text>
            </TouchableOpacity>
          </View>

          {/* Achievements */}
          <View className="mb-8 flex-1 justify-center px-6">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Achievements
            </Text>
            <View className="flex-row justify-between">
              {achievements.map((achievement, index) => (
                <View key={index} className="items-center">
                  <View className={`w-16 h-16 rounded-2xl ${achievement.color} items-center justify-center mb-2`}>
                    <Text className="text-2xl">{achievement.icon}</Text>
                  </View>
                  <Text className="text-xs text-gray-600 text-center">
                    {achievement.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
