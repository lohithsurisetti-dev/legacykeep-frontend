/**
 * Personal Details Screen (Screen 2)
 * 
 * Collects user's date of birth and gender information
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing, gradients } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import { useRegistration } from '../../contexts/RegistrationContext';
import { RegistrationLayout } from '../../components/registration';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getResponsiveComponentSizes, getResponsiveLayout } from '../../utils/responsive';
import { responsiveStyles } from '../../styles/responsiveStyles';

type Props = AuthStackScreenProps<typeof ROUTES.PERSONAL_DETAILS>;

interface PersonalDetailsFormData {
  dateOfBirth: Date | null;
  gender: string;
}

interface PersonalDetailsFormErrors {
  dateOfBirth?: string;
  gender?: string;
}

const PersonalDetailsScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const { data, updateData, canProceedToNext } = useRegistration();
  
  // Map registration context data to local form data for compatibility
  const formData = {
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
  };

  const setFormData = (updates: Partial<PersonalDetailsFormData>) => {
    // Update registration context when form data changes
    const contextUpdates: Partial<typeof data> = {};
    
    if (updates.dateOfBirth !== undefined) contextUpdates.dateOfBirth = updates.dateOfBirth;
    if (updates.gender !== undefined) contextUpdates.gender = updates.gender;
    
    updateData(contextUpdates);
  };
  
  const [errors, setErrors] = useState<PersonalDetailsFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof PersonalDetailsFormData>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showDatePicker) {
      Animated.timing(datePickerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(datePickerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showDatePicker]);

  const validateForm = (data: PersonalDetailsFormData, validateAll: boolean = false) => {
    const newErrors: PersonalDetailsFormErrors = {};
    
    // Validate date of birth (only if touched or validateAll)
    if (validateAll || touchedFields.has('dateOfBirth')) {
      if (!data.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      } else if (data.dateOfBirth > new Date()) {
        newErrors.dateOfBirth = 'Date of birth must be in the past';
      }
    }
    
    // Validate gender (only if touched or validateAll)
    if (validateAll || touchedFields.has('gender')) {
      if (!data.gender) {
        newErrors.gender = 'Please select your gender';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PersonalDetailsFormData, value: any) => {
    console.log('handleInputChange called:', field, value);
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    
    // Mark field as touched
    setTouchedFields(prev => new Set([...prev, field]));
    
    // Validate only the touched field
    validateForm(newData, false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dateOfBirth', selectedDate);
    }
  };

  const handleContinue = async () => {
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
      console.log('Personal details saved to context:', { dateOfBirth: data.dateOfBirth, gender: data.gender });
      
      // Navigate to next screen
      (navigation as any).navigate(ROUTES.LOCATION);
    } catch (error) {
      console.error('Save personal details error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    (navigation as any).goBack();
  };

  const formatDate = (date: Date) => {
    // Get current language from i18n context
    const { currentLanguage } = useLanguage();
    const locale = currentLanguage === 'es' ? 'es-ES' : 
                   currentLanguage === 'fr' ? 'fr-FR' :
                   currentLanguage === 'de' ? 'de-DE' :
                   currentLanguage === 'pt' ? 'pt-PT' :
                   currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
    
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const genderOptions = useMemo(() => [
    { value: 'male', label: t('auth.personalDetails.genderOptions.male') },
    { value: 'female', label: t('auth.personalDetails.genderOptions.female') },
    { value: 'other', label: t('auth.personalDetails.genderOptions.other') },
    { value: 'preferNotToSay', label: t('auth.personalDetails.genderOptions.preferNotToSay') },
  ], [t]);

  return (
    <RegistrationLayout
      subtitle={t('auth.personalDetails.subtitle')}
      onBackPress={handleBack}
      currentStep={2}
      totalSteps={5}
      primaryButtonText={t('auth.personalDetails.continueButton')}
      onPrimaryPress={handleContinue}
      primaryButtonLoading={isLoading}
      primaryButtonDisabled={isLoading}
      onSecondaryPress={() => (navigation as any).navigate(ROUTES.LOGIN)}
    >
      <View style={styles.form}>
              {/* Gender Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('auth.personalDetails.genderLabel')}</Text>
                <View style={styles.genderContainer}>
                  {genderOptions.map((option) => (
                    formData.gender === option.value ? (
                      <LinearGradient
                        key={option.value}
                        colors={gradients.peacock}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.genderOptionGradientWrapper}
                      >
                        <TouchableOpacity
                          style={styles.genderOptionGradientInner}
                          onPress={() => handleInputChange('gender', option.value)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                        >
                          <Text style={styles.genderOptionTextSelected}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    ) : (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.genderOption}
                        onPress={() => handleInputChange('gender', option.value)}
                        activeOpacity={0.7}
                        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                      >
                        <Text style={styles.genderOptionText}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  ))}
                </View>
              </View>

              {/* Date of Birth Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t('auth.personalDetails.dateOfBirthLabel')}</Text>
                <TouchableOpacity
                  style={[styles.dateInput, errors.dateOfBirth && styles.inputError]}
                  onPress={() => setShowDatePicker(!showDatePicker)}
                >
                  <Text style={[
                    styles.dateInputText,
                    !formData.dateOfBirth && styles.placeholderText
                  ]}>
                    {formData.dateOfBirth ? formatDate(formData.dateOfBirth) : t('auth.personalDetails.dateOfBirthPlaceholder')}
                  </Text>
                </TouchableOpacity>
                
                {/* Date Picker Container - Always present to prevent layout shift */}
                <View style={[styles.datePickerContainer, responsiveStyles.datePickerContainer]}>
                  <Animated.View 
                    style={[
                      styles.inlineDatePicker,
                      {
                        opacity: datePickerAnimation,
                        transform: [{
                          translateY: datePickerAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-20, 0],
                          })
                        }]
                      }
                    ]}
                  >
                    <DateTimePicker
                      value={formData.dateOfBirth || new Date()}
                      mode="date"
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        // Don't auto-select, just update the picker value
                        if (selectedDate) {
                          handleInputChange('dateOfBirth', selectedDate);
                        }
                      }}
                      maximumDate={new Date()}
                      style={styles.datePicker}
                    />
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      style={responsiveStyles.datePickerButton}
                    >
                      <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </View>
      </View>
    </RegistrationLayout>
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
  description: {
    fontSize: typography.sizes.md,
    color: colors.neutral[600],
    textAlign: 'center',
    marginTop: spacing.xs,
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
  dateInput: {
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral[50],
  },
  dateInputText: {
    fontSize: typography.sizes.md,
    color: colors.neutral[900],
  },
  placeholderText: {
    color: colors.neutral[500],
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  genderOption: {
    flex: 1,
    minWidth: '45%',
    height: 48, // Fixed height to match selected options
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral[50],
  },
  genderOptionGradientWrapper: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 12,
    padding: 2, // This creates the border width
    height: 48, // Match the height of unselected options
  },
  genderOptionGradientInner: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral[50], // Light background inside the gradient border
  },
  genderOptionText: {
    fontSize: typography.sizes.md,
    color: colors.neutral[700],
    fontWeight: typography.weights.medium,
  },
  genderOptionTextSelected: {
    fontSize: typography.sizes.md,
    color: gradients.peacock[0], // Gradient color for selected text
    fontWeight: typography.weights.semibold,
  },
  inputError: {
    borderColor: colors.error[500],
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.md,
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
  datePickerContainer: {
    minHeight: 280, // Use minHeight instead of fixed height
    maxHeight: 320,
    overflow: 'visible', // Allow content to be visible
    alignItems: 'center',
    justifyContent: 'flex-start', // Start from top instead of center
    paddingVertical: spacing.md,
  },
  inlineDatePicker: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    height: 200,
    width: '100%',
  },
  doneText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary[500],
    color: colors.neutral[50],
    borderRadius: 8,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default PersonalDetailsScreen;
