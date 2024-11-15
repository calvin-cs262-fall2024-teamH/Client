import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const FavoriteScreen = ({ route }) => {
  const { favoriteTutors } = route.params;  // Favori tutorlar, önceki ekrandan geliyor

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Tutors</Text>
      <FlatList
        data={favoriteTutors}
        renderItem={({ item }) => (
          <View style={styles.tutorItem}>
            <Text style={styles.tutorName}>{item.name}</Text>
            <Text style={styles.tutorEmail}>{item.email}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tutorItem: {
    marginBottom: 15,
  },
  tutorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tutorEmail: {
    fontSize: 14,
    color: '#888',
  },
});

export default FavoriteScreen;
