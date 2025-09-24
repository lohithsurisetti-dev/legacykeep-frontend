/**
 * OTP Verification Screen (Screen 4)
 * 
 * Handles 6-digit OTP verification for account completion
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing, gradients, LAYOUT } from '../../../shared/constants';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { useAuth } from '../../../app/providers/AuthContext';
import { useRegistration } from '../../../app/providers/RegistrationContext';
import { authService } from '../../../shared/services';
import { BackButton, GradientButton, ProgressTracker, GradientText } from '../../../shared/components/ui';
import { RegistrationLayout } from '../../../shared/components/layout';
import { LinearGradient } from 'expo-linear-gradient';
import { getResponsiveLayout, getResponsiveComponentSizes } from '../../../shared/utils/responsive';
import { responsiveStyles } from '../../../shared/constants/responsiveStyles';

type Props = AuthStackScreenProps<typeof ROUTES.OTP_VERIFICATION>;

interface OtpFormData {
  otp: string[];
}

interface OtpFormErrors {
  otp?: string;
  resend?: string;
}

const OtpVerificationScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const { completeVerification } = useAuth();
  const { data, submitRegistration, generateOtp, verifyOtp } = useRegistration();
  
  // Get params for dynamic behavior
  const purpose = route?.params?.purpose || 'registration';
  const emailOrPhone = route?.params?.emailOrPhone || '';
  
  // Dynamic content based on purpose
  const getSubtitle = () => {
    return purpose === 'password-reset' 
      ? t('auth.otpVerification.passwordReset.subtitle')
      : t('auth.otpVerification.subtitle');
  };

  const getButtonText = () => {
    return purpose === 'password-reset' 
      ? t('auth.otpVerification.passwordReset.verifyButton')
      : t('auth.otpVerification.verifyButton');
  };

  const getDescription = () => {
    if (purpose === 'password-reset') {
      return emailOrPhone 
        ? t('auth.otpVerification.passwordReset.description').replace('{emailOrPhone}', emailOrPhone || '')
        : 'Enter the 6-digit code sent to your email/phone';
    } else {
      return emailOrPhone 
        ? t('auth.otpVerification.description').replace('{emailOrPhone}', emailOrPhone || '')
        : 'Enter the 6-digit code sent to your email/phone';
    }
  };
  
  const [formData, setFormData] = useState<OtpFormData>({
    otp: ['', '', '', '', '', ''],
  });
  
  const [errors, setErrors] = useState<OtpFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const otpInputRefs = useRef<TextInput[]>([]);
  const hiddenInputRef = useRef<TextInput>(null);

  // Blinking caret for active OTP box
  const [caretVisible, setCaretVisible] = useState(true);
  useEffect(() => {
    const caretTimer = setInterval(() => setCaretVisible(prev => !prev), 500);
    return () => clearInterval(caretTimer);
  }, []);

  // Initialize refs array
  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Debug: Log when OTP screen mounts
  useEffect(() => {
    console.log('🚀 OTP SCREEN: Component mounted');
    console.log('🚀 OTP SCREEN: Purpose:', purpose);
    console.log('🚀 OTP SCREEN: EmailOrPhone:', emailOrPhone);
    console.log('🚀 OTP SCREEN: Registration data:', JSON.stringify(data, null, 2));
    console.log('🚀 OTP SCREEN: Registration progress:', data.registrationProgress);
  }, []);

  const validateForm = (data: OtpFormData) => {
    const newErrors: OtpFormErrors = {};
    
    // Validate OTP
    const otpString = data.otp.join('');
    if (otpString.length !== 6) {
      newErrors.otp = 'Please enter a valid 6-digit code';
    } else if (!/^\d{6}$/.test(otpString)) {
      newErrors.otp = 'OTP must contain only numbers';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOtpChange = (value: string, index: number) => {
    // Handle backspace (empty value)
    if (value === '') {
      const newOtp = [...formData.otp];
      newOtp[index] = '';
      setFormData(prev => ({
        ...prev,
        otp: newOtp
      }));
      
      // Move to previous field if current is empty and not the first field
      if (index > 0) {
        setTimeout(() => {
          otpInputRefs.current[index - 1]?.focus();
        }, 50);
      }
      return;
    }
    
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }
    
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    
    setFormData(prev => ({
      ...prev,
      otp: newOtp
    }));
    
    // Auto-focus next input with a small delay to ensure state is updated
    if (value && index < 5) {
      setTimeout(() => {
        otpInputRefs.current[index + 1]?.focus();
      }, 50);
    }
    
    // Clear error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: undefined }));
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    // Handle backspace key
    if (key === 'Backspace') {
      if (formData.otp[index] === '') {
        // If current field is empty, move to previous field
        if (index > 0) {
          setTimeout(() => {
            otpInputRefs.current[index - 1]?.focus();
          }, 50);
        }
      } else {
        // Clear current field
        const newOtp = [...formData.otp];
        newOtp[index] = '';
        setFormData(prev => ({
          ...prev,
          otp: newOtp
        }));
      }
    }
  };

  const handleOtpBoxPress = (index: number) => {
    // Focus the hidden input when any OTP box is pressed
    hiddenInputRef.current?.focus();
  };

  const handleHiddenInputChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
    
    // Convert to array format
    const otpArray = numericValue.split('');
    const paddedOtp = [...otpArray, ...Array(6 - otpArray.length).fill('')];
    
    setFormData(prev => ({
      ...prev,
      otp: paddedOtp
    }));
    
    // Clear error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: undefined }));
    }
  };


  const handleVerify = async () => {
    console.log('🚀 OTP SCREEN: handleVerify() called');
    console.log('🚀 OTP SCREEN: Form data:', formData);
    console.log('🚀 OTP SCREEN: Purpose:', purpose);
    
    if (!validateForm(formData)) {
      console.log('❌ OTP SCREEN: Form validation failed');
      return;
    }

    setIsLoading(true);
    try {
      const otpCode = formData.otp.join('');
      console.log('🚀 OTP SCREEN: Verifying OTP:', otpCode);
      console.log('🚀 OTP SCREEN: Purpose:', purpose);
      
      if (purpose === 'password-reset') {
        // Password reset flow - verify OTP and navigate to reset screen
        await verifyOtp(otpCode);
        (navigation as any).navigate(ROUTES.FORGOT_PASSWORD, {
          step: 'reset',
          emailOrPhone: emailOrPhone,
        });
      } else {
        // Registration flow - verify OTP and complete registration
        console.log('🚀 OTP SCREEN: Starting OTP verification...');
        
        // Verify OTP first
        console.log('🚀 OTP SCREEN: Calling verifyOtp...');
        await verifyOtp(otpCode);
        
        // Registration is now complete with profile creation
        console.log('✅ OTP SCREEN: Registration completed successfully, navigating to main app');
        (navigation as any).navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      setErrors({ otp: error instanceof Error ? error.message : 'Verification failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    
    try {
      // Get email from registration context
      const email = data.email;
      if (!email || !email.trim()) {
        throw new Error('Email not found. Please restart the registration process.');
      }

      console.log('🚀 OTP SCREEN: Resending OTP for email:', email);
      await authService.generateOtp(email);
      console.log('✅ OTP SCREEN: OTP resent successfully');
      
      // Clear any existing errors
      setErrors({});
      
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Start cooldown timer
      setResendCooldown(60);
      timerRef.current = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      console.log('New verification code sent');
    } catch (error: any) {
      console.error('Failed to resend code:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to resend OTP. Please try again.';
      setErrors({ resend: errorMessage });
    }
  };

  const handleBack = () => {
    if (purpose === 'password-reset') {
      // For password reset, go back to login screen
      (navigation as any).navigate(ROUTES.LOGIN);
    } else {
      // For registration flow, go back to previous screen
      (navigation as any).goBack();
    }
  };

  const isPasswordReset = purpose === 'password-reset';

  return (
    <RegistrationLayout
      subtitle={getSubtitle()}
      onBackPress={handleBack}
      currentStep={isPasswordReset ? 1 : 5}
      totalSteps={isPasswordReset ? 2 : 5}
      primaryButtonText={getButtonText()}
      onPrimaryPress={handleVerify}
      primaryButtonLoading={purpose === 'registration' ? isLoading : false}
      primaryButtonDisabled={isLoading}
      onSecondaryPress={() => (navigation as any).navigate(ROUTES.LOGIN)}
    >
      <View style={styles.form}>
        {/* OTP Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t('auth.otpVerification.otpLabel')}</Text>
          <Text style={styles.helperText}>{getDescription()}</Text>
          
          {/* Hidden input for OTP entry */}
          <TextInput
            ref={hiddenInputRef}
            style={styles.hiddenInput}
            value={formData.otp.join('')}
            onChangeText={handleHiddenInputChange}
            keyboardType="numeric"
            maxLength={6}
            autoFocus={true}
            showSoftInputOnFocus={true}
            selectTextOnFocus={true}
          />
          
          <View style={styles.otpContainer}>
            {formData.otp.map((digit, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.otpInputWrapper}
                onPress={() => handleOtpBoxPress(index)}
                activeOpacity={0.7}
              >
                {digit ? (
                  <LinearGradient
                    colors={gradients.peacock}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.otpGradientWrapper}
                  >
                    <View style={styles.otpInputFilled}>
                      <Text style={styles.otpDigit}>{digit}</Text>
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={[
                    styles.otpInput,
                    errors.otp && styles.inputError
                  ]}>
                    {/* Show blinking caret on the active (first empty) box */}
                    {(() => {
                      const firstEmptyIndex = formData.otp.findIndex(d => !d);
                      const activeIndex = firstEmptyIndex === -1 ? formData.otp.length - 1 : firstEmptyIndex;
                      if (activeIndex === index) {
                        return <View style={[styles.caret, { opacity: caretVisible ? 1 : 0 }]} />;
                      }
                      return <Text style={styles.otpPlaceholder}>•</Text>;
                    })()}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Resend Code */}
        <View style={styles.resendSection}>
          <View style={styles.resendRow}>
            <Text style={styles.resendLabel}>Didn't receive it? </Text>
            <TouchableOpacity 
              onPress={handleResendCode}
              disabled={resendCooldown > 0}
              activeOpacity={0.7}
              style={styles.resendButton}
            >
              {resendCooldown > 0 ? (
                <Text style={styles.resendTextDisabled}>
                  Resend in {resendCooldown}s
                </Text>
              ) : (
                <GradientText
                  gradient="peacock"
                  fontSize="md"
                  fontWeight="semibold"
                >
                  Resend
                </GradientText>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Resend Error Message */}
          {errors.resend && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.resend}</Text>
            </View>
          )}
        </View>
      </View>
    </RegistrationLayout>
  );
};

