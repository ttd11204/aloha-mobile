import HomePage from "@/features/home/Home";
import React from "react";
import { View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="items-center">
      <HomePage />
    </View>
  );
}
