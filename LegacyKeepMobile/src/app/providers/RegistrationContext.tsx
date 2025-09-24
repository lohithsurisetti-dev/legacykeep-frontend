/**
 * Registration Data Context
 * 
 * Manages registration data across multiple screens
 * Orchestrates multi-API calls for complete registration
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authService, userService, tokenStorage } from '../../shared/services';

// =============================================================================
// Types
// =============================================================================

export interface RegistrationData {
  // Basic Registration Info (Screen 1)
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
  
  // Personal Details (Screen 2)
  dateOfBirth: Date | null;
  gender: string;
  
  // Location Info (Screen 3)
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  
  // Email/Phone Info (Screen 4 - Moved after location)
  email?: string;
  phoneNumber?: string;
  
  // Registration State
  currentStep: number;
  isSubmitting: boolean;
  errors: Record<string, string>;
  registrationProgress: {
    authCompleted: boolean;
    profileCompleted: boolean;
    locationCompleted: boolean;
    otpSent: boolean;
  };
  accountCreated: boolean; // Track if account is already created
}

export interface RegistrationContextType {
  data: RegistrationData;
  updateData: (updates: Partial<RegistrationData>) => void;
  updateStep: (step: number) => void;
  setEmailOrPhone: (email: string, phoneNumber: string) => void;
  submitRegistration: () => Promise<{ success: boolean; userId?: number; error?: string }>;
  generateOtp: () => Promise<void>;
  verifyOtp: (otpCode: string) => Promise<void>;
  resetRegistration: () => void;
  canProceedToNext: () => boolean;
  getStepValidation: (step: number) => boolean;
}

// =============================================================================
// Initial State
// =============================================================================

const initialRegistrationData: RegistrationData = {
  // Basic Info
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  password: '',
  acceptTerms: false,
  acceptMarketing: false,
  
  // Personal Details
  dateOfBirth: null,
  gender: '',
  
  // Location
  address: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  
  // State
  currentStep: 1,
  isSubmitting: false,
  errors: {},
  accountCreated: false,
  registrationProgress: {
    authCompleted: false,
    profileCompleted: false,
    locationCompleted: false,
    otpSent: false,
  },
};

// =============================================================================
// Context
// =============================================================================

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// =============================================================================
// Provider Component
// =============================================================================

interface RegistrationProviderProps {
  children: ReactNode;
  onVerificationComplete?: () => void;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children, onVerificationComplete }) => {
  const [data, setData] = useState<RegistrationData>(initialRegistrationData);

  // =============================================================================
  // Data Management
  // =============================================================================

  const updateData = (updates: Partial<RegistrationData>) => {
    setData(prev => ({
      ...prev,
      ...updates,
      errors: {}, // Clear errors when updating data
    }));
  };

  const updateStep = (step: number) => {
    setData(prev => ({
      ...prev,
      currentStep: step,
    }));
  };

  const setEmailOrPhone = (email: string, phoneNumber: string) => {
    setData(prev => ({
      ...prev,
      email: email || undefined,
      phoneNumber: phoneNumber || undefined,
    }));
  };

  const resetRegistration = () => {
    setData(initialRegistrationData);
  };

  // =============================================================================
  // Validation
  // =============================================================================

  const getStepValidation = (step: number): boolean => {
    switch (step) {
      case 1: // Basic Registration
        return !!(
          data.firstName.trim() &&
          data.lastName.trim() &&
          data.username.trim() &&
          data.password.trim()
        );
      
      case 2: // Personal Details
        return !!(
          data.dateOfBirth &&
          data.gender.trim()
        );
      
      case 3: // Location
        return !!(
          data.city.trim() &&
          data.state.trim() &&
          data.country.trim()
        );
      
      case 4: // Email/Phone (Moved after location)
        return !!(
          data.email?.trim() || data.phoneNumber?.trim()
        );
      
      default:
        return false;
    }
  };

  const canProceedToNext = (): boolean => {
    return getStepValidation(data.currentStep);
  };

  // =============================================================================
  // API Orchestration
  // =============================================================================

  const submitRegistration = async (): Promise<{ success: boolean; userId?: number; error?: string }> => {
    try {
      // Check if account is already created
      if (data.accountCreated) {
        console.log('✅ REGISTRATION: Account already created, skipping...');
        return { success: true, userId: 1 }; // Return success without creating again
      }

      console.log('🚀 REGISTRATION: Starting submitRegistration...');
      console.log('🚀 REGISTRATION: Current data:', JSON.stringify(data, null, 2));
      
      setData(prev => ({ ...prev, isSubmitting: true, errors: {} }));

      // Step 1: Create auth account (basic registration)
      console.log('🚀 REGISTRATION: Calling authService.register...');
      
      // Prepare registration data - only send email OR phone, not both
      const registrationData: any = {
        username: data.username,
        password: data.password,
        confirmPassword: data.password, // Use same password for confirmation
        firstName: data.firstName,
        lastName: data.lastName,
        acceptTerms: true, // User agrees by clicking continue
        acceptMarketing: data.acceptMarketing,
      };
      
      // Add email if provided (email registration)
      if (data.email && data.email.trim()) {
        registrationData.email = data.email;
      }
      
      // Add phone if provided (phone registration)
      if (data.phoneNumber && data.phoneNumber.trim()) {
        registrationData.phoneNumber = data.phoneNumber;
      }
      
      console.log('🚀 REGISTRATION: Registration data:', JSON.stringify(registrationData, null, 2));
      const authResponse = await authService.register(registrationData);
      
      console.log('🚀 REGISTRATION: Auth API response:', JSON.stringify(authResponse, null, 2));

      if (authResponse.status !== 'success' || !authResponse.data) {
        console.error('❌ REGISTRATION: Auth API failed:', authResponse.message);
        throw new Error(authResponse.message || 'Registration failed');
      }

      const userId = authResponse.data.id;
      
      // Store JWT tokens if provided by the registration response
      if (authResponse.data.accessToken && authResponse.data.refreshToken) {
        console.log('🚀 REGISTRATION: Storing JWT tokens from registration response');
        try {
          await tokenStorage.storeTokens({
            accessToken: authResponse.data.accessToken,
            refreshToken: authResponse.data.refreshToken,
            expiresIn: authResponse.data.expiresIn || 900, // Default 15 minutes
            refreshExpiresIn: authResponse.data.refreshExpiresIn || 2592000, // Default 30 days
          });
          console.log('✅ REGISTRATION: JWT tokens stored successfully');
        } catch (tokenError) {
          console.warn('Failed to store JWT tokens from registration:', tokenError);
          // Don't fail registration if token storage fails
        }
      } else {
        console.warn('⚠️ REGISTRATION: No JWT tokens received from registration response');
      }

      // Update progress
      setData(prev => ({
        ...prev,
        registrationProgress: {
          ...prev.registrationProgress,
          authCompleted: true,
        },
      }));

      // Step 2: Create user profile (personal details + location)
      console.log('🚀 REGISTRATION: Calling userService.createProfile...');
      try {
        await userService.createProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth?.toISOString().split('T')[0], // Convert to YYYY-MM-DD
          city: data.city,
          state: data.state,
          country: data.country,
        });
        
        setData(prev => ({
          ...prev,
          registrationProgress: {
            ...prev.registrationProgress,
            profileCompleted: true,
            locationCompleted: true,
          },
        }));
      } catch (profileError) {
        console.warn('Profile creation failed, continuing with auth only:', profileError);
        // Don't fail the entire registration if profile creation fails
      }

      // Location data is now handled in Step 2 (user profile)

      setData(prev => ({ 
        ...prev, 
        isSubmitting: false,
        accountCreated: true, // Mark account as created
      }));
      
      // Update authentication state to reflect successful registration
      console.log('🚀 REGISTRATION: Updating authentication state...');
      onVerificationComplete?.();
      console.log('✅ REGISTRATION: Authentication state updated');
      
      return { success: true, userId };
      
    } catch (error) {
      setData(prev => ({
        ...prev,
        isSubmitting: false,
        errors: { general: error instanceof Error ? error.message : 'Registration failed' },
      }));
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  };

  const generateOtp = async (): Promise<void> => {
    try {
      // For now, OTP is only supported for email registration
      // TODO: Add SMS OTP support for phone registration
      if (!data.email || !data.email.trim()) {
        throw new Error('Email is required for OTP verification. Phone OTP not yet supported.');
      }

      console.log('🚀 OTP: Generating OTP for email:', data.email);
      await authService.generateOtp(data.email);
      console.log('✅ OTP: OTP generated successfully');
      
      setData(prev => ({
        ...prev,
        registrationProgress: {
          ...prev.registrationProgress,
          otpSent: true,
        },
      }));
    } catch (error) {
      throw error;
    }
  };

  const verifyOtp = async (otpCode: string): Promise<void> => {
    try {
      // For now, OTP verification is only supported for email
      if (!data.email || !data.email.trim()) {
        throw new Error('Email is required for OTP verification. Phone OTP not yet supported.');
      }

      console.log('🚀 OTP: Verifying OTP for email:', data.email, 'code:', otpCode);
      const verifyResp = await authService.verifyOtp({
        email: data.email!,
        otpCode,
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log('✅ OTP: OTP verified (and registered if new):', JSON.stringify(verifyResp, null, 2));

      // Store JWT tokens from verification response
      if (verifyResp.status === 'success' && verifyResp.data?.accessToken && verifyResp.data?.refreshToken) {
        console.log('🚀 OTP: Storing JWT tokens from verification response');
        console.log('🚀 OTP: Access token (first 20 chars):', verifyResp.data.accessToken.substring(0, 20) + '...');
        console.log('🚀 OTP: Refresh token (first 20 chars):', verifyResp.data.refreshToken.substring(0, 20) + '...');
        console.log('🚀 OTP: User ID:', verifyResp.data.id);
        
        try {
          await tokenStorage.storeTokens({
            accessToken: verifyResp.data.accessToken,
            refreshToken: verifyResp.data.refreshToken,
            expiresIn: verifyResp.data.expiresIn ?? 900,
            refreshExpiresIn: verifyResp.data.refreshExpiresIn ?? 2592000,
            userId: verifyResp.data.id,
          });
          console.log('✅ OTP: JWT tokens stored successfully');
        } catch (tokenStorageError) {
          console.error('❌ OTP: Failed to store tokens:', tokenStorageError);
          throw new Error('Failed to store authentication tokens');
        }
        
        // Verify token was stored correctly
        const storedToken = await tokenStorage.getAccessToken();
        console.log('🔍 OTP: Retrieved stored token (first 20 chars):', storedToken ? storedToken.substring(0, 20) + '...' : 'null');
        
        // Small delay to ensure token is fully stored
        await new Promise(resolve => setTimeout(resolve, 100));
      } else {
        throw new Error('Authentication tokens missing from verify-otp response');
      }

      // Create user profile before navigating
      try {
        console.log('🚀 OTP: Creating user profile after token receipt...');
        
        // Double-check token before making profile call
        const tokenBeforeProfile = await tokenStorage.getAccessToken();
        console.log('🔍 OTP: Token before profile call (first 20 chars):', tokenBeforeProfile ? tokenBeforeProfile.substring(0, 20) + '...' : 'null');
        
        const profileData = {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth?.toISOString().split('T')[0],
          city: data.city,
          state: data.state,
          country: data.country,
        };
        console.log('🚀 OTP: Profile data being sent:', JSON.stringify(profileData, null, 2));
        
        const profileResponse = await userService.createProfile(profileData);
        console.log('✅ OTP: User profile created successfully:', JSON.stringify(profileResponse, null, 2));
        
        setData(prev => ({
          ...prev,
          registrationProgress: {
            ...prev.registrationProgress,
            profileCompleted: true,
            locationCompleted: true,
          },
        }));
      } catch (profileErr: any) {
        console.error('❌ OTP: Profile creation failed:', profileErr);
        console.error('❌ OTP: Profile error details:', {
          message: profileErr.message,
          stack: profileErr.stack,
          response: profileErr.response?.data,
          status: profileErr.response?.status,
        });
        throw profileErr; // Re-throw to stop the flow and show the error
      }

      // Mark account created and auth complete in context and Auth state
      setData(prev => ({
        ...prev,
        accountCreated: true,
      }));
      onVerificationComplete?.();
      
      // Registration is now complete!
      setData(prev => ({
        ...prev,
        registrationProgress: {
          ...prev.registrationProgress,
          otpSent: true,
          authCompleted: true,
        },
      }));
    } catch (error) {
      throw error;
    }
  };

  // =============================================================================
  // Context Value
  // =============================================================================

  const contextValue: RegistrationContextType = {
    data,
    updateData,
    updateStep,
    setEmailOrPhone,
    submitRegistration,
    generateOtp,
    verifyOtp,
    resetRegistration,
    canProceedToNext,
    getStepValidation,
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
    </RegistrationContext.Provider>
  );
};

// =============================================================================
// Hook
// =============================================================================

export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
