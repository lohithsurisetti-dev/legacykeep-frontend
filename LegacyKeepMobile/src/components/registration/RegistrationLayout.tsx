import React, { memo, useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import RegistrationHeader from './RegistrationHeader';
import RegistrationFooter from './RegistrationFooter';
import ProgressTracker from '../ui/ProgressTracker';
import { colors, spacing } from '../../constants';

interface RegistrationLayoutProps {
  // Header props
  title?: string;
  subtitle: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  
  // Progress props
  currentStep?: number;
  totalSteps?: number;
  
  // Footer props
  primaryButtonText: string;
  onPrimaryPress: () => void;
  primaryButtonLoading?: boolean;
  primaryButtonDisabled?: boolean;
  secondaryText?: string;
  secondaryLinkText?: string;
  onSecondaryPress?: () => void;
  showSecondary?: boolean;
  
  // Content
  children: React.ReactNode;
  scrollable?: boolean;
}

const RegistrationLayout: React.FC<RegistrationLayoutProps> = memo(({
  title,
  subtitle,
  showBackButton = true,
  onBackPress,
  currentStep,
  totalSteps,
  primaryButtonText,
  onPrimaryPress,
  primaryButtonLoading = false,
  primaryButtonDisabled = false,
  secondaryText,
  secondaryLinkText,
  onSecondaryPress,
  showSecondary = true,
  children,
  scrollable = true,
}) => {
  const ContentWrapper = useMemo(() => scrollable ? ScrollView : View, [scrollable]);
  const contentProps = useMemo(() => scrollable 
    ? { contentContainerStyle: styles.scrollContent }
    : { style: styles.content }, [scrollable]);

  // Add cleanup effect for better navigation performance
  useEffect(() => {
    return () => {
      // Cleanup any pending operations when component unmounts
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      removeClippedSubviews={true}
    >
      <ContentWrapper {...contentProps}>
        <View style={styles.wrapper}>
          {/* Header */}
          <RegistrationHeader
            title={title}
            subtitle={subtitle}
            showBackButton={showBackButton}
            onBackPress={onBackPress}
          />

          {/* Progress Tracker */}
          {currentStep && totalSteps && (
            <ProgressTracker currentStep={currentStep} totalSteps={totalSteps} />
          )}

          {/* Content */}
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </ContentWrapper>

      {/* Footer */}
      <RegistrationFooter
        primaryButtonText={primaryButtonText}
        onPrimaryPress={onPrimaryPress}
        primaryButtonLoading={primaryButtonLoading}
        primaryButtonDisabled={primaryButtonDisabled}
        secondaryText={secondaryText}
        secondaryLinkText={secondaryLinkText}
        onSecondaryPress={onSecondaryPress}
        showSecondary={showSecondary}
      />
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    // Add these properties to prevent screen overlap
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

RegistrationLayout.displayName = 'RegistrationLayout';

export default RegistrationLayout;
