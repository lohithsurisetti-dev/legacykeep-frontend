import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { colors, typography, spacing } from '../../../shared/constants';
import { RegistrationLayout } from '../../../shared/components/layout';

const PasswordResetScreen: React.FC = () => {
  return (
    <RegistrationLayout
      subtitle="Set your new password"
      currentStep={2}
      totalSteps={2}
      primaryButtonText="Update Password"
      onPrimaryPress={() => {}}
      primaryButtonDisabled={true}
      onSecondaryPress={() => {}}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Password Reset</Text>
        <Text style={styles.subtitle}>Enter and confirm your new password</Text>
        <TextInput style={styles.input} placeholder="New password" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry />
      </View>
    </RegistrationLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.neutral[600],
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.neutral[50],
  },
});

export default PasswordResetScreen;
