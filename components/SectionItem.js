import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const SectionItem = ({
  name,
  courses,
  isFavorite,
  onToggleFavorite = () => {},
  hideFavoriteButton = false,
}) => {
  const [bgColor, setBgColor] = useState(isFavorite ? '#32CD32' : '#fff');
  const navigation = useNavigation();

  useEffect(() => {
    setBgColor(isFavorite ? '#32CD32' : '#fff');
  }, [isFavorite]);

  const handleMailPress = () => {
    console.log(`Tıklanan Tutor: ${name}`); // Konsola tutor ismini yazdır

    // ChatScreen'deki aynı tutor'un butonunu tetiklemek için tutorName parametresini gönder
    navigation.navigate('Chats', { tutorName: name, triggerButton: true });
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
        <TouchableOpacity onPress={handleMailPress} style={styles.iconButton}>
          <Icon name="envelope" size={24} color="#fff" />
        </TouchableOpacity>
        {!hideFavoriteButton && (
          <TouchableOpacity
            onPress={onToggleFavorite}
            style={[styles.iconButton, { backgroundColor: bgColor }]}
          >
            <Icon name="star" size={24} color={isFavorite ? '#fff' : '#000'} />
          </TouchableOpacity>
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
    flexWrap: 'wrap',
  },
  courseButton: {
    backgroundColor: '#4b3ae0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
    marginRight: 5,
  },
  courseButtonText: {
    fontSize: 12,
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
});

export default SectionItem;
