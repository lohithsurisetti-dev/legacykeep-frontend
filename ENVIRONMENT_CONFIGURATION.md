# 🌍 LegacyKeep Environment Configuration Guide

## 🎯 Environment Overview

### **Environment Types**
- **Development (dev)** - Local development with mock services
- **Quality Assurance (qa)** - Testing environment with real services
- **Staging (staging)** - Pre-production environment
- **Production (prod)** - Live environment with production services

## 📁 Environment File Structure

```
legacykeep-frontend/
├── 📱 LegacyKeepMobile/
│   ├── 📁 config/
│   │   ├── 📁 environments/
│   │   │   ├── development.ts
│   │   │   ├── qa.ts
│   │   │   ├── staging.ts
│   │   │   ├── production.ts
│   │   │   └── index.ts
│   │   ├── 📁 constants/
│   │   │   ├── api.ts
│   │   │   ├── firebase.ts
│   │   │   ├── aws.ts
│   │   │   ├── stripe.ts
│   │   │   └── maps.ts
│   │   └── index.ts
│   ├── .env.development
│   ├── .env.qa
│   ├── .env.staging
│   ├── .env.production
│   ├── .env.example
│   └── .env
```

## 🔧 Environment Configuration Files

### 1. **Development Environment**
```typescript
// config/environments/development.ts
export const developmentConfig = {
  // App Configuration
  app: {
    name: 'LegacyKeep Dev',
    version: '1.0.0-dev',
    buildNumber: '1',
    bundleId: 'com.legacykeep.dev',
    environment: 'development',
    debugMode: true,
    logLevel: 'debug',
  },

  // API Configuration
  api: {
    baseUrl: 'http://localhost:8080',
    timeout: 10000,
    retryAttempts: 3,
    endpoints: {
      auth: 'http://localhost:8081',
      user: 'http://localhost:8082',
      chat: 'http://localhost:8083',
      stories: 'http://localhost:8084',
      family: 'http://localhost:8085',
    },
  },

  // Firebase Configuration
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_DEV,
    authDomain: 'legacykeep-dev.firebaseapp.com',
    projectId: 'legacykeep-dev',
    storageBucket: 'legacykeep-dev.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abcdef123456',
    measurementId: 'G-ABCDEF1234',
  },

  // AWS S3 Configuration
  aws: {
    region: 'us-east-1',
    bucket: 'legacykeep-dev-media',
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID_DEV,
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_DEV,
    cdnUrl: 'https://dev-media.legacykeep.com',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV,
    merchantId: 'merchant.com.legacykeep.dev',
    urlScheme: 'legacykeep-dev',
  },

  // Google Maps Configuration
  maps: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_DEV,
    region: 'US',
    language: 'en',
  },

  // Feature Flags
  features: {
    enableAnalytics: false,
    enableCrashlytics: false,
    enablePushNotifications: false,
    enableBiometricAuth: false,
    enablePremiumFeatures: false,
    enableSocialLogin: false,
    enableLocationServices: false,
    enableCamera: true,
    enableGallery: true,
  },

  // Mock Services
  mock: {
    enableMockAuth: true,
    enableMockApi: true,
    enableMockStorage: true,
    enableMockNotifications: true,
  },

  // Development Tools
  devTools: {
    enableFlipper: true,
    enableReactDevTools: true,
    enableReduxDevTools: true,
    enableNetworkInspector: true,
  },
};
```

