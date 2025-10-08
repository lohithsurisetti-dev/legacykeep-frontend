/**
 * Wisdom Screen Sample
 * Clean, premium design with gold theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

// Gold theme
const THEME = {
  primary: '#F59E0B',
  light: '#FEF3C7',
  dark: '#D97706',
};

const WisdomScreen = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const wisdom = {
    elder: {
      name: 'Grandfather Kumar',
      age: 78,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&crop=face',
    },
    title: 'On Building Lasting Relationships',
    content: 'In my 78 years, I\'ve learned that the strongest bonds are built not in moments of celebration, but in times of quiet understanding. Listen more than you speak, forgive faster than you judge, and never let pride stand between you and the people you love.',
    category: 'Life Lessons',
    date: '2 days ago',
    hearts: 47,
    reflections: 12
  };

  return (
    <View style={styles.container}>
      {/* Simple Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wisdom</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Elder Card - Clean */}
        <View style={styles.elderCard}>
          <Image source={{ uri: wisdom.elder.avatar }} style={styles.elderAvatar} />
          <View style={styles.elderInfo}>
            <Text style={styles.elderName}>{wisdom.elder.name}</Text>
            <Text style={styles.elderAge}>{wisdom.elder.age} years</Text>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: THEME.light }]}>
            <Text style={[styles.categoryText, { color: THEME.dark }]}>{wisdom.category}</Text>
          </View>
        </View>

        {/* Wisdom Content - Simple Card */}
        <View style={styles.contentCard}>
          <Text style={styles.wisdomTitle}>{wisdom.title}</Text>
          <View style={[styles.divider, { backgroundColor: THEME.primary }]} />
          <Text style={styles.wisdomText}>{wisdom.content}</Text>
        </View>

        {/* Engagement Bar - Minimal */}
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
            <Text style={styles.engagementText}>{wisdom.hearts}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#9CA3AF" />
            <Text style={styles.engagementText}>{wisdom.reflections}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.engagementButton}
            onPress={() => setIsSaved(!isSaved)}
          >
            <Ionicons 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color={isSaved ? THEME.primary : "#9CA3AF"} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="share-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Add Reflection - Simple CTA */}
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: THEME.primary }]}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.ctaText}>Add Your Reflection</Text>
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
  elderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  elderAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  elderInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  elderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  elderAge: {
    fontSize: 13,
    color: '#6B7280',
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
  },
  contentCard: {
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
  wisdomTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
    lineHeight: 28,
  },
  divider: {
    height: 3,
    width: 40,
    borderRadius: 2,
    marginBottom: spacing.lg,
  },
  wisdomText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
  },
  engagementBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
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
  engagementText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
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

export default WisdomScreen;