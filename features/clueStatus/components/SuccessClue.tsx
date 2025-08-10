import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Svg, Path } from 'react-native-svg';
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
  opacity: number;
}

// Define confetti piece interface
interface ConfettiPiece {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speedY: number;
  speedX: number;
  speedRotation: number;
}

// Animated particle component
const AnimatedParticle: React.FC<{ particle: Particle }> = ({ particle }) => {
  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: particle.x,
          top: particle.y,
          width: particle.radius * 2,
          height: particle.radius * 2,
          backgroundColor: particle.color,
          opacity: particle.opacity,
        }
      ]}
    />
  );
};

// Animated confetti component
const AnimatedConfetti: React.FC<{ confetti: ConfettiPiece }> = ({ confetti }) => {
  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          left: confetti.x,
          top: confetti.y,
          width: confetti.size,
          height: confetti.size,
          backgroundColor: confetti.color,
          transform: [{ rotate: `${confetti.rotation}deg` }],
        }
      ]}
    />
  );
};

export default function SuccessClue() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const router = useRouter();
  
  // Animated values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const iconScale = useSharedValue(0.5);
  const headerTranslateY = useSharedValue(16);
  const messageTranslateY = useSharedValue(16);
  const buttonTranslateY = useSharedValue(16);
  const buttonTwoTranslateY = useSharedValue(16);
  const pulseAnimation = useSharedValue(1);
  
  useEffect(() => {
    // Initialize animations
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000 });
    iconScale.value = withDelay(300, withTiming(1, { duration: 1000 }));
    headerTranslateY.value = withDelay(500, withTiming(0, { duration: 700 }));
    messageTranslateY.value = withDelay(700, withTiming(0, { duration: 700 }));
    buttonTranslateY.value = withDelay(900, withTiming(0, { duration: 500 }));
    buttonTwoTranslateY.value = withDelay(1000, withTiming(0, { duration: 500 }));
    
    // Start pulse animation after a delay
    setTimeout(() => {
      pulseAnimation.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }, 500);

    // Initialize particles
    initParticles();
    initConfetti();
  }, []);

  const initParticles = () => {
    const newParticles: Particle[] = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * SCREEN_WIDTH,
        y: Math.random() * SCREEN_HEIGHT,
        radius: Math.random() * 3 + 1,
        color: `rgb(${Math.floor(Math.random() * 50) + 100}, 255, ${
          Math.floor(Math.random() * 100) + 150
        })`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    
    setParticles(newParticles);
  };

  const initConfetti = () => {
    const newConfetti: ConfettiPiece[] = [];
    const colors = [
      '#00E676',
      '#2979FF',
      '#FFEB3B',
      '#FF4081',
      '#9C27B0',
      '#FF9800',
    ];
    
    // Create confetti
    for (let i = 0; i < 150; i++) {
      newConfetti.push({
        x: Math.random() * SCREEN_WIDTH,
        y: -20 - Math.random() * 100,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        speedY: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        speedRotation: Math.random() * 2 - 1,
      });
    }
    
    setConfetti(newConfetti);
  };

  // Animation loop for particles
  useEffect(() => {
    let animationFrameId: number;

    const updateParticles = () => {
      setParticles(prevParticles => {
        const updatedParticles = [...prevParticles];
        updatedParticles.forEach((p, i) => {
          updatedParticles[i].x += p.speedX;
          updatedParticles[i].y += p.speedY;
          // Bounce off edges
          if (p.x < 0 || p.x > SCREEN_WIDTH) updatedParticles[i].speedX *= -1;
          if (p.y < 0 || p.y > SCREEN_HEIGHT) updatedParticles[i].speedY *= -1;
        });
        return updatedParticles;
      });
      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Animation loop for confetti
  useEffect(() => {
    let animationFrameId: number;

    const updateConfetti = () => {
      setConfetti(prevConfetti => {
        const updatedConfetti = [...prevConfetti];
        updatedConfetti.forEach((c, i) => {
          updatedConfetti[i].y += c.speedY;
          updatedConfetti[i].x += c.speedX;
          updatedConfetti[i].rotation += c.speedRotation;
          // Reset confetti when it goes off screen
          if (c.y > SCREEN_HEIGHT) {
            updatedConfetti[i].y = -20;
            updatedConfetti[i].x = Math.random() * SCREEN_WIDTH;
          }
        });
        return updatedConfetti;
      });
      animationFrameId = requestAnimationFrame(updateConfetti);
    };

    animationFrameId = requestAnimationFrame(updateConfetti);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
  
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnimation.value }],
  }));

  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      
      {/* Particle background */}
      <View style={StyleSheet.absoluteFill}>
        {particles.map((p, idx) => (
          <AnimatedParticle key={`particle-${idx}`} particle={p} />
        ))}
      </View>
      
      {/* Confetti overlay */}
      <View style={[StyleSheet.absoluteFill, { zIndex: 10 }]}> 
        {confetti.map((c, idx) => (
          <AnimatedConfetti key={`confetti-${idx}`} confetti={c} />
        ))}
      </View>
      
      {/* Glowing accent */}
      <View className="absolute top-1/4 left-1/2 w-64 h-64 rounded-full bg-green-500 opacity-20" 
        style={{ 
          transform: [{ translateX: -128 }, { translateY: -128 }],
          shadowColor: '#10B981',
          shadowOpacity: 0.5,
          shadowRadius: 50,
          elevation: 20
        }} 
      />
      
      {/* Success card */}
      <Animated.View 
        style={[containerStyle, pulseStyle]} 
        className="relative z-20 bg-black bg-opacity-40 m-4 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
      >
        {/* Top green indicator bar */}
        <View className="h-1.5 w-full bg-green-500" />
        
        {/* Icon and success header */}
        <View className="pt-8 pb-4 px-6">
          <Animated.View 
            style={iconStyle}
            className="w-20 h-20 mx-auto mb-6 bg-green-500 bg-opacity-10 rounded-full items-center justify-center"
          >
            <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#10B981"
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
            Congratulations!
          </Animated.Text>

          <View className="w-12 h-1 bg-green-500 mx-auto rounded-full opacity-70" />
        </View>

        {/* Success message */}
        <Animated.View 
          style={messageStyle}
          className="bg-gray-800 bg-opacity-50 px-6 py-6"
        >
          <Text className="text-center text-gray-300">
            You have successfully solved the clue! Well done on your incredible
            detective skills. Ready for the next challenge?
          </Text>
        </Animated.View>

        {/* Action buttons */}
        <View className="p-6 space-y-3">
          <Animated.View style={buttonStyle}>
            <TouchableOpacity
              className="w-full py-3 px-4 bg-green-500 rounded-lg flex-row items-center justify-center"
              activeOpacity={0.7}
              onPress={() => router.push('/Clue')}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" className="mr-2">
                <Path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text className="text-white font-medium">Continue to Next Clue</Text>
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
            //   onPress={() => router.push('/dashboard')}
            >
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" className="mr-2">
                <Path
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  stroke="#D1D5DB"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text className="text-gray-300 font-medium">View Leaderboard</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
  confetti: {
    position: 'absolute',
  },
});