/**
 * LegacyKeep Styles Export
 *
 * Centralized export of all style-related modules
 */

export { globalStyles, commonStyles } from './globalStyles';
export {
  lightTheme,
  darkTheme,
  defaultTheme,
  getThemeColors,
  getThemeSpacing,
  getThemeTypography,
  getThemeBorderRadius,
  getThemeShadows,
} from './theme';
export type { Theme, ThemeContextType } from './theme';

// Re-export constants for convenience
export {
  colors,
  gradients,
  typography,
  textStyles,
  spacing,
  semanticSpacing,
  borderRadius,
  shadows,
} from '@/constants';
