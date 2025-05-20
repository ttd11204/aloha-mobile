import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: string;
}

export function LoadingSpinner({ 
  size = 'medium', 
  color = '#3B82F6' 
}: LoadingSpinnerProps) {
  const getSize = () => {
    switch(size) {
      case 'small': return 'small';
      case 'medium': return 'small';
      case 'large': return 'large';
      case 'xlarge': return 'large';
      default: return 'small';
    }
  };

  return (
    <View className="flex items-center justify-center">
      <ActivityIndicator size={getSize()} color={color} />
    </View>
  );
}