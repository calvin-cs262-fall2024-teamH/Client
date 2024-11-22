import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';

const SignUp = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    // Proceed with sign up logic
    console.log('Signing up with email:', form.email);
    navigation.navigate('FooterTabs');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logoBlack.png')} style={styles.logo} />
      <TextInput
        placeholder="Name"
        placeholderTextColor="#fff"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleInputChange('email', text)}
        placeholderTextColor="#fff"
        style={styles.input}
      />
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
    backgroundColor: '#4b3ae0', 
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
    color: '#fff', 
  },
});

export default SignUp;