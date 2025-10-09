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
import AccountSettingsScreen from '../../features/main/screens/AccountSettingsScreen';
import PrivacySettingsScreen from '../../features/main/screens/PrivacySettingsScreen';
import NotificationSettingsScreen from '../../features/main/screens/NotificationSettingsScreen';
import SecuritySettingsScreen from '../../features/main/screens/SecuritySettingsScreen';
import AppPreferencesScreen from '../../features/main/screens/AppPreferencesScreen';
import HelpSupportScreen from '../../features/main/screens/HelpSupportScreen';
import AboutScreen from '../../features/main/screens/AboutScreen';
import MediaScreen from '../../features/main/screens/MediaScreen';

// Import sample screens
import WisdomScreen from '../../features/main/components/samples/WisdomScreen';
import RecipeScreen from '../../features/main/components/samples/RecipeScreen';
import StoryScreen from '../../features/main/components/samples/StoryScreen';
import ReminderScreen from '../../features/main/components/samples/ReminderScreen';
import RitualScreen from '../../features/main/components/samples/RitualScreen';
import PhotoScreen from '../../features/main/components/samples/PhotoScreen';
import VoiceScreen from '../../features/main/components/samples/VoiceScreen';
import DocumentScreen from '../../features/main/components/samples/DocumentScreen';
import VideoScreen from '../../features/main/components/samples/VideoScreen';
import MusicScreen from '../../features/main/components/samples/MusicScreen';
import DreamScreen from '../../features/main/components/samples/DreamScreen';
import AudioCallScreen from '../../features/main/screens/AudioCallScreen';
import VideoCallScreen from '../../features/main/screens/VideoCallScreen';
import ContactDetailsScreen from '../../features/main/screens/ContactDetailsScreen';
import NotificationsScreen from '../../features/main/screens/NotificationsScreen';

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
      
      {/* Settings Screens */}
      <Stack.Screen
        name={ROUTES.ACCOUNT_SETTINGS}
        component={AccountSettingsScreen}
        options={{
          headerShown: false, // Each screen handles its own header
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PRIVACY_SETTINGS}
        component={PrivacySettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.NOTIFICATION_SETTINGS}
        component={NotificationSettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.SECURITY_SETTINGS}
        component={SecuritySettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.APP_PREFERENCES}
        component={AppPreferencesScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.HELP_SUPPORT}
        component={HelpSupportScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.ABOUT}
        component={AboutScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.MEDIA}
        component={MediaScreen}
        options={{
          title: 'Media',
        }}
      />
      
      {/* Sample Screens */}
      <Stack.Screen
        name="WisdomSample"
        component={WisdomScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="RecipeSample"
        component={RecipeScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="StorySample"
        component={StoryScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="ReminderSample"
        component={ReminderScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="RitualSample"
        component={RitualScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="PhotoSample"
        component={PhotoScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="VoiceSample"
        component={VoiceScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="DocumentSample"
        component={DocumentScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="VideoSample"
        component={VideoScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="MusicSample"
        component={MusicScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="DreamSample"
        component={DreamScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="AudioCall"
        component={AudioCallScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      
      <Stack.Screen
        name="VideoCall"
        component={VideoCallScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
