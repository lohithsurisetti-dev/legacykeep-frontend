/**
 * Authentication Service
 * 
 * Clean, modern authentication API service with proper error handling
 */

import { httpClient } from './HttpClient';
import { tokenStorage } from '../storage/tokenStorage';
import { getApiConfig } from '../config/apiConfig';
import { getEndpointPath, buildEndpointUrl } from '../config/endpoints';
import { ApiError, ErrorCode } from '../errors/ApiError';
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  OtpVerificationRequest,
  JwtTokenResponse,
  RegisterResponse,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UsernameValidationRequest,
  UsernameValidationResponse,
} from '../types/ApiTypes';

/**
 * Authentication API Service
 */
export class AuthService {
  private config = getApiConfig();

  /**
   * User Login
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<JwtTokenResponse>> {
    if (this.config.enableMock) {
      return this.mockLogin(credentials);
    }

    const response = await httpClient.post<ApiResponse<JwtTokenResponse>>(
      'auth',
      getEndpointPath('auth', 'login'),
      credentials
    );

    // Store tokens if login successful
    if (response.status === 'success' && response.data) {
      await this.storeTokens(response.data);
    }

    return response;
  }

  /**
   * User Registration
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    if (this.config.enableMock) {
      return this.mockRegister(userData);
    }

    const response = await httpClient.post<ApiResponse<RegisterResponse>>(
      'auth',
      getEndpointPath('auth', 'register'),
      userData
    );

    // Store tokens if registration successful
    if (response.status === 'success' && response.data?.accessToken) {
      await this.storeTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        tokenType: response.data.tokenType,
        expiresIn: response.data.expiresIn,
        refreshExpiresIn: response.data.refreshExpiresIn,
      });
    }

    return response;
  }

  /**
   * Generate OTP for email verification
   */
  async generateOtp(email: string): Promise<ApiResponse<null>> {
    if (this.config.enableMock) {
      return this.mockGenerateOtp(email);
    }

    return httpClient.post<ApiResponse<null>>(
      'auth',
      buildEndpointUrl('auth', getEndpointPath('auth', 'generateOtp'), { email }),
      null
    );
  }

