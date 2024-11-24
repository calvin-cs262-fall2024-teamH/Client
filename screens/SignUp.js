import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios'; // Importing axios for HTTP requests

const SignUp = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // For handling error messages

  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    try {
      // Make an HTTP POST request to the backend API
      const response = await axios.post('https://calvintutorshub.azurewebsites.net/auth/signup', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      // If successful, navigate to the next screen (e.g., 'FooterTabs')
      console.log('Sign Up successful:', response.data);
      navigation.navigate('SignIn'); // Change this to your actual navigation screen

    } catch (err) {
      // Handle error if the request fails
      console.error('Sign Up error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logoBlack.png')} style={styles.logo} />
            
      {/* First Name Input */}
      <TextInput
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
        placeholderTextColor="#fff"
        style={styles.input}
      />
      
      {/* Last Name Input */}
      <TextInput
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(text) => handleInputChange('lastName', text)}
        placeholderTextColor="#fff"
        style={styles.input}
      />
      
      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleInputChange('email', text)}
        placeholderTextColor="#fff"
        style={styles.input}
      />
      
      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleInputChange('password', text)}
        placeholderTextColor="#fff"
        style={styles.input}
        secureTextEntry
      />
      
      <Button title="Sign Up" onPress={handleSignUp} color="#fff" />
    </ScrollView>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4b3ae0', // Update background color as needed
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#fff', // Ensure text color is visible
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
});

export default SignUp;