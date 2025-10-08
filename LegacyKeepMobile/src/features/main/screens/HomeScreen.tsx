/**
 * Home Screen
 * 
 * Main dashboard screen for authenticated users
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Animated, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { typography, spacing } from '../../../shared/constants';
import { HomeHeader, QuickInsightsBar } from '../../../shared/components/ui';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { useTheme } from '../../../app/providers/ThemeContext';
import type { InsightItem } from '../../../shared/components/ui/QuickInsightsBar';
import { useAuth } from '../../../app/providers/AuthContext';
import { ROUTES } from '../../../app/navigation/types';
import { getActivePings } from '../data/mockPingPongData';
import { Ping } from '../types/pingpong.types';
import { FamilyFeed } from '../components/FamilyFeed';

const HomeScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { colors } = useTheme();

  // Pong cards state
  const [activePings, setActivePings] = useState<Ping[]>([]);
  const [isPingPongCollapsed, setIsPingPongCollapsed] = useState(false);

  // Load active pings
  useEffect(() => {
    const loadActivePings = () => {
      const pings = getActivePings('family_1');
      console.log('Loaded pings:', pings.length, pings.map(p => p.userName));
      setActivePings(pings);
    };
    
    loadActivePings();
    const interval = setInterval(loadActivePings, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleProfilePress = () => {
    (navigation as any).navigate(ROUTES.PROFILE);
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

  const handlePongPress = (pingId: string) => {
    console.log('Pong pressed for ping:', pingId);
    // Simple response action
  };

  const togglePingPongSection = () => {
    setIsPingPongCollapsed(!isPingPongCollapsed);
  };

  // Format remaining time with urgency indicators
  const formatRemainingTime = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffInMinutes = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffInMinutes <= 0) return 'Expired';
    if (diffInMinutes < 5) return `${diffInMinutes}m left`;
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    return `${Math.floor(diffInMinutes / 60)}h ${diffInMinutes % 60}m`;
  };

  // Calculate progress percentage (0-100) based on 30-minute pivot
  const getTimeProgress = (ping: any) => {
    const now = new Date();
    const expiry = new Date(ping.expiresAt);
    const remainingMinutes = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60));
    
    // 30 minutes = 100% progress, 0 minutes = 0% progress
    const progress = Math.max(0, Math.min(100, ((30 - remainingMinutes) / 30) * 100));
    
    return progress;
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

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#FFFFFF', '#F1F5F9']}
        style={styles.backgroundGradient}
      >
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

            {/* Clean Pong Cards Section */}
            {activePings.length > 0 && (
              <View style={[
                styles.pongSection,
                isPingPongCollapsed && styles.pongSectionCollapsed
              ]}>
                <TouchableOpacity 
                  style={[
                    styles.pongSectionHeader,
                    isPingPongCollapsed && styles.pongSectionHeaderCollapsed
                  ]}
                  onPress={togglePingPongSection}
                  activeOpacity={0.7}
                >
                  <View style={styles.pongSectionTitleContainer}>
                    <Text style={styles.pongSectionTitle}>Ping & Pong</Text>
                    <Ionicons 
                      name={isPingPongCollapsed ? "chevron-down" : "chevron-up"} 
                      size={18} 
                      color="black" 
                      style={styles.pongSectionArrow}
                    />
                  </View>
                </TouchableOpacity>
                {!isPingPongCollapsed && (
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.pongScrollView}
                    contentContainerStyle={styles.pongScrollContent}
                  >
                  {activePings.map((ping, index) => {
                    // Different gradients for each card
                    const gradients: [string, string][] = [
                      ['rgba(103, 126, 234, 0.8)', 'rgba(118, 75, 162, 0.8)'], // Purple-blue
                      ['rgba(16, 185, 129, 0.8)', 'rgba(5, 150, 105, 0.8)'], // Green
                      ['rgba(245, 158, 11, 0.8)', 'rgba(217, 119, 6, 0.8)'], // Orange
                      ['rgba(239, 68, 68, 0.8)', 'rgba(185, 28, 28, 0.8)'], // Red
                      ['rgba(139, 92, 246, 0.8)', 'rgba(124, 58, 237, 0.8)'], // Purple
                      ['rgba(6, 182, 212, 0.8)', 'rgba(8, 145, 178, 0.8)'], // Cyan
                    ];
                    
                    const gradientColors = gradients[index % gradients.length];
                    
                    return (
                      <TouchableOpacity
                        key={ping.id}
                        style={styles.pongCard}
                        onPress={() => handlePongPress(ping.id)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.pongGlassmorphism}>
                          <View style={styles.pongCardOverlay} />
                          <LinearGradient
                            colors={gradientColors}
                            style={styles.pongCardGradient}
                          >
                          <View style={styles.pongCardHeader}>
                            <View style={styles.pongUserInfo}>
                              <View style={styles.pongAvatar}>
                                {ping.userAvatar ? (
                                  <Image 
                                    source={{ uri: ping.userAvatar }} 
                                    style={styles.pongAvatarImage}
                                  />
                                ) : (
                                  <View style={styles.pongAvatarGradient}>
                                    <Text style={styles.pongAvatarText}>
                                      {(ping.userName || 'U').charAt(0).toUpperCase()}
                                    </Text>
                                  </View>
                                )}
                              </View>
                              <View style={styles.pongUserDetails}>
                                <Text style={styles.pongUserName}>
                                  {ping.userName || 'Unknown User'}
                                </Text>
                                <Text style={styles.pongUserRelation}>
                                  Family Member
                                </Text>
                              </View>
                            </View>
                            <View style={styles.pongTimeWrapper}>
                              {/* Progress Border */}
                              <View style={[
                                styles.pongTimeProgressBorder,
                                {
                                  borderColor: 'white',
                                  borderWidth: 1 + (getTimeProgress(ping) / 100) * 1 // 1px to 2px based on progress
                                }
                              ]}>
                                {/* Time Content */}
                                <View style={styles.pongTimeContainer}>
                                  <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.8)" />
                                  <Text style={styles.pongTimeText}>
                                    {formatRemainingTime(ping.expiresAt)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          
                            <View style={styles.pongContent}>
                              <Text style={styles.pongMessage} numberOfLines={2}>
                                {ping.message || 'Support request'}
                              </Text>
                            </View>
                            
                            <View style={styles.pongFooter}>
                              {/* Location/Game Info - Left side */}
                              <View style={styles.pongLeftInfo}>
                                {(ping.contextData?.location || ping.contextData?.gameType) && (
                                  <View style={styles.pongLocationContainer}>
                                    <Ionicons 
                                      name={ping.contextData?.gameType ? "game-controller-outline" : "location-outline"} 
                                      size={12} 
                                      color="rgba(255,255,255,0.9)" 
                                    />
                                    <Text style={styles.pongLocationText} numberOfLines={1}>
                                      {ping.contextData?.gameType || ping.contextData?.location}
                                    </Text>
                                  </View>
                                )}
                              </View>
                              
                              {/* Respond Button - Always on right */}
                              <View style={styles.pongActionButton}>
                                <Ionicons name="heart-outline" size={14} color="white" />
                                <Text style={styles.pongActionText}>Respond</Text>
                              </View>
                            </View>
                          </LinearGradient>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                  </ScrollView>
                )}
              </View>
            )}

            {/* Instagram-Style Family Feed */}
            <FamilyFeed />
          </View>

        </Animated.ScrollView>

        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
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

  // Clean Pong Cards Section
  pongSection: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  pongSectionCollapsed: {
    marginBottom: spacing.sm,
  },
  pongSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  pongSectionHeaderCollapsed: {
    marginBottom: spacing.xs,
  },
  pongSectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pongSectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  pongSectionArrow: {
    marginLeft: spacing.xs,
  },
  pongScrollView: {
    marginHorizontal: -spacing.lg,
  },
  pongScrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  pongCard: {
    width: 280,
    height: 160,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
  },
  pongGlassmorphism: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  pongCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    zIndex: 1,
  },
  pongCardGradient: {
    padding: spacing.md,
    height: '100%', // Take full card height
    justifyContent: 'space-between', // Distribute content evenly
    zIndex: 2,
    position: 'relative',
  },
  pongTimeWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pongTimeProgressBorder: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pongCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  pongUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pongAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  pongAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  pongAvatarGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pongAvatarText: {
    color: 'white',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  pongUserDetails: {
    flex: 1,
  },
  pongUserName: {
    color: 'white',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    marginBottom: 2,
  },
  pongUserRelation: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  pongTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 14,
    gap: 4,
  },
  pongTimeText: {
    fontSize: typography.sizes.xs,
    color: 'white',
    fontWeight: typography.weights.medium,
  },
  pongContent: {
    flex: 1,
    marginBottom: spacing.sm,
  },
  pongMessage: {
    fontSize: typography.sizes.sm,
    color: 'white',
    lineHeight: 20,
    fontWeight: typography.weights.medium,
  },
  pongFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  pongLeftInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  pongLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    maxWidth: '60%',
    flexShrink: 1,
  },
  pongLocationText: {
    color: 'white',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    flexShrink: 1,
  },
  pongActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  pongActionText: {
    color: 'white',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
  
});

export default HomeScreen;