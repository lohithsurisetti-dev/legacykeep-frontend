import React, { useState } from 'react';
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
import { authTexts } from '../../constants/texts';
import { validateEmail, validatePassword, validateUsername, validateEmailOrPhone } from '../../utils/validation';
import GradientButton from '../../components/ui/GradientButton';
import GradientText from '../../components/ui/GradientText';
import ProgressTracker from '../../components/ui/ProgressTracker';
import { LinearGradient } from 'expo-linear-gradient';

type Props = AuthStackScreenProps<typeof ROUTES.REGISTRATION>;

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  emailOrPhone: string;
  password: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  emailOrPhone?: string;
  password?: string;
  agreeToTerms?: string;
}

const RegistrationScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
    emailOrPhone: '',
    password: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = authTexts.registrationValidation.firstNameRequired;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = authTexts.registrationValidation.lastNameRequired;
    }

    // Username validation
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.error;
    }

    // Email/Phone validation
    const emailOrPhoneValidation = validateEmailOrPhone(formData.emailOrPhone);
    if (!emailOrPhoneValidation.isValid) {
      newErrors.emailOrPhone = emailOrPhoneValidation.error;
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual registration API call
      // await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      // Navigate directly to personal details screen
      (navigation as any).navigate(ROUTES.PERSONAL_DETAILS);
    } catch (error) {
      console.error('Create account error:', error);
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
            <Text style={styles.title}>{authTexts.registration.title}</Text>
            <Text style={styles.subtitle}>
              {authTexts.registration.subtitle}
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
                    placeholder={authTexts.registration.firstNamePlaceholder}
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                <View style={styles.nameFieldContainer}>
                  <TextInput
                    style={[styles.nameInput, errors.lastName && styles.inputError]}
                    placeholder={authTexts.registration.lastNamePlaceholder}
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Username Field */}
              <TextInput
                style={[styles.input, errors.username && styles.inputError]}
                placeholder={authTexts.registration.usernamePlaceholder}
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Email/Phone Field */}
              <TextInput
                style={[styles.input, errors.emailOrPhone && styles.inputError]}
                placeholder={authTexts.registration.emailOrPhonePlaceholder}
                value={formData.emailOrPhone}
                onChangeText={(value) => handleInputChange('emailOrPhone', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Password Field */}
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder={authTexts.registration.passwordPlaceholder}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Terms Checkbox */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
                  activeOpacity={0.8}
                >
                  {formData.agreeToTerms ? (
                    <LinearGradient
                      colors={gradients.peacock}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.checkbox}
                    >
                      <Text style={styles.checkmark}>✓</Text>
                    </LinearGradient>
                  ) : (
                    <View style={[
                      styles.checkbox,
                      errors.agreeToTerms && styles.checkboxError
                    ]}>
                    </View>
                  )}
                  <Text style={styles.termsText}>
                    {authTexts.registration.termsText}{' '}
                    <GradientText
                      gradient="peacock"
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      {authTexts.registration.termsLink}
                    </GradientText>
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <GradientButton
            title={authTexts.registration.createAccountButton}
            onPress={handleCreateAccount}
            disabled={isLoading}
            loading={isLoading}
            gradient="horizontal"
            style={styles.createButton}
          />
          
          {/* Already have account - below continue button */}
          <View style={styles.signInContainer}>
            <Text style={styles.footerText}>{authTexts.registration.alreadyHaveAccount} </Text>
            <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
              <GradientText
                gradient="peacock"
                fontSize="md"
                fontWeight="bold"
              >
                {authTexts.registration.signInLink}
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
 