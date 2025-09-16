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

  // Shadow Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

// Gradient Definitions
export const gradients = {
  primary: ['#0095F6', '#0088D1'],
  secondary: ['#009688', '#9C27B0'], // Teal to Purple
  sunset: ['#FF6B6B', '#FFE66D'],
  ocean: ['#667eea', '#764ba2'],
  forest: ['#134E5E', '#71B280'],
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
