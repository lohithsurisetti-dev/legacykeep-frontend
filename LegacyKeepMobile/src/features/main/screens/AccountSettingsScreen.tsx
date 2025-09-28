/**
 * Account Settings Screen
 * 
 * User account information and settings
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

type Props = MainStackScreenProps<typeof ROUTES.ACCOUNT_SETTINGS>;

const AccountSettingsScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { colors: themeColors } = useTheme();
  

  const handleBack = () => {
    navigation.goBack();
  };


  const handleChangePassword = () => {
    console.log('Change password pressed');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') },
      ]
    );
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
      <View style={styles.header}>
        <BackButton 
          onPress={handleBack} 
          size={20}
          style={styles.compactBackButton}
        />
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Account Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Security</Text>
          
          <TouchableOpacity style={styles.settingsItem} onPress={handleChangePassword}>
            <View style={styles.settingsItemLeft}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={colors.neutral?.[600] || '#757575'} 
              />
              <Text style={[styles.settingsItemText, { color: themeColors.text }]}>
                Change Password
              </Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={16} 
              color={colors.neutral?.[400] || '#BDBDBD'} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Danger Zone</Text>
          
          <TouchableOpacity style={[styles.settingsItem, styles.dangerItem]} onPress={handleDeleteAccount}>
            <View style={styles.settingsItemLeft}>
              <Ionicons 
                name="trash-outline" 
                size={20} 
                color="#FF3B30" 
              />
              <Text style={[styles.settingsItemText, styles.dangerText]}>
                Delete Account
              </Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={16} 
              color="#FF3B30" 
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
  dangerItem: {
    borderBottomColor: '#FF3B30',
  },
  dangerText: {
    color: '#FF3B30',
  },
});

export default AccountSettingsScreen;
