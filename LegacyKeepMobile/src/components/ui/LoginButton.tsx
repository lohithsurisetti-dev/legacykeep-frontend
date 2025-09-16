/**
 * Login Button Component
 * 
 * Matches the HTML design: white background with gradient text
 * Uses a mask approach to create gradient text effect
 */

import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../constants';
import GradientText from './GradientText';

interface LoginButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  activeOpacity = 0.8,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[
        {
          height: 48,
          borderRadius: 8,
          backgroundColor: colors.neutral[50], // White background like HTML
          shadowColor: colors.shadow.dark,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {/* Gradient Text */}
      <GradientText
        gradient="peacock"
        style={textStyle}
      >
        {title}
      </GradientText>
    </TouchableOpacity>
  );
};

export default LoginButton;
