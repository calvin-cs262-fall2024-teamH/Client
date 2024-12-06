import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Account Settings</Text>
      {/* Add account settings UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default AccountSettingsScreen;