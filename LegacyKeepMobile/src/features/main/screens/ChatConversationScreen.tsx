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
  Modal,
  StatusBar,
  Pressable,
  Animated
} from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, gradients } from '../../../shared/constants';
import { LinearGradient } from 'expo-linear-gradient';
import ReanimatedAnimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const { width: screenWidth } = Dimensions.get('window');

// Helper function for time formatting
const formatTime = (timestamp: string) => {
  // Simple time formatting - in real app, use proper date formatting
  return timestamp;
};

// Simple Reactions Bar Component
const ReactionsBar: React.FC<{
  reactions: string[];
  onReaction: (emoji: string) => void;
  onAddReaction?: () => void;
  showAddButton?: boolean;
  style?: any;
}> = ({ reactions, onReaction, onAddReaction, showAddButton = true, style }) => {
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

// Swipe Indicator Component
const SwipeIndicator: React.FC<{ hasHiddenContent: boolean }> = ({ hasHiddenContent }) => {
  const arrowAnimation = useSharedValue(0);

  useEffect(() => {
    if (hasHiddenContent) {
      arrowAnimation.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.bezier(0.68, -0.55, 0.265, 1.55) }),
        -1,
        false
      );
    } else {
      arrowAnimation.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
    }
  }, [hasHiddenContent]);

  // Individual arrow animation handled separately

  if (!hasHiddenContent) return null;

  return (
    <View style={styles.swipeIndicator}>
      <ReanimatedAnimated.View style={[
        styles.individualArrow,
        useAnimatedStyle(() => ({
          opacity: interpolate(arrowAnimation.value, [0.75, 0.875, 1], [0.6, 1, 0.6]),
          transform: [{ scale: interpolate(arrowAnimation.value, [0.75, 0.875, 1], [1, 1.3, 1]) }],
        }))
      ]}>
        <Ionicons name="chevron-back" size={12} color="#6B7280" />
      </ReanimatedAnimated.View>
      <ReanimatedAnimated.View style={[
        styles.individualArrow,
        useAnimatedStyle(() => ({
          opacity: interpolate(arrowAnimation.value, [0.5, 0.625, 0.75], [0.6, 1, 0.6]),
          transform: [{ scale: interpolate(arrowAnimation.value, [0.5, 0.625, 0.75], [1, 1.3, 1]) }],
        }))
      ]}>
        <Ionicons name="chevron-back" size={12} color="#6B7280" />
      </ReanimatedAnimated.View>
      <ReanimatedAnimated.View style={[
        styles.individualArrow,
        useAnimatedStyle(() => ({
          opacity: interpolate(arrowAnimation.value, [0.25, 0.375, 0.5], [0.6, 1, 0.6]),
          transform: [{ scale: interpolate(arrowAnimation.value, [0.25, 0.375, 0.5], [1, 1.3, 1]) }],
        }))
      ]}>
        <Ionicons name="chevron-back" size={12} color="#6B7280" />
      </ReanimatedAnimated.View>
      <ReanimatedAnimated.View style={[
        styles.individualArrow,
        useAnimatedStyle(() => ({
          opacity: interpolate(arrowAnimation.value, [0, 0.125, 0.25], [0.6, 1, 0.6]),
          transform: [{ scale: interpolate(arrowAnimation.value, [0, 0.125, 0.25], [1, 1.3, 1]) }],
        }))
      ]}>
        <Ionicons name="chevron-back" size={12} color="#6B7280" />
      </ReanimatedAnimated.View>
    </View>
  );
};

