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
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientBackground, GlassmorphismContainer, GradientButton } from '../../components/ui';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing, gradients } from '../../constants';
import { componentColors, brandColors } from '../../constants/designSystem';
import { useLanguage } from '../../contexts/LanguageContext';

type Props = AuthStackScreenProps<typeof ROUTES.WELCOME>;

const WelcomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();

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
          {/* Hero Section */}
          <View style={styles.hero}>
            <Text style={styles.logo}>{t('auth.welcome.title')}</Text>
            <Text style={styles.subtitle}>
              {t('auth.welcome.subtitle')}
            </Text>
          </View>

          {/* Single Premium Feature Card */}
          <GlassmorphismContainer style={styles.mainCard}>
            <View style={styles.featuresGrid}>
              {/* Connect Feature */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="people" size={24} color={colors.neutral[50]} />
                </View>
                <Text style={styles.featureTitle}>{t('auth.welcome.features.connect.title')}</Text>
                <Text style={styles.featureDescription}>{t('auth.welcome.features.connect.description')}</Text>
              </View>

              {/* Preserve Feature */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="shield-checkmark" size={24} color={colors.neutral[50]} />
                </View>
                <Text style={styles.featureTitle}>{t('auth.welcome.features.preserve.title')}</Text>
                <Text style={styles.featureDescription}>{t('auth.welcome.features.preserve.description')}</Text>
              </View>

              {/* Discover Feature */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="compass" size={24} color={colors.neutral[50]} />
                </View>
                <Text style={styles.featureTitle}>{t('auth.welcome.features.discover.title')}</Text>
                <Text style={styles.featureDescription}>{t('auth.welcome.features.discover.description')}</Text>
              </View>
            </View>
          </GlassmorphismContainer>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>{t('auth.welcome.getStartedButton')}</Text>
            </TouchableOpacity>
            
            <GlassmorphismContainer style={styles.secondaryButton}>
              <TouchableOpacity
                onPress={handleSignIn}
                activeOpacity={0.7}
                style={styles.secondaryButtonInner}
              >
                <Text style={styles.secondaryButtonText}>{t('auth.welcome.signInButton')}</Text>
              </TouchableOpacity>
            </GlassmorphismContainer>
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
  // Hero Section
  hero: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  logo: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[100],
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  // Main Feature Card
  mainCard: {
    marginVertical: spacing.lg,
    padding: spacing.xl,
    shadowColor: colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  featuresGrid: {
    alignItems: 'center',
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: spacing.xl, // More space between features
    maxWidth: 280,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs, // Close to title
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: colors.neutral[50],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  featureTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    marginBottom: spacing.sm, // Space before description
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: typography.sizes.sm,
    color: componentColors.glassmorphism.text,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
  // Action Buttons
  actions: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.neutral[50],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: colors.secondary.teal[600],
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  secondaryButton: {
    borderRadius: 16,
    shadowColor: colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  secondaryButtonInner: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.neutral[50],
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
});

export default WelcomeScreen;
