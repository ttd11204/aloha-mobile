import React from "react";
import { View } from "react-native";
import "./global.css";
import FailStatus from "@/features/side-quest/components/FailStatus";

export default function FailQuestPage() {
  return (
    <View className="flex-1 items-center">
      <FailStatus />
    </View>
  );
}
