/**
 * Theme Context
 * 
 * Comprehensive theming system with:
 * - System appearance detection (phone dark mode)
 * - Manual theme override (app-level switching)
 * - Dynamic color provision for 100% theme coverage
 * - Persistent user preferences
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeColors, themeGradients, type ThemeColors, type ThemeMode, type EffectiveTheme } from '../constants/themeColors';

interface ThemeContextType {
  // Theme state
  mode: ThemeMode;                    // User preference: 'system' | 'light' | 'dark'
  effectiveTheme: EffectiveTheme;     // Calculated theme: 'light' | 'dark'
  systemTheme: EffectiveTheme | null; // System theme: 'light' | 'dark' | null
  
  // Dynamic colors
  colors: ThemeColors;                // All semantic colors for current theme
  gradients: any;                     // Theme-appropriate gradients
  
  // Actions
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;   // Quick toggle between light/dark
  
  // State
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = '@legacykeep:theme-mode';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Calculate effective theme based on mode and system preference
  const calculateEffectiveTheme = (themeMode: ThemeMode, systemTheme: EffectiveTheme | null): EffectiveTheme => {
    if (themeMode === 'system') {
      return systemTheme || 'light'; // Fallback to light if system theme unavailable
    }
    return themeMode as EffectiveTheme;
  };

  const systemTheme: EffectiveTheme | null = systemColorScheme === 'dark' ? 'dark' : 
                                           systemColorScheme === 'light' ? 'light' : null;
  
  const effectiveTheme = calculateEffectiveTheme(mode, systemTheme);

  // Get dynamic colors and gradients based on effective theme
  const currentColors = themeColors[effectiveTheme] as ThemeColors;
  const currentGradients = themeGradients[effectiveTheme];

  // Initialize theme from storage
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedMode && (savedMode === 'system' || savedMode === 'light' || savedMode === 'dark')) {
          setModeState(savedMode as ThemeMode);
        }
      } catch (error) {
        console.log('Theme initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only react if user is using system theme
      if (mode === 'system') {
        // Theme will automatically update due to systemColorScheme change
        console.log('System theme changed to:', colorScheme);
      }
    });

    return () => subscription?.remove();
  }, [mode]);

  // Set theme mode with persistence
  const setMode = async (newMode: ThemeMode) => {
    try {
      setModeState(newMode);
      await AsyncStorage.setItem(STORAGE_KEY, newMode);
    } catch (error) {
      console.log('Theme save error:', error);
    }
  };

  // Quick toggle between light and dark (ignores system)
  const toggleTheme = async () => {
    const newMode = effectiveTheme === 'light' ? 'dark' : 'light';
    await setMode(newMode);
  };

  const contextValue: ThemeContextType = {
    mode,
    effectiveTheme,
    systemTheme,
    colors: currentColors,
    gradients: currentGradients,
    setMode,
    toggleTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
