/**
 * Chat Utility Functions
 * 
 * Utility functions for chat-related operations
 */

import { ChatMessage, ChatConversation } from '../types/chat.types';

/**
 * Generate a consistent color for a sender based on their ID
 */
export const getSenderColor = (senderId: string): string => {
  const colors = [
    '#7C3AED', // Purple
    '#059669', // Emerald
    '#DC2626', // Red
    '#EA580C', // Orange
    '#0891B2', // Cyan
    '#7C2D12', // Brown
    '#4338CA', // Indigo
    '#BE185D', // Pink
    '#0F766E', // Teal
    '#16A34A', // Green
    '#CA8A04', // Yellow
    '#9333EA', // Violet
    '#EF4444', // Red-2
    '#06B6D4', // Sky
    '#84CC16', // Lime
  ];

  // Special mappings for common family members to ensure different colors
  const specialMappings: { [key: string]: string } = {
    'dad': '#059669',     // Emerald - nature/outdoor color for dad
    'mom': '#BE185D',     // Pink - warm/maternal color for mom
    'sarah': '#4338CA',   // Indigo - sophisticated color for Sarah
    'me': '#EA580C',      // Orange - vibrant color for current user
    'you': '#EA580C',     // Orange - same as 'me'
  };

  // Return special mapping if it exists
  if (specialMappings[senderId.toLowerCase()]) {
    return specialMappings[senderId.toLowerCase()];
  }

  // Fallback to hash-based color for other senders
  let hash = 0;
  for (let i = 0; i < senderId.length; i++) {
    const char = senderId.charCodeAt(i);
    hash = hash * 31 + char + i * 7;
  }
  
  hash = hash * 17 + senderId.length * 13;
  hash = hash ^ (hash >>> 16);
  hash = hash * 0x85ebca6b;
  hash = hash ^ (hash >>> 13);
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Format timestamp for display
 */
export const formatMessageTime = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      // Same day - show time
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else if (diffInHours < 168) { // 7 days
      // This week - show day and time
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else {
      // Older - show date
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  } catch (error) {
    return timestamp; // Return original if parsing fails
  }
};

/**
 * Check if a message is from the same sender as the previous message
 */
export const isFirstMessageFromSender = (
  currentMessage: ChatMessage,
  previousMessage: ChatMessage | null
): boolean => {
  if (!previousMessage) return true;
  return currentMessage.senderId !== previousMessage.senderId;
};

/**
 * Check if a message is from the same sender as the next message
 */
export const isLastMessageFromSender = (
  currentMessage: ChatMessage,
  nextMessage: ChatMessage | null
): boolean => {
  if (!nextMessage) return true;
  return currentMessage.senderId !== nextMessage.senderId;
};

/**
 * Group consecutive messages from the same sender
 */
export const groupMessagesBySender = (messages: ChatMessage[]): ChatMessage[][] => {
  if (messages.length === 0) return [];

  const groups: ChatMessage[][] = [];
  let currentGroup: ChatMessage[] = [messages[0]];

  for (let i = 1; i < messages.length; i++) {
    const currentMessage = messages[i];
    const previousMessage = messages[i - 1];

    if (currentMessage.senderId === previousMessage.senderId) {
      currentGroup.push(currentMessage);
    } else {
      groups.push(currentGroup);
      currentGroup = [currentMessage];
    }
  }

  groups.push(currentGroup);
  return groups;
};

/**
 * Validate message content
 */
export const validateMessage = (content: string): { isValid: boolean; error?: string } => {
  if (!content || content.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (content.length > 1000) {
    return { isValid: false, error: 'Message is too long' };
  }

  // Check for suspicious content (basic validation)
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      return { isValid: false, error: 'Message contains invalid content' };
    }
  }

  return { isValid: true };
};

/**
 * Sanitize message content
 */
export const sanitizeMessage = (content: string): string => {
  return content
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .slice(0, 1000); // Limit length
};

/**
 * Generate a unique message ID
 */
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if user has unread messages in a conversation
 */
export const hasUnreadMessages = (conversation: ChatConversation, userId: string): boolean => {
  if (!conversation.unreadCount || conversation.unreadCount === 0) {
    return false;
  }

  // Check if the last message is from someone other than the current user
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  return lastMessage && lastMessage.senderId !== userId;
};

/**
 * Get conversation display name
 */
export const getConversationDisplayName = (conversation: ChatConversation, currentUserId: string): string => {
  if (conversation.type === 'group') {
    return conversation.name;
  }

  // For individual chats, show the other participant's name
  const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
  return otherParticipant?.name || conversation.name;
};

/**
 * Get conversation avatar
 */
export const getConversationAvatar = (conversation: ChatConversation, currentUserId: string): string | undefined => {
  if (conversation.avatar) {
    return conversation.avatar;
  }

  if (conversation.type === 'group') {
    // For groups, you might want to generate a group avatar or use the first participant's avatar
    return conversation.participants[0]?.avatar;
  }

  // For individual chats, show the other participant's avatar
  const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
  return otherParticipant?.avatar;
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Check if a message contains media
 */
export const isMediaMessage = (message: ChatMessage): boolean => {
  return message.messageType === 'image' || 
         message.messageType === 'video' || 
         message.messageType === 'audio' || 
         message.messageType === 'file';
};

/**
 * Get message status display text
 */
export const getMessageStatusText = (message: ChatMessage): string => {
  if (message.status === 'sent') return 'Sent';
  if (message.status === 'delivered') return 'Delivered';
  if (message.status === 'read') return 'Read';
  return 'Sending...';
};

/**
 * Calculate typing indicator text
 */
export const getTypingIndicatorText = (typingUsers: string[]): string => {
  if (typingUsers.length === 0) return '';
  if (typingUsers.length === 1) return `${typingUsers[0]} is typing...`;
  if (typingUsers.length === 2) return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
  return 'Several people are typing...';
};

/**
 * Sort conversations by last message time
 */
export const sortConversationsByLastMessage = (conversations: ChatConversation[]): ChatConversation[] => {
  return [...conversations].sort((a, b) => {
    const timeA = new Date(a.lastMessageTime).getTime();
    const timeB = new Date(b.lastMessageTime).getTime();
    return timeB - timeA; // Most recent first
  });
};

/**
 * Search messages by content
 */
export const searchMessages = (messages: ChatMessage[], query: string): ChatMessage[] => {
  if (!query.trim()) return messages;

  const lowercaseQuery = query.toLowerCase();
  return messages.filter(message =>
    message.content.toLowerCase().includes(lowercaseQuery) ||
    message.senderName.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Get message reactions summary
 */
export const getReactionsSummary = (reactions: any[]): string => {
  if (!reactions || reactions.length === 0) return '';

  const totalReactions = reactions.reduce((sum, reaction) => sum + reaction.count, 0);
  const uniqueEmojis = reactions.length;

  if (uniqueEmojis === 1) {
    return `${reactions[0].emoji} ${totalReactions}`;
  }

  return `${totalReactions} reactions`;
};
