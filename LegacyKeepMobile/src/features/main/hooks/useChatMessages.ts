/**
 * useChatMessages Hook
 * 
 * Custom hook for managing chat messages state and operations
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage, SendMessageRequest, GetMessagesRequest } from '../types/chat.types';
import { chatService } from '../services/ChatService';

interface UseChatMessagesProps {
  chatId: string;
  initialMessages?: ChatMessage[];
}

interface UseChatMessagesReturn {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  sending: boolean;
  sendMessage: (content: string, replyTo?: string, hiddenContent?: string) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  editMessage: (messageId: string, content: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  removeReaction: (messageId: string, emoji: string) => Promise<void>;
}

export const useChatMessages = ({
  chatId,
  initialMessages = [],
}: UseChatMessagesProps): UseChatMessagesReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [sending, setSending] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const currentPageRef = useRef(1);
  const lastMessageIdRef = useRef<string | null>(null);

  // Load initial messages
  const loadMessages = useCallback(async (page: number = 1, before?: string) => {
    if (!chatId) return;

    try {
      setLoading(true);
      setError(null);

      const request: GetMessagesRequest = {
        chatId,
        page,
        limit: 50,
        before,
      };

      const response = await chatService.getMessages(request);

      if (response.success && response.data) {
        const newMessages = response.data.messages;
        
        if (page === 1) {
          setMessages(newMessages);
        } else {
          setMessages(prev => [...newMessages, ...prev]);
        }
        
        setHasMore(response.data.hasMore);
        
        if (newMessages.length > 0) {
          lastMessageIdRef.current = newMessages[newMessages.length - 1].id;
        }
        
        currentPageRef.current = page;
      } else {
        setError(response.error || 'Failed to load messages');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  // Load more messages (for pagination)
  const loadMoreMessages = useCallback(async () => {
    if (isLoadingMore || !hasMore || !lastMessageIdRef.current) return;

    try {
      setIsLoadingMore(true);
      
      const response = await chatService.getMessages({
        chatId,
        page: currentPageRef.current + 1,
        limit: 50,
        before: lastMessageIdRef.current,
      });

      if (response.success && response.data) {
        setMessages(prev => [...response.data.messages, ...prev]);
        setHasMore(response.data.hasMore);
        currentPageRef.current += 1;
        
        if (response.data.messages.length > 0) {
          lastMessageIdRef.current = response.data.messages[response.data.messages.length - 1].id;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoadingMore(false);
    }
  }, [chatId, isLoadingMore, hasMore]);

  // Refresh messages (pull to refresh)
  const refreshMessages = useCallback(async () => {
    await loadMessages(1);
  }, [loadMessages]);

  // Send a new message
  const sendMessage = useCallback(async (
    content: string,
    replyTo?: string,
    hiddenContent?: string
  ) => {
    if (!chatId || !content.trim()) return;

    try {
      setSending(true);
      setError(null);

      const request: SendMessageRequest = {
        chatId,
        content: content.trim(),
        replyTo,
        messageType: 'text',
        hiddenContent,
      };

      const response = await chatService.sendMessage(request);

      if (response.success && response.data) {
        setMessages(prev => [...prev, response.data.message]);
      } else {
        setError(response.error || 'Failed to send message');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSending(false);
    }
  }, [chatId]);

  // Edit a message
  const editMessage = useCallback(async (messageId: string, content: string) => {
    try {
      setError(null);

      const response = await chatService.editMessage(messageId, content);

      if (response.success && response.data) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, content, edited: true } : msg
          )
        );
      } else {
        setError(response.error || 'Failed to edit message');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  // Delete a message
  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      setError(null);

      const response = await chatService.deleteMessage(messageId);

      if (response.success) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, deleted: true, content: 'This message was deleted' } : msg
          )
        );
      } else {
        setError(response.error || 'Failed to delete message');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  // Mark message as read
  const markAsRead = useCallback(async (messageId: string) => {
    try {
      await chatService.markAsRead(messageId);
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status: 'read' as const } : msg
        )
      );
    } catch (err) {
      console.error('Failed to mark message as read:', err);
    }
  }, []);

  // Add reaction to a message
  const addReaction = useCallback(async (messageId: string, emoji: string) => {
    try {
      const response = await chatService.addReaction({ messageId, emoji });

      if (response.success && response.data) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId
              ? {
                  ...msg,
                  reactions: msg.reactions?.map(r =>
                    r.emoji === emoji ? response.data : r
                  ).concat(
                    msg.reactions?.find(r => r.emoji === emoji) ? [] : [response.data]
                  ) || [response.data],
                }
              : msg
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  // Remove reaction from a message
  const removeReaction = useCallback(async (messageId: string, emoji: string) => {
    try {
      const response = await chatService.removeReaction({ messageId, emoji });

      if (response.success) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId
              ? {
                  ...msg,
                  reactions: msg.reactions?.filter(r => r.emoji !== emoji) || [],
                }
              : msg
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  // Load messages when chatId changes
  useEffect(() => {
    if (chatId) {
      loadMessages(1);
    }
  }, [chatId, loadMessages]);

  // Set initial messages if provided
  useEffect(() => {
    if (initialMessages.length > 0 && messages.length === 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages, messages.length]);

  return {
    messages,
    loading,
    error,
    hasMore,
    sending,
    sendMessage,
    loadMoreMessages,
    refreshMessages,
    editMessage,
    deleteMessage,
    markAsRead,
    addReaction,
    removeReaction,
  };
};
