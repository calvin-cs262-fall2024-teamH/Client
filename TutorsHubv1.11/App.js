// app.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/home';
import ChatsScreen from './screens/chats';
import SearchScreen from './screens/search';
import ReportsScreen from './screens/reports';
import OptionsScreen from './screens/options';
import Cs262Screen from './screens/courseScreens/Cs262Screen';
import Math172Screen from './screens/courseScreens/Math172Screen';
import Chem101Screen from './screens/courseScreens/Chem101Screen';
import Math252Screen from './screens/courseScreens/Math252Screen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FooterTabs" component={FooterTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Cs262Screen" component={Cs262Screen} />
        <Stack.Screen name="Math172Screen" component={Math172Screen} />
        <Stack.Screen name="Chem101Screen" component={Chem101Screen} />
        <Stack.Screen name="Math252Screen" component={Math252Screen} />
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
              case 'Reports':
                iconName = 'document-text-outline';
                break;
              case 'Options':
                iconName = 'settings-outline';
                break;
              default:
                iconName = 'ellipse-outline';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chats" component={ChatsScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
        <Tab.Screen name="Options" component={OptionsScreen} />
      </Tab.Navigator>
  );
}

export default App;
