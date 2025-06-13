import React, { useRef, useState } from 'react'
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native'

const { width } = Dimensions.get('window')

const slides = [
  {
    uri: 'https://res.cloudinary.com/dtjgueyp2/image/upload/fl_preserve_transparency/v1749820956/image1_hgeyq1.jpg?_s=public-apps'
  },
  {
    uri: 'https://res.cloudinary.com/dtjgueyp2/image/upload/fl_preserve_transparency/v1749820955/image2_jgjx1a.jpg?_s=public-apps'
  },
  {
    uri: 'https://res.cloudinary.com/dtjgueyp2/image/upload/fl_preserve_transparency/v1749820955/image3_nrpbly.jpg?_s=public-apps'
  },
  {
    uri: 'https://res.cloudinary.com/dtjgueyp2/image/upload/fl_preserve_transparency/v1749821088/image4_inxark.jpg?_s=public-apps'
  }
]

const ImageSlider = () => {
  const scrollRef = useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrentIndex(slideIndex)
  }

  const goToSlide = (index: number) => {
    scrollRef.current?.scrollTo({ x: width * index, animated: true })
    setCurrentIndex(index)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {slides.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => goToSlide(index)}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: 20
  },
  image: {
    width: width,
    height: 250
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '100%'
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#bbb',
    margin: 6,
    borderRadius: 5
  },
  activeDot: {
    backgroundColor: '#333'
  }
})

export default ImageSlider
