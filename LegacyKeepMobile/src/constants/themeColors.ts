/**
 * Comprehensive Theme Color System
 * 
 * Complete semantic color definitions for robust light/dark theme support
 * Covers every possible use case in the app
 */

import { colors } from './colors';

// Complete semantic color system
export const themeColors = {
  light: {
    // =================================================================
    // BACKGROUNDS
    // =================================================================
    background: colors.neutral[50],           // Main app background
    surface: colors.neutral[50],              // Card/container backgrounds
    surfaceSecondary: colors.neutral[100],    // Secondary surfaces
    card: colors.neutral[50],                 // Memory cards, containers
    
    // =================================================================
    // TEXT COLORS
    // =================================================================
    text: colors.neutral[900],                // Primary text
    textSecondary: colors.neutral[600],       // Secondary text
    textTertiary: colors.neutral[400],        // Tertiary text (placeholders)
    textInverse: colors.neutral[50],          // Text on dark backgrounds
    textDisabled: colors.neutral[300],        // Disabled text
    
    // =================================================================
    // INTERACTIVE ELEMENTS
    // =================================================================
    primary: colors.secondary.teal[600],      // Primary buttons, links
    primaryHover: colors.secondary.teal[700], // Primary hover state
    secondary: colors.neutral[500],           // Secondary buttons
    accent: colors.secondary.purple[500],     // Accent elements
    
    // =================================================================
    // BORDERS & DIVIDERS
    // =================================================================
    border: colors.neutral[200],              // Default borders
    borderLight: colors.neutral[100],         // Light borders
    borderMedium: colors.neutral[300],        // Medium borders
    borderStrong: colors.neutral[400],        // Strong borders
    divider: colors.neutral[200],             // Divider lines
    
    // =================================================================
    // STATUS COLORS
    // =================================================================
    error: colors.error[500],                 // Error states
    errorBackground: colors.error[50],        // Error backgrounds
    success: colors.success[500],             // Success states
    successBackground: colors.success[50],    // Success backgrounds
    warning: colors.warning[500],             // Warning states
    warningBackground: colors.warning[50],    // Warning backgrounds
    info: colors.primary[500],                // Info states
    infoBackground: colors.primary[50],       // Info backgrounds
    
    // =================================================================
    // NAVIGATION
    // =================================================================
    navigationBackground: colors.neutral[50], // Bottom nav background
    navigationBorder: colors.neutral[200],    // Navigation borders
    navigationActive: colors.secondary.teal[600], // Active nav items
    navigationInactive: colors.neutral[400],  // Inactive nav items
    
    // =================================================================
    // OVERLAYS & EFFECTS
    // =================================================================
    overlay: 'rgba(0, 0, 0, 0.5)',          // Modal overlays
    overlayLight: 'rgba(0, 0, 0, 0.3)',     // Light overlays
    shadow: 'rgba(0, 0, 0, 0.1)',          // Default shadows
    shadowMedium: 'rgba(0, 0, 0, 0.15)',   // Medium shadows
    shadowStrong: 'rgba(0, 0, 0, 0.25)',   // Strong shadows
    
    // =================================================================
    // GLASSMORPHISM (Keep for non-gradient screens)
    // =================================================================
    glass: 'rgba(255, 255, 255, 0.2)',     // Glass background
    glassBorder: 'rgba(255, 255, 255, 0.3)', // Glass borders
    glassText: 'rgba(255, 255, 255, 0.9)', // Text on glass
    glassTextSecondary: 'rgba(255, 255, 255, 0.7)', // Secondary text on glass
    
    // =================================================================
    // SPECIAL ELEMENTS
    // =================================================================
    videoOverlay: 'rgba(0, 0, 0, 0.7)',    // Video play button overlay
    photoOverlay: 'rgba(0, 0, 0, 0.4)',   // Photo count overlay
    headerBackground: colors.neutral[50],   // Header background
    footerBackground: colors.neutral[50],   // Footer background
  },
  
  dark: {
    // =================================================================
    // BACKGROUNDS (Material Design 3.0 Dark Theme)
    // =================================================================
    background: '#121212',                    // Modern dark background (not pure black)
    surface: '#1E1E1E',                      // Card/container backgrounds (elevation 1)
    surfaceSecondary: '#2D2D2D',             // Secondary surfaces (elevation 2)
    card: '#1E1E1E',                         // Memory cards, containers
    
    // =================================================================
    // TEXT COLORS (High Contrast for Readability)
    // =================================================================
    text: '#FFFFFF',                          // Pure white primary text
    textSecondary: '#B3B3B3',               // 70% opacity secondary text
    textTertiary: '#808080',                 // 50% opacity tertiary text
    textInverse: colors.neutral[900],         // Text on light backgrounds
    textDisabled: '#4A4A4A',                 // 30% opacity disabled text
    
    // =================================================================
    // INTERACTIVE ELEMENTS
    // =================================================================
    primary: colors.secondary.teal[400],      // Primary buttons (lighter in dark)
    primaryHover: colors.secondary.teal[300], // Primary hover state
    secondary: colors.neutral[400],           // Secondary buttons
    accent: colors.secondary.purple[400],     // Accent elements
    
    // =================================================================
    // BORDERS & DIVIDERS (Subtle for Dark Mode)
    // =================================================================
    border: 'rgba(255, 255, 255, 0.12)',     // Very subtle white borders
    borderLight: 'rgba(255, 255, 255, 0.08)', // Even more subtle
    borderMedium: 'rgba(255, 255, 255, 0.16)', // Slightly more visible
    borderStrong: 'rgba(255, 255, 255, 0.24)', // Strong but not harsh
    divider: 'rgba(255, 255, 255, 0.12)',    // Divider lines
    
    // =================================================================
    // STATUS COLORS (Slightly muted for dark mode)
    // =================================================================
    error: colors.error[400],                 // Error states
    errorBackground: colors.error[900],       // Error backgrounds
    success: colors.success[400],             // Success states
    successBackground: colors.success[900],   // Success backgrounds
    warning: colors.warning[400],             // Warning states
    warningBackground: colors.warning[900],   // Warning backgrounds
    info: colors.primary[400],                // Info states
    infoBackground: colors.primary[900],      // Info backgrounds
    
    // =================================================================
    // NAVIGATION (Clean Dark Mode)
    // =================================================================
    navigationBackground: '#121212',             // Same as main background
    navigationBorder: 'rgba(255, 255, 255, 0.12)', // Subtle border
    navigationActive: colors.secondary.teal[400], // Active nav items
    navigationInactive: colors.neutral[500],     // Inactive nav items
    
    // =================================================================
    // OVERLAYS & EFFECTS (Sophisticated Dark Mode)
    // =================================================================
    overlay: 'rgba(0, 0, 0, 0.8)',           // Modal overlays (darker)
    overlayLight: 'rgba(0, 0, 0, 0.6)',      // Light overlays
    shadow: 'rgba(0, 0, 0, 0.5)',           // Stronger shadows for dark mode
    shadowMedium: 'rgba(0, 0, 0, 0.6)',     // Medium shadows
    shadowStrong: 'rgba(0, 0, 0, 0.8)',     // Strong shadows
    
    // =================================================================
    // GLASSMORPHISM (For non-gradient screens only)
    // =================================================================
    glass: 'rgba(255, 255, 255, 0.1)',      // Subtle glass on dark
    glassBorder: 'rgba(255, 255, 255, 0.2)', // Glass borders
    glassText: 'rgba(255, 255, 255, 0.9)',  // Text on glass
    glassTextSecondary: 'rgba(255, 255, 255, 0.7)', // Secondary text on glass
    
    // =================================================================
    // SPECIAL ELEMENTS
    // =================================================================
    videoOverlay: 'rgba(0, 0, 0, 0.8)',     // Video play button overlay
    photoOverlay: 'rgba(0, 0, 0, 0.6)',     // Photo count overlay
    headerBackground: '#121212',              // Header background (same as main)
    footerBackground: '#121212',              // Footer background (same as main)
  },
} as const;

// Add custom neutral[750] for better dark mode gradients
export const extendedColors = {
  ...colors,
  neutral: {
    ...colors.neutral,
    750: '#2D2D2D', // Between 700 (#616161) and 800 (#424242)
  },
} as const;

// Theme-aware gradient system (simplified for main app)
export const themeGradients = {
  light: {
    // Keep existing gradients for gradient screens (splash, welcome, login)
    peacock: ['#247B7B', '#3b5998', '#8A2BE2'] as const,
    // For main app, we'll use solid colors instead of gradients in dark mode
  },
  dark: {
    // No gradients in dark mode - use solid colors for clean, modern look
    // This is what most premium apps do (Instagram, Twitter, etc.)
    peacock: [colors.neutral[800], colors.neutral[800], colors.neutral[800]] as const, // Solid color "gradient"
  },
} as const;

export type ThemeColors = typeof themeColors.light;
export type ThemeMode = 'system' | 'light' | 'dark';
export type EffectiveTheme = 'light' | 'dark';
