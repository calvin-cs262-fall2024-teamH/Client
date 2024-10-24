import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chats Screen</Text>
      <Image source = {require('../assets/logoBlack.png')} style = {styles.logoImage} />

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
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
  },
});
