// Math172Screen.js

import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Math172Screen = () => {
  const navigation = useNavigation();

  const tutors = [
    { id: '1', name: 'John Doe', email: 'johndoe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'janesmith@example.com' },
    // Add more tutors here
  ];

  const handleChatPress = (tutorId) => {
    // Navigate to the placeholder chat screen
    navigation.navigate('Chat');
  };

  const renderTutorCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.tutorName}>{item.name}</Text>
      <Text style={styles.tutorEmail}>{item.email}</Text>
      <TouchableOpacity style={styles.chatButton} onPress={() => handleChatPress(item.id)}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tutors Available for Math172:</Text>
      <FlatList
        data={tutors}
        keyExtractor={(item) => item.id}
        renderItem={renderTutorCard}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 3,
    width: '90%', // Wide layout
  },
  tutorName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tutorEmail: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  chatButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  chatButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Math172Screen;