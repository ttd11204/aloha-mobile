import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../progressBar/ProgressBar";

export default function DaysOrderPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id = "0" } = (route as { params?: { id?: string } }).params || {};
  const [userId, setUserId] = useState("");
  const [origin, setOrigin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In React Native, we need to get the app's package name or bundle ID as origin
    setOrigin(Platform.OS === "ios" ? "ios-app://" : "android-app://");
  }, []);

  useEffect(() => {
    // In React Native, we would use AsyncStorage instead of localStorage
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          const decode = jwtDecode(token);
          setUserId(decode?.sub ?? "");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserId("");
      }
    };

    getToken();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getPackageApi();
  //     console.log(res);
  //   };

  //   fetchData();
  // }, [id]);

  // if (id === '1') {
  //   return <AnnualOrderPage />;
  // }

  // const handlePayment = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await postPaymentApi(
  //       userId,
  //       Number(Array.isArray(id) ? id[0] : id) || 0,
  //       origin,
  //       2
  //     );
  //     // In React Native, we use Linking to open URLs
  //     await Linking.openURL(response.data.paymentUrl);
  //   } catch (error) {
  //     console.error('Error when process payment:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const navigateBack = () => {
  //   // Use the router from expo-router for navigation
  //   // @ts-ignore
  //   if (typeof window !== "undefined" && window.location) {
  //     // web fallback
  //     window.location.href = "/";
  //   } else {
  //     // native fallback
  //     // @ts-ignore
  //     navigation.reset &&
  //       navigation.reset({ index: 0, routes: [{ name: "(tabs)" }] });
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb]">
      <ScrollView className="flex-1">
        {/* Special Offer Banner */}
        <View className="flex-row items-center bg-amber-100 rounded-lg mx-4 p-4 mb-6 shadow-sm">
          <View className="bg-orange-500 p-1 rounded-xl mr-3">
            <Feather name="heart" size={16} color="#fff" />
          </View>
          <Text className="font-semibold text-amber-900">
            Additional offers, curated just for you
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="px-4 pt-6 pb-3">
          <ProgressBar />
        </View>

        {/* Package Info */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-bold text-[#187af2] mb-2">
            Fifteen Days Package
          </Text>
          <View className="flex-row items-center">
            <Feather name="shield" size={18} color="#187af2" />
            <Text className="text-[#187af2] ml-2">
              Unlock exciting experiences and challenges
            </Text>
          </View>
        </View>

        {/* Subscription Card */}
        <View className="bg-white rounded-3xl mx-4 shadow-lg overflow-hidden">
          {/* Card Header */}
          <View className="p-5">
            <Text className="text-xl font-bold text-gray-800 mb-1">
              Subscription Details
            </Text>
            <Text className="text-sm text-gray-500">
              Choose the plan that works for you
            </Text>
          </View>

          {/* Subscription Options */}
          <View className="p-5">
            <View className="border-2 border-[#1f6feb] rounded-xl p-4 mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-base font-bold text-gray-800">
                    15 Days Plan
                  </Text>
                  <Text className="text-xs font-medium text-green-600 mt-1">
                    Save 20%
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-xl font-bold text-green-600">
                    US$3/mo
                  </Text>
                  <Text className="text-xs text-gray-500">incl. VAT</Text>
                </View>
              </View>

              <View className="pt-3 mt-3 border-t border-gray-200">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-gray-500">Subtotal</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    US$2/mo
                  </Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-gray-500">VAT</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    US$1/mo
                  </Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-gray-500">Order Total</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    US$3/mo
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Free Trial Info */}
          <View className="px-5 pb-4">
            <View className="bg-blue-50 rounded-xl p-4">
              <View className="flex-row items-center mb-2">
                <Feather name="clock" size={18} color="#3b82f6" />
                <Text className="font-bold text-gray-800 text-base ml-2">
                  Free trial terms
                </Text>
              </View>
              <View className="flex-row items-start my-2">
                <View className="w-1 h-5 bg-blue-400 rounded mr-2 mt-0.5" />
                <Text className="text-sm text-gray-700 flex-1">
                  Billing automatically starts after free trial ends
                </Text>
              </View>
              <View className="flex-row items-start my-2">
                <View className="w-1 h-5 bg-blue-400 rounded mr-2 mt-0.5" />
                <Text className="text-sm text-gray-700 flex-1">
                  Cancel before Apr 08, 2025 to avoid getting billed
                </Text>
              </View>
              <View className="flex-row items-start my-2">
                <View className="w-1 h-5 bg-blue-400 rounded mr-2 mt-0.5" />
                <Text className="text-sm text-gray-700 flex-1">
                  We will remind you 5 days before trial ends
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Summary with Timeline */}
          <View className="px-5 pb-5">
            <View className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              {/* Header Section */}
              <View className="mb-6">
                <View className="flex-row items-center">
                  <Feather name="file-text" size={20} color="#4f46e5" />
                  <Text className="text-lg font-bold text-gray-800 ml-2">
                    Payment Summary
                  </Text>
                </View>
                <Text className="text-sm text-gray-500 mt-1">
                  Your subscription details and timeline
                </Text>
              </View>

              {/* Status Badge */}
              <View className="mb-6">
                <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-xl self-start">
                  <Feather name="check-circle" size={12} color="#10b981" />
                  <Text className="text-xs font-medium text-green-800 ml-1">
                    Payment Confirmed
                  </Text>
                </View>
              </View>

              {/* Timeline UI */}
              <View className="mb-6">
                {/* First timeline item */}
                <View className="flex-row mb-6">
                  <View className="items-center mr-4">
                    <View className="w-8 h-8 bg-rose-500 rounded-full justify-center items-center shadow-sm">
                      <Feather name="clock" size={16} color="#fff" />
                    </View>
                    <View className="w-1 h-20 bg-gradient-to-b from-rose-400 to-emerald-400 mt-1" />
                  </View>
                  <View className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <View className="flex-row justify-between items-center mb-2">
                      <View className="flex-row items-center">
                        <Feather name="credit-card" size={18} color="#dc2626" />
                        <Text className="font-bold text-rose-600 ml-2">
                          FROM
                        </Text>
                      </View>
                      <Text className="text-xs font-medium text-gray-500">
                        March 24, 2025
                      </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-sm text-gray-500">
                        Premium Subscription
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-2xl font-bold text-indigo-600">
                          $3
                        </Text>
                        <Text className="text-sm text-gray-500 ml-1">/mo</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="text-xs text-gray-500">incl. VAT</Text>
                    </View>

                    {/* Features list */}
                    <View className="mt-3 pt-3 border-t border-gray-100">
                      <View className="flex-row items-center my-1">
                        <Feather
                          name="check-circle"
                          size={12}
                          color="#10b981"
                        />
                        <Text className="text-xs text-gray-500 ml-1">
                          Full access to all premium features
                        </Text>
                      </View>
                      <View className="flex-row items-center my-1">
                        <Feather
                          name="check-circle"
                          size={12}
                          color="#10b981"
                        />
                        <Text className="text-xs text-gray-500 ml-1">
                          Priority customer support
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Second timeline item */}
                <View className="flex-row">
                  <View className="items-center mr-4">
                    <View className="w-8 h-8 bg-emerald-500 rounded-full justify-center items-center shadow-sm">
                      <Feather name="calendar" size={16} color="#fff" />
                    </View>
                  </View>
                  <View className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <View className="flex-row justify-between items-center">
                      <Text className="font-bold text-emerald-600">TO</Text>
                      <Text className="font-medium text-gray-500 text-sm">
                        April 8, 2025
                      </Text>
                    </View>
                    <Text className="text-sm text-gray-500 mt-2">
                      Your subscription will automatically renew
                    </Text>

                    {/* Action button */}
                    <TouchableOpacity className="flex-row items-center mt-2">
                      <Text className="text-xs font-medium text-indigo-600 mr-1">
                        Manage subscription
                      </Text>
                      <Feather
                        name="arrow-up-right"
                        size={12}
                        color="#4f46e5"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Total Summary */}
              <View className="mt-6 pt-4 border-t border-gray-200">
                <View className="flex-row justify-between items-center">
                  <Text className="text-base font-medium text-gray-500">
                    Total
                  </Text>
                  <View className="items-end">
                    <Text className="text-base font-bold text-gray-800">
                      $3.00
                    </Text>
                    <Text className="text-xs text-gray-500">
                      billed annually
                    </Text>
                  </View>
                </View>

                {/* Payment method */}
                <View className="mt-3 flex-row justify-between items-center bg-gray-50 rounded-lg p-2">
                  <View className="flex-row items-center">
                    <View className="bg-blue-100 p-1 rounded mr-2">
                      <Feather name="credit-card" size={14} color="#1d4ed8" />
                    </View>
                    <Text className="text-xs text-gray-500">•••• 4242</Text>
                  </View>
                  <Text className="text-xs text-gray-500">
                    Next charge: April 24, 2025
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row justify-between p-5 bg-[#F9FAFB] border-t border-[#E5E7EB]">
            <TouchableOpacity
              className="bg-[#E5E7EB] rounded-xl py-3 px-4 flex-row items-center justify-center flex-1 mr-2"
              onPress={() => {
                // Use the router from expo-router for navigation
                // @ts-ignore
                if (typeof window !== "undefined" && window.location) {
                  window.location.href = "/";
                } else {
                  // @ts-ignore
                  navigation.reset &&
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "index" as never }],
                    });
                }
              }}
            >
              <Ionicons name="chevron-back" size={20} color="#374151" />
              <Text className="text-[#374151] font-bold ml-1">Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#4F46E5] rounded-xl py-3 px-4 items-center justify-center flex-1 shadow-sm"
              // onPress={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-bold text-base">Continue</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Secure Payment Note */}
        <View className="flex-row justify-center items-center py-6">
          <Feather name="shield" size={18} color="#fff" />
          <Text className="text-sm text-white ml-2">
            Secure and protected payment
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
