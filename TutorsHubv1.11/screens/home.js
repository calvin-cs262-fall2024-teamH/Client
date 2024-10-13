// home.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CourseCard = ({ name, image, onPress }) => {
  return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={image} style={styles.image} />
        <Text style={styles.courseText}>{name}</Text>
    </TouchableOpacity>
  )
}

export default function HomeScreen({ navigation }) {

  const handleCardPress = (course) => {
    if (course === "CS 262") {
      navigation.navigate("Cs262Screen");
    } else if (course === "MATH 172") {
      navigation.navigate("Math172Screen");
    } else if (course === "CHEM 101") {
      navigation.navigate("Chem101Screen");
    } else if (course === "MATH 252") {
      navigation.navigate("Math252Screen");
    }
    else {
      console.log('Pressed ' + course);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Offered Courses:</Text> 
      
      <View style={styles.cardsContainer}>
        <CourseCard
          name="CS 262"
          image={require('../assets/262pic.jpg')}
          onPress={() => handleCardPress("CS 262")}
        />
        <CourseCard
          name="MATH 172"
          image={require('../assets/172pic.jpg')}
          onPress={() => handleCardPress("MATH 172")}
        />
        <CourseCard
          name="CHEM 101"
          image={require('../assets/101.jpg')}
          onPress={() => handleCardPress("CHEM 101")}
        />
        <CourseCard
          name="MATH 252"
          image={require('../assets/172pic.jpg')}
          onPress={() => handleCardPress("MATH 252")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 0,
    backgroundColor: '#4b3ae0',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff', 
    marginBottom: 10,
    marginLeft: 7,
    textAlign: 'left',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    width: 100,
    height: 140,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: 110,
  },
  courseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b3ae0',
    textAlign: 'center',
    paddingTop: 5,
  },
});