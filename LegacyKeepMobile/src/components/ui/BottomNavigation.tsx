/**
 * Bottom Navigation Component
 * 
 * Tab navigation for the main app with 4 tabs
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, gradients } from '../../constants';

interface TabItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon?: keyof typeof Ionicons.glyphMap;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const tabs: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    id: 'family',
    label: 'Family',
    icon: 'heart-outline',
    activeIcon: 'heart',
  },
  {
    id: 'stories',
    label: 'Stories',
    icon: 'bookmark-outline',
    activeIcon: 'bookmark',
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: 'chatbubbles-outline',
    activeIcon: 'chatbubbles',
  },
];

// Natural gradient flow across tabs
const getTabColor = (tabIndex: number, isActive: boolean) => {
  if (!isActive) return colors.neutral[400];
  
  // Create natural gradient flow: teal → teal-purple → purple-teal → purple
  const gradientColors = [
    gradients.peacock[0],           // Home: Pure teal
    '#3B9B9F',                      // Family: Teal-purple blend  
    '#7B7BC8',                      // Stories: Purple-teal blend
    gradients.peacock[1],           // Chat: Pure purple
  ];
  
  return gradientColors[tabIndex] || colors.secondary.teal[500];
};

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const iconName = isActive && tab.activeIcon ? tab.activeIcon : tab.icon;
          const tabColor = getTabColor(index, isActive);
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName}
                size={28}
                color={tabColor}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: tabColor }
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing.sm,
    paddingBottom: spacing.md, // More generous bottom padding
    paddingHorizontal: spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs, // Better vertical padding
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    marginTop: spacing.xs,
  },
});

export default BottomNavigation;
