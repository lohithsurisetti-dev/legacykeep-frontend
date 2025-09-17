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
import { componentColors, brandColors } from '../../constants/designSystem';
import { authTexts } from '../../constants/texts';

type Props = AuthStackScreenProps<typeof ROUTES.WELCOME>;

const WelcomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    (navigation as any).navigate(ROUTES.REGISTRATION);
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
          <Text style={styles.logo}>{authTexts.welcome.title}</Text>
          <Text style={styles.tagline}>
            {authTexts.welcome.description}
          </Text>
        </View>

        {/* Premium Features */}
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>{authTexts.welcome.features.title}</Text>
          
          {/* Feature Card 1 */}
          <GlassmorphismContainer style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>🌳</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{authTexts.welcome.features.familyTree.title}</Text>
              <Text style={styles.featureDescription}>{authTexts.welcome.features.familyTree.description}</Text>
            </View>
          </GlassmorphismContainer>

          {/* Feature Card 2 */}
          <GlassmorphismContainer style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>📖</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{authTexts.welcome.features.shareStories.title}</Text>
              <Text style={styles.featureDescription}>{authTexts.welcome.features.shareStories.description}</Text>
            </View>
          </GlassmorphismContainer>

          {/* Feature Card 3 */}
          <GlassmorphismContainer style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>💎</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{authTexts.welcome.features.preserveMemories.title}</Text>
              <Text style={styles.featureDescription}>{authTexts.welcome.features.preserveMemories.description}</Text>
            </View>
          </GlassmorphismContainer>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{authTexts.welcome.getStartedButton}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>{authTexts.welcome.signInButton}</Text>
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
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  featuresTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    textAlign: 'center',
    marginBottom: spacing.md,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  featureCard: {
    width: '100%',
    marginBottom: spacing.sm,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIcon: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: typography.sizes.xs,
    color: componentColors.glassmorphism.text,
    lineHeight: 16,
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
