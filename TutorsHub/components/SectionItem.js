// File: components/SectionItem.js
// it is for reports section

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.details}>{item.details}</Text>
    <Text style={styles.details}>{item.destination}</Text>
    <Text style={styles.details}>{item.timeAway}</Text>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    backgroundColor: '#9370DB',
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  
});

export default SectionItem;