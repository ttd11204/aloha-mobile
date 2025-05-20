import SideQuestFull from "@/features/side-quest/components/SideQuestFull";
import React from "react";
import { View } from "react-native";
import "../global.css";

export default function SideQuestPage() {
  return (
    <View className="flex-1 items-center">
      <SideQuestFull />
    </View>
  );
}