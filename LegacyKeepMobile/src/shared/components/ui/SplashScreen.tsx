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
import GradientBackground from './GradientBackground';
import { colors, typography, spacing } from '../../constants';

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
  const [particleAnim1] = useState(new Animated.Value(0.5));
  const [particleAnim2] = useState(new Animated.Value(0.5));
  const [particleAnim3] = useState(new Animated.Value(0.5));
  const [particleAnim4] = useState(new Animated.Value(0.5));
  const [particleAnim5] = useState(new Animated.Value(0.5));
  const [particleAnim6] = useState(new Animated.Value(0.5));
  const [particleAnim7] = useState(new Animated.Value(0.5));
  const [particleAnim8] = useState(new Animated.Value(0.5));
  const [particleAnim9] = useState(new Animated.Value(0.5));
  const [particleAnim10] = useState(new Animated.Value(0.5));
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
        // Particle animations with immediate start and staggered timing
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
        // Additional particles for more sparks
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim5, {
              toValue: 1,
              duration: 5500,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim5, {
              toValue: 0,
              duration: 5500,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim6, {
              toValue: 1,
              duration: 7500,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim6, {
              toValue: 0,
              duration: 7500,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim7, {
              toValue: 1,
              duration: 6500,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim7, {
              toValue: 0,
              duration: 6500,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim8, {
              toValue: 1,
              duration: 8500,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim8, {
              toValue: 0,
              duration: 8500,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim9, {
              toValue: 1,
              duration: 5000,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim9, {
              toValue: 0,
              duration: 5000,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(particleAnim10, {
              toValue: 1,
              duration: 7000,
              useNativeDriver: true,
            }),
            Animated.timing(particleAnim10, {
              toValue: 0,
              duration: 7000,
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
  }, [fadeAnim, scaleAnim, glowAnim, particleAnim1, particleAnim2, particleAnim3, particleAnim4, particleAnim5, particleAnim6, particleAnim7, particleAnim8, particleAnim9, particleAnim10, gradientAnim, duration, onAnimationComplete]);

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

  const particle5TranslateY = particleAnim5.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const particle5TranslateX = particleAnim5.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });

  const particle6TranslateY = particleAnim6.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -22],
  });

  const particle6TranslateX = particleAnim6.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -7],
  });

  const particle7TranslateY = particleAnim7.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -16],
  });

  const particle7TranslateX = particleAnim7.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  const particle8TranslateY = particleAnim8.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -28],
  });

  const particle8TranslateX = particleAnim8.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -9],
  });

  const particle9TranslateY = particleAnim9.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14],
  });

  const particle9TranslateX = particleAnim9.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3],
  });

  const particle10TranslateY = particleAnim10.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -19],
  });

  const particle10TranslateX = particleAnim10.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
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
      <Animated.View
        style={[
          styles.particle,
          styles.particle5,
          {
            opacity: particleAnim5,
            transform: [
              { translateY: particle5TranslateY },
              { translateX: particle5TranslateX }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle6,
          {
            opacity: particleAnim6,
            transform: [
              { translateY: particle6TranslateY },
              { translateX: particle6TranslateX }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle7,
          {
            opacity: particleAnim7,
            transform: [
              { translateY: particle7TranslateY },
              { translateX: particle7TranslateX }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle8,
          {
            opacity: particleAnim8,
            transform: [
              { translateY: particle8TranslateY },
              { translateX: particle8TranslateX }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle9,
          {
            opacity: particleAnim9,
            transform: [
              { translateY: particle9TranslateY },
              { translateX: particle9TranslateX }
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.particle,
          styles.particle10,
          {
            opacity: particleAnim10,
            transform: [
              { translateY: particle10TranslateY },
              { translateX: particle10TranslateX }
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
  particle5: {
    top: height * 0.15,
    left: width * 0.3,
    width: 3,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  particle6: {
    top: height * 0.4,
    right: width * 0.25,
    width: 5,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  particle7: {
    bottom: height * 0.4,
    left: width * 0.4,
    width: 2,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  particle8: {
    top: height * 0.25,
    right: width * 0.05,
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  particle9: {
    bottom: height * 0.2,
    right: width * 0.3,
    width: 3,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  particle10: {
    top: height * 0.35,
    left: width * 0.05,
    width: 4,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.sm,
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
});

export default SplashScreen;
