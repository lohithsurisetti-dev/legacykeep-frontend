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
import { GradientButton, BackButton } from '../../components/ui';
import { validateEmailOrPhone } from '../../utils/validation';
import { spacing, typography } from '../../constants';

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
  const { setEmailOrPhone, data, submitRegistration } = useRegistration();

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


  const handleInputChange = (value: string) => {
    setFormData({ emailOrPhone: value });
    // Clear errors when user starts typing
    if (errors.emailOrPhone) {
      setErrors({});
    }
  };

  const handleContinue = async () => {
    const { emailOrPhone } = formData;

    // Validate format first
    const formatValidation = validateEmailOrPhone(emailOrPhone);
    if (!formatValidation.isValid) {
      setErrors({ emailOrPhone: formatValidation.error });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Save email/phone to context for later registration
      if (isEmail(emailOrPhone)) {
        setEmailOrPhone(emailOrPhone, '');
      } else {
        setEmailOrPhone('', emailOrPhone);
      }

      // Generate OTP - backend will check if account exists and handle accordingly
      console.log('🚀 EMAIL/PHONE SCREEN: Generating OTP...');
      if (isEmail(emailOrPhone)) {
        await authApi.generateOtp(emailOrPhone);
      } else {
        // TODO: Add phone OTP support
        throw new Error('Phone OTP not yet supported. Please use email.');
      }
      
      console.log('✅ EMAIL/PHONE SCREEN: OTP generated and sent');
      
      // Navigate to OTP verification
      navigation.navigate(ROUTES.OTP_VERIFICATION as never);
    } catch (error: any) {
      console.error('Error generating OTP:', error);
      
      // Check if it's an "account already exists" error (409 status)
      if (error.response?.status === 409) {
        setErrors({
          emailOrPhone: error.response?.data?.message || 'Account already exists. Please sign in instead.',
        });
      } else {
        setErrors({
          general: error.message || t('auth.validation.otpGenerationFailed'),
        });
      }
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
          <BackButton onPress={() => navigation.goBack()} />
          
          <View style={styles.header}>
            <Text style={styles.title}>LegacyKeep</Text>
            <Text style={styles.subtitle}>Verify your account to complete registration</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
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
          </View>
        </View>
      </ScrollView>

      {/* Footer with Continue Button */}
      <View style={styles.footer}>
            <GradientButton
              title={
                isLoading
                  ? t('auth.emailPhone.sendingOtp')
                  : 'Send OTP'
              }
          onPress={handleContinue}
          disabled={isLoading || isValidating}
          loading={isLoading}
          gradient="horizontal"
          style={styles.continueButton}
        />
        
        <View style={styles.signInContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => (navigation as any).navigate(ROUTES.LOGIN)}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      paddingBottom: 100, // Space for footer
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 40,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
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
      justifyContent: 'center',
      marginTop: 0,
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
    footer: {
      alignItems: 'center',
      marginTop: spacing.lg,
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
    continueButton: {
      height: 48,
      borderRadius: 8,
      width: '100%',
    },
    signInContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.lg,
    },
    footerText: {
      fontSize: typography.sizes.md,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    signInLink: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
    },
  });

export default EmailPhoneScreen;
