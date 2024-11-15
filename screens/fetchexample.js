
//this screen does not work just , it is check point for fetching tutors and their course tags

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

// API URL'si (tutorların isimlerini almak için)
const API_URL_TUTORS = 'https://calvintutorshub.azurewebsites.net/tutors';

const ReportsScreen = () => {
  const [tutors, setTutors] = useState([]); // Tutorlar verisi
  const [loading, setLoading] = useState(true); // Yükleniyor durumu

  // Tutor isimlerini ve kurslarını çekeriz
  useEffect(() => {
    fetch(API_URL_TUTORS)
      .then(response => response.json())
      .then(async (data) => {
        // Her tutor için kursları çekeceğiz
        const tutorsWithCourses = await Promise.all(data.map(async (tutor) => {
          const tutorName = tutor.tutorname;
          const [firstName, lastName] = tutorName.split(" ");
          const courseUrl = `https://calvintutorshub.azurewebsites.net/tutors/${encodeURIComponent(firstName)}%20${encodeURIComponent(lastName)}`;

          // Tutorun kurslarını alıyoruz
          const courseData = await fetch(courseUrl).then(response => response.json());

          return {
            name: tutorName,
            courses: courseData.map(course => course.coursecode), // Kurs kodlarını alıyoruz
          };
        }));

        setTutors(tutorsWithCourses); // Kurslarla birlikte tutorları state'e ekliyoruz
        setLoading(false); // Yükleniyor durumunu kapatıyoruz
      })
      .catch(error => {
        console.error('Error fetching tutors:', error);
        setLoading(false);
      });
  }, []);

  // Eğer veriler yükleniyorsa gösterilecek animasyon
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text>Tutors List</Text>
      <FlatList
        data={tutors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            {item.courses.length > 0 ? (
              <FlatList
                data={item.courses}
                keyExtractor={(course, index) => index.toString()}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            ) : (
              <Text>No courses available</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ReportsScreen;




import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// SectionItem bileşeni, tutorların kurslarını gösterecek
const SectionItem = ({ name, courses }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.coursesHeader}>Courses:</Text>
      <View style={styles.coursesContainer}>
        {courses.map((course, index) => (
          <TouchableOpacity key={index} style={styles.courseButton}>
            <Text style={styles.courseText}>{course.courseCode}</Text> {/* sadece kurs kodunu gösteriyoruz */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coursesHeader: {
    fontSize: 14,
    marginTop: 8,
    color: '#333',
  },
  coursesContainer: {
    marginTop: 8,
  },
  courseButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 6,
    borderRadius: 5,
  },
  courseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SectionItem;



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import SectionHeader from '../components/SectionHeader';
import SectionItem from '../components/SectionItem';

const API_TUTORS = 'https://calvintutorshub.azurewebsites.net/tutors';

const ReportScreen = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tutor list
  useEffect(() => {
    fetch(API_TUTORS)
      .then(response => response.json())
      .then(async (data) => {
        // Her tutor için kurs bilgilerini çekeceğiz
        const tutorsWithCourses = await Promise.all(data.map(async (tutor) => {
          const tutorName = tutor.tutorname;
          const [firstName, lastName] = tutorName.split(" ");
          const courseUrl = `https://calvintutorshub.azurewebsites.net/tutors/${encodeURIComponent(firstName)}%20${encodeURIComponent(lastName)}`;

          // Tutorun kurslarını alıyoruz
          const courseData = await fetch(courseUrl).then(response => response.json());

          return {
            name: tutorName,
            courses: courseData.map(course => ({
              courseCode: course.coursecode,  // Sadece kurs kodunu alıyoruz
            })),
          };
        }));

        setTutors(tutorsWithCourses); // Kurslarla birlikte tutorları state'e ekliyoruz
        setLoading(false); // Yükleniyor durumunu kapatıyoruz
      })
      .catch(error => {
        console.error('Error fetching tutors:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Tutorları SectionList'e uygun şekilde formatlıyoruz
  const sections = [
    {
      title: "Tutors",
      data: tutors.map(tutor => ({
        name: tutor.name,
        courses: tutor.courses,
      })),
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SectionItem name={item.name} courses={item.courses} />
        )}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ReportScreen;







