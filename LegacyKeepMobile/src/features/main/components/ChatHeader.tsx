/**
 * ChatHeader Component
 * 
 * Reusable component for chat conversation header
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ChatHeaderProps } from '../types/chat.types';
import { colors, typography, spacing } from '../../../shared/constants';

const ChatHeader: React.FC<ChatHeaderProps> = ({
  chat,
  onBack,
  onCall,
  onVideoCall,
  onMore,
}) => {
  const renderAvatar = () => {
    if (chat.avatar) {
      return (
        <Image
          source={{ uri: chat.avatar }}
          style={styles.avatar}
        />
      );
    }
    
    // Fallback to first letter of name
    return (
      <View style={styles.avatarFallback}>
        <Text style={styles.avatarText}>
          {chat.name.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  };

  const renderOnlineIndicator = () => {
    if (chat.type === 'individual' && chat.isOnline) {
      return <View style={styles.onlineIndicator} />;
    }
    return null;
  };

  const renderHeaderContent = () => {
    if (chat.type === 'individual') {
      return (
        <>
          <View style={styles.userInfo}>
            {renderAvatar()}
            {renderOnlineIndicator()}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{chat.name}</Text>
              <Text style={styles.userStatus}>
                {chat.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.groupInfo}>
            {renderAvatar()}
            <View style={styles.groupDetails}>
              <Text style={styles.groupName}>{chat.name}</Text>
              <Text style={styles.groupMembers}>
                {chat.participants.length} members
              </Text>
            </View>
          </View>
        </>
      );
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          {/* User/Group Info */}
          <TouchableOpacity style={styles.infoContainer} activeOpacity={0.7}>
            {renderHeaderContent()}
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {chat.type === 'individual' && (
              <>
                <TouchableOpacity style={styles.actionButton} onPress={onCall}>
                  <Ionicons name="call-outline" size={22} color={colors.text.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={onVideoCall}>
                  <Ionicons name="videocam-outline" size={22} color={colors.text.primary} />
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.actionButton} onPress={onMore}>
              <Ionicons name="ellipsis-vertical" size={22} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.medium,
    paddingTop: 50,
    paddingBottom: spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
    borderRadius: 20,
  },
  infoContainer: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  groupDetails: {
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  groupName: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  userStatus: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
  },
  groupMembers: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionButton: {
    padding: spacing.xs,
    borderRadius: 20,
  },
});

export default ChatHeader;
