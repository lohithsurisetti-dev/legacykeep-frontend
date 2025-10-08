/**
 * Story Screen Sample
 * Clean, premium design with purple theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

// Purple theme
const THEME = {
  primary: '#8B5CF6',
  light: '#EDE9FE',
  dark: '#7C3AED',
};

const StoryScreen = () => {
  const [isLiked, setIsLiked] = useState(false);

  const story = {
    title: 'The Day We Almost Lost Everything',
    author: {
      name: 'Father Ramesh',
      age: 65,
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face',
    },
    coverImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=300&fit=crop',
    date: 'Summer 1985',
    readTime: '5 min',
    content: [
      'It was the summer of 1985, and our family business was on the verge of collapse. Your grandfather had just passed away, leaving me with debts I couldn\'t comprehend.',
      'I remember sitting in that small office, surrounded by unpaid bills. I was 28 years old, with a wife and two young children depending on me.',
      'But then I remembered something my father told me: "The true measure of a man is not in never falling, but in rising every time he falls."',
      'I gathered all 15 employees and told them the truth. Every single one volunteered to work without salary for three months. They believed in the vision.',
      'Those three months were the hardest of my life. We worked 16-hour days, took on any project we could find, and supported each other through every setback.',
      'By the end of that year, we had not only survived - we had thrived. Today, we employ over 200 people, all built on trust and determination.',
    ],
    lesson: 'True leadership is having the courage to be vulnerable and the determination to never give up.',
    hearts: 156,
    comments: 34,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Story</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <Image source={{ uri: story.coverImage }} style={styles.coverImage} />

        {/* Story Header */}
        <View style={styles.storyHeader}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          
          <View style={styles.metaRow}>
            <Image source={{ uri: story.author.avatar }} style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{story.author.name}</Text>
              <View style={styles.metaDetails}>
                <Text style={styles.metaText}>{story.date}</Text>
                <View style={styles.metaDot} />
                <Text style={styles.metaText}>{story.readTime}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Story Content */}
        <View style={styles.content}>
          {story.content.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>{paragraph}</Text>
          ))}
        </View>

        {/* Lesson Card */}
        <View style={[styles.lessonCard, { backgroundColor: THEME.light }]}>
          <View style={styles.lessonHeader}>
            <View style={[styles.lessonIcon, { backgroundColor: THEME.primary }]}>
              <Ionicons name="bulb" size={18} color="white" />
            </View>
            <Text style={[styles.lessonTitle, { color: THEME.dark }]}>Key Lesson</Text>
          </View>
          <Text style={[styles.lessonText, { color: THEME.dark }]}>{story.lesson}</Text>
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
            <Text style={styles.engagementText}>{story.hearts}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#9CA3AF" />
            <Text style={styles.engagementText}>{story.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="bookmark-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="share-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Add Comment */}
        <TouchableOpacity style={[styles.ctaButton, { backgroundColor: THEME.primary }]}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" />
          <Text style={styles.ctaText}>Share Your Thoughts</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  coverImage: {
    width: '100%',
    height: 200,
  },
  storyHeader: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    lineHeight: 32,
    marginBottom: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  metaDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  content: {
    padding: spacing.lg,
    backgroundColor: '#FAFAFA',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
    marginBottom: spacing.lg,
  },
  lessonCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  lessonText: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
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

export default StoryScreen;