### 2. **QA Environment**
```typescript
// config/environments/qa.ts
export const qaConfig = {
  // App Configuration
  app: {
    name: 'LegacyKeep QA',
    version: '1.0.0-qa',
    buildNumber: '1',
    bundleId: 'com.legacykeep.qa',
    environment: 'qa',
    debugMode: true,
    logLevel: 'info',
  },

  // API Configuration
  api: {
    baseUrl: 'https://api-qa.legacykeep.com',
    timeout: 15000,
    retryAttempts: 3,
    endpoints: {
      auth: 'https://auth-qa.legacykeep.com',
      user: 'https://user-qa.legacykeep.com',
      chat: 'https://chat-qa.legacykeep.com',
      stories: 'https://stories-qa.legacykeep.com',
      family: 'https://family-qa.legacykeep.com',
    },
  },

  // Firebase Configuration
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_QA,
    authDomain: 'legacykeep-qa.firebaseapp.com',
    projectId: 'legacykeep-qa',
    storageBucket: 'legacykeep-qa.appspot.com',
    messagingSenderId: '987654321',
    appId: '1:987654321:web:fedcba654321',
    measurementId: 'G-FEDCBA6543',
  },

  // AWS S3 Configuration
  aws: {
    region: 'us-east-1',
    bucket: 'legacykeep-qa-media',
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID_QA,
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_QA,
    cdnUrl: 'https://qa-media.legacykeep.com',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_QA,
    merchantId: 'merchant.com.legacykeep.qa',
    urlScheme: 'legacykeep-qa',
  },

  // Google Maps Configuration
  maps: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_QA,
    region: 'US',
    language: 'en',
  },

  // Feature Flags
  features: {
    enableAnalytics: true,
    enableCrashlytics: true,
    enablePushNotifications: true,
    enableBiometricAuth: true,
    enablePremiumFeatures: true,
    enableSocialLogin: true,
    enableLocationServices: true,
    enableCamera: true,
    enableGallery: true,
  },

  // Mock Services
  mock: {
    enableMockAuth: false,
    enableMockApi: false,
    enableMockStorage: false,
    enableMockNotifications: false,
  },

  // Development Tools
  devTools: {
    enableFlipper: true,
    enableReactDevTools: true,
    enableReduxDevTools: true,
    enableNetworkInspector: true,
  },
};
```

### 3. **Staging Environment**
```typescript
// config/environments/staging.ts
export const stagingConfig = {
  // App Configuration
  app: {
    name: 'LegacyKeep Staging',
    version: '1.0.0-staging',
    buildNumber: '1',
    bundleId: 'com.legacykeep.staging',
    environment: 'staging',
    debugMode: false,
    logLevel: 'warn',
  },

  // API Configuration
  api: {
    baseUrl: 'https://api-staging.legacykeep.com',
    timeout: 20000,
    retryAttempts: 3,
    endpoints: {
      auth: 'https://auth-staging.legacykeep.com',
      user: 'https://user-staging.legacykeep.com',
      chat: 'https://chat-staging.legacykeep.com',
      stories: 'https://stories-staging.legacykeep.com',
      family: 'https://family-staging.legacykeep.com',
    },
  },

  // Firebase Configuration
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_STAGING,
    authDomain: 'legacykeep-staging.firebaseapp.com',
    projectId: 'legacykeep-staging',
    storageBucket: 'legacykeep-staging.appspot.com',
    messagingSenderId: '111222333',
    appId: '1:111222333:web:staging123456',
    measurementId: 'G-STAGING1234',
  },

  // AWS S3 Configuration
  aws: {
    region: 'us-east-1',
    bucket: 'legacykeep-staging-media',
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID_STAGING,
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_STAGING,
    cdnUrl: 'https://staging-media.legacykeep.com',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_STAGING,
    merchantId: 'merchant.com.legacykeep.staging',
    urlScheme: 'legacykeep-staging',
  },

  // Google Maps Configuration
  maps: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_STAGING,
    region: 'US',
    language: 'en',
  },

  // Feature Flags
  features: {
    enableAnalytics: true,
    enableCrashlytics: true,
    enablePushNotifications: true,
    enableBiometricAuth: true,
    enablePremiumFeatures: true,
    enableSocialLogin: true,
    enableLocationServices: true,
    enableCamera: true,
    enableGallery: true,
  },

  // Mock Services
  mock: {
    enableMockAuth: false,
    enableMockApi: false,
    enableMockStorage: false,
    enableMockNotifications: false,
  },

  // Development Tools
  devTools: {
    enableFlipper: false,
    enableReactDevTools: false,
    enableReduxDevTools: false,
    enableNetworkInspector: false,
  },
};
```

