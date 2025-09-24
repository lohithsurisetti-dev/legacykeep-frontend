/**
 * User Service
 * 
 * Clean, modern user API service with proper error handling
 */

import { httpClient } from './HttpClient';
import { getApiConfig } from '../config/apiConfig';
import { getEndpointPath, buildEndpointUrl } from '../config/endpoints';
import { ApiError, ErrorCode } from '../errors/ApiError';
import {
  ApiResponse,
  UserProfile,
  CreateProfileRequest,
  UpdateProfileRequest,
  PaginatedResponse,
} from '../types/ApiTypes';

/**
 * User API Service
 */
export class UserService {
  private config = getApiConfig();

  /**
   * Create User Profile
   */
  async createProfile(profileData: CreateProfileRequest): Promise<ApiResponse<UserProfile>> {
    if (this.config.enableMock) {
      return this.mockCreateProfile(profileData);
    }

    return httpClient.post<ApiResponse<UserProfile>>(
      'user',
      getEndpointPath('user', 'createProfile'),
      profileData
    );
  }

  /**
   * Get User Profile
   */
  async getProfile(userId?: number): Promise<ApiResponse<UserProfile>> {
    if (this.config.enableMock) {
      return this.mockGetProfile(userId);
    }

    const endpoint = userId ? `${getEndpointPath('user', 'getProfile')}/${userId}` : getEndpointPath('user', 'getProfile');
    return httpClient.get<ApiResponse<UserProfile>>('user', endpoint);
  }

