/**
 * Chat Conversation Screen - New Architecture
 * 
 * Well-architected chat screen using separated components and hooks
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import ReanimatedAnimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

import { useChat } from '../context/ChatContext';
import { useChatMessages } from '../hooks/useChatMessages';
import { getSenderColor } from '../utils/chat.utils';

// Components
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import ReactionsBar from '../components/ReactionsBar';

import { ChatMessage, MessageAction } from '../types/chat.types';
import { spacing } from '../../../shared/constants';

interface ChatConversationScreenNewProps {
  route: {
    params: {
      chat: {
        id: string;
        type: 'individual' | 'group';
        name: string;
        avatar?: string;
        participants: any[];
        messages: any[];
        isOnline?: boolean;
        lastMessage: string;
        lastMessageTime: string;
        unreadCount?: number;
      };
    };
  };
  navigation: any;
}

const ChatConversationScreenNew: React.FC<ChatConversationScreenNewProps> = ({
  route,
  navigation,
}) => {
  const { chat } = route.params;
  const { setCurrentChat } = useChat();

  // Local state
  const [showMessageOverlay, setShowMessageOverlay] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [replyToMessage, setReplyToMessage] = useState<ChatMessage | null>(null);

  // Animation values
  const overlayAnimation = useSharedValue(0);
  const messageAnimation = useSharedValue(0);

  // Use chat messages hook
  const {
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
  } = useChatMessages({
    chatId: chat.id,
    initialMessages: chat.messages,
  });

  // Set current chat when component mounts
  React.useEffect(() => {
    setCurrentChat(chat);
  }, [chat, setCurrentChat]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Handle call actions
  const handleCall = useCallback(() => {
    Alert.alert('Call', 'Call functionality will be implemented');
  }, []);

  const handleVideoCall = useCallback(() => {
    Alert.alert('Video Call', 'Video call functionality will be implemented');
  }, []);

  // Handle more options
  const handleMore = useCallback(() => {
    Alert.alert('More Options', 'More options will be implemented');
  }, []);

  // Handle message sending
  const handleSendMessage = useCallback(async (content: string) => {
    await sendMessage(content, replyToMessage?.id);
    setReplyToMessage(null); // Clear reply after sending
  }, [sendMessage, replyToMessage]);

  // Handle typing indicator
  const handleTyping = useCallback((isTyping: boolean) => {
    // Implement typing indicator logic here
    console.log('Typing:', isTyping);
  }, []);

  // Handle message actions
  const handleMessageReply = useCallback((message: ChatMessage) => {
    setReplyToMessage(message);
  }, []);

  const handleMessageReact = useCallback(async (message: ChatMessage, emoji: string) => {
    await addReaction(message.id, emoji);
  }, [addReaction]);

  const handleMessageLongPress = useCallback((message: ChatMessage) => {
    setSelectedMessage(message);
    setShowMessageOverlay(true);
    
    // Animate overlay in
    overlayAnimation.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
    messageAnimation.value = withTiming(1, {
      duration: 350,
      easing: Easing.out(Easing.quad),
    });
  }, [overlayAnimation, messageAnimation]);

  const handleMessageFlip = useCallback((messageId: string) => {
    console.log('Message flipped:', messageId);
  }, []);

  // Handle message overlay actions
  const handleOverlayClose = useCallback(() => {
    overlayAnimation.value = withTiming(0, {
      duration: 250,
      easing: Easing.in(Easing.quad),
    });
    messageAnimation.value = withTiming(0, {
      duration: 200,
      easing: Easing.in(Easing.quad),
    });
    
    setTimeout(() => {
      setShowMessageOverlay(false);
      setSelectedMessage(null);
    }, 250);
  }, [overlayAnimation, messageAnimation]);

  const handleReaction = useCallback(async (emoji: string) => {
    if (selectedMessage) {
      await addReaction(selectedMessage.id, emoji);
    }
    handleOverlayClose();
  }, [selectedMessage, addReaction, handleOverlayClose]);

  const handleMessageAction = useCallback(async (action: MessageAction) => {
    if (!selectedMessage) return;

    switch (action) {
      case 'reply':
        setReplyToMessage(selectedMessage);
        handleOverlayClose();
        break;
      case 'copy':
        // Implement copy to clipboard
        Alert.alert('Copied', 'Message copied to clipboard');
        handleOverlayClose();
        break;
      case 'forward':
        // Implement forward functionality
        Alert.alert('Forward', 'Forward functionality will be implemented');
        handleOverlayClose();
        break;
      case 'save':
        // Implement save to story
        Alert.alert('Saved', 'Message saved to story');
        handleOverlayClose();
        break;
      case 'delete':
        Alert.alert(
          'Delete Message',
          'Are you sure you want to delete this message?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                await deleteMessage(selectedMessage.id);
                handleOverlayClose();
              },
            },
          ]
        );
        break;
      default:
        handleOverlayClose();
    }
  }, [selectedMessage, deleteMessage, handleOverlayClose]);

  const handleCancelReply = useCallback(() => {
    setReplyToMessage(null);
  }, []);

  // Animation styles
  const messageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(messageAnimation.value, [0, 1], [0.8, 1]),
      },
      {
        translateY: interpolate(messageAnimation.value, [0, 1], [20, 0]),
      },
      {
        rotateX: `${interpolate(messageAnimation.value, [0, 1], [8, 0])}deg`,
      },
    ],
    shadowOpacity: interpolate(messageAnimation.value, [0, 1], [0, 0.3]),
    shadowRadius: interpolate(messageAnimation.value, [0, 1], [0, 8]),
    elevation: interpolate(messageAnimation.value, [0, 1], [0, 8]),
  }));

  const reactionsStyle = useAnimatedStyle(() => ({
    opacity: messageAnimation.value,
    transform: [
      {
        translateY: interpolate(messageAnimation.value, [0, 1], [10, 0]),
      },
      {
        scale: interpolate(messageAnimation.value, [0, 1], [0.95, 1]),
      },
    ],
  }));

  const menuStyle = useAnimatedStyle(() => ({
    opacity: messageAnimation.value,
    transform: [
      {
        translateY: interpolate(messageAnimation.value, [0, 1], [-10, 0]),
      },
      {
        scale: interpolate(messageAnimation.value, [0, 1], [0.95, 1]),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Header */}
      <ChatHeader
        chat={chat}
        onBack={handleBack}
        onCall={handleCall}
        onVideoCall={handleVideoCall}
        onMore={handleMore}
      />

      {/* Message List */}
      <MessageList
        messages={messages}
        onLoadMore={loadMoreMessages}
        hasMore={hasMore}
        loading={loading}
        getSenderColor={getSenderColor}
      />

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        replyTo={replyToMessage}
        onCancelReply={handleCancelReply}
        disabled={sending}
      />

      {/* Message Overlay */}
      {showMessageOverlay && selectedMessage && (
        <Modal transparent visible={showMessageOverlay} animationType="none" statusBarTranslucent>
          <Pressable style={styles.overlayBackdrop} onPress={handleOverlayClose}>
            {/* Blur Background */}
            <BlurView intensity={100} tint="dark" style={styles.blurView}>
              <View style={styles.darkOverlay} />
            </BlurView>

            {/* Overlay Content */}
            <View style={styles.overlayContainer}>
              <View style={styles.overlayContent}>
                {/* Selected Message */}
                <ReanimatedAnimated.View style={[styles.overlayMessageWrapper, messageStyle]}>
                  {/* Render the selected message here */}
                  <View style={styles.overlayMessageBubble}>
                    <Text style={styles.overlayMessageText}>
                      {selectedMessage.content}
                    </Text>
                    <Text style={styles.overlayMessageTime}>
                      {selectedMessage.timestamp}
                    </Text>
                  </View>
                </ReanimatedAnimated.View>

                {/* Reactions Bar */}
                <ReanimatedAnimated.View style={[styles.overlayReactionsBar, reactionsStyle]}>
                  <ReactionsBar
                    reactions={['👍', '❤️', '😂', '😮', '😢']}
                    onReaction={handleReaction}
                    onAddReaction={() => {
                      // Handle add reaction
                    }}
                    showAddButton={true}
                    style={styles.overlayReactionsBarInner}
                  />
                </ReanimatedAnimated.View>

                {/* Menu Options */}
                <ReanimatedAnimated.View style={[styles.overlayMenuOptions, menuStyle]}>
                  {[
                    { icon: 'chatbubble-outline', label: 'Reply', action: 'reply' as MessageAction },
                    { icon: 'copy-outline', label: 'Copy', action: 'copy' as MessageAction },
                    { icon: 'arrow-forward-outline', label: 'Forward', action: 'forward' as MessageAction },
                    { icon: 'bookmark-outline', label: 'Add to Story', action: 'save' as MessageAction },
                    { icon: 'trash-outline', label: 'Delete', action: 'delete' as MessageAction },
                  ].map((option, index) => (
                    <Pressable
                      key={option.action}
                      style={[
                        styles.overlayMenuOption,
                        option.action === 'delete' && styles.overlayMenuOptionDelete,
                      ]}
                      onPress={() => handleMessageAction(option.action)}
                    >
                      <Text
                        style={[
                          styles.overlayMenuOptionText,
                          option.action === 'delete' && styles.overlayMenuOptionTextDelete,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </ReanimatedAnimated.View>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  overlayBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  overlayContent: {
    maxWidth: 320,
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  overlayMessageWrapper: {
    backgroundColor: 'transparent',
    zIndex: 25,
    maxWidth: '85%',
  },
  overlayMessageBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  overlayMessageText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1F2937',
    textAlign: 'left',
  },
  overlayMessageTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  overlayReactionsBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    height: 56,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  overlayReactionsBarInner: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  overlayMenuOptions: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  overlayMenuOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  overlayMenuOptionDelete: {
    borderBottomWidth: 0,
  },
  overlayMenuOptionText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    textAlign: 'left',
  },
  overlayMenuOptionTextDelete: {
    color: '#DC2626',
  },
});

export default ChatConversationScreenNew;
