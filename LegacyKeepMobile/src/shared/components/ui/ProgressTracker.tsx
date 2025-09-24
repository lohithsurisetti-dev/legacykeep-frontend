/**
 * Progress Tracker Component
 * 
 * Shows progress through the registration flow
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../shared/constants';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  currentStep, 
  totalSteps = 4 
}) => {
  return (
    <View style={styles.progressContainer}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isLast = index === totalSteps - 1;
        
        return (
          <View key={index} style={styles.stepWrapper}>
            {/* Progress Dot */}
            <View style={styles.dotContainer}>
              {isCompleted || isCurrent ? (
                <LinearGradient
                  colors={['#247B7B', '#667eea']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.progressDot}
                />
              ) : (
                <View style={styles.emptyDot} />
              )}
            </View>
            
            {/* Connecting Line (except for last step) */}
            {!isLast && (
              <View style={styles.lineContainer}>
                {isCompleted ? (
                  <LinearGradient
                    colors={['#247B7B', '#667eea']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.progressLine}
                  />
                ) : (
                  <View style={styles.emptyLine} />
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  emptyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    backgroundColor: 'transparent',
  },
  lineContainer: {
    width: 24,
    height: 2,
    marginHorizontal: spacing.xs,
  },
  progressLine: {
    width: '100%',
    height: '100%',
    borderRadius: 1,
  },
  emptyLine: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral[300],
    borderRadius: 1,
  },
});

export default ProgressTracker;
