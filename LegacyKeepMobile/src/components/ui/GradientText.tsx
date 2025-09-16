/**
 * Gradient Text Component
 * 
 * Since React Native doesn't support gradient text natively,
 * we'll use a solid color that represents the gradient visually
 */

import React from 'react';
import { Text, TextStyle } from 'react-native';
import { brandColors } from '../../constants/designSystem';
import { typography } from '../../constants';

interface GradientTextProps {
  children: string;
  style?: TextStyle;
  gradient?: 'peacock' | 'splash';
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  style,
  gradient = 'peacock',
}) => {
  const getGradientColor = () => {
    switch (gradient) {
      case 'peacock':
        return brandColors.peacock.teal; // Use the main teal color from gradient
      case 'splash':
        return brandColors.splash.teal; // Use the main teal color from gradient
      default:
        return brandColors.peacock.teal;
    }
  };

  return (
    <Text
      style={[
        {
          fontSize: typography.sizes.md,
          fontWeight: typography.weights.bold,
          color: getGradientColor(),
          textAlign: 'center',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default GradientText;
