// home.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// creates CourseCard component that displays course 'name' and 'image'
const CourseCard = ({ name, image, onPress }) => {
  return (
    // TouchableOpacity makes the entire component clickable
      <TouchableOpacity style={styles.card} onPress={onPress}> 
        <Image source={image} style={styles.image} />
        <Text style={styles.courseText}>{name}</Text>
    </TouchableOpacity>
  )
}

// creates NewsCard component that displays course 'name' and 'image'
const NewsCard = ({ name, image, onPress }) => {
  return (
      // TouchableOpacity makes the entire component clickable
      <TouchableOpacity style={styles.newsCard} onPress={onPress}>
        <Image source={image} style={styles.newsImage} />
        <Text style={styles.newsText}>{name}</Text>
    </TouchableOpacity>
  )
}

export default function HomeScreen({ navigation }) {

  // method handles where to navigate to depending on which component is clicked
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
    // logs what was clicked if no method included in the if elses
    else {
      console.log('Pressed ' + course);
    }
  }

  return (
    <View style={styles.container}>

      {/* TH logo */}
      <Image source = {require('../assets/logoBlack.png')} style = {styles.logoImage} />

      <Text style={styles.userHeader}>Welcome, *username*!</Text> 

      <Text style={styles.header}>Offered Courses:</Text> 
      
      {/* All of the currently offered CourseCards */}
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

      {/* News/Announcements Card*/}
      <NewsCard
        name="News/Announcements"
        image={require('../assets/NA.jpg')}
        onPress={() => console.log("News button pressed.")}
      />
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
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 415,
    height: 375,
    alignItems: 'center',
    marginLeft: 7,
    marginTop: 25,
    paddingTop: 0,
  },
  image: {
    width: '100%',
    height: 110,
  },
  newsImage: {
    width: '100%',
    height: 325,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

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
  newsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b3ae0',
    textAlign: 'center',
    paddingTop: 15,
  },
});