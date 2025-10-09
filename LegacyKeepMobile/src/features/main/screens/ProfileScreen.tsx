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
  Vibration,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing, gradients } from '../../../shared/constants';
import { gradientConfigs } from '../../../shared/constants/designSystem';
import { useTheme } from '../../../app/providers/ThemeContext';
import { useAuth } from '../../../app/providers/AuthContext';
import { BackButton, GradientButton } from '../../../shared/components/ui';
import { LinearGradient } from 'expo-linear-gradient';

type Props = MainStackScreenProps<typeof ROUTES.PROFILE>;

// Type definitions for better type safety
interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  profilePictureUrl: string;
}

interface Stats {
  storiesShared: number;
  familyMembers: number;
  memoriesSaved: number;
}

interface BadgeContent {
  title: string;
  icon: string;
  content: string | string[];
}

type BadgeType = 'birthday' | 'bucketlist' | 'zodiac' | 'hobby';

interface LifeEvent {
  id: number;
  type: string;
  date: string;
  title: string;
  description: string;
  icon: string;
  age: string;
}

interface Photo {
  id: number;
  url: string;
  type: 'photo' | 'video';
  isMultiple: boolean;
  mediaCount?: number;
  title: string;
  date: string;
  likes: number;
  duration?: string;
}

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { colors: themeColors } = useTheme();
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(1)).current;
  const tabsHeight = useRef(new Animated.Value(60)).current; // Full tabs height
  const headerHeight = useRef(new Animated.Value(88)).current; // Full header height
  const lastScrollY = useRef(0);
  const areButtonsVisible = useRef(true);
  const areTabsVisible = useRef(true);
  const [stats, setStats] = useState<Stats>({
    storiesShared: 28,
    familyMembers: 12,
    memoriesSaved: 150,
  });
  const [activeTab, setActiveTab] = useState('photos');
  const [expandedBadge, setExpandedBadge] = useState<BadgeType | null>(null);
  const popupOpacity = useRef(new Animated.Value(0)).current;
  const popupScale = useRef(new Animated.Value(0.8)).current;
  
  // Birthday celebration animation
  const [isBirthday, setIsBirthday] = useState(false);
  const confettiAnimations = useRef(Array.from({ length: 15 }, () => ({
    translateY: new Animated.Value(-100),
    translateX: new Animated.Value(0),
    rotate: new Animated.Value(0),
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    type: 'strip', // 'strip' or 'ball'
  }))).current;
  const ballAnimations = useRef(Array.from({ length: 10 }, () => ({
    translateY: new Animated.Value(-100),
    translateX: new Animated.Value(0),
    rotate: new Animated.Value(0),
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    type: 'ball',
  }))).current;
  const birthdayTextScale = useRef(new Animated.Value(0)).current;
  const birthdayTextOpacity = useRef(new Animated.Value(0)).current;
  const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([
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
  const [photos, setPhotos] = useState<Photo[]>([
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
          profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        });
        
    // Check if today is birthday (Today's date for testing)
    const today = new Date();
    const isTodayBirthday = today.getMonth() === today.getMonth() && today.getDate() === today.getDate(); // Today's date for testing
    setIsBirthday(isTodayBirthday);
    
    if (isTodayBirthday) {
      // Start birthday celebration animation after a short delay
      setTimeout(() => {
        startBirthdayAnimation();
      }, 1000);
    }
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

  const startBirthdayAnimation = () => {
    // Animate confetti strips
    const confettiAnimationPromises = confettiAnimations.map((confetti, index) => {
      const randomX = (Math.random() - 0.5) * 400; // Random horizontal spread
      const randomDelay = Math.random() * 1000; // Staggered start times
      
      return Animated.parallel([
        Animated.timing(confetti.translateY, {
          toValue: 800, // Fall to bottom of screen
          duration: 3000 + Math.random() * 2000,
          delay: randomDelay,
          useNativeDriver: true,
        }),
        Animated.timing(confetti.translateX, {
          toValue: randomX,
          duration: 3000 + Math.random() * 2000,
          delay: randomDelay,
          useNativeDriver: true,
        }),
        Animated.timing(confetti.rotate, {
          toValue: Math.random() * 720, // Random rotation
          duration: 3000 + Math.random() * 2000,
          delay: randomDelay,
          useNativeDriver: true,
        }),
        Animated.timing(confetti.opacity, {
          toValue: 0,
          duration: 3000 + Math.random() * 2000,
          delay: randomDelay + 2000,
          useNativeDriver: true,
        }),
      ]);
    });

    // Animate balls
    const ballAnimationPromises = ballAnimations.map((ball, index) => {
      const randomX = (Math.random() - 0.5) * 400; // Random horizontal spread
      const randomDelay = Math.random() * 1000; // Staggered start times
      
      return Animated.parallel([
        Animated.timing(ball.translateY, {
          toValue: 800, // Fall to bottom of screen
          duration: 3000 + Math.random() * 2000,
          delay: randomDelay,
          useNativeDriver: true,
        }),
        Animated.timing(ball.translateX, {
          toValue: randomX,
          duration: 3000 + Math.random() * 2000,
          delay: randomDelay,
          useNativeDriver: true,
        }),
        Animated.timing(ball.rotate, {
          toValue: Math.random() * 720, // Random rotation
          duration: 3000 + Math.random() * 2000,
          delay: randomDelay,
          useNativeDriver: true,
        }),
        Animated.timing(ball.opacity, {
          toValue: 0,
          duration: 3000 + Math.random() * 2000,
          delay: randomDelay + 2000,
          useNativeDriver: true,
        }),
      ]);
    });

    // Start all animations
    Animated.parallel([...confettiAnimationPromises, ...ballAnimationPromises]).start();
  };

  const handleBadgePress = (badgeType: BadgeType) => {
    console.log(`${badgeType} badge pressed`);
    
    if (expandedBadge === badgeType) {
      // Close popup
      Animated.parallel([
        Animated.timing(popupOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(popupScale, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setExpandedBadge(null);
      });
    } else {
      // Open popup
      setExpandedBadge(badgeType);
      Animated.parallel([
        Animated.timing(popupOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(popupScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const getBadgeContent = (badgeType: BadgeType): BadgeContent => {
    switch (badgeType) {
      case 'birthday':
        return { title: 'Birthday', icon: 'gift', content: 'March 15th' };
      case 'bucketlist':
        return { title: 'Bucket List', icon: 'cart', content: ['Gaming Setup', 'New Camera', 'Concert Tickets'] };
      case 'zodiac':
        return { title: 'Zodiac', icon: 'star', content: 'Pisces ♓' };
      case 'hobby':
        return { title: 'Hobby', icon: 'musical-notes', content: 'Music & Photography' };
      default:
        return { title: '', icon: '', content: '' };
    }
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
            color={colors.neutral[400]} 
          />
        </View>
        {renderSideDecorations()}
      </View>
    );
  };

  const renderBirthdayCelebration = () => (
    <View style={styles.birthdayOverlay}>
      {/* Confetti Strips */}
      {confettiAnimations.map((confetti, index) => (
        <Animated.View
          key={`strip-${index}`}
          style={[
            styles.confetti,
            {
              backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'][index % 6],
              transform: [
                { translateY: confetti.translateY },
                { translateX: confetti.translateX },
                { rotate: confetti.rotate.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }) },
                { scale: confetti.scale },
              ],
              opacity: confetti.opacity,
            },
          ]}
        />
      ))}
      
      {/* Confetti Balls */}
      {ballAnimations.map((ball, index) => (
        <Animated.View
          key={`ball-${index}`}
          style={[
            styles.confettiBall,
            {
              backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'][index % 6],
              transform: [
                { translateY: ball.translateY },
                { translateX: ball.translateX },
                { rotate: ball.rotate.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }) },
                { scale: ball.scale },
              ],
              opacity: ball.opacity,
            },
          ]}
        />
      ))}
              </View>
  );

  const renderCenteredPopup = () => {
    if (!expandedBadge) return null;

    const badgeContent = getBadgeContent(expandedBadge);
  const getPopupColor = (badgeType: BadgeType): string => {
    switch (badgeType) {
      case 'birthday': return colors.badge.birthday;
      case 'bucketlist': return colors.badge.bucketlist;
      case 'zodiac': return colors.badge.zodiac;
      case 'hobby': return colors.badge.hobby;
      default: return colors.badge.default;
    }
  };

  return (
      <Animated.View 
        style={[
          styles.popupOverlay,
          {
            opacity: popupOpacity,
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.popupOverlayTouchable}
          activeOpacity={1}
          onPress={() => handleBadgePress(expandedBadge)}
        >
          <BlurView intensity={15} tint="light" style={styles.blurBackground} />
        </TouchableOpacity>
        
        <Animated.View 
          style={[
            styles.popupContainer, 
            { 
              // Use neutral grayscale background instead of badge color
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              transform: [{ scale: popupScale }],
            }
          ]}
        >
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>{badgeContent.title}</Text>
            
            {Array.isArray(badgeContent.content) ? (
              <View style={styles.popupList}>
                {badgeContent.content.map((item, index) => (
                  <View key={index} style={styles.popupListItemContainer}>
                    <View style={[styles.popupNumber, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                      <Text style={styles.popupNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.popupListItem}>
                      {item}
                </Text>
                </View>
                ))}
              </View>
            ) : (
              <Text style={styles.popupText}>{badgeContent.content}</Text>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  const renderSideDecorations = () => (
    <>
      {/* Left side decorations - positioned along profile picture curve */}
      <TouchableOpacity 
        style={styles.leftDecorationTop}
        onPress={() => handleBadgePress('birthday')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name="gift" 
          size={24} 
          color={colors.neutral[600]} // colors.badge.birthday - commented for neutral look
          style={[
            styles.iconShadow,
            expandedBadge === 'birthday' && styles.expandedBadge
          ]}
        />
              </TouchableOpacity>
              
      <TouchableOpacity 
        style={styles.leftDecorationBottom}
        onPress={() => handleBadgePress('bucketlist')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name="cart" 
          size={24} 
          color={colors.neutral[600]} // colors.badge.bucketlist - commented for neutral look
          style={[
            styles.iconShadow,
            expandedBadge === 'bucketlist' && styles.expandedBadge
          ]}
        />
              </TouchableOpacity>
              
      {/* Right side decorations - positioned along profile picture curve */}
      <TouchableOpacity 
        style={styles.rightDecorationTop}
        onPress={() => handleBadgePress('zodiac')}
        activeOpacity={0.7}
      >
            <Ionicons 
          name="star" 
          size={24} 
          color={colors.neutral[600]} // colors.badge.zodiac - commented for neutral look
          style={[
            styles.iconShadow,
            expandedBadge === 'zodiac' && styles.expandedBadge
          ]}
            />
          </TouchableOpacity>
              
      <TouchableOpacity 
        style={styles.rightDecorationBottom}
        onPress={() => handleBadgePress('hobby')}
        activeOpacity={0.7}
      >
        <Ionicons 
          name="musical-notes" 
          size={24} 
          color={colors.neutral[600]} // colors.badge.hobby - commented for neutral look
          style={[
            styles.iconShadow,
            expandedBadge === 'hobby' && styles.expandedBadge
          ]}
        />
              </TouchableOpacity>
    </>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.storiesShared}</Text>
        <Text style={styles.statLabel}>Stories</Text>
            </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.familyMembers}</Text>
        <Text style={styles.statLabel}>Family</Text>
          </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.memoriesSaved}</Text>
        <Text style={styles.statLabel}>Memories</Text>
                </View>
    </View>
  );

  const renderMiniTabs = () => {
    const tabs = [
      { id: 'photos', label: 'Photos', icon: 'images-outline' },
      { id: 'inspirations', label: 'Inspirations', icon: 'heart-outline' },
      { id: 'tagged', label: 'Tagged', icon: 'person-outline' },
    ];

     const getTabColor = (index: number) => {
       const gradientColors = gradients.stats;
       return gradientColors[index];
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
                  color={colors.neutral[500]}
                />
              )}
              </TouchableOpacity>
         ))}
       </Animated.View>
     );
  };

  // Inspirations data - role models, loved ones, people who inspire
  const inspirations = [
    {
      id: 1,
      name: 'Mahatma Gandhi',
      role: 'Role Model',
      quote: 'Be the change you wish to see in the world',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop',
      impact: 'Taught me the power of non-violence and truth',
      category: 'Historical Figure',
      resonanceCount: 127,
      sharedWith: [
        { name: 'Priya', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
        { name: 'John', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      ]
    },
    {
      id: 2,
      name: 'Mom',
      role: 'First Teacher',
      quote: 'Family is everything, never forget your roots',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop',
      impact: 'Showed me unconditional love and sacrifice',
      category: 'Family',
      resonanceCount: 245,
      sharedWith: [
        { name: 'Emma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
        { name: 'Michael', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
      ]
    },
    {
      id: 3,
      name: 'APJ Abdul Kalam',
      role: 'Inspiration',
      quote: 'Dream is not what you see in sleep, it is the thing which doesn\'t let you sleep',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
      impact: 'Inspired my passion for science and innovation',
      category: 'Mentor',
      resonanceCount: 189,
      sharedWith: [
        { name: 'David', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
        { name: 'Rajesh', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100' },
        { name: 'Amit', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
        { name: '+5', avatar: '' },
      ]
    },
    {
      id: 4,
      name: 'Grandpa',
      role: 'Wisdom Keeper',
      quote: 'Hard work never betrays, but dreams without action do',
      image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=600&h=800&fit=crop',
      impact: 'Taught me perseverance and family values',
      category: 'Family',
      resonanceCount: 312,
      sharedWith: [
        { name: 'Mom', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
      ]
    },
    {
      id: 5,
      name: 'Nelson Mandela',
      role: 'Freedom Fighter',
      quote: 'Education is the most powerful weapon to change the world',
      image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&h=800&fit=crop',
      impact: 'Showed me the meaning of forgiveness and resilience',
      category: 'Historical Figure',
      resonanceCount: 201,
      sharedWith: [
        { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'Emma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      ]
    },
  ];

  const [currentInspiration, setCurrentInspiration] = useState(0);
  const [resonatedInspirations, setResonatedInspirations] = useState<Set<number>>(new Set());
  const inspirationScrollX = useRef(new Animated.Value(0)).current;

  const handleResonance = (inspirationId: number) => {
    Vibration.vibrate(30);
    setResonatedInspirations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(inspirationId)) {
        newSet.delete(inspirationId);
      } else {
        newSet.add(inspirationId);
      }
      return newSet;
    });
  };

  const renderInspirations = () => {
    const cardWidth = width - 100;
    const cardSpacing = 16;

    return (
      <View style={styles.inspirationsContainer}>
        {/* Section Header */}
        <View style={styles.inspirationsHeader}>
          <Text style={styles.inspirationsTitle}>My Inspirations</Text>
        </View>

        {/* Premium Carousel */}
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + cardSpacing}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: inspirationScrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / (cardWidth + cardSpacing));
            setCurrentInspiration(index);
          }}
        >
          {inspirations.map((person, index) => {
            const inputRange = [
              (index - 1) * (cardWidth + cardSpacing),
              index * (cardWidth + cardSpacing),
              (index + 1) * (cardWidth + cardSpacing),
            ];

            const scale = inspirationScrollX.interpolate({
              inputRange,
              outputRange: [0.85, 1, 0.85],
              extrapolate: 'clamp',
            });

            const opacity = inspirationScrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });

            const rotateY = inspirationScrollX.interpolate({
              inputRange,
              outputRange: ['20deg', '0deg', '-20deg'],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={person.id}
                style={[
                  styles.inspirationCard,
                  {
                    width: cardWidth,
                    transform: [
                      { perspective: 1000 },
                      { scale },
                      { rotateY },
                    ],
                    opacity,
                  },
                ]}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.98)', 'rgba(249, 250, 251, 0.95)']}
                  style={styles.inspirationGradient}
                >
                  {/* Image with Spotlight Effect */}
                  <View style={styles.inspirationImageContainer}>
                    <Image
                      source={{ uri: person.image }}
                      style={styles.inspirationImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0, 0, 0, 0.85)']}
                      style={styles.imageOverlay}
                    />
                    {/* Category Badge */}
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{person.category}</Text>
                </View>
                    
                    {/* Resonance Button - Overlay on Image */}
                    <TouchableOpacity
                      style={styles.resonanceButtonOverlay}
                      onPress={() => handleResonance(person.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={resonatedInspirations.has(person.id) ? "sparkles" : "sparkles-outline"}
                        size={20}
                        color={resonatedInspirations.has(person.id) ? "#F59E0B" : "#FFFFFF"}
                      />
                      <Text style={[
                        styles.resonanceCountOverlay,
                        resonatedInspirations.has(person.id) && styles.resonanceCountOverlayActive
                      ]}>
                        {person.resonanceCount + (resonatedInspirations.has(person.id) ? 1 : 0)}
          </Text>
                    </TouchableOpacity>
          </View>

                  {/* Content */}
                  <View style={styles.inspirationContent}>
                    <Text style={styles.inspirationName}>{person.name}</Text>
                    <Text style={styles.inspirationRole}>{person.role}</Text>

                    {/* Impact */}
                    <Text style={styles.impactText}>{person.impact}</Text>
                </View>
                </LinearGradient>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>

        {/* Pagination Dots */}
        <View style={styles.paginationDots}>
          {inspirations.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentInspiration === index && styles.activeDot,
              ]}
            />
          ))}
      </View>
    </View>
  );
  };


  const renderPhotos = () => (
    <View style={styles.photosSection}>
      <View style={styles.photosGrid}>
        {photos.map((photo) => (
          <TouchableOpacity key={photo.id} style={styles.photoCard} activeOpacity={0.8}>
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo.url }} style={styles.photoImage} />
              {photo.type === 'video' && !photo.isMultiple && (
                <View style={styles.videoOverlay}>
                  <Ionicons name="play-circle" size={16} color="white" />
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
            <View style={styles.editProfileContent}>
              <Ionicons name="create-outline" size={16} color={colors.neutral[600]} />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </View>
              </TouchableOpacity>
          </View>

        {/* Stats Section */}
        {renderStats()}

        {/* Mini Tabs */}
        {renderMiniTabs()}

        {/* Tab Content */}
        {activeTab === 'photos' && renderPhotos()}
        {activeTab === 'inspirations' && renderInspirations()}
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

        </ScrollView>
        
        {/* Centered Popup */}
        {renderCenteredPopup()}
        
        {/* Birthday Celebration */}
        {isBirthday && renderBirthdayCelebration()}
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
    backgroundColor: colors.background.primary,
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
    backgroundColor: colors.neutral[100],
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
    backgroundColor: colors.neutral[100],
    borderWidth: 4,
    borderColor: colors.neutral[300],
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  profilePicturePlaceholder: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.neutral[100],
    borderWidth: 4,
    borderColor: colors.neutral[300],
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
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  // Side Decorations
  leftDecorationTop: {
    position: 'absolute',
    left: -35, // Closer to profile picture
    top: 48, // 35% from profile picture top (136 * 0.35 = 48)
    alignItems: 'center',
  },
  leftDecorationBottom: {
    position: 'absolute',
    left: -25, // Much closer to profile picture for curve
    bottom: 10, // Lower position for better curve following
    alignItems: 'center',
  },
  rightDecorationTop: {
    position: 'absolute',
    right: -35, // Closer to profile picture
    top: 48, // 35% from profile picture top (136 * 0.35 = 48)
    alignItems: 'center',
  },
  rightDecorationBottom: {
    position: 'absolute',
    right: -25, // Much closer to profile picture for curve
    bottom: 10, // Lower position for better curve following
    alignItems: 'center',
  },
  decorationCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  iconShadow: {
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  expandedBadge: {
    transform: [{ scale: 1.2 }],
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  pillBadge: {
    position: 'absolute',
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    top: -2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    minHeight: 24,
  },
  leftBadgeContent: {
    right: 30, // Adjusted for closer icon position
  },
  rightBadgeContent: {
    left: 30, // Adjusted for closer icon position
  },
  pillText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: 'white',
    textAlign: 'center',
    flexShrink: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
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
    marginBottom: -spacing.sm,
  },
  editProfileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  editProfileText: {
    color: colors.neutral[600],
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.xs,
  },
  // Stats Section - Minimal No Card
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: spacing.lg,
    marginTop: 0,
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  statNumber: {
    fontSize: typography.sizes['2xl'] * 0.9,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    fontWeight: typography.weights.medium,
    textAlign: 'center',
    lineHeight: 14,
  },
   // Mini Tabs - Gradient Icon & Underline Design
   miniTabsContainer: {
    flexDirection: 'row',
     marginBottom: 0,
     backgroundColor: colors.background.primary,
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
    backgroundColor: colors.background.primary,
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
    backgroundColor: colors.neutral[100],
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
   // Legacy Journey Styles
   legacyJourneyContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
   journeyOverview: {
     paddingHorizontal: spacing.lg,
     marginBottom: spacing.lg,
   },
   overviewCard: {
     backgroundColor: colors.neutral[50],
     borderRadius: 16,
     padding: spacing.lg,
     shadowColor: colors.neutral[900],
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 8,
     elevation: 3,
   },
   overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
     marginBottom: spacing.sm,
   },
   overviewTitle: {
     fontSize: typography.sizes.xl,
     fontWeight: typography.weights.bold,
     marginLeft: spacing.sm,
   },
   overviewSubtitle: {
     fontSize: typography.sizes.sm,
     lineHeight: 20,
   },
   journeyStatsGrid: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     paddingHorizontal: spacing.lg,
     marginBottom: spacing.xl,
   },
   statCard: {
     backgroundColor: colors.neutral[50],
     borderRadius: 12,
     padding: spacing.md,
     alignItems: 'center',
    flex: 1,
     marginHorizontal: spacing.xs,
     shadowColor: colors.neutral[900],
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.05,
     shadowRadius: 4,
     elevation: 2,
   },
   journeyStatNumber: {
     fontSize: typography.sizes['2xl'],
     fontWeight: typography.weights.bold,
     marginBottom: spacing.xs,
   },
   journeyStatLabel: {
     fontSize: typography.sizes.xs,
     fontWeight: typography.weights.medium,
     textAlign: 'center',
   },
   chaptersContainer: {
    paddingHorizontal: spacing.lg,
     marginBottom: spacing.xl,
  },
   chaptersTitle: {
     fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
     marginBottom: spacing.lg,
     textAlign: 'center',
  },
   chapterCard: {
     backgroundColor: colors.neutral[50],
    borderRadius: 16,
    padding: spacing.lg,
     marginBottom: spacing.lg,
     shadowColor: colors.neutral[900],
     shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
   chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
   chapterIcon: {
     width: 40,
     height: 40,
     borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
     marginRight: spacing.md,
   },
   chapterInfo: {
    flex: 1,
  },
   chapterTitle: {
     fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
   chapterPeriod: {
    fontSize: typography.sizes.sm,
     fontWeight: typography.weights.medium,
   },
   chapterBadge: {
     paddingHorizontal: spacing.sm,
     paddingVertical: spacing.xs,
     borderRadius: 12,
   },
   chapterBadgeText: {
     fontSize: typography.sizes.xs,
     fontWeight: typography.weights.semibold,
   },
   chapterDescription: {
    fontSize: typography.sizes.sm,
     lineHeight: 20,
     marginBottom: spacing.md,
   },
   chapterHighlights: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     gap: spacing.sm,
   },
   highlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
     backgroundColor: colors.neutral[100],
    paddingHorizontal: spacing.sm,
     paddingVertical: spacing.xs,
     borderRadius: 16,
   },
   highlightText: {
     fontSize: typography.sizes.xs,
     fontWeight: typography.weights.medium,
     marginLeft: spacing.xs,
   },
   impactSection: {
     paddingHorizontal: spacing.lg,
     marginBottom: spacing.xl,
   },
   impactTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
     marginBottom: spacing.lg,
     textAlign: 'center',
   },
   impactGrid: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
   },
   impactCard: {
     width: '48%',
     backgroundColor: colors.neutral[50],
     borderRadius: 12,
     padding: spacing.lg,
     alignItems: 'center',
     marginBottom: spacing.md,
     shadowColor: colors.neutral[900],
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 8,
     elevation: 3,
   },
   impactIcon: {
     width: 48,
     height: 48,
     borderRadius: 24,
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: spacing.sm,
   },
   impactNumber: {
     fontSize: typography.sizes.xl,
     fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
   impactLabel: {
    fontSize: typography.sizes.sm,
     fontWeight: typography.weights.medium,
     textAlign: 'center',
   },
  // Popup Styles - Premium with Animations
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  popupOverlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popupContainer: {
    borderRadius: 16,
    padding: spacing.lg,
    margin: spacing.lg,
    minWidth: 260,
    maxWidth: 300,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  popupContent: {
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  popupText: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    lineHeight: 32,
  },
  popupList: {
    width: '100%',
    alignItems: 'flex-start',
  },
  popupListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    width: '100%',
  },
  popupNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  popupNumberText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: 'white',
  },
  popupListItem: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: 'rgba(255, 255, 255, 1)',
    lineHeight: 28,
    flex: 1,
  },
  // Birthday Celebration Styles
  birthdayOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3000,
    pointerEvents: 'none',
  },
  confetti: {
    position: 'absolute',
    width: 3,
    height: 12,
    borderRadius: 1,
    top: -50,
    left: '50%',
  },
  confettiBall: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: -50,
    left: '50%',
  },
  birthdayTextContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  birthdayText: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary[600],
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  birthdaySubtext: {
    fontSize: typography.sizes.lg,
    color: colors.neutral[600],
    textAlign: 'center',
    fontWeight: typography.weights.medium,
  },

  // Inspirations Carousel Styles
  inspirationsContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  inspirationsHeader: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  inspirationsTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  inspirationsSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  carouselContent: {
    paddingHorizontal: 40,
    gap: 20,
  },
  inspirationCard: {
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F0F2F5',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#F59E0B',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 14,
  },
  inspirationGradient: {
    flex: 1,
    borderRadius: 24,
  },
  inspirationImageContainer: {
    height: 280,
    position: 'relative',
  },
  inspirationImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(245, 158, 11, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inspirationContent: {
    padding: spacing.md,
  },
  inspirationName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: 2,
  },
  inspirationRole: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F59E0B',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quoteContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  quoteIcon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.text.secondary,
    lineHeight: 22,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  impactText: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  resonanceButtonOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    gap: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resonanceCountOverlay: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resonanceCountOverlayActive: {
    color: '#F59E0B',
  },
  sharedLoveContainer: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.15)',
  },
  sharedAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sharedAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#F3F4F6',
  },
  moreCount: {
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sharedLoveText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },
});

export default ProfileScreen;