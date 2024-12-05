import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

const SignIn = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  // Manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
    try {
      // Call your API for sign-in
      const response = await axios.post('https://calvintutorshub.azurewebsites.net/auth/signin', {
        email,
        password,
      });
  
      // Log the entire response to check its structure
      console.log("Server response:", response.data);
  
      if (response.data.message === 'Login successful') {
        setUser({
          userID: response.data.userID,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        });
        navigation.navigate('FooterTabs');
      } else {
        setErrorMessage('Invalid credentials, please try again');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage('An error occurred, please try again later');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logoBlack.png')} style={styles.logo} />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#fff"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Button title="Log In" onPress={handleSignIn} color="#fff" />
      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Don&apos;t have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4b3ae0', // Adjust this to match your app's theme
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 32,
    resizeMode: 'contain', // Ensure the image is not cut off
  },
  input: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#fff', // Ensure the text color is white
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    color: '#fff',
  },
  signUpText: {
    color: '#fff',
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignIn;