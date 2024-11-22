import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('FooterTabs');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/logoBlack.png')} style={styles.logo} />
      <TextInput placeholder="Email" placeholderTextColor="#fff" style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor="#fff" style={styles.input} secureTextEntry />
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
});

export default SignIn;