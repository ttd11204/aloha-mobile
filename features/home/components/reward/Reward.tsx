import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {alohaRewardsStyles} from './RewardStyle'

const AlohaRewards = () => (
  <View style={alohaRewardsStyles.alohaSection}>
    <View style={alohaRewardsStyles.alohaHeader}>
      <FontAwesome5 name="trophy" size={24} color="#FFD700" />
      <Text style={alohaRewardsStyles.alohaTitle}>Aloha Rewards</Text>
    </View>
    <Text style={alohaRewardsStyles.alohaDescription}>
      Complete challenges and earn points to unlock exclusive rewards!
    </Text>
    <View style={alohaRewardsStyles.alohaProgressContainer}>
      <View style={alohaRewardsStyles.alohaProgressHeader}>
        <Text style={alohaRewardsStyles.alohaProgressText}>Your Progress</Text>
        <Text style={alohaRewardsStyles.alohaProgressPoints}>120 / 200 points</Text>
      </View>
      <View style={alohaRewardsStyles.alohaProgressBar}>
        <View style={alohaRewardsStyles.alohaProgressFill} />
      </View>
      <Text style={alohaRewardsStyles.alohaNextReward}>
        Next reward: Free City Tour (80 points to go)
      </Text>
    </View>
    <View style={alohaRewardsStyles.alohaSteps}>
      {['Complete Daily Challenges', 'Share Photos', 'Invite Friends', 'Redeem Rewards'].map(
        (step, index) => (
          <View key={index} style={alohaRewardsStyles.alohaStep}>
            <View style={alohaRewardsStyles.alohaStepNumber}>
              <Text style={alohaRewardsStyles.alohaStepNumberText}>{index + 1}</Text>
            </View>
            <Text style={alohaRewardsStyles.alohaStepText}>{step}</Text>
          </View>
        )
      )}
    </View>
  </View>
);

export default AlohaRewards;
