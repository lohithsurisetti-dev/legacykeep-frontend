import React, { memo, useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import RegistrationHeader from './RegistrationHeader';
import RegistrationFooter from './RegistrationFooter';
import ProgressTracker from '../ui/ProgressTracker';
import { colors, spacing } from '../../../shared/constants';

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
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const ContentWrapper = useMemo(() => scrollable ? ScrollView : View, [scrollable]);
  const contentProps = useMemo(() => scrollable 
    ? { 
        contentContainerStyle: [
          styles.scrollContent,
          keyboardVisible && styles.scrollContentKeyboard
        ]
      }
    : { style: styles.content }, [scrollable, keyboardVisible]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
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
      </KeyboardAvoidingView>

      {/* Footer - Always at bottom, but adjusts for keyboard */}
      <View style={[
        styles.footerContainer,
        keyboardVisible && styles.footerContainerKeyboard
      ]}>
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
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  scrollContentKeyboard: {
    paddingBottom: 100, // Extra space when keyboard is visible
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20, // Reduced bottom padding
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  footerContainer: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 34, // Safe area bottom
  },
  footerContainerKeyboard: {
    paddingBottom: 16, // Reduced padding when keyboard is visible
  },
});

RegistrationLayout.displayName = 'RegistrationLayout';

export default RegistrationLayout;
