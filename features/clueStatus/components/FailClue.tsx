import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withRepeat, 
  withSequence, 
  Easing,
  withDelay
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define particle interface
interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
}

export default function FailClue()  {
  const [particles, setParticles] = useState<Particle[]>([]);
  const router = useRouter();
  
  // Animated values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const iconScale = useSharedValue(0.5);
  const headerTranslateY = useSharedValue(16);
  const messageTranslateY = useSharedValue(16);
  const buttonTranslateY = useSharedValue(16);
  const buttonTwoTranslateY = useSharedValue(16);
  const footerOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Initialize animations
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000 });
    iconScale.value = withDelay(300, withTiming(1, { duration: 1000 }));
    headerTranslateY.value = withDelay(500, withTiming(0, { duration: 700 }));
    messageTranslateY.value = withDelay(700, withTiming(0, { duration: 700 }));
    buttonTranslateY.value = withDelay(900, withTiming(0, { duration: 500 }));
    buttonTwoTranslateY.value = withDelay(1000, withTiming(0, { duration: 500 }));
    footerOpacity.value = withDelay(1200, withTiming(1, { duration: 1000 }));

    // Initialize particles
    initParticles();
  }, []);

  const initParticles = () => {
    const newParticles: Particle[] = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * SCREEN_WIDTH,
        y: Math.random() * SCREEN_HEIGHT,
        radius: Math.random() * 3 + 1,
        color: `rgba(255, ${
          Math.floor(Math.random() * 100) + 100
        }, ${Math.floor(Math.random() * 50)}, ${Math.random() * 0.3 + 0.1})`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
      });
    }
    
    setParticles(newParticles);
  };

  // Setup canvas ref
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation loop for particles
  useEffect(() => {
    let animationFrameId: number;
    
    const updateParticles = () => {
      const particlesContext = particlesCanvasRef.current?.getContext('2d');
      if (!particlesContext || particles.length === 0) {
        animationFrameId = requestAnimationFrame(updateParticles);
        return;
      }
      
      // Clear canvas
      particlesContext.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      
      // Update and draw particles
      const updatedParticles = [...particles];
      updatedParticles.forEach((p, i) => {
        // Draw particle
        particlesContext.fillStyle = p.color;
        particlesContext.beginPath();
        particlesContext.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        particlesContext.fill();
        
        // Move particles
        updatedParticles[i].x += p.speedX;
        updatedParticles[i].y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > SCREEN_WIDTH) updatedParticles[i].speedX *= -1;
        if (p.y < 0 || p.y > SCREEN_HEIGHT) updatedParticles[i].speedY *= -1;
      });
      
      setParticles(updatedParticles);
      animationFrameId = requestAnimationFrame(updateParticles);
    };
    
    animationFrameId = requestAnimationFrame(updateParticles);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles]);

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
    opacity: iconScale.value,
  }));
  
  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
    opacity: headerTranslateY.value === 0 ? 1 : 0,
  }));
  
  const messageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: messageTranslateY.value }],
    opacity: messageTranslateY.value === 0 ? 1 : 0,
  }));
  
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonTranslateY.value }],
    opacity: buttonTranslateY.value === 0 ? 1 : 0,
  }));
  
  const buttonTwoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonTwoTranslateY.value }],
    opacity: buttonTwoTranslateY.value === 0 ? 1 : 0,
  }));
  
  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }));

  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      
      {/* Particle background */}
      <View style={StyleSheet.absoluteFill}>
        <canvas ref={particlesCanvasRef} style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} />
      </View>
      
      {/* Glowing accent */}
      <View className="absolute top-1/4 left-1/2 w-64 h-64 rounded-full bg-red-500 opacity-20" 
        style={{ 
          transform: [{ translateX: -128 }, { translateY: -128 }],
          shadowColor: '#EF4444',
          shadowOpacity: 0.5,
          shadowRadius: 50,
          elevation: 20
        }} 
      />
      
      {/* Error card */}
      <Animated.View 
        style={containerStyle} 
        className="relative z-10 bg-black bg-opacity-40 m-4 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
      >
        {/* Top red indicator bar */}
        <View className="h-1.5 w-full bg-red-500" />
        
        {/* Icon and error header */}
        <View className="pt-8 pb-4 px-6">
          <Animated.View 
            style={iconStyle}
            className="w-20 h-20 mx-auto mb-6 bg-red-500 bg-opacity-10 rounded-full items-center justify-center"
          >
            <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#EF4444"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Animated.View>

          <Animated.Text 
            style={headerStyle}
            className="text-center text-2xl font-bold text-white mb-2"
          >
            Authentication Failed
          </Animated.Text>

          <View className="w-12 h-1 bg-red-500 mx-auto rounded-full opacity-70" />
        </View>

        {/* Error message */}
        <Animated.View 
          style={messageStyle}
          className="bg-gray-800 bg-opacity-50 px-6 py-6"
        >
          <Text className="text-center text-gray-300">
            The password you entered does not match our records. Please
            double-check and try again.
          </Text>
        </Animated.View>

        {/* Action buttons */}
        <View className="p-6 space-y-3">
          <Animated.View style={buttonStyle}>
            <TouchableOpacity
              className="w-full py-3 px-4 bg-red-500 rounded-lg flex-row items-center justify-center"
              activeOpacity={0.7}
              onPress={() => router.push('/SideQuest')}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" className="mr-2">
                <Path
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text className="text-white font-medium">Explore Side Quest</Text>
            </TouchableOpacity>
          </Animated.View>

          <View className="relative py-3">
            <View className="absolute inset-0 flex-row items-center">
              <View className="flex-1 border-t border-gray-700"></View>
            </View>
            <View className="relative flex-row justify-center">
              <Text className="bg-gray-800 px-2 text-gray-500 text-xs uppercase">or</Text>
            </View>
          </View>

          <Animated.View style={buttonTwoStyle}>
            <TouchableOpacity
              className="w-full py-3 px-4 bg-gray-800 rounded-lg flex-row items-center justify-center border border-gray-700"
              activeOpacity={0.7}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" className="mr-2">
                <Path
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  stroke="#D1D5DB"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text className="text-gray-300 font-medium">Try Again</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
      
      {/* Footer text */}
      <Animated.Text 
        style={[footerStyle, { position: 'absolute', bottom: 16, alignSelf: 'center' }]}
        className="text-gray-500 text-xs"
      >
        Need help? Contact support@example.com
      </Animated.Text>
    </View>
  );
};