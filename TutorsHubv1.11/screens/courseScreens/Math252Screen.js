import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Math252screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>* Math 252 Screen Here *</Text>
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

export default Math252screen;