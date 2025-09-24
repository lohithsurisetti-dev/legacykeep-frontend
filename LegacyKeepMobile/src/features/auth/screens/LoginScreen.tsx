/**
 * Login Screen
 * 
 * Handles user authentication with email/username and password
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground, GlassmorphismContainer, LoginButton } from '../../../shared/components/ui';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { useAuth } from '../../../app/providers/AuthContext';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { colors, typography, spacing } from '../../../shared/constants';
import { componentColors } from '../../../shared/constants/designSystem';
import Input from '../../../shared/components/forms/Input';
import Button from '../../../shared/components/forms/Button';
import { validateEmailOrUsername, validatePassword } from '../../../shared/utils/validation';

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
  const { login, completeVerification } = useAuth();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrUsername: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof LoginFormData>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Validate form - only show errors for touched fields or when validating all
  const validateForm = (data: LoginFormData, validateAll: boolean = false): boolean => {
    const newErrors: LoginFormErrors = {};
    
    // Validate email/username (only if touched or validateAll)
    if (validateAll || touchedFields.has('emailOrUsername')) {
      const emailOrUsernameValidation = validateEmailOrUsername(data.emailOrUsername);
      if (!emailOrUsernameValidation.isValid) {
        newErrors.emailOrUsername = emailOrUsernameValidation.error;
      }
    }
    
    // Validate password (only if touched or validateAll)
    if (validateAll || touchedFields.has('password')) {
      const passwordValidation = validatePassword(data.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.error;
      }
    }
    
    setErrors(newErrors);
    
    // Check if form is valid
    const isValid = Object.keys(newErrors).length === 0 && 
                   data.emailOrUsername.trim() !== '' && 
                   data.password.trim() !== '';
    setIsFormValid(isValid);
    
    return isValid;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    // Don't validate on input change - only validate on login button press
    // Clear any existing errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async () => {
    // Mark all fields as touched and validate
    setTouchedFields(new Set(['emailOrUsername', 'password']));
    
    const isValid = validateForm(formData, true);
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Add a small delay to demonstrate the spinner
      await new Promise(resolve => setTimeout(resolve, 1500));
      await login(formData.emailOrUsername, formData.password);
      
      // Navigation will be handled automatically by AuthContext
      console.log('Login successful, AuthContext will handle navigation');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: error instanceof Error ? error.message : t('auth.validation.loginFailed'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Check if email/phone is entered
    if (!formData.emailOrUsername.trim()) {
      // Mark only email field as touched and validate only that field
      setTouchedFields(prev => new Set([...prev, 'emailOrUsername' as keyof LoginFormData]));
      
      // Validate only the email/username field
      const emailOrUsernameValidation = validateEmailOrUsername(formData.emailOrUsername);
      setErrors(prev => ({
        ...prev,
        emailOrUsername: emailOrUsernameValidation.error,
        password: undefined // Clear password error
      }));
      return;
    }

    // Validate the email/phone format
    const emailOrUsernameValidation = validateEmailOrUsername(formData.emailOrUsername);
    if (!emailOrUsernameValidation.isValid) {
      // Mark only email field as touched and show only email error
      setTouchedFields(prev => new Set([...prev, 'emailOrUsername' as keyof LoginFormData]));
      setErrors(prev => ({
        ...prev,
        emailOrUsername: emailOrUsernameValidation.error,
        password: undefined // Clear password error
      }));
      return;
    }

    // Navigate to OTP verification with password reset context
    (navigation as any).navigate(ROUTES.OTP_VERIFICATION, {
      purpose: 'password-reset',
      emailOrPhone: formData.emailOrUsername,
    });
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              keyboardVisible && styles.scrollContentKeyboard
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>LegacyKeep</Text>
              <Text style={styles.subtitle}>{t('auth.login.subtitle')}</Text>
            </View>

            {/* Form Container with Glassmorphism - Centered */}
            <View style={styles.formWrapper}>
              <GlassmorphismContainer style={styles.formContainer}>
                {/* General Error */}
                {errors.general && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errors.general}</Text>
                  </View>
                )}

                {/* Email/Phone/Username Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.floatingLabelContainer}>
                    <Text 
                      style={[
                        styles.floatingLabel,
                        formData.emailOrUsername ? styles.floatingLabelActive : styles.floatingLabelInactive
                      ]}
                      pointerEvents="none"
                    >
                      {t('auth.login.credentialsLabel')}
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder=""
                      placeholderTextColor="rgba(255, 255, 255, 0.7)"
                      value={formData.emailOrUsername}
                      onChangeText={(value) => handleInputChange('emailOrUsername', value)}
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="email"
                      pointerEvents="auto"
                      editable={true}
                    />
                  </View>
                  {errors.emailOrUsername && (
                    <Text style={styles.inputError}>{errors.emailOrUsername}</Text>
                  )}
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.floatingLabelContainer}>
                    <Text 
                      style={[
                        styles.floatingLabel,
                        formData.password ? styles.floatingLabelActive : styles.floatingLabelInactive
                      ]}
                      pointerEvents="none"
                    >
                      {t('auth.login.passwordLabel')}
                    </Text>
                    <View style={styles.passwordInputWrapper}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder=""
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={formData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                        secureTextEntry={!showPassword}
                        autoComplete="current-password"
                        autoCorrect={false}
                        pointerEvents="auto"
                        editable={true}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={showPassword ? 'eye-off' : 'eye'}
                          size={20}
                          color="rgba(255, 255, 255, 0.7)"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {errors.password && (
                    <Text style={styles.inputError}>{errors.password}</Text>
                  )}
                </View>

                {/* Login Button */}
                <LoginButton
                  title={t('auth.login.loginButton')}
                  onPress={handleLogin}
                  disabled={isLoading}
                  loading={isLoading}
                  style={styles.loginButton}
                  fontSize="lg"
                />

                {/* Forgot Password Link and Home Icon */}
                <View style={styles.forgotPasswordRow}>
                  <TouchableOpacity
                    style={styles.forgotPasswordContainer}
                    onPress={handleForgotPassword}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.forgotPasswordText}>{t('auth.login.forgotPassword')}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.homeIcon}
                    onPress={completeVerification}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="home" size={20} color={colors.neutral[50]} />
                    <Text style={styles.homeIconText}>Home</Text>
                  </TouchableOpacity>
                </View>
              </GlassmorphismContainer>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Footer - Fixed at bottom, adjusts for keyboard */}
        <View style={[
          styles.footer,
          keyboardVisible && styles.footerKeyboard
        ]}>
          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('auth.login.socialLoginDivider')}</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  // TODO: Implement Google login
                  console.log('Google login clicked');
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.socialButtonIcon}>G</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  // TODO: Implement Facebook login
                  console.log('Facebook login clicked');
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.socialButtonIcon}>f</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => {
                  // TODO: Implement Instagram login
                  console.log('Instagram login clicked');
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.socialButtonIcon}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>{t('auth.login.noAccount')} </Text>
            <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
              <Text style={styles.signUpLink}>{t('auth.login.signUpLink')}</Text>
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
    flexGrow: 1,
  },
  scrollContentKeyboard: {
    paddingBottom: 100, // Extra space when keyboard is visible
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.sizes['4xl'], // Reduced from 5xl to match registration screens
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
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 300, // Ensure minimum height for better centering
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: spacing.xl,
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
  floatingLabelContainer: {
    position: 'relative',
    width: '100%',
  },
  floatingLabel: {
    position: 'absolute',
    left: spacing.xs,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.neutral[50],
    zIndex: 1,
  },
  floatingLabelActive: {
    top: -15,
    fontSize: typography.sizes.xs,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  floatingLabelInactive: {
    top: 14,
    left: spacing.md,
    fontSize: typography.sizes.md,
    color: 'rgba(255, 255, 255, 0.7)',
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
  passwordInputWrapper: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: componentColors.glassmorphism.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingRight: 48, // Space for eye icon
    fontSize: typography.sizes.md,
    color: colors.neutral[50],
    backgroundColor: componentColors.glassmorphism.background,
  },
  eyeIcon: {
    position: 'absolute',
    right: spacing.md,
    top: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
  forgotPasswordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  forgotPasswordText: {
    color: componentColors.glassmorphism.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  homeIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  homeIconText: {
    color: colors.neutral[50],
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginLeft: spacing.xs,
  },
  socialSection: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
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
    alignItems: 'center',
    gap: spacing.sm, // Reduced gap for better spacing
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
    marginHorizontal: spacing.xs, // Add horizontal margin for better spacing
  },
  socialButtonIcon: {
    fontSize: 20,
    color: colors.neutral[50],
    fontWeight: typography.weights.bold,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: 'transparent',
  },
  footerKeyboard: {
    paddingVertical: spacing.md, // Reduced padding when keyboard is visible
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
