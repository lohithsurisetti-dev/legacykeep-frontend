import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GradientButton, GradientText } from '../ui';
import { colors, spacing, typography } from '../../constants';

interface RegistrationFooterProps {
  primaryButtonText: string;
  onPrimaryPress: () => void;
  primaryButtonLoading?: boolean;
  primaryButtonDisabled?: boolean;
  secondaryText?: string;
  secondaryLinkText?: string;
  onSecondaryPress?: () => void;
  showSecondary?: boolean;
}

const RegistrationFooter: React.FC<RegistrationFooterProps> = ({
  primaryButtonText,
  onPrimaryPress,
  primaryButtonLoading = false,
  primaryButtonDisabled = false,
  secondaryText = 'Already have an account? ',
  secondaryLinkText = 'Sign In',
  onSecondaryPress,
  showSecondary = true,
}) => {
  return (
    <View style={styles.footer}>
      <GradientButton
        title={primaryButtonText}
        onPress={onPrimaryPress}
        disabled={primaryButtonDisabled}
        loading={primaryButtonLoading}
        gradient="horizontal"
        style={styles.primaryButton}
      />
      
      {showSecondary && (
        <View style={styles.secondaryContainer}>
          <Text style={styles.secondaryText}>{secondaryText}</Text>
          <TouchableOpacity onPress={onSecondaryPress} activeOpacity={0.7}>
            <GradientText
              gradient="peacock"
              fontSize="md"
              fontWeight="bold"
            >
              {secondaryLinkText}
            </GradientText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  primaryButton: {
    height: 48,
    borderRadius: 8,
    width: '100%',
  },
  secondaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  secondaryText: {
    fontSize: typography.sizes.md,
    color: colors.neutral[600],
  },
});

export default RegistrationFooter;
