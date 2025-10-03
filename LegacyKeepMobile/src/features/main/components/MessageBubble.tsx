/**
 * MessageBubble Component
 * 
 * Reusable component for displaying individual chat messages
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import ReanimatedAnimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

import { MessageBubbleProps } from '../types/chat.types';
import { colors, typography, spacing, gradients } from '../../../shared/constants';

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isFirstMessage,
  isLastMessage,
  onReply,
  onReact,
  onLongPress,
  onFlip,
  getSenderColor,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipRotation = useSharedValue(0);

  const handleFlip = () => {
    if (message.hasHiddenContent) {
      const newFlippedState = !isFlipped;
      setIsFlipped(newFlippedState);
      flipRotation.value = withTiming(newFlippedState ? 1 : 0, { duration: 1200 });
      onFlip?.(message.id);
    }
  };

  const handleSwipeGesture = (event: any) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -50 && message.hasHiddenContent) {
      runOnJS(handleFlip)();
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        scaleY: interpolate(flipRotation.value, [0, 0.5, 1], [1, 0.92, 1]),
      },
      {
        scaleX: interpolate(flipRotation.value, [0, 0.5, 1], [1, 0.98, 1]),
      },
      {
        rotateY: `${interpolate(flipRotation.value, [0, 0.5, 1], [0, 8, 0])}deg`,
      },
    ],
  }));

  const senderColor = getSenderColor(message.senderId);
  const displayContent = isFlipped && message.hiddenContent ? message.hiddenContent : message.content;
  
  // Debug logging
  if (message.hasHiddenContent) {
    console.log(`Message from ${message.senderName} (${message.senderId}):`, {
      senderColor,
      isFlipped,
      hasHiddenContent: message.hasHiddenContent,
      backgroundColor: hexToRgba(senderColor, 0.2),
      borderColor: hexToRgba(senderColor, 0.4),
    });
  }

  const renderMessageContent = () => (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={handleSwipeGesture} enabled={message.hasHiddenContent}>
        <ReanimatedAnimated.View style={[styles.messageContainer, animatedStyle]}>
          <Pressable
            onLongPress={() => onLongPress?.(message)}
            style={({ pressed }) => [
              styles.messagePressable,
              pressed && styles.messagePressed,
            ]}
          >
            {message.isOwnMessage ? (
              <View style={styles.ownMessageContainer}>
                <LinearGradient
                  colors={gradients.peacock}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.ownMessageGradient}
                >
                  <View style={styles.ownMessageBubble}>
                    {message.replyTo && (
                      <View style={styles.replyContainer}>
                        <View style={styles.replyLine} />
                        <View style={styles.replyContent}>
                          <Text style={styles.replySender}>
                            {message.replyTo.senderName}
                          </Text>
                          <Text style={styles.replyText} numberOfLines={2}>
                            {message.replyTo.content}
                          </Text>
                        </View>
                      </View>
                    )}
                    <Text style={styles.ownMessageText}>{displayContent}</Text>
                    <Text style={styles.messageTime}>
                      {message.timestamp}
                      {message.edited && <Text style={styles.editedIndicator}> (edited)</Text>}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.otherMessageContainer}>
                {isFirstMessage && (
                  <View style={styles.senderInfo}>
                    <Image
                      source={{ uri: message.senderAvatar }}
                      style={styles.senderAvatar}
                    />
                    <Text style={[styles.senderName, { color: senderColor }]}>
                      {message.senderName}
                    </Text>
                    <View style={styles.senderActions}>
                      <TouchableOpacity style={styles.senderActionButton}>
                        <Ionicons name="chatbubble-outline" size={16} color={colors.text.secondary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.senderActionButton}>
                        <Ionicons name="call-outline" size={16} color={colors.text.secondary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.senderActionButton}>
                        <Ionicons name="ellipsis-horizontal" size={16} color={colors.text.secondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                
                <View style={isFlipped ? {
                  // Flipped message styles - completely override base styles
                  backgroundColor: hexToRgba(senderColor, 0.2),
                  borderRadius: 20,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  maxWidth: '80%',
                  marginLeft: spacing.sm,
                  marginTop: !isFirstMessage ? 2 : 0,
                  borderWidth: 1,
                  borderColor: hexToRgba(senderColor, 0.4),
                  shadowColor: senderColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                } : [
                  styles.otherMessageBubble,
                  !isFirstMessage && styles.consecutiveMessage,
                ]}>
                  {message.replyTo && (
                    <View style={styles.replyContainer}>
                      <View style={styles.replyLine} />
                      <View style={styles.replyContent}>
                        <Text style={styles.replySender}>
                          {message.replyTo.senderName}
                        </Text>
                        <Text style={styles.replyText} numberOfLines={2}>
                          {message.replyTo.content}
                        </Text>
                      </View>
                    </View>
                  )}
                  
                  <Text style={[
                    styles.otherMessageText,
                    isFlipped && [styles.flippedMessageText, { color: senderColor }],
                  ]}>
                    {displayContent}
                  </Text>
                  
                  <Text style={styles.messageTime}>
                    {message.timestamp}
                    {message.edited && <Text style={styles.editedIndicator}> (edited)</Text>}
                  </Text>
                </View>

                {message.reactions && message.reactions.length > 0 && (
                  <View style={styles.messageReactions}>
                    {message.reactions.map((reaction, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.reactionButton}
                        onPress={() => onReact?.(message, reaction.emoji)}
                      >
                        <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                        <Text style={styles.reactionCount}>{reaction.count}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {message.hasHiddenContent && (
                  <View style={styles.swipeIndicator}>
                    <Ionicons name="chevron-back" size={12} color={colors.text.secondary} />
                    <Ionicons name="chevron-back" size={12} color={colors.text.secondary} />
                    <Ionicons name="chevron-back" size={12} color={colors.text.secondary} />
                    <Ionicons name="chevron-back" size={12} color={colors.text.secondary} />
                  </View>
                )}
              </View>
            )}
          </Pressable>
        </ReanimatedAnimated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );

  return renderMessageContent();
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: spacing.sm,
  },
  messagePressable: {
    flex: 1,
  },
  messagePressed: {
    opacity: 0.7,
  },
  ownMessageContainer: {
    alignItems: 'flex-end',
  },
  ownMessageGradient: {
    borderRadius: 20,
    padding: 2,
    maxWidth: '80%',
  },
  ownMessageBubble: {
    backgroundColor: '#F0F9FF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ownMessageText: {
    fontSize: typography.sizes.sm,
    lineHeight: 20,
    color: '#1F2937',
    fontWeight: '500',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  otherMessageContainer: {
    alignItems: 'flex-start',
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  senderAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: spacing.xs,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  senderName: {
    fontSize: typography.sizes.xs,
    fontWeight: '500',
    fontFamily: 'System',
    letterSpacing: 0.1,
    flex: 1,
  },
  senderActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  senderActionButton: {
    padding: 4,
  },
  otherMessageBubble: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '80%',
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.18)',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  consecutiveMessage: {
    marginTop: 2,
  },
  otherMessageText: {
    fontSize: typography.sizes.sm,
    lineHeight: 20,
    color: '#1F2937',
    fontWeight: '500',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  flippedMessageText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  flippedMessageBubble: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  messageTime: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  editedIndicator: {
    fontStyle: 'italic',
    opacity: 0.7,
  },
  replyContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    alignItems: 'flex-start',
  },
  replyLine: {
    width: 3,
    backgroundColor: colors.primary[500],
    borderRadius: 2,
    marginRight: spacing.xs,
  },
  replyContent: {
    flex: 1,
  },
  replySender: {
    fontSize: typography.sizes.xs,
    fontWeight: '600',
    color: colors.primary[500],
    marginBottom: 2,
  },
  replyText: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    opacity: 0.8,
  },
  messageReactions: {
    flexDirection: 'row',
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
    gap: spacing.xs,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    gap: 2,
  },
  reactionEmoji: {
    fontSize: 12,
  },
  reactionCount: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  swipeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
    gap: 2,
  },
});

export default MessageBubble;
