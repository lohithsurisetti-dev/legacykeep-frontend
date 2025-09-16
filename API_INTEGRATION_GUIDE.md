# 🔌 LegacyKeep API Integration Guide

## 📋 Backend API Response Standards

### Standard ApiResponse Structure
All our backend services use a consistent `ApiResponse<T>` wrapper:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}
```

### Service-Specific Response Examples

#### Auth Service Responses
```typescript
// Login Response
interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    };
    token: string;
    refreshToken: string;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}

// Registration Response
interface RegisterResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      status: 'PENDING_VERIFICATION';
    };
    message: string;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}

// Token Refresh Response
interface RefreshTokenResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
    expiresIn: number;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}
```

#### User Service Responses
```typescript
// User Profile Response
interface UserProfileResponse {
  success: boolean;
  data: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    bio?: string;
    location?: string;
    profilePictureUrl?: string;
    profilePictureThumbnailUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}

// User Settings Response
interface UserSettingsResponse {
  success: boolean;
  data: {
    id: string;
    userId: string;
    privacyLevel: 'PUBLIC' | 'FRIENDS' | 'PRIVATE';
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    twoFactorEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}
```

#### Chat Service Responses
```typescript
// Chat Room Response
interface ChatRoomResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    type: 'PRIVATE' | 'GROUP';
    participants: string[];
    lastMessage?: {
      id: string;
      content: string;
      senderId: string;
      timestamp: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}

// Message Response
interface MessageResponse {
  success: boolean;
  data: {
    id: string;
    chatRoomId: string;
    senderId: string;
    content: string;
    messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'AUDIO' | 'VIDEO';
    timestamp: string;
    editedAt?: string;
    isEdited?: boolean;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}
```

## 🔧 API Service Implementation

### Base API Service
```typescript
// services/BaseApiService.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/api';

class BaseApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for adding auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for handling common errors
    this.api.interceptors.response.use(
      (response: AxiosResponse<ApiResponse<any>>) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Handle token expiration
          this.handleTokenExpiration();
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    // Get token from secure storage
    return null; // Implement secure storage
  }

  private handleTokenExpiration() {
    // Handle token expiration logic
    // Redirect to login or refresh token
  }

