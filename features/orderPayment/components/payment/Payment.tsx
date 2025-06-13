import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import ProgressBar from "../progressBar/ProgressBar";
import { useGetPackageDataByIdQuery } from '@/components/api/packageApi';
import { formatDate } from "@/utils";
import { useCreatePaymentMutation } from '@/features/orderPayment/api/paymentApi';
import { useRouter } from 'expo-router';

// Multiple fallback URLs for better compatibility
const MOBILE_CALLBACK_URL = 'aloha://payment-callback';
// const WEB_FALLBACK_URL = 'https://your-domain.com/payment-callback'; // Replace with your actual domain
// const UNIVERSAL_LINK = 'https://your-domain.com/app/payment-callback'; // Universal link fallback

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id = "1" } = (route as { params?: { id?: string } }).params || {};

  // Lấy thông tin package theo id
  const {
    data: packageData,
    isLoading: isPackageLoading,
    error: packageError,
  } = useGetPackageDataByIdQuery(Number(id));

  const [userId, setUserId] = useState("");
  const [origin, setOrigin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [createPayment] = useCreatePaymentMutation();
  const router = useRouter();

  useEffect(() => {
    // Set origin based on platform
    setOrigin(Platform.OS === "ios" ? "ios-app" : "android-app");
  }, []);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log("Retrieved token:", token ? "Token exists" : "No token found"); // Debug log

        if (token) {
          const decode = jwtDecode(token) as any;
          console.log("Decoded token:", decode); // Debug log
          
          const extractedUserId = decode?.sub || decode?.userId || decode?.id;
          
          if (extractedUserId) {
            setUserId(String(extractedUserId));
            console.log("Set userId:", extractedUserId); // Debug log
          } else {
            console.log("No userId found in token"); // Debug log
            setUserId("");
          }
        } else {
          console.log("No access token found"); // Debug log
          setUserId("");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserId("");
        
        // Optionally show alert for token issues
        Alert.alert(
          "Authentication Error", 
          "There was an issue with your login session. Please login again.",
          [{ text: "OK" }]
        );
      }
    };

    getToken();
  }, []);

  if (isPackageLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#187af2" />
      </View>
    );
  }

  if (packageError || !packageData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Không tìm thấy thông tin gói dịch vụ.</Text>
      </View>
    );
  }


  const handlePayment = async () => {
    // Validate userId before proceeding
    if (!userId || userId.trim() === "") {
      Alert.alert(
        "Authentication Required",
        "Please login first to proceed with payment.",
        [
          { text: "Login", onPress: () => router.push('/Login') },
          { text: "Cancel" }
        ]
      );
      return;
    }

    setIsLoading(true);
    try {
      console.log("Payment attempt with userId:", userId); // Debug log
      
      const formData = new FormData();
      formData.append('UserId', userId);
      formData.append('PackageId', String(packageData.id));
      // Use mobile deep link as primary callback
      formData.append('FrontEndUrl', MOBILE_CALLBACK_URL);
      // Add fallback URLs for better compatibility
      // formData.append('FallbackUrl', WEB_FALLBACK_URL);
      // formData.append('UniversalLink', UNIVERSAL_LINK);
      formData.append('Method', '2');
      // formData.append('Platform', Platform.OS);

      const response = await createPayment(formData).unwrap();
      console.log("Payment response:", response);
      
      const paymentUrl = response?.data?.paymentUrl;
      if (paymentUrl) {
        // Check if URL can be opened
        const supported = await Linking.canOpenURL(paymentUrl);
        if (supported) {
          await Linking.openURL(paymentUrl);
          
          // Set up a fallback mechanism in case deep link doesn't work
          const fallbackTimer = setTimeout(() => {
            Alert.alert(
              "Payment Processing",
              "If the payment page doesn't load, please return to the app manually.",
              [
                { text: "Check Payment Status", onPress: () => checkPaymentStatus() },
                { text: "OK" }
              ]
            );
          }, 3000);
          
          // Clear timer if user returns to app
          const subscription = Linking.addEventListener('url', () => {
            clearTimeout(fallbackTimer);
          });
          
          return () => subscription.remove();
        } else {
          throw new Error('Cannot open payment URL');
        }
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      
      // Check if it's a userId validation error from backend
      const errorMessage = (error as any)?.data?.message || (error as any)?.message || "Unable to process payment";
      
      Alert.alert(
        "Payment Error",
        errorMessage,
        [
          { text: "Retry", onPress: () => handlePayment() },
          { text: "Cancel", onPress: () => router.push({ pathname: '/PaymentResult', params: { status: 'failed' } }) }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = () => {
    // Navigate to a payment status check page or show current status
    router.push({ pathname: '/PaymentResult', params: { status: 'pending' } });
  };

  return (
    <View className="flex-1 bg-[#f5f7fb]">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1">
          {/* Special Offer Banner */}
          <View className="mx-4 rounded-lg mb-6 shadow-sm">
            <LinearGradient
              colors={["#FFECD1", "#FFE0B2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-lg"
            >
              <View className="flex-row items-center p-4">
                <View className="bg-[#F97316] rounded-full p-1 mr-3">
                  <FontAwesome name="heart" size={16} color="#fff" />
                </View>
                <Text className="text-[#7C2D12] font-semibold">
                  Additional offers, curated just for you
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Progress Bar */}
          <View className="px-4 py-6">
            <ProgressBar />
          </View>

          {/* Package Info */}
          <View className="px-4 mb-6">
            <Text className="text-xl font-bold text-[#187af2] mb-2">
              {packageData.description}
            </Text>
            <View className="flex-row items-center">
              <Ionicons
                name="shield-checkmark"
                size={18}
                color="#187af2"
                className="mr-2"
              />
              <Text className="text-[#187af2]">
                Unlock exciting experiences and challenges
              </Text>
            </View>
          </View>

          {/* Subscription Card */}
          <View className="mx-4 rounded-3xl bg-white shadow-lg overflow-hidden">
            {/* Card Header */}
            <View className="p-5">
              <Text className="text-xl font-bold text-[#1F2937] mb-1">
                Subscription Details
              </Text>
              <Text className="text-sm text-[#6B7280]">
                Choose the plan that works for you
              </Text>
            </View>

            {/* Subscription Options */}
            <View className="p-5">
              <View className="border-2 border-[#1F6FEB] rounded-xl p-4 mb-6">
                <View className="flex-row justify-between items-center mb-2">
                  <View>
                    <Text className="text-lg font-bold text-[#1F2937]">
                      {packageData.description}
                    </Text>
                    {packageData.isFree ? (
                      <Text className="text-xs text-[#10B981] font-medium mt-1">
                        Miễn phí
                      </Text>
                    ) : null}
                  </View>
                  <View className="items-end">
                    <Text className="text-xl text-[#10B981] font-bold">
                      {packageData.isFree ? 'Free' : `$${packageData.price}/mo`}
                    </Text>
                    <Text className="text-xs text-[#6B7280]">incl. VAT</Text>
                  </View>
                </View>

                <View className="mt-3 pt-3 border-t border-[#E5E7EB]">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-[#6B7280]">Subtotal</Text>
                    <Text className="text-sm text-[#1F2937] font-medium">
                      US$6/mo
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-[#6B7280]">VAT</Text>
                    <Text className="text-sm text-[#1F2937] font-medium">
                      US$1/mo
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-[#6B7280]">Order Total</Text>
                    <Text className="text-sm text-[#1F2937] font-medium">
                      {`$${packageData.price}/mo`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Free Trial Info */}
            <View className="px-5 pb-4">
              <View className="bg-[#EFF6FF] rounded-xl p-4">
                <View className="flex-row items-center mb-2">
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color="#3B82F6"
                    className="mr-2"
                  />
                  <Text className="text-base font-bold text-[#1F2937]">
                    Free trial terms
                  </Text>
                </View>
                <View className="flex-row items-start mt-2">
                  <View className="w-1 h-5 bg-[#60A5FA] rounded-sm mr-2 mt-0.5"></View>
                  <Text className="text-sm text-[#4B5563] flex-1">
                    Billing automatically starts after free trial ends
                  </Text>
                </View>
                <View className="flex-row items-start mt-2">
                  <View className="w-1 h-5 bg-[#60A5FA] rounded-sm mr-2 mt-0.5"></View>
                  <Text className="text-sm text-[#4B5563] flex-1">
                    `Cancel before {formatDate(new Date(packageData.toDate))} to avoid getting billed`
                  </Text>
                </View>
                <View className="flex-row items-start mt-2">
                  <View className="w-1 h-5 bg-[#60A5FA] rounded-sm mr-2 mt-0.5"></View>
                  <Text className="text-sm text-[#4B5563] flex-1">
                    We will remind you 5 days before trial ends
                  </Text>
                </View>
              </View>
            </View>

            {/* Payment Summary with Timeline */}
            <View className="px-5 pb-5">
              <View className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-md">
                {/* Header Section */}
                <View className="mb-6">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="receipt"
                      size={20}
                      color="#4F46E5"
                      className="mr-2"
                    />
                    <Text className="text-lg font-bold text-[#1F2937]">
                      Payment Summary
                    </Text>
                  </View>
                  <Text className="text-sm text-[#6B7280] mt-1">
                    Your subscription details and timeline
                  </Text>
                </View>

                {/* Status Badge */}
                <View className="mb-6">
                  <View className="flex-row items-center bg-[#D1FAE5] px-3 py-1 rounded-full self-start">
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color="#047857"
                      className="mr-1"
                    />
                    <Text className="text-xs font-medium text-[#047857]">
                      Payment Confirmed
                    </Text>
                  </View>
                </View>

                {/* Timeline UI */}
                <View className="mb-6">
                  {/* First timeline item */}
                  <View className="flex-row mb-6">
                    <View className="items-center mr-4">
                      <View className="w-8 h-8 rounded-full bg-[#F43F5E] justify-center items-center shadow-sm">
                        <Ionicons name="time" size={16} color="#fff" />
                      </View>
                      <View className="w-1 flex-1 bg-[#10B981] my-1 mx-auto"></View>
                    </View>
                    <View className="flex-1 bg-white rounded-lg p-4 border border-[#F3F4F6] shadow-xs">
                      <View className="flex-row justify-between items-center mb-2">
                        <View className="flex-row items-center">
                          <Ionicons
                            name="card"
                            size={18}
                            color="#DC2626"
                            className="mr-2"
                          />
                          <Text className="text-[#DC2626] font-bold">FROM</Text>
                        </View>
                        <Text className="text-xs text-[#6B7280] font-medium">
                          {formatDate(new Date(packageData.fromDate))}
                        </Text>
                      </View>
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-[#6B7280]">
                          Premium Subscription
                        </Text>
                        <View className="flex-row items-end">
                          <Text className="text-2xl font-bold text-[#4F46E5]">
                            {`$${packageData.price}`}
                          </Text>
                          <Text className="text-sm text-[#6B7280] ml-1">
                            /mo
                          </Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <Text className="text-xs text-[#6B7280]">
                          incl. VAT
                        </Text>
                      </View>

                      {/* Features list */}
                      <View className="mt-3 pt-3 border-t border-[#F3F4F6]">
                        <View className="flex-row items-center mt-1">
                          <Ionicons
                            name="checkmark-circle"
                            size={12}
                            color="#10B981"
                            className="mr-1"
                          />
                          <Text className="text-xs text-[#6B7280]">
                            Full access to all premium features
                          </Text>
                        </View>
                        <View className="flex-row items-center mt-1">
                          <Ionicons
                            name="checkmark-circle"
                            size={12}
                            color="#10B981"
                            className="mr-1"
                          />
                          <Text className="text-xs text-[#6B7280]">
                            Priority customer support
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Second timeline item */}
                  <View className="flex-row">
                    <View className="items-center mr-4">
                      <View className="w-8 h-8 rounded-full bg-[#10B981] justify-center items-center shadow-sm">
                        <Ionicons name="calendar" size={16} color="#fff" />
                      </View>
                    </View>
                    <View className="flex-1 bg-white rounded-lg p-4 border border-[#F3F4F6] shadow-xs">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-[#10B981] font-bold">TO</Text>
                        <Text className="text-sm text-[#6B7280] font-medium">
                          {formatDate(new Date(packageData.toDate))}
                        </Text>
                      </View>
                      <Text className="text-sm text-[#6B7280] mt-2">
                        Your subscription will automatically renew
                      </Text>

                      {/* Action button */}
                      <TouchableOpacity className="flex-row items-center mt-2">
                        <Text className="text-xs font-medium text-[#4F46E5]">
                          Manage subscription
                        </Text>
                        <Ionicons
                          name="arrow-up-circle"
                          size={12}
                          color="#4F46E5"
                          className="ml-1"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Total Summary */}
                <View className="mt-6 pt-4 border-t border-[#E5E7EB]">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-base text-[#6B7280] font-medium">
                      Total
                    </Text>
                    <View className="items-end">
                      <Text className="text-lg font-bold text-[#111827]">
                       {`$${packageData.price}.00`}
                      </Text>
                      <Text className="text-xs text-[#6B7280]">
                        billed annually
                      </Text>
                    </View>
                  </View>

                  {/* Payment method */}
                  <View className="mt-3 bg-[#F9FAFB] rounded-md p-2 flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <View className="bg-[#DBEAFE] p-1 rounded-sm mr-2">
                        <Ionicons name="card" size={14} color="#1D4ED8" />
                      </View>
                      <Text className="text-xs text-[#6B7280]">•••• 4242</Text>
                    </View>
                    <Text className="text-xs text-[#6B7280]">
                      `Next charge: ${packageData.price} on {formatDate(new Date(packageData.toDate))}`
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
                onPress={handlePayment}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white font-bold text-base">
                    Continue
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Secure Payment Note */}
          <View className="flex-row items-center justify-center mt-6 mb-6">
            <Ionicons
              name="shield-checkmark"
              size={16}
              color="#fff"
              className="mr-2"
            />
            <Text className="text-white text-sm">
              Secure and protected payment
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Payment;
