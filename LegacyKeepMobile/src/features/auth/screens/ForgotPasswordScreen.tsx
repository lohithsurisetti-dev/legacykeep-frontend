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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../shared/components/ui';
import { AuthStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { validatePassword } from '../../../shared/utils/validation';
import GradientButton from '../../../shared/components/ui/GradientButton';

type Props = AuthStackScreenProps<typeof ROUTES.FORGOT_PASSWORD>;

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

const ForgotPasswordScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(new Set());

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (validateAll: boolean = false): boolean => {
    const newErrors: FormErrors = {};

    // Only validate newPassword if it's been touched or we're validating all
    if (validateAll || touchedFields.has('newPassword')) {
      const passwordValidation = validatePassword(formData.newPassword);
      if (!passwordValidation.isValid) {
        newErrors.newPassword = passwordValidation.error;
      }
    }

    // Only validate confirmPassword if it's been touched or we're validating all
    if (validateAll || touchedFields.has('confirmPassword')) {
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm(true)) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Reset password with backend
      console.log('Password reset successful');
      (navigation as any).navigate(ROUTES.PASSWORD_RESET_SUCCESS);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    (navigation as any).navigate(ROUTES.LOGIN);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.neutral[50]} />
      <SafeAreaView style={styles.safeArea}>
        {/* Back Arrow */}
        <BackButton
          onPress={handleBackToLogin}
          style={styles.backButton}
          variant="default"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>LegacyKeep</Text>
            <Text style={styles.subtitle}>{t('auth.forgotPassword.subtitle')}</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {/* New Password Field */}
              <View style={[styles.fieldContainer, { marginBottom: spacing.md }]}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, errors.newPassword && styles.inputError]}
                    placeholder={t('auth.forgotPassword.newPasswordPlaceholder')}
                    value={formData.newPassword}
                    onChangeText={(value) => handleInputChange('newPassword', value)}
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password-new"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showNewPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color={colors.neutral[500]}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Field */}
              <View style={styles.fieldContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                    placeholder={t('auth.forgotPassword.confirmPasswordPlaceholder')}
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password-new"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color={colors.neutral[500]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <GradientButton
            title={t('auth.forgotPassword.resetPasswordButton')}
            onPress={handleResetPassword}
            disabled={isLoading}
            gradient="horizontal"
            style={styles.resetButton}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50], // bg-white
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: spacing.xl + spacing.sm, // Moved down more (24px + 8px = 32px)
    left: spacing.lg,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.sizes['4xl'],
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
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: spacing.lg, // mb-6 for confirm password, mb-4 for new password
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[400], // Darker border for better visibility
    borderRadius: 12, // rounded-xl
    paddingVertical: 14, // h-14
    paddingHorizontal: spacing.md, // p-4
    paddingRight: 48, // space for eye button
        fontSize: typography.sizes.md, // text-base
    fontWeight: typography.weights.normal, // font-normal
    color: colors.neutral[900], // text-slate-900
    backgroundColor: colors.neutral[50], // bg-slate-50
  },
  inputError: {
    borderColor: colors.error[500],
  },
  eyeButton: {
    position: 'absolute',
    right: 12, // pr-3
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: 'transparent',
  },
  resetButton: {
    width: '100%',
    marginTop: spacing.md,
  },
});

export default ForgotPasswordScreen;
