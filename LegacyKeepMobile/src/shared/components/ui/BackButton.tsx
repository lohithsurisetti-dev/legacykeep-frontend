import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../shared/constants';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  color?: string;
  size?: number;
  variant?: 'default' | 'minimal' | 'elevated' | 'instagram';
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  color,
  size = 24,
  variant = 'default',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return {
          container: styles.minimalContainer,
          iconColor: color || colors.neutral[600],
        };
      case 'elevated':
        return {
          container: styles.elevatedContainer,
          iconColor: color || colors.neutral[900],
        };
      case 'instagram':
        return {
          container: styles.instagramContainer,
          iconColor: color || colors.neutral[50],
        };
      default:
        return {
          container: styles.defaultContainer,
          iconColor: color || colors.neutral[900],
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      style={[
        variantStyles.container,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="chevron-back" size={size} color={variantStyles.iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Default variant - clean with subtle shadow
  defaultContainer: {
    width: 44, // Increased for better touch area
    height: 44, // Increased for better touch area
    borderRadius: 22, // Adjusted for new size
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Minimal variant - no background, just icon
  minimalContainer: {
    width: 44, // Increased for better touch area
    height: 44, // Increased for better touch area
    borderRadius: 22, // Adjusted for new size
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  
  // Elevated variant - more prominent shadow
  elevatedContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  
  // Instagram variant - Primary color background (updated from Instagram blue)
  instagramContainer: {
    width: 44, // Increased for better touch area
    height: 44, // Increased for better touch area
    borderRadius: 22, // Adjusted for new size
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary[500], // Use primary color instead of Instagram blue
    shadowColor: colors.primary[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default BackButton;
