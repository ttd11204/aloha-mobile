import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import sharedStyles from '../HomeStyles';

const challenges = [
  {
    icon: 'puzzle-piece',
    title: 'Hoi An Ancient Town',
    description: 'Solve the lantern riddle',
    rating: '4.8 ★',
  },
  {
    icon: 'mountain',
    title: 'Ha Long Bay',
    description: 'Find the hidden cave',
    rating: '4.7 ★',
  },
];

const PopularChallenges = () => (
  <View style={sharedStyles.section}>
    <Text style={sharedStyles.sectionTitle}>Popular Challenges</Text>
    {challenges.map((challenge, index) => (
      <View key={index} style={sharedStyles.challengeCard}>
        <FontAwesome5 name={challenge.icon} size={24} color="#e7505f" style={sharedStyles.challengeIcon} />
        <View style={sharedStyles.challengeTextContainer}>
          <Text style={sharedStyles.challengeTitle}>{challenge.title}</Text>
          <Text style={sharedStyles.challengeDescription}>{challenge.description}</Text>
        </View>
        <View style={sharedStyles.challengeRatingContainer}>
          <Text style={sharedStyles.challengeRating}>{challenge.rating}</Text>
        </View>
      </View>
    ))}
  </View>
);

export default PopularChallenges;