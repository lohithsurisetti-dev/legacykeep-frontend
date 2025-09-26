/**
 * Profile Screen - Clean Modern Design
 * 
 * A beautiful, clean profile screen inspired by modern design principles
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';
import { useAuth } from '../../../app/providers/AuthContext';
import { BackButton, GradientButton } from '../../../shared/components/ui';
import { LinearGradient } from 'expo-linear-gradient';

type Props = MainStackScreenProps<typeof ROUTES.PROFILE>;

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { colors: themeColors } = useTheme();
  const [profileData, setProfileData] = useState<any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(1)).current;
  const headerHeight = useRef(new Animated.Value(88)).current; // Full header height
  const lastScrollY = useRef(0);
  const areButtonsVisible = useRef(true);
  const [stats, setStats] = useState({
    storiesShared: 28,
    familyMembers: 12,
    memoriesSaved: 150,
  });
  const [activeTab, setActiveTab] = useState('timeline');
  const [lifeEvents, setLifeEvents] = useState([
    { 
      id: 1, 
      type: 'birth',
      date: '1990-05-15', 
      title: 'Born in New York', 
      description: 'Welcome to the world! The beginning of an amazing journey.',
      icon: 'baby',
      age: '0 years old'
    },
    { 
      id: 2, 
      type: 'family',
      date: '1995-12-25', 
      title: 'First Family Christmas', 
      description: 'The year I truly understood the magic of family gatherings.',
      icon: 'gift',
      age: '5 years old'
    },
    { 
      id: 3, 
      type: 'memory',
      date: '2000-07-04', 
      title: 'Grandpa\'s Stories', 
      description: 'Started recording Grandpa\'s war stories - the beginning of my legacy journey.',
      icon: 'mic',
      age: '10 years old'
    },
    { 
      id: 4, 
      type: 'family',
      date: '2018-03-20', 
      title: 'Got Married', 
      description: 'Married to Sarah - the best day of my life.',
      icon: 'heart',
      age: '28 years old'
    },
    { 
      id: 5, 
      type: 'legacy',
      date: '2020-12-15', 
      title: 'Started LegacyKeep', 
      description: 'Began preserving our family\'s stories for future generations.',
      icon: 'book',
      age: '30 years old'
    },
  ]);
  const [recentActivity, setRecentActivity] = useState([
    { 
      id: 1, 
      type: 'story', 
      title: 'New story added', 
      description: '"Grandma\'s secret garden in the summer of \'68."', 
      date: '2 days ago',
      icon: 'mic-outline'
    },
    { 
      id: 2, 
      type: 'memory', 
      title: 'Memory uploaded', 
      description: 'A photo from the 1985 family reunion.', 
      date: '5 days ago',
      icon: 'camera-outline'
    },
    { 
      id: 3, 
      type: 'comment', 
      title: 'Aunt Carol commented', 
      description: 'On "Dad\'s first car" story: "I remember that old thing!"', 
      date: '1 week ago',
      icon: 'chatbubble-outline'
    },
  ]);

  useEffect(() => {
    // Mock profile data - replace with actual API call
    setProfileData({
      firstName: user?.firstName || 'John',
      lastName: user?.lastName || 'Appleseed',
      username: user?.username || 'johnappleseed',
      bio: 'Weaving the threads of our past into the fabric of our future.',
      profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    });
  }, [user]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const scrollDirection = offsetY > lastScrollY.current ? 'down' : 'up';
        const scrollDelta = Math.abs(offsetY - lastScrollY.current);
        lastScrollY.current = offsetY;
        
        // Only trigger if scroll delta is significant (prevents jittery behavior)
        if (scrollDelta < 5) return;
        
        const shouldShowButtons = scrollDirection === 'up' || offsetY < 100;
        
        // Prevent unnecessary animations
        if (shouldShowButtons === areButtonsVisible.current) return;
        
        areButtonsVisible.current = shouldShowButtons;
        
        // Animate buttons and header height
        Animated.parallel([
          Animated.timing(buttonsOpacity, {
            toValue: shouldShowButtons ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(headerHeight, {
            toValue: shouldShowButtons ? 88 : 44, // Collapse to just status bar height
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      },
    }
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSettings = () => {
    (navigation as any).navigate(ROUTES.SETTINGS);
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
  };

  const handleProfilePicture = () => {
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
          size={60} 
          color={colors.neutral?.[400] || '#9E9E9E'} 
        />
      </View>
    );
  };

  const renderStats = () => (
    <LinearGradient
      colors={['#14B8A6', '#8B5CF6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.statsGradientBorder}
    >
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.storiesShared}</Text>
          <Text style={styles.statLabel}>Stories Shared</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.familyMembers}</Text>
          <Text style={styles.statLabel}>Family Members</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.memoriesSaved}</Text>
          <Text style={styles.statLabel}>Memories Saved</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderMiniTabs = () => {
    const tabs = [
      { id: 'photos', label: 'Photos', icon: 'images-outline' },
      { id: 'timeline', label: 'Timeline', icon: 'time-outline' },
      { id: 'tagged', label: 'Tagged', icon: 'person-outline' },
      { id: 'stories', label: 'Stories', icon: 'book-outline' },
    ];

     const getTabColor = (index: number) => {
       const colors = ['#14B8A6', '#20A39E', '#3B82F6', '#8B5CF6'];
       return colors[index];
     };

     return (
       <View style={styles.miniTabsContainer}>
         {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.id}
              style={styles.miniTab}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              {activeTab === tab.id ? (
                <View style={styles.activeTabContainer}>
                  <Ionicons
                    name={tab.icon as any}
                    size={20}
                    color={getTabColor(index)}
                  />
                  <View 
                    style={[
                      styles.gradientUnderline,
                      { backgroundColor: getTabColor(index) }
                    ]} 
                  />
                </View>
              ) : (
                <Ionicons
                  name={tab.icon as any}
                  size={20}
                  color={colors.neutral?.[500] || '#9E9E9E'}
                />
              )}
            </TouchableOpacity>
         ))}
       </View>
     );
  };

  const renderLifeTimeline = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        My Legacy Journey
      </Text>
      <View style={styles.timelineContainer}>
        {lifeEvents.map((event, index) => (
          <View key={event.id} style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              <LinearGradient
                colors={['#14B8A6', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.timelineIconGradient}
              >
                <View style={styles.timelineIcon}>
                  <Ionicons 
                    name={event.icon as any} 
                    size={20} 
                    color={themeColors.text} 
                  />
                </View>
              </LinearGradient>
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.timelineHeader}>
                <Text style={[styles.timelineTitle, { color: themeColors.text }]}>
                  {event.title}
                </Text>
                <Text style={[styles.timelineAge, { color: themeColors.textSecondary }]}>
                  {event.age}
                </Text>
              </View>
              <Text style={[styles.timelineDescription, { color: themeColors.textSecondary }]}>
                {event.description}
              </Text>
              <Text style={[styles.timelineDate, { color: themeColors.textSecondary }]}>
                {event.date}
              </Text>
            </View>
            {index < lifeEvents.length - 1 && (
              <View style={styles.timelineConnector} />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        Recent Activity
      </Text>
      <View style={styles.activityContainer}>
        {recentActivity.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <LinearGradient
                colors={['#14B8A6', '#8B5CF6']}
                style={styles.activityIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons 
                  name={activity.icon as any} 
                  size={20} 
                  color="white" 
                />
              </LinearGradient>
                </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: themeColors.text }]}>
                {activity.title}
              </Text>
              <Text style={[styles.activityDescription, { color: themeColors.textSecondary }]}>
                {activity.description}
              </Text>
              <Text style={[styles.activityDate, { color: themeColors.textSecondary }]}>
                {activity.date}
              </Text>
            </View>
          </View>
        ))}
                </View>
                </View>
  );

  if (!profileData) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        {/* Collapsible Header */}
        <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
          {/* Status Bar Spacer - Always Visible */}
          <View style={styles.statusBarSpacer} />
          
          {/* Header Content - Buttons can fade */}
          <Animated.View style={[styles.headerContent, { opacity: buttonsOpacity }]}>
            <BackButton 
              onPress={handleBack} 
              size={20}
              style={styles.compactBackButton}
            />
            
            <TouchableOpacity 
              onPress={handleSettings} 
              style={styles.settingsButton}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={20} color={themeColors.text} />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: themeColors.textSecondary }]}>
            Loading profile...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Collapsible Header */}
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        {/* Status Bar Spacer - Always Visible */}
        <View style={styles.statusBarSpacer} />
        
        {/* Header Content - Buttons can fade */}
        <Animated.View style={[styles.headerContent, { opacity: buttonsOpacity }]}>
          <BackButton 
            onPress={handleBack} 
            size={20}
            style={styles.compactBackButton}
          />
          
          <TouchableOpacity 
            onPress={handleSettings} 
            style={styles.settingsButton}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={20} color={themeColors.text} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
            <View style={styles.profilePictureContainer}>
              <TouchableOpacity onPress={handleProfilePicture}>
                <View style={styles.profilePictureBorder}>
                  {renderProfilePicture()}
                </View>
                <View style={styles.editButtonContainer}>
                          <LinearGradient
                            colors={['#14B8A6', '#8B5CF6']}
                            style={styles.editButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                          >
                            <Ionicons name="camera" size={14} color="white" />
                          </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          <Text style={[styles.profileName, { color: themeColors.text }]}>
            {profileData.firstName} {profileData.lastName}
          </Text>
          <Text style={[styles.profileBio, { color: themeColors.textSecondary }]}>
            "{profileData.bio}"
          </Text>
        </View>

        {/* Stats Section */}
        {renderStats()}

        {/* Mini Tabs */}
        {renderMiniTabs()}

        {/* Life Timeline */}
        {renderLifeTimeline()}

        {/* Recent Activity */}
        {renderRecentActivity()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: colors.background?.primary || '#FFFFFF',
  },
  statusBarSpacer: {
    height: 44, // Status bar height
    backgroundColor: 'transparent',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  compactBackButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  settingsButton: {
    padding: spacing.xs,
    borderRadius: 16,
    backgroundColor: colors.neutral?.[100] || '#F5F5F5',
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
  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingTop: 100, // Space for the collapsible header
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  profilePictureBorder: {
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 4,
    borderColor: colors.neutral?.[300] || '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.neutral?.[100] || '#F5F5F5',
    shadowColor: colors.neutral?.[900] || '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  profilePicturePlaceholder: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.neutral?.[100] || '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  editButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.neutral?.[900] || '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  profileName: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  profileBio: {
    fontSize: typography.sizes.md,
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
  },
  // Stats Section - Compact
  statsGradientBorder: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: 12,
    padding: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 10,
    shadowColor: colors.neutral?.[900] || '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  statNumber: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral?.[900] || '#000000',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral?.[500] || '#9E9E9E',
    fontWeight: typography.weights.medium,
    textAlign: 'center',
    lineHeight: 14,
  },
   // Mini Tabs - Gradient Icon & Underline Design
   miniTabsContainer: {
     flexDirection: 'row',
     marginHorizontal: spacing.lg,
     marginBottom: spacing.lg,
     borderBottomWidth: 1,
     borderBottomColor: colors.neutral?.[200] || '#E0E0E0',
   },
   miniTab: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: spacing.sm,
     paddingHorizontal: spacing.xs,
     position: 'relative',
   },
   activeTabContainer: {
     alignItems: 'center',
     justifyContent: 'center',
   },
   gradientUnderline: {
     position: 'absolute',
     bottom: -spacing.sm - 1,
     left: -spacing.lg - spacing.md,
     right: -spacing.lg - spacing.md,
     height: 3,
     borderRadius: 1.5,
   },
  // Section Styles
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
  // Timeline Styles
  timelineContainer: {
    position: 'relative',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  timelineIconContainer: {
    marginRight: spacing.md,
    zIndex: 2,
  },
  timelineIconGradient: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  timelineIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
  },
  timelineContent: {
    flex: 1,
    paddingTop: spacing.xs,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  timelineTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    flex: 1,
  },
  timelineAge: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.neutral?.[400] || '#BDBDBD',
  },
  timelineDescription: {
    fontSize: typography.sizes.sm,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  timelineDate: {
    fontSize: typography.sizes.xs,
    color: colors.neutral?.[400] || '#BDBDBD',
    fontStyle: 'italic',
  },
  timelineConnector: {
    position: 'absolute',
    left: 24,
    top: 60,
    bottom: -spacing.lg,
    width: 2,
    backgroundColor: colors.neutral?.[200] || '#E5E7EB',
    zIndex: 1,
  },
  // Activity Styles
  activityContainer: {
    gap: spacing.md,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    padding: spacing.md,
    borderRadius: 12,
    shadowColor: colors.neutral?.[900] || '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.neutral?.[100] || '#F5F5F5',
  },
  activityIconContainer: {
    marginRight: spacing.md,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },
  activityDescription: {
    fontSize: typography.sizes.sm,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  activityDate: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
});

export default ProfileScreen;