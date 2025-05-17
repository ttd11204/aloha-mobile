import HomePage from "@/features/home/Home";
import { View } from "react-native";
import "./global.css";

export default function Index() {
  return (
    <View className="flex-1 items-center">
      <HomePage />
    </View>
  );
}
