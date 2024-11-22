import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types'; // Import PropTypes

const SectionItem = ({ name, courses, email, isFavorite, onToggleFavorite }) => {
  const [bgColor, setBgColor] = useState(isFavorite ? '#32CD32' : '#fff');  // Favori durumunu kontrol et
  const navigation = useNavigation();

  useEffect(() => {
    setBgColor(isFavorite ? '#32CD32' : '#fff');  // Rengi yeşil yap ya da beyaz
  }, [isFavorite]);

  const handleStarPress = () => {
    onToggleFavorite();  // Favori durumunu dış bileşende güncelle
  };

  const handleMailPress = () => {
    // Navigate to the 'Chat' screen and pass the email
    navigation.navigate('FooterTabs', { screen: "Chats" });  // Pass email to Chat screen
  };

  SectionItem.propTypes = {
    name: PropTypes.string.isRequired,            // Name should be a string
    courses: PropTypes.arrayOf(                   // Courses should be an array of objects
      PropTypes.shape({
        courseCode: PropTypes.string.isRequired,  // Each course object should have a courseCode which is a string
      })
    ).isRequired,
    email: PropTypes.string.isRequired,           // Email should be a string
    isFavorite: PropTypes.bool.isRequired,        // isFavorite should be a boolean
    onToggleFavorite: PropTypes.func.isRequired,  // onToggleFavorite should be a function
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.separator}></View>
      
      <View style={styles.coursesContainer}>
        <Text style={styles.coursesHeader}>Courses:</Text>
        {courses.map((course, index) => (
          <Text key={index} style={styles.courseText}>
            {course.courseCode}
          </Text>
        ))}
      </View>

      <View style={styles.footerContainer}>
        {/* Mail butonu */}
        <TouchableOpacity onPress={handleMailPress} style={styles.iconButton}>
          <Icon name="envelope" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Yıldız butonu */}
        <TouchableOpacity onPress={handleStarPress} style={[styles.iconButton, { backgroundColor: bgColor }]}>
          <Icon name="star" size={24} color={isFavorite ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
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
    borderBottomWidth:2,
    borderBottomColor:'#4b3ae0'
  },
  coursesContainer: {
    marginBottom: 12,
  },
  coursesHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  courseText: {
    fontSize: 14,
    color: '#555',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 7,
    backgroundColor: '#4b3ae0' , // Default button color
    borderRadius: 50,
    marginRight: 10,
  },
});

export default SectionItem;
