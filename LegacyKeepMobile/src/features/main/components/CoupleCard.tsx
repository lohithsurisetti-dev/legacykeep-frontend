/**
 * CoupleCard Component - Dynamic Couple Display
 * 
 * Reusable component for displaying couples with consistent styling
 * Handles any data structure from backend
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '../../../shared/constants';
import PersonCard from './PersonCard';

// Dynamic interface that adapts to any backend data structure
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

interface CoupleCardProps {
  person1: PersonData;
  person2: PersonData;
  onPersonPress: (person: PersonData) => void;
  themeColors: any;
  size?: 'small' | 'medium' | 'large';
  showConnection?: boolean;
  connectionType?: 'heart' | 'line' | 'none';
  showNameOnly?: boolean;
}

const CoupleCard: React.FC<CoupleCardProps> = ({
  person1,
  person2,
  onPersonPress,
  themeColors,
  size = 'medium',
  showConnection = true,
  connectionType = 'heart',
  showNameOnly = false,
}) => {
  const styles = createStyles(size);

  const renderConnection = () => {
    if (!showConnection || connectionType === 'none') return null;

    if (connectionType === 'heart') {
      return (
        <View style={styles.connectionContainer}>
          {/* Left connecting line with gradient */}
          <LinearGradient
            colors={['#3B9B9F', '#2A7A7E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.connectionLine}
          />
          
          {/* Simple heart symbol */}
          <View style={styles.heartContainer}>
            <Ionicons name="heart" size={size === 'small' ? 14 : size === 'medium' ? 16 : 18} color="#FF6B9D" />
          </View>
          
          {/* Right connecting line with gradient */}
          <LinearGradient
            colors={['#3B9B9F', '#2A7A7E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.connectionLine}
          />
        </View>
      );
    }

    if (connectionType === 'line') {
      return (
        <View style={styles.connectionContainer}>
          <LinearGradient
            colors={['#3B9B9F', '#2A7A7E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.simpleLine}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <PersonCard
        person={person1}
        onPress={onPersonPress}
        themeColors={themeColors}
        size={size}
        showNameOnly={showNameOnly}
      />
      
      {renderConnection()}
      
      <PersonCard
        person={person2}
        onPress={onPersonPress}
        themeColors={themeColors}
        size={size}
        showNameOnly={showNameOnly}
      />
    </View>
  );
};

const createStyles = (size: 'small' | 'medium' | 'large') => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  connectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
    height: size === 'small' ? 50 : size === 'medium' ? 65 : 80, // Match photo height
  },
  connectionLine: {
    width: size === 'small' ? 20 : size === 'medium' ? 25 : 30,
    height: 2,
    borderRadius: 1,
  },
  heartContainer: {
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    height: size === 'small' ? 50 : size === 'medium' ? 65 : 80, // Match photo height
  },
  simpleLine: {
    width: size === 'small' ? 40 : size === 'medium' ? 50 : 60,
    height: 2,
    borderRadius: 1,
  },
});

export default CoupleCard;
