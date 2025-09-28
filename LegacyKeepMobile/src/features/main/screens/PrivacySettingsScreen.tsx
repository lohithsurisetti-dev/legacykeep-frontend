/**
 * Privacy Settings Screen
 * 
 * User privacy preferences and data control
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

type Props = MainStackScreenProps<typeof ROUTES.PRIVACY_SETTINGS>;

const PrivacySettingsScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showBirthday, setShowBirthday] = useState(true);
  const [allowSearch, setAllowSearch] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);

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
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Privacy Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Profile Visibility</Text>
          
          {renderToggleItem(
            'Public Profile',
            'Make your profile visible to other users',
            profileVisibility,
            setProfileVisibility,
            'eye-outline'
          )}
          
          {renderToggleItem(
            'Show Email',
            'Display your email address on your profile',
            showEmail,
            setShowEmail,
            'mail-outline'
          )}
          
          {renderToggleItem(
            'Show Birthday',
            'Display your birthday on your profile',
            showBirthday,
            setShowBirthday,
            'gift-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Discovery</Text>
          
          {renderToggleItem(
            'Allow Search',
            'Let other users find you by email or username',
            allowSearch,
            setAllowSearch,
            'search-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Data & Analytics</Text>
          
          {renderToggleItem(
            'Data Sharing',
            'Share anonymous usage data to improve the app',
            dataSharing,
            setDataSharing,
            'analytics-outline'
          )}
          
          {renderToggleItem(
            'Analytics',
            'Help us understand how you use the app',
            analytics,
            setAnalytics,
            'bar-chart-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Data Control</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons 
                name="download-outline" 
                size={20} 
                color={colors.neutral?.[600] || '#757575'} 
              />
              <Text style={[styles.settingsItemText, { color: themeColors.text }]}>
                Download My Data
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
                name="trash-outline" 
                size={20} 
                color={colors.neutral?.[600] || '#757575'} 
              />
              <Text style={[styles.settingsItemText, { color: themeColors.text }]}>
                Delete My Data
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

export default PrivacySettingsScreen;
