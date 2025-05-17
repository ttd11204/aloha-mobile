import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyPolicy() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] pt-10 pb-5">
      <StatusBar style="light" />
      
      {/* Header with gradient */}
      {/* <LinearGradient
        colors={['#187af2', '#3b5998', '#192f6a']}
        className="h-30 justify-end px-5 pb-5 rounded-b-5 shadow-md"
      >
        <TouchableOpacity 
          className="absolute top-[55px] left-5 w-10 h-10 rounded-full justify-center items-center bg-white/20"
          onPress={() => navigation && navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-['Poppins-Bold'] ml-[50px]">Privacy Policy</Text>
      </LinearGradient> */}

      <ScrollView className="flex-1">
        <View className="p-5 pb-10">
          {/* Introduction Card */}
          <View className="bg-white rounded-2xl p-5 mb-6 flex-row items-center shadow">
            <View className="mr-4">
              <Ionicons name="shield-checkmark" size={40} color="#187af2" />
            </View>
            <Text className="flex-1 font-['Poppins-Medium'] text-base text-[#333] leading-6">
              Your privacy matters to us. This policy explains how we handle your data during treasure hunts.
            </Text>
          </View>

          {/* Section 1 */}
          <View className="mb-6">
            <View className="flex-row items-center mb-4">
              <View className="bg-[#187af2] w-9 h-9 rounded-full justify-center items-center mr-3">
                <Text className="text-white text-lg font-['Poppins-Bold']">1</Text>
              </View>
              <Text className="font-['Poppins-SemiBold'] text-xl text-[#333]">Information We Collect</Text>
            </View>
            <View className="bg-white rounded-2xl p-5 ml-[18px] border-l-2 border-l-[#187af2] shadow">
              <Text className="font-['Poppins-Regular'] text-base text-[#333] mb-3 leading-6">We collect minimal information to provide our treasure hunt services:</Text>
              
              <View className="mb-4">
                <View className="flex-row items-start mb-3">
                  <Ionicons name="location" size={20} color="#187af2" />
                  <Text className="font-['Poppins-Regular'] text-base text-[#333] ml-3 flex-1 leading-[22px]">Temporary location data during active treasure hunts (with your permission)</Text>
                </View>
                <View className="flex-row items-start mb-3">
                  <Ionicons name="game-controller" size={20} color="#187af2" />
                  <Text className="font-['Poppins-Regular'] text-base text-[#333] ml-3 flex-1 leading-[22px]">Basic game progress for active hunts</Text>
                </View>
              </View>
              
              <View className="bg-[#f0f4ff] rounded-xl p-4 flex-row items-center">
                <Ionicons name="information-circle" size={20} color="#187af2" />
                <Text className="font-['Poppins-Medium'] text-sm text-[#187af2] ml-3 flex-1">All hunt data is temporary and is not stored after the hunt ends.</Text>
              </View>
            </View>
          </View>

          {/* Section 2 */}
          <View className="mb-6">
            <View className="flex-row items-center mb-4">
              <View className="bg-[#187af2] w-9 h-9 rounded-full justify-center items-center mr-3">
                <Text className="text-white text-lg font-['Poppins-Bold']">2</Text>
              </View>
              <Text className="font-['Poppins-SemiBold'] text-xl text-[#333]">How We Use Your Information</Text>
            </View>
            <View className="bg-white rounded-2xl p-5 ml-[18px] border-l-2 border-l-[#187af2] shadow">
              <Text className="font-['Poppins-Regular'] text-base text-[#333] mb-3 leading-6">We use this temporary information only to:</Text>
              
              <View className="mb-4">
                <View className="flex-row items-start mb-3">
                  <Ionicons name="navigate" size={20} color="#187af2" />
                  <Text className="font-['Poppins-Regular'] text-base text-[#333] ml-3 flex-1 leading-[22px]">Operate the current treasure hunt experience</Text>
                </View>
                <View className="flex-row items-start mb-3">
                  <Ionicons name="checkmark-circle" size={20} color="#187af2" />
                  <Text className="font-['Poppins-Regular'] text-base text-[#333] ml-3 flex-1 leading-[22px]">Verify hunt completion</Text>
                </View>
                <View className="flex-row items-start mb-3">
                  <Ionicons name="shield" size={20} color="#187af2" />
                  <Text className="font-['Poppins-Regular'] text-base text-[#333] ml-3 flex-1 leading-[22px]">Ensure fair play during active hunts</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Section 3 */}
          <View className="mb-6">
            <View className="flex-row items-center mb-4">
              <View className="bg-[#187af2] w-9 h-9 rounded-full justify-center items-center mr-3">
                <Text className="text-white text-lg font-['Poppins-Bold']">3</Text>
              </View>
              <Text className="font-['Poppins-SemiBold'] text-xl text-[#333]">Data Retention</Text>
            </View>
            <View className="bg-white rounded-2xl p-5 ml-[18px] border-l-2 border-l-[#187af2] shadow">
              <View className="bg-[#f0f4ff] rounded-xl p-5 flex-row items-center">
                <Ionicons name="time" size={32} color="#187af2" />
                <Text className="font-['Poppins-Medium'] text-base text-[#333] ml-4 flex-1 leading-6">
                  We do not store any personal information. All hunt-related data is automatically deleted when your hunt ends.
                </Text>
              </View>
            </View>
          </View>

          {/* Section 4 */}
          <View className="mb-6">
            <View className="flex-row items-center mb-4">
              <View className="bg-[#187af2] w-9 h-9 rounded-full justify-center items-center mr-3">
                <Text className="text-white text-lg font-['Poppins-Bold']">4</Text>
              </View>
              <Text className="font-['Poppins-SemiBold'] text-xl text-[#333]">Contact Us</Text>
            </View>
            <View className="bg-white rounded-2xl p-5 ml-[18px] border-l-2 border-l-[#187af2] shadow">
              <Text className="font-['Poppins-Regular'] text-base text-[#333] mb-3 leading-6">If you have any questions about this Privacy Policy, please contact us at:</Text>
              
              <TouchableOpacity className="bg-[#187af2] rounded-xl p-4 flex-row items-center justify-center mt-3">
                <Ionicons name="mail" size={24} color="white" />
                <Text className="font-['Poppins-Medium'] text-base text-white ml-3">alohavietnamretreat@gmail.com</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="items-center mt-5">
            <Text className="font-['Poppins-Regular'] text-sm text-[#999]">Last updated: May 2025</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}