import LoginRegister from "@/features/auth/components/login-register/LoginRegister";
import React from "react";
import { View } from "react-native";
import "./global.css";

export default function LoginPage() {
  return (
    <View className="flex-1 items-center">
      <LoginRegister />
    </View>
  );
}