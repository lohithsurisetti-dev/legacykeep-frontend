/**
 * Settings Screen
 * 
 * User settings and preferences management
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';
import { useAuth } from '../../../app/providers/AuthContext';
import { BackButton } from '../../../shared/components/ui';

type Props = MainStackScreenProps<typeof ROUTES.SETTINGS>;

const SettingsScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const { colors: themeColors } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleAccountSettings = () => {
    console.log('Account settings pressed');
  };

  const handlePrivacySettings = () => {
    console.log('Privacy settings pressed');
  };

  const handleNotificationSettings = () => {
    console.log('Notification settings pressed');
  };

  const handleSecuritySettings = () => {
    console.log('Security settings pressed');
  };

  const handleAppPreferences = () => {
    console.log('App preferences pressed');
  };

  const handleHelpSupport = () => {
    console.log('Help & support pressed');
  };

  const handleAbout = () => {
    console.log('About pressed');
  };

  const renderSettingsSection = (title: string, items: any[]) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.settingsItem,
            index === items.length - 1 && styles.lastItem,
            { borderBottomColor: colors.neutral?.[100] || '#F5F5F5' }
          ]}
          onPress={item.onPress}
        >
          <View style={styles.settingsItemLeft}>
            <Ionicons 
              name={item.icon} 
              size={20} 
              color={colors.neutral?.[600] || '#757575'} 
            />
            <Text style={[styles.settingsItemText, { color: themeColors.text }]}>
              {item.title}
            </Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={16} 
            color={colors.neutral?.[400] || '#BDBDBD'} 
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const accountItems = [
    {
      icon: 'person-outline',
      title: 'Account Information',
      onPress: handleAccountSettings,
    },
    {
      icon: 'shield-outline',
      title: 'Privacy Settings',
      onPress: handlePrivacySettings,
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      onPress: handleNotificationSettings,
    },
    {
      icon: 'lock-closed-outline',
      title: 'Security',
      onPress: handleSecuritySettings,
    },
  ];

  const appItems = [
    {
      icon: 'settings-outline',
      title: 'App Preferences',
      onPress: handleAppPreferences,
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      onPress: handleHelpSupport,
    },
    {
      icon: 'information-circle-outline',
      title: 'About',
      onPress: handleAbout,
    },
  ];

  const dangerItems = [
    {
      icon: 'log-out-outline',
      title: 'Logout',
      onPress: handleLogout,
      isDestructive: true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSettingsSection('Account', accountItems)}
        {renderSettingsSection('App', appItems)}
        {renderSettingsSection('', dangerItems)}
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: themeColors.textSecondary }]}>
            LegacyKeep v1.0.0
          </Text>
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
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginHorizontal: spacing.md,
  },
  headerSpacer: {
    width: 40, // Same width as back button for centering
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
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginLeft: spacing.md,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    fontSize: typography.sizes.sm,
  },
});

export default SettingsScreen;