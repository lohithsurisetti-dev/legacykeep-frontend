import React, { useState, useEffect, memo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { useRegistration } from '../../../app/providers/RegistrationContext';
import { authService } from '../../../shared/services';
import { ROUTES } from '../../../app/navigation/types';
import { RegistrationLayout } from '../../../shared/components/layout';
import { validateEmailOrPhone } from '../../../shared/utils/validation';
import { colors, spacing, typography } from '../../../shared/constants';

interface EmailPhoneFormData {
  emailOrPhone: string;
}

interface EmailPhoneFormErrors {
  emailOrPhone?: string;
  general?: string;
}

const EmailPhoneScreen: React.FC = memo(() => {
  const navigation = useNavigation();
  const { t } = useLanguage();
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


  const handleInputChange = useCallback((value: string) => {
    setFormData({ emailOrPhone: value });
    // Clear errors when user starts typing
    if (errors.emailOrPhone) {
      setErrors({});
    }
  }, [errors.emailOrPhone]);

  const handleContinue = useCallback(async () => {
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
        await authService.generateOtp(emailOrPhone);
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
  }, [formData, setEmailOrPhone, navigation, t]);

  return (
    <RegistrationLayout
      subtitle="Verify your account"
      onBackPress={() => navigation.goBack()}
      currentStep={4}
      totalSteps={5}
      primaryButtonText={isLoading ? t('auth.emailPhone.sendingOtp') : 'Send OTP'}
      onPrimaryPress={handleContinue}
      primaryButtonLoading={isLoading}
      primaryButtonDisabled={isLoading || isValidating}
      onSecondaryPress={() => (navigation as any).navigate(ROUTES.LOGIN)}
    >
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email or Phone</Text>
          <TextInput
            style={[
              styles.input,
              errors.emailOrPhone && styles.inputError,
            ]}
            value={formData.emailOrPhone}
            onChangeText={handleInputChange}
            placeholder=""
            placeholderTextColor={colors.neutral[500]}
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
    </RegistrationLayout>
  );
});

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.neutral[700],
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: typography.sizes.md,
    color: colors.neutral[900],
    backgroundColor: colors.neutral[50],
  },
  inputError: {
    borderColor: colors.error[500],
  },
  errorText: {
    color: colors.error[500],
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
  generalErrorContainer: {
    backgroundColor: colors.error[50],
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  generalErrorText: {
    color: colors.error[500],
    fontSize: 14,
    textAlign: 'center',
  },
});

EmailPhoneScreen.displayName = 'EmailPhoneScreen';

export default EmailPhoneScreen;
