import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing } from '../../constants';
import { useLanguage } from '../../contexts/LanguageContext';
import GradientBackground from '../../components/ui/GradientBackground';
import GlassmorphismContainer from '../../components/ui/GlassmorphismContainer';
import GradientText from '../../components/ui/GradientText';
import LoginButton from '../../components/ui/LoginButton';

type Props = AuthStackScreenProps<typeof ROUTES.REGISTRATION_SUCCESS>;

const RegistrationSuccessScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    // Navigate to onboarding or main app
    (navigation as any).navigate(ROUTES.ONBOARDING);
  };

  return (
    <GradientBackground gradient="peacock" style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.successIcon}>✅</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <GradientText
              gradient="peacock"
              fontSize="xxl"
              fontWeight="bold"
              style={styles.title}
            >
              {t('auth.registrationSuccess.title')}
            </GradientText>
            <Text style={styles.subtitle}>
              {t('auth.registrationSuccess.subtitle')}
            </Text>
          </View>

          {/* Description */}
          <GlassmorphismContainer style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {t('auth.registrationSuccess.description')}
            </Text>
          </GlassmorphismContainer>

          {/* Get Started Button */}
          <LoginButton
            title={t('auth.registrationSuccess.getStartedButton')}
            onPress={handleGetStarted}
            style={styles.getStartedButton}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  successIcon: {
    fontSize: 80,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[100],
    textAlign: 'center',
    opacity: 0.9,
  },
  descriptionContainer: {
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  description: {
    fontSize: typography.sizes.md,
    color: colors.neutral[100],
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
  },
  getStartedButton: {
    width: '100%',
  },
});

export default RegistrationSuccessScreen;
