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
import GlassmorphismSpinner from './GlassmorphismSpinner';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  gradient?: keyof typeof gradientConfigs;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  gradient = 'horizontal',
  disabled = false,
  loading = false,
  style,
  textStyle,
  activeOpacity = 0.8,
}) => {
  const config = gradientConfigs[gradient];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
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
        {loading ? (
          <GlassmorphismSpinner 
            size={20} 
            color={colors.neutral[50]} 
          />
        ) : (
          <Text
            style={[
              {
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.bold,
                color: colors.neutral[50],
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
