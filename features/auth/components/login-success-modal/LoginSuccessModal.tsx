import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';

interface LoginSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  userName?: string;
}

const { width, height } = Dimensions.get('window');

const LoginSuccessModal: React.FC<LoginSuccessModalProps> = ({
  visible,
  onClose,
  userName = 'Aloha',
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const checkmarkAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const messageAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
      checkmarkAnim.setValue(0);
      pulseAnim.setValue(1);
      titleAnim.setValue(0);
      messageAnim.setValue(0);
      buttonAnim.setValue(0);

      // Start smooth entrance animation sequence
      Animated.parallel([
        // Background fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Modal scale up
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 80,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After modal appears, animate content
        Animated.stagger(150, [
          // Checkmark animation
          Animated.spring(checkmarkAnim, {
            toValue: 1,
            tension: 120,
            friction: 8,
            useNativeDriver: true,
          }),
          // Title animation
          Animated.spring(titleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          // Message animation
          Animated.spring(messageAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          // Button animation
          Animated.spring(buttonAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      });

      // Start gentle pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      // Navigate to main screen
      router.replace('/(tabs)');
    });
  };

  const CheckmarkIcon = () => (
    <Animated.View
      style={{
        transform: [{ scale: checkmarkAnim }],
      }}
      className="w-20 h-20 rounded-full items-center justify-center mb-6 relative"
    >
      {/* Outer glow ring */}
      <Animated.View
        style={{
          transform: [{ scale: pulseAnim }],
        }}
        className="absolute w-20 h-20 bg-green-400/20 rounded-full"
      />
      {/* Main icon background */}
      <View className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full items-center justify-center shadow-lg">
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center">
          <Text className="text-green-500 text-2xl font-bold">✓</Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
      
      {/* Backdrop with Gradient Effect */}
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
        className="flex-1"
      >
        {/* Multi-layer Background for depth */}
        <View className="absolute inset-0 bg-black/60" />
        <View className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
        <View className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        
        {/* Modal Content */}
        <View className="flex-1 justify-center items-center px-8">
          <Animated.View
            className="bg-white rounded-3xl p-8 items-center shadow-2xl min-w-[300px] max-w-[350px] border border-white/20"
            style={[
              {
                transform: [
                  { scale: scaleAnim },
                ],
                opacity: fadeAnim,
              },
              {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.25,
                shadowRadius: 20,
                elevation: 15,
              }
            ]}
          >
            {/* Decorative Background Elements */}
            <View className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-40" />
            <View className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-40" />
            <View className="absolute top-4 left-4 w-3 h-3 bg-yellow-300 rounded-full opacity-60" />
            <View className="absolute bottom-8 right-6 w-2 h-2 bg-pink-300 rounded-full opacity-50" />
            
            {/* Success Icon */}
            <CheckmarkIcon />
            
            {/* Title */}
            <Animated.View
              style={{
                opacity: titleAnim,
                transform: [
                  {
                    translateY: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Login Successfully!
              </Text>
            </Animated.View>
            
            {/* Welcome Message */}
            <Animated.View
              style={{
                opacity: messageAnim,
                transform: [
                  {
                    translateY: messageAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <Text className="text-gray-600 text-center mb-6 text-base leading-6">
                Welcome to {userName}.{'\n'}
                Discover great experiences with Us!
              </Text>
            </Animated.View>

            {/* Decorative Dots */}
            <Animated.View 
              className="flex-row space-x-2 mb-6"
              style={{
                opacity: messageAnim,
                transform: [
                  {
                    scale: messageAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              }}
            >
              {[0, 1, 2].map((index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-blue-400' : 
                    index === 1 ? 'bg-green-400' : 'bg-purple-400'
                  }`}
                />
              ))}
            </Animated.View>
            
            {/* Action Button */}
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                  {
                    scale: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              }}
              className="w-full"
            >
              <TouchableOpacity
                onPress={handleClose}
                activeOpacity={0.8}
                className="py-4 px-8 rounded-2xl shadow-lg bg-blue-500"
                style={{
                  backgroundColor: '#3B82F6',
                  shadowColor: '#3B82F6',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Explore Now
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default LoginSuccessModal;