  /**
   * Verify OTP and complete registration
   */
  async verifyOtp(request: OtpVerificationRequest): Promise<ApiResponse<RegisterResponse>> {
    if (this.config.enableMock) {
      return this.mockVerifyOtp(request);
    }

    const response = await httpClient.post<ApiResponse<RegisterResponse>>(
      'auth',
      getEndpointPath('auth', 'verifyOtp'),
      request
    );

    // Store tokens if verification successful
    if (response.status === 'success' && response.data?.accessToken) {
      await this.storeTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        tokenType: response.data.tokenType,
        expiresIn: response.data.expiresIn,
        refreshExpiresIn: response.data.refreshExpiresIn,
      });
    }

    return response;
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(request: RefreshTokenRequest): Promise<ApiResponse<JwtTokenResponse>> {
    if (this.config.enableMock) {
      return this.mockRefreshToken(request);
    }

    const response = await httpClient.post<ApiResponse<JwtTokenResponse>>(
      'auth',
      getEndpointPath('auth', 'refreshToken'),
      request
    );

    // Store new tokens if refresh successful
    if (response.status === 'success' && response.data) {
      await this.storeTokens(response.data);
    }

    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<null>> {
    try {
      if (!this.config.enableMock) {
        await httpClient.post<ApiResponse<null>>('auth', getEndpointPath('auth', 'logout'));
      }
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local tokens
      await tokenStorage.clearTokens();
    }

    return {
      status: 'success',
      message: 'Logged out successfully',
      data: null,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  /**
   * Forgot Password
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<null>> {
    if (this.config.enableMock) {
      return this.mockForgotPassword(request);
    }

    return httpClient.post<ApiResponse<null>>(
      'auth',
      getEndpointPath('auth', 'forgotPassword'),
      request
    );
  }

  /**
   * Reset Password
   */
  async resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<null>> {
    if (this.config.enableMock) {
      return this.mockResetPassword(request);
    }

    return httpClient.post<ApiResponse<null>>(
      'auth',
      getEndpointPath('auth', 'resetPassword'),
      request
    );
  }

  /**
   * Change Password
   */
  async changePassword(request: ChangePasswordRequest): Promise<ApiResponse<null>> {
    if (this.config.enableMock) {
      return this.mockChangePassword(request);
    }

    return httpClient.post<ApiResponse<null>>(
      'auth',
      getEndpointPath('auth', 'changePassword'),
      request
    );
  }

  /**
   * Validate Username Availability
   */
  async validateUsername(request: UsernameValidationRequest): Promise<ApiResponse<UsernameValidationResponse>> {
    if (this.config.enableMock) {
      return this.mockValidateUsername(request);
    }

    return httpClient.get<ApiResponse<UsernameValidationResponse>>(
      'auth',
      buildEndpointUrl('auth', `${getEndpointPath('auth', 'validateUsername')}/${encodeURIComponent(request.username)}`)
    );
  }

  /**
   * Store JWT tokens securely
   */
  private async storeTokens(tokens: JwtTokenResponse): Promise<void> {
    try {
      await tokenStorage.storeTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
        refreshExpiresIn: tokens.refreshExpiresIn,
      });
    } catch (error) {
      console.error('Failed to store authentication tokens:', error);
      throw new ApiError({
        code: ErrorCode.UNKNOWN_ERROR,
        message: 'Failed to store authentication tokens',
        userMessage: 'Authentication failed. Please try again.',
        timestamp: new Date().toISOString(),
      });
    }
  }

  // =============================================================================
  // Mock Methods (for development)
  // =============================================================================

  private async mockLogin(credentials: LoginRequest): Promise<ApiResponse<JwtTokenResponse>> {
    await this.delay(1000);

    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return {
        status: 'success',
        message: 'Login successful',
        data: {
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token',
          tokenType: 'Bearer',
          expiresIn: 900,
          refreshExpiresIn: 2592000,
        },
        timestamp: new Date().toISOString(),
        statusCode: 200,
      };
    }

    throw new ApiError({
      code: ErrorCode.INVALID_CREDENTIALS,
      message: 'Invalid credentials',
      userMessage: 'Invalid email or password',
      timestamp: new Date().toISOString(),
    });
  }

  private async mockRegister(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    await this.delay(1500);

    return {
      status: 'success',
      message: 'Registration successful',
      data: {
        id: Math.floor(Math.random() * 1000),
        email: userData.email,
        username: userData.username,
        status: 'ACTIVE',
        emailVerified: false,
        registeredAt: new Date().toISOString(),
        message: 'Registration completed',
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        tokenType: 'Bearer',
        expiresIn: 900,
        refreshExpiresIn: 2592000,
      },
      timestamp: new Date().toISOString(),
      statusCode: 201,
    };
  }

  private async mockGenerateOtp(email: string): Promise<ApiResponse<null>> {
    await this.delay(800);

    return {
      status: 'success',
      message: 'OTP sent successfully',
      data: null,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockVerifyOtp(request: OtpVerificationRequest): Promise<ApiResponse<RegisterResponse>> {
    await this.delay(1200);

    return {
      status: 'success',
      message: 'OTP verified successfully',
      data: {
        id: Math.floor(Math.random() * 1000),
        email: request.email,
        username: request.username,
        status: 'ACTIVE',
        emailVerified: true,
        registeredAt: new Date().toISOString(),
        message: 'Registration completed via OTP',
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        tokenType: 'Bearer',
        expiresIn: 900,
        refreshExpiresIn: 2592000,
      },
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockRefreshToken(request: RefreshTokenRequest): Promise<ApiResponse<JwtTokenResponse>> {
    await this.delay(500);

    return {
      status: 'success',
      message: 'Token refreshed successfully',
      data: {
        accessToken: 'new_mock_access_token',
        refreshToken: 'new_mock_refresh_token',
        tokenType: 'Bearer',
        expiresIn: 900,
        refreshExpiresIn: 2592000,
      },
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockForgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<null>> {
    await this.delay(1000);

    return {
      status: 'success',
      message: 'Password reset email sent',
      data: null,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockResetPassword(request: ResetPasswordRequest): Promise<ApiResponse<null>> {
    await this.delay(1000);

    return {
      status: 'success',
      message: 'Password reset successfully',
      data: null,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockChangePassword(request: ChangePasswordRequest): Promise<ApiResponse<null>> {
    await this.delay(1000);

    return {
      status: 'success',
      message: 'Password changed successfully',
      data: null,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockValidateUsername(request: UsernameValidationRequest): Promise<ApiResponse<UsernameValidationResponse>> {
    await this.delay(300);

    const isAvailable = !['admin', 'test', 'user'].includes(request.username?.toLowerCase() || '');

    return {
      status: 'success',
      message: isAvailable ? 'Username is available' : 'Username is already taken',
      data: {
        available: isAvailable,
        field: 'username',
        value: request.username,
      },
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const authService = new AuthService();
