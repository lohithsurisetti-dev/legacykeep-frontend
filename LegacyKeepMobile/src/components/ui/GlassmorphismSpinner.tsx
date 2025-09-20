/**
 * GlassmorphismSpinner Component
 * 
 * A beautiful, expensive-looking spinner with glassmorphism effect
 * that matches our design system
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { componentColors } from '../../constants/designSystem';

interface GlassmorphismSpinnerProps {
  size?: number;
  color?: string;
  style?: any;
}

const GlassmorphismSpinner: React.FC<GlassmorphismSpinnerProps> = ({
  size = 20,
  color = componentColors.glassmorphism.text,
  style,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startSpinning = () => {
      spinValue.setValue(0);
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1200, // Smooth, premium feel
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startSpinning();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startPulsing = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startPulsing();
  }, [pulseValue]);

  const pulseOpacity = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  const pulseScale = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.05],
  });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Outer glow ring */}
      <Animated.View
        style={[
          styles.glowRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: pulseOpacity,
            transform: [{ scale: pulseScale }],
          },
        ]}
      />
      
      {/* Main spinner */}
      <Animated.View
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: color,
            transform: [{ rotate: spin }],
          },
        ]}
      />
      
      {/* Inner glassmorphism core */}
      <View
        style={[
          styles.core,
          {
            width: size * 0.4,
            height: size * 0.4,
            borderRadius: (size * 0.4) / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
    backgroundColor: componentColors.glassmorphism.background,
    borderWidth: 1,
    borderColor: componentColors.glassmorphism.border,
    shadowColor: componentColors.glassmorphism.text,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  spinner: {
    position: 'absolute',
    borderWidth: 2,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent',
  },
  core: {
    position: 'absolute',
    backgroundColor: componentColors.glassmorphism.background,
    borderWidth: 1,
    borderColor: componentColors.glassmorphism.border,
    shadowColor: componentColors.glassmorphism.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default GlassmorphismSpinner;
