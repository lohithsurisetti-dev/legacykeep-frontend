/**
 * Recipe Screen Sample
 * Modern design for family recipes
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '../../../../shared/constants';

const RecipeScreen = () => {
  const [servings, setServings] = useState(4);

  const recipe = {
    title: "Grandma's Special Biryani",
    author: {
      name: 'Grandmother Lakshmi',
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop&crop=face',
      relationship: 'Grandmother'
    },
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop',
    stats: {
      prepTime: '30 min',
      cookTime: '45 min',
      difficulty: 'Medium',
      servings: 4
    },
    story: 'This recipe has been passed down through 3 generations. Made it every Sunday for the family.',
    ingredients: [
      { item: 'Basmati Rice', amount: '2 cups' },
      { item: 'Chicken', amount: '500g' },
      { item: 'Yogurt', amount: '1 cup' },
      { item: 'Onions (sliced)', amount: '3 large' },
      { item: 'Biryani Masala', amount: '3 tbsp' },
      { item: 'Saffron', amount: '1 pinch' },
    ],
    steps: [
      'Marinate chicken with yogurt and spices for 30 minutes',
      'Fry onions until golden brown and crispy',
      'Layer rice and chicken in a heavy-bottomed pot',
      'Add saffron milk and fried onions on top',
      'Cook on low heat for 45 minutes',
      'Let it rest for 10 minutes before serving'
    ],
    tips: 'The secret is in the layering and the slow cooking. Never rush biryani!',
    madeBy: 24,
    saved: 67
  };

  return (
    <View style={styles.container}>
      {/* Header with Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
          style={styles.imageGradient}
        >
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.imageActions}>
            <TouchableOpacity style={styles.imageActionButton}>
              <Ionicons name="heart-outline" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageActionButton}>
              <Ionicons name="bookmark-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recipe Header */}
        <View style={styles.recipeHeader}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          
          {/* Author */}
          <View style={styles.authorRow}>
            <Image source={{ uri: recipe.author.avatar }} style={styles.authorAvatar} />
            <View>
              <Text style={styles.authorName}>{recipe.author.name}</Text>
              <Text style={styles.authorRelation}>{recipe.author.relationship}'s Recipe</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color="#10B981" />
              <Text style={styles.statText}>{recipe.stats.prepTime}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame-outline" size={18} color="#EF4444" />
              <Text style={styles.statText}>{recipe.stats.cookTime}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bar-chart-outline" size={18} color="#F59E0B" />
              <Text style={styles.statText}>{recipe.stats.difficulty}</Text>
            </View>
          </View>
        </View>

        {/* Story Card */}
        <View style={styles.storyCard}>
          <View style={styles.storyHeader}>
            <Ionicons name="book" size={20} color="#8B5CF6" />
            <Text style={styles.storyTitle}>Family Story</Text>
          </View>
          <Text style={styles.storyText}>{recipe.story}</Text>
        </View>

        {/* Servings Adjuster */}
        <View style={styles.servingsCard}>
          <Text style={styles.servingsLabel}>Servings</Text>
          <View style={styles.servingsControls}>
            <TouchableOpacity 
              style={styles.servingsButton}
              onPress={() => setServings(Math.max(1, servings - 1))}
            >
              <Ionicons name="remove" size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.servingsNumber}>{servings}</Text>
            <TouchableOpacity 
              style={styles.servingsButton}
              onPress={() => setServings(servings + 1)}
            >
              <Ionicons name="add" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={styles.ingredientBullet} />
              <Text style={styles.ingredientText}>
                <Text style={styles.ingredientAmount}>{ingredient.amount}</Text> {ingredient.item}
              </Text>
            </View>
          ))}
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Grandma's Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={20} color="#F59E0B" />
            <Text style={styles.tipTitle}>Grandma's Secret Tip</Text>
          </View>
          <Text style={styles.tipText}>{recipe.tips}</Text>
        </View>

        {/* Engagement Footer */}
        <View style={styles.engagementFooter}>
          <View style={styles.engagementStat}>
            <Ionicons name="people" size={20} color="#3B82F6" />
            <Text style={styles.engagementStatText}>{recipe.madeBy} family members made this</Text>
          </View>
          <View style={styles.engagementStat}>
            <Ionicons name="bookmark" size={20} color="#F59E0B" />
            <Text style={styles.engagementStatText}>{recipe.saved} saved</Text>
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
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: spacing.lg,
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
  imageActions: {
    flexDirection: 'row',
    gap: spacing.md,
    alignSelf: 'flex-end',
  },
  imageActionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  recipeHeader: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  recipeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  authorRelation: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  storyCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    padding: spacing.lg,
    margin: spacing.lg,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  storyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  storyText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  servingsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  servingsLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  servingsControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  servingsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  servingsNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    minWidth: 30,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
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
  ingredientBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  ingredientText: {
    fontSize: 15,
    color: '#374151',
    flex: 1,
  },
  ingredientAmount: {
    fontWeight: '700',
    color: '#1F2937',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 15,
    fontWeight: '800',
    color: 'white',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    paddingTop: 4,
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FCD34D',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
  },
  tipText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  engagementFooter: {
    backgroundColor: 'white',
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    borderRadius: 16,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  engagementStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  engagementStatText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
});

export default RecipeScreen;