// Message Menu Overlay Component
const MessageMenuOverlay: React.FC<{
  visible: boolean;
  message: ChatMessage | null;
  chat: any; // Add chat prop
  onClose: () => void;
  onReaction: (emoji: string) => void;
  onAction: (action: string) => void;
  renderMessage: (msg: ChatMessage, index: number) => React.ReactNode;
  getSenderColor: (senderId: string) => string; // Add getSenderColor prop
}> = ({ visible, message, chat, onClose, onReaction, onAction, renderMessage, getSenderColor }) => {
  const overlayAnimation = useSharedValue(0);
  const messageAnimation = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Fast, simultaneous animations
      overlayAnimation.value = withTiming(1, { 
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
      
      // Message animation appears immediately with overlay
      messageAnimation.value = withTiming(1, { 
        duration: 350,
        easing: Easing.out(Easing.quad),
      });
    } else {
      // Quick exit
      messageAnimation.value = withTiming(0, { 
        duration: 250,
        easing: Easing.in(Easing.quad),
      });
      
      overlayAnimation.value = withTiming(0, { 
        duration: 300,
        easing: Easing.in(Easing.quad),
      });
    }
  }, [visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayAnimation.value,
  }));

  const messageStyle = useAnimatedStyle(() => ({
    transform: [
      { 
        scale: interpolate(messageAnimation.value, [0, 1], [0.8, 1]), // Gentle scale
      },
      { 
        translateY: interpolate(messageAnimation.value, [0, 1], [20, 0]), // Subtle movement
      },
      { 
        rotateX: interpolate(messageAnimation.value, [0, 1], [8, 0]) + 'deg', // Gentle rotation
      },
    ],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: interpolate(messageAnimation.value, [0, 1], [0, 0.3]),
    shadowRadius: interpolate(messageAnimation.value, [0, 1], [0, 16]),
    elevation: interpolate(messageAnimation.value, [0, 1], [0, 10]),
  }));

  const reactionsStyle = useAnimatedStyle(() => ({
    opacity: messageAnimation.value, // Appears immediately with message
    transform: [
      { 
        translateY: interpolate(messageAnimation.value, [0, 1], [10, 0]), // Minimal movement
      },
      { 
        scale: interpolate(messageAnimation.value, [0, 1], [0.95, 1]), // Very gentle scale
      },
    ],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: interpolate(messageAnimation.value, [0, 1], [0, 0.15]),
    shadowRadius: interpolate(messageAnimation.value, [0, 1], [0, 8]),
    elevation: interpolate(messageAnimation.value, [0, 1], [0, 4]),
  }));

  const menuStyle = useAnimatedStyle(() => ({
    opacity: messageAnimation.value, // Appears immediately with message
    transform: [
      { 
        translateY: interpolate(messageAnimation.value, [0, 1], [-10, 0]), // Minimal movement
      },
      { 
        scale: interpolate(messageAnimation.value, [0, 1], [0.95, 1]), // Very gentle scale
      },
    ],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: interpolate(messageAnimation.value, [0, 1], [0, 0.15]),
    shadowRadius: interpolate(messageAnimation.value, [0, 1], [0, 8]),
    elevation: interpolate(messageAnimation.value, [0, 1], [0, 4]),
  }));

  const reactions = ['👍', '❤️', '😂', '😮', '😢'];
  const actions = [
    { icon: 'chatbubble-outline', label: 'Reply', action: 'reply' },
    { icon: 'copy-outline', label: 'Copy', action: 'copy' },
    { icon: 'arrow-forward-outline', label: 'Forward', action: 'forward' },
    { icon: 'bookmark-outline', label: 'Add to Story', action: 'save' },
    { icon: 'trash-outline', label: 'Delete', action: 'delete' },
  ];

  if (!visible || !message) return null;

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <Pressable style={styles.overlayBackdrop} onPress={onClose}>
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            {/* Message Bubble - Top */}
            <ReanimatedAnimated.View style={[styles.overlayMessageBubble, messageStyle]}>
              {/* Sender info for group chats */}
              {chat.type === 'group' && !message.isOwnMessage && (
                <View style={[styles.overlaySenderInfo, { borderBottomColor: getSenderColor(message.senderId) }]}>
                  <Image 
                    source={{ uri: message.senderAvatar }} 
                    style={styles.overlaySenderAvatar}
                  />
                  <Text style={[styles.overlaySenderName, { color: getSenderColor(message.senderId) }]}>
                    {String(message.senderName || '')}
                  </Text>
                </View>
              )}
              
              {/* Reply content if exists */}
              {message.replyTo && (
                <View style={styles.overlayReplyContainer}>
                  <View style={styles.overlayReplyContent}>
                  <Text style={styles.overlayReplySender}>{String(message.replyTo.senderName || '')}</Text>
                  <Text style={styles.overlayReplyText} numberOfLines={1}>{String(message.replyTo.content || '')}</Text>
                  </View>
                </View>
              )}
              
              <Text style={styles.overlayMessageText}>{String(message.content || '')}</Text>
              
              {/* Message timestamp */}
              <Text style={styles.overlayMessageTime}>
                {formatTime(message.timestamp || '')}
              </Text>
            </ReanimatedAnimated.View>

             {/* Reactions Bar - Middle */}
             <ReanimatedAnimated.View style={[styles.overlayReactionsBar, reactionsStyle]}>
               <ReactionsBar
                 reactions={reactions}
                 onReaction={onReaction}
                 onAddReaction={() => {
                   // Handle add reaction
                 }}
                 showAddButton={true}
                 style={styles.overlayReactionsBarInner}
               />
             </ReanimatedAnimated.View>

            {/* Menu Options - Bottom */}
            <ReanimatedAnimated.View style={[styles.overlayMenuOptions, menuStyle]}>
              {actions.map((action, index) => (
                <TouchableOpacity
                  key={action.action}
                  style={[
                    styles.overlayMenuOption,
                    action.action === 'delete' && styles.overlayMenuOptionDelete
                  ]}
                  onPress={() => {
                    onAction(action.action);
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.overlayMenuOptionText,
                    action.action === 'delete' && styles.overlayMenuOptionTextDelete
                  ]}>
                    {action.label}
                  </Text>
                  <Ionicons 
                    name={action.icon as any} 
                    size={20} 
                    color={action.action === 'delete' ? '#FF6B6B' : '#FFFFFF'}
                    style={styles.overlayMenuOptionIcon}
                  />
                </TouchableOpacity>
              ))}
            </ReanimatedAnimated.View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

