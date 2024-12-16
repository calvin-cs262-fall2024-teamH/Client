import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const HelpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.sectionHeader}>Welcome to the App!</Text>
      <Text style={styles.paragraph}>
        TutorsHub is an app for students to find tutors for classes that they are struggling with. Below is a guide on how to use the app.
      </Text>

      <Text style={styles.sectionHeader}>Home Screen</Text>
      <Text style={styles.paragraph}>
        The Home Screen displays a list of offered courses. You can search for courses using the search bar at the top. Tap on a course to view the tutors offered for that course.
      </Text>

      <Text style={styles.sectionHeader}>Course Screen</Text>
      <Text style={styles.paragraph}>
        The Course Screen displays the tutors offered for a specific course. You can view the tutor's profile and contact them for assistance.
      </Text>


      <Text style={styles.sectionHeader}>Chats Screen</Text>
      <Text style={styles.paragraph}>
        The Chats Screen allows you to communicate with tutors. You can start a new chat or continue an existing conversation. Tap on a chat to open it.
      </Text>

      <Text style={styles.sectionHeader}>Tutors Screen</Text>
      <Text style={styles.paragraph}>
        The Tutors Screen provides a list of available tutors. You can view their profiles and contact them for assistance.
        This screen also allows you to favorite the tutors that you like. You can tap on the favorites button to view your favorite tutors. Tap on a tutor to view their profile.
        Each tutor card has which courses that tutor has avaliable.
      </Text>

      <Text style={styles.sectionHeader}>Favorites Screen</Text>
      <Text style={styles.paragraph}>
        The Favorites Screen allows you to view the tutors that you have favorited.
      </Text>

      <Text style={styles.sectionHeader}>Options Screen</Text>
      <Text style={styles.paragraph}>
        The Options Screen allows you to customize your app settings. You can adjust account settings, notification preferences, theme settings, and more.
      </Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
  },
});

export default HelpScreen;