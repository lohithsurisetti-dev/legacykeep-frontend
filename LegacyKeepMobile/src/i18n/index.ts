/**
 * i18n Configuration
 * 
 * Industry-standard internationalization setup with:
 * - Automatic language detection
 * - Persistent language storage
 * - Dynamic language switching
 * - Fallback language support
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import language resources
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import pt from './locales/pt.json';
import hi from './locales/hi.json';

// Language detection and persistence
const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Try to get saved language from storage
      const savedLanguage = await AsyncStorage.getItem('@legacykeep:language');
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }
      
      // Fallback to device language
      const deviceLanguage = require('react-native').NativeModules.SettingsManager?.settings?.AppleLocale || 
                           require('react-native').NativeModules.I18nManager?.localeIdentifier ||
                           'en';
      
      const detectedLanguage = deviceLanguage.split('_')[0];
      callback(detectedLanguage);
    } catch (error) {
      console.log('Language detection error:', error);
      callback('en'); // Fallback to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem('@legacykeep:language', lng);
    } catch (error) {
      console.log('Language save error:', error);
    }
  },
};

// i18n configuration
i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    // Language resources
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      pt: { translation: pt },
      hi: { translation: hi },
    },
    
    // Configuration
    fallbackLng: 'en',
    debug: __DEV__, // Enable debug in development
    
    // Interpolation
    interpolation: {
      escapeValue: false, // React already escapes
    },
    
    // React-specific options
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
    
    // Compatibility
    compatibilityJSON: 'v4',
  });

export default i18n;

// Export language utilities
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

export const changeLanguage = async (languageCode: string) => {
  try {
    await i18n.changeLanguage(languageCode);
    await AsyncStorage.setItem('@legacykeep:language', languageCode);
  } catch (error) {
    console.log('Language change error:', error);
  }
};

export const getCurrentLanguage = () => i18n.language;
export const isRTL = () => i18n.dir() === 'rtl';
