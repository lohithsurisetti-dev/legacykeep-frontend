/**
 * Layout Constants - Single source of truth for all layout values
 */

export const LAYOUT = {
  // Positioning
  CENTER_TOP: '50%',
  FULL_WIDTH: '100%',
  FULL_HEIGHT: '100%',
  
  // Component Sizing
  GENDER_OPTION_MIN_WIDTH: '45%',
  
  // Shadows
  SHADOW_COLOR: '#000',
  SHADOW_OPACITY: 0.25,
  SHADOW_RADIUS: 4,
  SHADOW_OFFSET: {
    width: 0,
    height: 2,
  },
  
  // Elevation (Android)
  ELEVATION: 4,
  
  // Border Radius
  BORDER_RADIUS: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  
  // Component Heights
  BUTTON_HEIGHT: 48,
  INPUT_HEIGHT: 56,
  OTP_BOX_SIZE: 56,
  
  // Spacing Multipliers
  SPACING_MULTIPLIER: {
    xs: 0.5,
    sm: 1,
    md: 1.5,
    lg: 2,
    xl: 3,
  },
} as const;

export type LayoutConstants = typeof LAYOUT;
