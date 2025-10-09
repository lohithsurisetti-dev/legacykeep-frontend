import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography, spacing } from '../../constants';
import { useTheme } from '../../../app/providers/ThemeContext';

interface HomeHeaderProps {
  onProfilePress?: () => void;
  onNotificationsPress?: () => void;
  scrollY?: Animated.Value;
  userInitials?: string;
  title?: string;
  unreadCount?: number;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  onProfilePress, 
  onNotificationsPress,
  scrollY, 
  title = 'LegacyKeep',
  unreadCount = 0 
}) => {
  const { colors } = useTheme();
  
  const headerHeight = scrollY?.interpolate({
    inputRange: [0, 80],
    outputRange: [36, 16],
    extrapolate: 'clamp',
  }) || 36;

  const contentOpacity = scrollY?.interpolate({
    inputRange: [0, 40, 80],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  }) || 1;

  return (
    <Animated.View style={[styles.container, { height: headerHeight }]}>
      <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationsPress}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onProfilePress}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={20} color={colors.text} />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: '#1F2937',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.xs,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: typography.weights.bold,
  },
});

export default HomeHeader;
