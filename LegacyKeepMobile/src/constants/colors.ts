/**
 * LegacyKeep Color Palette
 *
 * Primary Colors: Instagram Blue for main actions
 * Secondary Colors: Teal-to-purple gradients for decorative elements
 * Neutral Colors: Grays for text and backgrounds
 */

export const colors = {
  // Primary Colors (Instagram Blue)
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#0095F6', // Main Instagram Blue
    600: '#0288D1',
    700: '#0277BD',
    800: '#01579B',
    900: '#0D47A1',
  },

  // Secondary Colors (Teal to Purple Gradient)
  secondary: {
    teal: {
      50: '#E0F2F1',
      100: '#B2DFDB',
      200: '#80CBC4',
      300: '#4DB6AC',
      400: '#26A69A',
      500: '#009688', // Main Teal
      600: '#00897B',
      700: '#00796B',
      800: '#00695C',
      900: '#004D40',
    },
    purple: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#9C27B0', // Main Purple
      600: '#8E24AA',
      700: '#7B1FA2',
      800: '#6A1B9A',
      900: '#4A148C',
    },
  },

  // Neutral Colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Semantic Colors
  semantic: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F1F3F4',
    dark: '#121212',
  },

  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#9E9E9E',
    inverse: '#FFFFFF',
    disabled: '#BDBDBD',
  },

  // Border Colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#757575',
  },

  // Error Colors
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336', // Main Error Red
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },

  // Success Colors
  success: {
    50: '#E8F5E8',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Main Success Green
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  // Warning Colors
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFC107', // Main Warning Yellow
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  // App-specific colors - DEPRECATED: Use designSystem.ts instead
  // Keeping for backward compatibility
  app: {
    peacockTeal: '#247B7B',
    peacockBlue: '#3b5998', 
    peacockPurple: '#8A2BE2',
    splashTeal: '#0d9488',
    splashPurple: '#7c3aed',
    splashIndigo: '#6366f1',
    accent: '#FFC75F',
    glassmorphism: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'rgba(255, 255, 255, 0.3)',
      text: 'rgba(255, 255, 255, 0.9)',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
} as const;

// Legacy gradients - DEPRECATED: Use designSystem.ts instead
export const gradients = {
  peacock: ['#247B7B', '#3b5998', '#8A2BE2'],
  splash: ['#0d9488', '#7c3aed', '#6366f1'],
  primary: ['#0095F6', '#0088D1'],
  secondary: ['#009688', '#9C27B0'],
  sunset: ['#FF6B6B', '#FFE66D'],
  ocean: ['#667eea', '#764ba2'],
  forest: ['#134E5E', '#71B280'],
} as const;

// Gradient configurations with start/end points
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

// Theme Colors
export const theme = {
  light: {
    background: colors.background.primary,
    surface: colors.background.secondary,
    text: colors.text.primary,
    textSecondary: colors.text.secondary,
    border: colors.border.light,
    primary: colors.primary[500],
    secondary: colors.secondary.teal[500],
  },
  dark: {
    background: colors.background.dark,
    surface: colors.neutral[800],
    text: colors.text.inverse,
    textSecondary: colors.neutral[400],
    border: colors.neutral[700],
    primary: colors.primary[400],
    secondary: colors.secondary.teal[400],
  },
} as const;

export type ColorTheme = typeof theme.light;
export type GradientType = keyof typeof gradients;
