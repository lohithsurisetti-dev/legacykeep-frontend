/**
 * ChatInput Component
 * 
 * Reusable component for chat message input with various features
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { ChatInputProps, ChatMessage } from '../types/chat.types';
import { colors, typography, spacing } from '../../../shared/constants';

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onTyping,
  replyTo,
  onCancelReply,
  placeholder = "Type a message...",
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const handleTextChange = (text: string) => {
    setMessage(text);
    
    // Handle typing indicator
    if (onTyping) {
      if (!isTyping && text.length > 0) {
        setIsTyping(true);
        onTyping(true);
      }
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        onTyping(false);
      }, 1000);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Stop typing indicator
      if (onTyping && isTyping) {
        setIsTyping(false);
        onTyping(false);
      }
      
      // Clear timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleCancelReply = () => {
    onCancelReply?.();
  };

  const isInputExpanded = message.length > 0;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Reply Preview */}
      {replyTo && (
        <View style={styles.replyPreview}>
          <View style={styles.replyPreviewContent}>
            <View style={styles.replyPreviewHeader}>
              <Text style={styles.replyPreviewLabel}>Replying to {replyTo.senderName}</Text>
              <TouchableOpacity onPress={handleCancelReply} style={styles.cancelReplyButton}>
                <Ionicons name="close" size={16} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.replyPreviewText} numberOfLines={2}>
              {replyTo.content}
            </Text>
          </View>
        </View>
      )}

      {/* Input Container */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          {/* Left Actions */}
          <View style={styles.leftActions}>
            {!isInputExpanded && (
              <>
                <TouchableOpacity style={styles.inputButton} disabled={disabled}>
                  <Ionicons name="camera-outline" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputButton} disabled={disabled}>
                  <Ionicons name="add-outline" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputButton} disabled={disabled}>
                  <Ionicons name="mic-outline" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Text Input */}
          <View style={styles.textInputContainer}>
            <TextInput
              ref={textInputRef}
              style={styles.textInput}
              value={message}
              onChangeText={handleTextChange}
              placeholder={placeholder}
              placeholderTextColor={colors.text.secondary}
              multiline
              maxLength={1000}
              editable={!disabled}
              textAlignVertical="center"
            />
          </View>

          {/* Send Button */}
          {isInputExpanded ? (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={disabled}
            >
              <LinearGradient
                colors={colors.gradients.peacock}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sendButtonGradient}
              >
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.inputButton} disabled={disabled}>
              <Ionicons name="happy-outline" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  replyPreview: {
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border.medium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  replyPreviewContent: {
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    padding: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary.main,
  },
  replyPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  replyPreviewLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: '600',
    color: colors.primary.main,
  },
  cancelReplyButton: {
    padding: 2,
  },
  replyPreviewText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    opacity: 0.8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: colors.border.medium,
    paddingTop: spacing.xs,
    paddingBottom: 25,
    paddingHorizontal: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  leftActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  inputButton: {
    padding: spacing.xs,
    borderRadius: 20,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 36,
    maxHeight: 100,
  },
  textInput: {
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    fontWeight: '400',
    fontFamily: 'System',
    letterSpacing: 0.1,
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  sendButton: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;
