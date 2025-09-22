/**
 * API Client
 * 
 * Centralized HTTP client with interceptors and environment-aware configuration
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { environmentManager, AppConfig } from '../../config';
import { tokenStorage } from '../storage/tokenStorage';
import { ApiResponse } from '../types/api';

// =============================================================================
// Types
// =============================================================================

type ServiceType = keyof AppConfig['api']['endpoints'];

interface ApiClientConfig {
  service: ServiceType;
  timeout?: number;
  retries?: number;
}

// =============================================================================
// API Client Class
// =============================================================================

class ApiClient {
  private instances: Map<string, AxiosInstance> = new Map();

  /**
   * Get or create service-specific HTTP client
   */
  public getClient(service: ServiceType): AxiosInstance {
    if (!this.instances.has(service)) {
      const instance = this.createClient(service);
      this.instances.set(service, instance);
    }
    return this.instances.get(service)!;
  }

  /**
   * Create HTTP client for specific service
   */
  private createClient(service: ServiceType): AxiosInstance {
    const config = environmentManager.getConfig();
    const baseURL = config.api.endpoints[service];
    
    const instance = axios.create({
      baseURL,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-App-Version': config.app.version,
        'X-Environment': config.app.environment,
        'X-Platform': 'mobile',
      },
    });

    // Add request interceptor
    instance.interceptors.request.use(
      (config) => this.handleRequest(config),
      (error) => this.handleRequestError(error)
    );

    // Add response interceptor
    instance.interceptors.response.use(
      (response) => this.handleResponse(response),
      (error) => this.handleResponseError(error, service)
    );

    return instance;
  }

  /**
   * Handle outgoing requests
   */
  private async handleRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const envConfig = environmentManager.getConfig();
    
    // Add debug headers in development
    if (envConfig.app.debugMode) {
      config.headers.set('X-Debug-Mode', 'true');
      config.headers.set('X-Request-ID', this.generateRequestId());
    }

    // Add authentication token if available
    try {
      const token = await tokenStorage.getAccessToken();
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (error) {
      console.warn('Failed to add auth token to request:', error);
    }

    // Log request in development
    console.log(`🚀 API CLIENT: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
      headers: config.headers,
      data: config.data,
    });
    
    if (envConfig.app.debugMode) {
      console.log(`🚀 DEBUG: ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data,
      });
    }

    return config;
  }

  /**
   * Handle request errors
   */
  private handleRequestError(error: any): Promise<never> {
    const envConfig = environmentManager.getConfig();
    
    if (envConfig.app.debugMode) {
      console.error('❌ Request Error:', error);
    }
    
    return Promise.reject(error);
  }

  /**
   * Handle successful responses
   */
  private handleResponse(response: AxiosResponse): AxiosResponse {
    const envConfig = environmentManager.getConfig();
    
    // Log response in development
    console.log(`✅ API CLIENT: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.baseURL}${response.config.url}`, {
      data: response.data,
    });
    
    if (envConfig.app.debugMode) {
      console.log(`✅ DEBUG: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        data: response.data,
      });
    }

    return response;
  }

  /**
   * Handle response errors with automatic token refresh
   */
  private async handleResponseError(
    error: AxiosError,
    service: ServiceType
  ): Promise<never> {
    const envConfig = environmentManager.getConfig();
    
    if (envConfig.app.debugMode) {
      console.error(`❌ ${error.response?.status} ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        error: error.response?.data,
      });
    }

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && service === 'auth') {
      try {
        const refreshed = await this.attemptTokenRefresh();
        if (refreshed && error.config) {
          // Retry original request with new token
          const token = await tokenStorage.getAccessToken();
          if (token) {
            error.config.headers.set('Authorization', `Bearer ${token}`);
            return axios.request(error.config);
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Clear tokens and redirect to login
        await tokenStorage.clearTokens();
        // TODO: Trigger logout in AuthContext
      }
    }

    // Transform error for consistent handling
    const apiError = this.transformError(error);
    return Promise.reject(apiError);
  }

  /**
   * Attempt to refresh access token
   */
  private async attemptTokenRefresh(): Promise<boolean> {
    try {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const authClient = this.getClient('auth');
      const response = await authClient.post<ApiResponse<{ accessToken: string; expiresIn: number }>>('/auth/refresh', {
        refreshToken,
      });

      if (response.data.status === 'success' && response.data.data) {
        await tokenStorage.updateAccessToken(
          response.data.data.accessToken,
          response.data.data.expiresIn
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh request failed:', error);
      return false;
    }
  }

  /**
   * Transform axios error to consistent format
   */
  private transformError(error: AxiosError): Error {
    const envConfig = environmentManager.getConfig();
    
    // Network error
    if (!error.response) {
      return new Error('Network error. Please check your internet connection.');
    }

    // Server returned error response
    const serverError = error.response.data as ApiResponse<any>;
    
    if (serverError?.message) {
      return new Error(serverError.message);
    }

    // Fallback error messages based on status code
    switch (error.response.status) {
      case 400:
        return new Error('Invalid request. Please check your input.');
      case 401:
        return new Error('Authentication failed. Please log in again.');
      case 403:
        return new Error('Access denied. You do not have permission.');
      case 404:
        return new Error('Resource not found.');
      case 429:
        return new Error('Too many requests. Please try again later.');
      case 500:
        return new Error(
          envConfig.app.environment === 'production' 
            ? 'Server error. Please try again later.'
            : `Server error: ${error.message}`
        );
      default:
        return new Error('Something went wrong. Please try again.');
    }
  }

  /**
   * Generate unique request ID for debugging
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clear all cached clients (useful for environment changes)
   */
  public clearClients(): void {
    this.instances.clear();
  }
}

// =============================================================================
// Export singleton instance
// =============================================================================

export const apiClient = new ApiClient();
export default apiClient;
