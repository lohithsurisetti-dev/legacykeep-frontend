/**
 * LegacyKeep Design System
 * 
 * SINGLE SOURCE OF TRUTH for all design tokens
 * Change any value here and it updates across the entire app
 */

import { colors } from './colors';

// ============================================================================
// CORE DESIGN TOKENS - SINGLE SOURCE OF TRUTH
// ============================================================================

/**
 * App Brand Colors - THE ONLY PLACE TO CHANGE THESE
 * Change any color here and it updates everywhere in the app
 */
export const brandColors = {
  // Peacock Gradient Colors
  peacock: {
    teal: '#247B7B',
    blue: '#3b5998', 
    purple: '#8A2BE2',
  },
  
  // Splash Gradient Colors
  splash: {
    teal: '#0d9488',
    purple: '#7c3aed',
    indigo: '#6366f1',
  },
  
  // Accent Colors
  accent: '#FFC75F', // Golden accent
  
  // Glassmorphism Colors
  glass: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'rgba(255, 255, 255, 0.3)',
    text: 'rgba(255, 255, 255, 0.9)',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
  },
} as const;

// ============================================================================
// DERIVED VALUES - AUTOMATICALLY UPDATED WHEN BRAND COLORS CHANGE
// ============================================================================

/**
 * Gradients - Automatically derived from brand colors
 * NO HARDCODED VALUES - Always references brandColors
 */
export const gradients = {
  peacock: [brandColors.peacock.teal, brandColors.peacock.blue, brandColors.peacock.purple],
  splash: [brandColors.splash.teal, brandColors.splash.purple, brandColors.splash.indigo],
} as const;

/**
 * Gradient Configurations - Automatically derived
 */
export const gradientConfigs = {
  peacock: {
    colors: gradients.peacock,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  splash: {
    colors: gradients.splash,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  horizontal: {
    colors: gradients.peacock,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
} as const;

/**
 * Component Colors - Automatically derived from brand colors
 */
export const componentColors = {
  // Button colors
  primaryButton: {
    background: colors.neutral[50], // White
    text: brandColors.peacock.teal,
  },
  
  // Glassmorphism colors
  glassmorphism: {
    background: brandColors.glass.background,
    border: brandColors.glass.border,
    text: brandColors.glass.text,
    textSecondary: brandColors.glass.textSecondary,
  },
  
  // Social button colors
  socialButton: {
    background: brandColors.glass.background,
    border: brandColors.glass.border,
    text: colors.neutral[50],
  },
  
  // Link colors
  link: {
    primary: brandColors.accent,
    secondary: brandColors.glass.text,
  },
} as const;

// ============================================================================
// USAGE EXAMPLES AND DOCUMENTATION
// ============================================================================

/**
 * HOW TO USE THIS DESIGN SYSTEM:
 * 
 * 1. TO CHANGE A GRADIENT:
 *    - Change the color in brandColors.peacock or brandColors.splash
 *    - The gradient automatically updates everywhere
 * 
 * 2. TO CHANGE GLASSMORPHISM:
 *    - Change values in brandColors.glass
 *    - All glassmorphism components update automatically
 * 
 * 3. TO ADD NEW COLORS:
 *    - Add to brandColors
 *    - Create derived values in gradients/componentColors
 * 
 * 4. NEVER HARDCODE COLORS:
 *    - Always use brandColors, gradients, or componentColors
 *    - Never write '#247B7B' directly in components
 */

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type BrandColor = typeof brandColors;
export type GradientType = keyof typeof gradients;
export type GradientConfigType = keyof typeof gradientConfigs;
export type ComponentColorType = keyof typeof componentColors;
