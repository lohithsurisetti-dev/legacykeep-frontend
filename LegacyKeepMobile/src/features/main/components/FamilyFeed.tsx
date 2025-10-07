/**
 * Family Feed Component
 * 
 * Instagram-style feed with all interaction features from the interaction service
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Modal,
  TextInput,
  Alert,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

// Feed Post Types
interface FeedPost {
  id: string;
  type: 'single_image' | 'carousel' | 'video' | 'story_collection';
  author: {
    id: string;
    name: string;
    avatar: string;
    relationship: string;
  };
  content: {
    caption: string;
    media: Array<{
      id: string;
      type: 'image' | 'video';
      url: string;
      thumbnail?: string;
    }>;
  };
  interactions: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
    views: number;
    ratings: Array<{
      userId: string;
      rating: number;
    }>;
    reactions: Array<{
      userId: string;
      type: 'LIKE' | 'LOVE' | 'HEART' | 'LAUGH' | 'WOW' | 'SAD' | 'ANGRY' | 'BLESSING' | 'PRIDE' | 'GRATITUDE' | 'MEMORY' | 'WISDOM' | 'TRADITION';
      emoji: string;
    }>;
  };
  createdAt: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  userRating?: number;
}

// Mock data for feed posts
const mockFeedPosts: FeedPost[] = [
  {
    id: 'post_1',
    type: 'single_image',
    author: {
      id: 'user_2',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      relationship: 'Brother'
    },
    content: {
      caption: 'Celebrating our family reunion! 🎉 Nothing beats the warmth of being together with loved ones. #FamilyTime #Blessed',
      media: [{
        id: 'media_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 24,
      comments: 8,
      shares: 3,
      bookmarks: 12,
      views: 156,
      ratings: [
        { userId: 'user_3', rating: 5 },
        { userId: 'user_4', rating: 5 },
        { userId: 'user_5', rating: 4 }
      ],
      reactions: [
        { userId: 'user_3', type: 'LOVE', emoji: '❤️' },
        { userId: 'user_4', type: 'BLESSING', emoji: '🙏' },
        { userId: 'user_5', type: 'PRIDE', emoji: '🏆' }
      ]
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_2',
    type: 'carousel',
    author: {
      id: 'user_4',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      relationship: 'Mother'
    },
    content: {
      caption: 'Our family recipe collection through the generations! From grandma\'s secret spices to modern twists. Each dish tells a story. 🍛✨',
      media: [
        {
          id: 'media_2a',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop'
        },
        {
          id: 'media_2b',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop'
        },
        {
          id: 'media_2c',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop'
        }
      ]
    },
    interactions: {
      likes: 31,
      comments: 15,
      shares: 7,
      bookmarks: 23,
      views: 289,
      ratings: [
        { userId: 'user_2', rating: 5 },
        { userId: 'user_3', rating: 5 },
        { userId: 'user_5', rating: 5 }
      ],
      reactions: [
        { userId: 'user_2', type: 'WISDOM', emoji: '🧙‍♂️' },
        { userId: 'user_3', type: 'TRADITION', emoji: '🏛️' },
        { userId: 'user_5', type: 'MEMORY', emoji: '🧠' }
      ]
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    isLiked: true,
    isBookmarked: true
  },
  {
    id: 'post_3',
    type: 'video',
    author: {
      id: 'user_5',
      name: 'Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      relationship: 'Father'
    },
    content: {
      caption: 'Teaching the kids our traditional dance moves! The joy in their eyes reminds me of when I was their age. Culture lives on! 💃🕺',
      media: [{
        id: 'media_3',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 42,
      comments: 12,
      shares: 9,
      bookmarks: 18,
      views: 445,
      ratings: [
        { userId: 'user_2', rating: 5 },
        { userId: 'user_3', rating: 5 },
        { userId: 'user_4', rating: 5 }
      ],
      reactions: [
        { userId: 'user_2', type: 'LAUGH', emoji: '😂' },
        { userId: 'user_3', type: 'PRIDE', emoji: '🏆' },
        { userId: 'user_4', type: 'TRADITION', emoji: '🏛️' }
      ]
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    isLiked: false,
    isBookmarked: false
  }
];

// Reaction types mapping
const REACTION_TYPES = {
  LIKE: { emoji: '👍', color: '#4CAF50' },
  LOVE: { emoji: '❤️', color: '#E91E63' },
  HEART: { emoji: '💖', color: '#F06292' },
  LAUGH: { emoji: '😂', color: '#FF9800' },
  WOW: { emoji: '😮', color: '#9C27B0' },
  SAD: { emoji: '😢', color: '#607D8B' },
  ANGRY: { emoji: '😠', color: '#F44336' },
  BLESSING: { emoji: '🙏', color: '#8BC34A' },
  PRIDE: { emoji: '🏆', color: '#FFC107' },
  GRATITUDE: { emoji: '🙏', color: '#4CAF50' },
  MEMORY: { emoji: '🧠', color: '#9E9E9E' },
  WISDOM: { emoji: '🧙‍♂️', color: '#795548' },
  TRADITION: { emoji: '🏛️', color: '#3F51B5' }
};

export const FamilyFeed: React.FC = () => {
  const { colors } = useTheme();
  const [posts, setPosts] = useState<FeedPost[]>(mockFeedPosts);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});

  const styles = createStyles(colors);

  // Toggle post expansion
  const togglePostExpansion = (postId: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Handle like toggle
  const handleLike = (postId: string) => {
    Vibration.vibrate(50);
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            isLiked: !post.isLiked,
            interactions: {
              ...post.interactions,
              likes: post.isLiked ? post.interactions.likes - 1 : post.interactions.likes + 1
            }
          }
        : post
    ));
  };

  // Handle bookmark toggle
  const handleBookmark = (postId: string) => {
    Vibration.vibrate(50);
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            isBookmarked: !post.isBookmarked,
            interactions: {
              ...post.interactions,
              bookmarks: post.isBookmarked ? post.interactions.bookmarks - 1 : post.interactions.bookmarks + 1
            }
          }
        : post
    ));
  };

  // Handle reaction
  const handleReaction = (postId: string, reactionType: keyof typeof REACTION_TYPES) => {
    Vibration.vibrate(100);
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const existingReaction = post.interactions.reactions.find(r => r.userId === 'current_user');
        const newReactions = existingReaction 
          ? post.interactions.reactions.map(r => 
              r.userId === 'current_user' 
                ? { ...r, type: reactionType, emoji: REACTION_TYPES[reactionType].emoji }
                : r
            )
          : [...post.interactions.reactions, {
              userId: 'current_user',
              type: reactionType,
              emoji: REACTION_TYPES[reactionType].emoji
            }];

        return {
          ...post,
          interactions: {
            ...post.interactions,
            reactions: newReactions
          }
        };
      }
      return post;
    }));
    setShowReactions(null);
  };

  // Handle rating
  const handleRating = (postId: string, rating: number) => {
    Vibration.vibrate(50);
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const existingRating = post.interactions.ratings.find(r => r.userId === 'current_user');
        const newRatings = existingRating
          ? post.interactions.ratings.map(r => 
              r.userId === 'current_user' ? { ...r, rating } : r
            )
          : [...post.interactions.ratings, { userId: 'current_user', rating }];

        return {
          ...post,
          userRating: rating,
          interactions: {
            ...post.interactions,
            ratings: newRatings
          }
        };
      }
      return post;
    }));
  };

  // Handle carousel navigation
  const handleCarouselNext = (postId: string, maxIndex: number) => {
    setCarouselIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % maxIndex
    }));
  };

  const handleCarouselPrev = (postId: string, maxIndex: number) => {
    setCarouselIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + maxIndex) % maxIndex
    }));
  };

  // Handle post options menu
  const handlePostOptions = (postId: string) => {
    Vibration.vibrate(50);
    Alert.alert(
      'Post Options',
      'What would you like to do?',
      [
        { text: 'Share', onPress: () => console.log('Share post:', postId) },
        { text: 'Save', onPress: () => console.log('Save post:', postId) },
        { text: 'Report', onPress: () => console.log('Report post:', postId), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  // Render post media
  const renderPostMedia = (post: FeedPost) => {
    const currentIndex = carouselIndex[post.id] || 0;
    
    switch (post.type) {
      case 'single_image':
        return (
          <Image
            source={{ uri: post.content.media[0].url }}
            style={styles.postImage}
            resizeMode="cover"
          />
        );
      
      case 'carousel':
        return (
          <View style={styles.carouselContainer}>
            <Image
              source={{ uri: post.content.media[currentIndex].url }}
              style={styles.postImage}
              resizeMode="cover"
            />
            {post.content.media.length > 1 && (
              <>
                <TouchableOpacity
                  style={[styles.carouselButton, styles.carouselButtonLeft]}
                  onPress={() => handleCarouselPrev(post.id, post.content.media.length)}
                >
                  <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.carouselButton, styles.carouselButtonRight]}
                  onPress={() => handleCarouselNext(post.id, post.content.media.length)}
                >
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.carouselIndicators}>
                  {post.content.media.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.carouselIndicator,
                        index === currentIndex && styles.carouselIndicatorActive
                      ]}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        );
      
      case 'video':
        return (
          <View style={styles.videoContainer}>
            <Image
              source={{ uri: post.content.media[0].thumbnail }}
              style={styles.postImage}
              resizeMode="cover"
            />
            <View style={styles.videoOverlay}>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.feedContainer}>
      {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.authorInfo}>
                <Image
                  source={{ uri: post.author.avatar }}
                  style={styles.authorAvatar}
                />
                <View style={styles.authorDetails}>
                  <Text style={styles.authorName}>{post.author.name}</Text>
                  <Text style={styles.authorRelation}>{post.author.relationship}</Text>
                </View>
              </View>
            </View>

          {/* Post Media */}
          {renderPostMedia(post)}

          {/* Post Interactions */}
          <View style={styles.interactionsContainer}>
            <View style={styles.interactionRow}>
              <View style={styles.leftInteractions}>
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => handleLike(post.id)}
                >
                  <Ionicons
                    name={post.isLiked ? "sparkles" : "sparkles-outline"}
                    size={24}
                    color={post.isLiked ? "#FF6B35" : colors.text}
                  />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => setShowReactions(post.id)}
                >
                  <Ionicons name="happy-outline" size={24} color={colors.text} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.interactionButton}
                  onPress={() => setShowComments(post.id)}
                >
                  <Ionicons name="chatbubble-outline" size={24} color={colors.text} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.interactionButton}>
                  <Ionicons name="share-outline" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.interactionButton}
                onPress={() => handleBookmark(post.id)}
              >
                <Ionicons
                  name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={post.isBookmarked ? "#FF9800" : colors.text}
                />
              </TouchableOpacity>
            </View>

            {/* Interaction Counts */}
            <View style={styles.interactionCounts}>
              <Text style={styles.interactionCount}>
                {post.interactions.likes} likes
              </Text>
              {post.interactions.reactions.length > 0 && (
                <View style={styles.reactionsDisplay}>
                  {post.interactions.reactions.slice(0, 3).map((reaction, index) => (
                    <Text key={index} style={styles.reactionEmoji}>
                      {reaction.emoji}
                    </Text>
                  ))}
                  {post.interactions.reactions.length > 3 && (
                    <Text style={styles.reactionCount}>
                      +{post.interactions.reactions.length - 3}
                    </Text>
                  )}
                </View>
              )}
            </View>

            {/* Post Caption */}
            <View>
              <Text style={[
                styles.postCaption,
                !expandedPosts.has(post.id) && styles.postCaptionTruncated
              ]} numberOfLines={expandedPosts.has(post.id) ? 0 : 1}>
                <Text style={styles.authorNameInline}>{post.author.name}</Text> {post.content.caption}
              </Text>
              {(post.content.caption.length > 50 || post.content.caption.includes('\n')) && (
                <TouchableOpacity onPress={() => togglePostExpansion(post.id)}>
                  <Text style={styles.showMoreText}>
                    {expandedPosts.has(post.id) ? 'Show less' : 'Show more...'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Comments Preview */}
            {post.interactions.comments > 0 && (
              <TouchableOpacity
                style={styles.commentsPreview}
                onPress={() => setShowComments(post.id)}
              >
                <Text style={styles.commentsCount}>
                  View all {post.interactions.comments} comments
                </Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
      ))}

      {/* Reactions Modal */}
      <Modal
        visible={showReactions !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReactions(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reactionsContainer}>
            <Text style={styles.reactionsTitle}>Add Reaction</Text>
            <View style={styles.reactionsGrid}>
              {Object.entries(REACTION_TYPES).map(([type, config]) => (
                <TouchableOpacity
                  key={type}
                  style={styles.reactionButton}
                  onPress={() => showReactions && handleReaction(showReactions, type as keyof typeof REACTION_TYPES)}
                >
                  <Text style={styles.reactionEmojiLarge}>{config.emoji}</Text>
                  <Text style={styles.reactionLabel}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Comments Modal */}
      <Modal
        visible={showComments !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setShowComments(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.commentsContainer}>
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Comments</Text>
              <TouchableOpacity onPress={() => setShowComments(null)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.commentsList}>
              {/* Mock comments */}
              <View style={styles.commentItem}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                  <Text style={styles.commentAuthor}>Sarah Johnson</Text>
                  <Text style={styles.commentText}>This brings back so many memories! 😍</Text>
                  <Text style={styles.commentTime}>2h ago</Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.commentInput}>
              <TextInput
                style={styles.commentTextInput}
                placeholder="Add a comment..."
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity
                style={[styles.sendButton, { opacity: commentText.length > 0 ? 1 : 0.5 }]}
                disabled={commentText.length === 0}
              >
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  feedContainer: {
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xl,
  },
  feedTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    textAlign: 'center',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: spacing.lg,
    marginHorizontal: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  authorNameInline: {
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  authorRelation: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  carouselContainer: {
    position: 'relative',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  carouselButtonLeft: {
    left: spacing.sm,
  },
  carouselButtonRight: {
    right: spacing.sm,
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: spacing.sm,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  carouselIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  carouselIndicatorActive: {
    backgroundColor: 'white',
  },
  videoContainer: {
    position: 'relative',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interactionsContainer: {
    padding: spacing.md,
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  interactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  leftInteractions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  interactionButton: {
    padding: spacing.sm,
  },
  interactionCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  interactionCount: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  reactionsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  reactionEmoji: {
    fontSize: 16,
  },
  reactionCount: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  postCaption: {
    fontSize: typography.sizes.md,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  postCaptionTruncated: {
    overflow: 'hidden',
  },
  showMoreText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.sm,
  },
  commentsPreview: {
    marginBottom: spacing.sm,
  },
  commentsCount: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: spacing.lg,
    width: '80%',
    maxWidth: 400,
  },
  reactionsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  reactionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  reactionButton: {
    alignItems: 'center',
    padding: spacing.sm,
    minWidth: 60,
  },
  reactionEmojiLarge: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  reactionLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  commentsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    height: '70%',
    maxHeight: 600,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  commentsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  commentsList: {
    flex: 1,
    padding: spacing.lg,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.sm,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  commentText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  commentTime: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  commentTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
