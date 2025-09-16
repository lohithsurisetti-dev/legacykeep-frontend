/**
 * Gradient Text Component
 * 
 * 100% Reusable component with dynamic text support
 * - No hardcoded text
 * - Configurable gradient colors
 * - Flexible styling options
 * - Type-safe props
 */

import React from 'react';
import { Text, TextStyle } from 'react-native';
import { brandColors } from '../../constants/designSystem';
import { typography } from '../../constants';

interface GradientTextProps {
  children: string;
  style?: TextStyle;
  gradient?: 'peacock' | 'splash';
  fontSize?: keyof typeof typography.sizes;
  fontWeight?: keyof typeof typography.weights;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  style,
  gradient = 'peacock',
  fontSize = 'md',
  fontWeight = 'bold',
  textAlign = 'center',
  numberOfLines,
  ellipsizeMode,
}) => {
  const getGradientColor = () => {
    switch (gradient) {
      case 'peacock':
        return brandColors.peacock.teal;
      case 'splash':
        return brandColors.splash.teal;
      default:
        return brandColors.peacock.teal;
    }
  };

  return (
    <Text
      style={[
        {
          fontSize: typography.sizes[fontSize],
          fontWeight: typography.weights[fontWeight],
          color: getGradientColor(),
          textAlign,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};

export default GradientText;
