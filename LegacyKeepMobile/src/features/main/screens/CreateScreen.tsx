/**
 * Create Screen
 * 
 * Premium content creation screen for legacy preservation and family sharing
 */

import React, { useState, useRef } from 'react';
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
  Alert
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

             {/* Ping Feature Card - Compact Showcase */}
             <TouchableOpacity 
               style={styles.pingFeatureCard}
               onPress={() => setShowPingCreator(true)}
               activeOpacity={0.8}
             >
                <View style={styles.pingFeatureGlassmorphism}>
                  <View style={styles.pingFeatureContent}>
                    <View style={styles.pingFeatureIcon}>
                      <Ionicons name="radio" size={24} color="#247B7B" />
                    </View>
                    <View style={styles.pingFeatureText}>
                      <Text style={styles.pingFeatureTitle}>Ping & Pong</Text>
                      <Text style={styles.pingFeatureSubtitle}>Quick family support</Text>
                    </View>
                    <View style={styles.pingFeatureArrow}>
                      <Ionicons name="chevron-forward" size={20} color="#247B7B" />
                    </View>
                  </View>
                </View>
             </TouchableOpacity>

             {/* Dream Vault */}
             <TouchableOpacity style={styles.dreamSection}>
               <View style={styles.dreamGlassmorphism}>
                 <View style={styles.dreamContent}>
                   <View style={styles.dreamIcon}>
                     <Ionicons name="moon-outline" size={24} color="#3b5998" />
                   </View>
                   <View style={styles.dreamText}>
                     <Text style={styles.dreamTitle}>Dream Vault</Text>
                     <Text style={styles.dreamSubtitle}>Record and visualise dreams</Text>
                   </View>
                   <View style={styles.dreamArrow}>
                     <Ionicons name="chevron-forward" size={20} color="#3b5998" />
                   </View>
                 </View>
               </View>
             </TouchableOpacity>

             {/* Content Types Grid */}
             <ScrollView 
               horizontal 
               showsHorizontalScrollIndicator={false}
               style={styles.contentScrollView}
               contentContainerStyle={styles.contentScrollContent}
             >
               {Array.from({ length: Math.ceil(contentTypes.length / 4) }, (_, groupIndex) => (
                 <View key={groupIndex} style={styles.contentGroup}>
                   {contentTypes.slice(groupIndex * 4, (groupIndex + 1) * 4).map((contentType) => (
                     <TouchableOpacity
                       key={contentType.id}
                       style={[styles.contentCard, { borderColor: contentType.gradient[0] }]}
                       onPress={() => handleContentTypePress(contentType)}
                       activeOpacity={0.7}
                     >
                       <View style={[styles.cardIcon, { backgroundColor: contentType.gradient[0] + '15' }]}>
                         <Ionicons name={contentType.icon} size={20} color={contentType.gradient[0]} />
                       </View>
                       <Text style={styles.cardTitle}>{contentType.title}</Text>
                     </TouchableOpacity>
                   ))}
                 </View>
               ))}
             </ScrollView>


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
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },

  // Header
  header: {
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },

  // Ping Feature Card - Glassmorphism Style
  pingFeatureCard: {
    marginBottom: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#247B7B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    minHeight: 64,
  },
  pingFeatureGlassmorphism: {
    backgroundColor: 'rgba(36, 123, 123, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(36, 123, 123, 0.3)',
    borderRadius: 20,
    padding: spacing.md,
  },
  pingFeatureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pingFeatureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(90, 90, 154, 0.3)',
    shadowColor: '#4A4A8A',
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


  // Dream Vault
  dreamSection: {
    marginBottom: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#3b5998',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    minHeight: 64,
  },
  dreamGlassmorphism: {
    backgroundColor: 'rgba(59, 89, 152, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(59, 89, 152, 0.3)',
    borderRadius: 20,
    padding: spacing.md,
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
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
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
  familyMemberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  selectedFamilyMember: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  memberAvatar: {
    marginRight: spacing.md,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 2,
  },
  memberRelationship: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  selectedIndicator: {
    marginLeft: spacing.sm,
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