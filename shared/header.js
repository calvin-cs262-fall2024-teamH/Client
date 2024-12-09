import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { globalStyles } from '../styles/global';
import HelpScreen from "../screens/help";


export default function Header({ navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('help')}>
        <Text style={globalStyles.about}>?</Text>
      </TouchableOpacity>
    </View>
  );
};