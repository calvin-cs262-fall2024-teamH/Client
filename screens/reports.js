// reports.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SectionItem from '../components/SectionItem';
import SectionHeader from '../components/SectionHeader';

const API_TUTORS = 'https://calvintutorshub.azurewebsites.net/tutors';

const ReportScreen = () => {
  const [tutorsList, setTutorsList] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetch(API_TUTORS)
      .then((response) => response.json())
      .then(async (data) => {
        //console.log(data);
        const tutorsWithCourses = await Promise.all(
          data.map(async (tutor) => {
            const tutorName = tutor.tutorname;
            const [firstName, lastName] = tutorName.split(' ');
            const tutorID = tutor.tutorid;  // Corrected the variable name
            const courseUrl = `https://calvintutorshub.azurewebsites.net/tutors/${encodeURIComponent(firstName)}%20${encodeURIComponent(lastName)}`;

            const courseData = await fetch(courseUrl).then((response) => response.json());

            return {
              ID: tutorID,  // Correct tutorID
              name: tutorName,
              courses: courseData.map((course) => ({
                courseCode: course.coursecode,
              })),
              email: tutor.email,
              isFavorite: false,
            };
          })
        );

        setTutorsList(tutorsWithCourses);
        setFilteredTutors(tutorsWithCourses);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchText.trim()) {
      setFilteredTutors(
        tutorsList.filter((tutor) =>
          tutor.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setFilteredTutors(tutorsList);
    }
  }, [searchText, tutorsList]);

  const handleToggleFavorite = async (tutorID) => {
    try {
      const userID = 1; // Replace with actual user ID (e.g., from context or user state)

      console.log('Toggling favorite for tutorID:', tutorID);

      // Optimistically update the local state
      setTutorsList((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.ID === tutorID
            ? { ...tutor, isFavorite: !tutor.isFavorite } // Toggle the 'isFavorite' flag
            : tutor
        )
      );

      // Determine if this is a POST (add) or DELETE (remove) based on current favorite state
      const method = tutorsList.find((tutor) => tutor.ID === tutorID).isFavorite
        ? 'DELETE'
        : 'POST'; 
      const url = 'https://calvintutorshub.azurewebsites.net/fav';
      const body = JSON.stringify({
        userID: userID,
        tutorID: tutorID,
      });

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`Failed to ${method === 'POST' ? 'add' : 'remove'} tutor to/from favorites on the server.`);
      }

      const data = await response.json();
      console.log('Server response:', data);

      // Re-fetch the updated favorites count after adding/removing from favorites
      const fetchResponse = await fetch(`https://calvintutorshub.azurewebsites.net/fav/fetch/${tutorID}`);
      const countData = await fetchResponse.json();

      // Update the favorites count in the local state
      setTutorsList((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.ID === tutorID
            ? { ...tutor, favoritesCount: countData.favoritesCount }
            : tutor
        )
      );

    } catch (error) {
      console.error('Error toggling favorite status:', error.message);

      // Optionally: Roll back state change on failure (reset the favorite state)
      setTutorsList((prevTutors) =>
        prevTutors.map((tutor) =>
          tutor.ID === tutorID
            ? { ...tutor, isFavorite: !tutor.isFavorite } // Revert optimistic state change
            : tutor
        )
      );
    }
  };

  const favoriteTutors = tutorsList.filter((tutor) => tutor.isFavorite);

  return (
    <View style={styles.container}>
      <SectionHeader title="Tutors" searchText={searchText} setSearchText={setSearchText} />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredTutors}
          renderItem={({ item }) => (
            <SectionItem
              name={item.name}
              courses={item.courses}
              email={item.email}
              ID={item.ID}  // Passing tutorID properly
              isFavorite={item.isFavorite}
              onToggleFavorite={() => handleToggleFavorite(item.ID)}
            />
          )}
          keyExtractor={(item) => item.ID ? item.ID.toString() : item.name}  // Fallback to name if tutorID is undefined
        />
      )}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => navigation.navigate('FavoritesScreen', { favoriteTutors })}
      >
        <Text style={styles.favoriteButtonText}>Go to Favorite Tutors</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b3ae0',
    padding: 20,
  },
  favoriteButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReportScreen;