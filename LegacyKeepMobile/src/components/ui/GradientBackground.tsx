/**
 * Gradient Background Component
 * 
 * Reusable gradient background component using our design system
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientConfigs } from '../../constants/designSystem';

interface GradientBackgroundProps {
  gradient?: keyof typeof gradientConfigs;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  gradient = 'peacock',
  style,
  children,
}) => {
  const config = gradientConfigs[gradient];

  return (
    <LinearGradient
      colors={config.colors}
      start={config.start}
      end={config.end}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
