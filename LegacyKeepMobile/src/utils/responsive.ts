/**
 * Responsive Design Utilities
 * 
 * Provides responsive design helpers for different screen sizes
 */

import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Device size categories
export const DEVICE_SIZES = {
  SMALL: 'small',      // iPhone SE, older devices
  MEDIUM: 'medium',    // iPhone 12, 13, 14
  LARGE: 'large',      // iPhone 14 Plus, 15 Plus
  XLARGE: 'xlarge',   // iPhone 17 Pro Max, iPad
} as const;

export type DeviceSize = typeof DEVICE_SIZES[keyof typeof DEVICE_SIZES];

// Screen size breakpoints
const BREAKPOINTS = {
  SMALL: 375,   // iPhone SE, iPhone 12 mini
  MEDIUM: 414,  // iPhone 12, 13, 14
  LARGE: 428,   // iPhone 14 Plus, 15 Plus
  XLARGE: 480,  // iPhone 17 Pro Max, larger devices
};

// Get device size category
export const getDeviceSize = (): DeviceSize => {
  if (SCREEN_WIDTH <= BREAKPOINTS.SMALL) return DEVICE_SIZES.SMALL;
  if (SCREEN_WIDTH <= BREAKPOINTS.MEDIUM) return DEVICE_SIZES.MEDIUM;
  if (SCREEN_WIDTH <= BREAKPOINTS.LARGE) return DEVICE_SIZES.LARGE;
  return DEVICE_SIZES.XLARGE;
};

// Responsive scaling
export const scale = (size: number): number => {
  const deviceSize = getDeviceSize();
  const scaleFactor = {
    [DEVICE_SIZES.SMALL]: 0.9,
    [DEVICE_SIZES.MEDIUM]: 1.0,
    [DEVICE_SIZES.LARGE]: 1.1,
    [DEVICE_SIZES.XLARGE]: 1.2,
  };
  
  return PixelRatio.roundToNearestPixel(size * scaleFactor[deviceSize]);
};

// Responsive font scaling
export const scaleFont = (size: number): number => {
  const deviceSize = getDeviceSize();
  const fontScale = {
    [DEVICE_SIZES.SMALL]: 0.9,
    [DEVICE_SIZES.MEDIUM]: 1.0,
    [DEVICE_SIZES.LARGE]: 1.05,
    [DEVICE_SIZES.XLARGE]: 1.1,
  };
  
  return PixelRatio.roundToNearestPixel(size * fontScale[deviceSize]);
};

// Safe area helpers
export const getSafeAreaInsets = () => {
  const deviceSize = getDeviceSize();
  return {
    top: deviceSize === DEVICE_SIZES.SMALL ? 20 : 44,
    bottom: deviceSize === DEVICE_SIZES.SMALL ? 20 : 34,
    horizontal: deviceSize === DEVICE_SIZES.SMALL ? 16 : 20,
  };
};

// Responsive spacing
export const getResponsiveSpacing = () => {
  const deviceSize = getDeviceSize();
  return {
    xs: scale(4),
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(20),
    xxl: scale(24),
    xxxl: scale(32),
  };
};

// Responsive dimensions
export const getResponsiveDimensions = () => {
  const deviceSize = getDeviceSize();
  const safeArea = getSafeAreaInsets();
  
  return {
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,
    contentWidth: SCREEN_WIDTH - (safeArea.horizontal * 2),
    contentHeight: SCREEN_HEIGHT - safeArea.top - safeArea.bottom,
    isSmallScreen: deviceSize === DEVICE_SIZES.SMALL,
    isLargeScreen: deviceSize === DEVICE_SIZES.LARGE || deviceSize === DEVICE_SIZES.XLARGE,
  };
};

// Responsive layout helpers
export const getResponsiveLayout = () => {
  const deviceSize = getDeviceSize();
  const dimensions = getResponsiveDimensions();
  
  return {
    // Container styles
    container: {
      flex: 1,
      width: '100%',
    },
    
    // Safe area container
    safeContainer: {
      flex: 1,
      paddingTop: getSafeAreaInsets().top,
      paddingBottom: getSafeAreaInsets().bottom,
      paddingHorizontal: getSafeAreaInsets().horizontal,
    },
    
    // Centered content
    centeredContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: getSafeAreaInsets().horizontal,
    },
    
    // Flexible bottom positioning
    bottomActions: {
      position: 'absolute',
      bottom: getSafeAreaInsets().bottom + scale(20),
      left: getSafeAreaInsets().horizontal,
      right: getSafeAreaInsets().horizontal,
      width: dimensions.contentWidth,
    },
    
    // Responsive button container
    buttonContainer: {
      flexDirection: 'row' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      gap: scale(12),
      paddingHorizontal: getSafeAreaInsets().horizontal,
    },
    
    // Responsive input container
    inputContainer: {
      width: '100%',
      alignItems: 'center' as const,
      paddingHorizontal: getSafeAreaInsets().horizontal,
    },
  };
};

// Responsive component dimensions
export const getResponsiveComponentSizes = () => {
  const deviceSize = getDeviceSize();
  
  return {
    // Button sizes
    buttonHeight: scale(48),
    buttonPadding: scale(16),
    
    // Input sizes
    inputHeight: scale(48),
    inputPadding: scale(16),
    
    // OTP box sizes
    otpBoxSize: scale(56),
    otpBoxGap: scale(12),
    
    // Date picker sizes
    datePickerHeight: deviceSize === DEVICE_SIZES.SMALL ? scale(280) : scale(320),
    datePickerButtonHeight: scale(44),
    
    // Card sizes
    cardPadding: scale(20),
    cardBorderRadius: scale(16),
  };
};

export default {
  getDeviceSize,
  scale,
  scaleFont,
  getSafeAreaInsets,
  getResponsiveSpacing,
  getResponsiveDimensions,
  getResponsiveLayout,
  getResponsiveComponentSizes,
};
