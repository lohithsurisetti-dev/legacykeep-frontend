/**
 * Registration Data Context
 * 
 * Manages registration data across multiple screens
 * Orchestrates multi-API calls for complete registration
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authApi, userApi } from '../services';

// =============================================================================
// Types
// =============================================================================

export interface RegistrationData {
  // Email/Phone Info (Screen 1 - New)
  email?: string;
  phoneNumber?: string;
  
  // Basic Registration Info (Screen 2)
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
  
  // Personal Details (Screen 3)
  dateOfBirth: Date | null;
  gender: string;
  
  // Location Info (Screen 4)
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  
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
  confirmPassword: '',
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
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
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
      case 1: // Email/Phone (New first step)
        return !!(
          data.email?.trim() || data.phoneNumber?.trim()
        );
      
      case 2: // Basic Registration
        return !!(
          data.firstName.trim() &&
          data.lastName.trim() &&
          data.username.trim() &&
          data.password.trim() &&
          data.confirmPassword.trim() &&
          data.password === data.confirmPassword &&
          data.acceptTerms
        );
      
      case 3: // Personal Details
        return !!(
          data.dateOfBirth &&
          data.gender.trim()
        );
      
      case 4: // Location
        return !!(
          data.city.trim() &&
          data.state.trim() &&
          data.country.trim()
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
      console.log('🚀 REGISTRATION: Starting submitRegistration...');
      console.log('🚀 REGISTRATION: Current data:', JSON.stringify(data, null, 2));
      
      setData(prev => ({ ...prev, isSubmitting: true, errors: {} }));

      // Step 1: Create auth account (basic registration)
      console.log('🚀 REGISTRATION: Calling authApi.register...');
      
      // Prepare registration data - only send email OR phone, not both
      const registrationData: any = {
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        acceptTerms: data.acceptTerms,
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
      const authResponse = await authApi.register(registrationData);
      
      console.log('🚀 REGISTRATION: Auth API response:', JSON.stringify(authResponse, null, 2));

      if (authResponse.status !== 'success' || !authResponse.data) {
        console.error('❌ REGISTRATION: Auth API failed:', authResponse.message);
        throw new Error(authResponse.message || 'Registration failed');
      }

      const userId = authResponse.data.id;

      // Update progress
      setData(prev => ({
        ...prev,
        registrationProgress: {
          ...prev.registrationProgress,
          authCompleted: true,
        },
      }));

      // Step 2: Create user profile (personal details + location)
      console.log('🚀 REGISTRATION: Calling userApi.updateProfile...');
      try {
        await userApi.updateProfile({
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

      setData(prev => ({ ...prev, isSubmitting: false }));
      
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
      await authApi.generateOtp(data.email);
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
      await authApi.verifyOtp(data.email, otpCode);
      console.log('✅ OTP: OTP verified successfully');
      
      // Registration is now complete!
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
