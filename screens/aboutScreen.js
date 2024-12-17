// AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>About TutorsHub</Text>
      <Text style={styles.bodyText}>
        TutorsHub is a peer-to-peer tutoring platform designed to help students connect with qualified tutors
        who can assist them in their academic journey. Our platform ensures flexibility, transparency, and
        effectiveness by providing a space where tutors and tutees can communicate and, schedule sessions.
      </Text>

      <Text style={styles.subHeaderText}>Key Features:</Text>
      <Text style={styles.bodyText}>- Peer-to-peer tutoring
        - Flexible scheduling
        - Secure platform
      </Text>

      <Text style={styles.subHeaderText}>Our Mission:</Text>
      <Text style={styles.bodyText}>
        Our mission is to empower students to achieve academic success by connecting them with resources and
        support from their peers. We believe in the power of collaboration and knowledge-sharing to foster a
        better learning environment.
      </Text>

      <Text style={styles.bodyText}>
        For more information, visit our website or contact us through the app.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#4b3ae0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    marginBottom: 10,
  },
});

export default AboutScreen;
