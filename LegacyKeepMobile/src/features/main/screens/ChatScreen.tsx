/**
 * Chat Screen
 * 
 * Family chat and messaging interface with stories and chat list
 */

import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image,
  Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../../shared/constants';
import { HomeHeader } from '../../../shared/components/ui';
import { useAuth } from '../../../app/providers/AuthContext';
import StatusViewer from './StatusViewer';
import { useStatusViewer } from '../hooks/useStatusViewer';
import { mockAllChats, ChatConversation } from '../data/mockChatData';

// Data interfaces
interface Story {
  id: string;
  name: string;
  photo?: string;
  isAddStory?: boolean;
  hasGradient?: boolean;
}

interface Chat {
  id: string;
  name: string;
  photo?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  isGradient?: boolean;
}

interface ChatScreenProps {
  navigation: any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState('');
  const statusViewer = useStatusViewer();

  // Mock function to check if user has stories and get latest story
  const getUserStoryData = () => {
    // In a real app, this would come from your backend/state
    const hasStories = true; // Mock: user has stories
    const latestStoryThumbnail = 'https://picsum.photos/400/800?random=user-story'; // Mock thumbnail
    
    return {
      hasStories,
      latestStoryThumbnail,
    };
  };

  const userStoryData = getUserStoryData();

  // Mock data for stories - single "Your Story" entry
  const stories: Story[] = [
    { 
      id: 'your-story', 
      name: 'Your Story', 
      isAddStory: !userStoryData.hasStories, // Only show as add story if no stories exist
      photo: userStoryData.hasStories ? userStoryData.latestStoryThumbnail : user?.profilePictureUrl || 'https://picsum.photos/100/100?random=you',
      hasGradient: userStoryData.hasStories || true // Show gradient border if has stories or always for user
    },
    { id: '2', name: 'Grandma', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEspB2KJLDukV50HUQc5Q1aGjO1xvkVCLbdsPShSpwVLoRAWOQHGh9ntJlYEANRRIzTgQHNnSN3xH5U42ReRdfgYY9VaVfFAXh5A_Fp3qIGq2a3D1MJKu8p00-JDbD0pQZQ8iWZAnql_covJmvmEy1vvikpJ-kn_IVC26h_tIYHuhqAZMyABZcJQ8UnA15KPJD8f1dhPwwFfmOPVOU5Z-qwOSF4hsQsRAD7ReNIBLq-eAjeeu4f4pktfVrAOx7NpOE2hjsji-d_8Q', hasGradient: true },
    { id: '3', name: 'Sarah', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY', hasGradient: true },
    { id: '4', name: 'Dad', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fhAQL1gzMLSGG9fVGiJkcvJISvVDALmsSSSf46tPxFnuYQFuRpUdVumeU140iCuUMj5QnJ1pxXD-b7mzXv3ssIVfLOSo-wQlkuQRfntNVQV_KK46BT7LhknEc1WEu6Ugaoowhb6-mIB9yGijisrul6ds_xvM_8BuZ2PwSUeMby0b4RtYHIMlKy2nC_5Rdui7ZwHXcBdo8LNZyhtIYwKnbOXNw4E-mETPhphWGbLHDDPRJ7A_iEhOnOYSvZUZ3rSUkuvriBLWnbU', hasGradient: true },
    { id: '5', name: 'Mom', photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTMQkiqGs31U0m7kN-Cast77R5Jw8Bi2Trs3yLeA8eGmf22oNML3FHQrFfs1tU5ZB8FCDZwx2YdcAvZYgJ-14RZDUb9TKPTyT8qnrj8qZErG6FXzQKa9waZjqGYKuIHlxTUwISV7QGNRRq-qtE-t-etC9J-t8M2JVPbsyablujnk4AeSb0bXwNPPAeH63-Ju16Vzvx5Jr4k9NKn-dLppSQ-G6LvMvcaBGJzx3PseuEJn3BOYqYD6gsDNnEGnJE6FT6Dqnu2va6O68', hasGradient: true },
  ];

  // Convert mock chat data to Chat interface format
  const chats: Chat[] = mockAllChats.map(chat => ({
    id: chat.id,
    name: chat.name,
    photo: chat.avatar,
    lastMessage: chat.lastMessage,
    timestamp: chat.lastMessageTime,
    unreadCount: chat.unreadCount,
    isOnline: chat.isOnline,
    isGradient: chat.type === 'individual' && (chat.unreadCount ?? 0) > 0
  }));

  const handleProfilePress = () => {
    // TODO: Navigate to profile screen
    console.log('Profile pressed');
  };

  const handleChatPress = (chatId: string) => {
    const chat = mockAllChats.find(c => c.id === chatId);
    if (chat) {
      navigation.navigate('ChatConversation', { chat });
    }
  };

  const handleStoryPress = (story: Story) => {
    if (story.isAddStory) {
      // TODO: Open camera or story creation
      console.log('Add story');
    } else {
      // Create all users with stories in consistent order
      const allUsersWithStories = [];
      
      // Always include "Your Story" first if user has stories, regardless of which story was tapped
      if (userStoryData.hasStories) {
        allUsersWithStories.push({
          id: 'your-story',
          name: 'Your Story',
          avatar: user?.profilePictureUrl,
          initials: userInitials,
          stories: [
            {
              id: 'your-story-1',
              type: 'image' as const,
              content: userStoryData.latestStoryThumbnail,
              timestamp: new Date().toISOString(),
              views: Math.floor(Math.random() * 100) + 10,
              likes: Math.floor(Math.random() * 50) + 5,
            },
            {
              id: 'your-story-2',
              type: 'text' as const,
              content: `Hello from ${user?.firstName || 'You'}! This is a beautiful family memory we're sharing together. ❤️`,
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              views: Math.floor(Math.random() * 80) + 8,
              likes: Math.floor(Math.random() * 30) + 3,
            },
          ],
        });
      }
      
      // Add other users with stories in the same order as they appear in the stories array
      const otherUsersWithStories = stories
        .filter(s => !s.isAddStory && s.hasGradient && s.id !== 'your-story')
        .map((s, index) => ({
          id: s.id,
          name: s.name,
          avatar: s.photo,
          initials: s.name.split(' ').map(n => n[0]).join('').toUpperCase(),
          stories: [
            {
              id: `${s.id}-1`,
              type: 'image' as const,
              content: s.photo || 'https://picsum.photos/400/800',
              timestamp: new Date().toISOString(),
              views: Math.floor(Math.random() * 100) + 10,
              likes: Math.floor(Math.random() * 50) + 5,
            },
            {
              id: `${s.id}-2`,
              type: 'text' as const,
              content: `Hello from ${s.name}! This is a beautiful family memory we're sharing together. ❤️`,
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              views: Math.floor(Math.random() * 80) + 8,
              likes: Math.floor(Math.random() * 30) + 3,
            },
          ],
        }));
      
      // Combine all users maintaining consistent order
      allUsersWithStories.push(...otherUsersWithStories);

      // Find the index of the tapped user
      const tappedUserIndex = allUsersWithStories.findIndex(user => user.id === story.id);

      console.log('Opening status viewer for user:', story.name, 'with ID:', story.id);
      console.log('All users:', allUsersWithStories.map(u => u.name));
      console.log('Tapped user index:', tappedUserIndex);
      
      statusViewer.openStatusViewer(
        allUsersWithStories,
        Math.max(0, tappedUserIndex), // Start from tapped user
        0 // Start from first story
      );
    }
  };


  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : 'LS';

  const renderStoryItem = (story: Story) => (
    <TouchableOpacity
      key={story.id}
      style={styles.storyItem}
      onPress={() => handleStoryPress(story)}
    >
      <View style={[
        styles.storyCircle,
        story.hasGradient && styles.storyGradientBorder
      ]}>
        {story.isAddStory ? (
          <View style={styles.addStoryContainer}>
            <Ionicons name="add" size={24} color="#9CA3AF" />
          </View>
        ) : story.photo ? (
          <>
            <Image source={{ uri: story.photo }} style={styles.storyImage} />
            {/* Show plus icon overlay for "Your Story" when user has stories */}
            {story.id === '1' && userStoryData.hasStories && (
              <View style={styles.addStoryOverlay}>
                <Ionicons name="add" size={12} color="white" />
              </View>
            )}
          </>
        ) : (
          <View style={styles.storyPlaceholder}>
            <Ionicons name="person" size={20} color="#9CA3AF" />
          </View>
        )}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {story.name}
      </Text>
    </TouchableOpacity>
  );


  const renderChatItem = (chat: Chat) => (
    <TouchableOpacity
      key={chat.id}
      style={styles.chatItem}
      onPress={() => handleChatPress(chat.id)}
    >
      <View style={styles.chatAvatarContainer}>
        {chat.photo ? (
          <Image source={{ uri: chat.photo }} style={styles.chatAvatar} />
        ) : (
          <View style={styles.chatAvatarPlaceholder}>
            <Ionicons name="person" size={24} color="#9CA3AF" />
          </View>
        )}
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>
            {chat.name}
          </Text>
          <Text style={styles.chatTimestamp}>{chat.timestamp}</Text>
        </View>
        
        <View style={styles.chatFooter}>
          <Text style={styles.chatMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unreadCount && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <HomeHeader 
          onProfilePress={handleProfilePress} 
          userInitials={userInitials}
          title="Chats"
          scrollY={scrollY}
        />
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search chats"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Scrollable Content */}
        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Stories Section */}
          <View style={styles.storiesSection}>
            <Text style={styles.storiesTitle}>Stories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesContainer}
            >
              {stories.map(renderStoryItem)}
            </ScrollView>
          </View>

          {/* Chat List */}
          <View style={styles.chatList}>
            {chats.map(renderChatItem)}
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
      
      {/* Status Viewer Modal */}
      {statusViewer.author && (
        <StatusViewer
          visible={statusViewer.isVisible}
          stories={statusViewer.stories}
          author={statusViewer.author}
          initialStoryIndex={statusViewer.initialStoryIndex}
          currentUserId={user?.id}
          onClose={statusViewer.closeStatusViewer}
          onNextUser={statusViewer.nextUser}
          onPreviousUser={statusViewer.previousUser}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: '#1F2937',
  },
  scrollView: {
    flex: 1,
  },
  storiesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  storiesTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: '#6B7280',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  storiesContainer: {
    paddingHorizontal: spacing.lg,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 60,
  },
  storyCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: spacing.xs,
    overflow: 'hidden',
  },
  storyGradientBorder: {
    borderWidth: 2,
    borderColor: '#3B9B9F',
    padding: 2,
  },
  addStoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 26,
  },
  addStoryOverlay: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#3B9B9F',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  storyPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  storyName: {
    fontSize: typography.sizes.xs,
    color: '#374151',
    textAlign: 'center',
  },
  chatList: {
    backgroundColor: '#FFFFFF',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  chatAvatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  chatAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  chatAvatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  chatName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: '#111827',
    flex: 1,
  },
  chatTimestamp: {
    fontSize: typography.sizes.xs,
    color: '#6B7280',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatMessage: {
    fontSize: typography.sizes.sm,
    color: '#6B7280',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#3b5998', // Same blue color as chat icon in bottom tab (gradients.peacock[1])
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: spacing.sm,
  },
  unreadText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: '#FFFFFF',
  },
});

export default ChatScreen;
