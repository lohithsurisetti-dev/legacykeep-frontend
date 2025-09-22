/**
 * User API Service
 * 
 * Handles all user profile-related API calls
 */

import { apiClient } from './client';
import { environmentManager } from '../../config';
import { ApiResponse } from '../types/api';

// =============================================================================
// User API Types
// =============================================================================

export interface UserProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  dateOfBirth?: string; // ISO date string (YYYY-MM-DD)
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  timezone?: string;
  language?: string;
  profilePictureUrl?: string;
  profilePictureThumbnailUrl?: string;
  isPublic?: boolean;
}

export interface UserProfileResponse {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  timezone?: string;
  language?: string;
  profilePictureUrl?: string;
  profilePictureThumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  age?: number;
  public: boolean;
  complete: boolean;
}

// =============================================================================
// User API Service Class
// =============================================================================

class UserApiService {
  private client = apiClient.getClient('user');

  /**
   * Get current user's profile
   */
  async getMyProfile(): Promise<ApiResponse<UserProfileResponse>> {
    const config = environmentManager.getConfig();
    
    // Use mock in development if enabled
    if (config.mock.enableMockApi && config.app.environment === 'development') {
      return this.mockGetProfile();
    }

    try {
      const response = await this.client.get('/profiles/me');
      return response.data;
    } catch (error: any) {
      console.error('Get profile error:', error);
      throw new Error(error.response?.data?.message || 'Failed to get profile');
    }
  }

  /**
   * Create user profile
   */
  async createProfile(profileData: UserProfileRequest): Promise<ApiResponse<UserProfileResponse>> {
    const config = environmentManager.getConfig();
    
    // Use mock in development if enabled
    if (config.mock.enableMockApi && config.app.environment === 'development') {
      return this.mockCreateProfile(profileData);
    }

    try {
      const response = await this.client.post('/profiles', profileData);
      return response.data;
    } catch (error: any) {
      console.error('Create profile error:', error);
      throw new Error(error.response?.data?.message || 'Failed to create profile');
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData: UserProfileRequest): Promise<ApiResponse<UserProfileResponse>> {
    const config = environmentManager.getConfig();
    
    // Use mock in development if enabled
    if (config.mock.enableMockApi && config.app.environment === 'development') {
      return this.mockUpdateProfile(profileData);
    }

    try {
      const response = await this.client.put('/profiles/me', profileData);
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  /**
   * Get profile completion percentage
   */
  async getProfileCompletion(): Promise<ApiResponse<number>> {
    const config = environmentManager.getConfig();
    
    // Use mock in development if enabled
    if (config.mock.enableMockApi && config.app.environment === 'development') {
      return this.mockGetProfileCompletion();
    }

    try {
      const response = await this.client.get('/profiles/me/completion');
      return response.data;
    } catch (error: any) {
      console.error('Get profile completion error:', error);
      throw new Error(error.response?.data?.message || 'Failed to get profile completion');
    }
  }

  // =============================================================================
  // Mock Implementations for Development
  // =============================================================================

  private async mockGetProfile(): Promise<ApiResponse<UserProfileResponse>> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    return {
      status: 'success',
      message: 'Profile retrieved successfully',
      data: {
        id: 1,
        userId: 1,
        firstName: 'Mock',
        lastName: 'User',
        displayName: 'Mock User',
        bio: 'This is a mock profile for development',
        dateOfBirth: '1995-03-15',
        phoneNumber: '+1234567890',
        addressLine1: '123 Mock Street',
        addressLine2: '',
        city: 'Mock City',
        state: 'Mock State',
        country: 'Mock Country',
        postalCode: '12345',
        timezone: 'America/New_York',
        language: 'en',
        profilePictureUrl: '',
        profilePictureThumbnailUrl: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fullName: 'Mock User',
        age: 29,
        public: false,
        complete: true,
      },
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockCreateProfile(profileData: UserProfileRequest): Promise<ApiResponse<UserProfileResponse>> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    return {
      status: 'success',
      message: 'Profile created successfully',
      data: {
        id: 1,
        userId: 1,
        firstName: profileData.firstName || 'Mock',
        lastName: profileData.lastName || 'User',
        displayName: profileData.displayName || `${profileData.firstName} ${profileData.lastName}`,
        bio: profileData.bio || '',
        dateOfBirth: profileData.dateOfBirth || '1995-03-15',
        phoneNumber: profileData.phoneNumber || '',
        addressLine1: profileData.addressLine1 || '',
        addressLine2: profileData.addressLine2 || '',
        city: profileData.city || '',
        state: profileData.state || '',
        country: profileData.country || '',
        postalCode: profileData.postalCode || '',
        timezone: profileData.timezone || 'America/New_York',
        language: profileData.language || 'en',
        profilePictureUrl: profileData.profilePictureUrl || '',
        profilePictureThumbnailUrl: profileData.profilePictureThumbnailUrl || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fullName: `${profileData.firstName} ${profileData.lastName}`,
        age: 29,
        public: profileData.isPublic || false,
        complete: true,
      },
      timestamp: new Date().toISOString(),
      statusCode: 201,
    };
  }

  private async mockUpdateProfile(profileData: UserProfileRequest): Promise<ApiResponse<UserProfileResponse>> {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    
    return {
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        id: 1,
        userId: 1,
        firstName: profileData.firstName || 'Updated',
        lastName: profileData.lastName || 'User',
        displayName: profileData.displayName || `${profileData.firstName} ${profileData.lastName}`,
        bio: profileData.bio || '',
        dateOfBirth: profileData.dateOfBirth || '1995-03-15',
        phoneNumber: profileData.phoneNumber || '',
        addressLine1: profileData.addressLine1 || '',
        addressLine2: profileData.addressLine2 || '',
        city: profileData.city || '',
        state: profileData.state || '',
        country: profileData.country || '',
        postalCode: profileData.postalCode || '',
        timezone: profileData.timezone || 'America/New_York',
        language: profileData.language || 'en',
        profilePictureUrl: profileData.profilePictureUrl || '',
        profilePictureThumbnailUrl: profileData.profilePictureThumbnailUrl || '',
        createdAt: '2025-09-21T12:00:00.000Z',
        updatedAt: new Date().toISOString(),
        fullName: `${profileData.firstName} ${profileData.lastName}`,
        age: 29,
        public: profileData.isPublic || false,
        complete: true,
      },
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockGetProfileCompletion(): Promise<ApiResponse<number>> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    return {
      status: 'success',
      message: 'Profile completion retrieved successfully',
      data: 85,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }
}

// =============================================================================
// Export
// =============================================================================

export const userApi = new UserApiService();
