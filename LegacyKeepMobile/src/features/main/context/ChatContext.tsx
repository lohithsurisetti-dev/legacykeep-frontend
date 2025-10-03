/**
 * Chat Context
 * 
 * Context provider for managing chat state across the application
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import {
  ChatContextType,
  ChatConversation,
  ChatMessage,
  ChatEvent,
} from '../types/chat.types';
import { chatService } from '../services/ChatService';
import { getSenderColor } from '../utils/chat.utils';

// Action types for the reducer
type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CONVERSATIONS'; payload: ChatConversation[] }
  | { type: 'SET_CURRENT_CHAT'; payload: ChatConversation | null }
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_MESSAGE'; payload: ChatMessage }
  | { type: 'DELETE_MESSAGE'; payload: string }
  | { type: 'ADD_REACTION'; payload: { messageId: string; reaction: any } }
  | { type: 'REMOVE_REACTION'; payload: { messageId: string; emoji: string } }
  | { type: 'UPDATE_CONVERSATION'; payload: ChatConversation }
  | { type: 'MARK_MESSAGE_READ'; payload: string }
  | { type: 'CLEAR_MESSAGES' };

// Initial state
interface ChatState {
  conversations: ChatConversation[];
  currentChat: ChatConversation | null;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  currentChat: null,
  messages: [],
  loading: false,
  error: null,
};

// Reducer function
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };

    case 'SET_CURRENT_CHAT':
      return { ...state, currentChat: action.payload };

    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id ? action.payload : msg
        ),
      };

    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload
            ? { ...msg, deleted: true, content: 'This message was deleted' }
            : msg
        ),
      };

    case 'ADD_REACTION':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.messageId
            ? {
                ...msg,
                reactions: msg.reactions?.map(r =>
                  r.emoji === action.payload.reaction.emoji ? action.payload.reaction : r
                ).concat(
                  msg.reactions?.find(r => r.emoji === action.payload.reaction.emoji)
                    ? []
                    : [action.payload.reaction]
                ) || [action.payload.reaction],
              }
            : msg
        ),
      };

    case 'REMOVE_REACTION':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.messageId
            ? {
                ...msg,
                reactions: msg.reactions?.filter(r => r.emoji !== action.payload.emoji) || [],
              }
            : msg
        ),
      };

    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id ? action.payload : conv
        ),
        currentChat: state.currentChat?.id === action.payload.id ? action.payload : state.currentChat,
      };

    case 'MARK_MESSAGE_READ':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload ? { ...msg, status: 'read' as const } : msg
        ),
      };

    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };

    default:
      return state;
  }
};

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await chatService.getConversations();
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_CONVERSATIONS', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load conversations' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const sendMessage = async (content: string, replyTo?: string) => {
    if (!state.currentChat) return;

    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await chatService.sendMessage({
        chatId: state.currentChat.id,
        content,
        replyTo,
      });

      if (response.success && response.data) {
        dispatch({ type: 'ADD_MESSAGE', payload: response.data.message });
        
        // Update conversation's last message
        const updatedConversation = {
          ...state.currentChat,
          lastMessage: content,
          lastMessageTime: new Date().toISOString(),
        };
        dispatch({ type: 'UPDATE_CONVERSATION', payload: updatedConversation });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to send message' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const addReaction = async (messageId: string, emoji: string) => {
    try {
      const response = await chatService.addReaction({ messageId, emoji });

      if (response.success && response.data) {
        dispatch({ type: 'ADD_REACTION', payload: { messageId, reaction: response.data } });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const removeReaction = async (messageId: string, emoji: string) => {
    try {
      const response = await chatService.removeReaction({ messageId, emoji });

      if (response.success) {
        dispatch({ type: 'REMOVE_REACTION', payload: { messageId, emoji } });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const loadMoreMessages = async () => {
    if (!state.currentChat) return;

    try {
      const response = await chatService.getMessages({
        chatId: state.currentChat.id,
        page: Math.floor(state.messages.length / 50) + 1,
        limit: 50,
      });

      if (response.success && response.data) {
        dispatch({ type: 'SET_MESSAGES', payload: [...response.data.messages, ...state.messages] });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const setCurrentChat = (chat: ChatConversation) => {
    dispatch({ type: 'SET_CURRENT_CHAT', payload: chat });
    dispatch({ type: 'CLEAR_MESSAGES' });
    
    // Load messages for the new chat
    loadMessages(chat.id);
  };

  const loadMessages = async (chatId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await chatService.getMessages({
        chatId,
        page: 1,
        limit: 50,
      });

      if (response.success && response.data) {
        dispatch({ type: 'SET_MESSAGES', payload: response.data.messages });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to load messages' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await chatService.markAsRead(messageId);
      dispatch({ type: 'MARK_MESSAGE_READ', payload: messageId });
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const response = await chatService.deleteMessage(messageId);

      if (response.success) {
        dispatch({ type: 'DELETE_MESSAGE', payload: messageId });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to delete message' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const editMessage = async (messageId: string, content: string) => {
    try {
      const response = await chatService.editMessage(messageId, content);

      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_MESSAGE', payload: response.data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Failed to edit message' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const contextValue: ChatContextType = {
    conversations: state.conversations,
    currentChat: state.currentChat,
    messages: state.messages,
    loading: state.loading,
    error: state.error,
    sendMessage,
    addReaction,
    removeReaction,
    loadMoreMessages,
    setCurrentChat,
    markAsRead,
    deleteMessage,
    editMessage,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Export the context for advanced usage
export default ChatContext;
