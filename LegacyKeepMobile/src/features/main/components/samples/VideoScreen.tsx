/**
 * Video Screen Sample
 * Clean, premium design with red theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

const { width } = Dimensions.get('window');

// Red theme
const THEME = {
  primary: '#dc2626',
  light: '#FEE2E2',
  dark: '#b91c1c',
};

const VideoScreen = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const video = {
    title: 'Grandfather\'s Life Advice',
    author: {
      name: 'Grandfather Kumar',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&crop=face',
    },
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=450&fit=crop',
    duration: '5:32',
    uploadedDate: 'March 1, 2024',
    views: 234,
    description: 'In this heartfelt video, Grandfather shares his most valuable life lessons learned over 78 years. A must-watch for every family member.',
    category: 'Life Lessons',
    tags: ['Wisdom', 'Family', 'Life Advice'],
    hearts: 156,
    comments: 45,
    shares: 23,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: THEME.primary }]}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={40} 
              color="white" 
            />
          </TouchableOpacity>
          
          {/* Duration Badge */}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{video.duration}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.videoProgress}>
            <View style={[styles.videoProgressFill, { width: '40%', backgroundColor: THEME.primary }]} />
          </View>
        </View>

        {/* Video Info */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{video.title}</Text>

          <View style={styles.authorRow}>
            <Image source={{ uri: video.author.avatar }} style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{video.author.name}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="eye-outline" size={12} color="#6B7280" />
                <Text style={styles.metaText}>{video.views} views</Text>
                <View style={styles.metaDot} />
                <Text style={styles.metaText}>{video.uploadedDate}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.categoryBadge, { backgroundColor: THEME.light }]}>
            <Ionicons name="folder-outline" size={14} color={THEME.dark} />
            <Text style={[styles.categoryText, { color: THEME.dark }]}>{video.category}</Text>
          </View>

          <Text style={styles.description}>{video.description}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {video.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: THEME.light }]}>
                <Text style={[styles.tagText, { color: THEME.dark }]}>#{tag}</Text>
              </View>
            ))}
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
            <Text style={styles.engagementText}>{video.hearts}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#9CA3AF" />
            <Text style={styles.engagementText}>{video.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="share-outline" size={24} color="#9CA3AF" />
            <Text style={styles.engagementText}>{video.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="bookmark-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

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
  videoContainer: {
    height: 240,
    backgroundColor: '#000',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -40,
    marginLeft: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  videoProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  videoProgressFill: {
    height: '100%',
  },
  videoInfo: {
    backgroundColor: 'white',
    padding: spacing.lg,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    marginBottom: spacing.md,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
    marginBottom: spacing.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
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
  actionsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  actionButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
    backgroundColor: 'white',
    borderWidth: 2,
  },
  actionTextSecondary: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default VideoScreen;
