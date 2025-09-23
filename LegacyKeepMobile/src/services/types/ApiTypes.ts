/**
 * API Types
 * 
 * Comprehensive type definitions for all API services
 */

// =============================================================================
// Base API Types
// =============================================================================

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data: T;
  timestamp: string;
  error?: string | null;
  statusCode: number;
  path?: string | null;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// =============================================================================
// Authentication Types
// =============================================================================

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
  acceptMarketing?: boolean;
}

export interface OtpVerificationRequest {
  email: string;
  otpCode: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface JwtTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface RegisterResponse {
  id: number;
  email: string;
  username: string;
  status: string;
  emailVerified: boolean;
  registeredAt: string;
  message: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UsernameValidationRequest {
  username: string;
}

export interface UsernameValidationResponse {
  available: boolean;
  field: string;
  value: string;
}

// =============================================================================
// User Profile Types
// =============================================================================

export interface UserProfile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  displayName: string;
  bio?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  timezone: string;
  language: string;
  profilePictureUrl?: string;
  profilePictureThumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  age?: number;
  public: boolean;
  complete: boolean;
}

export interface CreateProfileRequest {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  timezone?: string;
  language?: string;
}

export interface UpdateProfileRequest extends Partial<CreateProfileRequest> {
  id: number;
}

// =============================================================================
// Notification Types
// =============================================================================

export interface Notification {
  id: number;
  userId: number;
  type: string;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

// =============================================================================
// Mock Response Types (for development)
// =============================================================================

export interface MockConfig {
  enableMockAuth: boolean;
  enableMockUser: boolean;
  enableMockNotification: boolean;
  mockDelay?: number;
}

// =============================================================================
// Error Types
// =============================================================================

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiErrorResponse {
  status: 'error';
  message: string;
  error: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  validationErrors?: ValidationError[];
}
