/**
 * Photo Screen Sample
 * Clean, premium design with green theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

const { width } = Dimensions.get('window');

// Green theme
const THEME = {
  primary: '#059669',
  light: '#D1FAE5',
  dark: '#047857',
};

const PhotoScreen = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const photo = {
    title: 'Family Reunion 2024',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    images: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    ],
    date: 'March 15, 2024',
    location: 'Ancestral Home, Kerala',
    caption: 'After 5 years, the entire family came together. Three generations under one roof, sharing stories, laughter, and love. These moments are what legacy is all about.',
    tags: ['Family', 'Reunion', 'Kerala', '2024'],
    hearts: 89,
    comments: 23,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Photo</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Photo Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {photo.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ScrollView>
          
          {/* Image Counter */}
          {photo.images.length > 1 && (
            <View style={styles.imageCounter}>
              <Text style={styles.imageCounterText}>
                {currentImageIndex + 1}/{photo.images.length}
              </Text>
            </View>
          )}
        </View>

        {/* Photo Info */}
        <View style={styles.photoInfo}>
          <View style={styles.authorRow}>
            <Image source={{ uri: photo.author.avatar }} style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{photo.author.name}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="calendar-outline" size={12} color="#6B7280" />
                <Text style={styles.metaText}>{photo.date}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.photoTitle}>{photo.title}</Text>

          {/* Location */}
          <View style={[styles.locationCard, { backgroundColor: THEME.light }]}>
            <Ionicons name="location" size={18} color={THEME.primary} />
            <Text style={[styles.locationText, { color: THEME.dark }]}>{photo.location}</Text>
          </View>

          {/* Caption */}
          <Text style={styles.caption}>{photo.caption}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {photo.tags.map((tag, index) => (
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
            <Text style={styles.engagementText}>{photo.hearts}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#9CA3AF" />
            <Text style={styles.engagementText}>{photo.comments}</Text>
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
          <Text style={styles.ctaText}>Add Comment</Text>
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 400,
    backgroundColor: '#E5E7EB',
  },
  imageCounter: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  photoInfo: {
    backgroundColor: 'white',
    padding: spacing.lg,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  photoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    marginBottom: spacing.md,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '700',
  },
  caption: {
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

export default PhotoScreen;
