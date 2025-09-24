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
 */
export const API_CONFIG: EnvironmentConfig = {
  development: {
    endpoints: {
      auth: 'http://192.168.1.81:8084/api/v1',
      user: 'http://192.168.1.81:8082/user/api/v1',
      notification: 'http://192.168.1.81:8083/notification/api/v1',
    },
    timeout: 30000,
    retries: 3,
    retryDelay: 1000,
    enableMock: true,
    enableLogging: true,
  },
  staging: {
    endpoints: {
      auth: 'https://auth-staging.legacykeep.com/api/v1',
      user: 'https://user-staging.legacykeep.com/api/v1',
      notification: 'https://notification-staging.legacykeep.com/api/v1',
    },
    timeout: 30000,
    retries: 3,
    retryDelay: 1000,
    enableMock: false,
    enableLogging: true,
  },
  production: {
    endpoints: {
      auth: 'https://auth.legacykeep.com/api/v1',
      user: 'https://user.legacykeep.com/api/v1',
      notification: 'https://notification.legacykeep.com/api/v1',
    },
    timeout: 30000,
    retries: 3,
    retryDelay: 1000,
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
