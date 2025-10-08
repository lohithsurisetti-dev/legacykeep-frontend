/**
 * Voice Screen Sample
 * Clean, premium design with teal theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

// Teal theme
const THEME = {
  primary: '#0d9488',
  light: '#CCFBF1',
  dark: '#0f766e',
};

const VoiceScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const voice = {
    title: 'Message for My Grandchildren',
    author: {
      name: 'Grandmother Kamala',
      age: 82,
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop&crop=face',
    },
    duration: '3:45',
    recordedDate: 'January 10, 2024',
    waveform: [0.3, 0.6, 0.8, 0.5, 0.9, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5, 0.7, 0.9, 0.6, 0.4],
    transcript: 'My dear grandchildren, I want you to know how much joy you bring to my life. Remember to always stay kind, work hard, and never forget where you came from. Your roots are your strength...',
    hearts: 67,
    saved: 45,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Message</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Author Card */}
        <View style={styles.authorCard}>
          <Image source={{ uri: voice.author.avatar }} style={styles.authorAvatar} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{voice.author.name}</Text>
            <Text style={styles.authorAge}>{voice.author.age} years old</Text>
          </View>
          <View style={[styles.durationBadge, { backgroundColor: THEME.light }]}>
            <Ionicons name="time" size={14} color={THEME.dark} />
            <Text style={[styles.durationText, { color: THEME.dark }]}>{voice.duration}</Text>
          </View>
        </View>

        {/* Voice Player Card */}
        <View style={styles.playerCard}>
          <Text style={styles.voiceTitle}>{voice.title}</Text>
          
          {/* Waveform Visualization */}
          <View style={styles.waveformContainer}>
            {voice.waveform.map((height, index) => (
              <View
                key={index}
                style={[
                  styles.waveformBar,
                  {
                    height: height * 60,
                    backgroundColor: isPlaying && index < 10 ? THEME.primary : '#E5E7EB'
                  }
                ]}
              />
            ))}
          </View>

          {/* Play Button */}
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: THEME.primary }]}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={32} 
              color="white" 
            />
          </TouchableOpacity>

          {/* Progress */}
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>0:00</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '35%', backgroundColor: THEME.primary }]} />
            </View>
            <Text style={styles.progressText}>{voice.duration}</Text>
          </View>
        </View>

        {/* Transcript */}
        <View style={styles.section}>
          <View style={styles.transcriptHeader}>
            <Ionicons name="document-text-outline" size={20} color={THEME.primary} />
            <Text style={styles.sectionTitle}>Transcript</Text>
          </View>
          <Text style={styles.transcriptText}>{voice.transcript}</Text>
        </View>

        {/* Recorded Date */}
        <View style={styles.infoCard}>
          <Ionicons name="calendar" size={18} color="#6B7280" />
          <Text style={styles.infoText}>Recorded on {voice.recordedDate}</Text>
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
            <Text style={styles.engagementText}>{voice.hearts}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="bookmark-outline" size={24} color="#9CA3AF" />
            <Text style={styles.engagementText}>{voice.saved}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.engagementButton}>
            <Ionicons name="share-outline" size={24} color="#9CA3AF" />
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
  authorCard: {
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
  authorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  authorInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  authorAge: {
    fontSize: 13,
    color: '#6B7280',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '700',
  },
  playerCard: {
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  voiceTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    gap: 3,
    marginBottom: spacing.lg,
  },
  waveformBar: {
    width: 3,
    borderRadius: 2,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: spacing.md,
  },
  progressText: {
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
  transcriptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  transcriptText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
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

export default VoiceScreen;
