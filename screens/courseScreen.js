// courseScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CourseScreen = ({ route, navigation }) => {
  const { courseCode } = route.params; // Get the course code from navigation params
  const [tutors, setTutors] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch(`https://calvintutorshub.azurewebsites.net/coursecodes/${courseCode}`);
        const data = await response.json();
        setTutors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [courseCode]);

  const handleChatPress = (tutorName) => {
    navigation.navigate("FooterTabs", { screen: "Chats" }); // Pass tutor name to Chat screen if needed
  };

  const renderTutorCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.tutorName}>{item.tutorname}</Text>
      <TouchableOpacity style={styles.chatButton} onPress={() => handleChatPress(item.tutorname)}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tutors Available for {courseCode}:</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={tutors}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTutorCard}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

CourseScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      courseCode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const TH_PURPLE = '#4b3ae0'; // TutorsHub purple
const GREEN = '#4CAF50'; // Green for chat button

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TH_PURPLE, // Change background to TH purple
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Change text color to white
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff', // Card background remains white
    elevation: 3,
  },
  tutorName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Change tutor name text color to black
  },
  chatButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: GREEN, // Change button background to green
    borderRadius: 5,
  },
  chatButtonText: {
    color: 'white', // Change button text color to white
    fontWeight: 'bold',
  },
});

export default CourseScreen;