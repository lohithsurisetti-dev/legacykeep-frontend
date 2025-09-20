/**
 * Registration Method Screen
 * 
 * Allows users to choose how they want to register
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
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import GradientBackground from '../../components/ui/GradientBackground';
import GlassmorphismContainer from '../../components/ui/GlassmorphismContainer';
import GradientText from '../../components/ui/GradientText';

type Props = AuthStackScreenProps<typeof ROUTES.REGISTRATION_METHOD>;

const RegistrationMethodScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();

  const handleEmailRegistration = () => {
    (navigation as any).navigate(ROUTES.REGISTRATION);
  };

  const handlePhoneRegistration = () => {
    (navigation as any).navigate(ROUTES.PHONE_REGISTRATION);
  };

  const handleSocialLogin = () => {
    (navigation as any).navigate(ROUTES.SOCIAL_LOGIN);
  };

  const handleSignIn = () => {
    (navigation as any).navigate(ROUTES.LOGIN);
  };

  return (
    <GradientBackground gradient="peacock" style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <GradientText
              gradient="peacock"
              fontSize="xxl"
              fontWeight="bold"
              style={styles.title}
            >
              LegacyKeep
            </GradientText>
            <Text style={styles.subtitle}>
              {t('auth.registrationMethod.subtitle')}
            </Text>
          </View>

          {/* Registration Options */}
          <View style={styles.options}>
            <GlassmorphismContainer style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleEmailRegistration}
                activeOpacity={0.8}
              >
                <View style={styles.optionIconContainer}>
                  <Text style={styles.optionIcon}>📧</Text>
                </View>
                <Text style={styles.optionText}>
                  {t('auth.registrationMethod.emailOption')}
                </Text>
              </TouchableOpacity>
            </GlassmorphismContainer>

            <GlassmorphismContainer style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handlePhoneRegistration}
                activeOpacity={0.8}
              >
                <View style={styles.optionIconContainer}>
                  <Text style={styles.optionIcon}>📱</Text>
                </View>
                <Text style={styles.optionText}>
                  {t('auth.registrationMethod.phoneOption')}
                </Text>
              </TouchableOpacity>
            </GlassmorphismContainer>

            <GlassmorphismContainer style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleSocialLogin}
                activeOpacity={0.8}
              >
                <View style={styles.optionIconContainer}>
                  <Text style={styles.optionIcon}>🔗</Text>
                </View>
                <Text style={styles.optionText}>
                  {t('auth.registrationMethod.socialOption')}
                </Text>
              </TouchableOpacity>
            </GlassmorphismContainer>
          </View>

          {/* Sign In Link */}
          <View style={styles.footer}>
            <Text style={styles.signInText}>
              {t('auth.registrationMethod.alreadyHaveAccount')}{' '}
              <TouchableOpacity onPress={handleSignIn} activeOpacity={0.8}>
                <Text style={styles.signInLinkText}>
                  {t('auth.registrationMethod.signInLink')}
                </Text>
              </TouchableOpacity>
            </Text>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[100],
    textAlign: 'center',
    opacity: 0.9,
  },
  options: {
    marginBottom: spacing.xxl,
  },
  optionContainer: {
    marginBottom: spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionText: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[100],
    fontWeight: typography.weights.medium,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
  },
  signInText: {
    fontSize: typography.sizes.md,
    color: colors.neutral[100],
    opacity: 0.8,
  },
  signInLinkText: {
    color: colors.neutral[50],
    fontWeight: typography.weights.semibold,
    textDecorationLine: 'underline',
  },
});

export default RegistrationMethodScreen;
