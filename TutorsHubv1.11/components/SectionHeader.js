// File: components/SectionHeader.js
// for reports section
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#ffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  
});

export default SectionHeader;