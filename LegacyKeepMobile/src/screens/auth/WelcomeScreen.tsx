/**
 * Welcome Screen
 * 
 * First screen users see - introduces the app and provides entry points
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { GradientBackground, GlassmorphismContainer } from '../../components/ui';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing } from '../../constants';
import { componentColors } from '../../constants/designSystem';

type Props = AuthStackScreenProps<typeof ROUTES.WELCOME>;

const WelcomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    (navigation as any).navigate(ROUTES.REGISTRATION_METHOD);
  };

  const handleSignIn = () => {
    (navigation as any).navigate(ROUTES.LOGIN);
  };

  return (
    <GradientBackground gradient="peacock" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        <View style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.header}>
          <Text style={styles.logo}>LegacyKeep</Text>
          <Text style={styles.tagline}>
            Preserve your family's stories and memories for generations
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📚</Text>
            <Text style={styles.featureText}>Share family stories</Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>👨‍👩‍👧‍👦</Text>
            <Text style={styles.featureText}>Connect with family</Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💬</Text>
            <Text style={styles.featureText}>Chat and collaborate</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  logo: {
    fontSize: typography.sizes['5xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    marginBottom: spacing.md,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: typography.sizes.lg,
    color: componentColors.glassmorphism.text,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  features: {
    alignItems: 'center',
    marginVertical: spacing.xxl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  featureText: {
    fontSize: typography.sizes.md,
    color: componentColors.glassmorphism.text,
    fontWeight: typography.weights.medium,
  },
  actions: {
    marginBottom: spacing.xxl,
  },
  primaryButton: {
    backgroundColor: colors.neutral[50],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: componentColors.primaryButton.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  secondaryButton: {
    backgroundColor: componentColors.glassmorphism.background,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: componentColors.glassmorphism.border,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.neutral[50],
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
});

export default WelcomeScreen;