### 4. **Production Environment**
```typescript
// config/environments/production.ts
export const productionConfig = {
  // App Configuration
  app: {
    name: 'LegacyKeep',
    version: '1.0.0',
    buildNumber: '1',
    bundleId: 'com.legacykeep.app',
    environment: 'production',
    debugMode: false,
    logLevel: 'error',
  },

  // API Configuration
  api: {
    baseUrl: 'https://api.legacykeep.com',
    timeout: 30000,
    retryAttempts: 3,
    endpoints: {
      auth: 'https://auth.legacykeep.com',
      user: 'https://user.legacykeep.com',
      chat: 'https://chat.legacykeep.com',
      stories: 'https://stories.legacykeep.com',
      family: 'https://family.legacykeep.com',
    },
  },

  // Firebase Configuration
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY_PROD,
    authDomain: 'legacykeep-prod.firebaseapp.com',
    projectId: 'legacykeep-prod',
    storageBucket: 'legacykeep-prod.appspot.com',
    messagingSenderId: '444555666',
    appId: '1:444555666:web:prod123456789',
    measurementId: 'G-PROD1234567',
  },

  // AWS S3 Configuration
  aws: {
    region: 'us-east-1',
    bucket: 'legacykeep-prod-media',
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID_PROD,
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_PROD,
    cdnUrl: 'https://media.legacykeep.com',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_PROD,
    merchantId: 'merchant.com.legacykeep.app',
    urlScheme: 'legacykeep',
  },

  // Google Maps Configuration
  maps: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_PROD,
    region: 'US',
    language: 'en',
  },

  // Feature Flags
  features: {
    enableAnalytics: true,
    enableCrashlytics: true,
    enablePushNotifications: true,
    enableBiometricAuth: true,
    enablePremiumFeatures: true,
    enableSocialLogin: true,
    enableLocationServices: true,
    enableCamera: true,
    enableGallery: true,
  },

  // Mock Services
  mock: {
    enableMockAuth: false,
    enableMockApi: false,
    enableMockStorage: false,
    enableMockNotifications: false,
  },

  // Development Tools
  devTools: {
    enableFlipper: false,
    enableReactDevTools: false,
    enableReduxDevTools: false,
    enableNetworkInspector: false,
  },
};
```

## 🔧 Environment Manager

### **Environment Configuration Manager**
```typescript
// config/environments/index.ts
import { developmentConfig } from './development';
import { qaConfig } from './qa';
import { stagingConfig } from './staging';
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
      stories: string;
      family: string;
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
      case 'qa':
        return qaConfig;
      case 'staging':
        return stagingConfig;
      case 'production':
        return productionConfig;
      default:
        return developmentConfig;
    }
  }

  private getCurrentEnvironment(): Environment {
    // Check for environment variable first
    const envVar = process.env.EXPO_PUBLIC_ENVIRONMENT as Environment;
    if (envVar && ['development', 'qa', 'staging', 'production'].includes(envVar)) {
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
```

## 📄 Environment Files

### **Development Environment File**
```bash
# .env.development
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_BUNDLE_ID=com.legacykeep.dev

# Firebase Development
EXPO_PUBLIC_FIREBASE_API_KEY_DEV=AIzaSyDev123456789
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV=legacykeep-dev.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID_DEV=legacykeep-dev
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV=legacykeep-dev.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEV=123456789
EXPO_PUBLIC_FIREBASE_APP_ID_DEV=1:123456789:web:abcdef123456

# AWS S3 Development
EXPO_PUBLIC_AWS_REGION_DEV=us-east-1
EXPO_PUBLIC_AWS_S3_BUCKET_DEV=legacykeep-dev-media
EXPO_PUBLIC_AWS_ACCESS_KEY_ID_DEV=AKIAIOSFODNN7EXAMPLE
EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_DEV=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# Stripe Development
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV=pk_test_123456789
EXPO_PUBLIC_STRIPE_MERCHANT_ID_DEV=merchant.com.legacykeep.dev

# Google Maps Development
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_DEV=AIzaSyDev123456789
```

