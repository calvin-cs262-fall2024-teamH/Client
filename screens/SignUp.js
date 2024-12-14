import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={require('../assets/logoBlack.png')} style={styles.logo} />
          <TextInput
            placeholder="First Name"
            value={form.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
            placeholderTextColor="#000"
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
            placeholderTextColor="#000"
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholderTextColor="#000"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={form.password}
            onChangeText={(text) => handleInputChange('password', text)}
            placeholderTextColor="#000"
            style={styles.input}
            secureTextEntry
          />
          <Button title="Sign Up" onPress={handleSignUp} color="#fff" />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b3ae0',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    backgroundColor: '#fff',
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
});

export default SignUp;