/**
 * Splash Screen Component
 * 
 * Displays the app's splash screen with animations matching the original design
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { GradientBackground } from './ui';
import { colors, typography, spacing } from '../constants';

interface SplashScreenProps {
  onAnimationComplete?: () => void;
  duration?: number;
}

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
  duration = 2000,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [glowAnim] = useState(new Animated.Value(0));
  const [particleAnim1] = useState(new Animated.Value(0));
  const [particleAnim2] = useState(new Animated.Value(0));
  const [particleAnim3] = useState(new Animated.Value(0));
  const [particleAnim4] = useState(new Animated.Value(0));
  const [gradientAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start animations
    const startAnimations = () => {
      // Fade in and scale up the main content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        // Glow animation - more pronounced like the original
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 1,
              duration: 3000,
              useNativeDriver: true,
            }),
            Animated.timing(glowAnim, {
              toValue: 0,
              duration: 3000,
              useNativeDriver: true,
            }),
          ])
        ),
        // Gradient animation
        Animated.loop(
          Animated.timing(gradientAnim, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: false,
          })
        ),
        // Particle animations with more complex movement
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim1, {
              toValue: 1,
              duration: 8000,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim1, {
              toValue: 0,
              duration: 8000,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim2, {
              toValue: 1,
              duration: 7000,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim2, {
              toValue: 0,
              duration: 7000,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim3, {
              toValue: 1,
              duration: 9000,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim3, {
              toValue: 0,
              duration: 9000,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim4, {
              toValue: 1,
              duration: 6000,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim4, {
              toValue: 0,
              duration: 6000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    };

    startAnimations();

    // Complete animation after duration
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, glowAnim, particleAnim1, particleAnim2, particleAnim3, particleAnim4, gradientAnim, duration, onAnimationComplete]);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.4],
  });

  const glowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 30],
  });

  const particle1TranslateY = particleAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const particle1TranslateX = particleAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const particle2TranslateY = particleAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const particle2TranslateX = particleAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3],
  });

  const particle3TranslateY = particleAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  const particle3TranslateX = particleAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  const particle4TranslateY = particleAnim4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });

  const particle4TranslateX = particleAnim4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  return (
    <GradientBackground gradient="splash" style={styles.container}>
      
      {/* Floating Particles */}
      <Animated.View
        style={[
          styles.particle,
          styles.particle1,
          {
            opacity: particleAnim1,
            transform: [
              { translateY: particle1TranslateY },
              { translateX: particle1TranslateX }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle2,
          {
            opacity: particleAnim2,
            transform: [
              { translateY: particle2TranslateY },
              { translateX: particle2TranslateX }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle3,
          {
            opacity: particleAnim3,
            transform: [
              { translateY: particle3TranslateY },
              { translateX: particle3TranslateX }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle4,
          {
            opacity: particleAnim4,
            transform: [
              { translateY: particle4TranslateY },
              { translateX: particle4TranslateX }
            ],
          },
        ]}
      />

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo with Enhanced Glow Effect */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              shadowOpacity: glowOpacity,
              shadowRadius: glowRadius,
            },
          ]}
        >
          <Text style={styles.logo}>LegacyKeep</Text>
        </Animated.View>
        
        {/* Tagline with subtle pulse */}
        <Animated.Text 
          style={[
            styles.tagline,
            {
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
              transform: [{
                scale: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.02],
                })
              }]
            }
          ]}
        >
          Preserve your family's stories
        </Animated.Text>
        
        {/* Loading Dots with bounce animation */}
        <View style={styles.loadingContainer}>
          <Animated.View 
            style={[
              styles.loadingDot,
              {
                transform: [{
                  scale: glowAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.8, 1.2, 0.8],
                  })
                }]
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.loadingDot,
              {
                transform: [{
                  scale: glowAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.8, 1.2, 0.8],
                  })
                }]
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.loadingDot,
              {
                transform: [{
                  scale: glowAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.8, 1.2, 0.8],
                  })
                }]
              }
            ]} 
          />
        </View>
      </Animated.View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  particle1: {
    top: height * 0.2,
    left: width * 0.1,
  },
  particle2: {
    top: height * 0.3,
    right: width * 0.15,
  },
  particle3: {
    bottom: height * 0.25,
    left: width * 0.2,
  },
  particle4: {
    bottom: height * 0.35,
    right: width * 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.lg,
    // Enhanced glow effect like the original
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    fontSize: typography.sizes['5xl'], // Larger like the original
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
    textAlign: 'center',
    letterSpacing: 1,
    // Enhanced text shadow for glow effect
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[100],
    textAlign: 'center',
    marginBottom: spacing.xxl,
    opacity: 0.9,
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  loadingDot: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 3,
  },
});

export default SplashScreen;
