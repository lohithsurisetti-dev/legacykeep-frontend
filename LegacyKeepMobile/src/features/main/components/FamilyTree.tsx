/**
 * FamilyTree Component - Dynamic Family Tree Display
 * 
 * Main component that orchestrates the entire family tree
 * Adapts to any backend data structure
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
  scrollY?: Animated.Value;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({
  data,
  onPersonPress,
  themeColors,
  size = 'medium',
  isModalOpen = false,
  scrollY,
}) => {
  const styles = createStyles(size);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Animation states
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [shimmerAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

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
    
    // Auto-expand "Your Generation" (siblings) section
    const siblingsSection = data.generations.find(gen => gen.id === 'siblings');
    if (siblingsSection) {
      defaultExpanded.add('siblings');
    }
    
    return defaultExpanded;
  });

  // Shimmer animation
  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  // Loading and entrance animations
  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Entrance animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, [fadeAnim, slideAnim]);

  // Auto-scroll to "Your Generation" section on initial mount only
  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [isLoading]); // Run when loading finishes

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

  // Shimmer skeleton component
  const ShimmerSkeleton = () => (
    <View style={styles.shimmerContainer}>
      {[1, 2, 3, 4].map((item) => (
        <Animated.View 
          key={item} 
          style={[
            styles.shimmerItem,
            {
              opacity: shimmerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.7],
              }),
            }
          ]}
        >
          <LinearGradient
            colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.shimmerGradient}
          />
        </Animated.View>
      ))}
    </View>
  );

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
      isCurrentGeneration={generation.id === 'siblings'}
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

  if (isLoading) {
    return <ShimmerSkeleton />;
  }

  return (
    <Animated.ScrollView 
      ref={scrollViewRef}
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
      showsVerticalScrollIndicator={false}
      onScroll={scrollY ? Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      ) : undefined}
      scrollEventThrottle={16}
    >
      {/* Tree Header */}
      <Animated.View style={[
        styles.header,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}>
        <Animated.View style={[
          styles.headerIconContainer,
          {
            transform: [{
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              })
            }]
          }
        ]}>
          <Ionicons name="people" size={24} color="#3B9B9F" />
        </Animated.View>
        <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
          Tap generations to explore your family
        </Text>
      </Animated.View>

      {/* Family Tree Content */}
      <Animated.View style={[
        styles.treeContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}>
        {/* Render Generations */}
        {data.generations.map(renderGeneration)}

        {/* Render Side Sections */}
        {data.sideSections?.map(renderSideSection)}
      </Animated.View>
    </Animated.ScrollView>
  );
};

const createStyles = (size: 'small' | 'medium' | 'large') => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  headerIconContainer: {
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: '#3B9B9F',
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: typography.sizes.md,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
    letterSpacing: 0.3,
  },
  headerHint: {
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    color: '#757575',
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  animatedHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  animatedHeaderText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: '#3B9B9F',
    textAlign: 'center',
    letterSpacing: 0.5,
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
  // Shimmer styles
  shimmerContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  shimmerItem: {
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  shimmerGradient: {
    flex: 1,
    width: '100%',
  },
});

export default FamilyTree;
