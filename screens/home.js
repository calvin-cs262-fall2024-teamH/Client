//
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

// creates CourseCard component that displays course 'name' and 'image'
const CourseCard = ({ name, image, onPress }) => {
  return (
    // TouchableOpacity makes the entire component clickable
    <TouchableOpacity style={styles.card} onPress={onPress}> 
      <Image source={image} style={styles.image} />
      <Text style={styles.courseText}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // Fetch courses from the API
  const getCourses = async () => {
    try {
      const response = await fetch('https://calvintutorshub.azurewebsites.net/coursecodes');
      const json = await response.json();
      setCourses(json); // Setting the course codes to state
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Call the getCourses function on component mount
  useEffect(() => {
    getCourses();
  }, []);

  // Method handles where to navigate to depending on which course is clicked
  const handleCardPress = (course) => {
    if (course === "CS 262") {
      navigation.navigate("Cs262Screen");
    } else if (course === "MATH 172") {
      navigation.navigate("Math172Screen");
    } else if (course === "CHEM 101") {
      navigation.navigate("Chem101Screen");
    } else if (course === "MATH 252") {
      navigation.navigate("Math252Screen");
    } else {
      console.log('Pressed ' + course);
    }
  };

  return (
    <View style={styles.container}>
      {/* TH logo */}
      <Image source={require('../assets/logoBlack.png')} style={styles.logoImage} />

      <Text style={styles.userHeader}>Welcome, Sam!</Text> 

      <Text style={styles.header}>Offered Courses:</Text> 
      
      {/* Conditionally render loading indicator or course list */}
      {isLoading ? (
        <ActivityIndicator size="40" color="#ffffff" />
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.coursecode} // Use course code as key
          renderItem={({ item }) => (
            <CourseCard
              name={item.coursecode} // Use course code for the name
              image={require('../assets/172pic.jpg')} // Replace with dynamic image if needed
              onPress={() => handleCardPress(item.coursecode)} // Pass course code for navigation
            />
          )}
          numColumns={4} // Specify that we want 4 cards per row
          contentContainerStyle={styles.cardsContainer} // Apply the existing container style
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: -5,
    backgroundColor: '#4b3ae0',
  },
  header: {
    fontSize: 27,
    fontWeight: 'semibold',
    color: '#ffffff', 
    marginBottom: 10,
    marginLeft: 7,
    paddingTop: 10,
    textAlign: 'left',
  },
  userHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff', 
    marginBottom: -5,
    marginLeft: 7,
    paddingTop: 10,
    textAlign: 'left',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensure cards wrap into the next line when needed
    justifyContent: 'space-between', // Equal space between cards
    marginTop: 10,
    paddingHorizontal: 10, // Padding around the container
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    flexBasis: '22%', // Set the card width to 22% of the container
    height: 140, // Fixed height for all cards
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15, // Vertical space between rows
    marginHorizontal: '1%', // Horizontal margin between cards
  },
  image: {
    width: '100%',
    height: 110,
  },
  logoImage: {
    width: 100,
    height: 80,
    alignSelf: 'left',
    marginLeft: 7,
  },
  courseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b3ae0',
    textAlign: 'center',
    paddingTop: 5,
  },
});