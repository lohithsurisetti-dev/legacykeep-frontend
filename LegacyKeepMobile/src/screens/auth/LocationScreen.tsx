/**
 * Location Screen (Screen 3)
 * 
 * Collects user's location information and generates OTP
 */

import React, { useState } from 'react';
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
import { colors, typography, spacing } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRegistration } from '../../contexts/RegistrationContext';
import { BackButton, GradientButton, ProgressTracker, GradientText } from '../../components/ui';

type Props = AuthStackScreenProps<typeof ROUTES.LOCATION>;

interface LocationFormData {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface LocationFormErrors {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  general?: string;
}

const LocationScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const { data, updateData, canProceedToNext, submitRegistration } = useRegistration();
  
  // Map registration context data to local form data for compatibility
  const formData = {
    address: data.address,
    city: data.city,
    state: data.state,
    country: data.country,
    zipCode: data.zipCode,
  };

  const setFormData = (updates: Partial<LocationFormData>) => {
    // Update registration context when form data changes
    const contextUpdates: Partial<typeof data> = {};
    
    if (updates.address !== undefined) contextUpdates.address = updates.address;
    if (updates.city !== undefined) contextUpdates.city = updates.city;
    if (updates.state !== undefined) contextUpdates.state = updates.state;
    if (updates.country !== undefined) contextUpdates.country = updates.country;
    if (updates.zipCode !== undefined) contextUpdates.zipCode = updates.zipCode;
    
    updateData(contextUpdates);
  };
  
  const [errors, setErrors] = useState<LocationFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof LocationFormData>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (data: LocationFormData, validateAll: boolean = false) => {
    const newErrors: LocationFormErrors = {};
    
    // Validate address (only if touched or validateAll)
    if (validateAll || touchedFields.has('address')) {
      if (!data.address.trim()) {
        newErrors.address = 'Address is required';
      }
    }
    
    // Validate city (only if touched or validateAll)
    if (validateAll || touchedFields.has('city')) {
      if (!data.city.trim()) {
        newErrors.city = 'City is required';
      }
    }
    
    // Validate state (only if touched or validateAll)
    if (validateAll || touchedFields.has('state')) {
      if (!data.state.trim()) {
        newErrors.state = 'State/Province is required';
      }
    }
    
    // Validate country (only if touched or validateAll)
    if (validateAll || touchedFields.has('country')) {
      if (!data.country.trim()) {
        newErrors.country = 'Country is required';
      }
    }
    
    // Validate zipCode (only if touched or validateAll)
    if (validateAll || touchedFields.has('zipCode')) {
      if (!data.zipCode.trim()) {
        newErrors.zipCode = 'ZIP/Postal code is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LocationFormData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    // Mark field as touched
    setTouchedFields(prev => new Set([...prev, field]));
    
    // Validate only the touched field
    validateForm(newData, false);
  };

  const handleGenerateOtp = async () => {
    console.log('🚀 LOCATION SCREEN: handleContinue() called');
    console.log('🚀 LOCATION SCREEN: Current form data:', formData);
    
    // Mark all fields as touched to show validation errors
    setTouchedFields(new Set(['address', 'city', 'state', 'country', 'zipCode']));
    
    if (!validateForm(formData, true)) {
      return;
    }

    // Check if registration context allows proceeding
    if (!canProceedToNext()) {
      console.error('Cannot proceed: Registration context validation failed');
      return;
    }

    setIsLoading(true);
    try {
      // Data is already saved in context via updateData calls
      console.log('Location data saved to context:', {
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode
      });
      
      // THIS IS WHERE WE MAKE THE REGISTRATION API CALL
      // Registration API now automatically generates and sends OTP
      console.log('🚀 LOCATION SCREEN: Calling submitRegistration (includes OTP generation)...');
      const registrationResult = await submitRegistration();
      
      if (!registrationResult.success) {
        throw new Error(registrationResult.error || 'Registration failed');
      }
      
      console.log('✅ LOCATION SCREEN: Registration successful, OTP automatically sent');
      
      console.log('✅ LOCATION SCREEN: Registration successful, navigating to OTP screen');
      // Navigate to OTP verification screen
      (navigation as any).navigate(ROUTES.OTP_VERIFICATION);
    } catch (error) {
      console.error('❌ LOCATION SCREEN: Registration/OTP generation failed:', error);
      setErrors({ general: error instanceof Error ? error.message : 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
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
            <Text style={styles.title}>LegacyKeep</Text>
            <Text style={styles.subtitle}>{t('auth.location.subtitle')}</Text>
          </View>

          {/* Progress Indicator */}
          <ProgressTracker currentStep={3} totalSteps={4} />

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {/* Address Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('auth.location.addressLabel')}</Text>
                <TextInput
                  style={[styles.input, errors.address && styles.inputError]}
                  placeholder={t('auth.location.addressPlaceholder')}
                  placeholderTextColor={colors.neutral[500]}
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                  autoCapitalize="words"
                />
              </View>

              {/* City Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('auth.location.cityLabel')}</Text>
                <TextInput
                  style={[styles.input, errors.city && styles.inputError]}
                  placeholder={t('auth.location.cityPlaceholder')}
                  placeholderTextColor={colors.neutral[500]}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  autoCapitalize="words"
                />
              </View>

              {/* State Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('auth.location.stateLabel')}</Text>
                <TextInput
                  style={[styles.input, errors.state && styles.inputError]}
                  placeholder={t('auth.location.statePlaceholder')}
                  placeholderTextColor={colors.neutral[500]}
                  value={formData.state}
                  onChangeText={(value) => handleInputChange('state', value)}
                  autoCapitalize="words"
                />
              </View>

              {/* Country Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('auth.location.countryLabel')}</Text>
                <TextInput
                  style={[styles.input, errors.country && styles.inputError]}
                  placeholder={t('auth.location.countryPlaceholder')}
                  placeholderTextColor={colors.neutral[500]}
                  value={formData.country}
                  onChangeText={(value) => handleInputChange('country', value)}
                  autoCapitalize="words"
                />
              </View>

              {/* ZIP Code Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('auth.location.zipCodeLabel')}</Text>
                <TextInput
                  style={[styles.input, errors.zipCode && styles.inputError]}
                  placeholder={t('auth.location.zipCodePlaceholder')}
                  placeholderTextColor={colors.neutral[500]}
                  value={formData.zipCode}
                  onChangeText={(value) => handleInputChange('zipCode', value)}
                  autoCapitalize="characters"
                />
              </View>

            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <GradientButton
            title={t('auth.location.generateOtpButton')}
            onPress={handleGenerateOtp}
            disabled={isLoading}
            gradient="horizontal"
            style={styles.continueButton}
          />
          
          {/* Already have account - below generate OTP button */}
          <View style={styles.signInContainer}>
            <Text style={styles.footerText}>{t('auth.location.alreadyHaveAccount')} </Text>
            <TouchableOpacity onPress={() => (navigation as any).navigate(ROUTES.LOGIN)} activeOpacity={0.7}>
              <GradientText
                gradient="peacock"
                fontSize="md"
                fontWeight="bold"
              >
                {t('auth.location.signIn')}
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
    marginBottom: spacing.lg,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: spacing.lg,
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
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.neutral[900],
    backgroundColor: colors.neutral[50],
  },
  inputError: {
    borderColor: colors.error[500],
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
    color: colors.neutral[600],
    textAlign: 'center',
  },
});

export default LocationScreen;
