import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import SectionItem from '../components/SectionItem';

const FavoriteScreen = ({ route }) => {
  const { favoriteTutors } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Tutors</Text>
      <FlatList
        data={favoriteTutors}
        renderItem={({ item }) => (
          <SectionItem
            name={item.name}
            courses={item.courses}
            email={item.email}
            isFavorite={item.isFavorite}
            hideFavoriteButton={true}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

FavoriteScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      favoriteTutors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          courses: PropTypes.array.isRequired,
          email: PropTypes.string.isRequired,
          isFavorite: PropTypes.bool,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
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
});

export default FavoriteScreen;
