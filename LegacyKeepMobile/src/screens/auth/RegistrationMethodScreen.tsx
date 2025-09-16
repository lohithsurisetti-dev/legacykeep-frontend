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

type Props = AuthStackScreenProps<typeof ROUTES.REGISTRATION_METHOD>;

const RegistrationMethodScreen: React.FC<Props> = () => {
  const navigation = useNavigation();

  const handleEmailRegistration = () => {
    (navigation as any).navigate(ROUTES.EMAIL_REGISTRATION);
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral[50]} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Choose how you'd like to sign up</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleEmailRegistration}
            activeOpacity={0.8}
          >
            <Text style={styles.optionIcon}>📧</Text>
            <Text style={styles.optionText}>Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={handlePhoneRegistration}
            activeOpacity={0.8}
          >
            <Text style={styles.optionIcon}>📱</Text>
            <Text style={styles.optionText}>Continue with Phone</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleSocialLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.optionIcon}>🔗</Text>
            <Text style={styles.optionText}>Continue with Social</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signInLink}
          onPress={handleSignIn}
          activeOpacity={0.8}
        >
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLinkText}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  options: {
    marginBottom: spacing.xxl,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  optionText: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[700],
    fontWeight: typography.weights.medium,
  },
  signInLink: {
    alignItems: 'center',
  },
  signInText: {
    fontSize: typography.sizes.md,
    color: colors.neutral[600],
  },
  signInLinkText: {
    color: colors.primary[600],
    fontWeight: typography.weights.semibold,
  },
});

export default RegistrationMethodScreen;
