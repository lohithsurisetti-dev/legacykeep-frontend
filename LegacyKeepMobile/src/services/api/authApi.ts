/**
 * Auth API Service
 * 
 * Handles all authentication-related API calls
 */

import { apiClient } from './client';
import { environmentManager } from '../../config';
import { tokenStorage } from '../storage/tokenStorage';
import { ApiResponse } from '../types/api';
import {
  LoginRequest,
  JwtTokenResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  EmailVerificationRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UserProfile,
} from '../types/auth';

// =============================================================================
// Auth API Service Class
// =============================================================================

class AuthApiService {
  private client = apiClient.getClient('auth');

  /**
   * User Login
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<JwtTokenResponse>> {
    const config = environmentManager.getConfig();
    
    // Use mock in development if enabled
    if (config.mock.enableMockAuth && config.app.environment === 'development') {
      return this.mockLogin(credentials);
    }

    try {
      const response = await this.client.post<ApiResponse<JwtTokenResponse>>('/auth/login', credentials);
      
      // Store tokens if login successful
      if (response.data.status === 'success' && response.data.data) {
        await tokenStorage.storeTokens({
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
          expiresIn: response.data.data.expiresIn,
          userId: response.data.data.userId,
        });
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Login failed');
    }
  }

  /**
   * User Registration
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const config = environmentManager.getConfig();
    console.log('🚀 AUTH API: register() called with:', JSON.stringify(userData, null, 2));
    console.log('🚀 AUTH API: Mock enabled?', config.mock.enableMockAuth);
    console.log('🚀 AUTH API: Environment:', config.app.environment);
    
    if (config.mock.enableMockAuth && config.app.environment === 'development') {
      console.log('🚀 AUTH API: Using mock registration');
      return this.mockRegister(userData);
    }

    try {
      console.log('🚀 AUTH API: Making real API call to /auth/register');
      const response = await this.client.post<ApiResponse<RegisterResponse>>('/auth/register', userData);
      console.log('✅ AUTH API: Register response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Registration failed');
    }
  }

  /**
   * Refresh Access Token
   */
  async refreshToken(): Promise<ApiResponse<JwtTokenResponse>> {
    try {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const request: RefreshTokenRequest = { refreshToken };
      const response = await this.client.post<ApiResponse<JwtTokenResponse>>('/auth/refresh', request);
      
      // Update stored tokens
      if (response.data.status === 'success' && response.data.data) {
        await tokenStorage.updateAccessToken(
          response.data.data.accessToken,
          response.data.data.expiresIn
        );
      }
      
      return response.data;
    } catch (error) {
      // Clear tokens on refresh failure
      await tokenStorage.clearTokens();
      throw this.handleError(error, 'Token refresh failed');
    }
  }

  /**
   * User Logout
   */
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.post<ApiResponse<void>>('/auth/logout');
      
      // Clear stored tokens regardless of API response
      await tokenStorage.clearTokens();
      
