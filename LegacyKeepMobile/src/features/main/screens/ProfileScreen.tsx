/**
 * Profile Screen
 * 
 * User profile display with rich information and statistics
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';
import { useAuth } from '../../../app/providers/AuthContext';
import { BackButton, GradientButton } from '../../../shared/components/ui';

type Props = MainStackScreenProps<typeof ROUTES.PROFILE>;

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { colors: themeColors } = useTheme();
  const [profileData, setProfileData] = useState<any>(null);
  const [stats, setStats] = useState({
    stories: 0,
    family: 0,
    photos: 0,
    videos: 0,
  });
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'story', title: 'Family Vacation 2024', date: '2 days ago', icon: 'book-outline' },
    { id: 2, type: 'photo', title: 'Added 5 new photos', date: '1 week ago', icon: 'camera-outline' },
    { id: 3, type: 'family', title: 'Added new family member', date: '2 weeks ago', icon: 'people-outline' },
  ]);

  useEffect(() => {
    // Mock profile data - replace with actual API call
    setProfileData({
      firstName: user?.firstName || 'John',
      lastName: user?.lastName || 'Doe',
      username: user?.username || 'johndoe',
      bio: 'Building the future one story at a time. Passionate about technology and family memories.',
      location: 'San Francisco, CA',
      age: 28,
      profilePictureUrl: null,
      memberSince: '2024',
      isComplete: true,
    });

    // Mock stats - replace with actual API calls
    setStats({
      stories: 15,
      family: 8,
      photos: 42,
      videos: 12,
    });
  }, [user]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSettings = () => {
    (navigation as any).navigate(ROUTES.SETTINGS);
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    console.log('Edit profile pressed');
  };

  const handleProfilePicture = () => {
    // TODO: Handle profile picture upload
    console.log('Profile picture pressed');
  };

  const renderProfilePicture = () => {
    if (profileData?.profilePictureUrl) {
      return (
        <Image
          source={{ uri: profileData.profilePictureUrl }}
          style={styles.profilePicture}
        />
      );
    }
    
    return (
      <View style={styles.profilePicturePlaceholder}>
        <Ionicons 
          name="person" 
          size={24} 
          color={colors.neutral?.[400] || '#9E9E9E'} 
        />
      </View>
    );
  };

  const renderProfileCompletion = () => (
    <View style={styles.completionContainer}>
      <View style={styles.completionHeader}>
        <Text style={[styles.completionTitle, { color: themeColors.text }]}>
          Profile Completion
        </Text>
        <Text style={[styles.completionPercentage, { color: colors.primary?.[600] || '#0288D1' }]}>
          {profileCompletion}%
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${profileCompletion}%`,
              backgroundColor: colors.primary?.[600] || '#0288D1'
            }
          ]} 
        />
      </View>
      <Text style={[styles.completionText, { color: themeColors.textSecondary }]}>
        {profileCompletion < 100 ? 'Complete your profile to unlock all features' : 'Your profile is complete!'}
      </Text>
    </View>
  );

  const renderStatsGrid = () => (
    <View style={styles.statsContainer}>
      <Text style={[styles.statsTitle, { color: themeColors.text }]}>
        Your Legacy
      </Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary?.[600] || '#0288D1' }]}>
            {stats.stories}
          </Text>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
            Stories
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary?.[600] || '#0288D1' }]}>
            {stats.family}
          </Text>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
            Family
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary?.[600] || '#0288D1' }]}>
            {stats.photos}
          </Text>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
            Photos
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary?.[600] || '#0288D1' }]}>
            {stats.videos}
          </Text>
          <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
            Videos
          </Text>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={[styles.quickActionsTitle, { color: themeColors.text }]}>
        Quick Actions
      </Text>
      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.quickActionItem}>
          <View style={[styles.quickActionIcon, { backgroundColor: colors.primary?.[50] || '#E3F2FD' }]}>
            <Ionicons name="add-circle-outline" size={24} color={colors.primary?.[600] || '#0288D1'} />
          </View>
          <Text style={[styles.quickActionText, { color: themeColors.text }]}>New Story</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem}>
          <View style={[styles.quickActionIcon, { backgroundColor: colors.success?.[50] || '#E8F5E8' }]}>
            <Ionicons name="people-outline" size={24} color={colors.success?.[600] || '#4CAF50'} />
          </View>
          <Text style={[styles.quickActionText, { color: themeColors.text }]}>Add Family</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem}>
          <View style={[styles.quickActionIcon, { backgroundColor: colors.warning?.[50] || '#FFF3E0' }]}>
            <Ionicons name="camera-outline" size={24} color={colors.warning?.[600] || '#FF9800'} />
          </View>
          <Text style={[styles.quickActionText, { color: themeColors.text }]}>Upload Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem}>
          <View style={[styles.quickActionIcon, { backgroundColor: colors.error?.[50] || '#FFEBEE' }]}>
            <Ionicons name="share-outline" size={24} color={colors.error?.[600] || '#F44336'} />
          </View>
          <Text style={[styles.quickActionText, { color: themeColors.text }]}>Share Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View style={styles.activityContainer}>
      <Text style={[styles.activityTitle, { color: themeColors.text }]}>
        Recent Activity
      </Text>
      {recentActivity.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: colors.neutral?.[100] || '#F5F5F5' }]}>
            <Ionicons 
              name={activity.icon as any} 
              size={20} 
              color={colors.neutral?.[600] || '#757575'} 
            />
          </View>
          <View style={styles.activityContent}>
            <Text style={[styles.activityText, { color: themeColors.text }]}>
              {activity.title}
            </Text>
            <Text style={[styles.activityDate, { color: themeColors.textSecondary }]}>
              {activity.date}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  if (!profileData) {
  return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
        <View style={styles.header}>
          <BackButton onPress={handleBack} />
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Profile</Text>
          <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
            <Ionicons 
              name="settings-outline" 
              size={22} 
              color={themeColors.text} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: themeColors.textSecondary }]}>
            Loading profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Profile</Text>
          <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
            <Ionicons 
              name="settings-outline" 
              size={22} 
              color={themeColors.text} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleProfilePicture} style={styles.profilePictureContainer}>
              {renderProfilePicture()}
              <View style={styles.editPictureButton}>
                <Ionicons name="camera" size={12} color={colors.neutral?.[50] || '#FFFFFF'} />
              </View>
            </TouchableOpacity>

              <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: themeColors.text }]}>
                {profileData.firstName} {profileData.lastName}
              </Text>
              <Text style={[styles.profileUsername, { color: colors.primary?.[600] || '#0288D1' }]}>
                @{profileData.username}
                </Text>
            </View>
          </View>

          {profileData.bio && (
            <Text style={[styles.profileBio, { color: themeColors.textSecondary }]}>
              {profileData.bio}
            </Text>
          )}

          <View style={styles.profileDetails}>
            <View style={styles.profileDetailItem}>
              <Ionicons 
                name="location-outline" 
                size={16} 
                color={colors.neutral?.[500] || '#9E9E9E'} 
              />
              <Text style={[styles.profileDetailText, { color: themeColors.textSecondary }]}>
                {profileData.location}
              </Text>
                </View>
            <View style={styles.profileDetailItem}>
              <Ionicons 
                name="calendar-outline" 
                size={16} 
                color={colors.neutral?.[500] || '#9E9E9E'} 
              />
              <Text style={[styles.profileDetailText, { color: themeColors.textSecondary }]}>
                {profileData.age} years old
              </Text>
                </View>
            <View style={styles.profileDetailItem}>
              <Ionicons 
                name="time-outline" 
                size={16} 
                color={colors.neutral?.[500] || '#9E9E9E'} 
              />
              <Text style={[styles.profileDetailText, { color: themeColors.textSecondary }]}>
                Member since {profileData.memberSince}
              </Text>
            </View>
          </View>

          {/* Additional Profile Info */}
          <View style={styles.additionalInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="shield-checkmark-outline" size={16} color={colors.success?.[600] || '#4CAF50'} />
              <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
                Email Verified
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="globe-outline" size={16} color={colors.primary?.[600] || '#0288D1'} />
              <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
                Public Profile
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="star-outline" size={16} color={colors.warning?.[600] || '#FF9800'} />
              <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
                Premium Member
              </Text>
            </View>
          </View>
        </View>

        {/* Profile Completion */}
        {renderProfileCompletion()}

        {/* Stats Section */}
        {renderStatsGrid()}

        {/* Quick Actions */}
        {renderQuickActions()}

        {/* Recent Activity */}
        {renderRecentActivity()}

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <GradientButton
            title="Edit Profile"
            onPress={handleEditProfile}
            style={styles.editButton}
          />
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
  settingsButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    fontSize: typography.sizes.md,
  },
  profileSection: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral?.[100] || '#F5F5F5',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profilePictureContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.neutral?.[100] || '#F5F5F5',
  },
  profilePicturePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.neutral?.[100] || '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary?.[600] || '#0288D1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.neutral?.[50] || '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  profileUsername: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.sm,
  },
  profileBio: {
    fontSize: typography.sizes.sm,
    lineHeight: 20,
    marginBottom: spacing.sm,
    fontStyle: 'italic',
  },
  profileDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  profileDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  profileDetailText: {
    fontSize: typography.sizes.sm,
  },
  statsContainer: {
    padding: spacing.lg,
  },
  statsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statItem: {
    flex: 1,
    minWidth: (width - spacing.lg * 2 - spacing.md * 3) / 4,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 12,
  },
  statNumber: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
  actionContainer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  editButton: {
    marginTop: spacing.sm,
  },
  // Profile Completion Styles
  completionContainer: {
    padding: spacing.lg,
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  completionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  completionPercentage: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.neutral?.[200] || '#E0E0E0',
    borderRadius: 4,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  completionText: {
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  // Quick Actions Styles
  quickActionsContainer: {
    padding: spacing.lg,
  },
  quickActionsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickActionItem: {
    flex: 1,
    minWidth: (width - spacing.lg * 2 - spacing.md * 3) / 4,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
  // Recent Activity Styles
  activityContainer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral?.[200] || '#EEEEEE',
  },
  activityTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  activityDate: {
    fontSize: typography.sizes.sm,
  },
  // Additional Profile Info Styles
  additionalInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral?.[200] || '#EEEEEE',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 16,
  },
  infoText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
});

export default ProfileScreen;