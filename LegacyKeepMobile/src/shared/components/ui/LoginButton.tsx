/**
 * Login Button Component
 * 
 * 100% Reusable button component with dynamic text support
 * - No hardcoded text or styling
 * - Configurable appearance
 * - Flexible sizing and positioning
 * - Type-safe props
 */

import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing } from '../../../shared/constants';
import GradientText from './GradientText';
import GlassmorphismSpinner from './GlassmorphismSpinner';

interface LoginButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
  gradient?: 'peacock' | 'splash';
  fontSize?: keyof typeof typography.sizes;
  fontWeight?: keyof typeof typography.weights;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  activeOpacity = 0.8,
  height = 48,
  borderRadius = 8,
  backgroundColor = colors.neutral[50],
  gradient = 'peacock',
  fontSize = 'md',
  fontWeight = 'bold',
  shadowColor = colors.shadow.dark,
  shadowOpacity = 0.25,
  shadowRadius = 4,
  elevation = 4,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={activeOpacity}
      style={[
        {
          height,
          borderRadius,
          backgroundColor,
          shadowColor,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity,
          shadowRadius,
          elevation,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {/* Loading Spinner or Gradient Text */}
      {loading ? (
        <GlassmorphismSpinner 
          size={20} 
          color={gradient === 'peacock' ? colors.primary[500] : colors.secondary.teal[500]} 
        />
      ) : (
        <GradientText
          gradient={gradient}
          fontSize={fontSize}
          fontWeight={fontWeight}
          style={textStyle}
        >
          {title}
        </GradientText>
      )}
    </TouchableOpacity>
  );
};

export default LoginButton;
