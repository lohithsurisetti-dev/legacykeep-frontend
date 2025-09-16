/**
 * Development Environment Configuration
 *
 * Local development with mock services and debugging enabled
 */

export const developmentConfig = {
  // App Configuration
  app: {
    name: 'LegacyKeep Dev',
    version: '1.0.0-dev',
    buildNumber: '1',
    bundleId: 'com.legacykeep.dev',
    environment: 'development' as const,
    debugMode: true,
    logLevel: 'debug' as const,
  },

  // API Configuration
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080',
    timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000'),
    retryAttempts: parseInt(process.env.EXPO_PUBLIC_API_RETRY_ATTEMPTS || '3'),
    endpoints: {
      auth: process.env.EXPO_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8081',
      user: process.env.EXPO_PUBLIC_USER_SERVICE_URL || 'http://localhost:8082',
      chat: process.env.EXPO_PUBLIC_CHAT_SERVICE_URL || 'http://localhost:8083',
      family:
        process.env.EXPO_PUBLIC_FAMILY_SERVICE_URL || 'http://localhost:8084',
      stories:
        process.env.EXPO_PUBLIC_STORY_SERVICE_URL || 'http://localhost:8085',
      media:
        process.env.EXPO_PUBLIC_MEDIA_SERVICE_URL || 'http://localhost:8086',
      notifications:
        process.env.EXPO_PUBLIC_NOTIFICATION_SERVICE_URL ||
        'http://localhost:8087',
    },
  },

  // Firebase Configuration
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
    authDomain:
      process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
      'legacykeep-dev.firebaseapp.com',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'legacykeep-dev',
    storageBucket:
      process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      'legacykeep-dev.appspot.com',
    messagingSenderId:
      process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId:
      process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
    measurementId:
      process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-ABCDEF1234',
  },

  // AWS S3 Configuration
  aws: {
    region: process.env.EXPO_PUBLIC_AWS_REGION || 'us-east-1',
    bucket: process.env.EXPO_PUBLIC_AWS_S3_BUCKET || 'legacykeep-dev-media',
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
    cdnUrl:
      process.env.EXPO_PUBLIC_AWS_CDN_URL || 'https://dev-media.legacykeep.com',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    merchantId:
      process.env.EXPO_PUBLIC_STRIPE_MERCHANT_ID ||
      'merchant.com.legacykeep.dev',
    urlScheme: 'legacykeep-dev',
  },

  // Google Maps Configuration
  maps: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    region: 'US',
    language: 'en',
  },

  // Feature Flags
  features: {
    enableAnalytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableCrashlytics: process.env.EXPO_PUBLIC_ENABLE_CRASHLYTICS === 'true',
    enablePushNotifications:
      process.env.EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS === 'true',
    enableBiometricAuth:
      process.env.EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH === 'true',
    enablePremiumFeatures:
      process.env.EXPO_PUBLIC_ENABLE_PREMIUM_FEATURES === 'true',
    enableSocialLogin: process.env.EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN === 'true',
    enableLocationServices:
      process.env.EXPO_PUBLIC_ENABLE_LOCATION_SERVICES === 'true',
    enableCamera: process.env.EXPO_PUBLIC_ENABLE_CAMERA !== 'false',
    enableGallery: process.env.EXPO_PUBLIC_ENABLE_GALLERY !== 'false',
  },

  // Mock Services
  mock: {
    enableMockAuth: process.env.EXPO_PUBLIC_ENABLE_MOCK_AUTH !== 'false',
    enableMockApi: process.env.EXPO_PUBLIC_ENABLE_MOCK_API !== 'false',
    enableMockStorage: process.env.EXPO_PUBLIC_ENABLE_MOCK_STORAGE !== 'false',
    enableMockNotifications:
      process.env.EXPO_PUBLIC_ENABLE_MOCK_NOTIFICATIONS !== 'false',
  },

  // Development Tools
  devTools: {
    enableFlipper: process.env.EXPO_PUBLIC_ENABLE_FLIPPER !== 'false',
    enableReactDevTools:
      process.env.EXPO_PUBLIC_ENABLE_REACT_DEV_TOOLS !== 'false',
    enableReduxDevTools:
      process.env.EXPO_PUBLIC_ENABLE_REDUX_DEV_TOOLS !== 'false',
    enableNetworkInspector:
      process.env.EXPO_PUBLIC_ENABLE_NETWORK_INSPECTOR !== 'false',
  },
};
