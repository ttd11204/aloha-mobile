import QuestionAnswer from "@/features/QA/QuestionAnswer";
import React from "react";
import { View } from "react-native";
import "./global.css";

export default function QAPage() {
  return (
    <View className="flex-1 items-center">
      <QuestionAnswer />
    </View>
  );
}