  // Generic methods
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.get<ApiResponse<T>>(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

export default BaseApiService;
```

### Auth Service
```typescript
// services/AuthService.ts
import BaseApiService from './BaseApiService';
import { LoginResponse, RegisterResponse, RefreshTokenResponse } from '@/types/auth';

class AuthService extends BaseApiService {
  constructor() {
    super(process.env.EXPO_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8081');
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return this.post<LoginResponse['data']>('/auth/login', {
      email,
      password,
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;
  }): Promise<RegisterResponse> {
    return this.post<RegisterResponse['data']>('/auth/register', userData);
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return this.post<RefreshTokenResponse['data']>('/auth/refresh', {
      refreshToken,
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.post<null>('/auth/logout');
  }

  async verifyEmail(token: string): Promise<ApiResponse<null>> {
    return this.post<null>('/auth/verify-email', { token });
  }

  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    return this.post<null>('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<null>> {
    return this.post<null>('/auth/reset-password', {
      token,
      newPassword,
    });
  }
}

export default new AuthService();
```

### User Service
```typescript
// services/UserService.ts
import BaseApiService from './BaseApiService';
import { UserProfileResponse, UserSettingsResponse } from '@/types/user';

class UserService extends BaseApiService {
  constructor() {
    super(process.env.EXPO_PUBLIC_USER_SERVICE_URL || 'http://localhost:8082');
  }

  async getProfile(): Promise<UserProfileResponse> {
    return this.get<UserProfileResponse['data']>('/api/v1/profile');
  }

  async updateProfile(profileData: Partial<UserProfileResponse['data']>): Promise<UserProfileResponse> {
    return this.put<UserProfileResponse['data']>('/api/v1/profile', profileData);
  }

  async getSettings(): Promise<UserSettingsResponse> {
    return this.get<UserSettingsResponse['data']>('/api/v1/settings');
  }

  async updateSettings(settingsData: Partial<UserSettingsResponse['data']>): Promise<UserSettingsResponse> {
    return this.put<UserSettingsResponse['data']>('/api/v1/settings', settingsData);
  }

  async updateProfilePicture(imageData: {
    profilePictureUrl: string;
    profilePictureThumbnailUrl: string;
  }): Promise<UserProfileResponse> {
    return this.put<UserProfileResponse['data']>('/api/v1/profile/picture', imageData);
  }
}

export default new UserService();
```

### Chat Service
```typescript
// services/ChatService.ts
import BaseApiService from './BaseApiService';
import { ChatRoomResponse, MessageResponse } from '@/types/chat';

class ChatService extends BaseApiService {
  constructor() {
    super(process.env.EXPO_PUBLIC_CHAT_SERVICE_URL || 'http://localhost:8083');
  }

  async getChatRooms(): Promise<ApiResponse<ChatRoomResponse['data'][]>> {
    return this.get<ChatRoomResponse['data'][]>('/api/v1/chat-rooms');
  }

  async createChatRoom(roomData: {
    name: string;
    type: 'PRIVATE' | 'GROUP';
    participants: string[];
  }): Promise<ChatRoomResponse> {
    return this.post<ChatRoomResponse['data']>('/api/v1/chat-rooms', roomData);
  }

  async getMessages(chatRoomId: string, page: number = 0, size: number = 20): Promise<ApiResponse<MessageResponse['data'][]>> {
    return this.get<MessageResponse['data'][]>(`/api/v1/chat-rooms/${chatRoomId}/messages?page=${page}&size=${size}`);
  }

  async sendMessage(chatRoomId: string, messageData: {
    content: string;
    messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'AUDIO' | 'VIDEO';
  }): Promise<MessageResponse> {
    return this.post<MessageResponse['data']>(`/api/v1/chat-rooms/${chatRoomId}/messages`, messageData);
  }
}

export default new ChatService();
```

## 🎯 Error Handling

### API Error Types
```typescript
// types/api.ts
export interface ApiError {
  success: false;
  error: string;
  message?: string;
  timestamp: string;
  path: string;
  details?: any;
}

export class ApiException extends Error {
  public status: number;
  public response: ApiError;

  constructor(status: number, response: ApiError) {
    super(response.error || 'API Error');
    this.status = status;
    this.response = response;
  }
}
```

### Error Handling Hook
```typescript
// hooks/useApiError.ts
import { useState, useCallback } from 'react';
import { ApiException } from '@/types/api';

export const useApiError = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      if (err instanceof ApiException) {
        setError(err.response.error || 'An error occurred');
      } else {
        setError('Network error. Please check your connection.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    loading,
    handleApiCall,
    clearError,
  };
};
```

## 🔄 State Management Integration

### Redux Slice Example
```typescript
// store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse, User } from '@/types/auth';
import authService from '@/services/AuthService';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await authService.login(credentials.email, credentials.password);
    if (response.success) {
      return response.data;
    }
    throw new Error(response.error || 'Login failed');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse['data']>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

## 🧪 Testing API Integration

### Mock API Responses
```typescript
// __mocks__/AuthService.ts
export const mockLoginResponse: LoginResponse = {
  success: true,
  data: {
    user: {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      status: 'ACTIVE',
    },
    token: 'mock-jwt-token',
    refreshToken: 'mock-refresh-token',
  },
  message: 'Login successful',
  timestamp: new Date().toISOString(),
  path: '/auth/login',
};

export default {
  login: jest.fn().mockResolvedValue(mockLoginResponse),
  register: jest.fn().mockResolvedValue({ success: true }),
  logout: jest.fn().mockResolvedValue({ success: true }),
};
```

### API Integration Tests
```typescript
// __tests__/services/AuthService.test.ts
import authService from '@/services/AuthService';
import { mockLoginResponse } from '@/__mocks__/AuthService';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await authService.login(credentials.email, credentials.password);

    expect(response.success).toBe(true);
    expect(response.data.user.email).toBe(credentials.email);
    expect(response.data.token).toBeDefined();
  });

  it('should handle login failure', async () => {
    const credentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    await expect(authService.login(credentials.email, credentials.password))
      .rejects.toThrow();
  });
});
```

## 📱 Environment Configuration

### Environment Variables
```typescript
// config/environment.ts
export const ENV = {
  AUTH_SERVICE_URL: process.env.EXPO_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8081',
  USER_SERVICE_URL: process.env.EXPO_PUBLIC_USER_SERVICE_URL || 'http://localhost:8082',
  CHAT_SERVICE_URL: process.env.EXPO_PUBLIC_CHAT_SERVICE_URL || 'http://localhost:8083',
  API_TIMEOUT: 10000,
  MAX_RETRY_ATTEMPTS: 3,
};
```

---

**This guide ensures consistent API integration across the LegacyKeep mobile app, maintaining the same response structure as our backend services!** 🚀✨
