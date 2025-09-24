/**
 * Onboarding Stack Navigator
 * 
 * Handles all onboarding-related screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList, ROUTES } from './types';

// Import screens (we'll create these later)
import ProfileSetupWelcomeScreen from '../../features/onboarding/screens/ProfileSetupWelcomeScreen';
import BasicProfileInfoScreen from '../../features/onboarding/screens/BasicProfileInfoScreen';
import ContactInformationScreen from '../../features/onboarding/screens/ContactInformationScreen';
import LocationPreferencesScreen from '../../features/onboarding/screens/LocationPreferencesScreen';
import TwoFactorSetupScreen from '../../features/onboarding/screens/TwoFactorSetupScreen';
import NotificationPreferencesScreen from '../../features/onboarding/screens/NotificationPreferencesScreen';
import PrivacySettingsScreen from '../../features/onboarding/screens/PrivacySettingsScreen';
import ThemeDisplayPreferencesScreen from '../../features/onboarding/screens/ThemeDisplayPreferencesScreen';
import MediaDataPreferencesScreen from '../../features/onboarding/screens/MediaDataPreferencesScreen';
import TermsConditionsScreen from '../../features/onboarding/screens/TermsConditionsScreen';
import OnboardingCompleteScreen from '../../features/onboarding/screens/OnboardingCompleteScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.PROFILE_SETUP_WELCOME}
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen
        name={ROUTES.PROFILE_SETUP_WELCOME}
        component={ProfileSetupWelcomeScreen}
        options={{
          title: 'Set Up Your Profile',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.BASIC_PROFILE_INFO}
        component={BasicProfileInfoScreen}
        options={{
          title: 'Basic Information',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.CONTACT_INFORMATION}
        component={ContactInformationScreen}
        options={{
          title: 'Contact Information',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.LOCATION_PREFERENCES}
        component={LocationPreferencesScreen}
        options={{
          title: 'Location & Preferences',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.TWO_FACTOR_SETUP}
        component={TwoFactorSetupScreen}
        options={{
          title: 'Secure Your Account',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.NOTIFICATION_PREFERENCES}
        component={NotificationPreferencesScreen}
        options={{
          title: 'Notification Preferences',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PRIVACY_SETTINGS}
        component={PrivacySettingsScreen}
        options={{
          title: 'Privacy Settings',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.THEME_DISPLAY_PREFERENCES}
        component={ThemeDisplayPreferencesScreen}
        options={{
          title: 'Theme & Display',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.MEDIA_DATA_PREFERENCES}
        component={MediaDataPreferencesScreen}
        options={{
          title: 'Media & Data',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.TERMS_CONDITIONS}
        component={TermsConditionsScreen}
        options={{
          title: 'Terms & Conditions',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.ONBOARDING_COMPLETE}
        component={OnboardingCompleteScreen}
        options={{
          title: 'Welcome to LegacyKeep!',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
