/**
 * App Preferences Screen
 * 
 * App-specific settings and preferences
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

type Props = MainStackScreenProps<typeof ROUTES.APP_PREFERENCES>;

const AppPreferencesScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  
  const [autoBackup, setAutoBackup] = useState(true);
  const [highQualityPhotos, setHighQualityPhotos] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [dataCompression, setDataCompression] = useState(true);
  const [cacheManagement, setCacheManagement] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleStorageSettings = () => {
    console.log('Storage settings pressed');
  };

  const handleCacheClear = () => {
    console.log('Clear cache pressed');
  };

  const handleDataUsage = () => {
    console.log('Data usage pressed');
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
    icon: string
  ) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={colors.neutral?.[600] || '#757575'} 
        />
        <View style={styles.settingsItemContent}>
          <Text style={[styles.settingsItemTitle, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.settingsItemDescription, { color: themeColors.textSecondary }]}>{description}</Text>
        </View>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={16} 
        color={colors.neutral?.[400] || '#BDBDBD'} 
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
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>App Preferences</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Data & Storage</Text>
          
          {renderToggleItem(
            'Auto Backup',
            'Automatically backup your memories to the cloud',
            autoBackup,
            setAutoBackup,
            'cloud-upload-outline'
          )}
          
          {renderToggleItem(
            'High Quality Photos',
            'Save photos in original quality (uses more storage)',
            highQualityPhotos,
            setHighQualityPhotos,
            'image-outline'
          )}
          
          {renderToggleItem(
            'Offline Mode',
            'Download content for offline viewing',
            offlineMode,
            setOfflineMode,
            'download-outline'
          )}
          
          {renderToggleItem(
            'Data Compression',
            'Compress data to save bandwidth',
            dataCompression,
            setDataCompression,
            'resize-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Performance</Text>
          
          {renderToggleItem(
            'Cache Management',
            'Automatically manage app cache',
            cacheManagement,
            setCacheManagement,
            'trash-outline'
          )}
          
          {renderSettingsItem(
            'Storage Settings',
            'Manage your storage usage and settings',
            handleStorageSettings,
            'folder-outline'
          )}
          
          {renderSettingsItem(
            'Clear Cache',
            'Free up space by clearing app cache',
            handleCacheClear,
            'refresh-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>User Experience</Text>
          
          {renderToggleItem(
            'Haptic Feedback',
            'Feel vibrations when interacting with the app',
            hapticFeedback,
            setHapticFeedback,
            'phone-portrait-outline'
          )}
          
          {renderToggleItem(
            'Sound Effects',
            'Play sounds for app interactions',
            soundEffects,
            setSoundEffects,
            'volume-high-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Data Usage</Text>
          
          {renderSettingsItem(
            'Data Usage',
            'Monitor your data consumption',
            handleDataUsage,
            'analytics-outline'
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

export default AppPreferencesScreen;
