/**
 * PersonCard Component - Dynamic Family Member Card
 * 
 * Reusable component for displaying family members with consistent styling
 * Adapts to any data structure from backend
 */

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../../shared/constants';

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
  // Allow any additional fields from backend
  [key: string]: any;
}

interface PersonCardProps {
  person: PersonData;
  onPress: (person: PersonData) => void;
  themeColors: any;
  size?: 'small' | 'medium' | 'large';
  showYears?: boolean;
  showRelation?: boolean;
  showNameOnly?: boolean;
}

const PersonCard: React.FC<PersonCardProps> = ({
  person,
  onPress,
  themeColors,
  size = 'medium',
  showYears = true,
  showRelation = true,
  showNameOnly = false,
}) => {
  const styles = createStyles(size);

  // Calculate years lived dynamically
  const getYearsLived = () => {
    if (!person.birthYear) return '†';
    const birth = parseInt(person.birthYear);
    const death = person.deathYear ? parseInt(person.deathYear) : birth + 80;
    return `${birth}-${death}`;
  };

  // Get photo size based on card size
  const getPhotoSize = () => {
    switch (size) {
      case 'small': return 50;
      case 'medium': return 65;
      case 'large': return 80;
      default: return 65;
    }
  };

  const photoSize = getPhotoSize();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPress(person)}
        activeOpacity={0.7}
        style={styles.touchableContainer}
      >
        {/* Photo Container */}
        <View style={[styles.photoContainer, { width: photoSize, height: photoSize }]}>
          {person.photo ? (
            <Image 
              source={{ uri: person.photo }} 
              style={[styles.photo, { width: photoSize, height: photoSize, borderRadius: photoSize / 2 }]} 
            />
          ) : (
            <View style={[styles.photoPlaceholder, { width: photoSize, height: photoSize, borderRadius: photoSize / 2 }]}>
              <Ionicons name="person" size={photoSize * 0.4} color="#9E9E9E" />
            </View>
          )}
        </View>

        {/* Years Badge - Only show for deceased */}
        {!person.isAlive && showYears && (
          <View style={styles.yearsBadge}>
            <Text style={styles.yearsText}>
              {getYearsLived()}
            </Text>
          </View>
        )}

        {/* Name - Show full name on same line */}
        <Text style={[styles.name, { color: themeColors.text }]} numberOfLines={1}>
          {person.name}{person.surname && !showNameOnly ? ` ${person.surname}` : ''}
        </Text>

        {/* Relation - Only show if enabled and not name-only mode */}
        {showRelation && !showNameOnly && (
          <Text style={[styles.relation, { color: themeColors.textSecondary }]} numberOfLines={1}>
            {person.relation}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (size: 'small' | 'medium' | 'large') => StyleSheet.create({
  container: {
    alignItems: 'center',
    width: size === 'small' ? 80 : size === 'medium' ? 95 : 110,
  },
  touchableContainer: {
    alignItems: 'center',
    width: '100%',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  photo: {
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  photoPlaceholder: {
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B9B9F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  yearsBadge: {
    minWidth: size === 'small' ? 30 : size === 'medium' ? 35 : 40,
    height: size === 'small' ? 16 : size === 'medium' ? 18 : 20,
    borderRadius: size === 'small' ? 8 : size === 'medium' ? 9 : 10,
    backgroundColor: '#757575',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
    paddingHorizontal: size === 'small' ? 3 : size === 'medium' ? 4 : 5,
    alignSelf: 'center',
    maxWidth: size === 'small' ? 60 : size === 'medium' ? 75 : 90,
  },
  yearsText: {
    fontSize: size === 'small' ? 7 : size === 'medium' ? 8 : 9,
    color: '#FFFFFF',
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    lineHeight: size === 'small' ? 7 : size === 'medium' ? 8 : 9,
    includeFontPadding: false,
  },
  name: {
    fontSize: size === 'small' ? typography.sizes.xs : size === 'medium' ? typography.sizes.sm : typography.sizes.md,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    maxWidth: size === 'small' ? 60 : size === 'medium' ? 75 : 90,
    lineHeight: size === 'small' ? 14 : size === 'medium' ? 16 : 18,
    marginBottom: 2,
  },
  relation: {
    fontSize: size === 'small' ? 8 : size === 'medium' ? 9 : typography.sizes.xs,
    color: '#757575',
    fontWeight: typography.weights.medium,
    textAlign: 'center',
    lineHeight: size === 'small' ? 10 : size === 'medium' ? 12 : 14,
    paddingHorizontal: 2,
  },
});

export default PersonCard;
