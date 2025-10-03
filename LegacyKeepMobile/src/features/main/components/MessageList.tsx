/**
 * MessageList Component
 * 
 * Reusable component for displaying a list of chat messages
 */

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { MessageListProps, ChatMessage } from '../types/chat.types';
import MessageBubble from './MessageBubble';
import { spacing, colors } from '../../../shared/constants';

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onLoadMore,
  hasMore,
  loading,
  getSenderColor,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onLoadMore();
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      onLoadMore();
    }
  };

  const isFirstMessageFromSender = (currentMessage: ChatMessage, index: number): boolean => {
    if (index === 0) return true;
    
    const previousMessage = messages[index - 1];
    return currentMessage.senderId !== previousMessage.senderId;
  };

  const isLastMessageFromSender = (currentMessage: ChatMessage, index: number): boolean => {
    if (index === messages.length - 1) return true;
    
    const nextMessage = messages[index + 1];
    return currentMessage.senderId !== nextMessage.senderId;
  };

  const renderMessage = (message: ChatMessage, index: number) => {
    const isFirst = isFirstMessageFromSender(message, index);
    const isLast = isLastMessageFromSender(message, index);

    return (
      <MessageBubble
        key={message.id}
        message={message}
        isFirstMessage={isFirst}
        isLastMessage={isLast}
        getSenderColor={getSenderColor}
        onReply={(msg) => {
          // Handle reply - will be implemented in parent component
          console.log('Reply to message:', msg.id);
        }}
        onReact={(msg, emoji) => {
          // Handle reaction - will be implemented in parent component
          console.log('React to message:', msg.id, emoji);
        }}
        onLongPress={(msg) => {
          // Handle long press - will be implemented in parent component
          console.log('Long press message:', msg.id);
        }}
        onFlip={(messageId) => {
          // Handle flip - will be implemented in parent component
          console.log('Flip message:', messageId);
        }}
      />
    );
  };

  const renderLoadingIndicator = () => {
    if (loading && messages.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
      );
    }
    return null;
  };

  const renderLoadMoreIndicator = () => {
    if (loading && messages.length > 0) {
      return (
        <View style={styles.loadMoreContainer}>
          <ActivityIndicator size="small" color="#8B5CF6" />
        </View>
      );
    }
    return null;
  };

  const renderEmptyState = () => {
    if (!loading && messages.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyContent}>
            {/* Add empty state illustration here */}
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#8B5CF6"
          />
        }
        onScroll={({ nativeEvent }) => {
          // Load more when scrolling to top
          if (nativeEvent.contentOffset.y <= 100 && hasMore && !loading) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        {/* Load More Indicator */}
        {renderLoadMoreIndicator()}

        {/* Messages */}
        {messages.map((message, index) => renderMessage(message, index))}

        {/* Loading Indicator */}
        {renderLoadingIndicator()}

        {/* Empty State */}
        {renderEmptyState()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  loadMoreContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyContent: {
    alignItems: 'center',
  },
});

export default MessageList;
