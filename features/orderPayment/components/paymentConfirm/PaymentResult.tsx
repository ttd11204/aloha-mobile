import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  AntDesign, 
  MaterialIcons, 
  Feather, 
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons 
} from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

type PaymentStatus = 'success' | 'failed';

interface PaymentResultScreenProps {
  initialStatus?: PaymentStatus;
}

const PaymentResult: React.FC<PaymentResultScreenProps> = ({ 
  initialStatus = 'success' 
}) => {
  const params = useLocalSearchParams();
  const statusParam = typeof params.status === 'string' ? params.status : undefined;
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    statusParam === 'success' || statusParam === 'failed' ? statusParam : initialStatus
  );
  const router = useRouter();

  // Animation values
  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(16);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Container entrance animation
    containerOpacity.value = withTiming(1, { duration: 700 });
    containerTranslateY.value = withTiming(0, { duration: 700 });

    // Pulse animation for the ring
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) })
      ),
      -1,
      false
    );
  }, []);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerTranslateY.value }],
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleChangeStatus = () => {
    setPaymentStatus(prev => prev === 'success' ? 'failed' : 'success');
  };

  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  const handleGoToClues = () => {
    router.push('/Clue');
  };

  const handleTryAgain = () => {
    router.back();
  };

  const isSuccess = paymentStatus === 'success';

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
      >
        <View className="flex-1 flex justify-center items-center px-4 py-12">
          <Animated.View 
            style={containerAnimatedStyle}
            className="w-full max-w-sm flex flex-col items-center justify-center space-y-8 bg-white/90 rounded-2xl p-8"
          >
            {/* Status Icon */}
            <View className="relative">
              {/* Animated pulse ring */}
              <Animated.View 
                style={pulseAnimatedStyle}
                className={`absolute inset-0 w-28 h-28 rounded-full ${
                  isSuccess ? 'bg-blue-600' : 'bg-red-500'
                } opacity-20`}
              />

              {/* Main circle with icon */}
              <View className={`relative w-28 h-28 rounded-full border-4 ${
                isSuccess ? 'border-blue-600' : 'border-red-500'
              } flex items-center justify-center bg-white shadow-lg`}>
                {isSuccess ? (
                  <AntDesign 
                    name="check" 
                    size={60} 
                    color="#2563eb" 
                  />
                ) : (
                  <AntDesign 
                    name="close" 
                    size={60} 
                    color="#ef4444" 
                  />
                )}
              </View>

              {/* Decorative travel-themed elements around the circle */}
              <View className="absolute -top-6 left-1/2 -translate-x-1/2">
                <Feather name="sun" size={24} color="#eab308" />
              </View>
              
              <View className="absolute top-3 -right-5">
                <MaterialIcons name="flight" size={24} color="#dc2626" />
              </View>
              
              <View className="absolute -bottom-3 -right-7">
                <AntDesign name="creditcard" size={24} color="#3b82f6" />
              </View>
              
              <View className="absolute -left-6 -top-2">
                <Feather name="map-pin" size={24} color="#22c55e" />
              </View>
              
              <View className="absolute -bottom-5 -left-5">
                <MaterialCommunityIcons name="home-map-marker" size={24} color="#a855f7" />
              </View>
            </View>

            {/* Payment status text */}
            <View className="text-center items-center">
              <Text className={`text-3xl font-bold ${
                isSuccess ? 'text-blue-600' : 'text-red-600'
              } mt-4 tracking-wide`}>
                {isSuccess ? 'Payment Success!' : 'Payment Failed!'}
              </Text>
              <Text className={`${
                isSuccess ? 'text-blue-700' : 'text-red-800'
              } mt-2 text-base`}>
                {isSuccess ? 'Your adventure awaits!' : "We couldn't process your payment"}
              </Text>
            </View>

            {/* Booking/Error information */}
            {isSuccess ? (
              <View className="w-full bg-blue-50 rounded-lg p-4 border border-blue-200">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-blue-600">Booking Reference:</Text>
                  <Text className="text-sm text-blue-600 font-bold">XYZ12345</Text>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-sm text-blue-600">Confirmation Email:</Text>
                  <Text className="text-sm text-blue-600 font-bold">Sent ✓</Text>
                </View>
              </View>
            ) : (
              <View className="w-full bg-red-50 rounded-lg p-3 border border-red-100">
                <View className="flex-row items-start">
                  <Feather name="info" size={16} color="#b91c1c" className="mr-2 flex-shrink-0" />
                  <Text className="text-sm text-red-700 flex-1 ml-2">
                    Your payment could not be processed. Please check your payment details and try again.
                  </Text>
                </View>
              </View>
            )}

            {/* Navigation buttons */}
            <View className="w-full flex-row justify-between space-x-6 mt-6">
              <Pressable
                onPress={handleGoHome}
                className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg mr-3 ${
                  isSuccess 
                    ? 'bg-teal-100 border border-teal-200' 
                    : 'bg-red-100 border border-red-200'
                }`}
              >
                <AntDesign 
                  name="home" 
                  size={18} 
                  color={isSuccess ? '#0f766e' : '#dc2626'} 
                />
                <Text className={`ml-2 font-medium ${
                  isSuccess ? 'text-teal-700' : 'text-red-700'
                }`}>
                  Home
                </Text>
              </Pressable>

              {isSuccess ? (
                <Pressable
                  onPress={handleGoToClues}
                  className="flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg bg-blue-600"
                >
                  <Feather name="map" size={18} color="white" />
                  <Text className="ml-2 font-medium text-white">My Clues</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleTryAgain}
                  className="flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg bg-red-600"
                >
                  <Ionicons name="arrow-back-circle-outline" size={18} color="white" />
                  <Text className="ml-2 font-medium text-white">Try Again</Text>
                </Pressable>
              )}
            </View>

            {/* Additional options */}
            <View className="w-full flex items-center mt-2">
              {isSuccess ? (
                <Pressable className="flex-row items-center">
                  <Feather name="file-text" size={14} color="#2563eb" />
                  <Text className="ml-1 text-sm text-blue-600 underline">
                    Download Receipt
                  </Text>
                </Pressable>
              ) : (
                <Pressable className="flex-row items-center">
                  <Feather name="info" size={14} color="#dc2626" />
                  <Text className="ml-1 text-sm text-red-600 underline">
                    Contact Support
                  </Text>
                </Pressable>
              )}
            </View>

            {/* Toggle button for demo purposes - remove in production */}
            <Pressable
              onPress={handleChangeStatus}
              className="mt-8 px-3 py-1 border border-gray-200 rounded-full"
            >
              <Text className="text-xs text-gray-400">
                Change Toggle Status
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentResult;
