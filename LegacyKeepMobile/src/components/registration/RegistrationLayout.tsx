import React from 'react';
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

const RegistrationLayout: React.FC<RegistrationLayoutProps> = ({
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
  const ContentWrapper = scrollable ? ScrollView : View;
  const contentProps = scrollable 
    ? { contentContainerStyle: styles.scrollContent }
    : { style: styles.content };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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

export default RegistrationLayout;
