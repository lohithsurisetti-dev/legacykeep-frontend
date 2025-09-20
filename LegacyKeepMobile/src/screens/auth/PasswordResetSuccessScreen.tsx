/**
 * Password Reset Success Screen
 * 
 * Displays success message after password reset completion
 * and provides navigation back to login
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { GradientButton } from '../../components/ui';

type Props = AuthStackScreenProps<typeof ROUTES.PASSWORD_RESET_SUCCESS>;

const PasswordResetSuccessScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();

  const handleBackToLogin = () => {
    (navigation as any).navigate(ROUTES.LOGIN);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Main Content - Centered */}
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <Ionicons
              name="checkmark-circle"
              size={96}
              color={colors.secondary.teal[500]}
            />
          </View>

          {/* Success Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.title}>
              {t('auth.passwordResetSuccess.title')}
            </Text>
            <Text style={styles.subtitle}>
              {t('auth.passwordResetSuccess.subtitle')}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <GradientButton
            title={t('auth.passwordResetSuccess.backToLoginButton')}
            onPress={handleBackToLogin}
            gradient="horizontal"
            style={styles.backToLoginButton}
          />
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
  iconContainer: {
    marginBottom: spacing.xl,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: 'transparent',
  },
  backToLoginButton: {
    width: '100%',
  },
});

export default PasswordResetSuccessScreen;
