import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

export default function LoginRequired() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { height, safeAreaInsets, isSmallScreen } = useResponsiveDesign();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 35,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLoginNow = () => {
    router.replace('/Login');
  };

  const handleSkip = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#0095ff" />

      <LinearGradient
        colors={['#0095ff', '#0080e6', '#0066cc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        {/* Close Button */}
        <TouchableOpacity
          onPress={handleSkip}
          className="absolute top-4 left-4 w-10 h-10 bg-black/20 rounded-full items-center justify-center z-10"
          activeOpacity={0.7}
        >
          <Feather name="x" size={20} color="white" />
        </TouchableOpacity>

        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            className="flex-1 px-6"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            {/* Top Section - 25% */}
            <View className="flex-1 justify-center items-center" style={{ height: height * 0.25 }}>
              <Animated.View 
                className="items-center"
                style={{ transform: [{ scale: scaleAnim }] }}
              >
                {/* Lock Icon */}
                <View className="w-20 h-20 bg-white/20 rounded-3xl items-center justify-center mb-4 backdrop-blur-sm border border-white/30">
                  <Feather name="lock" size={32} color="white" />
                </View>

                {/* Title */}
                <Text className="text-white text-2xl font-bold text-center mb-2">
                  Login To Continue
                </Text>
                <Text className="text-white/90 text-sm text-center leading-5 px-2">
                  You need to login to experience all the{'\n'}awesome features of the application
                </Text>
              </Animated.View>
            </View>

            {/* Middle Section - 35% */}
            <View className="flex-1" style={{ height: height * 0.35 }}>
              <Animated.View 
                className="space-y-4 pt-4"
                style={{ transform: [{ translateY: slideAnim }] }}
              >
                {/* Feature 1 */}
                <View className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-5 border border-white/25">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-blue-400 rounded-xl items-center justify-center mr-4">
                      <Feather name="star" size={20} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-semibold text-lg">
                        Advanced features
                      </Text>
                      <Text className="text-white/80 text-sm mt-1">
                        Access unlimited all features
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Feature 2 */}
                <View className="bg-white/15 backdrop-blur-md rounded-2xl mb-5 p-4 border border-white/25">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-green-400 rounded-xl items-center justify-center mr-4">
                      <Feather name="cloud" size={20} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-semibold text-lg">
                        Data synchronization
                      </Text>
                      <Text className="text-white/80 text-sm mt-1">
                        Store and synchronize data on all devices
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Feature 3 */}
                <View className="bg-white/15 backdrop-blur-md rounded-2xl mb-5 p-4 border border-white/25">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-orange-400 rounded-xl items-center justify-center mr-4">
                      <Feather name="shield" size={20} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-semibold text-lg">
                        High security
                      </Text>
                      <Text className="text-white/80 text-sm mt-1">
                        Data is protected absolutely
                      </Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
            </View>

            {/* Bottom Section - 40% */}
            <View className="flex-1 justify-center pb-8" >
              <Animated.View 
                className="space-y-4"
                style={{ transform: [{ scale: scaleAnim }] }}
              >
                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLoginNow}
                  className="w-full"
                  activeOpacity={0.9}
                >
                  <View className="bg-red-500 rounded-2xl py-5 items-center justify-center shadow-xl">
                    <View className="flex-row items-center">
                      <Feather name="arrow-right" size={20} color="white" />
                      <Text className="text-white text-lg font-bold ml-2">
                        Login
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Skip Button */}
                <TouchableOpacity
                  onPress={handleSkip}
                  className="w-full mt-5 py-4 items-center justify-center bg-white/10 rounded-2xl border border-white/30"
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-base font-medium">
                    Skip this time
                  </Text>
                </TouchableOpacity>

                {/* Bottom Info */}
                <View className="items-center pt-4">
                  <Text className="text-white/70 text-sm">
                    Free • Fast • Safe
                  </Text>
                </View>
              </Animated.View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>

      {/* Bottom Navigation */}
      {/* <View className="bg-blue-500 flex-row">
        <TouchableOpacity className="flex-1 items-center py-3">
          <Feather name="info" size={20} color="white" />
          <Text className="text-white text-xs mt-1">PrivacyPolicy</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-3 bg-blue-600">
          <Feather name="home" size={20} color="white" />
          <Text className="text-white text-xs mt-1">Home</Text>
          <View className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-3">
          <Feather name="help-circle" size={20} color="white" />
          <Text className="text-white text-xs mt-1">Q&A</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-3">
          <Feather name="user" size={20} color="yellow-400" />
          <Text className="text-yellow-400 text-xs mt-1">Profile</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};