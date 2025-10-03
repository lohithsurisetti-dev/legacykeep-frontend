/**
 * ReactionsBar Component
 * 
 * Reusable component for displaying reaction options
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ReactionsBarProps } from '../types/chat.types';
import { spacing } from '../../../shared/constants';

const ReactionsBar: React.FC<ReactionsBarProps> = ({
  reactions,
  onReaction,
  onAddReaction,
  showAddButton = true,
  style,
}) => {
  return (
    <View style={[styles.reactionsBarWrapper, style]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reactionsScrollContainer}
        style={styles.reactionsScroll}
      >
        {reactions.map((emoji, index) => (
          <TouchableOpacity
            key={emoji}
            style={styles.reactionEmojiButton}
            onPress={() => onReaction(emoji)}
            activeOpacity={0.7}
          >
            <Text style={styles.reactionEmojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
        
        {showAddButton && (
          <TouchableOpacity 
            style={styles.addReactionButton}
            onPress={onAddReaction}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  reactionsBarWrapper: {
    width: '100%',
  },
  reactionsScroll: {
    flexGrow: 0,
  },
  reactionsScrollContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  reactionEmojiButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  reactionEmojiText: {
    fontSize: 20,
    textAlign: 'center',
  },
  addReactionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginLeft: spacing.xs,
  },
});

export default ReactionsBar;
