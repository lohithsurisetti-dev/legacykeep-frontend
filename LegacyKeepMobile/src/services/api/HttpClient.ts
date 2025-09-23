/**
 * HTTP Client
 * 
 * Modern, clean HTTP client with proper error handling, retry logic, and interceptors
 */

import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError,
  InternalAxiosRequestConfig 
} from 'axios';
import { getApiConfig, getEndpoint } from '../config/apiConfig';
import { ApiError, ApiErrorFactory, ErrorCode } from '../errors/ApiError';
import { tokenStorage } from '../storage/tokenStorage';
import { apiAnalytics } from '../monitoring/ApiAnalytics';
import { apiCache } from '../cache/ApiCache';
import { requestOptimizer } from '../optimization/RequestOptimizer';
import { inputValidator } from '../validation/InputValidator';

export type ServiceName = 'auth' | 'user' | 'notification';

export interface RequestConfig extends AxiosRequestConfig {
  service: ServiceName;
  retries?: number;
  timeout?: number;
}

export interface RequestMetadata {
  requestId: string;
  startTime: number;
  service: ServiceName;
  endpoint: string;
}

// Extend Axios types to include metadata
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: RequestMetadata;
  }
}

/**
 * Modern HTTP Client with comprehensive error handling and retry logic
 */
export class HttpClient {
  private instances: Map<ServiceName, AxiosInstance> = new Map();
  private config = getApiConfig();

  /**
   * Get or create service-specific HTTP client
   */
  public getClient(service: ServiceName): AxiosInstance {
    if (!this.instances.has(service)) {
      const instance = this.createClient(service);
      this.instances.set(service, instance);
    }
    return this.instances.get(service)!;
  }

  /**
   * Create HTTP client for specific service
   */
  private createClient(service: ServiceName): AxiosInstance {
    const baseURL = getEndpoint(service);
    
    const instance = axios.create({
      baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-App-Version': '1.0.0',
        'X-Platform': 'mobile',
        'X-Environment': __DEV__ ? 'development' : 'production',
      },
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => this.handleRequest(config, service),
      (error: AxiosError) => this.handleRequestError(error)
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response: AxiosResponse) => this.handleResponse(response),
      (error: AxiosError) => this.handleResponseError(error)
    );

    return instance;
  }

  /**
   * Handle outgoing requests
   */
  private async handleRequest(
    config: InternalAxiosRequestConfig, 
    service: ServiceName
  ): Promise<InternalAxiosRequestConfig> {
    // Add request metadata
    const requestId = this.generateRequestId();
    const startTime = Date.now();
    
    config.metadata = {
      requestId,
      startTime,
      service,
      endpoint: config.url || '',
    } as RequestMetadata;

    // Add authentication token if available
    if (this.requiresAuth(service, config.url)) {
      try {
        const token = await tokenStorage.getAccessToken();
        if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
        }
      } catch (error) {
        console.warn('Failed to add auth token to request:', error);
      }
    }

    // Log request in development
    if (this.config.enableLogging && __DEV__) {
      console.log(`🚀 ${service.toUpperCase()} API: ${config.method?.toUpperCase()} ${config.url}`, {
        requestId,
        data: config.data,
        headers: this.sanitizeHeaders(config.headers),
      });
    }

    return config;
  }

  /**
   * Handle successful responses
   */
  private handleResponse(response: AxiosResponse): AxiosResponse {
    const metadata = response.config.metadata as RequestMetadata;
    
    // Log response in development
    if (this.config.enableLogging && __DEV__) {
      const duration = Date.now() - metadata.startTime;
      console.log(`✅ ${metadata.service.toUpperCase()} API: ${response.status} ${metadata.endpoint}`, {
        requestId: metadata.requestId,
        duration: `${duration}ms`,
        data: response.data,
      });
    }

    return response;
  }

  /**
   * Handle response errors with retry logic
   */
  private async handleResponseError(error: AxiosError): Promise<never> {
    const metadata = error.config?.metadata as RequestMetadata;
    const requestId = metadata?.requestId;

    // Log error in development
    if (this.config.enableLogging && __DEV__) {
      const duration = metadata ? Date.now() - metadata.startTime : 0;
      console.error(`❌ ${metadata?.service.toUpperCase() || 'API'} API: ${error.response?.status || 'NETWORK'} ${metadata?.endpoint || 'unknown'}`, {
        requestId,
        duration: `${duration}ms`,
        error: error.message,
        response: error.response?.data,
      });
    }

    // Handle network errors
    if (!error.response) {
      throw ApiErrorFactory.fromNetworkError(error, requestId);
    }

    // Handle HTTP errors
    const apiError = ApiErrorFactory.fromHttpResponse(
      error.response.status,
      error.response.data,
      requestId
    );

    // Handle token expiration
    if (apiError.code === ErrorCode.TOKEN_EXPIRED) {
      await this.handleTokenExpiration();
    }

    throw apiError;
  }

  /**
   * Handle request errors
   */
  private handleRequestError(error: AxiosError): Promise<never> {
    console.error('Request configuration error:', error);
    throw ApiErrorFactory.fromNetworkError(error);
  }

  /**
   * Check if endpoint requires authentication
   */
  private requiresAuth(service: ServiceName, url?: string): boolean {
    if (!url) return false;
    
    // Public endpoints that don't require auth
    const publicEndpoints = [
      '/auth/login',
      '/auth/register',
      '/auth/generate-otp',
      '/auth/verify-otp',
      '/auth/forgot-password',
      '/auth/reset-password',
      '/auth/validate/username',
    ];

    return !publicEndpoints.some(endpoint => url.includes(endpoint));
  }

  /**
   * Handle token expiration
   */
  private async handleTokenExpiration(): Promise<void> {
    try {
      // Clear expired tokens
      await tokenStorage.clearTokens();
      
      // TODO: Implement token refresh logic here
      // For now, user will need to log in again
      console.warn('Token expired. User needs to log in again.');
    } catch (error) {
      console.error('Failed to handle token expiration:', error);
    }
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Sanitize headers for logging (remove sensitive data)
   */
  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };
    if (sanitized.Authorization) {
      sanitized.Authorization = 'Bearer [REDACTED]';
    }
    return sanitized;
  }

  /**
   * Make HTTP request with retry logic
   */
  public async request<T = any>(config: RequestConfig): Promise<T> {
    const { service, retries = this.config.retries, ...axiosConfig } = config;
    const client = this.getClient(service);
    
    let lastError: ApiError;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await client.request<T>(axiosConfig);
        return response.data;
      } catch (error) {
        lastError = error as ApiError;
        
        // Don't retry on non-retryable errors
        if (!lastError.isRetryable() || attempt === retries) {
          throw lastError;
        }
        
        // Wait before retry
        await this.delay(this.config.retryDelay * Math.pow(2, attempt));
      }
    }
    
    throw lastError!;
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * GET request
   */
  public async get<T = any>(service: ServiceName, url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, service, method: 'GET', url });
  }

  /**
   * POST request
   */
  public async post<T = any>(service: ServiceName, url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, service, method: 'POST', url, data });
  }

  /**
   * PUT request
   */
  public async put<T = any>(service: ServiceName, url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, service, method: 'PUT', url, data });
  }

  /**
   * PATCH request
   */
  public async patch<T = any>(service: ServiceName, url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, service, method: 'PATCH', url, data });
  }

  /**
   * DELETE request
   */
  public async delete<T = any>(service: ServiceName, url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, service, method: 'DELETE', url });
  }
}

// Export singleton instance
export const httpClient = new HttpClient();
