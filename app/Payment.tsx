import React from "react";
import { View } from "react-native";
import "./global.css";
import AnnualOrderPage from "@/features/orderPayment/components/annual/Payment";

export default function AnnualPaymentPage() {
  return (
    <View className="flex-1 items-center">
      <AnnualOrderPage />
    </View>
  );
}
