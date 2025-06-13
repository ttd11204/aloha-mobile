import PaymentResult from '@/features/orderPayment/components/paymentConfirm/PaymentResult'
import React from 'react'
import { View } from 'react-native'
import "./global.css";

export default function PaymentResultPage() {
  return (
    <View className="flex-1 items-center">
      <PaymentResult />
    </View>
  )
}
