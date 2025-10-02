/**
 * Family Screen - Dynamic Family Tree
 * 
 * Uses dynamic components that adapt to any backend data structure
 */

import React, { useState, useRef } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, typography, spacing } from '../../../shared/constants';
import { HomeHeader } from '../../../shared/components/ui';
import { useAuth } from '../../../app/providers/AuthContext';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { useTheme } from '../../../app/providers/ThemeContext';
import FamilyTree from '../components/FamilyTree';
import { transformFamilyData, createMockFamilyData } from '../utils/familyDataAdapter';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Dynamic person interface that adapts to any backend data
interface PersonData {
  id: string;
  name: string;
  surname?: string;
  relation: string;
  photo?: string;
  isAlive: boolean;
  birthYear?: string;
  deathYear?: string;
  email?: string;
  phone?: string;
  availabilityMessage?: string; // Custom message like "Always available for family"
  contactPreference?: string; // Preferred contact method like "Text messages" or "Phone calls"
  bestTime?: string; // Best time to contact like "Weekends" or "After 6 PM"
  [key: string]: any;
}

const FamilyScreen: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { colors: themeColors } = useTheme();
  
  const [selectedMember, setSelectedMember] = useState<PersonData | null>(null);
  
  // Animation values for member card
  const [cardAnimation] = useState(new Animated.Value(0));
  const [blurAnimation] = useState(new Animated.Value(0));
  
  // Scroll animation for header fade
  const scrollY = useRef(new Animated.Value(0)).current;

  // Get family data - in real app, this would come from your backend
  const familyData = createMockFamilyData();

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handlePersonPress = (person: PersonData) => {
    setSelectedMember(person);
    // Animate card appearance
    Animated.parallel([
      Animated.spring(cardAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(blurAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMemberCard = () => {
    Animated.parallel([
      Animated.spring(cardAnimation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(blurAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedMember(null);
    });
  };

  // Action handlers for member card
  const handleShareLegacy = (person: PersonData) => {
    console.log('Share legacy with:', person.name);
    // TODO: Implement legacy sharing
  };

  const handleStartChat = (person: PersonData) => {
    console.log('Start chat with:', person.name);
    // TODO: Implement chat functionality
  };

  const handleCall = (person: PersonData) => {
    console.log('Call:', person.name, person.phone);
    // TODO: Implement calling functionality
  };

  const handleEmail = (person: PersonData) => {
    console.log('Email:', person.name, person.email);
    // TODO: Implement email functionality
  };

  const handleAddContent = (person: PersonData) => {
    console.log('Add content for:', person.name);
    // TODO: Implement add content functionality (memories, recipes, advice, etc.)
  };

  const handleAddPhoto = (person: PersonData) => {
    console.log('Add photo for:', person.name);
    // TODO: Implement photo upload
  };

  const handleEditRelationship = (person: PersonData) => {
    console.log('Edit relationship for:', person.name);
    // TODO: Implement relationship editing
  };

  const handleViewProfile = (person: PersonData) => {
    console.log('View profile for:', person.name);
    // TODO: Navigate to detailed profile
  };

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : 'LS';

  const styles = createStyles(themeColors);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
         <HomeHeader 
           onProfilePress={handleProfilePress} 
           userInitials={userInitials}
           title="Family Tree"
           scrollY={scrollY}
         />
        
        {/* Dynamic Family Tree */}
            <FamilyTree
          data={familyData}
          onPersonPress={handlePersonPress}
          themeColors={themeColors}
          size="medium"
          scrollY={scrollY}
          isModalOpen={!!selectedMember}
        />

        {/* Premium Member Card Modal */}
        {selectedMember && (
          <View style={styles.modalOverlay}>
            <Animated.View 
              style={[
                styles.modalBackground,
                {
                  opacity: blurAnimation,
                }
              ]}
            >
              <BlurView intensity={20} style={StyleSheet.absoluteFillObject} />
              <View style={styles.blurOverlay} />
            </Animated.View>
            
            <TouchableOpacity 
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={closeMemberCard}
            />
            
            <Animated.View 
              style={[
                styles.premiumModalContent,
                {
                  transform: [
                    {
                      scale: cardAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                    {
                      translateY: cardAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                  opacity: cardAnimation,
                }
              ]}
            >
              {/* Enhanced Header with Photo and Info */}
              <View style={styles.enhancedModalHeader}>
                <View style={styles.enhancedPhotoContainer}>
                  {selectedMember.photo ? (
                    <Image source={{ uri: selectedMember.photo }} style={styles.enhancedModalPhoto} />
                  ) : (
                    <View style={styles.enhancedPhotoPlaceholder}>
                      <Ionicons name="person" size={28} color="#9E9E9E" />
                    </View>
                  )}
                  {!selectedMember.isAlive && (
                    <View style={styles.enhancedDeceasedBadge}>
                      <Text style={styles.enhancedDeceasedText}>
                        {selectedMember.birthYear ? `${selectedMember.birthYear}-${parseInt(selectedMember.birthYear) + 80}` : '†'}
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.enhancedModalInfo}>
                  <Text style={styles.enhancedModalName}>
                    {selectedMember.name}{selectedMember.surname ? ` ${selectedMember.surname}` : ''}
                  </Text>
                  <View style={styles.relationContainer}>
                    <Ionicons name="people" size={14} color="#3B9B9F" />
                    <Text style={styles.enhancedModalRelation}>{selectedMember.relation}</Text>
                  </View>
                </View>
              </View>

              {/* Details Section */}
              <View style={styles.premiumDetailsSection}>
                {selectedMember.birthYear && (
                  <View style={styles.premiumDetailItem}>
                    <Ionicons name="calendar" size={16} color="#3B9B9F" />
                    <Text style={styles.premiumDetailText}>Born in {selectedMember.birthYear}</Text>
                  </View>
                )}

                {selectedMember.email && (
                  <View style={styles.premiumDetailItem}>
                    <Ionicons name="mail-outline" size={16} color="#3B9B9F" />
                    <Text style={styles.premiumDetailText}>{selectedMember.email}</Text>
                  </View>
                )}

                {selectedMember.phone && (
                  <View style={styles.premiumDetailItem}>
                    <Ionicons name="call-outline" size={16} color="#3B9B9F" />
                    <Text style={styles.premiumDetailText}>
                      {selectedMember.phone}
                      {selectedMember.isAlive && (
                        <Text style={styles.availabilityText}>
                          {' '}({selectedMember.bestTime || "Available: Anytime"})
                        </Text>
                      )}
                    </Text>
                  </View>
                )}
              </View>

              {/* Action Icons Row - Moved Below Details */}
              <View style={styles.actionIconsRow}>
                {/* Chat - Only for living members */}
                {selectedMember.isAlive && (
                  <TouchableOpacity 
                    style={styles.actionIcon}
                    onPress={() => handleStartChat(selectedMember)}
                  >
                    <Ionicons name="chatbubbles-outline" size={24} color="#3B9B9F" />
                    <Text style={styles.actionIconLabel}>Chat</Text>
                  </TouchableOpacity>
                )}

                {/* Add Content - Available for both living and deceased */}
                <TouchableOpacity 
                  style={styles.actionIcon}
                  onPress={() => handleAddContent(selectedMember)}
                >
                  <Ionicons name="add" size={24} color="#3B9B9F" />
                  <Text style={styles.actionIconLabel}>
                    {selectedMember.isAlive ? "Add" : "Memorial"}
                  </Text>
                </TouchableOpacity>

                {/* Share - Available for both living and deceased */}
                <TouchableOpacity 
                  style={styles.actionIcon}
                  onPress={() => handleShareLegacy(selectedMember)}
                >
                  <Ionicons name="share-outline" size={24} color="#3B9B9F" />
                  <Text style={styles.actionIconLabel}>Share</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  // Premium Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(59, 155, 159, 0.08)', // Very light teal tint
  },
  premiumModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    maxWidth: screenWidth * 0.9,
    width: '90%',
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 155, 159, 0.1)',
  },
  // Enhanced Modal Styles
  enhancedModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  enhancedPhotoContainer: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  enhancedModalPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  enhancedPhotoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  enhancedDeceasedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    minWidth: 32,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#757575',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  enhancedDeceasedText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    lineHeight: 8,
    includeFontPadding: false,
  },
  premiumDeceasedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    minWidth: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#757575',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 6,
  },
  premiumDeceasedBadgeBelow: {
    minWidth: 50,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#757575',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  premiumDeceasedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    lineHeight: 10,
    includeFontPadding: false,
  },
  enhancedModalInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  enhancedModalName: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: '#1A1A1A',
    marginBottom: spacing.xs,
    lineHeight: 28,
  },
  relationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8F4F5',
    alignSelf: 'flex-start',
  },
  enhancedModalRelation: {
    fontSize: typography.sizes.sm,
    color: '#3B9B9F',
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.xs,
  },
  premiumStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8F4F5',
  },
  premiumStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.xs,
  },
  premiumStatusText: {
    fontSize: typography.sizes.sm,
    color: '#757575',
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.xs,
  },
  // Action Icons
  actionIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
  },
  actionIcon: {
    alignItems: 'center',
    minWidth: 60,
  },
  actionIconLabel: {
    fontSize: typography.sizes.xs,
    color: '#757575',
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
  // Premium Status Row
  premiumStatusRow: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  premiumStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8F4F5',
  },
  // Secondary Actions
  secondaryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  secondaryAction: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8F4F5',
  },
  secondaryActionLabel: {
    fontSize: typography.sizes.xs,
    color: '#757575',
    fontWeight: typography.weights.medium,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  // Details Section
  premiumDetailsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E8F4F5',
    paddingTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  premiumDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8F4F5',
  },
  premiumDetailText: {
    fontSize: typography.sizes.sm,
    color: '#1A1A1A',
    marginLeft: spacing.md,
    flex: 1,
    fontWeight: typography.weights.medium,
  },
  availabilityText: {
    fontSize: typography.sizes.xs,
    color: '#3B9B9F',
    fontStyle: 'italic',
    fontWeight: typography.weights.normal,
  },
});

export default FamilyScreen;