import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/HTeam.jpg')} style={styles.logo} />
      <Text style={styles.text}>Welcome to Tutors Hub</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
