import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing, gradients } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRegistration } from '../../contexts/RegistrationContext';
import { validateEmail, validatePassword, validateUsername, validateEmailOrPhone } from '../../utils/validation';
import { authApi } from '../../services';
import GradientButton from '../../components/ui/GradientButton';
import GradientText from '../../components/ui/GradientText';
import ProgressTracker from '../../components/ui/ProgressTracker';
import { LinearGradient } from 'expo-linear-gradient';

type Props = AuthStackScreenProps<typeof ROUTES.REGISTRATION>;

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  general?: string;
}

const RegistrationScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const { data, updateData, canProceedToNext, submitRegistration } = useRegistration();
  
  // Map registration context data to local form data for compatibility
  const formData = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    password: data.password,
  };

  const setFormData = (updates: Partial<FormData>) => {
    // Update registration context when form data changes
    const contextUpdates: Partial<typeof data> = {};
    
    if (updates.firstName !== undefined) contextUpdates.firstName = updates.firstName;
    if (updates.lastName !== undefined) contextUpdates.lastName = updates.lastName;
    if (updates.username !== undefined) contextUpdates.username = updates.username;
    if (updates.password !== undefined) contextUpdates.password = updates.password;
    
    updateData(contextUpdates);
  };
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'available' | 'taken' | 'checking' | null>(null);
  const usernameTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced username checking
  useEffect(() => {
    if (usernameTimeoutRef.current) {
      clearTimeout(usernameTimeoutRef.current);
    }

    if (formData.username.trim().length >= 3) {
      setUsernameStatus('checking');
      setIsCheckingUsername(true);
      
      usernameTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await authApi.validateUsername(formData.username.trim());
          if (response.data && response.data.available) {
            setUsernameStatus('available');
          } else {
            setUsernameStatus('taken');
          }
        } catch (error) {
          console.error('Username validation error:', error);
          setUsernameStatus(null);
        } finally {
          setIsCheckingUsername(false);
        }
      }, 500); // 500ms delay
    } else {
      setUsernameStatus(null);
      setIsCheckingUsername(false);
    }

    return () => {
      if (usernameTimeoutRef.current) {
        clearTimeout(usernameTimeoutRef.current);
      }
    };
  }, [formData.username]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    // Update via the custom setFormData function that syncs with context
    setFormData({ [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('auth.registrationValidation.firstNameRequired');
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('auth.registrationValidation.lastNameRequired');
    }

    // Username validation
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.error;
    } else if (usernameStatus === 'taken') {
      newErrors.username = 'This username is already taken';
    } else if (usernameStatus === 'checking' || isCheckingUsername) {
      newErrors.username = 'Checking username availability...';
    }


    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }

    // Check registration context validation
    if (!canProceedToNext()) {
      setErrors({ general: 'Please fill in all required fields correctly' });
      return;
    }

    try {
      // Update registration context with current form data
      updateData({
        username: formData.username,
        password: formData.password,
      });

      // Just navigate to personal details - no API call here
      // Account creation happens only after OTP verification
      console.log('✅ REGISTRATION SCREEN: Data saved, navigating to personal details');
      (navigation as any).navigate(ROUTES.PERSONAL_DETAILS);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: error instanceof Error ? error.message : 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    (navigation as any).navigate(ROUTES.LOGIN);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral[50]} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>LegacyKeep</Text>
            <Text style={styles.subtitle}>
              {t('auth.registration.subtitle')}
            </Text>
          </View>

              {/* Progress Indicator */}
              <ProgressTracker currentStep={1} totalSteps={4} />

          {/* Registration Form */}
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {/* Name Fields */}
              <View style={styles.nameRow}>
                <View style={styles.nameFieldContainer}>
                  <TextInput
                    style={[styles.nameInput, errors.firstName && styles.inputError]}
                    placeholder={t('auth.registration.firstNamePlaceholder')}
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                    autoComplete="name-given"
                  />
                </View>
                <View style={styles.nameFieldContainer}>
                  <TextInput
                    style={[styles.nameInput, errors.lastName && styles.inputError]}
                    placeholder={t('auth.registration.lastNamePlaceholder')}
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                    autoComplete="name-family"
                  />
                </View>
              </View>

              {/* Username Field */}
              <View style={styles.usernameContainer}>
                <TextInput
                  style={[
                    styles.input, 
                    errors.username && styles.inputError,
                    usernameStatus === 'taken' && styles.inputError
                  ]}
                  placeholder={t('auth.registration.usernamePlaceholder')}
                  value={formData.username}
                  onChangeText={(value) => handleInputChange('username', value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="username"
                />
                {usernameStatus === 'checking' && (
                  <View style={styles.usernameStatusIndicator}>
                    <Text style={styles.usernameStatusText}>Checking...</Text>
                  </View>
                )}
                {usernameStatus === 'available' && (
                  <View style={styles.usernameStatusIndicator}>
                    <Text style={[styles.usernameStatusText, styles.usernameStatusSuccess]}>✓ Available</Text>
                  </View>
                )}
                {usernameStatus === 'taken' && (
                  <View style={styles.usernameStatusIndicator}>
                    <Text style={[styles.usernameStatusText, styles.usernameStatusError]}>✗ Taken</Text>
                  </View>
                )}
              </View>


              {/* Password Field */}
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder={t('auth.registration.passwordPlaceholder')}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password-new"
              />
              
              {/* Password Strength Indicator - Only show when user starts typing */}
              {formData.password.length > 0 && (
                <View style={styles.passwordStrength}>
                  <Text style={styles.passwordStrengthTitle}>Password Strength</Text>
                  <View style={styles.strengthBar}>
                    <LinearGradient
                      colors={gradients.peacock}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.strengthGradient,
                        {
                          width: `${((formData.password.length >= 8 ? 1 : 0) + 
                                   (/[A-Z]/.test(formData.password) ? 1 : 0) + 
                                   (/\d/.test(formData.password) ? 1 : 0) + 
                                   (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 1 : 0)) * 25}%`
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.strengthLabel}>
                    {formData.password.length < 8 ? 'Too short' :
                     (() => {
                       const hasUppercase = /[A-Z]/.test(formData.password);
                       const hasLowercase = /[a-z]/.test(formData.password);
                       const hasNumber = /\d/.test(formData.password);
                       const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
                       const complexityCount = [hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;
                       
                       if (complexityCount === 0) return 'Add letters, numbers, or symbols';
                       if (complexityCount === 1) return 'Add more variety (numbers, symbols)';
                       if (complexityCount === 2) return 'Good! Add more variety';
                       if (complexityCount === 3) return 'Strong password!';
                       return 'Excellent! Very secure';
                     })()}
                  </Text>
                </View>
              )}



            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {/* Terms Agreement Text */}
          <Text style={styles.agreementText}>
            By clicking Continue, you agree to our{' '}
            <GradientText
              gradient="peacock"
              fontSize="sm"
              fontWeight="medium"
            >
              Terms of Service
            </GradientText>
            {' '}and{' '}
            <GradientText
              gradient="peacock"
              fontSize="sm"
              fontWeight="medium"
            >
              Privacy Policy
            </GradientText>
          </Text>
          
          <GradientButton
            title={t('auth.registration.sendVerificationButton')}
            onPress={handleCreateAccount}
            disabled={isLoading || 
                     !formData.password || 
                     formData.password.length < 8 ||
                     usernameStatus === 'checking' || 
                     usernameStatus === 'taken' || 
                     (formData.username.length >= 3 && usernameStatus !== 'available')}
            loading={isLoading}
            gradient="horizontal"
            style={styles.createButton}
          />
          
          {/* Already have account - below continue button */}
          <View style={styles.signInContainer}>
            <Text style={styles.footerText}>{t('auth.registration.alreadyHaveAccount')} </Text>
            <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
              <GradientText
                gradient="peacock"
                fontSize="md"
                fontWeight="bold"
              >
                {t('auth.registration.signInLink')}
              </GradientText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50], // bg-gray-50
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes['5xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  nameFieldContainer: {
    flex: 1,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: colors.neutral[400], // Darker border for better visibility
    borderRadius: 12, // rounded-xl
    paddingVertical: 14, // py-3.5
    paddingHorizontal: spacing.md, // px-4
    fontSize: typography.sizes.md, // text-base
    color: colors.neutral[900], // text-gray-900
    backgroundColor: colors.neutral[50], // bg-gray-50
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[400], // Darker border for better visibility
    borderRadius: 12, // rounded-xl
    paddingVertical: 14, // py-3.5
    paddingHorizontal: spacing.md, // px-4
    fontSize: typography.sizes.md, // text-base
    color: colors.neutral[900], // text-gray-900
    backgroundColor: colors.neutral[50], // bg-gray-50
    marginBottom: spacing.md,
  },
  inputError: {
    borderColor: colors.error[500], // focus:border-teal-500 focus:ring-teal-500 (using error color for now)
  },
  inputSuccess: {
    borderColor: colors.semantic.success,
  },
  usernameContainer: {
    position: 'relative',
  },
  usernameStatusIndicator: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -15 }],
  },
  usernameStatusText: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    fontWeight: typography.weights.medium,
  },
  usernameStatusSuccess: {
    color: colors.semantic.success,
  },
  usernameStatusError: {
    color: colors.error[500],
  },
  termsContainer: {
    marginBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  checkbox: {
    width: 20, // h-5 w-5
    height: 20,
    borderRadius: 4, // rounded
    borderWidth: 1,
    borderColor: colors.neutral[300], // border-gray-300
    backgroundColor: colors.neutral[50], // bg-white
    marginRight: spacing.sm, // space-x-3
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxError: {
    borderColor: colors.error[500], // Red border for error state
  },
  checkmark: {
    color: colors.neutral[50], // text-white
    fontSize: 12,
    fontWeight: typography.weights.bold,
  },
  termsText: {
    fontSize: typography.sizes.sm, // text-sm
    color: colors.neutral[600], // text-gray-600
    flex: 1,
    lineHeight: 20,
  },
  agreementText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  passwordStrength: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  passwordStrengthTitle: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  strengthBar: {
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: 3,
    marginBottom: spacing.xs,
    overflow: 'hidden',
    position: 'relative',
  },
  strengthGradient: {
    height: '100%',
    borderRadius: 3,
  },
  strengthLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    textAlign: 'center',
    fontWeight: typography.weights.medium,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  createButton: {
    height: 48, // Match login button height
    borderRadius: 8, // Match login button border radius
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Match login button shadow
    shadowRadius: 4,
    elevation: 4, // Match login button elevation
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    color: colors.neutral[600],
    fontSize: typography.sizes.md,
  },
});

export default RegistrationScreen;
 