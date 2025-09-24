/**
 * Reusable Button Component
 * 
 * Handles different button styles, loading states, and accessibility
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { colors, typography, spacing } from '../../../shared/constants';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button, styles[`button_${size}`]];
    
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    if (variant === 'primary') {
      baseStyle.push(styles.buttonPrimary);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.buttonSecondary);
    } else if (variant === 'outline') {
      baseStyle.push(styles.buttonOutline);
    } else if (variant === 'ghost') {
      baseStyle.push(styles.buttonGhost);
    }
    
    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: any[] = [styles.text, styles[`text_${size}`]];
    
    if (variant === 'primary') {
      baseStyle.push(styles.textPrimary);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.textSecondary);
    } else if (variant === 'outline') {
      baseStyle.push(styles.textOutline);
    } else if (variant === 'ghost') {
      baseStyle.push(styles.textGhost);
    }
    
    if (disabled || loading) {
      baseStyle.push(styles.textDisabled);
    }
    
    return baseStyle;
  };

  const getSpinnerColor = () => {
    if (variant === 'primary') {
      return colors.neutral[50];
    } else if (variant === 'secondary') {
      return colors.neutral[50];
    } else if (variant === 'outline') {
      return colors.primary[600];
    } else if (variant === 'ghost') {
      return colors.primary[600];
    }
    return colors.neutral[50];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getSpinnerColor()}
          style={styles.spinner}
        />
      ) : (
        <>
          {leftIcon && (
            <View style={styles.leftIcon}>
              {leftIcon}
            </View>
          )}
          
          <Text style={getTextStyle()}>{title}</Text>
          
          {rightIcon && (
            <View style={styles.rightIcon}>
              {rightIcon}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  
  // Sizes
  button_small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  button_medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  button_large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
  
  // Variants
  buttonPrimary: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  buttonSecondary: {
    backgroundColor: colors.neutral[600],
    borderColor: colors.neutral[600],
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: colors.primary[600],
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  
  // States
  buttonDisabled: {
    backgroundColor: colors.neutral[200],
    borderColor: colors.neutral[200],
  },
  
  // Layout
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  text: {
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },
  text_small: {
    fontSize: typography.sizes.sm,
  },
  text_medium: {
    fontSize: typography.sizes.md,
  },
  text_large: {
    fontSize: typography.sizes.lg,
  },
  
  // Text variants
  textPrimary: {
    color: colors.neutral[50],
  },
  textSecondary: {
    color: colors.neutral[50],
  },
  textOutline: {
    color: colors.primary[600],
  },
  textGhost: {
    color: colors.primary[600],
  },
  textDisabled: {
    color: colors.neutral[400],
  },
  
  // Icons
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  
  // Loading
  spinner: {
    marginHorizontal: spacing.sm,
  },
});

export default Button;
