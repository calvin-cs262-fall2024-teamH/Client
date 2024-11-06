import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoBlack.png')} style={styles.logoImage} />
      <Text style={styles.text}>Chats Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoImage: {
    width: 50,
    height: 40,
    position: 'absolute',
    top: 10, // Adjusts distance from the top
    left: 10, // Adjusts distance from the left
  },
});
