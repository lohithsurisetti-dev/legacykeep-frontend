import React, { useState, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { RegistrationProvider } from './src/contexts/RegistrationContext';
import { RootNavigator } from './src/navigation';
import SplashScreen from './src/components/SplashScreen';
import './src/i18n'; // Initialize i18n

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const mainOpacity = useRef(new Animated.Value(0)).current;

  const handleSplashComplete = () => {
    setIsTransitioning(true);
    
    // Start crossfade transition
    Animated.parallel([
      // Fade out splash screen
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      // Fade in main app
      Animated.timing(mainOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After transition completes, hide splash screen
      setIsSplashVisible(false);
      setIsTransitioning(false);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Splash Screen Layer */}
      {isSplashVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: splashOpacity,
            zIndex: 2,
          }}
        >
          <SplashScreen onAnimationComplete={handleSplashComplete} duration={3000} />
          <StatusBar style='light' />
        </Animated.View>
      )}

      {/* Main App Layer */}
      <Animated.View
        style={{
          flex: 1,
          opacity: mainOpacity,
          zIndex: 1,
        }}
      >
        <ThemeProvider>
          <LanguageProvider>
            <RegistrationProvider>
              <AuthProvider>
                <RootNavigator />
                <StatusBar style='auto' />
              </AuthProvider>
            </RegistrationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Animated.View>
    </View>
  );
}
