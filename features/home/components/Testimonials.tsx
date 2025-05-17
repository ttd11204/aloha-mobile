import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import sharedStyles from '../HomeStyles';

const testimonials = [
  {
    name: 'John Doe',
    comment: 'Amazing experience!',
    location: 'Ho Chi Minh City',
    date: 'May 10, 2025',
    avatar: require('@/assets/Side_Image/shawn.jpg'),
  },
  {
    name: "Rosie",
    avatar: require('@/assets/Side_Image/Rosie.jpg'),
    comment:
      "This app transformed our trip to Ha Long Bay. The cave exploration challenge had us discovering places we would never have found on our own!",
    location: "Ha Long Bay",
    date: "February 15, 2025",
  },
];

const Testimonials = () => (
  <View style={sharedStyles.section}>
    <Text style={sharedStyles.sectionTitle}>What Travelers Say</Text>
    {testimonials.map((testimonial, index) => (
      <View key={index} style={sharedStyles.testimonialCard}>
        <View style={sharedStyles.testimonialHeader}>
          <Image source={testimonial.avatar} style={sharedStyles.testimonialAvatar} />
          <View>
            <Text style={sharedStyles.testimonialName}>{testimonial.name}</Text>
            <Text style={sharedStyles.testimonialRating}>★★★★★</Text>
          </View>
        </View>
        <Text style={sharedStyles.testimonialComment}>{testimonial.comment}</Text>
        <Text style={sharedStyles.testimonialFooter}>
          {testimonial.location} • {testimonial.date}
        </Text>
      </View>
    ))}
    <TouchableOpacity style={sharedStyles.readMoreButton}>
      <Text style={sharedStyles.readMoreButtonText}>Read More Reviews</Text>
    </TouchableOpacity>
  </View>
);

export default Testimonials;
