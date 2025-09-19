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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing } from '../../constants';
import { authTexts } from '../../constants/texts';
import { BackButton, GradientButton, ProgressTracker, GradientText } from '../../components/ui';

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
}

const LocationScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState<LocationFormData>({
    city: '',
    state: '',
    country: '',
  });
  
  const [errors, setErrors] = useState<LocationFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof LocationFormData>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (data: LocationFormData, validateAll: boolean = false) => {
    const newErrors: LocationFormErrors = {};
    
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
    // Mark all fields as touched to show validation errors
    setTouchedFields(new Set(['city', 'state', 'country']));
    
    if (!validateForm(formData, true)) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Save location data and generate OTP
      console.log('Location data:', formData);
      
      // Navigate to OTP verification screen
      (navigation as any).navigate(ROUTES.OTP_VERIFICATION);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate OTP. Please try again.');
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
            <Text style={styles.title}>{authTexts.location.title}</Text>
            <Text style={styles.subtitle}>{authTexts.location.subtitle}</Text>
          </View>

          {/* Progress Indicator */}
          <ProgressTracker currentStep={3} totalSteps={4} />

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {/* City Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{authTexts.location.cityLabel}</Text>
                <TextInput
                  style={[styles.input, errors.city && styles.inputError]}
                  placeholder={authTexts.location.cityPlaceholder}
                  placeholderTextColor={colors.neutral[500]}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                  autoCapitalize="words"
                />
              </View>

              {/* State Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{authTexts.location.stateLabel}</Text>
                <TextInput
                  style={[styles.input, errors.state && styles.inputError]}
                  placeholder={authTexts.location.statePlaceholder}
                  placeholderTextColor={colors.neutral[500]}
                  value={formData.state}
                  onChangeText={(value) => handleInputChange('state', value)}
                  autoCapitalize="words"
                />
              </View>

              {/* Country Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{authTexts.location.countryLabel}</Text>
                <TextInput
                  style={[styles.input, errors.country && styles.inputError]}
                  placeholder={authTexts.location.countryPlaceholder}
                  placeholderTextColor={colors.neutral[500]}
                  value={formData.country}
                  onChangeText={(value) => handleInputChange('country', value)}
                  autoCapitalize="words"
                />
              </View>

            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <GradientButton
            title={authTexts.location.generateOtpButton}
            onPress={handleGenerateOtp}
            disabled={isLoading}
            style={styles.generateOtpButton}
          />
          
          {/* Already have account - below generate OTP button */}
          <View style={styles.signInContainer}>
            <Text style={styles.footerText}>{authTexts.location.alreadyHaveAccount} </Text>
            <TouchableOpacity onPress={() => (navigation as any).navigate(ROUTES.LOGIN)} activeOpacity={0.7}>
              <GradientText
                gradient="peacock"
                fontSize="md"
                fontWeight="bold"
              >
                {authTexts.location.signIn}
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
  generateOtpButton: {
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