const styles = StyleSheet.create({
  form: {
    width: LAYOUT.FULL_WIDTH,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  inputLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[800],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  helperText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    width: LAYOUT.FULL_WIDTH,
    paddingHorizontal: spacing.lg,
  },
  otpInputWrapper: {
    width: 56,
    height: 56,
    flex: 0,
  },
  otpGradientWrapper: {
    borderRadius: 16,
    padding: 2, // This creates the border width
  },
  otpInput: {
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: spacing.sm,
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    backgroundColor: colors.neutral[50],
    textAlign: 'center',
    width: LAYOUT.FULL_WIDTH,
    height: LAYOUT.FULL_HEIGHT,
  },
  otpInputFilled: {
    borderWidth: 0, // Remove border since gradient wrapper provides it
    borderRadius: 14, // Slightly smaller to fit inside gradient wrapper
    paddingVertical: 16,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.neutral[50], // White background
    width: LAYOUT.FULL_WIDTH,
    height: LAYOUT.FULL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputError: {
    borderColor: colors.error[500],
  },
  hiddenInput: {
    position: 'absolute',
    left: -9999,
    opacity: 0,
    height: 0,
    width: 0,
  },
  otpDigit: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900], // Changed to dark color for visibility
    textAlign: 'center',
  },
  otpPlaceholder: {
    fontSize: typography.sizes.xl,
    color: colors.neutral[300],
    textAlign: 'center',
  },
  caret: {
    width: 2,
    height: 24,
    backgroundColor: colors.neutral[700],
    alignSelf: 'center',
  },
  resendSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: LAYOUT.FULL_WIDTH,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.neutral[600],
  },
  resendButton: {
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendTextDisabled: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.neutral[400],
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error[500],
    textAlign: 'center',
  },
});

export default OtpVerificationScreen;