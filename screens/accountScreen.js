// AccountInfoScreen.js
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../UserContext';

const AccountScreen = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    // You can add logic here to fetch/update user data from Azure if needed
    // For now, this assumes the data is already available in the context
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Account Information</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{user.firstName || 'N/A'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{user.lastName || 'N/A'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email || 'N/A'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{user.userID || 'N/A'}</Text>
      </View>
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
});

export default AccountScreen;
