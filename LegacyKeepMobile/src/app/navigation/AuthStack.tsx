/**
 * Authentication Stack Navigator
 * 
 * Handles all authentication-related screens
 */

import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AuthStackParamList, ROUTES } from './types';

// Import screens (we'll create these one by one)
import WelcomeScreen from '../../features/auth/screens/WelcomeScreen';
import EmailPhoneScreen from '../../features/auth/screens/EmailPhoneScreen';
import RegistrationMethodScreen from '../../features/auth/screens/RegistrationMethodScreen';
import RegistrationScreen from '../../features/auth/screens/RegistrationScreen';
import PersonalDetailsScreen from '../../features/auth/screens/PersonalDetailsScreen';
import LocationScreen from '../../features/auth/screens/LocationScreen';
import OtpVerificationScreen from '../../features/auth/screens/OtpVerificationScreen';
import PhoneRegistrationScreen from '../../features/auth/screens/PhoneRegistrationScreen';
import RegistrationSuccessScreen from '../../features/auth/screens/RegistrationSuccessScreen';
import SocialLoginScreen from '../../features/auth/screens/SocialLoginScreen';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import ForgotPasswordScreen from '../../features/auth/screens/ForgotPasswordScreen';
import PasswordResetScreen from '../../features/auth/screens/PasswordResetScreen';
import PasswordResetSuccessScreen from '../../features/auth/screens/PasswordResetSuccessScreen';
import EmailVerificationScreen from '../../features/auth/screens/EmailVerificationScreen';
import PhoneVerificationScreen from '../../features/auth/screens/PhoneVerificationScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.WELCOME}
      screenOptions={{
        headerShown: false, // We'll handle headers in individual screens
        gestureEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
        ...TransitionPresets.SlideFromRightIOS,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
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
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.PERSONAL_DETAILS}
        component={PersonalDetailsScreen}
        options={{
          title: 'Personal Details',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.LOCATION}
        component={LocationScreen}
        options={{
          title: 'Location',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      
      <Stack.Screen
        name={ROUTES.OTP_VERIFICATION}
        component={OtpVerificationScreen}
        options={{
          title: 'Verify Account',
          ...TransitionPresets.SlideFromRightIOS,
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