// Data interfaces
interface ChatMessage {
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
  const [flippedMessages, setFlippedMessages] = useState<Set<string>>(new Set());
  const [showMessageOverlay, setShowMessageOverlay] = useState(false);
  const [selectedMessageForOverlay, setSelectedMessageForOverlay] = useState<ChatMessage | null>(null);
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

  // Flip message function
  const toggleMessageFlip = (messageId: string) => {
    setFlippedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
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

  const handleMessageOverlay = (msg: ChatMessage, event: any) => {
    // Set message and show overlay
    setSelectedMessageForOverlay(msg);
    setShowMessageOverlay(true);
  };

  const handleReaction = (emoji: string) => {
    if (selectedMessageForOverlay) {
      // TODO: Add reaction to message
      console.log(`Added reaction ${emoji} to message ${selectedMessageForOverlay.id}`);
    }
  };

  const handleMessageAction = (action: string) => {
    if (selectedMessageForOverlay) {
      // TODO: Handle message action
      console.log(`Action ${action} on message ${selectedMessageForOverlay.id}`);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };


  const renderHeader = () => {
    if (chat.type === 'group') {
      return (
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{chat.name || ''}</Text>
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
                  {(participant.name || '').split(' ').map(n => n[0] || '').join('')}
                </Text>
              </View>
            )}
            <Text style={styles.headerTitle}>{participant.name || ''}</Text>
          </View>
        </View>
      );
    }
  };

