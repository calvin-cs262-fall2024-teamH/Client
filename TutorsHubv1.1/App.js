import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/home';
import ChatsScreen from './screens/chats';
import SearchScreen from './screens/search';
import ReportsScreen from './screens/reports';
import OptionsScreen from './screens/options';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

export default App;
