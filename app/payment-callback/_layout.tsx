import { Stack } from 'expo-router';

export default function PaymentCallbackLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="payment-status/success" 
        options={{ 
          headerShown: false,
          title: 'Payment Success'
        }} 
      />
      <Stack.Screen 
        name="payment-status/failed" 
        options={{ 
          headerShown: false,
          title: 'Payment Failed'
        }} 
      />
      <Stack.Screen 
        name="payment-status/pending" 
        options={{ 
          headerShown: false,
          title: 'Payment Pending'
        }} 
      />
    </Stack>
  );
} 