  /**
   * Update User Profile
   */
  async updateProfile(profileData: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> {
    if (this.config.enableMock) {
      return this.mockUpdateProfile(profileData);
    }

    return httpClient.put<ApiResponse<UserProfile>>(
      'user',
      `${getEndpointPath('user', 'updateProfile')}/${profileData.id}`,
      profileData
    );
  }

  /**
   * Delete User Profile
   */
  async deleteProfile(profileId: number): Promise<ApiResponse<null>> {
    if (this.config.enableMock) {
      return this.mockDeleteProfile(profileId);
    }

    return httpClient.delete<ApiResponse<null>>('user', `${getEndpointPath('user', 'deleteProfile')}/${profileId}`);
  }

  /**
   * Get All User Profiles (with pagination)
   */
  async getProfiles(page: number = 1, limit: number = 10): Promise<PaginatedResponse<UserProfile>> {
    if (this.config.enableMock) {
      return this.mockGetProfiles(page, limit);
    }

    return httpClient.get<PaginatedResponse<UserProfile>>(
      'user',
      buildEndpointUrl('user', getEndpointPath('user', 'getProfiles'), { page, limit })
    );
  }

  /**
   * Search User Profiles
   */
  async searchProfiles(query: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<UserProfile>> {
    if (this.config.enableMock) {
      return this.mockSearchProfiles(query, page, limit);
    }

    return httpClient.get<PaginatedResponse<UserProfile>>(
      'user',
      buildEndpointUrl('user', getEndpointPath('user', 'searchProfiles'), { q: query, page, limit })
    );
  }

  /**
   * Upload Profile Picture
   */
  async uploadProfilePicture(imageUri: string): Promise<ApiResponse<{ imageUrl: string }>> {
    if (this.config.enableMock) {
      return this.mockUploadProfilePicture(imageUri);
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);

    return httpClient.post<ApiResponse<{ imageUrl: string }>>(
      'user',
      getEndpointPath('user', 'uploadProfilePicture'),
      formData,
      {
        service: 'user',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  /**
   * Delete Profile Picture
   */
  async deleteProfilePicture(): Promise<ApiResponse<null>> {
    if (this.config.enableMock) {
      return this.mockDeleteProfilePicture();
    }

    return httpClient.delete<ApiResponse<null>>('user', getEndpointPath('user', 'deleteProfilePicture'));
  }

  // =============================================================================
  // Mock Methods (for development)
  // =============================================================================

  private async mockCreateProfile(profileData: CreateProfileRequest): Promise<ApiResponse<UserProfile>> {
    await this.delay(1000);

    const mockProfile: UserProfile = {
      id: Math.floor(Math.random() * 1000),
      userId: Math.floor(Math.random() * 1000),
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      displayName: `${profileData.firstName} ${profileData.lastName}`,
      bio: profileData.bio || '',
      dateOfBirth: profileData.dateOfBirth,
      phoneNumber: profileData.phoneNumber,
      addressLine1: profileData.addressLine1,
      addressLine2: profileData.addressLine2,
      city: profileData.city,
      state: profileData.state,
      country: profileData.country,
      postalCode: profileData.postalCode,
      timezone: profileData.timezone || 'UTC',
      language: profileData.language || 'en',
      profilePictureUrl: undefined,
      profilePictureThumbnailUrl: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fullName: `${profileData.firstName} ${profileData.lastName}`,
      age: profileData.dateOfBirth ? this.calculateAge(profileData.dateOfBirth) : undefined,
      public: true,
      complete: true,
    };

    return {
      status: 'success',
      message: 'Profile created successfully',
      data: mockProfile,
      timestamp: new Date().toISOString(),
      statusCode: 201,
    };
  }

  private async mockGetProfile(userId?: number): Promise<ApiResponse<UserProfile>> {
    await this.delay(500);

    const mockProfile: UserProfile = {
      id: userId || Math.floor(Math.random() * 1000),
      userId: userId || Math.floor(Math.random() * 1000),
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'John Doe',
      bio: 'Software developer passionate about clean code',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+1234567890',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      timezone: 'America/New_York',
      language: 'en',
      profilePictureUrl: 'https://example.com/profile.jpg',
      profilePictureThumbnailUrl: 'https://example.com/profile_thumb.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fullName: 'John Doe',
      age: 34,
      public: true,
      complete: true,
    };

    return {
      status: 'success',
      message: 'Profile retrieved successfully',
      data: mockProfile,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockUpdateProfile(profileData: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> {
    await this.delay(800);

    const mockProfile: UserProfile = {
      id: profileData.id,
      userId: Math.floor(Math.random() * 1000),
      firstName: profileData.firstName || 'John',
      lastName: profileData.lastName || 'Doe',
      displayName: `${profileData.firstName || 'John'} ${profileData.lastName || 'Doe'}`,
      bio: profileData.bio || 'Software developer passionate about clean code',
      dateOfBirth: profileData.dateOfBirth,
      phoneNumber: profileData.phoneNumber,
      addressLine1: profileData.addressLine1,
      addressLine2: profileData.addressLine2,
      city: profileData.city,
      state: profileData.state,
      country: profileData.country,
      postalCode: profileData.postalCode,
      timezone: profileData.timezone || 'UTC',
      language: profileData.language || 'en',
      profilePictureUrl: 'https://example.com/profile.jpg',
      profilePictureThumbnailUrl: 'https://example.com/profile_thumb.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fullName: `${profileData.firstName || 'John'} ${profileData.lastName || 'Doe'}`,
      age: profileData.dateOfBirth ? this.calculateAge(profileData.dateOfBirth) : 34,
      public: true,
      complete: true,
    };

    return {
      status: 'success',
      message: 'Profile updated successfully',
      data: mockProfile,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockDeleteProfile(profileId: number): Promise<ApiResponse<null>> {
    await this.delay(500);

    return {
      status: 'success',
      message: 'Profile deleted successfully',
      data: null,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockGetProfiles(page: number, limit: number): Promise<PaginatedResponse<UserProfile>> {
    await this.delay(800);

    const profiles: UserProfile[] = Array.from({ length: Math.min(limit, 5) }, (_, i) => ({
      id: page * limit + i + 1,
      userId: page * limit + i + 1,
      firstName: `User${i + 1}`,
      lastName: 'Doe',
      displayName: `User${i + 1} Doe`,
      bio: `Bio for user ${i + 1}`,
      dateOfBirth: '1990-01-01',
      phoneNumber: `+123456789${i}`,
      addressLine1: `${i + 1} Main St`,
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      timezone: 'America/New_York',
      language: 'en',
      profilePictureUrl: `https://example.com/profile${i + 1}.jpg`,
      profilePictureThumbnailUrl: `https://example.com/profile${i + 1}_thumb.jpg`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fullName: `User${i + 1} Doe`,
      age: 34,
      public: true,
      complete: true,
    }));

    return {
      status: 'success',
      message: 'Profiles retrieved successfully',
      data: profiles,
      timestamp: new Date().toISOString(),
      statusCode: 200,
      pagination: {
        page,
        limit,
        total: 50,
        totalPages: Math.ceil(50 / limit),
        hasNext: page < Math.ceil(50 / limit),
        hasPrev: page > 1,
      },
    };
  }

  private async mockSearchProfiles(query: string, page: number, limit: number): Promise<PaginatedResponse<UserProfile>> {
    await this.delay(600);

    const profiles: UserProfile[] = Array.from({ length: Math.min(limit, 3) }, (_, i) => ({
      id: page * limit + i + 1,
      userId: page * limit + i + 1,
      firstName: query,
      lastName: 'Doe',
      displayName: `${query} Doe`,
      bio: `Bio for ${query}`,
      dateOfBirth: '1990-01-01',
      phoneNumber: `+123456789${i}`,
      addressLine1: `${i + 1} Main St`,
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      timezone: 'America/New_York',
      language: 'en',
      profilePictureUrl: `https://example.com/profile${i + 1}.jpg`,
      profilePictureThumbnailUrl: `https://example.com/profile${i + 1}_thumb.jpg`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fullName: `${query} Doe`,
      age: 34,
      public: true,
      complete: true,
    }));

    return {
      status: 'success',
      message: 'Search results retrieved successfully',
      data: profiles,
      timestamp: new Date().toISOString(),
      statusCode: 200,
      pagination: {
        page,
        limit,
        total: 10,
        totalPages: Math.ceil(10 / limit),
        hasNext: page < Math.ceil(10 / limit),
        hasPrev: page > 1,
      },
    };
  }

  private async mockUploadProfilePicture(imageUri: string): Promise<ApiResponse<{ imageUrl: string }>> {
    await this.delay(2000);

    return {
      status: 'success',
      message: 'Profile picture uploaded successfully',
      data: {
        imageUrl: 'https://example.com/uploaded_profile.jpg',
      },
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private async mockDeleteProfilePicture(): Promise<ApiResponse<null>> {
    await this.delay(500);

    return {
      status: 'success',
      message: 'Profile picture deleted successfully',
      data: null,
      timestamp: new Date().toISOString(),
      statusCode: 200,
    };
  }

  private calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const userService = new UserService();
