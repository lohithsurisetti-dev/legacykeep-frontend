/**
 * Story Screen Sample
 * Engaging narrative display for family stories
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '../../../../shared/constants';

const { width } = Dimensions.get('window');

const StoryScreen = () => {
  const [isLiked, setIsLiked] = useState(false);

  const story = {
    title: 'The Day We Almost Lost Everything',
    author: {
      name: 'Father Ramesh',
      age: 65,
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face',
      relationship: 'Father'
    },
    coverImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop',
    date: 'Summer of 1985',
    readTime: '5 min read',
    category: 'Life Lessons',
    content: [
      'It was the summer of 1985, and our family business was on the verge of collapse. Your grandfather had just passed away, leaving me with debts I couldn\'t comprehend and responsibilities I wasn\'t ready for.',
      'I remember sitting in that small office, surrounded by unpaid bills and worried employees. I was 28 years old, with a wife and two young children depending on me. The easy choice would have been to sell everything and start fresh.',
      'But then I remembered something my father told me on his deathbed: "The true measure of a man is not in never falling, but in rising every time he falls."',
      'So I made a decision. I gathered all our employees - all 15 of them - and told them the truth. I shared our financial situation, my fears, and my determination to save what my father had built.',
      'What happened next changed my life forever. Every single employee volunteered to work without salary for three months. They believed in the vision, in the family legacy, and in each other.',
      'Those three months were the hardest of my life. We worked 16-hour days, took on any project we could find, and supported each other through every setback. Your mother would pack lunch for everyone, and we\'d eat together, planning our next move.',
      'By the end of that year, not only had we survived - we had thrived. The business grew stronger than ever, built on a foundation of trust, sacrifice, and unwavering belief in each other.',
      'Today, when I see our family business employing over 200 people, I remember those 15 brave souls who bet everything on a scared young man\'s promise. That\'s the power of loyalty, of family, and of never giving up.'
    ],
    lesson: 'True leadership is not about having all the answers. It\'s about having the courage to be vulnerable, the wisdom to trust others, and the determination to never give up on what matters.',
    engagement: {
      hearts: 156,
      comments: 34,
      shared: 28,
      saved: 89
    },
    tags: ['Family Business', 'Perseverance', 'Leadership', '1980s']
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Family Story</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: story.coverImage }} style={styles.coverImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
            style={styles.coverGradient}
          >
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{story.category}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Story Header */}
        <View style={styles.storyHeader}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.authorInfo}>
              <Image source={{ uri: story.author.avatar }} style={styles.authorAvatar} />
              <View>
                <Text style={styles.authorName}>{story.author.name}</Text>
                <Text style={styles.authorAge}>{story.author.age} years old</Text>
              </View>
            </View>
            
            <View style={styles.storyMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                <Text style={styles.metaText}>{story.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color="#6B7280" />
                <Text style={styles.metaText}>{story.readTime}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Story Content */}
        <View style={styles.storyContent}>
          {story.content.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Lesson Card */}
        <View style={styles.lessonCard}>
          <View style={styles.lessonHeader}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.lessonIconContainer}
            >
              <Ionicons name="bulb" size={20} color="white" />
            </LinearGradient>
            <Text style={styles.lessonTitle}>Key Lesson</Text>
          </View>
          <Text style={styles.lessonText}>{story.lesson}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {story.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        {/* Engagement Bar */}
        <View style={styles.engagementBar}>
          <TouchableOpacity 
            style={styles.engagementButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={26} 
              color={isLiked ? "#EF4444" : "#6B7280"} 
            />
            <Text style={[styles.engagementCount, isLiked && styles.engagementCountActive]}>
              {story.engagement.hearts}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="chatbubble-outline" size={26} color="#6B7280" />
            <Text style={styles.engagementCount}>{story.engagement.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="bookmark-outline" size={26} color="#6B7280" />
            <Text style={styles.engagementCount}>{story.engagement.saved}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="share-social-outline" size={26} color="#6B7280" />
            <Text style={styles.engagementCount}>{story.engagement.shared}</Text>
          </TouchableOpacity>
        </View>

        {/* Add Comment */}
        <TouchableOpacity style={styles.addCommentButton}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addCommentGradient}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" />
            <Text style={styles.addCommentText}>Share Your Thoughts</Text>
          </LinearGradient>
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
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  shareButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
  },
  coverContainer: {
    height: 240,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  storyHeader: {
    padding: spacing.lg,
    backgroundColor: 'white',
  },
  storyTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    lineHeight: 36,
    marginBottom: spacing.lg,
  },
  metaRow: {
    gap: spacing.md,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  authorAge: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  storyMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  storyContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: '#FAFAFA',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
    color: '#374151',
    marginBottom: spacing.lg,
    textAlign: 'justify',
  },
  lessonCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: '#E9D5FF',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  lessonIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#8B5CF6',
  },
  lessonText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4B5563',
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  tag: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  engagementBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  engagementButton: {
    alignItems: 'center',
    gap: 6,
  },
  engagementCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  engagementCountActive: {
    color: '#EF4444',
  },
  addCommentButton: {
    marginHorizontal: spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  addCommentGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  addCommentText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

export default StoryScreen;
