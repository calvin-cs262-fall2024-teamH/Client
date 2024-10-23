import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet,Image } from 'react-native';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
	setSearchQuery(query);
	// Simulate search results
	setResults([
	  { id: '1', name: 'Course 1' },
	  { id: '2', name: 'Course 2' },
	  { id: '3', name: 'Course 3' },
	]);
  };

  return (
	<View style={styles.container}>
		<Image source = {require('../assets/logoBlack.png')} style = {styles.logoImage} />

		<TextInput
		style={styles.searchBar}
		placeholder="Search courses..."
		value={searchQuery}
		onChangeText={handleSearch}
	  />
	  <FlatList
		data={results}
		keyExtractor={(item) => item.id}
		renderItem={({ item }) => (
		  <View style={styles.resultItem}>
			<Text style={styles.resultText}>{item.name}</Text>
		  </View>
		)}
	  />
	</View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	searchBar: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		marginBottom: 16,
	},
	resultItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	resultText: {
		fontSize: 18,
	},
	logoImage: {
		width: 50,
		height: 40,
		alignSelf: 'flex-start',
		marginBottom: 10,
	},
});

export default SearchScreen;