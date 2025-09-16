/**
 * LegacyKeep Spacing System
 *
 * 8px Grid System for consistent spacing
 * Based on Material Design spacing principles
 */

export const spacing = {
  // Base spacing unit (8px)
  unit: 8,

  // Spacing scale (multiples of 8px)
  0: 0,
  1: 4, // 0.5 * unit
  2: 8, // 1 * unit
  3: 12, // 1.5 * unit
  4: 16, // 2 * unit
  5: 20, // 2.5 * unit
  6: 24, // 3 * unit
  8: 32, // 4 * unit
  10: 40, // 5 * unit
  12: 48, // 6 * unit
  16: 64, // 8 * unit
  20: 80, // 10 * unit
  24: 96, // 12 * unit
  32: 128, // 16 * unit
  40: 160, // 20 * unit
  48: 192, // 24 * unit
  56: 224, // 28 * unit
  64: 256, // 32 * unit
  
  // Named spacing aliases for easier use
  xs: 4,    // 0.5 * unit
  sm: 8,    // 1 * unit
  md: 16,   // 2 * unit
  lg: 24,   // 3 * unit
  xl: 32,   // 4 * unit
  xxl: 48,  // 6 * unit
} as const;

// Semantic spacing for common use cases
export const semanticSpacing = {
  // Component spacing
  component: {
    padding: spacing[4], // 16px
    margin: spacing[2], // 8px
    gap: spacing[3], // 12px
  },

  // Layout spacing
  layout: {
    container: spacing[4], // 16px
    section: spacing[6], // 24px
    page: spacing[8], // 32px
  },

  // Text spacing
  text: {
    lineHeight: spacing[6], // 24px
    paragraph: spacing[4], // 16px
    heading: spacing[2], // 8px
  },

  // Button spacing
  button: {
    padding: spacing[3], // 12px
    margin: spacing[2], // 8px
    gap: spacing[2], // 8px
  },

  // Card spacing
  card: {
    padding: spacing[4], // 16px
    margin: spacing[3], // 12px
    gap: spacing[3], // 12px
  },

  // Form spacing
  form: {
    field: spacing[4], // 16px
    group: spacing[6], // 24px
    section: spacing[8], // 32px
  },

  // Navigation spacing
  navigation: {
    item: spacing[3], // 12px
    group: spacing[4], // 16px
    section: spacing[6], // 24px
  },
} as const;

// Border radius scale
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
} as const;

// Shadow definitions
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 24,
  },
} as const;

export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
