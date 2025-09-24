/**
 * Glassmorphism Container Component
 * 
 * Reusable glassmorphism container using our design system
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { componentColors } from '../../../shared/constants/designSystem';
import { colors } from '../../constants/colors';

interface GlassmorphismContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'light' | 'dark';
}

const GlassmorphismContainer: React.FC<GlassmorphismContainerProps> = ({
  children,
  style,
  variant = 'default',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'light':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        };
      case 'dark':
        return {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
      default:
        return {
          backgroundColor: componentColors.glassmorphism.background,
          borderColor: componentColors.glassmorphism.border,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View
      style={[
        {
          borderRadius: 16,
          borderWidth: 1,
          shadowColor: colors.shadow.dark,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        variantStyles,
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default GlassmorphismContainer;
