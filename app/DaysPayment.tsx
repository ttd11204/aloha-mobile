import DaysOrderPage from "@/features/orderPayment/components/days/DaysPayment";
import React from "react";
import { View } from "react-native";
import "./global.css";

export default function DaysPaymentPage() {
  return (
    <View className="flex-1 items-center">
      <DaysOrderPage />
    </View>
  );
}