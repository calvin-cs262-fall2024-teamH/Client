import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReceiptScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Receipt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Siyah arka plan
  },
  text: {
    color: '#fff', // Beyaz yazı
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ReceiptScreen;
