/**
 * Environment Configuration Manager
 *
 * Centralized environment management for all deployment stages
 */

import { developmentConfig } from './development';
import { productionConfig } from './production';

export type Environment = 'development' | 'qa' | 'staging' | 'production';

export interface AppConfig {
  app: {
    name: string;
    version: string;
    buildNumber: string;
    bundleId: string;
    environment: Environment;
    debugMode: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
    endpoints: {
      auth: string;
      user: string;
      chat: string;
      family: string;
      stories: string;
      media: string;
      notifications: string;
    };
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
  aws: {
    region: string;
    bucket: string;
    accessKeyId: string;
    secretAccessKey: string;
    cdnUrl: string;
  };
  stripe: {
    publishableKey: string;
    merchantId: string;
    urlScheme: string;
  };
  maps: {
    apiKey: string;
    region: string;
    language: string;
  };
  features: {
    enableAnalytics: boolean;
    enableCrashlytics: boolean;
    enablePushNotifications: boolean;
    enableBiometricAuth: boolean;
    enablePremiumFeatures: boolean;
    enableSocialLogin: boolean;
    enableLocationServices: boolean;
    enableCamera: boolean;
    enableGallery: boolean;
  };
  mock: {
    enableMockAuth: boolean;
    enableMockApi: boolean;
    enableMockStorage: boolean;
    enableMockNotifications: boolean;
  };
  devTools: {
    enableFlipper: boolean;
    enableReactDevTools: boolean;
    enableReduxDevTools: boolean;
    enableNetworkInspector: boolean;
  };
}

class EnvironmentManager {
  private static instance: EnvironmentManager;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  private loadConfig(): AppConfig {
    const environment = this.getCurrentEnvironment();

    switch (environment) {
      case 'development':
        return developmentConfig;
      case 'production':
        return productionConfig;
      default:
        return developmentConfig;
    }
  }

  private getCurrentEnvironment(): Environment {
    // Check for environment variable first
    const envVar = process.env.EXPO_PUBLIC_ENVIRONMENT as Environment;
    if (
      envVar &&
      ['development', 'qa', 'staging', 'production'].includes(envVar)
    ) {
      return envVar;
    }

    // Check for build configuration
    if (__DEV__) {
      return 'development';
    }

    // Check for bundle ID
    const bundleId = process.env.EXPO_PUBLIC_BUNDLE_ID;
    if (bundleId?.includes('.dev')) return 'development';
    if (bundleId?.includes('.qa')) return 'qa';
    if (bundleId?.includes('.staging')) return 'staging';

    // Default to production
    return 'production';
  }

  public getConfig(): AppConfig {
    return this.config;
  }

  public getEnvironment(): Environment {
    return this.config.app.environment;
  }

  public isDevelopment(): boolean {
    return this.config.app.environment === 'development';
  }

  public isProduction(): boolean {
    return this.config.app.environment === 'production';
  }

  public isDebugMode(): boolean {
    return this.config.app.debugMode;
  }

  public getApiEndpoint(service: keyof AppConfig['api']['endpoints']): string {
    return this.config.api.endpoints[service];
  }

  public getFeatureFlag(feature: keyof AppConfig['features']): boolean {
    return this.config.features[feature];
  }

  public getMockSetting(setting: keyof AppConfig['mock']): boolean {
    return this.config.mock[setting];
  }
}

export const environmentManager = EnvironmentManager.getInstance();
export default environmentManager;
