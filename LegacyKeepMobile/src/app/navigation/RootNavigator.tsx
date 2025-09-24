/**
 * Root Navigator
 * 
 * Main navigation component that handles the overall app flow
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, ROUTES } from './types';

// Import stack navigators
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import OnboardingStack from './OnboardingStack';

// Import auth context (we'll create this next)
import { useAuth } from '../providers/AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated, isOnboardingComplete, isLoading } = useAuth();

  // Show loading screen while checking auth status
  if (isLoading) {
    // We'll create a loading screen later
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Disable swipe back on root level
        }}
      >
        {!isAuthenticated ? (
          // User is not authenticated - show auth flow
          <Stack.Screen
            name={ROUTES.AUTH}
            component={AuthStack}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />
        ) : !isOnboardingComplete ? (
          // User is authenticated but onboarding is not complete
          <Stack.Screen
            name={ROUTES.ONBOARDING}
            component={OnboardingStack}
            options={{
              animationTypeForReplace: 'push',
            }}
          />
        ) : (
          // User is authenticated and onboarding is complete - show main app
          <Stack.Screen
            name={ROUTES.MAIN}
            component={MainStack}
            options={{
              animationTypeForReplace: 'push',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
