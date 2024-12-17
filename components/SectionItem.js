// SectionItem.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const SectionItem = ({
  name,
  courses,
  ID, // Add tutorID prop
  isFavorite,
  onToggleFavorite = () => {},
  hideFavoriteButton = false,
}) => {
  const [bgColor, setBgColor] = useState(isFavorite ? '#32CD32' : '#fff');
  const [favoritesCount, setFavoritesCount] = useState(0); // State for favorites count
  const navigation = useNavigation();

  useEffect(() => {
    setBgColor(isFavorite ? '#32CD32' : '#fff');
  }, [isFavorite]);

  useEffect(() => {
    // Fetch favorites count for the tutor
    const fetchFavoritesCount = async () => {
      try {
        const response = await fetch(`http://calvintutorshub.azurewebsites.net/fav/fetch/${ID}`);
        const data = await response.json();
        setFavoritesCount(data.favoritesCount || 0);
      } catch (error) {
        console.error('Error fetching favorites count:', error);
      }
    };

    fetchFavoritesCount();
  }, [ID]);

  const handleToggleFavorite = async () => {
    try {
      // Call the parent-provided handler to toggle favorite
      await onToggleFavorite();

      // Re-fetch the updated favorites count
      const response = await fetch(`http://calvintutorshub.azurewebsites.net/fav/fetch/${ID}`);
      const data = await response.json();
      setFavoritesCount(data.favoritesCount || 0);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCoursePress = (courseCode) => {
    navigation.navigate('CourseScreen', { courseCode }); // Navigate to the CourseScreen with courseCode
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.separator}></View>
      <View style={styles.coursesContainer}>
        <Text style={styles.coursesHeader}>Courses:</Text>
        <View style={styles.courseButtonsContainer}>
          {courses.map((course, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCoursePress(course.courseCode)}
              style={styles.courseButton}
            >
              <Text style={styles.courseButtonText}>{course.courseCode}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('FooterTabs', { screen: 'Chats' })} style={styles.iconButton}>
          <Icon name="envelope" size={24} color="#fff" />
        </TouchableOpacity>
        {!hideFavoriteButton && (
          <View style={styles.favoriteContainer}>
            <Text style={styles.favoriteCount}>{favoritesCount}</Text>
            <TouchableOpacity
              onPress={handleToggleFavorite}
              style={[styles.iconButton, { backgroundColor: bgColor }]}
            >
              <Icon name="star" size={24} color={isFavorite ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

SectionItem.propTypes = {
  name: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      courseCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  ID: PropTypes.number.isRequired, // Add tutorID prop
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func,
  hideFavoriteButton: PropTypes.bool,
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    marginVertical: 8,
    height: 1,
    backgroundColor: '#4b3ae0',
    borderBottomWidth: 2,
    borderBottomColor: '#4b3ae0',
  },
  coursesContainer: {
    marginBottom: 12,
  },
  coursesHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  courseButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow buttons to wrap to the next line
    gap: 4, // Adjust space between buttons
  },
  courseButton: {
    backgroundColor: '#4b3ae0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
    marginRight: 5, // Reduce space between buttons
  },
  courseButtonText: {
    fontSize: 12, // Smaller text
    color: '#fff',
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 7,
    backgroundColor: '#4b3ae0',
    borderRadius: 50,
    marginRight: 10,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
});

export default SectionItem;