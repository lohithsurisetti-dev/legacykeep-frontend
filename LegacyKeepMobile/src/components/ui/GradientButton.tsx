/**
 * Gradient Button Component
 * 
 * Reusable gradient button component using our design system
 */

import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradientConfigs, componentColors, brandColors } from '../../constants/designSystem';
import { colors, typography, spacing } from '../../constants';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  gradient?: keyof typeof gradientConfigs;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  gradient = 'horizontal',
  disabled = false,
  style,
  textStyle,
  activeOpacity = 0.8,
}) => {
  const config = gradientConfigs[gradient];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[
        {
          height: 48,
          borderRadius: 8,
          shadowColor: colors.shadow.dark,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={config.colors}
        start={config.start}
        end={config.end}
        style={{
          flex: 1,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <Text
          style={[
            {
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
              color: colors.neutral[50],
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
