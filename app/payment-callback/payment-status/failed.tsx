import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function PaymentFailed() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to PaymentResult with failed status
    router.replace({ 
      pathname: '/PaymentResult', 
      params: { 
        status: 'failed',
        source: 'payment-callback' 
      } 
    });
  }, []);

  // Show loading while redirecting
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Processing payment failure...</Text>
    </View>
  );
} 