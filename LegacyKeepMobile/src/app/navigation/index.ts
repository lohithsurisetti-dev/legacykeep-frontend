/**
 * Navigation Export
 * 
 * Centralized export of all navigation components
 */

export { default as RootNavigator } from './RootNavigator';
export { default as AuthStack } from './AuthStack';
export { default as MainStack } from './MainStack';
export { default as OnboardingStack } from './OnboardingStack';

// Export types
export type {
  RootStackParamList,
  AuthStackParamList,
  OnboardingStackParamList,
  MainStackParamList,
  RootStackScreenProps,
  AuthStackScreenProps,
  OnboardingStackScreenProps,
  MainStackScreenProps,
  NavigationState,
} from './types';

// Export route constants
export { ROUTES } from './types';
