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
import StoriesScreen from '../../features/main/screens/StoriesScreen';
import ChatScreen from '../../features/main/screens/ChatScreen';

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
      'stories': 'Stories',
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
        component={StoriesScreen}
        options={{
          title: 'Stories',
        }}
      />
      
      <Tab.Screen
        name={ROUTES.CHAT}
        component={ChatScreen}
        options={{
          title: 'Chat',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;