import Icon from "@react-native-vector-icons/fontawesome";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Plane } from "lucide-react-native";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetPackageDataQuery } from "./api/packageApi";
import ImageSlider from "./components/HomeSlider";
import PopularChallenges from "./components/PopularChallenges";
import Testimonials from "./components/Testimonials";
import NearbyEvents from "./components/event/Event";
import AlohaRewards from "./components/reward/Reward";
import NewsletterSubscription from "./components/subcriptions/Subcriptions";
import { Package } from "./types";

const featuredDestinations = [
  {
    name: "Hue Imperial City",
    location: "Central Vietnam",
    challenges: 5,
    rating: 4.9,
    isNew: true,
    image: require("../../assets/Side_Image/hue.jpg") as ImageSourcePropType,
  },
  {
    name: "Hanoi Old Quarter",
    location: "Northern Vietnam",
    challenges: 8,
    rating: 4.7,
    isNew: false,
    image: require("../../assets/Side_Image/hue.jpg") as ImageSourcePropType,
  },
  {
    name: "Da Nang Beach",
    location: "Central Vietnam",
    challenges: 3,
    rating: 4.6,
    isNew: true,
    image: require("../../assets/Side_Image/hue.jpg") as ImageSourcePropType,
  },
  {
    name: "Mekong Delta",
    location: "Southern Vietnam",
    challenges: 6,
    rating: 4.8,
    isNew: false,
    image: require("../../assets/Side_Image/hue.jpg") as ImageSourcePropType,
  },
  // ... other destinations
];

type PackageApiResponse = {
  image: ImageSourcePropType;
  name: string;
  location: string;
  challenges: number;
  rating: number;
  isNew: boolean;
};
type RootStackParamList = {
  Home: undefined;
  PackageDetail: { id: string };
  AnnualPayment: undefined;
  DaysPayment: undefined;
  // Add other routes here if needed
};

export default function HomePage() {
  const {
    data: pks,
    isLoading: pksLoading,
    isFetching: pksFetch,
  } = useGetPackageDataQuery();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const packages = pks || [];

  const renderPackage = ({ item }: { item: Package }) => (
    <TouchableOpacity
      style={styles.packageCard}
      onPress={() => {
        console.log("Package ID:", item.id);
        if (item.id === 1) {
          console.log("Annual Payment");
          navigation.navigate('AnnualPayment');
        } else if (item.id === 2) {
          console.log("Days Payment");
          navigation.navigate('DaysPayment');
        } 
        // else {
        //   navigation.navigate('PackageDetail', { id: item.id });
        // }
      }}
    >
      <Text style={styles.packageName}>{item.name}</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Buy now</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDestination = ({ item }: { item: PackageApiResponse }) => (
    <View style={styles.destinationCard}>
      <Image source={item.image} style={styles.destinationImage} />
      {item.isNew && <Text style={styles.newTag}>New</Text>}
      <Text style={styles.destinationTitle}>{item.name}</Text>
      <Text style={styles.destinationMeta}>
        <Icon name="map-marker" size={12} /> {item.location}
      </Text>
      <Text style={styles.destinationMeta}>
        {item.challenges} puzzles • {item.rating} ★
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={
            require("../../assets/Side_Image/halong.jpg") as ImageSourcePropType
          }
          style={styles.heroImage}
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Are you ready? <Plane size={16} />
          </Text>
          <Text style={styles.heroSubtitle}>
            Complete the mission to unlock the next location.
          </Text>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => navigation.navigate('Clues')}
            onPress={() => Alert.alert("Button Pressed", "Start playing!")}
          >
            <Text style={styles.buttonText}>Start playing</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Packages */}
      <Text style={styles.sectionTitle}>Choose your Plan</Text>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <FlatList
          style={{ alignSelf: "auto" }}
          data={packages}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPackage}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        />
      </View>

      {/* Image Slider */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local Cultural Events</Text>
        <ImageSlider />
      </View>

      {/* Featured Destinations */}
      <Text style={styles.sectionTitle}>Featured Destinations</Text>
      <FlatList
        data={featuredDestinations}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDestination}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Challenges */}
      <View>
        <PopularChallenges />
      </View>

      {/* Testimonials */}
      <View>
        <Testimonials />
      </View>

      {/* Event */}
      <View>
        <NearbyEvents />
      </View>

      {/* Reward */}
      <View>
        <AlohaRewards />
      </View>

      {/* Subscription */}
      <View>
        <NewsletterSubscription />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  heroSection: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
  },
  heroImage: {
    width: "50%",
    height: 160,
  },
  heroContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  heroTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  heroSubtitle: {
    color: "#555",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#0aaff1",
    padding: 10,
    borderRadius: 8,
    alignSelf: "auto",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: 'center'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 12,
    color: "#3B2C04",
  },
  packageCard: {
    backgroundColor: "#e0f7ff",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 160,
    alignItems: "center",
    // marginHorizontal: 15
  },
  packageName: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  destinationCard: {
    width: 160,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    elevation: 2,
  },
  destinationImage: {
    width: "100%",
    height: 90,
    borderRadius: 8,
  },
  destinationTitle: {
    fontWeight: "bold",
    marginTop: 6,
  },
  destinationMeta: {
    fontSize: 12,
    color: "#555",
  },
  newTag: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#e7505f",
    color: "#fff",
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
});
