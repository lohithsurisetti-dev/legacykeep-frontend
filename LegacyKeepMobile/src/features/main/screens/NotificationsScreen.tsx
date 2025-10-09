/**
 * Notifications Screen
 * 
 * Premium notifications screen with categorized notifications
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MainStackParamList } from '../../../app/navigation/types';
import { spacing, typography } from '../../../shared/constants';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'mention' | 'follow' | 'memory' | 'reminder' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [activeTab, setActiveTab] = useState<'notifications' | 'requests'>('notifications');

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'Sarah liked your story',
      message: '"Grandma\'s Secret Recipe" received a new like',
      time: '2m ago',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      title: 'John commented on your post',
      message: 'This brings back so many memories!',
      time: '15m ago',
      read: false,
    },
    {
      id: '3',
      type: 'mention',
      title: 'Emma mentioned you',
      message: 'Tagged you in "Family Reunion 2024"',
      time: '1h ago',
      read: false,
    },
    {
      id: '4',
      type: 'memory',
      title: 'Memory from 5 years ago',
      message: 'Remember this special moment?',
      time: '2h ago',
      read: true,
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Birthday Reminder',
      message: "Dad's birthday is tomorrow!",
      time: '3h ago',
      read: true,
    },
    {
      id: '6',
      type: 'follow',
      title: 'New family member',
      message: 'Michael joined your family tree',
      time: '1d ago',
      read: true,
    },
    {
      id: '7',
      type: 'system',
      title: 'New feature available',
      message: 'Try our new Dream Vault feature!',
      time: '2d ago',
      read: true,
    },
  ]);

  // Mock requests/suggestions data
  const [requests] = useState([
    {
      id: 'r1',
      type: 'family_join',
      title: 'Family Invitation',
      message: 'Sarah wants to join your family tree',
      time: '5m ago',
      read: false,
      action: 'accept',
    },
    {
      id: 'r2',
      type: 'memory_share',
      title: 'Shared Memory',
      message: 'John shared a memory with you',
      time: '1h ago',
      read: false,
      action: 'view',
    },
    {
      id: 'r3',
      type: 'story_collaboration',
      title: 'Story Collaboration',
      message: 'Emma wants to collaborate on a story',
      time: '2h ago',
      read: true,
      action: 'review',
    },
  ]);

  const getIconName = (type: string) => {
    switch (type) {
      case 'like':
        return 'heart';
      case 'comment':
        return 'chatbubble';
      case 'mention':
        return 'at';
      case 'follow':
        return 'person-add';
      case 'memory':
        return 'time';
      case 'reminder':
        return 'alarm';
      case 'system':
        return 'information-circle';
      case 'family_join':
        return 'people';
      case 'memory_share':
        return 'share';
      case 'story_collaboration':
        return 'create';
      default:
        return 'notifications';
    }
  };

  const getIconColor = (type: string) => {
    // Use soft gray for all icons
    return '#6b7280';
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const unreadRequestsCount = requests.filter(r => !r.read).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#ffffff', '#fafbfc', '#f5f7fa']}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#4b5563" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Activity</Text>
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={markAllAsRead}
          >
            <Text style={styles.markAllText}>Clear all</Text>
          </TouchableOpacity>
        </View>

        {/* Main Tab Selection */}
        <View style={styles.mainTabContainer}>
          <TouchableOpacity
            style={[styles.mainTab, activeTab === 'notifications' && styles.activeMainTab]}
            onPress={() => setActiveTab('notifications')}
          >
            <Text style={[styles.mainTabText, activeTab === 'notifications' && styles.activeMainTabText]}>
              Updates {unreadCount > 0 && `(${unreadCount})`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mainTab, activeTab === 'requests' && styles.activeMainTab]}
            onPress={() => setActiveTab('requests')}
          >
            <Text style={[styles.mainTabText, activeTab === 'requests' && styles.activeMainTabText]}>
              Requests {unreadRequestsCount > 0 && `(${unreadRequestsCount})`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content List */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'notifications' ? (
            notifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-circle-outline" size={48} color="#9ca3af" />
                <Text style={styles.emptyTitle}>All caught up</Text>
                <Text style={styles.emptyMessage}>No updates yet</Text>
              </View>
            ) : (
              notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.read && styles.unreadCard
                  ]}
                  onPress={() => markAsRead(notification.id)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: `${getIconColor(notification.type)}15` }
                  ]}>
                    <Ionicons 
                      name={getIconName(notification.type) as any} 
                      size={18} 
                      color={getIconColor(notification.type)} 
                    />
                  </View>

                  <View style={styles.notificationContent}>
                    <View style={styles.notificationTop}>
                      <TouchableOpacity style={styles.nameContainer}>
                        <Text style={styles.notificationName}>
                          {notification.title.split(' ')[0]}
                        </Text>
                        {!notification.read && <View style={styles.unreadDot} />}
                      </TouchableOpacity>
                      <Text style={styles.notificationAction}>
                        {notification.title.substring(notification.title.indexOf(' ') + 1)}
                      </Text>
                    </View>
                    <View style={styles.notificationMiddle}>
                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>
                      <Text style={styles.notificationTime}>
                        {notification.time}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          ) : (
            requests.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-circle-outline" size={48} color="#9ca3af" />
                <Text style={styles.emptyTitle}>All clear</Text>
                <Text style={styles.emptyMessage}>No pending requests</Text>
              </View>
            ) : (
              requests.map((request) => (
                <TouchableOpacity
                  key={request.id}
                  style={[
                    styles.notificationCard,
                    !request.read && styles.unreadCard
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: `${getIconColor(request.type)}15` }
                  ]}>
                    <Ionicons 
                      name={getIconName(request.type) as any} 
                      size={18} 
                      color={getIconColor(request.type)} 
                    />
                  </View>

                  <View style={styles.notificationContent}>
                    <View style={styles.notificationTop}>
                      <TouchableOpacity style={styles.nameContainer}>
                        <Text style={styles.notificationName}>
                          {request.title.split(' ')[0]}
                        </Text>
                        {!request.read && <View style={styles.unreadDot} />}
                      </TouchableOpacity>
                      <Text style={styles.notificationAction}>
                        {request.title.substring(request.title.indexOf(' ') + 1)}
                      </Text>
                    </View>
                    <View style={styles.notificationMiddle}>
                      <Text style={styles.notificationMessage}>
                        {request.message}
                      </Text>
                      <View style={styles.requestActionsRow}>
                        <View style={styles.actionButtons}>
                        {request.action === 'accept' && (
                          <>
                            <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                              <Text style={styles.acceptButtonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                              <Text style={styles.declineButtonText}>Decline</Text>
                            </TouchableOpacity>
                          </>
                        )}
                        {request.action === 'view' && (
                          <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
                            <Text style={styles.viewButtonText}>View</Text>
                          </TouchableOpacity>
                        )}
                        {request.action === 'review' && (
                          <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}>
                            <Text style={styles.reviewButtonText}>Review</Text>
                          </TouchableOpacity>
                        )}
                        </View>
                        <Text style={styles.notificationTime}>
                          {request.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  backButton: {
    padding: spacing.xs,
    width: 40,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: '#374151',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  markAllButton: {
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
  },
  markAllText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: '#6b7280',
  },

  // Main Tab Selection
  mainTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  mainTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeMainTab: {
    borderBottomColor: '#4b5563',
  },
  mainTabText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: '#9ca3af',
  },
  activeMainTabText: {
    color: '#4b5563',
    fontWeight: typography.weights.semibold,
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },

  // Notification Card
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadCard: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: '#374151',
  },
  notificationAction: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
    color: '#6b7280',
    marginLeft: 4,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginLeft: 6,
  },
  notificationMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationMessage: {
    fontSize: typography.sizes.xs,
    color: '#6b7280',
    lineHeight: 16,
    flex: 1,
    marginRight: spacing.sm,
  },
  notificationTime: {
    fontSize: 10,
    color: '#9ca3af',
  },

  // Request Actions
  requestActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
  },
  acceptButton: {
    backgroundColor: '#3b82f6',
  },
  acceptButtonText: {
    fontSize: 10,
    fontWeight: typography.weights.semibold,
    color: '#FFFFFF',
  },
  declineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  declineButtonText: {
    fontSize: 10,
    fontWeight: typography.weights.semibold,
    color: '#6b7280',
  },
  viewButton: {
    backgroundColor: '#6b7280',
  },
  viewButtonText: {
    fontSize: 10,
    fontWeight: typography.weights.semibold,
    color: '#FFFFFF',
  },
  reviewButton: {
    backgroundColor: '#6b7280',
  },
  reviewButtonText: {
    fontSize: 10,
    fontWeight: typography.weights.semibold,
    color: '#FFFFFF',
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: '#1f2937',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyMessage: {
    fontSize: typography.sizes.sm,
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});

export default NotificationsScreen;

