/**
 * Authentication Stack Navigator
 * 
 * Handles all authentication-related screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList, ROUTES } from './types';

// Import screens (we'll create these one by one)
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import EmailPhoneScreen from '../screens/auth/EmailPhoneScreen';
import RegistrationMethodScreen from '../screens/auth/RegistrationMethodScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import PersonalDetailsScreen from '../screens/auth/PersonalDetailsScreen';
import LocationScreen from '../screens/auth/LocationScreen';
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen';
import PhoneRegistrationScreen from '../screens/auth/PhoneRegistrationScreen';
import RegistrationSuccessScreen from '../screens/auth/RegistrationSuccessScreen';
import SocialLoginScreen from '../screens/auth/SocialLoginScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import PasswordResetScreen from '../screens/auth/PasswordResetScreen';
import PasswordResetSuccessScreen from '../screens/auth/PasswordResetSuccessScreen';
import EmailVerificationScreen from '../screens/auth/EmailVerificationScreen';
import PhoneVerificationScreen from '../screens/auth/PhoneVerificationScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.WELCOME}
      screenOptions={{
        headerShown: false, // We'll handle headers in individual screens
        gestureEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen
        name={ROUTES.WELCOME}
        component={WelcomeScreen}
        options={{
          title: 'Welcome to LegacyKeep',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.EMAIL_PHONE}
        component={EmailPhoneScreen}
        options={{
          title: 'Enter Email or Phone',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.REGISTRATION_METHOD}
        component={RegistrationMethodScreen}
        options={{
          title: 'Create Account',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.REGISTRATION}
        component={RegistrationScreen}
        options={{
          title: 'Create Account',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PERSONAL_DETAILS}
        component={PersonalDetailsScreen}
        options={{
          title: 'Personal Details',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.LOCATION}
        component={LocationScreen}
        options={{
          title: 'Location',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.OTP_VERIFICATION}
        component={OtpVerificationScreen}
        options={{
          title: 'Verify Account',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PHONE_REGISTRATION}
        component={PhoneRegistrationScreen}
        options={{
          title: 'Sign Up with Phone',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.REGISTRATION_SUCCESS}
        component={RegistrationSuccessScreen}
        options={{
          title: 'Account Created',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.SOCIAL_LOGIN}
        component={SocialLoginScreen}
        options={{
          title: 'Continue with Social',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{
          title: 'Sign In',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{
          title: 'Reset Password',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PASSWORD_RESET}
        component={PasswordResetScreen}
        options={{
          title: 'Set New Password',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PASSWORD_RESET_SUCCESS}
        component={PasswordResetSuccessScreen}
        options={{
          title: 'Password Reset Complete',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.EMAIL_VERIFICATION}
        component={EmailVerificationScreen}
        options={{
          title: 'Verify Email',
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PHONE_VERIFICATION}
        component={PhoneVerificationScreen}
        options={{
          title: 'Verify Phone',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
