import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function PaymentCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Extract status from various possible parameter formats
    const status = 
      params.status || 
      (typeof params.status === 'string' ? params.status : 'success');

    console.log('Payment callback with params:', params);
    console.log('Extracted status:', status);

    // Redirect to PaymentResult with extracted parameters
    const redirectParams: any = { 
      status: status as string,
      source: 'payment-callback-index'
    };

    // Include other parameters if available
    if (params.transactionId) redirectParams.transactionId = params.transactionId;
    if (params.amount) redirectParams.amount = params.amount;
    if (params.orderId) redirectParams.orderId = params.orderId;

    // Small delay to show processing state
    const timer = setTimeout(() => {
      router.replace({ 
        pathname: '/PaymentResult', 
        params: redirectParams
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [params, router]);

  // Show processing screen while redirecting
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text style={{ 
        marginTop: 16, 
        fontSize: 16, 
        color: '#6B7280',
        textAlign: 'center'
      }}>
        Processing payment result...
      </Text>
      <Text style={{ 
        marginTop: 8, 
        fontSize: 14, 
        color: '#9CA3AF',
        textAlign: 'center'
      }}>
        Please wait while we verify your transaction
      </Text>
    </View>
  );
} 