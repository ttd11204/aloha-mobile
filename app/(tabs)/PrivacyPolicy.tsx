import PrivacyPolicy from "@/features/privacy-policy/PrivacyPolicy";
import React from "react";
import { View } from "react-native";

export default function PrivacyPolicyPage() {
  return (
    <View className="flex-1 items-center">
      <PrivacyPolicy />
    </View>
  );
}