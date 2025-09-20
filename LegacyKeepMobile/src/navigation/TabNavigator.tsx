/**
 * Tab Navigator
 * 
 * Bottom tab navigation for main app screens with constant footer
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, gradients } from '../constants';
import { ROUTES } from './types';

// Import screens
import HomeScreen from '../screens/main/HomeScreen';
import FamilyScreen from '../screens/main/FamilyScreen';
import StoriesScreen from '../screens/main/StoriesScreen';
import ChatScreen from '../screens/main/ChatScreen';

// Import our custom bottom navigation
import { BottomNavigation } from '../components/ui';

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