/**
 * Chat Screen
 * 
 * Placeholder screen for family chat and messaging
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../constants';
import { HomeHeader } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

const ChatScreen: React.FC = () => {
  const { user } = useAuth();

  const handleProfilePress = () => {
    // TODO: Navigate to profile screen
    console.log('Profile pressed');
  };

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : 'LS';

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <HomeHeader 
          onProfilePress={handleProfilePress} 
          userInitials={userInitials}
        />
        
        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.placeholderContainer}>
            <Ionicons name="chatbubbles" size={64} color={colors.secondary.teal[400]} />
            <Text style={styles.title}>Chat</Text>
            <Text style={styles.subtitle}>
              Connect and communicate with your family members in real-time
            </Text>
            <Text style={styles.comingSoon}>Coming Soon</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  placeholderContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  comingSoon: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.secondary.teal[600],
    backgroundColor: colors.secondary.teal[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.secondary.teal[200],
  },
});

export default ChatScreen;