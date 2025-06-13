import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function PaymentPending() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to PaymentResult with pending status
    router.replace({ 
      pathname: '/PaymentResult', 
      params: { 
        status: 'pending',
        source: 'payment-callback' 
      } 
    });
  }, []);

  // Show loading while redirecting
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Processing payment status...</Text>
    </View>
  );
} 