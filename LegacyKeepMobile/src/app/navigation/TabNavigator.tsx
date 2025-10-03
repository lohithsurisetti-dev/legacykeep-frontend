/**
 * Tab Navigator
 * 
 * Bottom tab navigation for main app screens with constant footer
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, gradients } from '../../shared/constants';
import { ROUTES } from './types';

// Import screens
import HomeScreen from '../../features/main/screens/HomeScreen';
import FamilyScreen from '../../features/main/screens/FamilyScreen';
import CreateScreen from '../../features/main/screens/CreateScreen';
import ChatStackNavigator from '../../features/main/navigation/ChatStackNavigator';

// Import our custom bottom navigation
import { BottomNavigation } from '../../shared/components/ui';

const Tab = createBottomTabNavigator();

// Custom tab bar component that uses our styled BottomNavigation
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const handleTabPress = (tabId: string) => {
    // Map tab IDs to route names
    const routeMap: { [key: string]: string } = {
      'home': 'Home',
      'family': 'Family', 
      'stories': 'Stories', // Keep the route name as 'Stories' for consistency
      'chat': 'Chat',
    };
    
    const routeName = routeMap[tabId];
    if (routeName) {
      navigation.navigate(routeName);
    }
  };

  // Get current active tab
  const currentRoute = state.routes[state.index];
  const activeTab = currentRoute.name.toLowerCase();

  // Hide bottom navigation when in chat conversation
  const shouldHideTabBar = currentRoute.state?.index > 0; // Hide if we're in a nested screen (like ChatConversation)

  if (shouldHideTabBar) {
    return null;
  }

  return (
    <BottomNavigation
      activeTab={activeTab}
      onTabPress={handleTabPress}
    />
  );
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false, // We use custom headers in each screen
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.FAMILY}
        component={FamilyScreen}
        options={{
          title: 'Family',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.STORIES}
        component={CreateScreen}
        options={{
          title: 'Create',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.CHAT}
        component={ChatStackNavigator}
        options={{
          title: 'Chat',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;