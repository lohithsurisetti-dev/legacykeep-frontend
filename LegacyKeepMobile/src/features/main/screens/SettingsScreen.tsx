/**
 * Settings Screen
 * 
 * User settings and preferences management
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Switch,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';
import { useAuth } from '../../../app/providers/AuthContext';
import { BackButton, GlassToggle } from '../../../shared/components/ui';

type Props = MainStackScreenProps<typeof ROUTES.SETTINGS>;

const SettingsScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const { colors: themeColors, effectiveTheme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

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
    (navigation as any).navigate(ROUTES.ACCOUNT_SETTINGS);
  };

  const handlePrivacySettings = () => {
    (navigation as any).navigate(ROUTES.PRIVACY_SETTINGS);
  };

  const handleNotificationSettings = () => {
    (navigation as any).navigate(ROUTES.NOTIFICATION_SETTINGS);
  };

  const handleSecuritySettings = () => {
    (navigation as any).navigate(ROUTES.SECURITY_SETTINGS);
  };

  const handleAppPreferences = () => {
    (navigation as any).navigate(ROUTES.APP_PREFERENCES);
  };

  const handleHelpSupport = () => {
    (navigation as any).navigate(ROUTES.HELP_SUPPORT);
  };

  const handleAbout = () => {
    (navigation as any).navigate(ROUTES.ABOUT);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log('Language changed to:', language);
  };

  const showLanguageSelector = () => {
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' },
      { code: 'de', name: 'Deutsch' },
      { code: 'pt', name: 'Português' },
      { code: 'hi', name: 'हिन्दी' }
    ];

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...languages.map(lang => lang.name), 'Cancel'],
          cancelButtonIndex: languages.length,
          title: 'Select Language',
        },
        (buttonIndex) => {
          if (buttonIndex < languages.length) {
            handleLanguageChange(languages[buttonIndex].code);
          }
        }
      );
    } else {
      // For Android, show an alert with options
      const languageOptions = languages.map(lang => lang.name).join('\n');
      Alert.alert(
        'Select Language',
        languageOptions,
        [
          ...languages.map((lang, index) => ({
            text: lang.name,
            onPress: () => handleLanguageChange(lang.code),
          })),
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    }
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'pt': 'Português',
      'hi': 'हिन्दी'
    };
    return languages[code] || 'English';
  };

  const handleDarkModeToggle = () => {
    toggleTheme();
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
          activeOpacity={0.7}
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
          <View style={styles.settingsItemRight}>
            {item.hasToggle ? (
              <GlassToggle
                value={item.toggleValue}
                onValueChange={item.onPress}
              />
            ) : item.hasDropdown ? (
              <View style={styles.dropdownContainer}>
                <Text style={[styles.dropdownText, { color: themeColors.textSecondary }]}>
                  {item.currentValue}
                </Text>
                <Ionicons 
                  name="chevron-down" 
                  size={16} 
                  color={colors.neutral?.[400] || '#BDBDBD'} 
                />
              </View>
            ) : (
              <Ionicons 
                name="chevron-forward" 
                size={16} 
                color={colors.neutral?.[400] || '#BDBDBD'} 
              />
            )}
          </View>
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
      icon: 'moon-outline',
      title: 'Dark Mode',
      onPress: handleDarkModeToggle,
      hasToggle: true,
      toggleValue: effectiveTheme === 'dark',
    },
    {
      icon: 'language-outline',
      title: 'Language',
      onPress: showLanguageSelector,
      hasDropdown: true,
      currentValue: getLanguageName(selectedLanguage),
    },
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
        <BackButton 
          onPress={handleBack} 
          size={20}
          style={styles.compactBackButton}
        />
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSettingsSection('Account', accountItems)}
        {renderSettingsSection('App', appItems)}
        {renderSettingsSection('Account', dangerItems)}
        
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
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginLeft: spacing.md,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  dropdownText: {
    fontSize: typography.sizes.sm,
    marginRight: spacing.xs,
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