// home.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native';

// const fetchWithRateLimit = async (url) => {
//   try {
//     const response = await fetch(url);

//     // Log rate limit information
//     const rateLimit = response.headers.get('X-RateLimit-Limit');
//     const rateRemaining = response.headers.get('X-RateLimit-Remaining');
//     const rateReset = response.headers.get('X-RateLimit-Reset');

//     console.log(`Rate Limit: ${rateLimit}`);
//     console.log(`Requests Remaining: ${rateRemaining}`);
//     console.log(`Rate Limit Resets In: ${rateReset} seconds`);

//     if (!response.ok) {
//       throw new Error(`Request failed with status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;

//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// Usage example
// const PIXABAY_API_URL = 'https://pixabay.com/api/?key=YOUR_API_KEY&q=flowers';

// fetchWithRateLimit(PIXABAY_API_URL);
// Pixabay API configuration

const PIXABAY_API_KEY = '47068954-556e7ed04216c0e453375d551';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

const placeholderImage = 'https://via.placeholder.com/150/FF0000/FFFFFF?text=No+Image';

// Function to determine search query based on course code
const getSearchQuery = (courseCode) => {
  if (courseCode.startsWith('CS')) return 'Computer Science';
  if (courseCode.startsWith('COMM')) return 'Communications Class';
  if (courseCode.startsWith('ENGR')) return 'Engineering';
  if (courseCode.startsWith('MATH')) return 'Math';
  if (courseCode.startsWith('STAT')) return 'Statistics';
  return 'Education'; // Default search term
};

// Default images mapping for categories
const defaultImages = {
  CS: require('../assets/CSdefault.png'),
  COMM: require('../assets/COMMdefault.png'),
  ENGR: require('../assets/ENGRdefault.png'),
  MATH: require('../assets/MATHdefault.png'),
  STAT: require('../assets/STATdefault.png'),
  DEFAULT: 'https://via.placeholder.com/150/808080/FFFFFF?text=Default+Image',
};

// Function to determine the default image for a course code
const getDefaultImage = (courseCode) => {
  if (courseCode.startsWith('CS')) return defaultImages.CS;
  if (courseCode.startsWith('COMM')) return defaultImages.COMM;
  if (courseCode.startsWith('ENGR')) return defaultImages.ENGR;
  if (courseCode.startsWith('MATH')) return defaultImages.MATH;
  if (courseCode.startsWith('STAT')) return defaultImages.STAT;
  return defaultImages.DEFAULT;
};

// Updated fetchImageForCourse function
const fetchImageForCourse = async (courseCode, usedImageIds) => {
  const searchQuery = getSearchQuery(courseCode);
  const url = `${PIXABAY_BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchQuery)}&image_type=photo`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429) {
        console.error('API rate limit reached.');
      } else {
        console.error(`API request failed with status: ${response.status}`);
      }
      return getDefaultImage(courseCode); // Return default image if API fails
    }

    const json = await response.json();

    if (json.hits && json.hits.length > 0) {
      // Find the first unique image not already used
      for (const hit of json.hits) {
        if (!usedImageIds.has(hit.id)) {
          usedImageIds.add(hit.id); // Mark the ID as used
          return hit.webformatURL;
        }
      }
    }

    return getDefaultImage(courseCode); // Return default image if no unique image is found
  } catch (error) {
    console.error(`Error fetching image for ${courseCode}:`, error);
    return getDefaultImage(courseCode); // Return default image if an error occurs
  }
};

const CourseCard = ({ name, image, onPress }) => {
  const imageSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.courseText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [images, setImages] = useState({}); // Stores course images
  const usedImageIds = new Set(); // Image ID cache for ensuring unique images
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

  // Fetch courses and images from the backend
  const getCourses = async () => {
    try {
      const response = await fetch('https://calvintutorshub.azurewebsites.net/coursecodes');
      const json = await response.json();
      setCourses(json);
      setFilteredClasses(json);


      const imagesMap = {};
      for (const course of json) {
        const courseImage = await fetchImageForCourse(course.coursecode, usedImageIds);
        imagesMap[course.coursecode] = courseImage;
      }
      setImages(imagesMap);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleCardPress = (course) => {
    navigation.navigate("CourseScreen", { courseCode: course });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredResults = courses.filter(classItem =>
        classItem.coursecode.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredClasses(filteredResults);
    } else {
      setFilteredClasses(courses);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logoBlack.png')} style={styles.logoImage} />
        <View style={styles.textContainer}>
          <Text style={styles.userHeader}>Welcome, Sam!</Text>
          <Text style={styles.header}>Offered Courses:</Text>
        </View>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search courses..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {isLoading ? (
        <ActivityIndicator size="40" color="#ffffff" />
      ) : (
        <FlatList
          data={filteredClasses}
          keyExtractor={(item) => item.coursecode}
          renderItem={({ item }) => {
            const formattedCourseCode = item.coursecode.replace(/([A-Za-z]+)(\d+)/, '$1 $2');
            const image = images[item.coursecode] || placeholderImage;
            return (
              <CourseCard
                name={formattedCourseCode}
                image={image}
                onPress={() => handleCardPress(item.coursecode)}
              />
            );
          }}
          numColumns={4}
          contentContainerStyle={styles.cardsContainer}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 5,
    backgroundColor: '#4b3ae0',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 70,
    height: 70,
    marginRight: 30,
    marginLeft: 5,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
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
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    flexBasis: '22%',
    height: 140,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
    marginHorizontal: '1%',
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    padding: 10,
  },
});