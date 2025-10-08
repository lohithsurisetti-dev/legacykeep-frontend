/**
 * API Configuration
 * 
 * Centralized configuration for all API services
 * Environment-aware with proper typing and validation
 */

export interface ApiEndpoints {
  auth: string;
  user: string;
  notification: string;
}

export interface ApiConfig {
  endpoints: ApiEndpoints;
  timeout: number;
  retries: number;
  retryDelay: number;
  enableMock: boolean;
  enableLogging: boolean;
}

export interface EnvironmentConfig {
  development: ApiConfig;
  staging: ApiConfig;
  production: ApiConfig;
}

/**
 * Environment-based API configuration
 * Uses environment variables with fallback defaults
 */
export const API_CONFIG: EnvironmentConfig = {
  development: {
    endpoints: {
      auth: process.env.EXPO_PUBLIC_AUTH_SERVICE_URL || 'http://192.168.1.81:8084/api/v1',
      user: process.env.EXPO_PUBLIC_USER_SERVICE_URL || 'http://192.168.1.81:8082/user/api/v1',
      notification: process.env.EXPO_PUBLIC_NOTIFICATION_SERVICE_URL || 'http://192.168.1.81:8083/notification/api/v1',
    },
    timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10),
    retries: parseInt(process.env.EXPO_PUBLIC_API_RETRIES || '3', 10),
    retryDelay: parseInt(process.env.EXPO_PUBLIC_API_RETRY_DELAY || '1000', 10),
    enableMock: process.env.EXPO_PUBLIC_ENABLE_MOCK_API !== 'false',
    enableLogging: __DEV__,
  },
  staging: {
    endpoints: {
      auth: process.env.EXPO_PUBLIC_AUTH_SERVICE_URL || 'https://auth-staging.legacykeep.com/api/v1',
      user: process.env.EXPO_PUBLIC_USER_SERVICE_URL || 'https://user-staging.legacykeep.com/api/v1',
      notification: process.env.EXPO_PUBLIC_NOTIFICATION_SERVICE_URL || 'https://notification-staging.legacykeep.com/api/v1',
    },
    timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10),
    retries: parseInt(process.env.EXPO_PUBLIC_API_RETRIES || '3', 10),
    retryDelay: parseInt(process.env.EXPO_PUBLIC_API_RETRY_DELAY || '1000', 10),
    enableMock: false,
    enableLogging: true,
  },
  production: {
    endpoints: {
      auth: process.env.EXPO_PUBLIC_AUTH_SERVICE_URL || 'https://auth.legacykeep.com/api/v1',
      user: process.env.EXPO_PUBLIC_USER_SERVICE_URL || 'https://user.legacykeep.com/api/v1',
      notification: process.env.EXPO_PUBLIC_NOTIFICATION_SERVICE_URL || 'https://notification.legacykeep.com/api/v1',
    },
    timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10),
    retries: parseInt(process.env.EXPO_PUBLIC_API_RETRIES || '3', 10),
    retryDelay: parseInt(process.env.EXPO_PUBLIC_API_RETRY_DELAY || '1000', 10),
    enableMock: false,
    enableLogging: false,
  },
};

/**
 * Get API configuration for current environment
 */
export function getApiConfig(): ApiConfig {
  const environment = __DEV__ ? 'development' : 'production';
  return API_CONFIG[environment];
}

/**
 * Get endpoint URL for specific service
 */
export function getEndpoint(service: keyof ApiEndpoints): string {
  const config = getApiConfig();
  return config.endpoints[service];
}
