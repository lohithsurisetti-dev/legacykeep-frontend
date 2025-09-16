import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigation';
import SplashScreen from './src/components/SplashScreen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashComplete = () => {
    setIsSplashVisible(false);
  };

  if (isSplashVisible) {
    return (
      <>
        <SplashScreen onAnimationComplete={handleSplashComplete} duration={2000} />
        <StatusBar style='light' />
      </>
    );
  }

  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style='auto' />
    </AuthProvider>
  );
}
