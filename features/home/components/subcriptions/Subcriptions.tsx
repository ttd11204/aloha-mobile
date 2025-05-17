import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {newsletterStyles} from './SubcriptionStyle';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log(`Subscribed with email: ${email}`);
  };

  return (
    <View style={newsletterStyles.newsletterSection}>
      <View style={newsletterStyles.newsletterHeader}>
        <FontAwesome5 name="bell" size={20} color="#e7505f" />
        <Text style={newsletterStyles.newsletterTitle}>Stay Updated</Text>
      </View>
      <Text style={newsletterStyles.newsletterDescription}>
        Subscribe to our newsletter for new locations, special offers, and travel tips!
      </Text>
      <View style={newsletterStyles.newsletterForm}>
        <TextInput
          style={newsletterStyles.newsletterInput}
          placeholder="Your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity style={newsletterStyles.newsletterButton} onPress={handleSubscribe}>
          <Text style={newsletterStyles.newsletterButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
      <Text style={newsletterStyles.newsletterFooter}>
        We respect your privacy. Unsubscribe at any time.
      </Text>
    </View>
  );
};

export default NewsletterSubscription;