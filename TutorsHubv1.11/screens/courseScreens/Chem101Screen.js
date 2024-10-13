import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Chem101screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>* Chem 101 Screen Here *</Text>
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

export default Chem101screen;