/**
 * Main App Stack Navigator
 * 
 * Handles all main application screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList, ROUTES } from './types';

// Import screens (we'll create these later)
import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import ChatScreen from '../screens/main/ChatScreen';
import FamilyScreen from '../screens/main/FamilyScreen';
import StoriesScreen from '../screens/main/StoriesScreen';
import MediaScreen from '../screens/main/MediaScreen';

const Stack = createStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          title: 'LegacyKeep',
          headerShown: false, // We'll use bottom tabs for main navigation
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.CHAT}
        component={ChatScreen}
        options={{
          title: 'Chat',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.FAMILY}
        component={FamilyScreen}
        options={{
          title: 'Family',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.STORIES}
        component={StoriesScreen}
        options={{
          title: 'Stories',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.MEDIA}
        component={MediaScreen}
        options={{
          title: 'Media',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
