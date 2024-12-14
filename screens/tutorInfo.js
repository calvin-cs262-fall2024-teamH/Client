// TutorInfoScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TutorInfoScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Become a Tutor</Text>
      <Text style={styles.infoText}>
        TutorsHub offers an excellent opportunity for students to earn money while helping their peers excel academically.
      </Text>
      <Text style={styles.sectionHeader}>Why Join as a Tutor?</Text>
      <Text style={styles.listItem}>- Earn volunteer hours by tutoring in courses you've excelled in.</Text>
      <Text style={styles.listItem}>- Build your resume with valuable teaching experience.</Text>
      <Text style={styles.listItem}>- Flexible hours that fit your schedule.</Text>

      <Text style={styles.sectionHeader}>How to Apply</Text>
      <Text style={styles.infoText}>
        To become a tutor, contact us with your information and the courses you wish to tutor for. Email us at:
      </Text>
      <Text style={styles.contactEmail}>John@calvin.edu</Text>

      <Text style={styles.sectionHeader}>Requirements</Text>
      <Text style={styles.listItem}>- Must be a registered college student.</Text>
      <Text style={styles.listItem}>- Achieved a grade of B or higher in the courses you want to tutor.</Text>
      <Text style={styles.listItem}>- Strong communication skills and a passion for helping others.
      </Text>

      <Text style={styles.footerText}>We look forward to having you on our team!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    lineHeight: 22,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  contactEmail: {
    fontSize: 16,
    color: '#007BFF',
    marginVertical: 10,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default TutorInfoScreen;