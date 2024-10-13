import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Cs262screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>* CS 262 Screen Here *</Text>
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Cs262screen;