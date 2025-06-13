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
  const slideAnim = useRef(new Animated.Value(50)).current;
  const checkmarkAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      checkmarkAnim.setValue(0);
      pulseAnim.setValue(1);

      // Start entrance animation sequence
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(checkmarkAnim, {
          toValue: 1,
          tension: 150,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Start pulse animation
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
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
                  { translateY: slideAnim },
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
                transform: [{ translateY: slideAnim }],
              }}
            >
              <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Login Successfully!
              </Text>
            </Animated.View>
            
            {/* Welcome Message */}
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim,
              }}
            >
              <Text className="text-gray-600 text-center mb-6 text-base leading-6">
                Welcome to {userName}.{'\n'}
                Discover great experiences with Us!
              </Text>
            </Animated.View>

            {/* Decorative Dots */}
            <View className="flex-row space-x-2 mb-6">
              {[0, 1, 2].map((index) => (
                <Animated.View
                  key={index}
                  style={{
                    opacity: fadeAnim,
                    transform: [
                      {
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      },
                    ],
                  }}
                  className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-blue-400' : 
                    index === 1 ? 'bg-green-400' : 'bg-purple-400'
                  }`}
                />
              ))}
            </View>
            
            {/* Action Button */}
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim,
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