/**
 * Contact Details Screen
 * 
 * Premium contact information and chat settings with iOS 26 fluid glass theme
 */

import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Animated,
  Dimensions,
  StatusBar,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../../shared/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ContactDetailsScreenProps {
  route: {
    params: {
      contact: {
        id: string;
        name: string;
        avatar?: string;
        isOnline?: boolean;
        relationship?: string;
        phone?: string;
        email?: string;
        lastSeen?: string;
        status?: string;
        theme?: string;
      };
    };
  };
  navigation: any;
}

const ContactDetailsScreen: React.FC<ContactDetailsScreenProps> = ({ route, navigation }) => {
  const { contact } = route.params;
  const [selectedTheme, setSelectedTheme] = useState(contact.theme || 'default');
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const themes = [
    { 
      id: 'elegant', 
      name: 'Elegant Light', 
      background: '#f8fafc',
      senderBubble: '#e8eaf6',
      recipientBubble: '#667eea',
    },
    { 
      id: 'serene', 
      name: 'Ocean Blue', 
      background: '#e3f2fd',
      senderBubble: '#bbdefb',
      recipientBubble: '#1976d2',
    },
    { 
      id: 'sophisticated', 
      name: 'Dark Mode', 
      background: '#1a1a2e',
      senderBubble: '#2d3748',
      recipientBubble: '#667eea',
    },
  ];

  const toggleSetting = (setting: string) => {
    switch (setting) {
      case 'mute':
        setIsMuted(!isMuted);
        break;
      case 'block':
        setIsBlocked(!isBlocked);
        break;
      case 'pin':
        setIsPinned(!isPinned);
        break;
    }
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    rightElement?: React.ReactNode,
    isDestructive?: boolean
  ) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.settingIconContainer,
        isDestructive && { 
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          borderColor: 'rgba(255, 107, 107, 0.2)'
        }
      ]}>
        <Ionicons 
          name={icon as any} 
          size={18} 
          color={isDestructive ? '#FF6B6B' : '#667eea'} 
        />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, isDestructive && styles.destructiveText]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        )}
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );

  const renderThemePreview = (theme: any) => (
    <View style={[styles.themePreview, { backgroundColor: theme.background }]}>
      {/* Recipient messages (dark) */}
      <View style={[styles.previewMessage, styles.previewRecipientMessage, { backgroundColor: theme.recipientBubble }]} />
      <View style={[styles.previewMessage, styles.previewRecipientMessage, { backgroundColor: theme.recipientBubble, width: '55%' }]} />
      
      {/* Sender messages (light) */}
      <View style={[styles.previewMessage, styles.previewSenderMessage, { backgroundColor: theme.senderBubble }]} />
      <View style={[styles.previewMessage, styles.previewSenderMessage, { backgroundColor: theme.senderBubble, width: '50%' }]} />
      
      {/* Recipient message */}
      <View style={[styles.previewMessage, styles.previewRecipientMessage, { backgroundColor: theme.recipientBubble, width: '60%' }]} />
    </View>
  );

  const SCREEN_WIDTH = Dimensions.get('window').width;
  
  const renderThemeItem = ({ item: theme, index }: { item: any, index: number }) => (
    <View style={[styles.themeSlideContainer, { width: SCREEN_WIDTH }]}>
      <View style={[
        styles.themeItem,
        selectedTheme === theme.id && styles.selectedTheme
      ]}>
        <View style={styles.themeHeader}>
          <View style={styles.themeGradient}>
            <Text style={styles.themeName}>{theme.name}</Text>
          </View>
          {selectedTheme === theme.id && (
            <View style={styles.selectedIndicator}>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
          )}
        </View>
        
        {renderThemePreview(theme)}
        
        <TouchableOpacity
          style={styles.selectThemeButton}
          onPress={() => {
            setSelectedTheme(theme.id);
            setShowThemeModal(false);
          }}
        >
          <Text style={styles.selectThemeButtonText}>
            {selectedTheme === theme.id ? 'Selected' : 'Select Theme'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderThemeModal = () => (
    <Modal
      visible={showThemeModal}
      animationType="slide"
      onRequestClose={() => setShowThemeModal(false)}
    >
      <View style={styles.fullScreenModal}>
        <SafeAreaView style={styles.fullScreenModalSafe}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setShowThemeModal(false)}
              style={styles.modalBackButton}
            >
              <Ionicons name="chevron-back" size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Choose Chat Theme</Text>
            <View style={{ width: 40 }} />
          </View>
          
          {/* Theme Slider */}
          <View style={styles.themeSliderContainer}>
            <FlatList
              data={themes}
              renderItem={renderThemeItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={SCREEN_WIDTH}
              decelerationRate="fast"
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                setCurrentThemeIndex(index);
              }}
              contentContainerStyle={{ alignItems: 'center' }}
            />
            
            {/* Theme indicator dots */}
            <View style={styles.themeIndicatorContainer}>
              {themes.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.themeIndicator,
                    currentThemeIndex === index && styles.activeThemeIndicator
                  ]}
                />
              ))}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background with animated gradient */}
      <LinearGradient
        colors={['#f8f9fa', '#e9ecef', '#dee2e6', '#f1f3f5']}
        style={styles.backgroundGradient}
      />
      
      {/* Animated content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Contact Details</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Contact Info */}
            <View style={styles.contactInfo}>
              <View style={styles.avatarContainer}>
                {contact.avatar ? (
                  <Image source={{ uri: contact.avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                )}
                {contact.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactRelationship}>{contact.relationship}</Text>
              <Text style={styles.contactStatus}>
                {contact.isOnline ? 'Online' : `Last seen ${contact.lastSeen || 'recently'}`}
              </Text>
              
              {/* Quick Actions */}
              <View style={styles.quickActions}>
                <TouchableOpacity style={styles.quickActionButton}>
                  <Ionicons name="call" size={18} color="#667eea" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton}>
                  <Ionicons name="videocam" size={18} color="#667eea" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton}>
                  <Ionicons name="chatbubble" size={18} color="#667eea" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton}>
                  <Ionicons name="mail" size={18} color="#667eea" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Contact Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              
              {contact.phone && renderSettingItem(
                'call-outline',
                'Phone',
                contact.phone,
                () => {}
              )}
              
              {contact.email && renderSettingItem(
                'mail-outline',
                'Email',
                contact.email,
                () => {}
              )}
              
              <View style={styles.settingItem}>
                <View style={styles.settingIconContainer}>
                  <Ionicons name="time-outline" size={18} color="#667eea" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Last Active</Text>
                  <Text style={styles.settingSubtitle}>
                    {contact.isOnline ? 'Now' : contact.lastSeen || 'Recently'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Chat Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Chat Settings</Text>
              
              {renderSettingItem(
                'color-palette-outline',
                'Chat Theme',
                themes.find(t => t.id === selectedTheme)?.name,
                () => setShowThemeModal(true)
              )}
              
              {renderSettingItem(
                isMuted ? 'volume-high-outline' : 'volume-mute-outline',
                isMuted ? 'Unmute Chat' : 'Mute Chat',
                isMuted ? 'Notifications disabled' : 'Get notifications',
                () => toggleSetting('mute'),
                <Ionicons 
                  name={isMuted ? 'checkmark' : 'add'} 
                  size={16} 
                  color={isMuted ? '#4CAF50' : '#9ca3af'} 
                />
              )}
              
              {renderSettingItem(
                isPinned ? 'pin' : 'pin-outline',
                isPinned ? 'Unpin Chat' : 'Pin Chat',
                isPinned ? 'Chat pinned to top' : 'Pin to top of chat list',
                () => toggleSetting('pin'),
                <Ionicons 
                  name={isPinned ? 'checkmark' : 'add'} 
                  size={16} 
                  color={isPinned ? '#4CAF50' : '#9ca3af'} 
                />
              )}
            </View>

            {/* Privacy & Security */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Privacy & Security</Text>
              
              {renderSettingItem(
                'eye-outline',
                'View Profile',
                'See contact\'s profile information',
                () => {}
              )}
              
              {renderSettingItem(
                'shield-checkmark-outline',
                'Block Contact',
                isBlocked ? 'Contact is blocked' : 'Block this contact',
                () => toggleSetting('block'),
                <Ionicons 
                  name={isBlocked ? 'checkmark' : 'add'} 
                  size={16} 
                  color={isBlocked ? '#FF6B6B' : '#9ca3af'} 
                />,
                true
              )}
              
              {renderSettingItem(
                'flag-outline',
                'Report Contact',
                'Report inappropriate behavior',
                () => {},
                undefined,
                true
              )}
            </View>

            {/* Family & Relationship */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Family & Relationship</Text>
              
              {renderSettingItem(
                'people-outline',
                'Family Tree',
                'View family connections',
                () => {}
              )}
              
              {renderSettingItem(
                'heart-outline',
                'Relationship',
                contact.relationship || 'Family Member',
                () => {}
              )}
              
              {renderSettingItem(
                'calendar-outline',
                'Shared Memories',
                'View shared family moments',
                () => {}
              )}
            </View>

            {/* LegacyKeep Features */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>LegacyKeep Features</Text>
              
              {renderSettingItem(
                'library-outline',
                'Shared Stories',
                'View stories shared with this contact',
                () => {}
              )}
              
              {renderSettingItem(
                'book-outline',
                'Family Recipes',
                'Access shared family recipes',
                () => {}
              )}
              
              {renderSettingItem(
                'camera-outline',
                'Photo Albums',
                'Browse shared photo collections',
                () => {}
              )}
              
              {renderSettingItem(
                'musical-notes-outline',
                'Audio Messages',
                'Listen to voice recordings',
                () => {}
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
      
      {/* Theme Selection Modal */}
      {renderThemeModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: '#1f2937',
  },
  moreButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  
  // Section Styles
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  
  // Contact Info Styles
  contactInfo: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: typography.weights.bold,
    color: '#667eea',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contactName: {
    fontSize: 20,
    fontWeight: typography.weights.bold,
    color: '#1f2937',
    marginBottom: 2,
    textAlign: 'center',
  },
  contactRelationship: {
    fontSize: typography.sizes.sm,
    color: '#6b7280',
    marginBottom: 2,
    textAlign: 'center',
  },
  contactStatus: {
    fontSize: typography.sizes.xs,
    color: '#9ca3af',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  
  // Section Title
  sectionTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: '#9ca3af',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Setting Items
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  settingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: '#1f2937',
    marginBottom: 1,
  },
  settingSubtitle: {
    fontSize: 11,
    color: '#9ca3af',
  },
  destructiveText: {
    color: '#FF6B6B',
  },
  
  // Full Screen Modal Styles
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fullScreenModalSafe: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: '#FFFFFF',
  },
  modalBackButton: {
    padding: spacing.xs,
    width: 40,
  },
  modalTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: '#1f2937',
  },
  
  // Theme Selection - Horizontal Swipe
  themeSliderContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  themeSlideContainer: {
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    flex: 1,
  },
  themeItem: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: spacing.xl,
  },
  themeHeader: {
    position: 'relative',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  themeGradient: {
    alignItems: 'center',
  },
  themeName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: '#1f2937',
  },
  selectedTheme: {
    transform: [{ scale: 1 }],
  },
  selectedIndicator: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  
  // Theme Preview
  themePreview: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    gap: spacing.md,
  },
  previewMessage: {
    height: 50,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewSenderMessage: {
    alignSelf: 'flex-end',
    width: '70%',
    borderBottomRightRadius: 6,
  },
  previewRecipientMessage: {
    alignSelf: 'flex-start',
    width: '65%',
    borderBottomLeftRadius: 6,
  },
  
  // Select Theme Button
  selectThemeButton: {
    marginHorizontal: spacing.xl,
    marginVertical: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#667eea',
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  selectThemeButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: '#FFFFFF',
  },
  
  // Theme Indicator Dots
  themeIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  themeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  activeThemeIndicator: {
    backgroundColor: '#667eea',
    width: 24,
    height: 8,
    borderRadius: 4,
  },
});

export default ContactDetailsScreen;
