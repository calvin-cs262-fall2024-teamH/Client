import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SignInScreen() {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('Main');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logoBlack.png')} style={styles.logo} />
      <TextInput placeholder="Email" placeholderTextColor="#000" style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor="#000" style={styles.input} secureTextEntry />
      <Button title="Log In" onPress={handleSignIn} color="#fff" />
      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4b3ae0',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#000',
    backgroundColor: '#fff', // Set background color to white
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  text: {
    color: '#fff',
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default SignInScreen;