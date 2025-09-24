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
import { GradientBackground, GlassmorphismContainer, GradientButton } from '../../../shared/components/ui';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing, gradients, LAYOUT } from '../../../shared/constants';
import { componentColors, brandColors } from '../../../shared/constants/designSystem';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { getResponsiveLayout, getResponsiveComponentSizes, getResponsiveDimensions, getDeviceSize, DEVICE_SIZES } from '../../../shared/utils/responsive';
import { responsiveStyles } from '../../../shared/constants/responsiveStyles';

type Props = AuthStackScreenProps<typeof ROUTES.WELCOME>;

const WelcomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  
  // Get responsive utilities
  const deviceSize = getDeviceSize();
  const dimensions = getResponsiveDimensions();
  const isLargeScreen = deviceSize === DEVICE_SIZES.LARGE || deviceSize === DEVICE_SIZES.XLARGE;

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

          {/* Feature Highlights */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Ionicons name="people" size={24} color={colors.neutral[50]} />
              </View>
              <Text style={styles.featureText}>Connect</Text>
            </View>
            <View style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark" size={24} color={colors.neutral[50]} />
              </View>
              <Text style={styles.featureText}>Preserve</Text>
            </View>
            <View style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Ionicons name="compass" size={24} color={colors.neutral[50]} />
              </View>
              <Text style={styles.featureText}>Discover</Text>
            </View>
          </View>

          {/* Call to Action */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>{t('auth.welcome.getStartedButton')}</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.secondary.teal[600]} style={styles.buttonIcon} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7} style={styles.signInButton}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <Text style={styles.signInLink}>Sign in</Text>
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
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  
  // Hero Section
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: typography.sizes['5xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.xl,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: typography.weights.medium,
    maxWidth: 300,
  },
  
  // Features Container
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  featureRow: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[50],
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
  
  // Call to Action
  ctaContainer: {
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.neutral[50],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: LAYOUT.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    marginBottom: spacing.lg,
    minWidth: 200,
  },
  primaryButtonText: {
    color: colors.secondary.teal[600],
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginRight: spacing.sm,
  },
  buttonIcon: {
    marginLeft: spacing.xs,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.sizes.md,
  },
  signInLink: {
    color: componentColors.link.primary,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
});

export default WelcomeScreen;
