// OptionsScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OptionsScreen = () => {
  const navigation = useNavigation();

  const renderOptionButton = (title, onPress) => (
    <TouchableOpacity style={styles.optionButton} onPress={onPress}>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Options</Text>
      {renderOptionButton("Account Settings", () => navigation.navigate('AccountSettings'))}
      {renderOptionButton("Notification Settings", () => {/* Placeholder action */ })}
      {renderOptionButton("Theme Settings", () => {/* Placeholder action */ })}
      {renderOptionButton("Privacy and Security", () => {/* Placeholder action */ })}
      {renderOptionButton("Help and Support", () => {/* Placeholder action */ })}
      {renderOptionButton("About", () => {/* Placeholder action */ })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#555',
  },
});

export default OptionsScreen;