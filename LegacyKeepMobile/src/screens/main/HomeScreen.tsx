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
import { HomeHeader, BottomNavigation, GradientText } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    // TODO: Navigate to respective screens
    console.log('Tab pressed:', tabId);
  };

  const handleProfilePress = () => {
    // TODO: Navigate to profile screen
    console.log('Profile pressed');
  };

  // Dynamic content based on user data
  const userName = user?.firstName || 'User';
  const familyName = 'The Miller Family'; // TODO: Get from user's family data
  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : 'LS';

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
            {/* Family Pulse - Elegant Stats Overview */}
            <View style={styles.pulseWrapper}>
              <LinearGradient
                colors={gradients.peacock}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.pulseBorder}
              >
                <View style={styles.pulseCard}>
                  <Text style={styles.pulseTitle}>Family Pulse</Text>
                  <Text style={styles.pulseSubtitle}>This week's legacy moments</Text>
                  <View style={styles.pulseMetrics}>
                    <View style={styles.metricItem}>
                      <Text style={styles.metricNumber}>12</Text>
                      <Text style={styles.metricLabel}>New Memories</Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metricItem}>
                      <Text style={styles.metricNumber}>5</Text>
                      <Text style={styles.metricLabel}>Active Members</Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metricItem}>
                      <Text style={styles.metricNumber}>3</Text>
                      <Text style={styles.metricLabel}>Stories Shared</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Legacy Timeline - Unique Asymmetric Layout */}
            <View style={styles.timelineHeader}>
              <Text style={styles.timelineTitle}>Legacy Timeline</Text>
              <TouchableOpacity>
                <GradientText gradient="peacock" fontSize="sm" fontWeight="semibold">
                  View All
                </GradientText>
              </TouchableOpacity>
            </View>
            
            {/* Memory Card 1 - Unique Diagonal Layout */}
            <View style={styles.memoryWrapper}>
              <LinearGradient
                colors={gradients.peacock}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.memoryBorder}
              >
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
              </LinearGradient>
            </View>

            {/* Memory Card 2 - Photo Collection Style */}
            <View style={styles.memoryWrapper}>
              <LinearGradient
                colors={gradients.peacock}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.memoryBorder}
              >
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
              </LinearGradient>
            </View>

            {/* Memory Card 3 - Video Style */}
            <View style={styles.memoryWrapper}>
              <LinearGradient
                colors={gradients.peacock}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.memoryBorder}
              >
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
              </LinearGradient>
            </View>
      </View>
        </Animated.ScrollView>
        
        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  // Family Pulse Card with Gradient Border
  pulseWrapper: {
    marginBottom: spacing.lg,
  },
  pulseBorder: {
    borderRadius: 20,
    padding: 2, // Creates gradient border effect
  },
  pulseCard: {
    backgroundColor: colors.neutral[50],
    borderRadius: 18,
    padding: spacing.lg,
    alignItems: 'center',
  },
  pulseTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  pulseSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    marginBottom: spacing.md,
  },
  pulseMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricNumber: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.secondary.teal[600],
  },
  metricLabel: {
    fontSize: typography.sizes.xs,
    color: colors.neutral[500],
    marginTop: spacing.xs / 2,
    textAlign: 'center',
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral[200],
    marginHorizontal: spacing.md,
  },
  // Timeline Styles
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timelineTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
  },
  // Memory Card Styles - Unique LegacyKeep Design
  memoryWrapper: {
    marginBottom: spacing.lg,
  },
  memoryBorder: {
    borderRadius: 16,
    padding: 2, // Creates gradient border
  },
  memoryCard: {
    backgroundColor: colors.neutral[50],
    borderRadius: 14,
    overflow: 'hidden',
  },
  memoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  memoryAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.neutral[200],
    marginRight: spacing.sm,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  memoryContent: {
    padding: spacing.md,
  },
  memoryTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  memorySnippet: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    lineHeight: 20,
    marginBottom: spacing.sm,
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
    height: 120,
    gap: 2,
  },
  mainPhoto: {
    flex: 2,
    backgroundColor: colors.neutral[200],
  },
  photoGrid: {
    flex: 1,
    gap: 2,
  },
  smallPhoto: {
    flex: 1,
    backgroundColor: colors.neutral[200],
  },
  photoCount: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoCountText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.neutral[50],
  },
  // Video Styles
  videoContainer: {
    position: 'relative',
    height: 180,
    backgroundColor: colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoThumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral[200],
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;