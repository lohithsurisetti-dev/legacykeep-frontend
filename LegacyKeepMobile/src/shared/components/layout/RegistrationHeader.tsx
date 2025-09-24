import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackButton } from '../ui';
import { colors, spacing, typography } from '../../../shared/constants';

interface RegistrationHeaderProps {
  title?: string;
  subtitle: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({
  title = 'LegacyKeep',
  subtitle,
  showBackButton = true,
  onBackPress,
  currentStep,
  totalSteps,
}) => {
  return (
    <>
      {/* Back Button */}
      {showBackButton && (
        <BackButton onPress={onBackPress || (() => {})} style={styles.backButton} />
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Progress Indicator */}
      {currentStep && totalSteps && (
        <View style={styles.progressContainer}>
          {/* ProgressTracker component would go here */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  title: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 22,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
});

export default RegistrationHeader;
