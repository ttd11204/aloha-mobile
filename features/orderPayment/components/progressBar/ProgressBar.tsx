import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const ProgressBar = () => {
  const { colorScheme } = useColorScheme();
  const [activeStep, setActiveStep] = useState(1);
  const progressAnim = useState(new Animated.Value(0))[0];
  const screenWidth = Dimensions.get('window').width;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const newStep = prev === 3 ? 1 : prev + 1;
        
        // Animate progress bar
        Animated.timing(progressAnim, {
          toValue: ((newStep - 1) / 2) * 100,
          duration: 700,
          useNativeDriver: false
        }).start();
        
        return newStep;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false
    }).start();
  }, []);

  const steps = [
    { 
      id: 1, 
      name: 'Subscription', 
      icon: () => (
        <Svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
          <Path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </Svg>
      )
    },
    { 
      id: 2, 
      name: 'VnPay', 
      icon: () => (
        <Svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
          <Path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <Path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
        </Svg>
      )
    },
    { 
      id: 3, 
      name: 'Start Playing', 
      icon: () => (
        <Svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
          <Path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </Svg>
      )
    }
  ];

  const CheckIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" stroke="white" fill="none">
      <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </Svg>
  );

  const renderSteps = () => {
    const stepWidth = Math.max(120, (screenWidth - 80) / steps.length);
    
    return steps.map((step, index) => {
      const isActive = step.id <= activeStep;
      const isCompleted = step.id < activeStep;
      const isLastStep = index === steps.length - 1;
      
      return (
        <View key={step.id} className="items-center relative" style={{ width: stepWidth }}>
          {/* Step Circle */}
          <View 
            className={`w-12 h-12 rounded-full items-center justify-center shadow-md ${
              isActive 
                ? 'bg-blue-500' 
                : 'bg-gray-200'
            } ${
              isCompleted 
                ? 'border-2 border-green-400' 
                : ''
            }`}
          >
            {isCompleted ? (
              <CheckIcon />
            ) : (
              <View className="items-center justify-center">
                {React.cloneElement(step.icon(), {
                  fill: isActive ? 'white' : '#a0aec0'
                })}
              </View>
            )}
          </View>
          
          {/* Step Name */}
          <Text 
            className={`mt-2.5 text-xs font-medium text-center px-1 ${
              isActive 
                ? 'text-blue-700' 
                : 'text-gray-500'
            }`}
          >
            {step.name}
          </Text>
          
          {/* Progress Line */}
          {!isLastStep && (
            <View 
              className="absolute top-6 h-0.5 bg-transparent"
              style={{ 
                left: stepWidth * 0.7,
                width: stepWidth * 0.6
              }}
            >
              <View className="h-0.5 w-full bg-gray-200">
                <Animated.View 
                  className="h-full bg-blue-500" 
                  style={{ 
                    width: progressAnim.interpolate({
                      inputRange: [index * 50, (index + 1) * 50],
                      outputRange: ['0%', '100%'],
                      extrapolate: 'clamp',
                    }),
                    opacity: step.id < activeStep ? 1 : (step.id === activeStep ? 0.5 : 0)
                  }} 
                />
              </View>
            </View>
          )}
        </View>
      );
    });
  };

  return (
     <View className="flex-1 p-4 bg-blue-50">
      {/* Steps Container - Remove ScrollView for better layout */}
      <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <View className="flex-row items-center justify-center">
          {renderSteps()}
        </View>
      </View>
      
      {/* Progress description */}
      <View className="p-4 bg-white rounded-lg shadow">
        <Text className="text-lg font-medium text-blue-700">
          {steps.find(s => s.id === activeStep)?.name} Stage
        </Text>
        <Text className="mt-2 text-gray-600">
          {activeStep === 1 && "Choose your subscription plan that fits your needs."}
          {activeStep === 2 && "Complete your payment securely through VnPay."}
          {activeStep === 3 && "You're all set! Start playing and enjoy your experience."}
        </Text>
        
        {/* Progress percentage */}
        <View className="mt-4 h-2 bg-gray-200 rounded overflow-hidden">
          <LinearGradient
            colors={['#3b82f6', '#4f46e5']}
            start={[0, 0]}
            end={[1, 0]}
            className="h-full rounded"
            style={{ 
              width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` 
            }}
          />
        </View>
        <Text className="mt-1 text-right text-xs text-gray-500">
          {Math.round(((activeStep - 1) / (steps.length - 1)) * 100)}% completed
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;