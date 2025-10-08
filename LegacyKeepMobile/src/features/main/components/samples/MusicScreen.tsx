/**
 * Music Screen Sample
 * Clean, premium design with purple theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

// Purple theme
const THEME = {
  primary: '#7c3aed',
  light: '#EDE9FE',
  dark: '#6b21a8',
};

const MusicScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const music = {
    title: 'Grandfather\'s Favorite Song',
    subtitle: 'Traditional Folk Song',
    author: {
      name: 'Recorded by Priya',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    },
    albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    duration: '4:23',
    recordedDate: 'December 2023',
    story: 'This was Grandfather\'s favorite song. He would sing it every morning while tending to his garden. We recorded this version during last year\'s family gathering.',
    lyrics: [
      'First verse of the traditional song...',
      'Second verse with beautiful melody...',
      'Chorus that brings everyone together...',
      'Final verse with powerful message...'
    ],
    genre: 'Traditional Folk',
    language: 'Malayalam',
    hearts: 92,
    plays: 456,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Music</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Album Art & Player */}
        <View style={styles.playerSection}>
          <View style={styles.albumArtContainer}>
            <Image source={{ uri: music.albumArt }} style={styles.albumArt} />
          </View>

          <Text style={styles.musicTitle}>{music.title}</Text>
          <Text style={styles.musicSubtitle}>{music.subtitle}</Text>

          <View style={styles.authorRow}>
            <Image source={{ uri: music.author.avatar }} style={styles.authorAvatar} />
            <Text style={styles.authorName}>{music.author.name}</Text>
          </View>

          {/* Player Controls */}
          <View style={styles.playerControls}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="play-skip-back" size={28} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.playButtonLarge, { backgroundColor: THEME.primary }]}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={36} 
                color="white" 
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="play-skip-forward" size={28} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressTime}>1:45</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%', backgroundColor: THEME.primary }]} />
            </View>
            <Text style={styles.progressTime}>{music.duration}</Text>
          </View>
        </View>

        {/* Story */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story Behind the Song</Text>
          <Text style={styles.storyText}>{music.story}</Text>
        </View>

        {/* Details */}
        <View style={styles.detailsRow}>
          <View style={[styles.detailCard, { backgroundColor: THEME.light }]}>
            <Ionicons name="musical-notes" size={20} color={THEME.primary} />
            <Text style={[styles.detailText, { color: THEME.dark }]}>{music.genre}</Text>
          </View>
          <View style={[styles.detailCard, { backgroundColor: THEME.light }]}>
            <Ionicons name="language" size={20} color={THEME.primary} />
            <Text style={[styles.detailText, { color: THEME.dark }]}>{music.language}</Text>
          </View>
        </View>

        {/* Lyrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lyrics</Text>
          {music.lyrics.map((line, index) => (
            <Text key={index} style={styles.lyricLine}>{line}</Text>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={24} color={THEME.primary} />
            <Text style={styles.statNumber}>{music.hearts}</Text>
            <Text style={styles.statLabel}>Hearts</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="play-circle" size={24} color={THEME.primary} />
            <Text style={styles.statNumber}>{music.plays}</Text>
            <Text style={styles.statLabel}>Plays</Text>
          </View>
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
  playerSection: {
    backgroundColor: 'white',
    padding: spacing.xl,
    alignItems: 'center',
  },
  albumArtContainer: {
    width: 240,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  albumArt: {
    width: '100%',
    height: '100%',
  },
  musicTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  musicSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginBottom: spacing.lg,
  },
  controlButton: {
    padding: spacing.sm,
  },
  playButtonLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: spacing.md,
  },
  progressTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  storyText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
  },
  detailsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  detailCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '700',
  },
  lyricLine: {
    fontSize: 15,
    lineHeight: 28,
    color: '#6B7280',
    marginBottom: spacing.sm,
    fontStyle: 'italic',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    gap: spacing.md,
  },
  statItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
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
  },
});

export default MusicScreen;