      return response.data;
    } catch (error) {
      // Clear tokens even if logout API fails
      await tokenStorage.clearTokens();
      throw this.handleError(error, 'Logout failed');
    }
  }

  /**
   * Verify Email (Legacy - using verification token)
   */
  async verifyEmail(request: EmailVerificationRequest): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.post<ApiResponse<void>>('/auth/verify-email', request);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Email verification failed');
    }
  }

  /**
   * Generate OTP for email verification (New primary method)
   */
  async generateOtp(email: string): Promise<ApiResponse<void>> {
    console.log('🚀 AUTH API: generateOtp() called for email:', email);
    try {
      console.log('🚀 AUTH API: Making real API call to /auth/generate-otp');
      const response = await this.client.post<ApiResponse<void>>(`/auth/generate-otp?email=${encodeURIComponent(email)}`);
      console.log('✅ AUTH API: GenerateOtp response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'OTP generation failed');
    }
  }

  /**
   * Verify OTP code (now registers new users and returns tokens)
   */
  async verifyOtp(
    email: string,
    otpCode: string,
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string
  ): Promise<ApiResponse<RegisterResponse>> {
    console.log('🚀 AUTH API: verifyOtp() called for email:', email, 'code:', otpCode);
    try {
      console.log('🚀 AUTH API: Making real API call to /auth/verify-otp');
      const payload: any = { email, otpCode };
      if (username) payload.username = username;
      if (password) payload.password = password;
      if (firstName) payload.firstName = firstName;
      if (lastName) payload.lastName = lastName;

      const response = await this.client.post<ApiResponse<RegisterResponse>>('/auth/verify-otp', payload);
      console.log('✅ AUTH API: VerifyOtp response:', JSON.stringify(response.data, null, 2));

      // Store tokens if present
      if (response.data?.data?.accessToken && response.data?.data?.refreshToken) {
        await tokenStorage.storeTokens({
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
          expiresIn: response.data.data.expiresIn || 900,
          refreshExpiresIn: response.data.data.refreshExpiresIn || 2592000,
        });
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'OTP verification failed');
    }
  }

  /**
   * Resend OTP code
   */
  async resendOtp(email: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.post<ApiResponse<void>>(`/auth/resend-otp?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to resend OTP');
    }
  }

  /**
   * Resend Email Verification
   */
  async resendEmailVerification(email: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.post<ApiResponse<void>>('/auth/resend-verification', {
        type: 'email',
        identifier: email,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to resend verification email');
    }
  }

  /**
   * Forgot Password
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.post<ApiResponse<void>>('/auth/forgot-password', request);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Password reset request failed');
    }
  }

  /**
   * Reset Password
   */
  async resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.post<ApiResponse<void>>('/auth/reset-password', request);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Password reset failed');
    }
  }

  /**
   * Change Password
   */
  async changePassword(request: ChangePasswordRequest): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.post<ApiResponse<void>>('/auth/change-password', request);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Password change failed');
    }
  }

  /**
   * Get User Profile
   */
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await this.client.get<ApiResponse<UserProfile>>('/users/profile');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to get user profile');
    }
  }

  /**
   * Update User Profile
   */
  async updateUserProfile(profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await this.client.put<ApiResponse<UserProfile>>('/users/profile', profile);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to update user profile');
    }
  }

  /**
   * Validate Username Availability
   */
  async validateUsername(username: string): Promise<ApiResponse<{ available: boolean }>> {
    try {
      const response = await this.client.get<ApiResponse<{ available: boolean }>>(`/auth/validate/username/${encodeURIComponent(username)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Username validation failed');
    }
  }

  /**
   * Validate Email Availability
   */
  async validateEmail(email: string): Promise<ApiResponse<{ available: boolean }>> {
    try {
      const response = await this.client.get<ApiResponse<{ available: boolean }>>(`/auth/validate/email/${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Email validation failed');
    }
  }

  /**
   * Validate Phone Number Availability
   */
  async validatePhone(phoneNumber: string): Promise<ApiResponse<{ available: boolean }>> {
    try {
      const response = await this.client.get<ApiResponse<{ available: boolean }>>(`/auth/validate/phone/${encodeURIComponent(phoneNumber)}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Phone validation failed');
    }
  }

  /**
   * Bulk Validation for Username, Email, and Phone
   */
  async validateBulk(data: { username?: string; email?: string; phoneNumber?: string }): Promise<ApiResponse<{ username?: { available: boolean }; email?: { available: boolean }; phoneNumber?: { available: boolean } }>> {
    try {
      const response = await this.client.post<ApiResponse<{ username?: { available: boolean }; email?: { available: boolean }; phoneNumber?: { available: boolean } }>>('/auth/validate/bulk', data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Bulk validation failed');
    }
  }

  // =============================================================================
  // Mock Implementations for Development
  // =============================================================================

  private async mockLogin(credentials: LoginRequest): Promise<ApiResponse<JwtTokenResponse>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate login validation
    if (credentials.password.length < 6) {
      throw new Error('Invalid credentials');
    }

    const mockResponse: ApiResponse<JwtTokenResponse> = {
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: 'mock-access-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        tokenType: 'Bearer',
        expiresIn: 900, // 15 minutes
        refreshExpiresIn: 604800, // 7 days
        userId: 1,
        email: credentials.identifier.includes('@') ? credentials.identifier : 'mock@example.com',
        username: credentials.identifier.includes('@') ? 'mockuser' : credentials.identifier,
        roles: ['USER'],
      },
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };

    // Store mock tokens
    if (mockResponse.data) {
      await tokenStorage.storeTokens({
        accessToken: mockResponse.data.accessToken,
        refreshToken: mockResponse.data.refreshToken,
        expiresIn: mockResponse.data.expiresIn,
        userId: mockResponse.data.userId,
      });
    }

    return mockResponse;
  }

  private async mockRegister(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate validation
    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const mockResponse: ApiResponse<RegisterResponse> = {
      status: 'success',
      message: 'Registration successful',
      data: {
        id: Math.floor(Math.random() * 1000),
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isEmailVerified: false,
        isPhoneVerified: false,
        status: 'PENDING_VERIFICATION',
        createdAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      statusCode: 201,
    };

    return mockResponse;
  }

  // =============================================================================
  // Error Handling
  // =============================================================================

  private handleError(error: any, defaultMessage: string): Error {
    const config = environmentManager.getConfig();
    
    if (config.app.debugMode) {
      console.error('Auth API Error:', error);
    }

    // If error is already processed by HTTP client, return as is
    if (error instanceof Error) {
      return error;
    }

    // Return user-friendly error based on environment
    if (config.app.environment === 'production') {
      return new Error(defaultMessage);
    } else {
      return new Error(`${defaultMessage}: ${error.message || 'Unknown error'}`);
    }
  }
}

// =============================================================================
// Export singleton instance
// =============================================================================

export const authApi = new AuthApiService();
export default authApi;
