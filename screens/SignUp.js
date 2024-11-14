import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
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
    navigation.navigate('Main');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logoBlack.png')} style={styles.logo} />
      <TextInput
        placeholder="Name"
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
  );
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
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default SignUp;