  // FlipMessage Component
  const FlipMessage: React.FC<{ msg: ChatMessage; children: React.ReactNode; index: number }> = ({ msg, children, index }) => {
    const flipRotation = useSharedValue(0);
    const jiggleX = useSharedValue(0);
    const isFlipped = flippedMessages.has(msg.id);
    const hasHiddenContent = msg.hasHiddenContent;

    // No jiggle animation - using arrow indicators instead

    // Premium flip animation - slower and more elegant
    useEffect(() => {
      flipRotation.value = withTiming(isFlipped ? 1 : 0, { 
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, [isFlipped]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { perspective: 1000 },
        { 
          scaleY: interpolate(flipRotation.value, [0, 0.5, 1], [1, 0.92, 1]) 
        },
        { 
          scaleX: interpolate(flipRotation.value, [0, 0.5, 1], [1, 0.98, 1]) 
        },
        { 
          rotateY: `${interpolate(flipRotation.value, [0, 0.5, 1], [0, 8, 0])}deg` 
        }
      ],
    }));

    const handleSwipeGesture = (event: any) => {
      const { translationX } = event.nativeEvent;
      if (translationX < -50 && hasHiddenContent) { // Changed to negative for right-to-left
        runOnJS(toggleMessageFlip)(msg.id);
      }
    };

    return (
      <PanGestureHandler
        onGestureEvent={handleSwipeGesture}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === 5) { // END state
            const { translationX } = event.nativeEvent;
            if (translationX < -50 && hasHiddenContent) { // Changed to negative for right-to-left
              toggleMessageFlip(msg.id);
            }
          }
        }}
        minDist={20}
      >
        <ReanimatedAnimated.View style={animatedStyle}>
          {children}
        </ReanimatedAnimated.View>
      </PanGestureHandler>
    );
  };

  const renderMessage = (msg: ChatMessage, index: number) => {
    const isOwn = msg.isOwnMessage;
    const isGroupChat = chat.type === 'group';
    const isFlipped = flippedMessages.has(msg.id);
    const hasHiddenContent = msg.hasHiddenContent;
    
    // Check if this is the first message from this sender in a sequence
    const isFirstMessageFromSender = isGroupChat && !isOwn && (
      index === 0 || 
      chat.messages[index - 1].senderId !== msg.senderId ||
      chat.messages[index - 1].isOwnMessage
    );

    // Determine which content to show
    const displayContent = isFlipped && hasHiddenContent ? (msg.hiddenContent || '') : (msg.content || '');
    
    const messageContent = (
      <Pressable 
        key={msg.id} 
        style={[
          styles.messageContainer,
          isOwn ? styles.ownMessageContainer : styles.otherMessageContainer,
          !isFirstMessageFromSender && !isOwn && styles.consecutiveMessage
        ]}
        onLongPress={(event) => handleMessageOverlay(msg, event)}
      >
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
                    <Text style={styles.replySender}>{msg.replyTo.senderName || ''}</Text>
                    <Text style={styles.replyText} numberOfLines={1}>{msg.replyTo.content || ''}</Text>
                  </View>
                </View>
              )}
              <Text style={[styles.messageText, styles.ownMessageText]}>
                {String(displayContent || '')}
              </Text>
              <Text style={styles.messageTimeInBubble}>
                {formatTime(msg.timestamp || '')}
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={[
            styles.messageBubble, 
            styles.otherMessageBubble,
            chat.type === 'group' && styles.groupMessageBubble,
            isFlipped && styles.flippedMessageBubble
          ]}>
            {/* Profile pic and name inside bubble for group chats - only show for first message in sequence */}
            {isFirstMessageFromSender && (
              <View style={[styles.senderInfoInBubble, { borderBottomColor: getSenderColor(msg.senderId) }]}>
                <Image 
                  source={{ uri: msg.senderAvatar }} 
                  style={styles.senderAvatarInBubble}
                />
                <Text style={[styles.senderNameInBubble, { color: getSenderColor(msg.senderId) }]}>
                  {String(msg.senderName || '')}
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
                    onPress={(event) => handleMessageOverlay(msg, event)}
                  >
                    <Ionicons name="ellipsis-horizontal" size={14} color="#374151" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
            {msg.replyTo && (
              <View style={styles.replyContainer}>
                <View style={styles.replyContent}>
                  <Text style={styles.replySender}>{String(msg.replyTo.senderName || '')}</Text>
                  <Text style={styles.replyText} numberOfLines={1}>{String(msg.replyTo.content || '')}</Text>
                </View>
              </View>
            )}
            <Text style={[
              styles.messageText, 
              styles.otherMessageText,
              isFlipped && styles.flippedMessageText
            ]}>
              {String(displayContent || '')}
            </Text>
            <View style={styles.messageBottomRow}>
              <Text style={styles.messageTimeInBubble}>
                {formatTime(msg.timestamp || '')}
              </Text>
              
              {/* Action icons for all messages */}
              {isGroupChat && (
                <View style={styles.messageActions}>
                  {/* Swipe indicator for messages with hidden content */}
                  <SwipeIndicator hasHiddenContent={msg.hasHiddenContent || false} />
                  
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
      </Pressable>
    );

    // Wrap message with FlipMessage component if it has hidden content
    if (hasHiddenContent) {
      return (
        <FlipMessage msg={msg} index={index}>
          {messageContent}
        </FlipMessage>
      );
    }

    return messageContent;
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Blurred Background Chat Content */}
        {showMessageOverlay && (
          <View style={styles.blurredBackground}>
            <BlurView intensity={100} tint="dark" style={styles.blurView} />
            <View style={styles.darkOverlay} />
          </View>
        )}
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
          {chat.messages.map((msg, index) => (
            <View key={msg.id}>
              {renderMessage(msg, index)}
            </View>
          ))}
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

      {/* Message Menu Overlay */}
        <MessageMenuOverlay
          visible={showMessageOverlay}
          message={selectedMessageForOverlay}
          chat={chat}
          onClose={() => setShowMessageOverlay(false)}
          onReaction={handleReaction}
          onAction={handleMessageAction}
          renderMessage={renderMessage}
          getSenderColor={getSenderColor}
        />
      </View>
    </GestureHandlerRootView>
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
    paddingTop: 50, // Account for status bar
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF', // Full white background
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
    // Glassmorphism styling
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Enhanced glassmorphism overlay
    borderRadius: 8,
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.xs,
    marginHorizontal: -spacing.xs,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  senderAvatarInBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: spacing.sm,
    // Premium avatar styling
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  senderNameInBubble: {
    fontSize: typography.sizes.xs, // Smaller font size for premium look
    fontWeight: '500', // Medium weight for smooth rendering
    flex: 1,
    color: '#6B7280', // Gray color for subtle appearance
    fontFamily: 'System',
    letterSpacing: 0.1, // Slight letter spacing for smoother look
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
      // Clean styling without extra borders (gradient border is handled by parent)
    },
    otherMessageBubble: {
      backgroundColor: 'rgba(16, 185, 129, 0.12)', // Glassmorphism emerald for others messages
      borderBottomLeftRadius: 4,
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 10,
      // Glassmorphism effects - different from self messages
      borderWidth: 1,
      borderColor: 'rgba(16, 185, 129, 0.18)',
      shadowColor: '#10B981',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2, // Slightly less elevation than self messages
    },
  groupMessageBubble: {
    // No special styling needed since sender info is now inside
  },
  flippedMessageBubble: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)', // Gold/amber tint for flipped messages
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    fontSize: typography.sizes.sm, // Improved font size (14px)
    lineHeight: 20,
    fontWeight: '400', // Normal weight for smooth rendering
    fontFamily: 'System', // Use system font for smooth rendering
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
  swipeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    marginRight: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  individualArrow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageActionButton: {
    padding: spacing.xs,
    borderRadius: 6,
    opacity: 0.7,
  },
    ownMessageText: {
      color: '#1F2937', // Dark gray for better contrast with light blue background
      fontWeight: '500', // Medium weight for smooth rendering
      fontFamily: 'System',
      letterSpacing: 0.2, // Slight letter spacing for smoother look
    },
    otherMessageText: {
      color: '#1F2937', // Dark gray for better contrast with glassmorphism
      fontWeight: '500', // Medium weight for smooth rendering
      lineHeight: 20,
      fontFamily: 'System',
      letterSpacing: 0.2, // Slight letter spacing for smoother look
    },
    flippedMessageText: {
      color: '#1F2937', // Keep text black for readability
      fontWeight: '600', // Slightly bolder for emphasis
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
    backgroundColor: '#FFFFFF', // Full white background
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB', // border-gray-200 from HTML
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs, // Reduced from spacing.sm
    paddingBottom: 25, // Reduced from 35
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: spacing.xs, // Reduced vertical padding
  },
  inputButton: {
    padding: spacing.xs, // Reduced from spacing.sm
    marginRight: spacing.xs,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6', // bg-gray-100 from HTML
    borderRadius: 20,
    paddingHorizontal: spacing.sm, // Reduced from spacing.md
    paddingVertical: spacing.xs, // Reduced from spacing.sm
    marginRight: spacing.sm,
    maxHeight: 100,
    minHeight: 36, // Added minimum height
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
    fontWeight: '400', // Normal weight for smooth rendering
    fontFamily: 'System',
    letterSpacing: 0.1, // Slight letter spacing for smoother look
  },
  sendButton: {
    width: 36, // Reduced from 40
    height: 36, // Reduced from 40
    borderRadius: 18, // Reduced from 20
    shadowColor: gradients.peacock[0],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonGradient: {
    width: 36, // Reduced from 40
    height: 36, // Reduced from 40
    borderRadius: 18, // Reduced from 20
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
  // Message Menu Overlay Styles
  overlayBackdrop: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
    paddingHorizontal: spacing.lg,
  },
  overlayContent: {
    width: '100%',
    maxWidth: 280, // Even smaller horizontally
    alignItems: 'flex-start', // Left aligned
    gap: spacing.sm,
  },
  overlayMessageBubble: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 20,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  overlayMessageText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: '#FFFFFF',
    textAlign: 'left', // Left aligned text
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  overlaySenderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
  },
  overlaySenderAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: spacing.xs,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  overlaySenderName: {
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  overlayReplyContainer: {
    marginBottom: spacing.xs,
    paddingLeft: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: '#3B82F6',
  },
  overlayReplyContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: spacing.xs,
    borderRadius: 8,
  },
  overlayReplySender: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 2,
  },
  overlayReplyText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 14,
  },
  overlayMessageTime: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: spacing.xs,
    textAlign: 'right',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  overlayReactionsBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
    width: '100%',
    height: 56,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  // Simple Reactions Bar Styles
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
  overlayMessageWrapper: {
    backgroundColor: 'transparent',
    zIndex: 25,
    maxWidth: '85%',
  },
  overlayMenuOptions: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
    width: '100%',
    padding: spacing.sm,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  overlayMenuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Text left, icon right
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    marginVertical: 1,
  },
  overlayMenuOptionText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'left', // Left aligned text
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    flex: 1, // Take available space
  },
  overlayMenuOptionIcon: {
    marginLeft: spacing.sm, // Icon on the right
  },
  overlayMenuOptionDelete: {
    // Red background for delete option
  },
  overlayMenuOptionTextDelete: {
    color: '#EF4444',
  },
  // Blur Background Styles
  blurredBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  blurView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default ChatConversationScreen;
