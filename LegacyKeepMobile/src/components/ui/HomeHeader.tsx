/**
 * Home Header Component
 * 
 * Header for the main app with LegacyKeep title and profile icon
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../constants';

interface HomeHeaderProps {
  onProfilePress?: () => void;
  scrollY?: Animated.Value;
  userInitials?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onProfilePress, scrollY }) => {
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
        {/* LegacyKeep Title */}
        <Text style={styles.title}>
          LegacyKeep
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
              color={colors.neutral[900]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral[50],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    // Padding is now handled by animated values
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.sizes['2xl'], // Larger title for better prominence
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
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
