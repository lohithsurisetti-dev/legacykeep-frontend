/**
 * LegacyKeep Global Styles
 *
 * Centralized style definitions following our design system
 */

import { StyleSheet } from 'react-native';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
} from '../constants';

export const globalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  containerCentered: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPadded: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing[4],
  },

  // Layout Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Spacing Styles
  marginTop: {
    marginTop: spacing[4],
  },
  marginBottom: {
    marginBottom: spacing[4],
  },
  marginHorizontal: {
    marginHorizontal: spacing[4],
  },
  marginVertical: {
    marginVertical: spacing[4],
  },
  paddingHorizontal: {
    paddingHorizontal: spacing[4],
  },
  paddingVertical: {
    paddingVertical: spacing[4],
  },
  padding: {
    padding: spacing[4],
  },

  // Text Styles
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },

  // Shadow Styles
  shadowSm: shadows.sm,
  shadowBase: shadows.base,
  shadowMd: shadows.md,
  shadowLg: shadows.lg,

  // Border Styles
  border: {
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },

  // Background Styles
  backgroundPrimary: {
    backgroundColor: colors.background.primary,
  },
  backgroundSecondary: {
    backgroundColor: colors.background.secondary,
  },
  backgroundTertiary: {
    backgroundColor: colors.background.tertiary,
  },

  // Position Styles
  absolute: {
    position: 'absolute',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  relative: {
    position: 'relative',
  },

  // Flex Styles
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },

  // Alignment Styles
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },

  // Common Component Styles
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.base,
    padding: spacing[4],
    margin: spacing[2],
    ...shadows.sm,
  },
  button: {
    borderRadius: borderRadius.base,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: borderRadius.base,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    backgroundColor: colors.background.primary,
  },
  inputFocused: {
    borderColor: colors.primary[500],
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.semantic.error,
    borderWidth: 2,
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    marginTop: spacing[3],
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },

  // Error Styles
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    padding: spacing[4],
  },
  errorText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.semantic.error,
    textAlign: 'center',
    marginTop: spacing[3],
  },

  // Empty State Styles
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    padding: spacing[8],
  },
  emptyText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing[4],
  },

  // Safe Area Styles
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  safeAreaTop: {
    paddingTop: spacing[6], // Account for status bar
  },
  safeAreaBottom: {
    paddingBottom: spacing[6], // Account for home indicator
  },
});

// Common Style Combinations
export const commonStyles = {
  // Card with shadow
  cardShadow: [globalStyles.card, globalStyles.shadowSm],

  // Button primary
  buttonPrimary: [
    globalStyles.button,
    {
      backgroundColor: colors.primary[500],
    },
  ],

  // Button secondary
  buttonSecondary: [
    globalStyles.button,
    {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.border.medium,
    },
  ],

  // Input with focus state
  inputWithFocus: [
    globalStyles.input,
    {
      // Focus state will be handled dynamically
    },
  ],

  // Centered content
  centeredContent: [globalStyles.containerCentered, globalStyles.padding],

  // Screen container
  screenContainer: [globalStyles.container, globalStyles.paddingHorizontal],
};

export default globalStyles;
