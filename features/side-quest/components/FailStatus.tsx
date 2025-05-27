import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay, 
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function FailStatus() {
  const { errorData } = useLocalSearchParams();
  const [showHints, setShowHints] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const contentY = useSharedValue(20);
  const contentOpacity = useSharedValue(0);
  const hintsOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const hintsHeight = useSharedValue(0);

  useEffect(() => {
    let errorString = '';
    if (Array.isArray(errorData)) {
      errorString = errorData[0];
    } else if (typeof errorData === 'string') {
      errorString = errorData;
    }
    if (errorString) {
      try {
        const parsedError = JSON.parse(decodeURIComponent(errorString));
        setErrorInfo(parsedError);
      } catch (err) {
        console.error('Error parsing errorData:', err);
      }
    }

    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 600 });
    contentY.value = withDelay(500, withTiming(0, { duration: 500 }));
    contentOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));
    hintsOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));

    progressWidth.value = withDelay(1200, withTiming(0 / 100, { duration: 800 }));
  }, [errorData]);

  useEffect(() => {
    if (showHints) {
      hintsHeight.value = withSpring(1, { damping: 12 });
    } else {
      hintsHeight.value = withSpring(0, { damping: 12 });
    }
  }, [showHints]);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentY.value }],
    opacity: contentOpacity.value,
  }));

  const hintsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: hintsOpacity.value,
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progressWidth.value, [0, 1], [0, 100])}%`,
  }));

  const hintsContentStyle = useAnimatedStyle(() => ({
    height: interpolate(hintsHeight.value, [0, 1], [0, 60]),
    opacity: hintsHeight.value,
    overflow: 'hidden',
  }));

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      {/* Failure Badge */}
      <Animated.View style={badgeAnimatedStyle} className="w-32 h-32 rounded-full flex items-center justify-center bg-orange-500 shadow-lg">
        <View className="w-28 h-28 rounded-full flex items-center justify-center bg-orange-600">
          <Text className="text-white text-xl font-bold">
            FAIL
          </Text>
          <Text className="text-center text-white text-xs font-medium px-1">
            Your Quest Isn't Yet Complete
          </Text>
        </View>
      </Animated.View>

      {/* Card Content */}
      <View className="w-full mt-6">
        <Animated.View style={contentAnimatedStyle} className="mb-6 items-center">
          <Text className="text-xl font-bold text-gray-800 mb-2">
            Challenge Failed
          </Text>
          <Text className="text-gray-600 text-sm text-center">
            Do not worry! You can try again and complete your quest.
          </Text>
        </Animated.View>

        {/* Missing Requirements Section */}
        <Animated.View style={hintsAnimatedStyle} className="bg-yellow-50 rounded-xl p-4 mb-6">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="alert-outline" size={18} color="#d97706" />
              <Text className="font-semibold text-gray-800 ml-2">
                Missing Requirements
              </Text>
            </View>
            <Pressable
              onPress={() => setShowHints(!showHints)}
              className="px-2 py-1"
            >
              <Text className="text-sm text-orange-600 font-semibold">
                Show Hints
              </Text>
            </Pressable>
          </View>
          {showHints && (
            <Animated.View style={hintsContentStyle} className="mt-2">
              <Text className="text-sm text-gray-600">
                The evidence provided does not match the side quest's requirement.
              </Text>
            </Animated.View>
          )}
        </Animated.View>

        {/* Quest Progress */}
        <Animated.View style={contentAnimatedStyle} className="mb-6 px-1">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">
              Your Quest Progress
            </Text>
            <Text className="text-xs font-medium text-teal-600">
              0/11 completed
            </Text>
          </View>
          <View className="w-full bg-gray-200 rounded-full h-2.5">
            <Animated.View style={progressAnimatedStyle} className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2.5 rounded-full"/>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row justify-center space-x-4 px-6 pb-6 mt-4">
        <Pressable 
          className="px-5 py-3 mr-2 rounded-full bg-yellow-500 flex-1 flex-row items-center justify-center"
          onPress={() => router.replace({ pathname: '/SideQuest' })}
        >
          <Feather name="refresh-cw" size={18} color="black" />
          <Text className="text-white font-semibold ml-2">Retry Quest</Text>
        </Pressable>
        <Pressable 
          className="px-5 py-3 rounded-full bg-orange-500 flex-1 flex-row items-center justify-center"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Exit Quest</Text>
        </Pressable>
      </View>
    </View>
  );
}