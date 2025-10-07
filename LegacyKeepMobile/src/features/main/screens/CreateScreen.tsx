/**
 * Create Screen
 * 
 * Premium content creation screen for legacy preservation and family sharing
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Image,
  TextInput,
  Modal,
  Animated,
  Alert,
  Easing,
  Vibration
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, typography, spacing, gradients } from '../../../shared/constants';
import { HomeHeader } from '../../../shared/components/ui';
import { useAuth } from '../../../app/providers/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../app/navigation/types';
import PingCreator from '../components/PingCreator';
import { CreatePingRequest } from '../types/pingpong.types';
import { createMockPing } from '../data/mockPingPongData';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ContentType {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: string[];
  description: string;
}

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
  generation: number;
}

const CreateScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showFamilySelector, setShowFamilySelector] = useState(false);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>([]);
  const [contentTitle, setContentTitle] = useState('');
  const [contentDescription, setContentDescription] = useState('');
  
  // Ping & Pong state
  const [showPingCreator, setShowPingCreator] = useState(false);

  // Animation values for micro-interactions
  const heroAnim = useRef(new Animated.Value(0)).current;
  const quickActionsAnim = useRef(new Animated.Value(0)).current;
  const premiumCardsAnim = useRef(new Animated.Value(0)).current;
  const contentHubAnim = useRef(new Animated.Value(0)).current;
  const inspirationAnim = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  // Shimmer animation
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);

  const contentTypes: ContentType[] = [
    {
      id: 'story',
      title: 'Story',
      subtitle: 'Share a memory',
      icon: 'library-outline',
      gradient: ['#64748b', '#475569'],
      description: 'Tell a story, memory, or anecdote that you want to preserve for future generations.'
    },
    {
      id: 'recipe',
      title: 'Recipe',
      subtitle: 'Pass down traditions',
      icon: 'restaurant-outline',
      gradient: ['#0f766e', '#134e4a'],
      description: 'Share recipes, cooking methods, and food traditions that have been passed down.'
    },
    {
      id: 'wisdom',
      title: 'Wisdom',
      subtitle: 'Share your advice',
      icon: 'bulb-outline',
      gradient: ['#7c2d12', '#991b1b'],
      description: 'Impart life lessons, advice, and wisdom you\'ve learned over the years.'
    },
    {
      id: 'tradition',
      title: 'Tradition',
      subtitle: 'Preserve customs',
      icon: 'people-outline',
      gradient: ['#7c3aed', '#6b21a8'],
      description: 'Document traditions, rituals, and cultural practices for future generations.'
    },
    {
      id: 'photo',
      title: 'Photo',
      subtitle: 'Capture memories',
      icon: 'camera-outline',
      gradient: ['#059669', '#047857'],
      description: 'Share photographs with stories and context about the moments captured.'
    },
    {
      id: 'voice',
      title: 'Voice',
      subtitle: 'Speak your heart',
      icon: 'mic-outline',
      gradient: ['#0d9488', '#0f766e'],
      description: 'Record voice messages, songs, or personal thoughts for loved ones to hear.'
    },
    {
      id: 'document',
      title: 'Document',
      subtitle: 'Preserve history',
      icon: 'document-text-outline',
      gradient: ['#be185d', '#9d174d'],
      description: 'Share important documents, certificates, or historical records.'
    },
    {
      id: 'ritual',
      title: 'Ritual',
      subtitle: 'Share spirituality',
      icon: 'flower-outline',
      gradient: ['#7c2d12', '#991b1b'],
      description: 'Document religious practices, spiritual teachings, and sacred traditions.'
    },
    {
      id: 'video',
      title: 'Video',
      subtitle: 'Record moments',
      icon: 'videocam-outline',
      gradient: ['#dc2626', '#b91c1c'],
      description: 'Create video messages, tutorials, or capture special family moments.'
    },
    {
      id: 'music',
      title: 'Music',
      subtitle: 'Share melodies',
      icon: 'musical-notes-outline',
      gradient: ['#7c3aed', '#6b21a8'],
      description: 'Record songs, instrumental pieces, or musical memories.'
    },
    {
      id: 'letter',
      title: 'Letter',
      subtitle: 'Write to family',
      icon: 'mail-outline',
      gradient: ['#059669', '#047857'],
      description: 'Write personal letters, messages, or notes to family members.'
    },
    {
      id: 'journal',
      title: 'Journal',
      subtitle: 'Daily thoughts',
      icon: 'book-outline',
      gradient: ['#0f766e', '#134e4a'],
      description: 'Keep a personal journal or diary for future generations to read.'
    },
    {
      id: 'artwork',
      title: 'Artwork',
      subtitle: 'Creative expression',
      icon: 'color-palette-outline',
      gradient: ['#ea580c', '#c2410c'],
      description: 'Share drawings, paintings, or other creative works.'
    },
    {
      id: 'poetry',
      title: 'Poetry',
      subtitle: 'Express feelings',
      icon: 'heart-outline',
      gradient: ['#be185d', '#9d174d'],
      description: 'Write poems, verses, or creative expressions of love and memories.'
    },
    {
      id: 'timeline',
      title: 'Timeline',
      subtitle: 'Life events',
      icon: 'time-outline',
      gradient: ['#64748b', '#475569'],
      description: 'Create a timeline of important life events and milestones.'
    }
  ];

  const mockFamilyMembers: FamilyMember[] = [
    { id: '1', name: 'Grandma Betty', relationship: 'Grandmother', generation: 1, avatar: 'https://picsum.photos/100/100?random=1' },
    { id: '2', name: 'Dad', relationship: 'Father', generation: 2, avatar: 'https://picsum.photos/100/100?random=2' },
    { id: '3', name: 'Mom', relationship: 'Mother', generation: 2, avatar: 'https://picsum.photos/100/100?random=3' },
    { id: '4', name: 'Sarah', relationship: 'Sister', generation: 3, avatar: 'https://picsum.photos/100/100?random=4' },
    { id: '5', name: 'Little Tim', relationship: 'Son', generation: 3, avatar: 'https://picsum.photos/100/100?random=5' },
    { id: '6', name: 'Baby Emma', relationship: 'Granddaughter', generation: 4, avatar: 'https://picsum.photos/100/100?random=6' }
  ];

  // Removed handleProfilePress - was only used for HomeHeader


  const handleContentTypePress = (contentType: ContentType) => {
    setSelectedContentType(contentType);
    setShowContentModal(true);
  };

  const handleCreateContent = () => {
    if (!contentTitle.trim()) {
      Alert.alert('Title Required', 'Please enter a title for your content.');
      return;
    }
    
    // TODO: Implement content creation logic
    Alert.alert(
      'Content Created!', 
      `Your ${selectedContentType?.title} has been saved and will be shared with selected family members.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowContentModal(false);
            setSelectedContentType(null);
            setContentTitle('');
            setContentDescription('');
            setSelectedFamilyMembers([]);
          }
        }
      ]
    );
  };

  const toggleFamilyMember = (memberId: string) => {
    setSelectedFamilyMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  // Ping handler
  const handlePingCreated = async (pingRequest: CreatePingRequest) => {
    try {
      // Create mock ping
      const newPing = createMockPing({
        intent: pingRequest.intent,
        message: pingRequest.message,
        durationMinutes: pingRequest.durationMinutes,
        contextData: pingRequest.contextData,
        expiresAt: new Date(Date.now() + pingRequest.durationMinutes * 60 * 1000).toISOString(),
        timeRemaining: pingRequest.durationMinutes * 60,
      });
      
      Alert.alert(
        'Ping Sent! 🏓',
        'Your ping has been sent to family members. They can now respond with support!'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send ping. Please try again.');
    }
  };

  const handleProfilePress = () => {
    (navigation as any).navigate(ROUTES.PROFILE);
  };

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : 'U';

  // Animation effects on mount
  useEffect(() => {
    const startAnimations = () => {
      // Start shimmer animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Main entrance animations
      Animated.stagger(200, [
        Animated.timing(heroAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(quickActionsAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(premiumCardsAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(contentHubAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(inspirationAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsLoading(false);
        shimmerAnim.stopAnimation();
      });

    };

    startAnimations();
  }, []);

  // Enhanced interaction handlers with haptic feedback
  const handleQuickActionPress = (action: string) => {
    Vibration.vibrate(50); // Light haptic feedback
    setIsAnimating(true);
    
    // Success animation
    Animated.sequence([
      Animated.timing(quickActionsAnim, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(quickActionsAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsAnimating(false);
      // Handle action based on type
      switch (action) {
        case 'Media':
          triggerSuccessAnimation('Media');
          // Open camera/gallery
          break;
        case 'Voice':
          triggerSuccessAnimation('Voice Note');
          // Start voice recording
          break;
        case 'Note':
          triggerSuccessAnimation('Text Note');
          // Open note creation
          break;
        case 'Remind':
          triggerSuccessAnimation('Reminder');
          // Open reminder creation
          break;
      }
    });
  };

  const handlePremiumCardPress = (feature: string) => {
    Vibration.vibrate(30);
    
    Animated.sequence([
      Animated.timing(premiumCardsAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(premiumCardsAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (feature === 'ping') {
      setShowPingCreator(true);
    }
  };

  // Success celebration animation
  const triggerSuccessAnimation = (element: string) => {
    Vibration.vibrate([0, 100, 50, 100]); // Success pattern
    
    // Create a temporary success indicator
    const successAnim = new Animated.Value(0);
    
    Animated.sequence([
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(successAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Show success message
    setTimeout(() => {
      Alert.alert('Success!', `${element} created successfully! 🎉`);
    }, 500);
  };

  const renderContentTypeCard = (contentType: ContentType, index: number) => (
    <TouchableOpacity
      key={contentType.id}
      style={styles.contentTypeCard}
      onPress={() => handleContentTypePress(contentType)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: contentType.gradient[0] + '20' }]}>
          <Ionicons name={contentType.icon} size={28} color={contentType.gradient[0]} />
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{contentType.title}</Text>
          <Text style={styles.cardSubtitle}>{contentType.subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFamilyMember = (member: FamilyMember) => (
    <TouchableOpacity
      key={member.id}
      style={[
        styles.familyMemberCard,
        selectedFamilyMembers.includes(member.id) && styles.selectedFamilyMember
      ]}
      onPress={() => toggleFamilyMember(member.id)}
      activeOpacity={0.7}
    >
      <View style={styles.memberAvatar}>
        {member.avatar ? (
          <Image source={{ uri: member.avatar }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{member.name[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberRelationship}>{member.relationship}</Text>
      </View>
      {selectedFamilyMembers.includes(member.id) && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary[500]} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#FFFFFF', '#F1F5F9']}
        style={styles.backgroundGradient}
      >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <HomeHeader 
          title="Create"
          onProfilePress={handleProfilePress} 
          userInitials={userInitials}
          scrollY={scrollY}
        />
        
        {/* Main Content */}
        <Animated.ScrollView 
          style={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Create Your Legacy</Text>
              <Text style={styles.heroSubtitle}>Preserve memories, share stories, and connect generations</Text>
            </View>
            <View style={styles.heroDecorative}>
              <Ionicons name="sparkles" size={32} color="#6366F1" />
            </View>
          </View>

          {/* Shimmer Effect for Loading */}
          {isLoading && (
            <Animated.View style={[
              styles.shimmerContainer,
              {
                opacity: shimmerAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 0.7, 0.3],
                }),
              }
            ]}>
              <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmerGradient}
              />
            </Animated.View>
          )}

          {/* Quick Actions Row */}
          <Animated.View style={[
            styles.quickActionsRow,
            {
              transform: [
                { 
                  scale: quickActionsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  })
                },
                { 
                  translateY: quickActionsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  })
                }
              ],
              opacity: quickActionsAnim,
            }
          ]}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickActionPress('Media')}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.quickActionGradient}>
                <Ionicons name="images" size={24} color="white" />
                <Text style={styles.quickActionText}>Media</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickActionPress('Voice')}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#10B981', '#059669']} style={styles.quickActionGradient}>
                <Ionicons name="mic" size={24} color="white" />
                <Text style={styles.quickActionText}>Voice</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickActionPress('Note')}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.quickActionGradient}>
                <Ionicons name="document-text" size={24} color="white" />
                <Text style={styles.quickActionText}>Note</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickActionPress('Remind')}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.quickActionGradient}>
                <Ionicons name="notifications" size={24} color="white" />
                <Text style={styles.quickActionText}>Remind</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Premium Feature Cards */}
          <Animated.View style={[
            styles.premiumFeaturesSection,
            {
              transform: [
                { 
                  scale: premiumCardsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  })
                },
                { 
                  translateY: premiumCardsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })
                }
              ],
              opacity: premiumCardsAnim,
            }
          ]}>
            <Text style={styles.sectionTitle}>Premium Features</Text>
            
            {/* Ping Feature Card */}
            <TouchableOpacity 
              style={styles.premiumCard}
              onPress={() => handlePremiumCardPress('ping')}
              onLongPress={() => {
                Vibration.vibrate(200);
                Alert.alert(
                  'Ping & Pong',
                  'Send quick support requests to family members. Perfect for when you need immediate help or just want to check in!',
                  [{ text: 'Got it!', style: 'default' }]
                );
              }}
              activeOpacity={0.8}
              delayLongPress={500}
            >
              <LinearGradient colors={['#247B7B', '#1A5F5F']} style={styles.premiumCardGradient}>
                <View style={styles.premiumCardContent}>
                  <View style={styles.premiumIconContainer}>
                    <Ionicons name="radio" size={28} color="white" />
                  </View>
                  <View style={styles.premiumTextContainer}>
                    <Text style={styles.premiumCardTitle}>Ping & Pong</Text>
                    <Text style={styles.premiumCardSubtitle}>Quick family support & connection</Text>
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumBadgeText}>NEW</Text>
                    </View>
                  </View>
                  <View style={styles.premiumArrow}>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Dream Vault Card */}
            <TouchableOpacity 
              style={styles.premiumCard}
              onPress={() => handlePremiumCardPress('dream')}
              onLongPress={() => {
                Vibration.vibrate(200);
                Alert.alert(
                  'Dream Vault',
                  'Record and visualize your dreams. Track patterns, emotions, and recurring themes in your subconscious mind.',
                  [{ text: 'Interesting!', style: 'default' }]
                );
              }}
              activeOpacity={0.8}
              delayLongPress={500}
            >
              <LinearGradient colors={['#3b5998', '#2E4A7A']} style={styles.premiumCardGradient}>
                <View style={styles.premiumCardContent}>
                  <View style={styles.premiumIconContainer}>
                    <Ionicons name="moon" size={28} color="white" />
                  </View>
                  <View style={styles.premiumTextContainer}>
                    <Text style={styles.premiumCardTitle}>Dream Vault</Text>
                    <Text style={styles.premiumCardSubtitle}>Record and visualize dreams</Text>
                    <View style={styles.premiumStats}>
                      <Text style={styles.premiumStatsText}>12 dreams recorded</Text>
                    </View>
                  </View>
                  <View style={styles.premiumArrow}>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Events & Planning Card */}
            <TouchableOpacity 
              style={styles.premiumCard}
              onPress={() => handlePremiumCardPress('events')}
              onLongPress={() => {
                Vibration.vibrate(200);
                Alert.alert(
                  'Events & Planning',
                  'Plan family gatherings, track important dates, and coordinate events with your loved ones all in one place.',
                  [{ text: 'Perfect!', style: 'default' }]
                );
              }}
              activeOpacity={0.8}
              delayLongPress={500}
            >
              <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.premiumCardGradient}>
                <View style={styles.premiumCardContent}>
                  <View style={styles.premiumIconContainer}>
                    <Ionicons name="calendar" size={28} color="white" />
                  </View>
                  <View style={styles.premiumTextContainer}>
                    <Text style={styles.premiumCardTitle}>Events & Planning</Text>
                    <Text style={styles.premiumCardSubtitle}>Plan family gatherings</Text>
                    <View style={styles.premiumStats}>
                      <Text style={styles.premiumStatsText}>3 upcoming events</Text>
                    </View>
                  </View>
                  <View style={styles.premiumArrow}>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Content Creation Hub */}
          <Animated.View style={[
            styles.contentHubSection,
            {
              transform: [
                { 
                  scale: contentHubAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  })
                },
                { 
                  translateY: contentHubAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  })
                }
              ],
              opacity: contentHubAnim,
            }
          ]}>
            <View style={styles.contentHubHeader}>
              <Text style={styles.sectionTitle}>Create Content</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#6366F1" />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.contentHubScroll}
              contentContainerStyle={styles.contentHubScrollContent}
            >
              {Array.from({ length: Math.ceil(contentTypes.length / 2) }, (_, groupIndex) => (
                <View key={groupIndex} style={styles.contentHubGroup}>
                  {contentTypes.slice(groupIndex * 2, (groupIndex + 1) * 2).map((contentType) => (
                    <TouchableOpacity
                      key={contentType.id}
                      style={styles.contentHubCard}
                      onPress={() => handleContentTypePress(contentType)}
                      activeOpacity={0.7}
                    >
                      <LinearGradient 
                        colors={[contentType.gradient[0] + '20', contentType.gradient[1] + '10']} 
                        style={styles.contentHubCardGradient}
                      >
                        <View style={[styles.contentHubIcon, { backgroundColor: contentType.gradient[0] }]}>
                          <Ionicons name={contentType.icon} size={24} color="white" />
                        </View>
                        <Text style={styles.contentHubTitle}>{contentType.title}</Text>
                        <Text style={styles.contentHubSubtitle}>{contentType.subtitle}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Inspiration Section */}
          <Animated.View style={[
            styles.inspirationSection,
            {
              transform: [
                { 
                  translateY: inspirationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 0],
                  })
                }
              ],
              opacity: inspirationAnim,
            }
          ]}>
            <Text style={styles.sectionTitle}>Today's Inspiration</Text>
            <View style={styles.inspirationCard}>
              <View style={styles.inspirationContent}>
                <Text style={styles.inspirationQuote}>"Every family has a story worth preserving"</Text>
                <Text style={styles.inspirationAuthor}>- LegacyKeep Team</Text>
              </View>
              <View style={styles.inspirationIcon}>
                <Ionicons name="heart" size={24} color="#EF4444" />
              </View>
            </View>
          </Animated.View>
        </View>
         </Animated.ScrollView>

        {/* Content Creation Modal */}
        <Modal
          visible={showContentModal}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowContentModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity 
                  onPress={() => setShowContentModal(false)}
                  style={styles.modalCloseButton}
                >
                  <Ionicons name="close" size={24} color={colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>
                  Create {selectedContentType?.title}
            </Text>
                <View style={styles.modalSpacer} />
          </View>

              {/* Content Form */}
              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <View style={styles.formSection}>
                  <Text style={styles.formLabel}>Title *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={`Enter ${selectedContentType?.title.toLowerCase()} title`}
                    value={contentTitle}
                    onChangeText={setContentTitle}
                    placeholderTextColor={colors.text.secondary}
                  />
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.formLabel}>Description</Text>
                  <TextInput
                    style={[styles.formInput, styles.textArea]}
                    placeholder="Add details, context, or story..."
                    value={contentDescription}
                    onChangeText={setContentDescription}
                    multiline
                    numberOfLines={4}
                    placeholderTextColor={colors.text.secondary}
                    textAlignVertical="top"
                  />
                </View>

                   <View style={styles.formSection}>
                     <View style={styles.formLabelRow}>
                       <Text style={styles.formLabel}>Share with</Text>
                       <TouchableOpacity
                         onPress={() => setShowFamilySelector(!showFamilySelector)}
                         style={styles.familyToggleButton}
                       >
                         <Text style={styles.familyToggleText}>
                           {showFamilySelector ? 'Hide' : 'Select'} ({selectedFamilyMembers.length})
            </Text>
                         <Ionicons
                           name={showFamilySelector ? "chevron-up" : "chevron-down"}
                           size={16}
                           color={colors.primary[500]}
                         />
                       </TouchableOpacity>
                     </View>

                  {showFamilySelector && (
                    <View style={styles.familySelector}>
                      {mockFamilyMembers.map(renderFamilyMember)}
                    </View>
                  )}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreateContent}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.createButtonText}>Create Content</Text>
                  </TouchableOpacity>
          </View>
              </ScrollView>
        </View>
      </SafeAreaView>
        </Modal>

        {/* Ping Creator Modal */}
        <PingCreator
          isVisible={showPingCreator}
          onClose={() => setShowPingCreator(false)}
          onPingCreated={handlePingCreated}
        />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },

  // Hero Section
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  heroDecorative: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366F115',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Quick Actions Row
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  quickActionGradient: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.xs,
  },

  // Premium Features Section
  premiumFeaturesSection: {
    marginBottom: spacing.xl,
  },
  premiumCard: {
    marginBottom: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  premiumCardGradient: {
    padding: spacing.lg,
  },
  premiumCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: spacing.xs,
  },
  premiumCardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.sm,
  },
  premiumBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },
  premiumStats: {
    marginTop: spacing.xs,
  },
  premiumStatsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  premiumArrow: {
    marginLeft: spacing.sm,
  },

  // Content Hub Section
  contentHubSection: {
    marginBottom: spacing.xl,
  },
  contentHubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  viewAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
    marginRight: 4,
  },
  contentHubScroll: {
    marginHorizontal: -spacing.lg,
  },
  contentHubScrollContent: {
    paddingHorizontal: spacing.lg,
  },
  contentHubGroup: {
    width: 200,
    marginRight: spacing.md,
  },
  contentHubCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  contentHubCardGradient: {
    padding: spacing.lg,
    minHeight: 120,
  },
  contentHubIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  contentHubTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  contentHubSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },

  // Inspiration Section
  inspirationSection: {
    marginBottom: spacing.xl,
  },

  // Shimmer Effects
  shimmerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    zIndex: 100,
  },
  shimmerGradient: {
    flex: 1,
    width: '100%',
  },
  inspirationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inspirationContent: {
    flex: 1,
  },
  inspirationQuote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  inspirationAuthor: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  inspirationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.lg,
  },

  // Ping Feature Card - Premium Glassmorphism Style
  pingFeatureCard: {
    marginBottom: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#247B7B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    minHeight: 64,
  },
  pingFeatureGlassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1.5,
    borderColor: 'rgba(36, 123, 123, 0.2)',
    borderRadius: 20,
    padding: spacing.md,
    shadowColor: '#247B7B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  pingFeatureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pingFeatureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(36, 123, 123, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(36, 123, 123, 0.3)',
    shadowColor: '#247B7B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pingFeatureText: {
    flex: 1,
  },
  pingFeatureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#247B7B',
    marginBottom: 2,
  },
  pingFeatureSubtitle: {
    fontSize: 12,
    color: '#1E5A5A',
    fontWeight: '500',
  },
  pingFeatureArrow: {
    marginLeft: spacing.sm,
  },

  // Content Grid - Horizontal Scroll
  contentSection: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: 0, // Remove marginBottom to prevent misalignment
    letterSpacing: -0.3,
    flex: 1, // Allow title to take available space
  },
  contentScrollView: {
    marginBottom: spacing.md,
  },
  contentScrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  contentGroup: {
    width: 180, // 2 cards * 80px + gap
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contentCard: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: spacing.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.text.primary,
    textAlign: 'center',
  },


  // Dream Vault - Premium Glassmorphism Style
  dreamSection: {
    marginBottom: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#3b5998',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    minHeight: 64,
  },
  dreamGlassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1.5,
    borderColor: 'rgba(59, 89, 152, 0.2)',
    borderRadius: 20,
    padding: spacing.md,
    shadowColor: '#3b5998',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dreamContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dreamText: {
    flex: 1,
  },
  dreamTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b5998',
    marginBottom: 2,
  },
  dreamSubtitle: {
    fontSize: 12,
    color: '#2E4A7A',
    fontWeight: '500',
  },
  dreamArrow: {
    marginLeft: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTextContainer: {
    marginLeft: spacing.md,
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  dreamIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 89, 152, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(59, 89, 152, 0.3)',
    marginRight: spacing.md,
    shadowColor: '#3b5998',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Events & Planning - Premium Glassmorphism Style
  eventsSection: {
    marginBottom: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    minHeight: 64,
  },
  eventsGlassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1.5,
    borderColor: 'rgba(234, 88, 12, 0.2)',
    borderRadius: 20,
    padding: spacing.md,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  eventsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsText: {
    flex: 1,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EA580C',
    marginBottom: 2,
  },
  eventsSubtitle: {
    fontSize: 12,
    color: '#C2410C',
    fontWeight: '500',
  },
  eventsArrow: {
    marginLeft: spacing.sm,
  },
  eventsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(234, 88, 12, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(234, 88, 12, 0.3)',
    marginRight: spacing.md,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },


  // Content Type Card Styles
  contentTypeCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTextContainer: {
    alignItems: 'center',
  },
  cardSubtitle: {
    fontSize: 10,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 2,
  },

  // Family Member Styles
  familyMemberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedFamilyMember: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary[700],
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  memberRelationship: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },


  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: spacing.lg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  modalCloseButton: {
    padding: spacing.sm,
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginRight: 40, // Compensate for close button width
  },
  modalSpacer: {
    width: 40, // Same as close button width for centering
  },
  modalScroll: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },

  // Form Styles
  formSection: {
    marginBottom: spacing.xl,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  formLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  formInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  // Family Selector
  familyToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  familyToggleText: {
    fontSize: 14,
    color: colors.primary[500],
    fontWeight: '500',
    marginRight: 4,
  },
  familySelector: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.medium,
    maxHeight: 300,
  },

  // Modal Actions
  modalActions: {
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  createButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default CreateScreen;