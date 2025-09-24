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
import { getResponsiveLayout, getResponsiveComponentSizes } from '../../utils/responsive';
import { responsiveStyles } from '../../styles/responsiveStyles';

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
        
        <View style={[styles.content, responsiveStyles.centeredContent]}>
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
                  <Ionicons name="people" size={20} color={colors.neutral[50]} />
                </View>
                <Text style={styles.featureTitle}>{t('auth.welcome.features.connect.title')}</Text>
                <Text style={styles.featureDescription}>{t('auth.welcome.features.connect.description')}</Text>
              </View>

              {/* Preserve Feature */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="shield-checkmark" size={20} color={colors.neutral[50]} />
                </View>
                <Text style={styles.featureTitle}>{t('auth.welcome.features.preserve.title')}</Text>
                <Text style={styles.featureDescription}>{t('auth.welcome.features.preserve.description')}</Text>
              </View>

              {/* Discover Feature */}
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="compass" size={20} color={colors.neutral[50]} />
                </View>
                <Text style={styles.featureTitle}>{t('auth.welcome.features.discover.title')}</Text>
                <Text style={styles.featureDescription}>{t('auth.welcome.features.discover.description')}</Text>
              </View>
            </View>
          </GlassmorphismContainer>

          {/* Footer with Primary Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>{t('auth.welcome.getStartedButton')}</Text>
            </TouchableOpacity>
            
            {/* Sign In Link */}
            <View style={styles.footerTextContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
                <Text style={styles.signInLinkText}>Sign in</Text>
              </TouchableOpacity>
            </View>
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
    minHeight: '100%', // Ensure full height
  },
  // Hero Section
  hero: {
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: 0,
  },
  logo: {
    fontSize: typography.sizes['5xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: componentColors.glassmorphism.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  // Main Feature Card
  mainCard: {
    marginVertical: spacing.md, // Reduced from lg
    padding: spacing.lg, // Reduced from xl
    shadowColor: colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    maxWidth: 320, // Limit maximum width
    alignSelf: 'center', // Center the card
  },
  featuresGrid: {
    alignItems: 'center',
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: spacing.lg, // Reduced from xl
    maxWidth: 260, // Reduced from 280
  },
  featureIconContainer: {
    width: 48, // Reduced from 56
    height: 48, // Reduced from 56
    borderRadius: 24, // Reduced from 28
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
    fontSize: typography.sizes.md, // Reduced from lg
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    marginBottom: spacing.xs, // Reduced from sm
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: typography.sizes.xs, // Reduced from sm
    color: componentColors.glassmorphism.text,
    textAlign: 'center',
    lineHeight: 16, // Reduced from 20
    opacity: 0.8,
  },
  footerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    color: colors.neutral[50],
    fontSize: typography.sizes.md,
  },
  
  // Footer
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.neutral[50],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
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
  signInLinkText: {
    color: componentColors.link.primary,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
});

export default WelcomeScreen;
