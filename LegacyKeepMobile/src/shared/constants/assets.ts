/**
 * Asset Constants
 * 
 * Centralized placeholder images and external asset URLs
 * All hardcoded URLs should be defined here
 */

// =============================================================================
// Placeholder Images (Unsplash)
// =============================================================================

export const PLACEHOLDER_IMAGES = {
  // User Avatars
  AVATARS: {
    MALE_1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    MALE_2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    MALE_3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    MALE_4: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
    FEMALE_1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    FEMALE_2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    FEMALE_3: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    FEMALE_4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
  },
  
  // Family Photos
  FAMILY: {
    REUNION: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
    GATHERING: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    CELEBRATION: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
    DINNER: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&h=600&fit=crop',
    PICNIC: 'https://images.unsplash.com/photo-1527526029430-319f10814151?w=800&h=600&fit=crop',
  },
  
  // Nature & Landscapes
  NATURE: {
    SUNSET: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    MOUNTAINS: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    BEACH: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    FOREST: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop',
  },
  
  // Food
  FOOD: {
    RECIPE_1: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    RECIPE_2: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    COOKING: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
  },
  
  // Wisdom & Culture
  WISDOM: {
    ELDER: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&h=600&fit=crop',
    BOOKS: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop',
    TRADITION: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=600&fit=crop',
  },
  
  // Default/Fallback
  DEFAULT: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
} as const;

// =============================================================================
// Historical Figures (for Inspirations)
// =============================================================================

export const INSPIRATION_IMAGES = {
  GANDHI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/800px-Mahatma-Gandhi%2C_studio%2C_1931.jpg',
  MOTHER_TERESA: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Mother_Teresa_1.jpg/800px-Mother_Teresa_1.jpg',
  NELSON_MANDELA: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Nelson_Mandela-2008_%28edit%29.jpg/800px-Nelson_Mandela-2008_%28edit%29.jpg',
  MARTIN_LUTHER_KING: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/800px-Martin_Luther_King%2C_Jr..jpg',
  ABDUL_KALAM: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/800px-A._P._J._Abdul_Kalam.jpg',
} as const;

// =============================================================================
// Icon/Logo URLs (if using external CDN)
// =============================================================================

export const ICON_URLS = {
  APP_LOGO: '', // Add your app logo URL
  SPLASH_LOGO: '', // Add your splash screen logo URL
} as const;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get a random avatar from the available placeholders
 */
export const getRandomAvatar = (gender?: 'male' | 'female'): string => {
  if (gender === 'male') {
    const maleAvatars = Object.values(PLACEHOLDER_IMAGES.AVATARS).filter((_, i) => i < 4);
    return maleAvatars[Math.floor(Math.random() * maleAvatars.length)];
  } else if (gender === 'female') {
    const femaleAvatars = Object.values(PLACEHOLDER_IMAGES.AVATARS).filter((_, i) => i >= 4);
    return femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
  }
  
  const allAvatars = Object.values(PLACEHOLDER_IMAGES.AVATARS);
  return allAvatars[Math.floor(Math.random() * allAvatars.length)];
};

/**
 * Get a random family photo
 */
export const getRandomFamilyPhoto = (): string => {
  const photos = Object.values(PLACEHOLDER_IMAGES.FAMILY);
  return photos[Math.floor(Math.random() * photos.length)];
};

/**
 * Get initials from name
 */
export const getInitials = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return 'LS';
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
};

// Type exports
export type PlaceholderImageCategory = keyof typeof PLACEHOLDER_IMAGES;
export type AvatarKey = keyof typeof PLACEHOLDER_IMAGES.AVATARS;
