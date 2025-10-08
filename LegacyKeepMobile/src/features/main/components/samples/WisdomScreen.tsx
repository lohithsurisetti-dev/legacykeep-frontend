/**
 * Wisdom Screen Sample
 * Premium design for elder wisdom sharing
 */

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '../../../../shared/constants';

const WisdomScreen = () => {
  const wisdomPost = {
    elder: {
      name: 'Grandfather Kumar',
      age: 78,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&crop=face',
      relationship: 'Grandfather'
    },
    wisdom: {
      title: 'On Building Lasting Relationships',
      content: 'In my 78 years, I\'ve learned that the strongest bonds are built not in moments of celebration, but in times of quiet understanding. Listen more than you speak, forgive faster than you judge, and never let pride stand between you and the people you love.',
      category: 'Life Lessons',
      tags: ['Relationships', 'Family', 'Communication'],
      sharedDate: '2 days ago',
      context: 'Shared during family dinner discussion'
    },
    engagement: {
      hearts: 47,
      saved: 23,
      shared: 12,
      reflections: [
        { name: 'Priya', text: 'This changed my perspective completely' },
        { name: 'Rajesh', text: 'Needed to hear this today, thank you Grandpa' }
      ]
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Elder Wisdom</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Elder Profile Card */}
        <View style={styles.elderCard}>
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.elderGradient}
          >
            <Image source={{ uri: wisdomPost.elder.avatar }} style={styles.elderAvatar} />
            <View style={styles.elderInfo}>
              <Text style={styles.elderName}>{wisdomPost.elder.name}</Text>
              <Text style={styles.elderAge}>{wisdomPost.elder.age} years of wisdom</Text>
            </View>
            <View style={styles.wisdomBadge}>
              <Ionicons name="sparkles" size={16} color="#F59E0B" />
            </View>
          </LinearGradient>
        </View>

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Ionicons name="book-outline" size={14} color="#8B5CF6" />
          <Text style={styles.categoryText}>{wisdomPost.wisdom.category}</Text>
        </View>

        {/* Wisdom Title */}
        <Text style={styles.wisdomTitle}>{wisdomPost.wisdom.title}</Text>

        {/* Wisdom Content */}
        <View style={styles.wisdomContentCard}>
          <View style={styles.quoteIconTop}>
            <Ionicons name="chatbox-ellipses" size={24} color="#F59E0B" />
          </View>
          <Text style={styles.wisdomText}>{wisdomPost.wisdom.content}</Text>
          <View style={styles.quoteIconBottom}>
            <Ionicons name="chatbox-ellipses" size={24} color="#F59E0B" style={{ transform: [{ rotate: '180deg' }] }} />
          </View>
        </View>

        {/* Context */}
        <View style={styles.contextCard}>
          <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
          <Text style={styles.contextText}>{wisdomPost.wisdom.context}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {wisdomPost.wisdom.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        {/* Engagement Stats */}
        <View style={styles.engagementRow}>
          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="heart" size={24} color="#EF4444" />
            <Text style={styles.engagementText}>{wisdomPost.engagement.hearts}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="bookmark" size={24} color="#F59E0B" />
            <Text style={styles.engagementText}>{wisdomPost.engagement.saved}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="share-social" size={24} color="#3B82F6" />
            <Text style={styles.engagementText}>{wisdomPost.engagement.shared}</Text>
          </TouchableOpacity>
        </View>

        {/* Reflections Section */}
        <View style={styles.reflectionsSection}>
          <Text style={styles.reflectionsTitle}>Family Reflections</Text>
          {wisdomPost.engagement.reflections.map((reflection, index) => (
            <View key={index} style={styles.reflectionCard}>
              <View style={styles.reflectionHeader}>
                <Text style={styles.reflectionName}>{reflection.name}</Text>
                <Ionicons name="heart-outline" size={16} color="#9CA3AF" />
              </View>
              <Text style={styles.reflectionText}>{reflection.text}</Text>
            </View>
          ))}
        </View>

        {/* Add Your Reflection */}
        <TouchableOpacity style={styles.addReflectionButton}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addReflectionGradient}
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text style={styles.addReflectionText}>Add Your Reflection</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  moreButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  elderCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  elderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  elderAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
  },
  elderInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  elderName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  elderAge: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  wisdomBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    gap: 6,
    marginBottom: spacing.md,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  wisdomTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.lg,
    lineHeight: 32,
  },
  wisdomContentCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  quoteIconTop: {
    marginBottom: spacing.md,
  },
  wisdomText: {
    fontSize: 17,
    lineHeight: 28,
    color: '#374151',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  quoteIconBottom: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
  },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(107, 114, 128, 0.08)',
    padding: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  contextText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
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
  engagementRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.xl,
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
  engagementText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  reflectionsSection: {
    marginBottom: spacing.xl,
  },
  reflectionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  reflectionCard: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: '#8B5CF6',
  },
  reflectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  reflectionName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  reflectionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  addReflectionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  addReflectionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  addReflectionText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

export default WisdomScreen;
