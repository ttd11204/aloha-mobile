import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const streetViewHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html { margin: 0; padding: 0; height: 100%; }
        iframe { border: 0; width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!4v1749347552724!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGFoN09DY3c.!2m2!1d10.81528276910156!2d106.786640042207!3f180.09028075277436!4f-4.0275922901250425!5f2.638105668290773" 
        allowfullscreen 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </body>
  </html>
`;


const StreetView = () => {
  return (
    <View style={styles.container}>
      <WebView
      originWhitelist={['*']}
      source={{ html: streetViewHtml }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      style={{ flex: 1 }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default StreetView;
