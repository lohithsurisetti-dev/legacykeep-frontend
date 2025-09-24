/**
 * Language Context
 * 
 * Provides language switching functionality throughout the app
 * with persistence and dynamic updates
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supportedLanguages, changeLanguage, getCurrentLanguage, isRTL } from '../../shared/constants';

interface LanguageContextType {
  currentLanguage: string;
  availableLanguages: typeof supportedLanguages;
  changeLanguage: (languageCode: string) => Promise<void>;
  t: (key: string, options?: any) => string;
  isRTL: boolean;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Initialize language detection
    const initializeLanguage = async () => {
      try {
        // Wait for i18n to be ready
        await i18n.loadNamespaces('translation');
        setIsLoading(false);
      } catch (error) {
        console.log('Language initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, [i18n]);

  const handleChangeLanguage = async (languageCode: string) => {
    try {
      setIsLoading(true);
      await changeLanguage(languageCode);
      setIsLoading(false);
    } catch (error) {
      console.log('Language change error:', error);
      setIsLoading(false);
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage: getCurrentLanguage(),
    availableLanguages: supportedLanguages,
    changeLanguage: handleChangeLanguage,
    t,
    isRTL: isRTL(),
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
