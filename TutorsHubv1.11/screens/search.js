import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const courses = [
	{ id: '1', name: 'Chem 101', page: 'Chem101Screen' },
	{ id: '2', name: 'CS 262', page: 'Cs262Screen' },
	{ id: '3', name: 'Math 172', page: 'Math172Screen' },
	{ id: '4', name: 'Math 252', page: 'Math252Screen' },
];

function SearchScreen() {
	const [searchQuery, setSearchQuery] = useState('');
	const [results, setResults] = useState([]);
	const navigation = useNavigation();

	const handleSearch = (query) => {
		setSearchQuery(query);
		if (query) {
			const filteredResults = courses.filter(course =>
				course.name.toLowerCase().includes(query.toLowerCase())
			);
			setResults(filteredResults);
		} else {
			setResults([]);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image source={require('../assets/logoBlack.png')} style={styles.logoImage} />
			</View>
			<Text style={styles.title}>Search Courses</Text>
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
					<TouchableOpacity onPress={() => navigation.navigate(item.page)}>
						<View style={styles.resultItem}>
							<Text style={styles.resultText}>{item.name}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#4b3ae0',
	},
	logoContainer: {
		position: 'absolute',
		top: 10, // Adjusts distance from the top
		left: 10, // Adjusts distance from the left
	},
	logoImage: {
		width: 50,
		height: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 16,
		color: '#fff',
		marginTop: 80, // Adjusted to account for the logo
	},
	searchBar: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 16,
		paddingHorizontal: 8,
		backgroundColor: '#fff',
	},
	resultItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		backgroundColor: '#fff',
		borderRadius: 8,
		marginBottom: 8,
	},
	resultText: {
		fontSize: 18,
		color: '#333',
	},
});

export default SearchScreen;
