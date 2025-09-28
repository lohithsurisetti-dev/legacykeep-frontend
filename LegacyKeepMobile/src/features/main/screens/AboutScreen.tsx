/**
 * About Screen
 * 
 * App information, version, and legal details
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';
import { BackButton } from '../../../shared/components/ui';

type Props = MainStackScreenProps<typeof ROUTES.ABOUT>;

const AboutScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePrivacyPolicy = () => {
    console.log('Privacy policy pressed');
  };

  const handleTermsOfService = () => {
    console.log('Terms of service pressed');
  };

  const handleOpenSource = () => {
    console.log('Open source pressed');
  };

  const handleRateApp = () => {
    Alert.alert(
      'Rate LegacyKeep',
      'Would you like to rate our app in the App Store?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Rate Now', onPress: () => console.log('Rate app pressed') },
      ]
    );
  };

  const handleShareApp = () => {
    console.log('Share app pressed');
  };

  const handleVersionInfo = () => {
    Alert.alert(
      'Version Information',
      'LegacyKeep v1.0.0\nBuild 2024.09.28\n\n© 2024 LegacyKeep Inc.',
      [{ text: 'OK' }]
    );
  };

  const renderInfoItem = (
    title: string,
    value: string,
    onPress?: () => void,
    icon?: string
  ) => (
    <TouchableOpacity 
      style={styles.infoItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.infoItemLeft}>
        {icon && (
          <Ionicons 
            name={icon as any} 
            size={20} 
            color={colors.neutral?.[600] || '#757575'} 
          />
        )}
        <View style={styles.infoItemContent}>
          <Text style={[styles.infoItemTitle, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.infoItemValue, { color: themeColors.textSecondary }]}>{value}</Text>
        </View>
      </View>
      {onPress && (
        <Ionicons 
          name="chevron-forward" 
          size={16} 
          color={colors.neutral?.[400] || '#BDBDBD'} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
      <View style={styles.header}>
        <BackButton 
          onPress={handleBack} 
          size={20}
          style={styles.compactBackButton}
        />
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>About</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* App Header */}
        <View style={styles.appHeader}>
          <View style={styles.appIcon}>
            <Ionicons name="book-outline" size={40} color={colors.primary?.[500] || '#007AFF'} />
          </View>
          <Text style={[styles.appName, { color: themeColors.text }]}>LegacyKeep</Text>
          <Text style={[styles.appTagline, { color: themeColors.textSecondary }]}>
            Preserving memories for generations
          </Text>
          <Text style={[styles.appVersion, { color: themeColors.textSecondary }]}>
            Version 1.0.0
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>App Information</Text>
          
          {renderInfoItem(
            'Version',
            '1.0.0 (Build 2024.09.28)',
            handleVersionInfo,
            'information-circle-outline'
          )}
          
          {renderInfoItem(
            'Last Updated',
            'September 28, 2024',
            undefined,
            'calendar-outline'
          )}
          
          {renderInfoItem(
            'App Size',
            '45.2 MB',
            undefined,
            'phone-portrait-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Legal</Text>
          
          {renderInfoItem(
            'Privacy Policy',
            'How we protect your data',
            handlePrivacyPolicy,
            'shield-outline'
          )}
          
          {renderInfoItem(
            'Terms of Service',
            'App usage terms and conditions',
            handleTermsOfService,
            'document-text-outline'
          )}
          
          {renderInfoItem(
            'Open Source Licenses',
            'Third-party libraries and licenses',
            handleOpenSource,
            'code-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Support</Text>
          
          {renderInfoItem(
            'Rate LegacyKeep',
            'Share your feedback in the App Store',
            handleRateApp,
            'star-outline'
          )}
          
          {renderInfoItem(
            'Share App',
            'Tell friends about LegacyKeep',
            handleShareApp,
            'share-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Company</Text>
          
          <View style={styles.companyInfo}>
            <Text style={[styles.companyText, { color: themeColors.textSecondary }]}>
              LegacyKeep Inc.
            </Text>
            <Text style={[styles.companyText, { color: themeColors.textSecondary }]}>
              © 2024 All rights reserved
            </Text>
            <Text style={[styles.companyText, { color: themeColors.textSecondary }]}>
              Made with ❤️ for families everywhere
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral?.[200] || '#EEEEEE',
    minHeight: 48,
  },
  compactBackButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginHorizontal: spacing.md,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  appHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary?.[100] || '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  appTagline: {
    fontSize: typography.sizes.md,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  appVersion: {
    fontSize: typography.sizes.sm,
    color: colors.neutral?.[500] || '#9E9E9E',
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.lg,
    color: colors.neutral?.[600] || '#757575',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral?.[100] || '#F5F5F5',
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoItemContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  infoItemTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: 2,
  },
  infoItemValue: {
    fontSize: typography.sizes.sm,
  },
  companyInfo: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
  },
  companyText: {
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
});

export default AboutScreen;
