import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SectionItem from '../components/SectionItem';

const FavoritesScreen = ({ route }) => {
  const { favorites } = route.params; // Favori tutorları al

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <SectionItem
              name={item.name}
              tutos={item.tutos}
              email={item.email}
              profileImage={item.profileImage}
            />
          )}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorites yet!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4b3ae0',
    marginBottom: 20,
  },
  noFavoritesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});

export default FavoritesScreen;
