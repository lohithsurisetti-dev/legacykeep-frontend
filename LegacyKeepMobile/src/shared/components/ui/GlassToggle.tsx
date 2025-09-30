/**
 * Glass Toggle Component
 *
 * Reusable toggle switch with glassmorphism effect
 * Used consistently across the entire app
 */

import React from 'react';
import { Switch, StyleSheet } from 'react-native';
import { colors } from '../../constants';

interface GlassToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const GlassToggle: React.FC<GlassToggleProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: 'rgba(224, 224, 224, 0.3)',
        true: 'rgba(0, 122, 255, 0.8)',
      }}
      thumbColor={value ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)'}
      style={styles.switchStyle}
      ios_backgroundColor="rgba(224, 224, 224, 0.2)"
    />
  );
};

const styles = StyleSheet.create({
  switchStyle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default GlassToggle;
