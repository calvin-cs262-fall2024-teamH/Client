// PrivacyAndSecurityScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyAndSecurityScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Privacy and Security</Text>

      <Text style={styles.subHeader}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        At TutorsHub, we value your privacy. We do not sell or share your personal information with third parties. Your data is securely stored and used solely to provide you with the best possible service. If you have any questions about our data practices, feel free to contact us.
      </Text>

      <Text style={styles.subHeader}>Steps to Ensure Security</Text>
      <Text style={styles.paragraph}>
        1. Use a strong password for your account and do not share it with others.
      </Text>
      <Text style={styles.paragraph}>
        2. Keep your app updated to the latest version to benefit from security updates.
      </Text>
      <Text style={styles.paragraph}>
        3. If you suspect unauthorized activity on your account, contact support immediately.
      </Text>


      <Text style={styles.subHeader}>Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions or concerns about your privacy and security, please email us at support@tutorshub.com.
      </Text>  
        <Text style={styles.contactEmail}>support@tutorshub.com</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contactEmail: {
    fontSize: 16,
    color: '#00bbFF',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    marginBottom: 10,
  },
});

export default PrivacyAndSecurityScreen;
