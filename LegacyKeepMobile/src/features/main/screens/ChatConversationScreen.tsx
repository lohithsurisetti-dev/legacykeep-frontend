/**
 * Chat Conversation Screen
 * 
 * Dynamic screen that handles both individual and group chat conversations
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, gradients } from '../../../shared/constants';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

// Data interfaces
interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
  replyTo?: {
    id: string;
    senderName: string;
    content: string;
  };
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

interface ChatConversation {
  id: string;
  type: 'individual' | 'group';
  name: string;
  avatar?: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  isOnline?: boolean;
}

interface ChatConversationScreenProps {
  route: {
    params: {
      chat: ChatConversation;
    };
  };
  navigation: any;
}

const ChatConversationScreen: React.FC<ChatConversationScreenProps> = ({ route, navigation }) => {
  const { chat } = route.params;
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Generate consistent colors for each sender
  const getSenderColor = (senderId: string) => {
    const colors = [
      '#1E40AF', // Dark Blue
      '#DC2626', // Dark Red
      '#059669', // Dark Green
      '#D97706', // Dark Amber
      '#7C3AED', // Dark Purple
      '#DB2777', // Dark Pink
      '#0891B2', // Dark Cyan
      '#65A30D', // Dark Lime
      '#EA580C', // Dark Orange
      '#4F46E5', // Dark Indigo
      '#7C2D12', // Dark Brown
      '#374151', // Dark Gray
    ];
    
    // Use senderId to get consistent color
    let hash = 0;
    for (let i = 0; i < senderId.length; i++) {
      hash = senderId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [chat.messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Send message to backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleMessageMenu = (msg: ChatMessage) => {
    setSelectedMessage(msg);
    setShowMessageMenu(true);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const formatTime = (timestamp: string) => {
    // Simple time formatting - in real app, use proper date formatting
    return timestamp;
  };

  const renderHeader = () => {
    if (chat.type === 'group') {
      return (
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{chat.name}</Text>
          </View>
        </View>
      );
    } else {
      const participant = chat.participants[0];
      return (
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            {participant.avatar ? (
              <Image source={{ uri: participant.avatar }} style={styles.headerAvatar} />
            ) : (
              <View style={styles.headerAvatarPlaceholder}>
                <Text style={styles.headerAvatarText}>
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            <Text style={styles.headerTitle}>{participant.name}</Text>
          </View>
        </View>
      );
    }
  };

  const renderMessage = (msg: ChatMessage, index: number) => {
    const isOwn = msg.isOwnMessage;
    const isGroupChat = chat.type === 'group';
    
    // Check if this is the first message from this sender in a sequence
    const isFirstMessageFromSender = isGroupChat && !isOwn && (
      index === 0 || 
      chat.messages[index - 1].senderId !== msg.senderId ||
      chat.messages[index - 1].isOwnMessage
    );
    
    return (
      <View key={msg.id} style={[
        styles.messageContainer,
        isOwn ? styles.ownMessageContainer : styles.otherMessageContainer,
        !isFirstMessageFromSender && !isOwn && styles.consecutiveMessage
      ]}>
        {isOwn ? (
          <LinearGradient
            colors={gradients.peacock}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.messageBubble, styles.ownMessageBubble]}
          >
            <View style={styles.ownMessageBubbleInner}>
              {msg.replyTo && (
                <View style={styles.replyContainer}>
                  <View style={styles.replyContent}>
                    <Text style={styles.replySender}>{msg.replyTo.senderName}</Text>
                    <Text style={styles.replyText} numberOfLines={1}>{msg.replyTo.content}</Text>
                  </View>
                </View>
              )}
              <Text style={[styles.messageText, styles.ownMessageText]}>
                {msg.content || ''}
              </Text>
              <Text style={styles.messageTimeInBubble}>
                {formatTime(msg.timestamp)}
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={[
            styles.messageBubble, 
            styles.otherMessageBubble,
            chat.type === 'group' && styles.groupMessageBubble
          ]}>
            {/* Profile pic and name inside bubble for group chats - only show for first message in sequence */}
            {isFirstMessageFromSender && (
              <View style={[styles.senderInfoInBubble, { borderBottomColor: getSenderColor(msg.senderId) }]}>
                <Image 
                  source={{ uri: msg.senderAvatar }} 
                  style={styles.senderAvatarInBubble}
                />
                <Text style={[styles.senderNameInBubble, { color: getSenderColor(msg.senderId) }]}>
                  {msg.senderName || ''}
                </Text>
                
                {/* Action icons */}
                <View style={styles.senderActions}>
                  <TouchableOpacity style={styles.senderActionButton}>
                    <Ionicons name="chatbubble-outline" size={14} color="#374151" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.senderActionButton}>
                    <Ionicons name="call-outline" size={14} color="#374151" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.senderActionButton}
                    onPress={() => handleMessageMenu(msg)}
                  >
                    <Ionicons name="ellipsis-horizontal" size={14} color="#374151" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
            {msg.replyTo && (
              <View style={styles.replyContainer}>
                <View style={styles.replyContent}>
                  <Text style={styles.replySender}>{msg.replyTo.senderName || ''}</Text>
                  <Text style={styles.replyText} numberOfLines={1}>{msg.replyTo.content || ''}</Text>
                </View>
              </View>
            )}
            <Text style={[styles.messageText, styles.otherMessageText]}>
              {msg.content || ''}
            </Text>
            <View style={styles.messageBottomRow}>
              <Text style={styles.messageTimeInBubble}>
                {formatTime(msg.timestamp)}
              </Text>
              
              {/* Action icons for all messages */}
              {isGroupChat && (
                <View style={styles.messageActions}>
                  <TouchableOpacity style={styles.messageActionButton}>
                    <Ionicons name="arrow-redo-outline" size={12} color="#374151" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
        
        {/* Reactions */}
        {msg.reactions && msg.reactions.length > 0 && (
          <View style={[
            styles.reactionsContainer,
            isOwn ? styles.ownReactionsContainer : styles.otherReactionsContainer
          ]}>
            {msg.reactions.map((reaction, index) => (
              <View key={index} style={styles.reactionBubble}>
                <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                <Text style={styles.reactionCount}>{reaction.count}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderInputArea = () => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          {/* Camera - hide when typing */}
          {!message.trim() && (
            <TouchableOpacity 
              style={styles.inputButton}
              onPress={() => {/* Handle camera */}}
            >
              <Ionicons name="camera" size={24} color="#6B7280" />
            </TouchableOpacity>
          )}
          
          {/* Attachment options - hide when typing */}
          {!message.trim() && (
            <TouchableOpacity 
              style={styles.inputButton}
              onPress={() => setShowAttachmentOptions(!showAttachmentOptions)}
            >
              <Ionicons name="add" size={24} color="#6B7280" />
            </TouchableOpacity>
          )}
          
          {/* Voice message - hide when typing */}
          {!message.trim() && (
            <TouchableOpacity style={styles.inputButton}>
              <Ionicons name="mic" size={24} color="#6B7280" />
            </TouchableOpacity>
          )}
          
          {/* Emoji picker - always visible */}
          <TouchableOpacity 
            style={styles.inputButton}
            onPress={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Ionicons name="happy-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
          
          {/* Text input - expands when typing */}
          <View style={[
            styles.textInputContainer,
            message.trim() && styles.textInputContainerExpanded
          ]}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#6B7280"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
          </View>
          
          {/* Send button - only show when there's text */}
          {message.trim() && (
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <LinearGradient
                colors={gradients.peacock}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sendButtonGradient}
              >
                <Ionicons name="send" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        
        {renderHeader()}
        
        {/* Call Icons */}
        <View style={styles.callButtonsContainer}>
          {/* Audio Call */}
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => {/* Handle audio call */}}
          >
            <Ionicons name="call-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
          
          {/* Video Call */}
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => {/* Handle video call */}}
          >
            <Ionicons name="videocam-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.messagesContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Date separator */}
          <View style={styles.dateSeparator}>
            <Text style={styles.dateText}>Today</Text>
          </View>
          
          {/* Messages */}
          {chat.messages.map((msg, index) => renderMessage(msg, index))}
        </ScrollView>
        
        {/* Input Area */}
        {renderInputArea()}
      </KeyboardAvoidingView>

      {/* Message Menu Modal */}
      <Modal
        visible={showMessageMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMessageMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMessageMenu(false)}
        >
          <View style={styles.messageMenuContainer}>
            <View style={styles.messageMenuHeader}>
              <Text style={styles.messageMenuTitle}>Message Options</Text>
            </View>
            
            <TouchableOpacity style={styles.messageMenuOption}>
              <Ionicons name="star-outline" size={20} color="#374151" />
              <Text style={styles.messageMenuText}>Mark as Favorite</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageMenuOption}>
              <Ionicons name="copy-outline" size={20} color="#374151" />
              <Text style={styles.messageMenuText}>Copy Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageMenuOption}>
              <Ionicons name="bookmark-outline" size={20} color="#374151" />
              <Text style={styles.messageMenuText}>Save to Family Memories</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageMenuOption}>
              <Ionicons name="flag-outline" size={20} color="#374151" />
              <Text style={styles.messageMenuText}>Report Message</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // bg-gray-50 from HTML
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // bg-white/80 from HTML
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // border-gray-200 from HTML
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  moreButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  callButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  callButton: {
    padding: spacing.sm,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  headerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: gradients.peacock[0],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  headerAvatarText: {
    color: 'white',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  headerTitle: {
    fontSize: typography.sizes.xl, // text-xl from HTML (20px)
    fontWeight: typography.weights.bold,
    color: '#111827', // text-gray-900 from HTML
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  dateSeparator: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dateText: {
    fontSize: typography.sizes.xs,
    color: '#6B7280', // text-gray-500 from HTML
    backgroundColor: '#E5E7EB', // bg-gray-200 from HTML
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  messageContainer: {
    marginBottom: spacing.sm, // Reduced spacing for more content
  },
  ownMessageContainer: {
    alignItems: 'flex-end',
  },
  otherMessageContainer: {
    alignItems: 'flex-start',
  },
  consecutiveMessage: {
    marginTop: -spacing.xs, // Reduce spacing for consecutive messages
  },
  senderInfoInBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
  },
  senderAvatarInBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: spacing.sm,
  },
  senderNameInBubble: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  senderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  senderActionButton: {
    padding: spacing.xs,
    borderRadius: 8,
    opacity: 0.8,
  },
  messageBubble: {
    maxWidth: '80%',
  },
  ownMessageBubble: {
    borderRadius: 18,
    borderBottomRightRadius: 4,
  },
  ownMessageBubbleInner: {
    backgroundColor: '#F0F9FF', // Light blue background for self messages
    borderRadius: 16,
    borderBottomRightRadius: 3,
    paddingHorizontal: 14,
    paddingVertical: 10,
    margin: 1.5, // This creates the gradient border effect
  },
  otherMessageBubble: {
    backgroundColor: '#E5E7EB', // bg-gray-200 from HTML
    borderBottomLeftRadius: 4,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  groupMessageBubble: {
    // No special styling needed since sender info is now inside
  },
  messageText: {
    fontSize: typography.sizes.sm, // Improved font size (14px)
    lineHeight: 20,
  },
  messageBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  messageTimeInBubble: {
    fontSize: typography.sizes.xs, // 12px
    color: '#9CA3AF', // text-gray-400
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  messageActionButton: {
    padding: spacing.xs,
    borderRadius: 6,
    opacity: 0.7,
  },
  ownMessageText: {
    color: '#1F2937', // text-gray-800 from HTML (same as other messages)
  },
  otherMessageText: {
    color: '#1F2937', // text-gray-800 from HTML
  },
  replyContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    paddingBottom: spacing.xs,
    backgroundColor: '#F3F4F6', // bg-gray-100 from HTML
    borderLeftWidth: 2,
    borderLeftColor: '#1877F2', // var(--instagram-blue) from HTML
    paddingLeft: spacing.xs,
    borderRadius: 6,
    paddingVertical: spacing.xs,
  },
  replyContent: {
    flex: 1,
  },
  replySender: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: '#1877F2', // var(--instagram-blue) from HTML
  },
  replyText: {
    fontSize: typography.sizes.xs,
    color: '#6B7280', // text-gray-500 from HTML
  },
  reactionsContainer: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  ownReactionsContainer: {
    alignSelf: 'flex-end', // Own messages: reactions on the right
  },
  otherReactionsContainer: {
    alignSelf: 'flex-start', // Other messages: reactions close to the message bubble
  },
  reactionBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    marginLeft: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reactionEmoji: {
    fontSize: 10,
    marginRight: 2,
  },
  reactionCount: {
    fontSize: 10,
    color: '#1F2937', // text-gray-800 from HTML
    fontWeight: typography.weights.medium,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // bg-white/80 from HTML
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB', // border-gray-200 from HTML
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 0, // Move input bar all the way to bottom
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputButton: {
    padding: spacing.sm,
    marginRight: spacing.xs,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-100 from HTML
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    maxHeight: 100,
  },
  textInputContainerExpanded: {
    flex: 2, // Expand more when typing
    marginRight: spacing.xs, // Reduce margin when expanded
  },
  textInput: {
    fontSize: typography.sizes.sm,
    color: '#111827', // text-gray-900 from HTML
    lineHeight: 20,
    textAlignVertical: 'center', // Center align text vertically
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: gradients.peacock[0],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageMenuContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.md,
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  messageMenuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  messageMenuTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: '#111827',
    textAlign: 'center',
  },
  messageMenuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: 8,
  },
  messageMenuText: {
    fontSize: typography.sizes.md,
    color: '#374151',
    marginLeft: spacing.md,
  },
});

export default ChatConversationScreen;
