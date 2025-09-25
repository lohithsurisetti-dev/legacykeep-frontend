/**
 * Main App Stack Navigator
 * 
 * Handles all main application screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList, ROUTES } from './types';

// Import screens and tab navigator
import TabNavigator from './TabNavigator';
import ProfileScreen from '../../features/main/screens/ProfileScreen';
import SettingsScreen from '../../features/main/screens/SettingsScreen';
import MediaScreen from '../../features/main/screens/MediaScreen';

const Stack = createStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      {/* Main tab navigator - contains Home, Family, Stories, Chat */}
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          headerShown: false, // Tabs handle their own headers
        }}
      />
      
      {/* Profile Screen */}
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: false, // ProfileScreen handles its own header
        }}
      />
      
      <Stack.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          headerShown: false, // SettingsScreen handles its own header
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
