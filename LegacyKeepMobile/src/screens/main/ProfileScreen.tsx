/**
 * Profile Screen
 * 
 * User profile and settings management screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../navigation/types';
import { ROUTES } from '../../navigation/types';
import { colors, typography, spacing } from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { BackButton } from '../../components/ui';

type Props = MainStackScreenProps<typeof ROUTES.PROFILE>;

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { colors: themeColors } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSettings = () => {
    // TODO: Navigate to settings screen
    console.log('Settings pressed');
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    console.log('Edit profile pressed');
  };

  const handleSecuritySettings = () => {
    // TODO: Navigate to security settings
    console.log('Security settings pressed');
  };

  const handleNotificationSettings = () => {
    // TODO: Navigate to notification settings
    console.log('Notification settings pressed');
  };

  const handleFamilyManagement = () => {
    // TODO: Navigate to family management
    console.log('Family management pressed');
  };

  const handleSupport = () => {
    // TODO: Navigate to support
    console.log('Support pressed');
  };

  const handleLogout = () => {
    // TODO: Implement logout
    console.log('Logout pressed');
  };

  const styles = createStyles(themeColors);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={themeColors.background} />
        
        {/* Header */}
        <View style={styles.header}>
          <BackButton onPress={handleBack} />
          <View style={styles.headerSpacer} />
          <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
            <Ionicons 
              name="settings-outline" 
              size={22} 
              color={themeColors.text} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* User Profile Section */}
          <View style={styles.section}>
            <View style={styles.profileCard}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileInitials}>
                  {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
                <View style={styles.profileStatus}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success?.[500] || '#4CAF50'} />
                  <Text style={styles.profileStatusText}>Verified Account</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                <Ionicons name="create-outline" size={20} color={themeColors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.settingsCard}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="person-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Personal Information</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem} onPress={handleSecuritySettings}>
                <View style={styles.settingIcon}>
                  <Ionicons name="shield-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Security & Privacy</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem} onPress={handleNotificationSettings}>
                <View style={styles.settingIcon}>
                  <Ionicons name="notifications-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Notifications</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Family & Legacy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Family & Legacy</Text>
            <View style={styles.settingsCard}>
              <TouchableOpacity style={styles.settingItem} onPress={handleFamilyManagement}>
                <View style={styles.settingIcon}>
                  <Ionicons name="people-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Family Members</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="library-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>My Stories</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="images-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Photos & Media</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* App Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            <View style={styles.settingsCard}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="color-palette-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Theme & Display</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="language-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Language</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="server-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Storage & Data</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support & Help */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support & Help</Text>
            <View style={styles.settingsCard}>
              <TouchableOpacity style={styles.settingItem} onPress={handleSupport}>
                <View style={styles.settingIcon}>
                  <Ionicons name="help-circle-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Help Center</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="mail-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Contact Support</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="star-outline" size={20} color={themeColors.primary} />
                </View>
                <Text style={styles.settingText}>Rate App</Text>
                <Ionicons name="chevron-forward" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color={colors.error?.[500] || '#F44336'} />
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
      </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
    </SafeAreaView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
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
  headerSpacer: {
    flex: 1,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.neutral?.[900] || '#212121',
    marginBottom: spacing.sm,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: colors.neutral?.[900] || '#212121',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  profileInitials: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.textInverse,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral?.[900] || '#212121',
    marginBottom: spacing.xs,
  },
  profileEmail: {
    fontSize: typography.sizes.sm,
    color: colors.neutral?.[500] || '#9E9E9E',
    marginBottom: spacing.xs,
  },
  profileStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileStatusText: {
    fontSize: typography.sizes.xs,
    color: colors.success?.[500] || '#4CAF50',
    marginLeft: spacing.xs,
  },
  editButton: {
    padding: spacing.sm,
  },
  settingsCard: {
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 16,
    shadowColor: colors.neutral?.[900] || '#212121',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingText: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.neutral?.[900] || '#212121',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.error?.[200] || '#EF9A9A',
  },
  logoutText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.error?.[500] || '#F44336',
    marginLeft: spacing.sm,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  safeArea: {
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
  headerSpacer: {
    flex: 1,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.neutral?.[900] || '#212121',
    marginBottom: spacing.sm,
  },
  profileCard: {
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.neutral?.[900] || '#212121',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary?.[100] || '#BBDEFB',
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary?.[600] || '#0288D1',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral?.[900] || '#212121',
    marginBottom: spacing.xs,
  },
  profileEmail: {
    fontSize: typography.sizes.sm,
    color: colors.neutral?.[500] || '#9E9E9E',
  },
  editButton: {
    backgroundColor: colors.primary?.[50] || '#E3F2FD',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.primary?.[600] || '#0288D1',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral?.[200] || '#EEEEEE',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.neutral?.[900] || '#212121',
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: typography.sizes.sm,
    color: colors.neutral?.[500] || '#9E9E9E',
  },
  optionArrow: {
    marginLeft: spacing.sm,
  },
  logoutButton: {
    backgroundColor: colors.error?.[50] || '#FFEBEE',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.error?.[600] || '#E53935',
  },
});

export default ProfileScreen;