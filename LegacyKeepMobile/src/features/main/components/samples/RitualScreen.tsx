/**
 * Ritual/Tradition Screen Sample
 * Clean, premium design with red theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

// Red theme
const THEME = {
  primary: '#EF4444',
  light: '#FEE2E2',
  dark: '#DC2626',
};

const RitualScreen = () => {
  const [isParticipating, setIsParticipating] = useState(false);

  const ritual = {
    title: 'Diwali Family Tradition',
    subtitle: 'Festival of Lights',
    origin: {
      startedBy: 'Great-Grandmother Kamala',
      year: '1952',
      generations: 4
    },
    coverImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=300&fit=crop',
    description: 'Every Diwali, our family gathers at the ancestral home to light 108 diyas together. Each family member lights their own diya while sharing a wish for the family.',
    whenCelebrated: 'Every year on Diwali night',
    steps: [
      { time: '5:00 PM', activity: 'Family arrives, elders prepare prayer area', icon: 'home' },
      { time: '6:00 PM', activity: 'Gathering in courtyard', icon: 'people' },
      { time: '6:30 PM', activity: 'Traditional prayer and blessing', icon: 'flower' },
      { time: '7:00 PM', activity: 'Light diyas and share wishes', icon: 'flame' },
      { time: '8:00 PM', activity: 'Traditional dinner together', icon: 'restaurant' },
    ],
    participants: 42,
    yearsActive: 72
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ritual</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <Image source={{ uri: ritual.coverImage }} style={styles.coverImage} />

        {/* Ritual Header */}
        <View style={styles.ritualHeader}>
          <View style={[styles.badge, { backgroundColor: THEME.light }]}>
            <Text style={[styles.badgeText, { color: THEME.dark }]}>Family Tradition</Text>
          </View>
          <Text style={styles.ritualTitle}>{ritual.title}</Text>
          <Text style={styles.ritualSubtitle}>{ritual.subtitle}</Text>
        </View>

        {/* Origin Card */}
        <View style={[styles.originCard, { backgroundColor: THEME.light }]}>
          <View style={styles.originRow}>
            <View style={styles.originItem}>
              <Text style={[styles.originLabel, { color: THEME.dark }]}>Started By</Text>
              <Text style={[styles.originValue, { color: THEME.dark }]}>{ritual.origin.startedBy}</Text>
            </View>
            <View style={[styles.originDivider, { backgroundColor: THEME.primary }]} />
            <View style={styles.originItem}>
              <Text style={[styles.originLabel, { color: THEME.dark }]}>Since</Text>
              <Text style={[styles.originValue, { color: THEME.dark }]}>{ritual.origin.year}</Text>
            </View>
            <View style={[styles.originDivider, { backgroundColor: THEME.primary }]} />
            <View style={styles.originItem}>
              <Text style={[styles.originLabel, { color: THEME.dark }]}>Generations</Text>
              <Text style={[styles.originValue, { color: THEME.dark }]}>{ritual.origin.generations}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.descriptionText}>{ritual.description}</Text>
        </View>

        {/* When Celebrated */}
        <View style={styles.infoCard}>
          <Ionicons name="calendar" size={20} color={THEME.primary} />
          <Text style={styles.infoText}>{ritual.whenCelebrated}</Text>
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Celebrate</Text>
          {ritual.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[styles.stepIcon, { backgroundColor: THEME.light }]}>
                <Ionicons name={step.icon as any} size={20} color={THEME.primary} />
              </View>
              <View style={styles.stepContent}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepActivity}>{step.activity}</Text>
                  <Text style={[styles.stepTime, { color: THEME.primary }]}>{step.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={28} color={THEME.primary} />
            <Text style={styles.statNumber}>{ritual.participants}</Text>
            <Text style={styles.statLabel}>Participants</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={28} color={THEME.primary} />
            <Text style={styles.statNumber}>{ritual.yearsActive}</Text>
            <Text style={styles.statLabel}>Years Active</Text>
          </View>
        </View>

        {/* Participate Button */}
        <TouchableOpacity 
          style={[
            styles.participateButton,
            { backgroundColor: isParticipating ? '#10B981' : THEME.primary }
          ]}
          onPress={() => setIsParticipating(!isParticipating)}
        >
          <Ionicons 
            name={isParticipating ? "checkmark-circle" : "add-circle-outline"} 
            size={20} 
            color="white" 
          />
          <Text style={styles.participateText}>
            {isParticipating ? 'Participating This Year' : 'Mark as Participating'}
          </Text>
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
  coverImage: {
    width: '100%',
    height: 200,
  },
  ritualHeader: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  ritualTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  ritualSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  originCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
  },
  originRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  originItem: {
    alignItems: 'center',
  },
  originLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  originValue: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  originDivider: {
    width: 1,
    opacity: 0.3,
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
  descriptionText: {
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
    color: '#374151',
    fontWeight: '600',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  stepIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepActivity: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
  },
  stepTime: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
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
    fontSize: 24,
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
  participateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  participateText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});

export default RitualScreen;