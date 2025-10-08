/**
 * Recipe Screen Sample
 * Clean, premium design with green theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

// Green theme
const THEME = {
  primary: '#10B981',
  light: '#D1FAE5',
  dark: '#059669',
};

const RecipeScreen = () => {
  const [servings, setServings] = useState(4);
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const recipe = {
    title: "Grandma's Biryani",
    author: {
      name: 'Grandmother Lakshmi',
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop&crop=face',
    },
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=400&fit=crop',
    prepTime: '30 min',
    cookTime: '45 min',
    ingredients: [
      'Basmati Rice - 2 cups',
      'Chicken - 500g',
      'Yogurt - 1 cup',
      'Onions - 3 large',
      'Biryani Masala - 3 tbsp',
      'Saffron - 1 pinch',
    ],
    steps: [
      'Marinate chicken with yogurt and spices for 30 minutes',
      'Fry onions until golden brown',
      'Layer rice and chicken in pot',
      'Add saffron milk on top',
      'Cook on low heat for 45 minutes',
    ],
    tip: 'The secret is in the layering and slow cooking!',
  };

  const toggleStep = (index: number) => {
    const newChecked = new Set(checkedSteps);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedSteps(newChecked);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recipe</Text>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Recipe Image */}
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

        {/* Recipe Header */}
        <View style={styles.recipeHeader}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          
          <View style={styles.authorRow}>
            <Image source={{ uri: recipe.author.avatar }} style={styles.authorAvatar} />
            <Text style={styles.authorName}>{recipe.author.name}</Text>
          </View>

          <View style={styles.timeRow}>
            <View style={styles.timeItem}>
              <Ionicons name="time-outline" size={18} color={THEME.primary} />
              <Text style={styles.timeText}>{recipe.prepTime}</Text>
            </View>
            <View style={styles.timeItem}>
              <Ionicons name="flame-outline" size={18} color={THEME.primary} />
              <Text style={styles.timeText}>{recipe.cookTime}</Text>
            </View>
            <View style={styles.servingsControl}>
              <TouchableOpacity 
                style={styles.servingsButton}
                onPress={() => setServings(Math.max(1, servings - 1))}
              >
                <Ionicons name="remove" size={16} color="#6B7280" />
              </TouchableOpacity>
              <Text style={styles.servingsText}>{servings} servings</Text>
              <TouchableOpacity 
                style={styles.servingsButton}
                onPress={() => setServings(servings + 1)}
              >
                <Ionicons name="add" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={[styles.bullet, { backgroundColor: THEME.primary }]} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.steps.map((step, index) => (
            <TouchableOpacity
              key={index}
              style={styles.stepItem}
              onPress={() => toggleStep(index)}
            >
              <View style={[
                styles.stepNumber,
                { backgroundColor: checkedSteps.has(index) ? THEME.primary : '#F3F4F6' }
              ]}>
                {checkedSteps.has(index) ? (
                  <Ionicons name="checkmark" size={16} color="white" />
                ) : (
                  <Text style={[styles.stepNumberText, { color: checkedSteps.has(index) ? 'white' : '#6B7280' }]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={[
                styles.stepText,
                checkedSteps.has(index) && styles.stepTextChecked
              ]}>{step}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tip */}
        <View style={[styles.tipCard, { backgroundColor: THEME.light }]}>
          <Ionicons name="bulb" size={20} color={THEME.dark} />
          <Text style={[styles.tipText, { color: THEME.dark }]}>{recipe.tip}</Text>
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
  recipeImage: {
    width: '100%',
    height: 240,
  },
  recipeHeader: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  servingsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: spacing.sm,
  },
  servingsButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  servingsText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  ingredientText: {
    fontSize: 15,
    color: '#374151',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    paddingTop: 4,
  },
  stepTextChecked: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
    gap: spacing.md,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
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

export default RecipeScreen;