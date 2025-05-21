import React from "react";
import { View } from "react-native";
import "./global.css";
import SuccessStatus from "@/features/side-quest/components/SuccessStatus";

export default function SuccessQuestPage() {
  return (
    <View className="flex-1 items-center">
      <SuccessStatus />
    </View>
  );
}