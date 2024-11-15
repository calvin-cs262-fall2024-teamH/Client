import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SectionItem from '../components/SectionItem';  // Component to display tutor info
import SectionHeader from '../components/SectionHeader';  // Import SectionHeader

const API_TUTORS = 'https://calvintutorshub.azurewebsites.net/tutors';

const ReportScreen = () => {
  const [tutorsList, setTutorsList] = useState([]);  // Tutor listesi
  const [filteredTutors, setFilteredTutors] = useState([]); // Filtered tutors list
  const [favoriteTutors, setFavoriteTutors] = useState([]); // State to store favorite tutors
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(''); // State for search text
  const navigation = useNavigation();

  // Tutor listesini çekiyoruz
  useEffect(() => {
    fetch(API_TUTORS)
      .then(response => response.json())
      .then(async (data) => {
        const tutorsWithCourses = await Promise.all(data.map(async (tutor) => {
          const tutorName = tutor.tutorname;
          const [firstName, lastName] = tutorName.split(" ");
          const courseUrl = `https://calvintutorshub.azurewebsites.net/tutors/${encodeURIComponent(firstName)}%20${encodeURIComponent(lastName)}`;

          // Tutorun kurslarını alıyoruz
          const courseData = await fetch(courseUrl).then(response => response.json());

          return {
            name: tutorName,
            courses: courseData.map(course => ({
              courseCode: course.coursecode,
            })),
            email: tutor.email,  // Tutor emailini de ekliyoruz
            isFavorite: false,   // Başlangıçta favori değil
          };
        }));

        setTutorsList(tutorsWithCourses);
        setFilteredTutors(tutorsWithCourses); // Initialize filtered tutors list
        setLoading(false);
      });
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (searchText.trim()) {
      setFilteredTutors(tutorsList.filter(tutor => tutor.name.toLowerCase().includes(searchText.toLowerCase())));
    } else {
      setFilteredTutors(tutorsList);
    }
  }, [searchText, tutorsList]);

  const handleToggleFavorite = (tutorName) => {
    setTutorsList(prevTutors => {
      return prevTutors.map(tutor => {
        if (tutor.name === tutorName) {
          tutor.isFavorite = !tutor.isFavorite;  // Toggle favorite status
        }
        return tutor;
      });
    });

    // Update favorite tutors list
    const newFavorites = tutorsList.filter(tutor => tutor.isFavorite);
    setFavoriteTutors(newFavorites);  // Set the new favorites list
  };

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
              key={item.name}
              name={item.name}
              courses={item.courses}
              email={item.email}
              isFavorite={item.isFavorite}
              onToggleFavorite={() => handleToggleFavorite(item.name)}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      )}

      {/* Favorite Screen Button at the Bottom */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => navigation.navigate('FavoritesScreen', { favoriteTutors })}>
        <Text style={styles.favoriteButtonText}>Favorite Tutors</Text>
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
    backgroundColor: '#32CD32',  // Green background for the button
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
