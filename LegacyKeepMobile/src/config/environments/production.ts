/**
 * Production Environment Configuration
 *
 * Live environment with production services and optimized settings
 */

export const productionConfig = {
  // App Configuration
  app: {
    name: 'LegacyKeep',
    version: '1.0.0',
    buildNumber: '1',
    bundleId: 'com.legacykeep.app',
    environment: 'production' as const,
    debugMode: false,
    logLevel: 'error' as const,
  },

  // API Configuration
  api: {
    baseUrl:
      process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.legacykeep.com',
    timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000'),
    retryAttempts: parseInt(process.env.EXPO_PUBLIC_API_RETRY_ATTEMPTS || '3'),
    endpoints: {
      auth:
        process.env.EXPO_PUBLIC_AUTH_SERVICE_URL ||
        'https://auth.legacykeep.com',
      user:
        process.env.EXPO_PUBLIC_USER_SERVICE_URL ||
        'https://user.legacykeep.com',
      chat:
        process.env.EXPO_PUBLIC_CHAT_SERVICE_URL ||
        'https://chat.legacykeep.com',
      family:
        process.env.EXPO_PUBLIC_FAMILY_SERVICE_URL ||
        'https://family.legacykeep.com',
      stories:
        process.env.EXPO_PUBLIC_STORY_SERVICE_URL ||
        'https://stories.legacykeep.com',
      media:
        process.env.EXPO_PUBLIC_MEDIA_SERVICE_URL ||
        'https://media.legacykeep.com',
      notifications:
        process.env.EXPO_PUBLIC_NOTIFICATION_SERVICE_URL ||
        'https://notifications.legacykeep.com',
    },
  },

  // Firebase Configuration
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
    authDomain:
      process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
      'legacykeep-prod.firebaseapp.com',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'legacykeep-prod',
    storageBucket:
      process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      'legacykeep-prod.appspot.com',
    messagingSenderId:
      process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '444555666',
    appId:
      process.env.EXPO_PUBLIC_FIREBASE_APP_ID ||
      '1:444555666:web:prod123456789',
    measurementId:
      process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-PROD1234567',
  },

  // AWS S3 Configuration
  aws: {
    region: process.env.EXPO_PUBLIC_AWS_REGION || 'us-east-1',
    bucket: process.env.EXPO_PUBLIC_AWS_S3_BUCKET || 'legacykeep-prod-media',
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
    cdnUrl:
      process.env.EXPO_PUBLIC_AWS_CDN_URL || 'https://media.legacykeep.com',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    merchantId:
      process.env.EXPO_PUBLIC_STRIPE_MERCHANT_ID ||
      'merchant.com.legacykeep.app',
    urlScheme: 'legacykeep',
  },

  // Google Maps Configuration
  maps: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    region: 'US',
    language: 'en',
  },

  // Feature Flags
  features: {
    enableAnalytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS !== 'false',
    enableCrashlytics: process.env.EXPO_PUBLIC_ENABLE_CRASHLYTICS !== 'false',
    enablePushNotifications:
      process.env.EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS !== 'false',
    enableBiometricAuth:
      process.env.EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH !== 'false',
    enablePremiumFeatures:
      process.env.EXPO_PUBLIC_ENABLE_PREMIUM_FEATURES !== 'false',
    enableSocialLogin: process.env.EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN !== 'false',
    enableLocationServices:
      process.env.EXPO_PUBLIC_ENABLE_LOCATION_SERVICES !== 'false',
    enableCamera: process.env.EXPO_PUBLIC_ENABLE_CAMERA !== 'false',
    enableGallery: process.env.EXPO_PUBLIC_ENABLE_GALLERY !== 'false',
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
