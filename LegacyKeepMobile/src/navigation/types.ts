/**
 * Navigation Types for LegacyKeep Mobile
 * 
 * Defines all navigation routes and their parameters
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// =============================================================================
// Root Navigation Types
// =============================================================================

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

// =============================================================================
// Auth Stack Types
// =============================================================================

export type AuthStackParamList = {
  Welcome: undefined;
  RegistrationMethod: undefined;
  Registration: undefined;
  PersonalDetails: undefined;
  Location: undefined;
  OtpVerification: undefined;
  PhoneRegistration: undefined;
  RegistrationSuccess: undefined;
  SocialLogin: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  PasswordReset: undefined;
  EmailVerification: {
    email: string;
    userId: string;
  };
  PhoneVerification: {
    phoneNumber: string;
    userId: string;
  };
};

// =============================================================================
// Onboarding Stack Types
// =============================================================================

export type OnboardingStackParamList = {
  ProfileSetupWelcome: undefined;
  BasicProfileInfo: undefined;
  ContactInformation: undefined;
  LocationPreferences: undefined;
  TwoFactorSetup: undefined;
  NotificationPreferences: undefined;
  PrivacySettings: undefined;
  ThemeDisplayPreferences: undefined;
  MediaDataPreferences: undefined;
  TermsConditions: undefined;
  OnboardingComplete: undefined;
};

// =============================================================================
// Main App Stack Types
// =============================================================================

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Chat: undefined;
  Family: undefined;
  Stories: undefined;
  Media: undefined;
};

// =============================================================================
// Screen Props Types
// =============================================================================

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = 
  StackScreenProps<AuthStackParamList, T>;

export type OnboardingStackScreenProps<T extends keyof OnboardingStackParamList> = 
  StackScreenProps<OnboardingStackParamList, T>;

export type MainStackScreenProps<T extends keyof MainStackParamList> = 
  StackScreenProps<MainStackParamList, T>;

// =============================================================================
// Navigation State Types
// =============================================================================

export type NavigationState = {
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  currentUser: {
    id: string;
    email: string;
    username: string;
    isEmailVerified: boolean;
  } | null;
};

// =============================================================================
// Route Names Constants
// =============================================================================

export const ROUTES = {
  // Root Routes
  AUTH: 'Auth',
  MAIN: 'Main',
  ONBOARDING: 'Onboarding',
  
  // Auth Routes
  WELCOME: 'Welcome',
  REGISTRATION_METHOD: 'RegistrationMethod',
  REGISTRATION: 'Registration',
  PERSONAL_DETAILS: 'PersonalDetails',
  LOCATION: 'Location',
  OTP_VERIFICATION: 'OtpVerification',
  PHONE_REGISTRATION: 'PhoneRegistration',
  REGISTRATION_SUCCESS: 'RegistrationSuccess',
  SOCIAL_LOGIN: 'SocialLogin',
  LOGIN: 'Login',
  FORGOT_PASSWORD: 'ForgotPassword',
  PASSWORD_RESET: 'PasswordReset',
  EMAIL_VERIFICATION: 'EmailVerification',
  PHONE_VERIFICATION: 'PhoneVerification',
  
  // Onboarding Routes
  PROFILE_SETUP_WELCOME: 'ProfileSetupWelcome',
  BASIC_PROFILE_INFO: 'BasicProfileInfo',
  CONTACT_INFORMATION: 'ContactInformation',
  LOCATION_PREFERENCES: 'LocationPreferences',
  TWO_FACTOR_SETUP: 'TwoFactorSetup',
  NOTIFICATION_PREFERENCES: 'NotificationPreferences',
  PRIVACY_SETTINGS: 'PrivacySettings',
  THEME_DISPLAY_PREFERENCES: 'ThemeDisplayPreferences',
  MEDIA_DATA_PREFERENCES: 'MediaDataPreferences',
  TERMS_CONDITIONS: 'TermsConditions',
  ONBOARDING_COMPLETE: 'OnboardingComplete',
  
  // Main App Routes
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  CHAT: 'Chat',
  FAMILY: 'Family',
  STORIES: 'Stories',
  MEDIA: 'Media',
} as const;
