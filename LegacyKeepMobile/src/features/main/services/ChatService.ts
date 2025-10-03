/**
 * Chat Service
 * 
 * Handles all chat-related API calls and business logic
 */

import {
  ChatConversation,
  ChatMessage,
  MessageReaction,
  SendMessageRequest,
  SendMessageResponse,
  GetMessagesRequest,
  GetMessagesResponse,
  AddReactionRequest,
  RemoveReactionRequest,
  ApiResponse,
  PaginatedResponse,
} from '../types/chat.types';

// Mock API base URL - replace with actual API URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.legacykeep.com';

class ChatService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Authentication headers - replace with actual auth logic
  private getAuthHeaders(): Record<string, string> {
    const token = 'mock-token'; // Replace with actual token from storage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Generic API request handler
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: null as any,
      };
    }
  }

  // Get all conversations for the current user
  async getConversations(): Promise<ApiResponse<ChatConversation[]>> {
    return this.request<ChatConversation[]>('/api/chats');
  }

  // Get a specific conversation by ID
  async getConversation(chatId: string): Promise<ApiResponse<ChatConversation>> {
    return this.request<ChatConversation>(`/api/chats/${chatId}`);
  }

  // Get messages for a conversation
  async getMessages(params: GetMessagesRequest): Promise<ApiResponse<GetMessagesResponse>> {
    const queryParams = new URLSearchParams();
    queryParams.append('page', (params.page || 1).toString());
    queryParams.append('limit', (params.limit || 50).toString());
    if (params.before) {
      queryParams.append('before', params.before);
    }

    return this.request<GetMessagesResponse>(
      `/api/chats/${params.chatId}/messages?${queryParams}`
    );
  }

  // Send a new message
  async sendMessage(params: SendMessageRequest): Promise<ApiResponse<SendMessageResponse>> {
    return this.request<SendMessageResponse>(
      `/api/chats/${params.chatId}/messages`,
      {
        method: 'POST',
        body: JSON.stringify({
          content: params.content,
          replyTo: params.replyTo,
          messageType: params.messageType || 'text',
          hiddenContent: params.hiddenContent,
        }),
      }
    );
  }

  // Edit a message
  async editMessage(messageId: string, content: string): Promise<ApiResponse<ChatMessage>> {
    return this.request<ChatMessage>(`/api/messages/${messageId}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    });
  }

  // Delete a message
  async deleteMessage(messageId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/messages/${messageId}`, {
      method: 'DELETE',
    });
  }

  // Add reaction to a message
  async addReaction(params: AddReactionRequest): Promise<ApiResponse<MessageReaction>> {
    return this.request<MessageReaction>(`/api/messages/${params.messageId}/reactions`, {
      method: 'POST',
      body: JSON.stringify({ emoji: params.emoji }),
    });
  }

  // Remove reaction from a message
  async removeReaction(params: RemoveReactionRequest): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/messages/${params.messageId}/reactions/${params.emoji}`, {
      method: 'DELETE',
    });
  }

  // Mark message as read
  async markAsRead(messageId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/messages/${messageId}/read`, {
      method: 'POST',
    });
  }

  // Mark conversation as read
  async markConversationAsRead(chatId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/chats/${chatId}/read`, {
      method: 'POST',
    });
  }

  // Send typing indicator
  async sendTypingIndicator(chatId: string, isTyping: boolean): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/chats/${chatId}/typing`, {
      method: 'POST',
      body: JSON.stringify({ isTyping }),
    });
  }

  // Create a new conversation
  async createConversation(
    participants: string[],
    type: 'individual' | 'group',
    name?: string
  ): Promise<ApiResponse<ChatConversation>> {
    return this.request<ChatConversation>('/api/chats', {
      method: 'POST',
      body: JSON.stringify({
        participants,
        type,
        name,
      }),
    });
  }

  // Update conversation settings
  async updateConversationSettings(
    chatId: string,
    settings: Partial<ChatConversation['settings']>
  ): Promise<ApiResponse<ChatConversation>> {
    return this.request<ChatConversation>(`/api/chats/${chatId}/settings`, {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
  }

  // Search messages in a conversation
  async searchMessages(
    chatId: string,
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<PaginatedResponse<ChatMessage>>> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());

    return this.request<PaginatedResponse<ChatMessage>>(
      `/api/chats/${chatId}/search?${queryParams}`
    );
  }

  // Get conversation participants
  async getParticipants(chatId: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/api/chats/${chatId}/participants`);
  }

  // Add participant to group chat
  async addParticipant(chatId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/chats/${chatId}/participants`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Remove participant from group chat
  async removeParticipant(chatId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/chats/${chatId}/participants/${userId}`, {
      method: 'DELETE',
    });
  }

  // Leave conversation
  async leaveConversation(chatId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/chats/${chatId}/leave`, {
      method: 'POST',
    });
  }
}

// Export singleton instance
export const chatService = new ChatService();

// Export class for testing
export default ChatService;
