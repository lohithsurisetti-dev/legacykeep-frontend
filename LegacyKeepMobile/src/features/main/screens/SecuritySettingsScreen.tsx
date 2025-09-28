/**
 * Security Settings Screen
 * 
 * User security preferences and authentication
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';
import { BackButton, GlassToggle } from '../../../shared/components/ui';

type Props = MainStackScreenProps<typeof ROUTES.SECURITY_SETTINGS>;

const SecuritySettingsScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [deviceTrust, setDeviceTrust] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangePassword = () => {
    console.log('Change password pressed');
  };

  const handleTwoFactorSetup = () => {
    Alert.alert(
      'Two-Factor Authentication',
      'This will set up two-factor authentication for your account. You will need to verify your identity with a second device.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log('2FA setup started') },
      ]
    );
  };

  const handleActiveSessions = () => {
    console.log('Active sessions pressed');
  };

  const handleSecurityLog = () => {
    console.log('Security log pressed');
  };

  const renderToggleItem = (
    title: string,
    description: string,
    value: boolean,
    onValueChange: (value: boolean) => void,
    icon: string
  ) => (
    <View style={styles.toggleItem}>
      <View style={styles.toggleItemLeft}>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={colors.neutral?.[600] || '#757575'} 
        />
        <View style={styles.toggleItemContent}>
          <Text style={[styles.toggleItemTitle, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.toggleItemDescription, { color: themeColors.textSecondary }]}>{description}</Text>
        </View>
      </View>
      <GlassToggle
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );

  const renderSettingsItem = (
    title: string,
    description: string,
    onPress: () => void,
    icon: string,
    isDanger?: boolean
  ) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={isDanger ? '#FF3B30' : (colors.neutral?.[600] || '#757575')} 
        />
        <View style={styles.settingsItemContent}>
          <Text style={[
            styles.settingsItemTitle, 
            { color: isDanger ? '#FF3B30' : themeColors.text }
          ]}>
            {title}
          </Text>
          <Text style={[styles.settingsItemDescription, { color: themeColors.textSecondary }]}>
            {description}
          </Text>
        </View>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={16} 
        color={isDanger ? '#FF3B30' : (colors.neutral?.[400] || '#BDBDBD')} 
      />
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
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Security Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Authentication</Text>
          
          {renderToggleItem(
            'Biometric Authentication',
            'Use fingerprint or face recognition to unlock the app',
            biometricAuth,
            setBiometricAuth,
            'finger-print-outline'
          )}
          
          {renderToggleItem(
            'Two-Factor Authentication',
            'Add an extra layer of security to your account',
            twoFactorAuth,
            setTwoFactorAuth,
            'shield-checkmark-outline'
          )}
          
          {renderToggleItem(
            'Session Timeout',
            'Automatically log out after period of inactivity',
            sessionTimeout,
            setSessionTimeout,
            'time-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Account Security</Text>
          
          {renderSettingsItem(
            'Change Password',
            'Update your account password',
            handleChangePassword,
            'lock-closed-outline'
          )}
          
          {renderSettingsItem(
            'Active Sessions',
            'View and manage your active login sessions',
            handleActiveSessions,
            'phone-portrait-outline'
          )}
          
          {renderSettingsItem(
            'Security Log',
            'Review your account security activity',
            handleSecurityLog,
            'list-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Privacy & Monitoring</Text>
          
          {renderToggleItem(
            'Login Alerts',
            'Get notified when someone logs into your account',
            loginAlerts,
            setLoginAlerts,
            'notifications-outline'
          )}
          
          {renderToggleItem(
            'Device Trust',
            'Remember trusted devices for easier login',
            deviceTrust,
            setDeviceTrust,
            'checkmark-circle-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Advanced Security</Text>
          
          {renderSettingsItem(
            'Setup Two-Factor Authentication',
            'Configure 2FA for enhanced security',
            handleTwoFactorSetup,
            'shield-outline'
          )}
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
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral?.[100] || '#F5F5F5',
  },
  toggleItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleItemContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  toggleItemTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: 2,
  },
  toggleItemDescription: {
    fontSize: typography.sizes.sm,
    lineHeight: 18,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral?.[100] || '#F5F5F5',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: 2,
  },
  settingsItemDescription: {
    fontSize: typography.sizes.sm,
    lineHeight: 18,
  },
});

export default SecuritySettingsScreen;