### **QA Environment File**
```bash
# .env.qa
EXPO_PUBLIC_ENVIRONMENT=qa
EXPO_PUBLIC_BUNDLE_ID=com.legacykeep.qa

# Firebase QA
EXPO_PUBLIC_FIREBASE_API_KEY_QA=AIzaSyQA123456789
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN_QA=legacykeep-qa.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID_QA=legacykeep-qa
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET_QA=legacykeep-qa.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_QA=987654321
EXPO_PUBLIC_FIREBASE_APP_ID_QA=1:987654321:web:fedcba654321

# AWS S3 QA
EXPO_PUBLIC_AWS_REGION_QA=us-east-1
EXPO_PUBLIC_AWS_S3_BUCKET_QA=legacykeep-qa-media
EXPO_PUBLIC_AWS_ACCESS_KEY_ID_QA=AKIAIOSFODNN7EXAMPLE
EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_QA=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# Stripe QA
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_QA=pk_test_987654321
EXPO_PUBLIC_STRIPE_MERCHANT_ID_QA=merchant.com.legacykeep.qa

# Google Maps QA
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_QA=AIzaSyQA123456789
```

### **Staging Environment File**
```bash
# .env.staging
EXPO_PUBLIC_ENVIRONMENT=staging
EXPO_PUBLIC_BUNDLE_ID=com.legacykeep.staging

# Firebase Staging
EXPO_PUBLIC_FIREBASE_API_KEY_STAGING=AIzaSyStaging123456
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN_STAGING=legacykeep-staging.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID_STAGING=legacykeep-staging
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET_STAGING=legacykeep-staging.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_STAGING=111222333
EXPO_PUBLIC_FIREBASE_APP_ID_STAGING=1:111222333:web:staging123456

# AWS S3 Staging
EXPO_PUBLIC_AWS_REGION_STAGING=us-east-1
EXPO_PUBLIC_AWS_S3_BUCKET_STAGING=legacykeep-staging-media
EXPO_PUBLIC_AWS_ACCESS_KEY_ID_STAGING=AKIAIOSFODNN7EXAMPLE
EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_STAGING=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# Stripe Staging
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_STAGING=pk_test_staging123
EXPO_PUBLIC_STRIPE_MERCHANT_ID_STAGING=merchant.com.legacykeep.staging

# Google Maps Staging
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_STAGING=AIzaSyStaging123456
```

### **Production Environment File**
```bash
# .env.production
EXPO_PUBLIC_ENVIRONMENT=production
EXPO_PUBLIC_BUNDLE_ID=com.legacykeep.app

# Firebase Production
EXPO_PUBLIC_FIREBASE_API_KEY_PROD=AIzaSyProd123456789
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN_PROD=legacykeep-prod.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID_PROD=legacykeep-prod
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET_PROD=legacykeep-prod.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_PROD=444555666
EXPO_PUBLIC_FIREBASE_APP_ID_PROD=1:444555666:web:prod123456789

# AWS S3 Production
EXPO_PUBLIC_AWS_REGION_PROD=us-east-1
EXPO_PUBLIC_AWS_S3_BUCKET_PROD=legacykeep-prod-media
EXPO_PUBLIC_AWS_ACCESS_KEY_ID_PROD=AKIAIOSFODNN7EXAMPLE
EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_PROD=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# Stripe Production
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_PROD=pk_live_prod123456
EXPO_PUBLIC_STRIPE_MERCHANT_ID_PROD=merchant.com.legacykeep.app

# Google Maps Production
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_PROD=AIzaSyProd123456789
```

### **Environment Example File**
```bash
# .env.example
# Copy this file to .env.development, .env.qa, .env.staging, or .env.production
# and fill in the actual values

EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_BUNDLE_ID=com.legacykeep.dev

# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY_DEV=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID_DEV=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEV=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID_DEV=your_app_id

# AWS S3 Configuration
EXPO_PUBLIC_AWS_REGION_DEV=us-east-1
EXPO_PUBLIC_AWS_S3_BUCKET_DEV=your_bucket_name
EXPO_PUBLIC_AWS_ACCESS_KEY_ID_DEV=your_access_key_id
EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY_DEV=your_secret_access_key

# Stripe Configuration
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV=your_stripe_publishable_key
EXPO_PUBLIC_STRIPE_MERCHANT_ID_DEV=merchant.com.legacykeep.dev

# Google Maps Configuration
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_DEV=your_google_maps_api_key
```

## 🚀 Build Configuration

