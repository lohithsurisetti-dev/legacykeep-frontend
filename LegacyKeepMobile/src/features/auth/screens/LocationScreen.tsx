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
import { AuthStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing, LAYOUT } from '../../../shared/constants';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { useRegistration } from '../../../app/providers/RegistrationContext';
import { BackButton, GradientButton, ProgressTracker, GradientText } from '../../../shared/components/ui';
import { RegistrationLayout } from '../../../shared/components/layout';

type Props = AuthStackScreenProps<typeof ROUTES.LOCATION>;

interface LocationFormData {
  city: string;
  state: string;
  country: string;
}

interface LocationFormErrors {
  city?: string;
  state?: string;
  country?: string;
  general?: string;
}

const LocationScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const { data, updateData, canProceedToNext, submitRegistration } = useRegistration();
  
  // Map registration context data to local form data for compatibility
  const formData = {
    city: data.city,
    state: data.state,
    country: data.country,
  };

  const setFormData = (updates: Partial<LocationFormData>) => {
    // Update registration context when form data changes
    const contextUpdates: Partial<typeof data> = {};
    
    if (updates.city !== undefined) contextUpdates.city = updates.city;
    if (updates.state !== undefined) contextUpdates.state = updates.state;
    if (updates.country !== undefined) contextUpdates.country = updates.country;
    
    updateData(contextUpdates);
  };
  
  const [errors, setErrors] = useState<LocationFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof LocationFormData>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (data: LocationFormData, validateAll: boolean = false) => {
    const newErrors: LocationFormErrors = {};
    
    // Address is now optional - no validation needed
    
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
    
    // ZIP/Postal code is now optional - no validation needed
    
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
    
    // Mark only required fields as touched to show validation errors
    setTouchedFields(new Set(['city', 'state', 'country']));
    
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
        city: data.city,
        state: data.state,
        country: data.country
      });
      
      console.log('✅ LOCATION SCREEN: Location data saved, navigating to Email/Phone screen');
      // Navigate to Email/Phone screen for verification
      (navigation as any).navigate(ROUTES.EMAIL_PHONE);
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
    <RegistrationLayout
      subtitle={t('auth.location.subtitle')}
      onBackPress={handleBack}
      currentStep={3}
      totalSteps={5}
      primaryButtonText="Continue"
      onPrimaryPress={handleGenerateOtp}
      primaryButtonLoading={isLoading}
      primaryButtonDisabled={isLoading}
      onSecondaryPress={() => (navigation as any).navigate(ROUTES.LOGIN)}
    >
      <View style={styles.form}>
        {/* City Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t('auth.location.cityLabel')}</Text>
          <TextInput
            style={[styles.input, errors.city && styles.inputError]}
            placeholder=""
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
            placeholder=""
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
            placeholder=""
            placeholderTextColor={colors.neutral[500]}
            value={formData.country}
            onChangeText={(value) => handleInputChange('country', value)}
            autoCapitalize="words"
          />
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
});

export default LocationScreen;
