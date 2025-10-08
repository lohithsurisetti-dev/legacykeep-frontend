/**
 * Ritual/Tradition Screen Sample
 * Cultural heritage and family traditions
 */

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '../../../../shared/constants';

const { width } = Dimensions.get('window');

const RitualScreen = () => {
  const ritual = {
    title: 'Diwali Family Tradition',
    subtitle: 'Annual Festival of Lights Celebration',
    origin: {
      startedBy: 'Great-Grandmother Kamala',
      year: '1952',
      generations: 4
    },
    coverImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=400&fit=crop',
    description: 'Every Diwali, our family gathers at the ancestral home to light 108 diyas together. Each family member lights their own diya while sharing a wish for the family. This tradition started when our great-grandmother wanted to ensure the family stays connected despite growing distances.',
    significance: 'The 108 diyas represent the 108 family members who have been part of our lineage. Each light symbolizes a life, a story, and a connection that transcends time.',
    whenCelebrated: 'Every year on Diwali night',
    whoParticipates: 'All family members, from youngest to eldest',
    ritualSteps: [
      {
        step: 'Preparation',
        description: 'Family members arrive by sunset. Elders prepare the prayer area.',
        time: '5:00 PM',
        icon: 'home'
      },
      {
        step: 'Gathering',
        description: 'Everyone gathers in the courtyard. Youngest members distribute diyas.',
        time: '6:00 PM',
        icon: 'people'
      },
      {
        step: 'Prayer',
        description: 'Eldest family member leads the traditional prayer and blessing.',
        time: '6:30 PM',
        icon: 'flower'
      },
      {
        step: 'Lighting',
        description: 'Each person lights their diya and shares their wish for the family.',
        time: '7:00 PM',
        icon: 'flame'
      },
      {
        step: 'Feast',
        description: 'Traditional dinner prepared by all the women in the family.',
        time: '8:00 PM',
        icon: 'restaurant'
      },
      {
        step: 'Stories',
        description: 'Elders share stories of past celebrations and family history.',
        time: '9:00 PM',
        icon: 'book'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1609166214994-502d326bafee?w=300&h=300&fit=crop'
    ],
    participants: 42,
    yearsActive: 72
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.imageHeader}>
        <Image source={{ uri: ritual.coverImage }} style={styles.coverImage} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.headerGradient}
        >
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={styles.traditionBadge}>
              <Ionicons name="sparkles" size={16} color="#F59E0B" />
              <Text style={styles.traditionBadgeText}>Family Tradition</Text>
            </View>
            <Text style={styles.headerTitle}>{ritual.title}</Text>
            <Text style={styles.headerSubtitle}>{ritual.subtitle}</Text>
          </View>
        </LinearGradient>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Origin Card */}
        <View style={styles.originCard}>
          <LinearGradient
            colors={['#F59E0B', '#D97706']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.originGradient}
          >
            <View style={styles.originRow}>
              <View style={styles.originItem}>
                <Text style={styles.originLabel}>Started By</Text>
                <Text style={styles.originValue}>{ritual.origin.startedBy}</Text>
              </View>
              <View style={styles.originDivider} />
              <View style={styles.originItem}>
                <Text style={styles.originLabel}>Since</Text>
                <Text style={styles.originValue}>{ritual.origin.year}</Text>
              </View>
              <View style={styles.originDivider} />
              <View style={styles.originItem}>
                <Text style={styles.originLabel}>Generations</Text>
                <Text style={styles.originValue}>{ritual.origin.generations}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Tradition</Text>
          <Text style={styles.descriptionText}>{ritual.description}</Text>
        </View>

        {/* Significance */}
        <View style={styles.significanceCard}>
          <View style={styles.significanceHeader}>
            <Ionicons name="heart" size={24} color="#EF4444" />
            <Text style={styles.significanceTitle}>Why It Matters</Text>
          </View>
          <Text style={styles.significanceText}>{ritual.significance}</Text>
        </View>

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Ionicons name="calendar" size={24} color="#8B5CF6" />
            <Text style={styles.detailLabel}>When</Text>
            <Text style={styles.detailValue}>{ritual.whenCelebrated}</Text>
          </View>
          <View style={styles.detailCard}>
            <Ionicons name="people" size={24} color="#3B82F6" />
            <Text style={styles.detailLabel}>Who</Text>
            <Text style={styles.detailValue}>{ritual.whoParticipates}</Text>
          </View>
        </View>

        {/* Ritual Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Celebrate</Text>
          {ritual.ritualSteps.map((step, index) => (
            <View key={index} style={styles.ritualStep}>
              <View style={styles.stepIconContainer}>
                <LinearGradient
                  colors={['#8B5CF6', '#7C3AED']}
                  style={styles.stepIconGradient}
                >
                  <Ionicons name={step.icon as any} size={20} color="white" />
                </LinearGradient>
              </View>
              <View style={styles.stepContent}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepTitle}>{step.step}</Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Photo Gallery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Memories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoGallery}
          >
            {ritual.photos.map((photo, index) => (
              <TouchableOpacity key={index} style={styles.photoCard}>
                <Image source={{ uri: photo }} style={styles.photo} />
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
                  style={styles.photoGradient}
                >
                  <Ionicons name="expand-outline" size={20} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Footer */}
        <View style={styles.statsFooter}>
          <View style={styles.statFooterItem}>
            <Ionicons name="people-circle" size={32} color="#3B82F6" />
            <Text style={styles.statFooterNumber}>{ritual.participants}</Text>
            <Text style={styles.statFooterLabel}>Participants</Text>
          </View>
          <View style={styles.statFooterDivider} />
          <View style={styles.statFooterItem}>
            <Ionicons name="time" size={32} color="#F59E0B" />
            <Text style={styles.statFooterNumber}>{ritual.yearsActive}</Text>
            <Text style={styles.statFooterLabel}>Years Active</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.actionGradient}
          >
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.actionText}>Mark as Participating This Year</Text>
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
    backgroundColor: '#FAFAFA',
  },
  imageHeader: {
    height: 320,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  headerContent: {
    gap: spacing.sm,
  },
  traditionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    gap: 6,
  },
  traditionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  originCard: {
    marginHorizontal: spacing.lg,
    marginTop: -30,
    marginBottom: spacing.xl,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  originGradient: {
    padding: spacing.lg,
  },
  originRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  originItem: {
    alignItems: 'center',
  },
  originLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 4,
  },
  originValue: {
    fontSize: 16,
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
  originDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
    textAlign: 'justify',
  },
  significanceCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  significanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  significanceTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#EF4444',
  },
  significanceText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4B5563',
    fontStyle: 'italic',
  },
  detailsGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  detailCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
  ritualStep: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stepIconContainer: {
    marginRight: spacing.md,
  },
  stepIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  stepTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6B7280',
  },
  photoGallery: {
    paddingRight: spacing.lg,
    gap: spacing.md,
  },
  photoCard: {
    width: 200,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  statsFooter: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.xl,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statFooterItem: {
    flex: 1,
    alignItems: 'center',
  },
  statFooterNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  statFooterLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  statFooterDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: spacing.md,
  },
  actionButton: {
    marginHorizontal: spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md + 2,
    gap: spacing.sm,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

export default RitualScreen;
