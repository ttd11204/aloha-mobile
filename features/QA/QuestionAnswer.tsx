import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// MapComponent equivalent for React Native with NativeWind
const MapComponent = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Could not fetch location');
      }
    })();
  }, []);

  // Default region (fallback if location access is denied)
  const defaultRegion = {
    latitude: 10.7769,
    longitude: 106.7009,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const region = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : defaultRegion;

  if (errorMsg) {
    return (
      <View className="h-[300px] rounded-lg overflow-hidden">
        <Text className="text-center p-2.5 text-red-700">{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View className="w-full rounded-xl overflow-hidden h-80 bg-gray-200">
  <MapView
    className="w-full h-full"
    style={{ width: '100%', height: 300 }}
    initialRegion={region}
    provider={PROVIDER_GOOGLE}
    showsUserLocation={true}
    showsMyLocationButton={true}
  />
</View>

  );
};

// FAQ Component (simplified version)
const FAQ = () => {
  const faqItems = [
    {
      question: "How long does the treasure hunt last?",
      answer: "The treasure hunt runs for five days. Complete as many clues and side quests as you can during this time!"
    },
    {
      question: "Do I need to register?",
      answer: "Just join the WhatsApp group to participate. No formal registration required."
    },
    {
      question: "Is there a cost to participate?",
      answer: "The treasure hunt is completely free to join!"
    },
    {
      question: "What kinds of prizes can I win?",
      answer: "Prizes include vouchers for local experiences like surf lessons, yoga classes, restaurant meals, and more."
    }
  ];

  return (
    <View className="bg-white rounded-lg p-5 shadow mb-3">
      <Text className="text-2xl font-bold mb-4">Frequently Asked Questions</Text>
      {faqItems.map((item, index) => (
        <View key={index} className="mb-4">
          <Text className="text-lg font-semibold mb-1">{item.question}</Text>
          <Text className="text-base text-gray-600">{item.answer}</Text>
        </View>
      ))}
    </View>
  );
};

// Main screen component (equivalent to Page in the original)
export default function QuestionAnswer(){
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-5 pt-20 pb-20 space-y-10">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold mb-2.5 text-center">The Hunt is On!</Text>
          <Text className="text-lg text-amber-700 text-center max-w-[90%]">
            Complete Side Quests & Win Prizes in this free Treasure Hunt!
          </Text>
        </View>

        <View className="mb-8">
          <View className="bg-white rounded-lg p-5 mb-5 shadow">
            <Text className="text-2xl font-bold mb-4">How to Play</Text>
            <View className="space-y-4">
              <View className="flex-row items-start">
                <Text className="mr-1 font-semibold">1.</Text>
                <View className="flex-1">
                  <Text className="text-base">
                    Join the{' '}
                    <Text 
                      className="text-amber-700 font-bold uppercase"
                      onPress={() => openLink('https://chat.whatsapp.com/Gzff8wsNHlqERDmtD8Bck4')}
                    >
                      WHATSAPP GROUP
                    </Text>{' '}
                    to join the hunt!
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-start">
                <Text className="mr-1 font-semibold">2.</Text>
                <View className="flex-1">
                  <Text className="text-base">
                    Check the{' '}
                    <Text 
                      className="text-amber-700 font-bold uppercase"
                      onPress={() => openLink('clues')}
                    >
                      CLUES
                    </Text>{' '}
                    page to see the first clue
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-start">
                <Text className="mr-1 font-semibold">3.</Text>
                <View className="flex-1">
                  <Text className="text-base">
                    Visit the{' '}
                    <Text 
                      className="text-amber-700 font-bold uppercase"
                      onPress={() => openLink('dashboard')}
                    >
                      DASHBOARD
                    </Text>{' '}
                    to see the map and Teams Leaderboard
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-start">
                <Text className="mr-1 font-semibold">4.</Text>
                <View className="flex-1">
                  <Text className="text-base">
                    Solve clues to find cool hidden-gem businesses in the city.
                    Each business has a verification code that you can enter to
                    unlock the next clue
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-start">
                <Text className="mr-1 font-semibold">5.</Text>
                <View className="flex-1">
                  <Text className="text-base">
                    Share your adventure on Instagram with #AVNTreasureHunt
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-start">
                <Text className="mr-1 font-semibold">6.</Text>
                <View className="flex-1">
                  <Text className="text-base">
                    Complete{' '}
                    <Text 
                      className="text-amber-700 font-bold uppercase"
                      onPress={() => openLink('challenges')}
                    >
                      SIDE QUESTS
                    </Text>{' '}
                    and post them for additional points
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-start">
                <Text className="mr-1 font-semibold">7.</Text>
                <View className="flex-1">
                  <Text className="text-base">
                    The top teams will win small prizes such as vouchers for surf
                    lessons, yoga classes, and more
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-lg p-5 mt-3 mb-1 shadow">
            <Text className="text-2xl font-bold mb-4">Hunt Area</Text>
            <MapComponent />
          </View>
        </View>

        <FAQ />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
};