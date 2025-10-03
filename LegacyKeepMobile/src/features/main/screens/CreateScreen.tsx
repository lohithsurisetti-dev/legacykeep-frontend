/**
 * Create Screen
 * 
 * Premium content creation screen for legacy preservation and family sharing
 */

import React, { useState } from 'react';
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
// import HomeHeader from '../../../shared/components/ui/HomeHeader'; // Removed unused import
import { useAuth } from '../../../app/providers/AuthContext';

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
  const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showFamilySelector, setShowFamilySelector] = useState(false);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState<string[]>([]);
  const [contentTitle, setContentTitle] = useState('');
  const [contentDescription, setContentDescription] = useState('');

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

  // Removed userInitials - was only used for HomeHeader

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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create</Text>
        </View>
        
        {/* Main Content */}
         <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
             {/* Header */}
             <View style={styles.header}>
               <Text style={styles.headerTitle}>Create</Text>
             </View>

             {/* Content Types Grid */}
             <View style={styles.contentGrid}>
               {contentTypes.slice(0, 8).map((contentType) => (
                 <TouchableOpacity
                   key={contentType.id}
                   style={styles.contentCard}
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

             {/* Dream Vault */}
             <View style={styles.dreamSection}>
               <View style={styles.sectionHeader}>
                 <View style={styles.headerLeft}>
                   <View style={styles.dreamIcon}>
                     <Ionicons name="moon-outline" size={18} color="#6366f1" />
                   </View>
                   <View style={styles.headerTextContainer}>
                     <Text style={styles.sectionTitle}>Dream Vault</Text>
                     <Text style={styles.sectionSubtitle}>Record dreams and discover connections</Text>
                   </View>
                 </View>
                 <View style={styles.dreamCountBadge}>
                   <Text style={styles.dreamCountText}>12</Text>
                 </View>
               </View>
             </View>

             {/* AI Tools (Premium) */}
             <View style={styles.aiSection}>
               <View style={styles.sectionHeader}>
                 <View style={styles.headerLeft}>
                   <View style={styles.aiIcon}>
                     <Ionicons name="diamond-outline" size={18} color="#dc2626" />
                   </View>
                   <View style={styles.headerTextContainer}>
                     <View style={styles.titleRow}>
                       <Text style={styles.sectionTitle}>AI Tools</Text>
                       <View style={styles.premiumBadge}>
                         <Text style={styles.premiumText}>Premium</Text>
                       </View>
                     </View>
                     <Text style={styles.sectionSubtitle}>Advanced AI-powered creation tools</Text>
                   </View>
                 </View>
               </View>
               <View style={styles.aiToolsGrid}>
                 <View style={styles.aiToolItem}>
                   <View style={styles.aiToolIcon}>
                     <Ionicons name="create-outline" size={16} color="#6366f1" />
                   </View>
                   <Text style={styles.aiToolText}>Story Writer</Text>
                 </View>
                 <View style={styles.aiToolItem}>
                   <View style={styles.aiToolIcon}>
                     <Ionicons name="camera-outline" size={16} color="#dc2626" />
                   </View>
                   <Text style={styles.aiToolText}>Photo Restore</Text>
                 </View>
                 <View style={styles.aiToolItem}>
                   <View style={styles.aiToolIcon}>
                     <Ionicons name="mic-outline" size={16} color="#7c3aed" />
                   </View>
                   <Text style={styles.aiToolText}>Voice Cloning</Text>
                 </View>
                 <View style={styles.aiToolItem}>
                   <View style={styles.aiToolIcon}>
                     <Ionicons name="map-outline" size={16} color="#059669" />
                   </View>
                   <Text style={styles.aiToolText}>Ancestry Tracker</Text>
                 </View>
               </View>
             </View>

             {/* Recent Work */}
             <View style={styles.recentSection}>
               <Text style={styles.sectionTitle}>Recent Work</Text>
               <View style={styles.recentList}>
                 <View style={styles.recentItem}>
                   <View style={styles.recentIcon}>
                     <Ionicons name="library-outline" size={14} color="#64748b" />
                   </View>
                   <Text style={styles.recentTitle}>Grandma's Story</Text>
                   <Text style={styles.recentStatus}>Draft</Text>
                 </View>
                 <View style={styles.recentItem}>
                   <View style={styles.recentIcon}>
                     <Ionicons name="restaurant-outline" size={14} color="#0f766e" />
                   </View>
                   <Text style={styles.recentTitle}>Apple Pie Recipe</Text>
                   <Text style={[styles.recentStatus, { color: '#059669' }]}>Published</Text>
                 </View>
                 <View style={styles.recentItem}>
                   <View style={styles.recentIcon}>
                     <Ionicons name="camera-outline" size={14} color="#059669" />
                   </View>
                   <Text style={styles.recentTitle}>Wedding Photos</Text>
                   <Text style={[styles.recentStatus, { color: '#059669' }]}>Published</Text>
                 </View>
               </View>
             </View>
           </View>
         </ScrollView>

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

  // Content Grid
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  contentCard: {
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

  // Recent Work
  recentSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  recentList: {
    gap: spacing.sm,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  recentIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  recentTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  recentStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
    backgroundColor: colors.neutral[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },

  // Dream Vault
  dreamSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dreamCountBadge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  dreamCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },

  // AI Tools (Premium)
  aiSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  aiIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: spacing.sm,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
  aiToolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  aiToolItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  aiToolIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  aiToolText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.text.primary,
    marginLeft: spacing.xs,
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