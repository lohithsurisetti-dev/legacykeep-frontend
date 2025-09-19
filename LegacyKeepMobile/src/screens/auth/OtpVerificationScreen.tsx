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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing, gradients } from '../../constants';
import { authTexts } from '../../constants/texts';
import { BackButton, GradientButton, ProgressTracker, GradientText } from '../../components/ui';
import { LinearGradient } from 'expo-linear-gradient';

type Props = AuthStackScreenProps<typeof ROUTES.OTP_VERIFICATION>;

interface OtpFormData {
  otp: string[];
}

interface OtpFormErrors {
  otp?: string;
}

const OtpVerificationScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  
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
    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Verify OTP with backend
      console.log('Verifying OTP:', formData.otp.join(''));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success or main app
      Alert.alert(
        'Success!',
        'Your account has been created successfully!',
        [
          {
            text: 'Continue',
            onPress: () => {
              // TODO: Navigate to main app
              console.log('Account created successfully');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    
    try {
      // TODO: Resend OTP
      console.log('Resending OTP...');
      
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
      
      Alert.alert('Code Sent', 'A new verification code has been sent to your email/phone.');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code. Please try again.');
    }
  };

  const handleBack = () => {
    (navigation as any).goBack();
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
            <Text style={styles.title}>{authTexts.otpVerification.title}</Text>
            <Text style={styles.subtitle}>{authTexts.otpVerification.subtitle}</Text>
          </View>

          {/* Progress Indicator */}
          <ProgressTracker currentStep={4} totalSteps={4} />

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {/* OTP Input Fields */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{authTexts.otpVerification.otpLabel}</Text>
                <Text style={styles.helperText}>Enter the 6-digit number sent to your email/phone</Text>
                <View style={styles.otpContainer}>
                  {formData.otp.map((digit, index) => (
                    <View key={index} style={styles.otpInputWrapper}>
                      {digit ? (
                        <LinearGradient
                          colors={gradients.peacock}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
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
            title={authTexts.otpVerification.verifyButton}
            onPress={handleVerify}
            disabled={isLoading}
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
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.neutral[600],
    textAlign: 'center',
    marginTop: spacing.sm,
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