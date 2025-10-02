/**
 * GenerationSection Component - Dynamic Generation Display
 * 
 * Reusable component for displaying family generations with consistent styling
 * Handles any data structure from backend
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography, spacing } from '../../../shared/constants';
import PersonCard from './PersonCard';
import CoupleCard from './CoupleCard';

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

interface GenerationData {
  title: string;
  couples?: Array<{ person1: PersonData; person2: PersonData }>;
  individuals?: PersonData[];
  isExpandable?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

interface GenerationSectionProps {
  generation: GenerationData;
  onPersonPress: (person: PersonData) => void;
  themeColors: any;
  size?: 'small' | 'medium' | 'large';
  showTitle?: boolean;
  titleStyle?: 'generation' | 'side';
  isCurrentGeneration?: boolean;
}

const GenerationSection: React.FC<GenerationSectionProps> = ({
  generation,
  onPersonPress,
  themeColors,
  size = 'medium',
  showTitle = true,
  titleStyle = 'generation',
  isCurrentGeneration = false,
}) => {
  const styles = createStyles(size, isCurrentGeneration);

  const renderTitle = () => {
    // Don't show titles anymore - they're now part of the expand buttons
    return null;
  };

  const renderContent = () => {
    return (
      <View style={styles.content}>
        {/* Expand/Collapse Button - Always show at top */}
        {generation.isExpandable && (
          <TouchableOpacity
            onPress={generation.onToggle}
            style={[
              styles.expandButtonWithLabel,
              isCurrentGeneration && styles.currentGenerationButton
            ]}
          >
            <Ionicons 
              name={generation.isExpanded ? "chevron-down" : "chevron-forward"} 
              size={20} 
              color={isCurrentGeneration ? "#FFFFFF" : "#3B9B9F"} 
            />
            <Text style={[
              styles.expandLabel,
              isCurrentGeneration && styles.currentGenerationLabel
            ]}>
              {generation.title}
            </Text>
          </TouchableOpacity>
        )}

        {/* Render People Below Button - Only when expanded */}
        {generation.isExpanded && (
          <View style={[
            styles.expandedContent,
            isCurrentGeneration && styles.currentGenerationContent
          ]}>
            {/* Render Couples */}
            {generation.couples?.map((couple, index) => (
              <CoupleCard
                key={`couple-${index}`}
                person1={couple.person1}
                person2={couple.person2}
                onPersonPress={onPersonPress}
                themeColors={themeColors}
                size={size}
                showNameOnly={true}
              />
            ))}

            {/* Render Individuals */}
            {generation.individuals && (
              <View style={styles.individualsContainer}>
                {generation.individuals.map((person) => (
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
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTitle()}
      {renderContent()}
    </View>
  );
};

const createStyles = (size: 'small' | 'medium' | 'large', isCurrentGeneration: boolean) => StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  generationTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: '#1A1A1A',
    marginBottom: spacing.lg,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sideTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: '#757575',
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  content: {
    alignItems: 'center',
    width: '100%',
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
  expandButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F4F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: '#7BB8BB',
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  expandButtonWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4F5',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 18,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: '#7BB8BB',
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  expandLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: '#3B9B9F',
    marginLeft: spacing.xs,
  },
  // Special styling for current generation
  currentGenerationButton: {
    backgroundColor: '#3B9B9F',
    borderColor: '#2A7A7E',
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.05 }],
  },
  currentGenerationLabel: {
    color: '#FFFFFF',
    fontWeight: typography.weights.bold,
  },
  currentGenerationContent: {
    backgroundColor: 'rgba(59, 155, 159, 0.05)',
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(59, 155, 159, 0.15)',
  },
});

export default GenerationSection;
