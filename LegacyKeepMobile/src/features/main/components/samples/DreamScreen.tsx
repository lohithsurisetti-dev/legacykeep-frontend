/**
 * Dream Vault Screen Sample
 * Clean, premium design with indigo theme
 * AI-powered dream visualization
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

const { width } = Dimensions.get('window');

// Indigo/Dream theme
const THEME = {
  primary: '#4F46E5',
  light: '#E0E7FF',
  dark: '#3730A3',
};

const DreamScreen = () => {
  const [currentVisualization, setCurrentVisualization] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const dream = {
    title: 'Flying Over Mountains',
    dreamer: {
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    date: 'Last night, 3:24 AM',
    dreamDate: 'March 15, 2024',
    content: 'I was flying over snow-capped mountains, feeling completely free. The sky was a mix of purple and orange, like sunset and sunrise happening together. Below me, I could see a small village where my family was waving at me. I felt peaceful and happy, like all my worries had disappeared.',
    mood: 'Peaceful',
    tags: ['Flying', 'Mountains', 'Family', 'Freedom'],
    aiVisualizations: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&h=600&fit=crop',
    ],
    aiInsights: {
      meaning: 'Flying dreams often represent a desire for freedom and escape from daily pressures. The presence of family suggests you value their support.',
      emotions: ['Peace', 'Joy', 'Freedom', 'Connection'],
      symbols: [
        { symbol: 'Mountains', meaning: 'Challenges overcome' },
        { symbol: 'Flying', meaning: 'Liberation and control' },
        { symbol: 'Family', meaning: 'Support system' },
      ]
    },
    recurring: false,
    dreamCount: 47,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dream Vault</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* AI Visualizations Gallery */}
        <View style={styles.visualizationsContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentVisualization(index);
            }}
          >
            {dream.aiVisualizations.map((image, index) => (
              <View key={index} style={styles.visualizationSlide}>
                <Image source={{ uri: image }} style={styles.visualizationImage} />
                <View style={styles.aiGeneratedBadge}>
                  <Ionicons name="sparkles" size={12} color={THEME.primary} />
                  <Text style={[styles.aiGeneratedText, { color: THEME.primary }]}>AI Generated</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          
          {/* Image Counter */}
          <View style={styles.visualizationCounter}>
            {dream.aiVisualizations.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.counterDot,
                  index === currentVisualization && { backgroundColor: THEME.primary }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Dream Header */}
        <View style={styles.dreamHeader}>
          <View style={styles.titleRow}>
            <View style={[styles.moodBadge, { backgroundColor: THEME.light }]}>
              <Ionicons name="happy-outline" size={14} color={THEME.dark} />
              <Text style={[styles.moodText, { color: THEME.dark }]}>{dream.mood}</Text>
            </View>
            <Text style={styles.dreamDate}>{dream.date}</Text>
          </View>

          <Text style={styles.dreamTitle}>{dream.title}</Text>

          <View style={styles.dreamerRow}>
            <Image source={{ uri: dream.dreamer.avatar }} style={styles.dreamerAvatar} />
            <View>
              <Text style={styles.dreamerName}>{dream.dreamer.name}</Text>
              <Text style={styles.dreamDateFull}>{dream.dreamDate}</Text>
            </View>
          </View>
        </View>

        {/* Dream Content */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="moon" size={20} color={THEME.primary} />
            <Text style={styles.sectionTitle}>Your Dream</Text>
          </View>
          <Text style={styles.dreamContent}>{dream.content}</Text>
        </View>

        {/* AI Insights */}
        <View style={[styles.insightsCard, { backgroundColor: THEME.light }]}>
          <View style={styles.insightsHeader}>
            <View style={[styles.aiIcon, { backgroundColor: THEME.primary }]}>
              <Ionicons name="bulb" size={20} color="white" />
            </View>
            <Text style={[styles.insightsTitle, { color: THEME.dark }]}>AI Insights</Text>
          </View>
          <Text style={[styles.insightsMeaning, { color: THEME.dark }]}>{dream.aiInsights.meaning}</Text>
          
          {/* Emotions */}
          <View style={styles.emotionsContainer}>
            {dream.aiInsights.emotions.map((emotion, index) => (
              <View key={index} style={[styles.emotionChip, { backgroundColor: 'white' }]}>
                <Text style={[styles.emotionText, { color: THEME.primary }]}>{emotion}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Dream Symbols */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dream Symbols</Text>
          {dream.aiInsights.symbols.map((symbol, index) => (
            <View key={index} style={styles.symbolItem}>
              <View style={[styles.symbolIcon, { backgroundColor: THEME.light }]}>
                <Ionicons name="star" size={16} color={THEME.primary} />
              </View>
              <View style={styles.symbolContent}>
                <Text style={styles.symbolName}>{symbol.symbol}</Text>
                <Text style={styles.symbolMeaning}>{symbol.meaning}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {dream.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: THEME.light }]}>
              <Text style={[styles.tagText, { color: THEME.dark }]}>#{tag}</Text>
            </View>
          ))}
        </View>

        {/* Dream Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Ionicons name="moon" size={24} color={THEME.primary} />
            <Text style={styles.statNumber}>{dream.dreamCount}</Text>
            <Text style={styles.statLabel}>Dreams Recorded</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name={dream.recurring ? "repeat" : "checkmark-circle"} size={24} color={THEME.primary} />
            <Text style={styles.statNumber}>{dream.recurring ? 'Yes' : 'No'}</Text>
            <Text style={styles.statLabel}>Recurring</Text>
          </View>
        </View>

        {/* Engagement */}
        <View style={styles.engagementBar}>
          <TouchableOpacity 
            style={styles.engagementButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={24} 
              color={isLiked ? THEME.primary : "#9CA3AF"} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="bookmark-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="share-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="refresh-outline" size={24} color={THEME.primary} />
          </TouchableOpacity>
        </View>

        {/* Regenerate Button */}
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: THEME.primary }]}>
          <Ionicons name="sparkles" size={20} color="white" />
          <Text style={styles.ctaText}>Regenerate Visualization</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  visualizationsContainer: {
    height: 320,
    position: 'relative',
    backgroundColor: '#000',
  },
  visualizationSlide: {
    width: width,
    height: 320,
    position: 'relative',
  },
  visualizationImage: {
    width: '100%',
    height: '100%',
  },
  aiGeneratedBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  aiGeneratedText: {
    fontSize: 11,
    fontWeight: '700',
  },
  visualizationCounter: {
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  counterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dreamHeader: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dreamDate: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  dreamTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  dreamerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dreamerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dreamerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  dreamDateFull: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  dreamContent: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
  },
  insightsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  aiIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  insightsMeaning: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  emotionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
  },
  emotionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  symbolItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  symbolIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolContent: {
    flex: 1,
  },
  symbolName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  symbolMeaning: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.xl,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: spacing.xs,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  engagementBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  engagementButton: {
    alignItems: 'center',
    gap: 4,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});

export default DreamScreen;
