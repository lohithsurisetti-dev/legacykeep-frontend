/**
 * LegacyKeep Constants Export
 *
 * Centralized export of all design system constants
 */

export { colors, gradients, theme } from './colors';
export type { ColorTheme, GradientType } from './colors';

export { typography, textStyles } from './typography';
export type { TextStyle, FontSize, FontWeight } from './typography';

export { spacing, semanticSpacing, borderRadius, shadows } from './spacing';
export type { Spacing, BorderRadius, Shadow } from './spacing';

export { LAYOUT } from './layout';
export type { LayoutConstants } from './layout';

// App Configuration
export const APP_CONFIG = {
  name: 'LegacyKeep',
  version: '1.0.0',
  bundleId: 'com.legacykeep.app',
  environment: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',
} as const;

// API Configuration
export const API_CONFIG = {
  timeout: 10000,
  retryAttempts: 3,
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080',
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// Screen Dimensions
export const SCREEN_CONFIG = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
} as const;
