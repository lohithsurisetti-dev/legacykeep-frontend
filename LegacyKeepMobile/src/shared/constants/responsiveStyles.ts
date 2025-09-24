/**
 * Responsive Styles
 * 
 * Centralized responsive design styles for consistent layout across devices
 */

import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../constants';
import { getResponsiveLayout, getResponsiveComponentSizes, getResponsiveSpacing } from '../../shared/utils/responsive';

// Get responsive utilities
const responsiveLayout = getResponsiveLayout();
const componentSizes = getResponsiveComponentSizes();
const responsiveSpacing = getResponsiveSpacing();

export const responsiveStyles = StyleSheet.create({
  // Base container styles
  container: {
    flex: 1,
    width: '100%' as const,
  },
  
  safeContainer: {
    ...responsiveLayout.safeContainer,
  },
  
  centeredContent: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: responsiveSpacing.lg,
  },
  
  // Scrollable content
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: responsiveSpacing.lg,
    paddingVertical: responsiveSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Form containers
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: responsiveSpacing.lg,
  },
  
  form: {
    width: '100%',
    alignItems: 'center',
    maxWidth: 400, // Prevent forms from being too wide on large screens
  },
  
  // Input containers
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: responsiveSpacing.xl,
  },
  
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    gap: responsiveSpacing.md,
  },
  
  // OTP specific styles
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveSpacing.sm,
    marginBottom: responsiveSpacing.sm,
    width: '100%',
    paddingHorizontal: responsiveSpacing.lg,
  },
  
  otpInputWrapper: {
    width: componentSizes.otpBoxSize,
    height: componentSizes.otpBoxSize,
    flex: 0,
  },
  
  // Button containers
  buttonContainer: {
    flexDirection: 'column', // Stack buttons vertically
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveSpacing.md,
    paddingHorizontal: responsiveSpacing.lg,
  },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveSpacing.md,
    width: '100%',
  },
  
  // Bottom actions (for screens with bottom buttons)
  bottomActions: {
    position: 'absolute' as const,
    bottom: responsiveSpacing.xl,
    left: responsiveSpacing.lg,
    right: responsiveSpacing.lg,
    width: '100%',
  },
  
  // Header styles
  header: {
    alignItems: 'center',
    marginBottom: responsiveSpacing.md,
    paddingHorizontal: responsiveSpacing.lg,
  },
  
  title: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: responsiveSpacing.sm,
  },
  
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.neutral[50],
    borderRadius: componentSizes.cardBorderRadius,
    padding: componentSizes.cardPadding,
    shadowColor: colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  
  // Date picker specific
  datePickerContainer: {
    minHeight: componentSizes.datePickerHeight,
    maxHeight: componentSizes.datePickerHeight + 60,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: responsiveSpacing.md,
    width: '100%',
  },
  
  datePickerButton: {
    backgroundColor: colors.primary[500],
    paddingVertical: responsiveSpacing.sm,
    paddingHorizontal: responsiveSpacing.lg,
    borderRadius: 8,
    marginTop: responsiveSpacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: componentSizes.datePickerButtonHeight,
  },
  
  // Progress indicator
  progressContainer: {
    alignItems: 'center',
    marginBottom: responsiveSpacing.lg,
    paddingHorizontal: responsiveSpacing.lg,
  },
  
  // Error and helper text
  errorContainer: {
    marginTop: responsiveSpacing.sm,
    alignItems: 'center',
    paddingHorizontal: responsiveSpacing.lg,
  },
  
  errorText: {
    fontSize: typography.sizes.sm,
    color: colors.error[500],
    textAlign: 'center',
  },
  
  helperText: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: responsiveSpacing.lg,
    lineHeight: 20,
  },
  
  // Responsive text sizes
  textSmall: {
    fontSize: typography.sizes.sm,
  },
  
  textMedium: {
    fontSize: typography.sizes.md,
  },
  
  textLarge: {
    fontSize: typography.sizes.lg,
  },
  
  textXLarge: {
    fontSize: typography.sizes.xl,
  },
  
  // Responsive spacing utilities
  marginTopSmall: {
    marginTop: responsiveSpacing.sm,
  },
  
  marginTopMedium: {
    marginTop: responsiveSpacing.md,
  },
  
  marginTopLarge: {
    marginTop: responsiveSpacing.lg,
  },
  
  marginBottomSmall: {
    marginBottom: responsiveSpacing.sm,
  },
  
  marginBottomMedium: {
    marginBottom: responsiveSpacing.md,
  },
  
  marginBottomLarge: {
    marginBottom: responsiveSpacing.lg,
  },
  
  paddingHorizontal: {
    paddingHorizontal: responsiveSpacing.lg,
  },
  
  paddingVertical: {
    paddingVertical: responsiveSpacing.lg,
  },
});

export default responsiveStyles;