### **Package.json Scripts**
```json
{
  "scripts": {
    "start": "expo start",
    "start:dev": "EXPO_PUBLIC_ENVIRONMENT=development expo start",
    "start:qa": "EXPO_PUBLIC_ENVIRONMENT=qa expo start",
    "start:staging": "EXPO_PUBLIC_ENVIRONMENT=staging expo start",
    "start:prod": "EXPO_PUBLIC_ENVIRONMENT=production expo start",
    
    "build:dev": "EXPO_PUBLIC_ENVIRONMENT=development expo build:android",
    "build:qa": "EXPO_PUBLIC_ENVIRONMENT=qa expo build:android",
    "build:staging": "EXPO_PUBLIC_ENVIRONMENT=staging expo build:android",
    "build:prod": "EXPO_PUBLIC_ENVIRONMENT=production expo build:android",
    
    "build:ios:dev": "EXPO_PUBLIC_ENVIRONMENT=development expo build:ios",
    "build:ios:qa": "EXPO_PUBLIC_ENVIRONMENT=qa expo build:ios",
    "build:ios:staging": "EXPO_PUBLIC_ENVIRONMENT=staging expo build:ios",
    "build:ios:prod": "EXPO_PUBLIC_ENVIRONMENT=production expo build:ios",
    
    "test:dev": "EXPO_PUBLIC_ENVIRONMENT=development jest",
    "test:qa": "EXPO_PUBLIC_ENVIRONMENT=qa jest",
    "test:staging": "EXPO_PUBLIC_ENVIRONMENT=staging jest",
    "test:prod": "EXPO_PUBLIC_ENVIRONMENT=production jest"
  }
}
```

### **App.json Configuration**
```json
{
  "expo": {
    "name": "LegacyKeep",
    "slug": "legacykeep",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.legacykeep.app",
      "buildNumber": "1",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app needs location access to show family members on a map",
        "NSCameraUsageDescription": "This app needs camera access to capture family photos",
        "NSPhotoLibraryUsageDescription": "This app needs photo library access to select family photos",
        "NSMicrophoneUsageDescription": "This app needs microphone access to record family stories"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.legacykeep.app",
      "versionCode": 1,
      "permissions": [
        "android.permission.INTERNET",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.RECORD_AUDIO"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

## 🧪 Testing Configuration

### **Environment-Specific Tests**
```typescript
// __tests__/config/environment.test.ts
import { environmentManager } from '@/config/environments';

describe('EnvironmentManager', () => {
  beforeEach(() => {
    // Reset environment
    process.env.EXPO_PUBLIC_ENVIRONMENT = 'development';
  });

  it('should load development config in development mode', () => {
    process.env.EXPO_PUBLIC_ENVIRONMENT = 'development';
    const config = environmentManager.getConfig();
    
    expect(config.app.environment).toBe('development');
    expect(config.app.debugMode).toBe(true);
    expect(config.features.enableAnalytics).toBe(false);
  });

  it('should load production config in production mode', () => {
    process.env.EXPO_PUBLIC_ENVIRONMENT = 'production';
    const config = environmentManager.getConfig();
    
    expect(config.app.environment).toBe('production');
    expect(config.app.debugMode).toBe(false);
    expect(config.features.enableAnalytics).toBe(true);
  });

  it('should return correct API endpoints', () => {
    const authEndpoint = environmentManager.getApiEndpoint('auth');
    expect(authEndpoint).toBeDefined();
    expect(authEndpoint).toContain('http');
  });

  it('should return feature flags correctly', () => {
    const analyticsEnabled = environmentManager.getFeatureFlag('enableAnalytics');
    expect(typeof analyticsEnabled).toBe('boolean');
  });
});
```

## 🔒 Security Considerations

### **Environment Security**
- **API Keys**: Never commit real API keys to version control
- **Environment Files**: Add to .gitignore
- **Build Process**: Use CI/CD for environment-specific builds
- **Key Rotation**: Regular rotation of API keys
- **Access Control**: Limit access to production environment files

### **Build Security**
- **Code Signing**: Sign all production builds
- **Bundle Analysis**: Analyze bundle for security vulnerabilities
- **Dependency Scanning**: Regular security scans of dependencies
- **Environment Validation**: Validate environment configuration at runtime

---

**This comprehensive environment configuration ensures LegacyKeep works seamlessly across all environments!** 🚀✨
