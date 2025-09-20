/**
 * Quick Insights Bar Component
 * 
 * Displays birthday reminders, anniversaries, and upcoming events
 * Swipeable cards for multiple alerts with quick actions
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { typography, spacing, gradients } from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

// Types for different insight types
export interface BirthdayInsight {
  type: 'birthday';
  id: string;
  name: string;
  date: string;
  daysUntil: number;
  profileImage?: string;
  relationship?: string; // "Your daughter", "Mom", "Uncle"
}

export interface AnniversaryInsight {
  type: 'anniversary';
  id: string;
  name: string;
  partner: string;
  date: string;
  daysUntil: number;
  years?: number;
}

export interface EventInsight {
  type: 'event';
  id: string;
  event: string;
  date: string;
  daysUntil: number;
  location?: string;
  eventType?: 'family-gathering' | 'vacation' | 'milestone' | 'other';
}

export type InsightItem = BirthdayInsight | AnniversaryInsight | EventInsight;

interface QuickInsightsBarProps {
  insights: InsightItem[];
  onSendMessage?: (insight: InsightItem) => void;
  onCreateStory?: (insight: InsightItem) => void;
  onViewDetails?: (insight: InsightItem) => void;
}

const QuickInsightsBar: React.FC<QuickInsightsBarProps> = ({
  insights,
  onSendMessage,
  onCreateStory,
  onViewDetails,
}) => {
  const { colors, effectiveTheme } = useTheme();
  const { t } = useLanguage();
  const styles = createStyles(colors, effectiveTheme);
  
  // If no insights, show a minimal "no events" state
  if (insights.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t('main.home.quickInsights.noEvents')}</Text>
      </View>
    );
  }

  const getInsightText = (insight: InsightItem): string => {
    
    switch (insight.type) {
      case 'birthday':
        if (insight.daysUntil === 0) {
          return t('main.home.quickInsights.birthdayToday').replace('{name}', insight.name);
        } else if (insight.daysUntil === 1) {
          return t('main.home.quickInsights.birthdayTomorrow').replace('{name}', insight.name);
        } else {
          return t('main.home.quickInsights.birthdayDays')
            .replace('{name}', insight.name)
            .replace('{days}', insight.daysUntil.toString());
        }
      
      case 'anniversary':
        if (insight.daysUntil === 0) {
          return t('main.home.quickInsights.anniversaryToday')
            .replace('{name}', insight.name)
            .replace('{partner}', insight.partner);
        } else {
          return t('main.home.quickInsights.anniversaryDays')
            .replace('{name}', insight.name)
            .replace('{partner}', insight.partner)
            .replace('{days}', insight.daysUntil.toString());
        }
      
      case 'event':
        if (insight.daysUntil === 0) {
          return t('main.home.quickInsights.eventToday').replace('{event}', insight.event);
        } else {
          return t('main.home.quickInsights.eventDays')
            .replace('{event}', insight.event)
            .replace('{days}', insight.daysUntil.toString());
        }
      
      default:
        return '';
    }
  };

  const getInsightIcon = (insight: InsightItem): string => {
    switch (insight.type) {
      case 'birthday':
        return insight.daysUntil === 0 ? 'gift' : 'calendar';
      case 'anniversary':
        return insight.daysUntil === 0 ? 'heart' : 'heart-outline';
      case 'event':
        return 'calendar-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getInsightColor = (insight: InsightItem): string => {
    if (insight.daysUntil === 0) {
      return colors.error; // Today - urgent red
    } else if (insight.daysUntil <= 3) {
      return colors.warning; // Soon - warning amber
    } else {
      return colors.primary; // Future - calm teal
    }
  };

  const renderInsightCard = (insight: InsightItem) => {
    const iconColor = getInsightColor(insight);
    const isUrgent = insight.daysUntil === 0;
    
    const cardContent = (
      <View style={styles.insightContent}>
        {/* Icon and main text */}
        <View style={styles.insightHeader}>
          <View style={[styles.insightIconContainer, { backgroundColor: `${iconColor}15` }]}>
            <Ionicons name={getInsightIcon(insight) as any} size={20} color={iconColor} />
          </View>
          <View style={styles.insightTextContainer}>
            <Text style={styles.insightText} numberOfLines={2} ellipsizeMode="tail">
              {getInsightText(insight)}
            </Text>
            {insight.type === 'birthday' && insight.relationship && (
              <Text style={styles.relationshipText} numberOfLines={1} ellipsizeMode="tail">
                {insight.relationship}
              </Text>
            )}
            {insight.type === 'event' && insight.location && (
              <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                {insight.location}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
    
    return (
      <View key={insight.id} style={styles.insightCard}>
        {effectiveTheme === 'dark' ? (
          // Dark mode: Simple border
          <View style={[styles.insightBorderDark, isUrgent && styles.urgentBorder]}>
            {cardContent}
          </View>
        ) : (
          // Light mode: Gradient border
          <LinearGradient
            colors={isUrgent ? [colors.error, colors.warning] : gradients.peacock}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insightBorderLight}
          >
            {cardContent}
          </LinearGradient>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {insights.map(renderInsightCard)}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any, theme: any) => StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: spacing.xs,
    gap: spacing.xs,
  },
  // Empty state
  emptyContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.sizes.sm,
    color: colors.textTertiary,
    fontStyle: 'italic',
  },
  // Insight card styles
  insightCard: {
    width: 260, // More compact width
    height: 70, // More compact height
  },
  // Light mode: Gradient border
  insightBorderLight: {
    borderRadius: 12,
    padding: 1, // Creates gradient border effect
    height: '100%',
  },
  // Dark mode: Subtle border
  insightBorderDark: {
    borderRadius: 12,
    height: '100%',
    borderWidth: 1,
    borderColor: colors.border, // Subtle border in dark mode
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  urgentBorder: {
    borderColor: colors.error, // Red border for urgent items
    borderWidth: 2,
    shadowColor: colors.error,
    shadowOpacity: 0.2,
  },
  insightContent: {
    backgroundColor: colors.surface,
    borderRadius: theme === 'dark' ? 11 : 11, // Same radius for both themes
    padding: spacing.sm,
    height: '100%',
    justifyContent: 'center', // Center content vertically
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    flexShrink: 0, // Prevent shrinking
  },
  insightTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  insightText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    lineHeight: 18,
  },
  relationshipText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 1,
    lineHeight: 14,
  },
  locationText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 1,
    lineHeight: 14,
  },
});

export default QuickInsightsBar;
