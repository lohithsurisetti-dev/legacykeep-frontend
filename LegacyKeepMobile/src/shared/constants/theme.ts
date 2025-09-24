/**
 * LegacyKeep Theme System
 *
 * Centralized theme management for light/dark modes
 */

import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from '../constants';

export interface Theme {
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    border: {
      light: string;
      medium: string;
      dark: string;
    };
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
    };
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  isDark: boolean;
}

export const lightTheme: Theme = {
  colors: {
    background: {
      primary: colors.background.primary,
      secondary: colors.background.secondary,
      tertiary: colors.background.tertiary,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      tertiary: colors.text.tertiary,
      inverse: colors.text.inverse,
    },
    border: {
      light: colors.border.light,
      medium: colors.border.medium,
      dark: colors.border.dark,
    },
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
    },
    secondary: {
      main: colors.secondary.teal[500],
      light: colors.secondary.teal[300],
      dark: colors.secondary.teal[700],
    },
    semantic: {
      success: colors.semantic.success,
      warning: colors.semantic.warning,
      error: colors.semantic.error,
      info: colors.semantic.info,
    },
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  isDark: false,
};

export const darkTheme: Theme = {
  colors: {
    background: {
      primary: colors.background.dark,
      secondary: colors.neutral[800],
      tertiary: colors.neutral[700],
    },
    text: {
      primary: colors.text.inverse,
      secondary: colors.neutral[400],
      tertiary: colors.neutral[500],
      inverse: colors.text.primary,
    },
    border: {
      light: colors.neutral[700],
      medium: colors.neutral[600],
      dark: colors.neutral[500],
    },
    primary: {
      main: colors.primary[400],
      light: colors.primary[200],
      dark: colors.primary[600],
    },
    secondary: {
      main: colors.secondary.teal[400],
      light: colors.secondary.teal[200],
      dark: colors.secondary.teal[600],
    },
    semantic: {
      success: colors.semantic.success,
      warning: colors.semantic.warning,
      error: colors.semantic.error,
      info: colors.semantic.info,
    },
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  isDark: true,
};

// Theme context type
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// Default theme
export const defaultTheme = lightTheme;

// Theme utilities
export const getThemeColors = (theme: Theme) => theme.colors;
export const getThemeSpacing = (theme: Theme) => theme.spacing;
export const getThemeTypography = (theme: Theme) => theme.typography;
export const getThemeBorderRadius = (theme: Theme) => theme.borderRadius;
export const getThemeShadows = (theme: Theme) => theme.shadows;
