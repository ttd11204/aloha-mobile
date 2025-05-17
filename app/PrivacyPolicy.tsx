import React from "react";
import { View } from "react-native";
import "./global.css";
import PrivacyPolicy from "@/features/privacy-policy/PrivacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <View className="flex-1 items-center">
      <PrivacyPolicy />
    </View>
  );
}