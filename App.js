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
import ChatScreen from './components/chat'; // Chat screen component
import CourseScreen from './screens/courseScreen'; // Dynamic course screen
import ReceiptScreen from './components/Receipt'; // Receipt screen component
import SignIn from './screens/signin'; // Import the renamed screen
import SignUp from './screens/SignUp'; // Import the new screen

import FavoritesScreen from './screens/favoritescreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignInSignUp">
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="FooterTabs" component={FooterTabs} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CourseScreen" component={CourseScreen} />
        {/* Chat screen */}
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />

        {/* Receipt screen */}
        <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ title: 'Receipt' }} />

        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function FooterTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Chats':
              iconName = 'chatbubble-outline';
              break;
            case 'Search':
              iconName = 'search-outline';
              break;
            case 'Tutors':
              iconName = 'people-outline';
              break;
            case 'Options':
              iconName = 'options-outline';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Tutors" component={ReportsScreen} />
      <Tab.Screen name="Options" component={OptionsScreen} />
    </Tab.Navigator>
  );
}

export default App;
