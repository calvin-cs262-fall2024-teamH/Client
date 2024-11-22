import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for ESLint 
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

const SectionHeader = ({ title, searchText, setSearchText }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <Text style={styles.sectionHeader}>{title}</Text>
    </View>

    {/* Search Bar */}
    <TextInput
      style={styles.searchInput}
      placeholder="Search tutors..."
      value={searchText}
      onChangeText={setSearchText}  // Update search text
    />

    {/* Logo in the right corner */}
    <Image 
      source={require('../assets/logoBlack.png')}  // Adjust path to your logo file
      style={styles.logo} 
    />
  </View>
);

// Add PropTypes validation for the props
SectionHeader.propTypes = {
  title: PropTypes.string.isRequired, // Title should be a string and is required
  searchText: PropTypes.string.isRequired, // SearchText should be a string and is required
  setSearchText: PropTypes.func.isRequired, // setSearchText should be a function and is required
};

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 8,
    marginHorizontal: -15,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',  // Place items in a row
    alignItems: 'center',  // Vertically center items
    justifyContent: 'space-between', // Distribute items evenly between left and right
    backgroundColor: '#fff',
    borderWidth: 2,  // Outer border width
    borderColor: '#4b3ae0',  // Outer border color (white)
    borderRadius: 10,  // Rounded corners
    overflow: 'hidden',  // Ensure inner border does not spill over corners
  },
  innerBorder: {
    borderWidth: 2,  // Inner border width
    borderColor: '#800080',  // Purple color for inner border
    margin: 5,  // Inner margin to create spacing
    borderRadius: 8,  // Rounded corners for the inner border
  },
  headerLeft: {
    flex: 2,  // Ensure the title takes up space and pushes the search bar to the right
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 3,
  },
  searchInput: {
    marginTop: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    flex: 2,  // Allow the search input to grow and fill available space
  },
  logo: {
    width: 50,
    height: 40,
    marginLeft: 10,  // Add space between search input and logo
  }
});

export default SectionHeader;
