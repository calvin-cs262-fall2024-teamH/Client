import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Course routes object - Ekran adlarını burada belirtin
const courseRoutes = {
  "CS 262": "Cs262Screen",
  "MATH 172": "Math172Screen",
  "CHEM 101": "Chem101Screen",
  "MATH 252": "Math252Screen",
  "CS 336": "Cs336Screen",
  "CS 101": "Cs101Screen",
};

const SectionItem = ({ name, courses, email, profileImage, isFavorite, onToggleFavorite }) => {
  const navigation = useNavigation();
  const [bgColor, setBgColor] = useState(isFavorite ? '#32CD32' : '#fff'); // Favori durumu

  useEffect(() => {
    setBgColor(isFavorite ? '#32CD32' : '#fff');
  }, [isFavorite]);

  // Handle the star button press
  const handleStarPress = () => {
    onToggleFavorite(); // Favori durumunu dış bileşende güncelle
  };

  // Handle course tag press based on course name
  const handleCoursePress = (course) => {
    const screen = courseRoutes[course];
    if (screen) {
      navigation.navigate(screen);
    } else {
      console.warn(`No screen found for course: ${course}`);
    }
  };

  return (
    <View style={[styles.itemContainer, { backgroundColor: bgColor }]}>
      <View style={styles.row}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.line} />

      <Text style={styles.coursesHeader}>courses:</Text>
      <View style={styles.tagsContainer}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={styles.tag}
            onPress={() => handleCoursePress(course)}
          >
            <Text style={styles.tagText}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.emailLabel}>Email:</Text>
      <Text style={styles.emailText}>{email}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
          <Icon name="envelope" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleStarPress}>
          <Icon name="star" size={24} color={isFavorite ? '#ffd700' : '#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: '#4b3ae0',
    borderWidth: 2,
    borderTopColor: '#4b3ae0',
    borderTopWidth: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: '#4b3ae0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    marginTop: 8,
    height: 1,
    backgroundColor: '#4b3ae0',
    marginVertical: 8,
  },
  coursesHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b3ae0',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 4,
  },
  tagText: {
    color: '#4b3ae0',
    fontSize: 12,
  },
  emailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b3ae0',
    marginTop: 8,
  },
  emailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#4b3ae0',
    marginHorizontal: 5,
  },
});

export default SectionItem;
