/**
 * Home Header Component
 * 
 * Header for the main app with LegacyKeep title and profile icon
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';

interface HomeHeaderProps {
  onProfilePress?: () => void;
  scrollY?: Animated.Value;
  userInitials?: string;
  title?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onProfilePress, scrollY, title = 'LegacyKeep' }) => {
  const { colors } = useTheme();
  // Create animated styles for scroll-to-fade
  const headerHeight = scrollY?.interpolate({
    inputRange: [0, 80],
    outputRange: [36, 16], // Much more compact: 36px to 16px
    extrapolate: 'clamp',
  }) || 36;

  const contentOpacity = scrollY?.interpolate({
    inputRange: [0, 40, 80],
    outputRange: [1, 0.3, 0], // Fade out: visible → semi-transparent → invisible
    extrapolate: 'clamp',
  }) || 1;

  const styles = createStyles(colors);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          height: headerHeight,
        }
      ]}
    >
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: contentOpacity,
          }
        ]}
      >
        {/* Dynamic Title */}
        <Text style={styles.title}>
          {title}
        </Text>
        
        {/* Profile Icon */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.profileIconContainer}>
            <Ionicons
              name="person"
              size={20}
              color={colors.text}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
    container: {
      backgroundColor: colors.headerBackground,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      // Padding is now handled by animated values
    },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.md, // Less left padding to move title left
    paddingRight: spacing.lg, // Keep more right padding for profile icon
  },
    title: {
      fontSize: typography.sizes['2xl'], // Larger title for better prominence
      fontWeight: typography.weights.bold,
      color: colors.text,
    },
  profileButton: {
    padding: spacing.xs,
  },
    profileIconContainer: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      // No border, clean minimal look
    },
});

export default HomeHeader;
