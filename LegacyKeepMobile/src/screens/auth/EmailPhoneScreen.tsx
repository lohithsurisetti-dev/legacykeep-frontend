import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useRegistration } from '../../contexts/RegistrationContext';
import { authApi } from '../../services';
import { ROUTES } from '../../navigation/types';

interface EmailPhoneFormData {
  emailOrPhone: string;
}

interface EmailPhoneFormErrors {
  emailOrPhone?: string;
  general?: string;
}

const EmailPhoneScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const { setEmailOrPhone, data } = useRegistration();

  const [formData, setFormData] = useState<EmailPhoneFormData>({
    emailOrPhone: data.email || data.phoneNumber || '',
  });

  const [errors, setErrors] = useState<EmailPhoneFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Determine if input is email or phone
  const isEmail = (input: string): boolean => {
    return input.includes('@');
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone format (basic E.164)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  // Real-time validation
  const validateInput = async (input: string) => {
    if (!input.trim()) {
      setErrors({});
      return;
    }

    setIsValidating(true);
    setErrors({});

    try {
      if (isEmail(input)) {
        if (!validateEmail(input)) {
          setErrors({ emailOrPhone: t('auth.validation.invalidEmail') });
          return;
        }
        // Check if email exists
        const response = await authApi.validateEmail(input);
        if (response.data && !response.data.available) {
          setErrors({ emailOrPhone: t('auth.validation.emailAlreadyExists') });
        }
      } else {
        if (!validatePhone(input)) {
          setErrors({ emailOrPhone: t('auth.validation.invalidPhone') });
          return;
        }
        // Check if phone exists
        const response = await authApi.validatePhone(input);
        if (response.data && !response.data.available) {
          setErrors({ emailOrPhone: t('auth.validation.phoneAlreadyExists') });
        }
      }
    } catch (error) {
      console.error('Validation error:', error);
      // Don't show error for validation failures, just continue
    } finally {
      setIsValidating(false);
    }
  };

  const handleInputChange = (value: string) => {
    setFormData({ emailOrPhone: value });
    setErrors({});
    
    // Debounced validation
    const timeoutId = setTimeout(() => {
      validateInput(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleContinue = async () => {
    const { emailOrPhone } = formData;

    if (!emailOrPhone.trim()) {
      setErrors({ emailOrPhone: t('auth.validation.emailOrPhoneRequired') });
      return;
    }

    if (isEmail(emailOrPhone) && !validateEmail(emailOrPhone)) {
      setErrors({ emailOrPhone: t('auth.validation.invalidEmail') });
      return;
    }

    if (!isEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
      setErrors({ emailOrPhone: t('auth.validation.invalidPhone') });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Save email/phone to context
      if (isEmail(emailOrPhone)) {
        setEmailOrPhone(emailOrPhone, '');
      } else {
        setEmailOrPhone('', emailOrPhone);
      }

      // Generate and send OTP immediately
      await authApi.generateOtp(emailOrPhone);

      // Navigate to OTP verification
      navigation.navigate(ROUTES.OTP_VERIFICATION as never);
    } catch (error: any) {
      console.error('Error generating OTP:', error);
      setErrors({
        general: error.message || t('auth.validation.otpGenerationFailed'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const styles = createStyles(colors);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('auth.emailPhone.title')}</Text>
            <Text style={styles.subtitle}>{t('auth.emailPhone.subtitle')}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {t('auth.emailPhone.emailOrPhoneLabel')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.emailOrPhone && styles.inputError,
                ]}
                value={formData.emailOrPhone}
                onChangeText={handleInputChange}
                placeholder={t('auth.emailPhone.emailOrPhonePlaceholder')}
                placeholderTextColor={colors.textSecondary}
                keyboardType={isEmail(formData.emailOrPhone) ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete={isEmail(formData.emailOrPhone) ? 'email' : 'tel'}
              />
              {errors.emailOrPhone && (
                <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
              )}
            </View>

            {errors.general && (
              <View style={styles.generalErrorContainer}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.continueButton,
                (isLoading || isValidating) && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={isLoading || isValidating}
            >
              <Text style={styles.continueButtonText}>
                {isLoading
                  ? t('auth.emailPhone.sendingOtp')
                  : isValidating
                  ? t('auth.emailPhone.validating')
                  : t('auth.emailPhone.continueButton')}
              </Text>
            </TouchableOpacity>

            <View style={styles.helpText}>
              <Text style={styles.helpTextContent}>
                {t('auth.emailPhone.helpText')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    form: {
      flex: 1,
    },
    inputContainer: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.surfaceSecondary,
    },
    inputError: {
      borderColor: colors.error,
    },
    errorText: {
      color: colors.error,
      fontSize: 14,
      marginTop: 8,
    },
    generalErrorContainer: {
      backgroundColor: colors.errorBackground,
      padding: 12,
      borderRadius: 8,
      marginBottom: 24,
    },
    generalErrorText: {
      color: colors.error,
      fontSize: 14,
      textAlign: 'center',
    },
    continueButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 24,
    },
    continueButtonDisabled: {
      backgroundColor: colors.textDisabled,
    },
    continueButtonText: {
      color: colors.textInverse,
      fontSize: 16,
      fontWeight: '600',
    },
    helpText: {
      alignItems: 'center',
    },
    helpTextContent: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

export default EmailPhoneScreen;
