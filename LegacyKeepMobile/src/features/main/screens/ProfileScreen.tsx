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
  const tabsHeight = useRef(new Animated.Value(60)).current; // Full tabs height
  const headerHeight = useRef(new Animated.Value(88)).current; // Full header height
  const lastScrollY = useRef(0);
  const areButtonsVisible = useRef(true);
  const areTabsVisible = useRef(true);
  const [stats, setStats] = useState({
    storiesShared: 28,
    familyMembers: 12,
    memoriesSaved: 150,
  });
  const [activeTab, setActiveTab] = useState('photos');
  const [lifeEvents, setLifeEvents] = useState([
    { 
      id: 1, 
      type: 'birth',
      date: '1990-05-15', 
      title: 'Born in New York', 
      description: 'Welcome to the world! The beginning of an amazing journey.',
      icon: 'heart',
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
  const [photos, setPhotos] = useState([
    {
      id: 1,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      title: 'Family Reunion 2023',
      date: '2023-12-15',
      likes: 24,
      isMultiple: true,
      mediaCount: 5,
    },
    {
      id: 2,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      title: 'Grandma\'s Birthday',
      date: '2023-11-20',
      likes: 18,
      duration: '2:34',
      isMultiple: false,
    },
    {
      id: 3,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      title: 'Wedding Day',
      date: '2023-10-05',
      likes: 45,
      isMultiple: true,
      mediaCount: 8,
    },
    {
      id: 4,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      title: 'Beach Vacation',
      date: '2023-09-12',
      likes: 32,
      isMultiple: true,
      mediaCount: 3,
    },
    {
      id: 5,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      title: 'Cooking with Mom',
      date: '2023-08-28',
      likes: 21,
      duration: '5:12',
      isMultiple: false,
    },
    {
      id: 6,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      title: 'Graduation Day',
      date: '2023-07-15',
      likes: 38,
      isMultiple: true,
      mediaCount: 4,
    },
    {
      id: 7,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      title: 'Family Dinner',
      date: '2023-06-20',
      likes: 29,
      duration: '3:45',
      isMultiple: false,
    },
    {
      id: 8,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      title: 'Summer Picnic',
      date: '2023-05-10',
      likes: 42,
      isMultiple: true,
      mediaCount: 6,
    },
    {
      id: 9,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      title: 'Birthday Party',
      date: '2023-04-15',
      likes: 35,
      isMultiple: false,
    },
    {
      id: 10,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      title: 'Holiday Memories',
      date: '2023-03-22',
      likes: 27,
      duration: '4:12',
      isMultiple: true,
      mediaCount: 2,
    },
    {
      id: 11,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      title: 'New Year Celebration',
      date: '2023-01-01',
      likes: 51,
      isMultiple: false,
    },
    {
      id: 12,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      title: 'Christmas Eve',
      date: '2022-12-24',
      likes: 48,
      isMultiple: true,
      mediaCount: 7,
    },
    {
      id: 13,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      title: 'Thanksgiving',
      date: '2022-11-24',
      likes: 33,
      duration: '2:58',
      isMultiple: false,
    },
    {
      id: 14,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      title: 'Halloween Fun',
      date: '2022-10-31',
      likes: 39,
      isMultiple: true,
      mediaCount: 3,
    },
    {
      id: 15,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      title: 'Back to School',
      date: '2022-09-01',
      likes: 25,
      isMultiple: false,
    },
    {
      id: 16,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      title: 'Summer Camp',
      date: '2022-08-15',
      likes: 31,
      duration: '3:20',
      isMultiple: true,
      mediaCount: 4,
    },
    {
      id: 17,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      title: 'Beach Day',
      date: '2022-07-22',
      likes: 28,
      isMultiple: false,
    },
    {
      id: 18,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      title: 'Fourth of July',
      date: '2022-07-04',
      likes: 44,
      isMultiple: true,
      mediaCount: 6,
    },
    {
      id: 19,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      title: 'Father\'s Day',
      date: '2022-06-19',
      likes: 37,
      duration: '2:45',
      isMultiple: false,
    },
    {
      id: 20,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      title: 'Memorial Day',
      date: '2022-05-30',
      likes: 22,
      isMultiple: true,
      mediaCount: 3,
    },
    {
      id: 21,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      title: 'Mother\'s Day',
      date: '2022-05-08',
      likes: 52,
      isMultiple: false,
    },
    {
      id: 22,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      title: 'Easter Celebration',
      date: '2022-04-17',
      likes: 41,
      duration: '4:15',
      isMultiple: true,
      mediaCount: 5,
    },
    {
      id: 23,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      title: 'Spring Break',
      date: '2022-03-25',
      likes: 29,
      isMultiple: false,
    },
    {
      id: 24,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      title: 'Valentine\'s Day',
      date: '2022-02-14',
      likes: 36,
      isMultiple: true,
      mediaCount: 2,
    },
    {
      id: 25,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      title: 'Super Bowl Party',
      date: '2022-02-13',
      likes: 33,
      duration: '3:30',
      isMultiple: false,
    },
    {
      id: 26,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      title: 'Winter Wonderland',
      date: '2022-01-20',
      likes: 47,
      isMultiple: true,
      mediaCount: 8,
    },
    {
      id: 27,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      title: 'New Year\'s Eve 2022',
      date: '2022-01-01',
      likes: 58,
      isMultiple: false,
    },
    {
      id: 28,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      title: 'Christmas Morning',
      date: '2021-12-25',
      likes: 63,
      duration: '5:45',
      isMultiple: true,
      mediaCount: 7,
    },
    {
      id: 29,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      title: 'Holiday Baking',
      date: '2021-12-20',
      likes: 34,
      isMultiple: false,
    },
    {
      id: 30,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      title: 'Thanksgiving Feast',
      date: '2021-11-25',
      likes: 49,
      isMultiple: true,
      mediaCount: 4,
    },
  ]);


  useEffect(() => {
    // Mock profile data - replace with actual API call
    setProfileData({
      firstName: user?.firstName || 'Lohith',
      lastName: user?.lastName || 'Surisetti',
      username: user?.username || 'lohithsurisetti',
      bio: 'Weaving the threads of our past into the fabric of our future.',
      profilePictureUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
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
        
        const shouldShowButtons = scrollDirection === 'up' || offsetY < 50;
        const shouldShowTabs = scrollDirection === 'up' || offsetY < 200;
        
        // Prevent unnecessary animations
        if (shouldShowButtons === areButtonsVisible.current && shouldShowTabs === areTabsVisible.current) return;
        
        areButtonsVisible.current = shouldShowButtons;
        areTabsVisible.current = shouldShowTabs;
        
        // Animate buttons, tabs, and header height together
        Animated.parallel([
          Animated.timing(buttonsOpacity, {
            toValue: shouldShowButtons ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(tabsHeight, {
            toValue: shouldShowTabs ? 60 : 0,
            duration: 200,
            useNativeDriver: false,
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

  const renderProfilePicture = () => {
    if (profileData?.profilePictureUrl) {
      return (
        <View style={styles.profilePictureBorder}>
          <Image
            source={{ uri: profileData.profilePictureUrl }}
            style={styles.profilePicture}
          />
          {renderSideDecorations()}
        </View>
      );
    }
    
    return (
      <View style={styles.profilePictureBorder}>
        <View style={styles.profilePicturePlaceholder}>
          <Ionicons 
            name="person" 
            size={60} 
            color={colors.neutral?.[400] || '#9E9E9E'} 
          />
        </View>
        {renderSideDecorations()}
      </View>
    );
  };

  const renderSideDecorations = () => (
    <>
      {/* Left side decoration */}
      <View style={styles.leftDecoration}>
        <View style={styles.decorationCircle}>
          <Ionicons name="heart" size={16} color="#FF6B6B" />
        </View>
        <View style={[styles.decorationCircle, { marginTop: spacing.sm }]}>
          <Ionicons name="star" size={14} color="#FFD93D" />
        </View>
      </View>
      
      {/* Right side decoration */}
      <View style={styles.rightDecoration}>
        <View style={styles.decorationCircle}>
          <Ionicons name="camera" size={16} color="#4ECDC4" />
        </View>
        <View style={[styles.decorationCircle, { marginTop: spacing.sm }]}>
          <Ionicons name="book" size={14} color="#96CEB4" />
        </View>
      </View>
    </>
  );

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
       <Animated.View style={[styles.miniTabsContainer, { height: tabsHeight, overflow: 'hidden' }]}>
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
       </Animated.View>
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

  const renderPhotos = () => (
    <View style={styles.photosSection}>
      <View style={styles.photosGrid}>
        {photos.map((photo) => (
          <TouchableOpacity key={photo.id} style={styles.photoCard} activeOpacity={0.8}>
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo.url }} style={styles.photoImage} />
              {photo.type === 'video' && (
                <View style={[styles.videoOverlay, photo.isMultiple && styles.videoOverlayWithMultiple]}>
                  <Ionicons name="play-circle" size={24} color="white" />
                </View>
              )}
              {photo.isMultiple && (
                <View style={styles.multipleMediaIndicator}>
                  <Ionicons name="layers" size={16} color="white" />
                  <Text style={styles.mediaCount}>{photo.mediaCount}</Text>
                </View>
              )}
            </View>
              </TouchableOpacity>
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
              {renderProfilePicture()}
                </View>
          <Text style={[styles.profileName, { color: themeColors.text }]}>
            {profileData.firstName} {profileData.lastName}
          </Text>
          <Text style={[styles.profileBio, { color: themeColors.textSecondary }]}>
            "{profileData.bio}"
          </Text>
          
          {/* Edit Profile Button */}
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={handleEditProfile}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#14B8A6', '#8B5CF6']}
              style={styles.editProfileGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="create-outline" size={16} color="white" />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>

        {/* Stats Section */}
        {renderStats()}

        {/* Mini Tabs */}
        {renderMiniTabs()}

        {/* Tab Content */}
        {activeTab === 'photos' && renderPhotos()}
        {activeTab === 'timeline' && renderLifeTimeline()}
        {activeTab === 'tagged' && (
          <View style={styles.photosSection}>
            <View style={styles.emptyState}>
              <Ionicons name="person-outline" size={48} color={colors.neutral?.[400] || '#9E9E9E'} />
              <Text style={[styles.emptyStateText, { color: themeColors.textSecondary }]}>
                No tagged content yet
              </Text>
                </View>
            </View>
        )}
        {activeTab === 'stories' && (
          <View style={styles.photosSection}>
            <View style={styles.emptyState}>
              <Ionicons name="book-outline" size={48} color={colors.neutral?.[400] || '#9E9E9E'} />
              <Text style={[styles.emptyStateText, { color: themeColors.textSecondary }]}>
                No stories yet
              </Text>
          </View>
      </View>
        )}

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
    marginBottom: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePictureBorder: {
    width: 136,
    height: 136,
    borderRadius: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.neutral?.[100] || '#F5F5F5',
    borderWidth: 4,
    borderColor: colors.neutral?.[300] || '#E0E0E0',
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
    borderWidth: 4,
    borderColor: colors.neutral?.[300] || '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
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
  // Side Decorations
  leftDecoration: {
    position: 'absolute',
    left: -60,
    top: '50%',
    transform: [{ translateY: -30 }],
    alignItems: 'center',
  },
  rightDecoration: {
    position: 'absolute',
    right: -60,
    top: '50%',
    transform: [{ translateY: -30 }],
    alignItems: 'center',
  },
  decorationCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
    marginBottom: spacing.sm,
  },
  editProfileButton: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  editProfileGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editProfileText: {
    color: 'white',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.xs,
  },
  // Stats Section - Compact
  statsGradientBorder: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
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
     marginBottom: 0,
     backgroundColor: colors.background?.primary || '#FFFFFF',
     marginTop: -spacing.xs,
   },
   miniTab: {
    flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: spacing.md,
     paddingHorizontal: spacing.xs,
     position: 'relative',
   },
   activeTabContainer: {
    alignItems: 'center',
     justifyContent: 'center',
   },
   gradientUnderline: {
     position: 'absolute',
     bottom: -10,
     left: -spacing.lg * 2,
     right: -spacing.lg * 2,
      height: 2,
     borderRadius: 1,
   },
  // Section Styles
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  // Photos Section - Full width
  photosSection: {
    flex: 1,
    backgroundColor: colors.background?.primary || '#FFFFFF',
    marginTop: -8,
  },
  // Photos Grid
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 1, // Minimal padding for grid lines
  },
  photoCard: {
    width: (width - 2) / 3, // Full width minus 2px for grid lines
    marginBottom: 1,
  },
  photoContainer: {
    position: 'relative',
    backgroundColor: colors.neutral?.[100] || '#F5F5F5',
    aspectRatio: 1, // Square aspect ratio
  },
  photoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOverlay: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  videoOverlayWithMultiple: {
    right: spacing.sm + 60, // Move left when multiple media indicator is present
  },
  multipleMediaIndicator: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 12,
  },
  mediaCount: {
    color: 'white',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    marginLeft: 2,
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  emptyStateText: {
    fontSize: typography.sizes.md,
    marginTop: spacing.md,
    textAlign: 'center',
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
});

export default ProfileScreen;