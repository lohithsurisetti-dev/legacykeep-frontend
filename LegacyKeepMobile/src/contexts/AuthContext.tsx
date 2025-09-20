/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
      // TODO: Check for stored tokens and user data
      // For now, we'll start with no authentication
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

  const login = async (_email: string, _password: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // TODO: Implement actual login API call
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: '1',
        email: _email,
        username: 'testuser',
        isEmailVerified: true,
        isPhoneVerified: false,
        firstName: 'Test',
        lastName: 'User',
      };

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      setAuthState({
        isAuthenticated: true,
        isOnboardingComplete: true, // Skip onboarding for testing
        isLoading: false,
        user: mockUser,
        accessToken: mockTokens.accessToken,
        refreshToken: mockTokens.refreshToken,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (_userData: RegisterData): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // TODO: Implement actual registration API call
      // For now, we'll simulate a successful registration
      const mockUser: User = {
        id: '1',
        email: _userData.email || '',
        username: _userData.username,
        isEmailVerified: false,
        isPhoneVerified: false,
        firstName: _userData.firstName,
        lastName: _userData.lastName,
      };

      setAuthState({
        isAuthenticated: false, // User needs to verify email/phone
        isOnboardingComplete: false,
        isLoading: false,
        user: mockUser,
        accessToken: null,
        refreshToken: null,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // TODO: Implement actual logout API call
      // Clear stored tokens and user data

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
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const refreshAccessToken = async (): Promise<void> => {
    try {
      // TODO: Implement actual token refresh API call
      console.log('Refreshing access token...');
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
