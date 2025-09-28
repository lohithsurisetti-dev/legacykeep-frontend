/**
 * Help & Support Screen
 * 
 * User help, support, and contact options
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/types';
import { colors, typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';
import { BackButton } from '../../../shared/components/ui';

type Props = MainStackScreenProps<typeof ROUTES.HELP_SUPPORT>;

const HelpSupportScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFAQ = () => {
    console.log('FAQ pressed');
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact us?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Email', 
          onPress: () => Linking.openURL('mailto:support@legacykeep.com')
        },
        { 
          text: 'Phone', 
          onPress: () => Linking.openURL('tel:+1234567890')
        },
      ]
    );
  };

  const handleReportBug = () => {
    console.log('Report bug pressed');
  };

  const handleFeatureRequest = () => {
    console.log('Feature request pressed');
  };

  const handleUserGuide = () => {
    console.log('User guide pressed');
  };

  const handleVideoTutorials = () => {
    console.log('Video tutorials pressed');
  };

  const handleCommunity = () => {
    console.log('Community pressed');
  };

  const handleFeedback = () => {
    console.log('Feedback pressed');
  };

  const renderSupportItem = (
    title: string,
    description: string,
    onPress: () => void,
    icon: string,
    isPrimary?: boolean
  ) => (
    <TouchableOpacity 
      style={[styles.supportItem, isPrimary && styles.primaryItem]} 
      onPress={onPress}
    >
      <View style={styles.supportItemLeft}>
        <Ionicons 
          name={icon as any} 
          size={20} 
          color={isPrimary ? '#FFFFFF' : (colors.neutral?.[600] || '#757575')} 
        />
        <View style={styles.supportItemContent}>
          <Text style={[
            styles.supportItemTitle, 
            { color: isPrimary ? '#FFFFFF' : themeColors.text }
          ]}>
            {title}
          </Text>
          <Text style={[
            styles.supportItemDescription, 
            { color: isPrimary ? 'rgba(255, 255, 255, 0.8)' : themeColors.textSecondary }
          ]}>
            {description}
          </Text>
        </View>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={16} 
        color={isPrimary ? '#FFFFFF' : (colors.neutral?.[400] || '#BDBDBD')} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background?.primary || '#FFFFFF' }]}>
      <View style={styles.header}>
        <BackButton 
          onPress={handleBack} 
          size={20}
          style={styles.compactBackButton}
        />
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Help & Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Get Help</Text>
          
          {renderSupportItem(
            'Contact Support',
            'Get help from our support team',
            handleContactSupport,
            'headset-outline',
            true
          )}
          
          {renderSupportItem(
            'Frequently Asked Questions',
            'Find answers to common questions',
            handleFAQ,
            'help-circle-outline'
          )}
          
          {renderSupportItem(
            'User Guide',
            'Learn how to use LegacyKeep',
            handleUserGuide,
            'book-outline'
          )}
          
          {renderSupportItem(
            'Video Tutorials',
            'Watch step-by-step guides',
            handleVideoTutorials,
            'play-circle-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Community</Text>
          
          {renderSupportItem(
            'Community Forum',
            'Connect with other users',
            handleCommunity,
            'people-outline'
          )}
          
          {renderSupportItem(
            'Feature Requests',
            'Suggest new features',
            handleFeatureRequest,
            'bulb-outline'
          )}
          
          {renderSupportItem(
            'Feedback',
            'Share your thoughts about the app',
            handleFeedback,
            'chatbubble-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Report Issues</Text>
          
          {renderSupportItem(
            'Report a Bug',
            'Help us fix issues you encounter',
            handleReportBug,
            'bug-outline'
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Contact Information</Text>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={20} color={colors.neutral?.[600] || '#757575'} />
              <Text style={[styles.contactText, { color: themeColors.text }]}>
                support@legacykeep.com
              </Text>
            </View>
            
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={20} color={colors.neutral?.[600] || '#757575'} />
              <Text style={[styles.contactText, { color: themeColors.text }]}>
                +1 (555) 123-4567
              </Text>
            </View>
            
            <View style={styles.contactItem}>
              <Ionicons name="time-outline" size={20} color={colors.neutral?.[600] || '#757575'} />
              <Text style={[styles.contactText, { color: themeColors.text }]}>
                Mon-Fri 9AM-6PM EST
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral?.[200] || '#EEEEEE',
    minHeight: 48,
  },
  compactBackButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    marginHorizontal: spacing.md,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.lg,
    color: colors.neutral?.[600] || '#757575',
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral?.[100] || '#F5F5F5',
  },
  primaryItem: {
    backgroundColor: colors.primary?.[500] || '#007AFF',
    marginHorizontal: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  supportItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  supportItemContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  supportItemTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: 2,
  },
  supportItemDescription: {
    fontSize: typography.sizes.sm,
    lineHeight: 18,
  },
  contactInfo: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.neutral?.[50] || '#FAFAFA',
    borderRadius: 8,
    padding: spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  contactText: {
    fontSize: typography.sizes.md,
    marginLeft: spacing.sm,
  },
});

export default HelpSupportScreen;
