/**
 * Auth API Types
 * 
 * Type definitions for authentication-related API calls
 * These mirror the backend DTOs exactly
 */

// =============================================================================
// Login Types
// =============================================================================

export interface LoginRequest {
  identifier: string; // email or username
  password: string;
  rememberMe?: boolean;
}

export interface JwtTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshExpiresIn: number;
  userId: number;
  email: string;
  username: string;
  roles: string[];
  sessionId?: number;
  rememberMe?: boolean;
  issuedAt?: string;
  expiresAt?: string;
  refreshExpiresAt?: string;
  deviceInfo?: string;
  ipAddress?: string;
  location?: string;
}

// =============================================================================
// Registration Types
// =============================================================================

export interface RegisterRequest {
  username: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptTerms: boolean;
  acceptMarketing?: boolean;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  
  // JWT Tokens for immediate authentication
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  refreshExpiresIn?: number;
}

// =============================================================================
// Token Management Types
// =============================================================================

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  expiresAt?: string;
  userId?: number;
}

// =============================================================================
// User Profile Types
// =============================================================================

export interface UserProfile {
  id: number;
  username: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// Verification Types
// =============================================================================

export interface EmailVerificationRequest {
  email: string;
  verificationCode: string;
}

export interface PhoneVerificationRequest {
  phoneNumber: string;
  verificationCode: string;
}

export interface ResendVerificationRequest {
  type: 'email' | 'phone';
  identifier: string;
}

// =============================================================================
// Password Management Types
// =============================================================================

export interface ForgotPasswordRequest {
  identifier: string; // email or username
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// =============================================================================
// Auth Context Types (for frontend state)
// =============================================================================

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: Date | null;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationData {
  email?: string;
  phoneNumber?: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  acceptTerms: boolean;
}
