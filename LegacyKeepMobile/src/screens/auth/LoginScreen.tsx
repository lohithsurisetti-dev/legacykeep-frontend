/**
 * Login Screen
 * 
 * Handles user authentication with email/username and password
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { GradientBackground, GlassmorphismContainer, LoginButton } from '../../components/ui';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { useAuth } from '../../contexts/AuthContext';
import { colors, typography, spacing } from '../../constants';
import { componentColors } from '../../constants/designSystem';
import { authTexts } from '../../constants/texts';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import { validateEmailOrUsername, validatePassword } from '../../utils/validation';

type Props = AuthStackScreenProps<typeof ROUTES.LOGIN>;

interface LoginFormData {
  emailOrUsername: string;
  password: string;
}

interface LoginFormErrors {
  emailOrUsername?: string;
  password?: string;
  general?: string;
}

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrUsername: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form on every change
  const validateForm = (data: LoginFormData) => {
    const newErrors: LoginFormErrors = {};
    
    // Validate email/username
    const emailOrUsernameValidation = validateEmailOrUsername(data.emailOrUsername);
    if (!emailOrUsernameValidation.isValid) {
      newErrors.emailOrUsername = emailOrUsernameValidation.error;
    }
    
    // Validate password
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }
    
    setErrors(newErrors);
    
    // Check if form is valid
    const isValid = Object.keys(newErrors).length === 0 && 
                   data.emailOrUsername.trim() !== '' && 
                   data.password.trim() !== '';
    setIsFormValid(isValid);
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    validateForm(newData);
  };

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert('Invalid Form', authTexts.validation.generalError);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(formData.emailOrUsername, formData.password);
      // Navigation will be handled by the auth context
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: error instanceof Error ? error.message : authTexts.validation.loginFailed,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    (navigation as any).navigate(ROUTES.FORGOT_PASSWORD);
  };

  const handleSignUp = () => {
    (navigation as any).navigate(ROUTES.REGISTRATION);
  };

  return (
    <GradientBackground gradient="peacock" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>{authTexts.login.title}</Text>
                <Text style={styles.subtitle}>{authTexts.login.subtitle}</Text>
              </View>

          {/* Form Container with Glassmorphism */}
          <GlassmorphismContainer style={styles.formContainer}>
            {/* General Error */}
            {errors.general && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.general}</Text>
              </View>
            )}

            {/* Email/Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{authTexts.login.emailLabel}</Text>
              <TextInput
                style={styles.input}
                placeholder={authTexts.login.emailPlaceholder}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={formData.emailOrUsername}
                onChangeText={(value) => handleInputChange('emailOrUsername', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.emailOrUsername && (
                <Text style={styles.inputError}>{errors.emailOrUsername}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{authTexts.login.passwordLabel}</Text>
              <TextInput
                style={styles.input}
                placeholder={authTexts.login.passwordPlaceholder}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.inputError}>{errors.password}</Text>
              )}
            </View>

                {/* Login Button */}
                <LoginButton
                  title={authTexts.login.loginButton}
                  onPress={handleLogin}
                  disabled={!isFormValid || isLoading}
                  style={styles.loginButton}
                />

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>{authTexts.login.forgotPassword}</Text>
            </TouchableOpacity>
          </GlassmorphismContainer>

          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{authTexts.login.socialLoginDivider}</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  // TODO: Implement Google login
                  Alert.alert(authTexts.social.comingSoon, authTexts.social.googleComingSoon);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.socialButtonIcon}>G</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  // TODO: Implement Facebook login
                  Alert.alert(authTexts.social.comingSoon, authTexts.social.facebookComingSoon);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.socialButtonIcon}>f</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  // TODO: Implement Instagram login
                  Alert.alert(authTexts.social.comingSoon, authTexts.social.instagramComingSoon);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.socialButtonIcon}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerTextContainer}>
              <Text style={styles.footerText}>{authTexts.login.noAccount} </Text>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                <Text style={styles.signUpLink}>{authTexts.login.signUpLink}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  title: {
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
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral[50],
    marginBottom: spacing.sm,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: componentColors.glassmorphism.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.neutral[50],
    backgroundColor: componentColors.glassmorphism.background,
  },
  inputError: {
    fontSize: typography.sizes.xs,
    color: componentColors.link.primary,
    marginTop: spacing.xs,
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderColor: 'rgba(244, 67, 54, 0.5)',
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  errorText: {
    color: componentColors.link.primary,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: componentColors.glassmorphism.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  socialSection: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: componentColors.glassmorphism.text,
    fontSize: typography.sizes.sm,
    marginHorizontal: spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  socialButton: {
    width: 48,
    height: 48,
    backgroundColor: componentColors.socialButton.background,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: componentColors.socialButton.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  socialButtonIcon: {
    fontSize: 20,
    color: colors.neutral[50],
    fontWeight: typography.weights.bold,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  footerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.neutral[50],
    fontSize: typography.sizes.md,
  },
  signUpLink: {
    color: componentColors.link.primary,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
});

export default LoginScreen;
