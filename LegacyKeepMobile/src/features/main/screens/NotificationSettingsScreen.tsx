/**
 * Notification Settings Screen
 * 
 * User notification preferences
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';
import { BackButton, GlassToggle } from '../../../shared/components/ui';

type Props = MainStackScreenProps<typeof ROUTES.NOTIFICATION_SETTINGS>;

const NotificationSettingsScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [familyUpdates, setFamilyUpdates] = useState(true);
  const [memoryReminders, setMemoryReminders] = useState(true);
  const [birthdayAlerts, setBirthdayAlerts] = useState(true);
  const [storyShares, setStoryShares] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleBack = () => {
    navigation.goBack();
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
      <View style={styles.header}>
        <BackButton 
          onPress={handleBack} 
          size={20}
          style={styles.compactBackButton}
        />
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Notification Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>General Notifications</Text>
          
          {renderToggleItem(
            'Push Notifications',
            'Receive push notifications on your device',
            pushNotifications,
            setPushNotifications,
            'notifications-outline'
          )}
          
          {renderToggleItem(
            'Email Notifications',
            'Receive notifications via email',
            emailNotifications,
            setEmailNotifications,
            'mail-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Family & Memories</Text>
          
          {renderToggleItem(
            'Family Updates',
            'Get notified when family members share new content',
            familyUpdates,
            setFamilyUpdates,
            'people-outline'
          )}
          
          {renderToggleItem(
            'Memory Reminders',
            'Reminders to add memories and stories',
            memoryReminders,
            setMemoryReminders,
            'time-outline'
          )}
          
          {renderToggleItem(
            'Birthday Alerts',
            'Get notified about family birthdays',
            birthdayAlerts,
            setBirthdayAlerts,
            'gift-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Content & Sharing</Text>
          
          {renderToggleItem(
            'Story Shares',
            'Notifications when someone shares a story with you',
            storyShares,
            setStoryShares,
            'book-outline'
          )}
          
          {renderToggleItem(
            'Weekly Digest',
            'Weekly summary of family activities',
            weeklyDigest,
            setWeeklyDigest,
            'calendar-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Marketing</Text>
          
          {renderToggleItem(
            'Marketing Emails',
            'Receive updates about new features and tips',
            marketingEmails,
            setMarketingEmails,
            'megaphone-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Notification Schedule</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons 
                name="time-outline" 
                size={20} 
                color={colors.neutral?.[600] || '#757575'} 
              />
              <Text style={[styles.settingsItemText, { color: themeColors.text }]}>
                Quiet Hours
              </Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={16} 
              color={colors.neutral?.[400] || '#BDBDBD'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons 
                name="volume-high-outline" 
                size={20} 
                color={colors.neutral?.[600] || '#757575'} 
              />
              <Text style={[styles.settingsItemText, { color: themeColors.text }]}>
                Sound & Vibration
              </Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={16} 
              color={colors.neutral?.[400] || '#BDBDBD'} 
            />
          </TouchableOpacity>
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
  settingsItemText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginLeft: spacing.md,
  },
});

export default NotificationSettingsScreen;
