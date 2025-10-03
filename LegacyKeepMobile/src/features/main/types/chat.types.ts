/**
 * Chat Types and Interfaces
 * 
 * Defines all TypeScript interfaces for chat functionality
 */

// Base User Interface
export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

// Chat Message Interface
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
  hiddenContent?: string;
  hasHiddenContent?: boolean;
  replyTo?: {
    id: string;
    senderName: string;
    content: string;
  };
  reactions?: MessageReaction[];
  messageType?: 'text' | 'image' | 'video' | 'audio' | 'file';
  status?: 'sent' | 'delivered' | 'read';
  edited?: boolean;
  deleted?: boolean;
}

// Message Reaction Interface
export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
  userReacted?: boolean;
}

// Chat Participant Interface
export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  role?: 'admin' | 'member';
  joinedAt?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

// Chat Conversation Interface
export interface ChatConversation {
  id: string;
  type: 'individual' | 'group';
  name: string;
  avatar?: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  isOnline?: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  createdAt?: string;
  updatedAt?: string;
  settings?: ChatSettings;
}

// Chat Settings Interface
export interface ChatSettings {
  notifications: boolean;
  muteUntil?: string;
  archive?: boolean;
  pin?: boolean;
  wallpaper?: string;
}

// API Response Interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Chat API Interfaces
export interface SendMessageRequest {
  chatId: string;
  content: string;
  replyTo?: string;
  messageType?: 'text' | 'image' | 'video' | 'audio' | 'file';
  hiddenContent?: string;
}

export interface SendMessageResponse {
  message: ChatMessage;
  success: boolean;
}

export interface GetMessagesRequest {
  chatId: string;
  page?: number;
  limit?: number;
  before?: string; // Message ID to fetch messages before
}

export interface GetMessagesResponse {
  messages: ChatMessage[];
  hasMore: boolean;
  total: number;
}

export interface AddReactionRequest {
  messageId: string;
  emoji: string;
}

export interface RemoveReactionRequest {
  messageId: string;
  emoji: string;
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
}

// Chat Context Interface
export interface ChatContextType {
  conversations: ChatConversation[];
  currentChat: ChatConversation | null;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string, replyTo?: string) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  removeReaction: (messageId: string, emoji: string) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  setCurrentChat: (chat: ChatConversation) => void;
  markAsRead: (messageId: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  editMessage: (messageId: string, content: string) => Promise<void>;
}

// Component Props Interfaces
export interface MessageBubbleProps {
  message: ChatMessage;
  isFirstMessage: boolean;
  isLastMessage: boolean;
  onReply?: (message: ChatMessage) => void;
  onReact?: (message: ChatMessage, emoji: string) => void;
  onLongPress?: (message: ChatMessage) => void;
  onFlip?: (messageId: string) => void;
  getSenderColor: (senderId: string) => string;
}

export interface MessageListProps {
  messages: ChatMessage[];
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  getSenderColor: (senderId: string) => string;
}

export interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onTyping?: (isTyping: boolean) => void;
  replyTo?: ChatMessage;
  onCancelReply?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface ChatHeaderProps {
  chat: ChatConversation;
  onBack: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMore?: () => void;
}

export interface ReactionsBarProps {
  reactions: string[];
  onReaction: (emoji: string) => void;
  onAddReaction?: () => void;
  showAddButton?: boolean;
  style?: any;
}

// Utility Types
export type MessageAction = 
  | 'reply'
  | 'copy'
  | 'forward'
  | 'save'
  | 'delete'
  | 'edit'
  | 'react'
  | 'info';

export type ChatEvent = 
  | 'message_sent'
  | 'message_received'
  | 'message_edited'
  | 'message_deleted'
  | 'reaction_added'
  | 'reaction_removed'
  | 'typing_started'
  | 'typing_stopped'
  | 'user_joined'
  | 'user_left'
  | 'chat_updated';
