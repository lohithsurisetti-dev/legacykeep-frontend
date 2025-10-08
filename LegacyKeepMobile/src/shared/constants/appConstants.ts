/**
 * Application Constants
 * 
 * Centralized constants for magic numbers, strings, and configuration values
 * No hardcoded values should exist outside of this file
 */

// =============================================================================
// UI/UX Constants
// =============================================================================

export const UI_CONSTANTS = {
  // Card Dimensions
  PONG_CARD: {
    WIDTH: 280,
    HEIGHT: 160,
    BORDER_RADIUS: 16,
  },
  
  // Ping & Pong
  PING: {
    EXPIRY_MINUTES: 30,
  },
  
  // Animation Durations (in milliseconds)
  ANIMATION: {
    FAST: 150,
    NORMAL: 180,
    SLOW: 300,
    TRAIN_EFFECT: 180,
  },
  
  // Timeouts (in milliseconds)
  TIMEOUT: {
    SHORT: 1000,
    MEDIUM: 1500,
    LONG: 3000,
    API_CALL_DEMO: 1500,
  },
  
  // Intervals (in milliseconds)
  INTERVAL: {
    PING_REFRESH: 30000, // 30 seconds
    STATUS_UPDATE: 60000, // 1 minute
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
} as const;

// =============================================================================
// Business Logic Constants
// =============================================================================

export const BUSINESS_CONSTANTS = {
  // Ping & Pong
  PING: {
    EXPIRY_MINUTES: 30,
    MAX_ACTIVE_PINGS: 10,
  },
  
  // User Limits
  USER: {
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 30,
    MIN_PASSWORD_LENGTH: 8,
    MAX_BIO_LENGTH: 500,
    MAX_FAMILY_MEMBERS: 1000,
  },
  
  // File Upload Limits
  UPLOAD: {
    MAX_IMAGE_SIZE_MB: 10,
    MAX_VIDEO_SIZE_MB: 100,
    MAX_DOCUMENT_SIZE_MB: 25,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
} as const;

// =============================================================================
// Default Values
// =============================================================================

export const DEFAULTS = {
  // User Profile
  USER_INITIALS: 'LS',
  FAMILY_NAME: 'My Family',
  RELATIONSHIP: 'Family Member',
  
  // Placeholders
  PLACEHOLDER_TEXT: {
    NO_DESCRIPTION: 'No description available',
    NO_CONTENT: 'No content to display',
    LOADING: 'Loading...',
    ERROR: 'Something went wrong',
  },
  
  // Mock Credentials (Development Only)
  MOCK_CREDENTIALS: {
    EMAIL: 'test@example.com',
    PASSWORD: 'password',
    USERNAME: 'testuser',
  },
} as const;

// =============================================================================
// API Constants
// =============================================================================

export const API_CONSTANTS = {
  // Retry Configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 1000,
    BACKOFF_MULTIPLIER: 2,
  },
  
  // Timeout Configuration
  TIMEOUT: {
    DEFAULT: 30000, // 30 seconds
    UPLOAD: 60000, // 1 minute
    DOWNLOAD: 120000, // 2 minutes
  },
  
  // Cache Configuration
  CACHE: {
    TTL_SHORT: 300000, // 5 minutes
    TTL_MEDIUM: 900000, // 15 minutes
    TTL_LONG: 3600000, // 1 hour
  },
} as const;

// =============================================================================
// Storage Keys
// =============================================================================

export const STORAGE_KEYS = {
  // Authentication
  ACCESS_TOKEN: '@legacykeep:accessToken',
  REFRESH_TOKEN: '@legacykeep:refreshToken',
  TOKEN_EXPIRY: '@legacykeep:tokenExpiry',
  
  // User Preferences
  LANGUAGE: '@legacykeep:language',
  THEME: '@legacykeep:theme',
  ONBOARDING_COMPLETE: '@legacykeep:onboardingComplete',
  
  // App State
  LAST_SYNC: '@legacykeep:lastSync',
  CACHED_DATA: '@legacykeep:cachedData',
} as const;

// =============================================================================
// Regex Patterns
// =============================================================================

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,30}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/.+/,
} as const;

// =============================================================================
// Error Messages
// =============================================================================

export const ERROR_MESSAGES = {
  NETWORK: {
    NO_CONNECTION: 'No internet connection. Please check your network.',
    TIMEOUT: 'Request timed out. Please try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
  },
  
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_USERNAME: 'Username must be 3-30 characters and contain only letters, numbers, hyphens, and underscores',
    WEAK_PASSWORD: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
  },
  
  AUTH: {
    LOGIN_FAILED: 'Login failed. Please check your credentials.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
  },
} as const;

// =============================================================================
// Success Messages
// =============================================================================

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful!',
    LOGOUT_SUCCESS: 'Logged out successfully',
    REGISTRATION_SUCCESS: 'Registration successful!',
    PASSWORD_RESET_SUCCESS: 'Password reset successfully',
  },
  
  PROFILE: {
    UPDATE_SUCCESS: 'Profile updated successfully',
    PHOTO_UPLOAD_SUCCESS: 'Photo uploaded successfully',
  },
  
  CONTENT: {
    POST_CREATED: 'Post created successfully',
    POST_UPDATED: 'Post updated successfully',
    POST_DELETED: 'Post deleted successfully',
  },
} as const;

// =============================================================================
// Route Names (for deep linking and analytics)
// =============================================================================

export const SCREEN_NAMES = {
  // Auth
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Main
  HOME: 'Home',
  FAMILY: 'Family',
  CHAT: 'Chat',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  
  // Content
  CREATE: 'Create',
  STORIES: 'Stories',
  MEDIA: 'Media',
} as const;

// =============================================================================
// Feature Flags (for gradual rollout)
// =============================================================================

export const FEATURE_FLAGS = {
  ENABLE_PING_PONG: true,
  ENABLE_STORIES: true,
  ENABLE_VIDEO_CALLS: true,
  ENABLE_AUDIO_CALLS: true,
  ENABLE_AI_FEATURES: false, // To be enabled later
  ENABLE_PREMIUM_FEATURES: false,
} as const;

// Type exports for TypeScript
export type UIConstants = typeof UI_CONSTANTS;
export type BusinessConstants = typeof BUSINESS_CONSTANTS;
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
export type ScreenName = typeof SCREEN_NAMES[keyof typeof SCREEN_NAMES];
