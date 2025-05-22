import SuccessStatus from "@/features/side-quest/components/SuccessStatus";
import React from "react";
import { View } from "react-native";

export default function StatusPage() {
  return (
    <View className="flex-1 items-center">
      <SuccessStatus />
    </View>
  );
}