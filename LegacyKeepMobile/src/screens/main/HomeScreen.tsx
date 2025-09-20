/**
 * Home Screen
 * 
 * Main dashboard screen for authenticated users
 */

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Animated, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, gradients } from '../../constants';
import { mainTexts } from '../../constants/texts';
import { HomeHeader, GradientText, QuickInsightsBar } from '../../components/ui';
import type { InsightItem } from '../../components/ui/QuickInsightsBar';
import { useAuth } from '../../contexts/AuthContext';

const HomeScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();

  const handleProfilePress = () => {
    // TODO: Navigate to profile screen
    console.log('Profile pressed');
  };

  const handleSendMessage = (insight: InsightItem) => {
    // TODO: Navigate to chat with person
    console.log('Send message for:', insight);
  };

  const handleCreateStory = (insight: InsightItem) => {
    // TODO: Navigate to story creation with context
    console.log('Create story for:', insight);
  };

  const handleViewDetails = (insight: InsightItem) => {
    // TODO: Navigate to event/person details
    console.log('View details for:', insight);
  };

  // Dynamic content based on user data
  const userName = user?.firstName || 'User';
  const familyName = 'The Miller Family'; // TODO: Get from user's family data
  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : 'LS';

  // Sample insights data - TODO: Replace with real API data
  const sampleInsights: InsightItem[] = [
    {
      type: 'birthday',
      id: '1',
      name: 'Sarah',
      date: '2024-09-23',
      daysUntil: 3,
      relationship: 'Your daughter',
    },
    {
      type: 'anniversary',
      id: '2',
      name: 'Mom',
      partner: 'Dad',
      date: '2024-09-25',
      daysUntil: 5,
      years: 35,
    },
    {
      type: 'event',
      id: '3',
      event: 'Family Reunion',
      date: '2024-10-01',
      daysUntil: 11,
      location: 'Grandma\'s House',
      eventType: 'family-gathering',
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header - Fixed position for scroll-to-hide */}
        <HomeHeader 
          onProfilePress={handleProfilePress} 
          scrollY={scrollY}
          userInitials={userInitials}
        />
        
        {/* Scrollable Content */}
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Main Content - Unique LegacyKeep Family Timeline */}
      <View style={styles.content}>
            {/* Quick Insights Bar - Birthday reminders and events */}
            <QuickInsightsBar
              insights={sampleInsights}
              onSendMessage={handleSendMessage}
              onCreateStory={handleCreateStory}
              onViewDetails={handleViewDetails}
            />

            {/* Explore - Unique Asymmetric Layout */}
            <View style={styles.timelineHeader}>
              <Text style={styles.timelineTitle}>{mainTexts.home.timelineTitle}</Text>
              <TouchableOpacity>
                <GradientText gradient="peacock" fontSize="sm" fontWeight="semibold">
                  View All
                </GradientText>
              </TouchableOpacity>
            </View>
            
            {/* Memory Card 1 - Modern Clean Layout */}
            <View style={styles.memoryWrapper}>
                <View style={styles.memoryCard}>
                  <View style={styles.memoryHeader}>
                    <View style={styles.memoryAvatar} />
                    <View style={styles.memoryInfo}>
                      <Text style={styles.memoryAuthor}>Aunt Carol</Text>
                      <Text style={styles.memoryCategory}>Story • 2 hours ago</Text>
                    </View>
                    <View style={styles.memoryTypeIcon}>
                      <Ionicons name="library" size={16} color={colors.secondary.teal[600]} />
                    </View>
                  </View>
                  <View style={styles.memoryContent}>
                    <Text style={styles.memoryTitle}>"Our First Family Vacation"</Text>
                    <Text style={styles.memorySnippet}>
                      The mountains were breathtaking, and the kids couldn't stop exploring. 
                      This was the trip that started our annual tradition...
                    </Text>
                    <View style={styles.memoryFooter}>
                      <View style={styles.memoryReactions}>
                        <Ionicons name="heart" size={14} color={colors.error[500]} />
                        <Text style={styles.reactionCount}>12</Text>
                        <Ionicons name="chatbubble" size={14} color={colors.neutral[400]} />
                        <Text style={styles.reactionCount}>5</Text>
                      </View>
                      <Text style={styles.memoryTime}>2h</Text>
                    </View>
                  </View>
                </View>
            </View>

            {/* Memory Card 2 - Photo Collection Style */}
            <View style={styles.memoryWrapper}>
                <View style={styles.memoryCard}>
                  <View style={styles.memoryHeader}>
                    <View style={styles.memoryAvatar} />
                    <View style={styles.memoryInfo}>
                      <Text style={styles.memoryAuthor}>You</Text>
                      <Text style={styles.memoryCategory}>Photos • 1 day ago</Text>
                    </View>
                    <View style={styles.memoryTypeIcon}>
                      <Ionicons name="images" size={16} color={colors.secondary.teal[600]} />
                    </View>
                  </View>
                  <View style={styles.photoCollection}>
                    <View style={styles.mainPhoto} />
                    <View style={styles.photoGrid}>
                      <View style={styles.smallPhoto} />
                      <View style={styles.smallPhoto} />
                      <View style={styles.photoCount}>
                        <Text style={styles.photoCountText}>+3</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.memoryContent}>
                    <Text style={styles.memoryTitle}>"Grandma's 90th Birthday"</Text>
                    <Text style={styles.memorySnippet}>
                      What a celebration! Five generations together under one roof. 
                      Grandma was so happy to see everyone...
                    </Text>
                    <View style={styles.memoryFooter}>
                      <View style={styles.memoryReactions}>
                        <Ionicons name="heart" size={14} color={colors.error[500]} />
                        <Text style={styles.reactionCount}>18</Text>
                        <Ionicons name="chatbubble" size={14} color={colors.neutral[400]} />
                        <Text style={styles.reactionCount}>8</Text>
                      </View>
                      <Text style={styles.memoryTime}>1d</Text>
                    </View>
                  </View>
                </View>
            </View>

            {/* Memory Card 3 - Video Style */}
            <View style={styles.memoryWrapper}>
                <View style={styles.memoryCard}>
                  <View style={styles.memoryHeader}>
                    <View style={styles.memoryAvatar} />
                    <View style={styles.memoryInfo}>
                      <Text style={styles.memoryAuthor}>Uncle Mike</Text>
                      <Text style={styles.memoryCategory}>Video • 3 days ago</Text>
                    </View>
                    <View style={styles.memoryTypeIcon}>
                      <Ionicons name="videocam" size={16} color={colors.secondary.teal[600]} />
                    </View>
                  </View>
                  <View style={styles.videoContainer}>
                    <View style={styles.videoThumbnail} />
                    <View style={styles.playButton}>
                      <Ionicons name="play" size={24} color={colors.neutral[50]} />
                    </View>
                  </View>
                  <View style={styles.memoryContent}>
                    <Text style={styles.memoryTitle}>"Summer '98 Throwback"</Text>
                    <Text style={styles.memorySnippet}>
                      Found this old video of all the cousins playing in the backyard. 
                      Look how young we all were!
                    </Text>
                    <View style={styles.memoryFooter}>
                      <View style={styles.memoryReactions}>
                        <Ionicons name="heart" size={14} color={colors.error[500]} />
                        <Text style={styles.reactionCount}>25</Text>
                        <Ionicons name="chatbubble" size={14} color={colors.neutral[400]} />
                        <Text style={styles.reactionCount}>12</Text>
                      </View>
                      <Text style={styles.memoryTime}>3d</Text>
                    </View>
                  </View>
                </View>
            </View>
      </View>
        </Animated.ScrollView>
    </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl, // Extra space at bottom
  },
  content: {
    paddingTop: spacing.md,
  },
  // Timeline Styles
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  timelineTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
  },
  // Memory Card Styles - Modern Clean Design
  memoryWrapper: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  memoryCard: {
    backgroundColor: colors.neutral[50],
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  memoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 0, // Remove border for cleaner look
  },
  memoryAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral[200],
    marginRight: spacing.md,
    shadowColor: colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  memoryInfo: {
    flex: 1,
  },
  memoryAuthor: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
  },
  memoryCategory: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    marginTop: 2,
  },
  memoryTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary.teal[50],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary.teal[100],
  },
  memoryContent: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  memoryTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  memorySnippet: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  memoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memoryReactions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  reactionCount: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    marginRight: spacing.sm,
  },
  memoryTime: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[400],
    fontWeight: typography.weights.medium,
  },
  // Photo Collection Styles
  photoCollection: {
    flexDirection: 'row',
    height: 140,
    gap: 4,
    marginBottom: spacing.md,
  },
  mainPhoto: {
    flex: 2,
    backgroundColor: colors.neutral[200],
    borderRadius: 12,
  },
  photoGrid: {
    flex: 1,
    gap: 4,
  },
  smallPhoto: {
    flex: 1,
    backgroundColor: colors.neutral[200],
    borderRadius: 8,
  },
  photoCount: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  photoCountText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
  },
  // Video Styles
  videoContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  videoThumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral[200],
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default HomeScreen;