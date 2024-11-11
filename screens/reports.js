import React, { useState } from 'react';
import { View, Text, SectionList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import SectionItem from '../components/SectionItem';
import SectionHeader from '../components/SectionHeader';
import { useNavigation } from '@react-navigation/native';

// Data for SectionList
const DATA = [
  {
    data: [
      {
        name: 'Clive Amoh',
        courses: ['CS 262', 'MATH 172'],
        email: 'clive@domain.com',
        profileImage: require('../assets/yigitturanpp.png'),
      },
      {
        name: 'Rock Lee',
        courses: ['CHEM 101', 'MATH 252'],
        email: 'rock@domain.com',
        profileImage: require('../assets/peterpp.png'),
      },
      {
        name: 'Ben Tennyson',
        courses: ['CS 336', 'CS 101'],
        email: 'ben@domain.com',
        profileImage: require('../assets/profpp.png'),
      },
    ],
  },
];

const ReportsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text === '') {
      setFilteredData(DATA);
    } else {
      const filtered = DATA.map(section => ({
        ...section,
        data: section.data.filter(item =>
          item.name.toLowerCase().includes(text.toLowerCase())
        ),
      })).filter(section => section.data.length > 0);
      
      setFilteredData(filtered);
    }
  };

  const toggleFavorite = (tutor) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.name === tutor.name)) {
        return prevFavorites.filter((fav) => fav.name !== tutor.name);
      } else {
        return [...prevFavorites, tutor];
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logoBlack.png')} style={styles.logoImage} />
        <Text style={styles.header}>Tutors</Text>
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => navigation.navigate('FavoritesScreen', { favorites })}
        >
          <Text style={styles.favoritesButtonText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search tutor by name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.line} />

      <SectionList
        sections={filteredData}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <SectionItem
            name={item.name}
            courses={item.courses}
            email={item.email}
            profileImage={item.profileImage}
            isFavorite={favorites.some((fav) => fav.name === item.name)}
            onToggleFavorite={() => toggleFavorite(item)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b3ae0',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  line: {
    marginTop: 10,
    height: 7,
    backgroundColor: '#4b3ae0',
    marginBottom: 10,
  },
  logoImage: {
    width: 50,
    height: 40,
  },
  favoritesButton: {
    padding: 10,
    backgroundColor: '#4b3ae0',
    borderRadius: 5,
  },
  favoritesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReportsScreen;
