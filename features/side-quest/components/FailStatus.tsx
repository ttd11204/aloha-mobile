import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay, 
  withTiming,
  Easing,
  interpolate
} from 'react-native-reanimated';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';

type ErrorInfoType = {
  message: string;
  data: {
    pointsEarned: number;
    currentProgress: string;
    message: string;
  };
} | null;

export default function FailStatus() {
  const { errorData } = useLocalSearchParams();
  const [showHints, setShowHints] = useState(false);
  const [errorInfo, setErrorInfo] = useState<ErrorInfoType>(null);
  
  // Animation values
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const contentY = useSharedValue(20);
  const contentOpacity = useSharedValue(0);
  const hintsOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const badgeScale = useSharedValue(0.6);
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
    
    // Start animations
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 600 });
    contentY.value = withDelay(500, withTiming(0, { duration: 500 }));
    contentOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));
    hintsOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));
    badgeScale.value = withDelay(300, withSpring(1, { damping: 10 }));
    
    // Animate progress bar
    if (errorInfo?.data.currentProgress) {
      progressWidth.value = withDelay(1200, withTiming(parseFloat(errorInfo.data.currentProgress) / 100, { duration: 800 }));
    }
  }, [errorData]);
  
  // Update hints animation when showHints changes
  useEffect(() => {
    if (showHints) {
      hintsHeight.value = withTiming(1, { duration: 300 });
    } else {
      hintsHeight.value = withTiming(0, { duration: 300 });
    }
  }, [showHints]);
  
  // Animated styles
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
    width: errorInfo?.data.currentProgress 
      ? `${interpolate(progressWidth.value, [0, 1], [0, 100])}%`
      : '0%',
  }));
  
  const badgeTextAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
    opacity: badgeScale.value,
  }));
  
  const hintsContentStyle = useAnimatedStyle(() => ({
    height: interpolate(hintsHeight.value, [0, 1], [0, 100]), // dùng số thay cho 'auto'
    opacity: hintsHeight.value,
    overflow: 'hidden',
  }));
  
  return (
    <View className="flex-1 justify-center items-center px-6 pt-12">
      {/* Failure Badge */}
      <Animated.View style={badgeAnimatedStyle} className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg border-4 border-white">
        <View className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600">
          <Animated.Text style={badgeTextAnimatedStyle} className="text-white text-3xl font-bold">
            FAIL
          </Animated.Text>
          <Text className="text-center text-white text-xs font-medium px-1 mt-1">
            Your Quest Is Not Yet Complete
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

        {/* Missing Requirements */}
        <Animated.View style={hintsAnimatedStyle} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <AlertTriangle size={18} color="#f59e0b" />
              <Text className="font-semibold text-gray-800 ml-2">
                Missing Requirements
              </Text>
            </View>
            <Pressable
              onPress={() => setShowHints(!showHints)}
              className="bg-amber-100 px-2 py-0.5 rounded-full"
            >
              <Text className="text-xs text-amber-600">
                {showHints ? "Hide Hints" : "Show Hints"}
              </Text>
            </Pressable>
          </View>

          {showHints ? (
            <Animated.View style={hintsContentStyle}>
              <View className="bg-white rounded-lg p-3 mb-3 border border-amber-100">
                <View className="flex-row items-start">
                  <View className="w-5 h-5 rounded-full bg-amber-100 items-center justify-center mr-2">
                    <Text className="text-xs text-amber-600">1</Text>
                  </View>
                  <Text className="text-sm text-gray-700">
                    You need to find the hidden key in the marketplace
                  </Text>
                </View>
              </View>
              
              <View className="bg-white rounded-lg p-3 border border-amber-100">
                <View className="flex-row items-start">
                  <View className="w-5 h-5 rounded-full bg-amber-100 items-center justify-center mr-2">
                    <Text className="text-xs text-amber-600">2</Text>
                  </View>
                  <Text className="text-sm text-gray-700">
                    You must solve the riddle from the local guide
                  </Text>
                </View>
              </View>
            </Animated.View>
          ) : (
            <View className="py-1 items-center">
              <Text className="text-sm text-gray-500">
                {errorInfo?.message || "Something went wrong."}
              </Text>
            </View>
          )}
        </Animated.View>

        {/* Progress Status */}
        <Animated.View style={contentAnimatedStyle} className="mb-6 px-1">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">
              Your Quest Progress
            </Text>
            {errorInfo?.data.currentProgress && (
              <Text className="text-xs font-medium text-amber-600">
                {errorInfo.data.currentProgress}% completed
              </Text>
            )}
          </View>
          
          {errorInfo?.data.currentProgress && (
            <View className="w-full bg-gray-200 rounded-full h-2.5">
              <Animated.View 
                style={progressAnimatedStyle} 
                className="bg-gradient-to-r from-amber-400 to-orange-400 h-2.5 rounded-full"
              />
            </View>
          )}
        </Animated.View>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row justify-center space-x-4 px-6 pb-6 mt-4">
        <Pressable 
          className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 flex-1 flex-row items-center justify-center mr-4"
          onPress={() => router.replace({ pathname: '/(tabs)/SideQuest' })}
        >
          <RefreshCw size={18} color="#78350f" />
          <Text className="ml-2 text-amber-900 font-semibold">Retry Quest</Text>
        </Pressable>

        <Pressable 
          className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex-1 flex-row items-center justify-center"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Exit Quest</Text>
        </Pressable>
      </View>
    </View>
  );
}
