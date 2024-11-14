// app.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/home';
import ChatsScreen from './components/chat';
import ReportsScreen from './screens/reports';
import OptionsScreen from './screens/options';
import Cs262Screen from './screens/courseScreens/Cs262Screen';
import Math172Screen from './screens/courseScreens/Math172Screen';
import Chem101Screen from './screens/courseScreens/Chem101Screen';
import Math252Screen from './screens/courseScreens/Math252Screen';
import ChatScreen from './components/chat'; // Chat screen component
import CourseScreen from './screens/courseScreen'; // Dynamic course screen
import SignIn from './screens/signin';
import SignUp from './screens/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />) }} />
      <Tab.Screen name="Chats" component={ChatsScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="chatbubbles" color={color} size={size} />) }} />
      <Tab.Screen name="Reports" component={ReportsScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="document" color={color} size={size} />) }} />
      <Tab.Screen name="Options" component={OptionsScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="settings" color={color} size={size} />) }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
