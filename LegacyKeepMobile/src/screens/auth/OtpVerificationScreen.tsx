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
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing, gradients } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useRegistration } from '../../contexts/RegistrationContext';
import { BackButton, GradientButton, ProgressTracker, GradientText } from '../../components/ui';
import { LinearGradient } from 'expo-linear-gradient';

type Props = AuthStackScreenProps<typeof ROUTES.OTP_VERIFICATION>;

interface OtpFormData {
  otp: string[];
}

interface OtpFormErrors {
  otp?: string;
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
  
  const otpInputRefs = useRef<TextInput[]>([]);

  // Initialize refs array
  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6);
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
        // Registration flow - verify OTP and navigate to registration form
        console.log('🚀 OTP SCREEN: Starting OTP verification...');
        
        // Verify OTP first
        console.log('🚀 OTP SCREEN: Calling verifyOtp...');
        await verifyOtp(otpCode);
        
        // Navigate to registration form to collect remaining details
        console.log('✅ OTP SCREEN: OTP verified successfully, navigating to registration form');
        (navigation as any).navigate(ROUTES.REGISTRATION);
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
      // Resend OTP using registration context
      await generateOtp();
      console.log('OTP resent successfully');
      
      // Start cooldown timer
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      console.log('New verification code sent');
    } catch (error) {
      console.error('Failed to resend code:', error);
      setErrors({ otp: 'Failed to resend OTP. Please try again.' });
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <BackButton onPress={handleBack} style={styles.backButton} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>LegacyKeep</Text>
            <Text style={styles.subtitle}>{getSubtitle()}</Text>
          </View>

          {/* Progress Indicator - Only show for registration flow */}
          {purpose === 'registration' && (
            <ProgressTracker currentStep={4} totalSteps={4} />
          )}

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {/* OTP Input Fields */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('auth.otpVerification.otpLabel')}</Text>
                <Text style={styles.helperText}>{getDescription()}</Text>
                <View style={styles.otpContainer}>
                  {formData.otp.map((digit, index) => (
                    <View key={index} style={styles.otpInputWrapper}>
                      {digit ? (
                        <LinearGradient
                          colors={gradients.peacock}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.otpGradientWrapper}
                        >
                          <TextInput
                            ref={(ref) => {
                              if (ref) otpInputRefs.current[index] = ref;
                            }}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            textAlign="center"
                            autoFocus={index === 0}
                          />
                        </LinearGradient>
                      ) : (
                        <TextInput
                          ref={(ref) => {
                            if (ref) otpInputRefs.current[index] = ref;
                          }}
                          style={[
                            styles.otpInput,
                            errors.otp && styles.inputError
                          ]}
                          value={digit}
                          onChangeText={(value) => handleOtpChange(value, index)}
                          keyboardType="numeric"
                          maxLength={1}
                          textAlign="center"
                          autoFocus={index === 0}
                        />
                      )}
                    </View>
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
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <GradientButton
            title={getButtonText()}
            onPress={handleVerify}
            disabled={isLoading}
            loading={purpose === 'registration' ? isLoading : false}
            gradient="horizontal"
            style={styles.verifyButton}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    flexGrow: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: spacing.xl + spacing.sm,
    left: spacing.lg,
    zIndex: 10,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  form: {
    width: '100%',
    alignItems: 'center',
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
  },
  otpInputWrapper: {
    width: 56,
    height: 56,
  },
  otpGradientWrapper: {
    borderRadius: 16,
    padding: 1,
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
    width: '100%',
    height: '100%',
  },
  inputError: {
    borderColor: colors.error[500],
  },
  resendSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  verifyButton: {
    height: 48,
    borderRadius: 8,
    width: '100%',
  },
});

export default OtpVerificationScreen;