/**
 * Family Screen
 * 
 * Placeholder screen for family-related content and management
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../../shared/constants';
import { HomeHeader, LanguageSelector, ThemeSelector } from '../../../shared/components/ui';
import { useAuth } from '../../../app/providers/AuthContext';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { useTheme } from '../../../app/providers/ThemeContext';

const FamilyScreen: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { colors } = useTheme();

  const handleProfilePress = () => {
    // TODO: Navigate to profile screen
    console.log('Profile pressed');
  };

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : 'LS';

  const styles = createStyles(colors);

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
            <Ionicons name="heart" size={64} color={colors.primary} />
            <Text style={styles.title}>{t('navigation.family')}</Text>
            <Text style={styles.subtitle}>
              Manage your family circle, relationships, and connections
            </Text>
            <Text style={styles.comingSoon}>Coming Soon</Text>
            
            {/* Demo Section */}
            <View style={styles.demoSection}>
              <Text style={[styles.demoTitle, { color: colors.textSecondary }]}>Language & Theme Demo:</Text>
              <LanguageSelector style={styles.languageSelector} />
              <ThemeSelector style={[styles.themeSelector, { marginTop: spacing.md }]} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  comingSoon: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  demoSection: {
    marginTop: spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  demoTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.md,
  },
  languageSelector: {
    width: 200,
  },
  themeSelector: {
    width: 200,
  },
});

export default FamilyScreen;