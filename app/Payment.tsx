import React from "react";
import { View } from "react-native";
import "./global.css";
import Payment from "@/features/orderPayment/components/payment/Payment";

export default function PaymentPage() {
  return (
    <View className="flex-1 items-center">
      <Payment />
    </View>
  );
}
