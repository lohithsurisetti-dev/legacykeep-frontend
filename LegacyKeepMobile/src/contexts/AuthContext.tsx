/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi, tokenStorage } from '../services';

// =============================================================================
// Types
// =============================================================================

export interface User {
  id: string;
  email: string;
  username: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  isLoading: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  setOnboardingComplete: (complete: boolean) => void;
  completeVerification: () => void;
}

export interface RegisterData {
  email?: string;
  phoneNumber?: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  acceptTerms: boolean;
}

// =============================================================================
// Context
// =============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================================================
// Provider Component
// =============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isOnboardingComplete: false,
    isLoading: true,
    user: null,
    accessToken: null,
    refreshToken: null,
  });

  // =============================================================================
  // Initialize Auth State
  // =============================================================================

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Check for stored tokens
      const storedTokens = await tokenStorage.getTokens();
      
      if (storedTokens && !await tokenStorage.isTokenExpired()) {
        // Tokens exist and are valid, get user profile
        try {
          const profileResponse = await authApi.getUserProfile();
          
          if (profileResponse.status === 'success' && profileResponse.data) {
            setAuthState({
              isAuthenticated: true,
              isOnboardingComplete: true,
              isLoading: false,
              user: {
                id: profileResponse.data.id.toString(),
                email: profileResponse.data.email || '',
                username: profileResponse.data.username,
                isEmailVerified: profileResponse.data.isEmailVerified,
                isPhoneVerified: profileResponse.data.isPhoneVerified,
                firstName: profileResponse.data.firstName,
                lastName: profileResponse.data.lastName,
                profilePictureUrl: profileResponse.data.profilePictureUrl,
              },
              accessToken: storedTokens.accessToken,
              refreshToken: storedTokens.refreshToken,
            });
            return;
          }
        } catch (profileError) {
          console.warn('Failed to get user profile, clearing tokens:', profileError);
          await tokenStorage.clearTokens();
        }
      }
      
      // No valid tokens, start unauthenticated
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  // =============================================================================
  // Auth Methods
  // =============================================================================

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Call real login API
      const response = await authApi.login({
        identifier: email,
        password,
        rememberMe: false,
      });

      if (response.status === 'success' && response.data) {
        // Get user profile
        const profileResponse = await authApi.getUserProfile();
        
        if (profileResponse.status === 'success' && profileResponse.data) {
          setAuthState({
            isAuthenticated: true,
            isOnboardingComplete: true,
            isLoading: false,
            user: {
              id: profileResponse.data.id.toString(),
              email: profileResponse.data.email || '',
              username: profileResponse.data.username,
              isEmailVerified: profileResponse.data.isEmailVerified,
              isPhoneVerified: profileResponse.data.isPhoneVerified,
              firstName: profileResponse.data.firstName,
              lastName: profileResponse.data.lastName,
              profilePictureUrl: profileResponse.data.profilePictureUrl,
            },
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });
        } else {
          throw new Error('Failed to get user profile after login');
        }
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Call real registration API
      const response = await authApi.register({
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        acceptTerms: userData.acceptTerms,
      });

      if (response.status === 'success' && response.data) {
        // Registration successful, user needs verification
        setAuthState({
          isAuthenticated: false, // User needs to verify email/phone
          isOnboardingComplete: false,
          isLoading: false,
          user: {
            id: response.data.id.toString(),
            email: response.data.email || '',
            username: response.data.username,
            isEmailVerified: response.data.isEmailVerified,
            isPhoneVerified: response.data.isPhoneVerified,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          },
          accessToken: null,
          refreshToken: null,
        });
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Call logout API (this also clears tokens)
      await authApi.logout();

      // Clear auth state
      setAuthState({
        isAuthenticated: false,
        isOnboardingComplete: false,
        isLoading: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if API fails, clear local state and tokens
      await tokenStorage.clearTokens();
      setAuthState({
        isAuthenticated: false,
        isOnboardingComplete: false,
        isLoading: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      });
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    try {
      // Call token refresh API
      const response = await authApi.refreshToken();
      
      if (response.status === 'success' && response.data) {
        // Update auth state with new token
        setAuthState(prev => ({
          ...prev,
          accessToken: response.data!.accessToken,
        }));
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, logout the user
      await logout();
    }
  };

  const updateUser = (_userData: Partial<User>): void => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ..._userData } : null,
    }));
  };

  const setOnboardingComplete = (_complete: boolean): void => {
    setAuthState(prev => ({
      ...prev,
      isOnboardingComplete: _complete,
    }));
  };

  const completeVerification = (): void => {
    setAuthState(prev => ({
      ...prev,
      isAuthenticated: true,
      isOnboardingComplete: true,
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: prev.user ? { ...prev.user, isEmailVerified: true } : null,
    }));
  };

  // =============================================================================
  // Context Value
  // =============================================================================

  const contextValue: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    refreshAccessToken,
    updateUser,
    setOnboardingComplete,
    completeVerification,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// =============================================================================
// Hook
// =============================================================================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
