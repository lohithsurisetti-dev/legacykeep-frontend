/**
 * FamilyTree Component - Dynamic Family Tree Display
 * 
 * Main component that orchestrates the entire family tree
 * Adapts to any backend data structure
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography, spacing } from '../../../shared/constants';
import GenerationSection from './GenerationSection';
import PersonCard from './PersonCard';

// Dynamic interfaces that adapt to any backend data structure
interface PersonData {
  id: string;
  name: string;
  surname?: string;
  relation: string;
  photo?: string;
  isAlive: boolean;
  birthYear?: string;
  deathYear?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

interface FamilyTreeData {
  generations: Array<{
    id: string;
    title: string;
    couples?: Array<{ person1: PersonData; person2: PersonData }>;
    individuals?: PersonData[];
    isExpandable?: boolean;
    defaultExpanded?: boolean;
  }>;
  sideSections?: Array<{
    id: string;
    title: string;
    individuals: PersonData[];
    isExpandable?: boolean;
    defaultExpanded?: boolean;
  }>;
}

interface FamilyTreeProps {
  data: FamilyTreeData;
  onPersonPress: (person: PersonData) => void;
  themeColors: any;
  size?: 'small' | 'medium' | 'large';
  isModalOpen?: boolean;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({
  data,
  onPersonPress,
  themeColors,
  size = 'medium',
  isModalOpen = false,
}) => {
  const styles = createStyles(size);
  const scrollViewRef = useRef<ScrollView>(null);

  // Dynamic state management for expandable sections
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const defaultExpanded = new Set<string>();
    
    // Set default expanded sections
    data.generations.forEach(gen => {
      if (gen.defaultExpanded) {
        defaultExpanded.add(gen.id);
      }
    });
    
    data.sideSections?.forEach(section => {
      if (section.defaultExpanded) {
        defaultExpanded.add(section.id);
      }
    });
    
    return defaultExpanded;
  });

  // Auto-scroll to "Your Generation" section on initial mount only
  useEffect(() => {
    const timer = setTimeout(() => {
      // Find the "Your Generation" section and scroll to it
      const yourGenerationIndex = data.generations.findIndex(gen => gen.id === 'siblings');
      if (yourGenerationIndex !== -1 && scrollViewRef.current) {
        // Calculate approximate scroll position to center "Your Generation"
        const scrollY = (yourGenerationIndex + 1) * 200; // Approximate height per section
        scrollViewRef.current.scrollTo({
          y: scrollY,
          animated: true,
        });
      }
    }, 500); // Small delay to ensure content is rendered

    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const renderGeneration = (generation: any) => (
    <GenerationSection
      key={generation.id}
      generation={{
        ...generation,
        isExpanded: expandedSections.has(generation.id),
        onToggle: () => toggleSection(generation.id),
      }}
      onPersonPress={onPersonPress}
      themeColors={themeColors}
      size={size}
      showTitle={false}
      titleStyle="generation"
    />
  );

  const renderSideSection = (section: any) => (
    <View key={section.id} style={styles.sideSection}>
      <TouchableOpacity
        onPress={() => toggleSection(section.id)}
        style={styles.unifiedButton}
      >
        <Ionicons 
          name={expandedSections.has(section.id) ? "chevron-down" : "chevron-forward"} 
          size={20} 
          color="#3B9B9F" 
        />
        <Text style={styles.unifiedButtonLabel}>
          {section.title} ({section.individuals.length})
        </Text>
      </TouchableOpacity>
      
      {expandedSections.has(section.id) && (
        <View style={styles.expandedContent}>
          <View style={styles.individualsContainer}>
            {section.individuals.map((person: PersonData) => (
              <PersonCard
                key={person.id}
                person={person}
                onPress={onPersonPress}
                themeColors={themeColors}
                size={size}
                showNameOnly={true}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Tree Subtitle */}
      <View style={styles.header}>
        <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
          Tap to expand and explore family ranches
        </Text>
      </View>

      {/* Family Tree Content */}
      <View style={styles.treeContainer}>
        {/* Render Generations */}
        {data.generations.map(renderGeneration)}

        {/* Render Side Sections */}
        {data.sideSections?.map(renderSideSection)}
      </View>
    </ScrollView>
  );
};

const createStyles = (size: 'small' | 'medium' | 'large') => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  headerSubtitle: {
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  treeContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  sideSection: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    width: '100%',
  },
  sideSectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: '#E8EAED',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sideSectionLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: '#3B9B9F',
    marginLeft: spacing.xs,
  },
  unifiedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4F5',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 18,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: '#7BB8BB',
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  unifiedButtonLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: '#3B9B9F',
    marginLeft: spacing.xs,
  },
  expandedContent: {
    alignItems: 'center',
    width: '100%',
    marginTop: spacing.xs,
  },
  individualsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
});

export default FamilyTree;
