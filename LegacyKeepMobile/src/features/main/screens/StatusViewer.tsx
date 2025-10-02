/**
 * Status Viewer Screen
 * 
 * Premium full-screen story viewer with immersive experience
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  PanResponder,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, typography, spacing, gradients } from '../../../shared/constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Story {
  id: string;
  type: 'image' | 'video' | 'text';
  content: string;
  duration?: number;
  timestamp: string;
  views?: number;
  likes?: number;
}

interface StoryAuthor {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

interface StatusViewerProps {
  visible: boolean;
  stories: Story[];
  author: StoryAuthor;
  initialStoryIndex?: number;
  currentUserId?: string;
  onClose: () => void;
  onNextUser?: () => void;
  onPreviousUser?: () => void;
}

const StatusViewer: React.FC<StatusViewerProps> = ({
  visible,
  stories,
  author,
  initialStoryIndex = 0,
  currentUserId,
  onClose,
  onNextUser,
  onPreviousUser,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const likesModalAnim = useRef(new Animated.Value(0)).current;
  const likesOverlayAnim = useRef(new Animated.Value(0)).current;
  
  const progressAnimations = useRef<Animated.Value[]>([]).current;
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const pageTurnAnim = useRef(new Animated.Value(0)).current;

  const currentStory = stories[currentStoryIndex];
  const storyDuration = currentStory.duration || 5000; // 5 seconds default

  // Mock likes data - in real app, this would come from props or API
  const getLikesForStory = (storyId: string) => {
    const likes = [
      { id: '1', name: 'Grandma Betty', avatar: 'https://picsum.photos/100/100?random=1', timestamp: '2h ago', hasLiked: true },
      { id: '2', name: 'Cousin Sarah', avatar: 'https://picsum.photos/100/100?random=2', timestamp: '3h ago', hasLiked: true },
      { id: '3', name: 'Dad', avatar: 'https://picsum.photos/100/100?random=3', timestamp: '5h ago', hasLiked: true },
      { id: '4', name: 'Mom', avatar: 'https://picsum.photos/100/100?random=4', timestamp: '6h ago', hasLiked: true },
      { id: '5', name: 'Uncle John', avatar: 'https://picsum.photos/100/100?random=5', timestamp: '1d ago', hasLiked: false },
      { id: '6', name: 'Aunt Mary', avatar: 'https://picsum.photos/100/100?random=6', timestamp: '2d ago', hasLiked: false },
    ];
    
    // Sort: likes first, then others
    return likes.sort((a, b) => {
      if (a.hasLiked && !b.hasLiked) return -1;
      if (!a.hasLiked && b.hasLiked) return 1;
      return 0;
    });
  };

  const handleLikesPress = () => {
    console.log('=== LIKES PRESS DEBUG ===');
    console.log('currentUserId:', currentUserId);
    console.log('author.id:', author.id);
    console.log('author.name:', author.name);
    console.log('Are they equal?', currentUserId === author.id);
    console.log('Type of currentUserId:', typeof currentUserId);
    console.log('Type of author.id:', typeof author.id);
    console.log('========================');
    
    // Only allow likes view for self stories
    if (currentUserId && author.id === currentUserId) {
      console.log('Opening likes modal for own story');
      
      // Pause progress bar when opening likes modal
      setIsPlaying(false);
      // Stop current animation and preserve current progress
      if (progressAnimations[currentStoryIndex]) {
        progressAnimations[currentStoryIndex].stopAnimation();
      }
      
      setShowLikesModal(true);
      
      // Animate in
      Animated.parallel([
        Animated.timing(likesOverlayAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(likesModalAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      console.log('Not opening likes modal - not own story');
      console.log('Reason: currentUserId exists?', !!currentUserId);
      console.log('Reason: IDs match?', currentUserId === author.id);
    }
  };

  const closeLikesModal = () => {
    // Resume progress bar when closing likes modal
    setIsPlaying(true);
    
    // Animate out
    Animated.parallel([
      Animated.timing(likesOverlayAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(likesModalAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLikesModal(false);
    });
  };

  useEffect(() => {
    if (isPlaying && currentStory) {
      // Set all previous stories to full progress
      for (let i = 0; i < currentStoryIndex && i < progressAnimations.length; i++) {
        progressAnimations[i].setValue(1);
      }
      
      // Only start animation if not currently paused and likes modal is not open
      if (!isLongPressing && !showLikesModal) {
        // Get current progress value (start from 0 if no current progress)
        const currentProgress = 0;
        
        console.log('Starting animation - currentProgress:', currentProgress, 'storyDuration:', storyDuration);
        
        // Calculate remaining duration based on current progress
        const remainingDuration = storyDuration * (1 - currentProgress);
        
        console.log('Remaining duration:', remainingDuration);
        
        // Only animate if there's remaining time
        if (remainingDuration > 0) {
          // Reset progress to current value first
          if (progressAnimations[currentStoryIndex]) {
            progressAnimations[currentStoryIndex].setValue(currentProgress);
          }
          
          // Animate from current progress to 1
          if (progressAnimations[currentStoryIndex]) {
            Animated.timing(progressAnimations[currentStoryIndex], {
            toValue: 1,
            duration: remainingDuration,
            useNativeDriver: false,
            }).start(() => {
              console.log('Animation completed');
              // Move to next story when current one finishes
              if (currentStoryIndex < stories.length - 1) {
                nextStory();
              } else if (onNextUser) {
                onNextUser();
              } else {
                onClose();
              }
            });
          }
        } else {
          // If no time left, move to next story immediately
          console.log('No time left, moving to next story');
          if (currentStoryIndex < stories.length - 1) {
            nextStory();
          } else if (onNextUser) {
            onNextUser();
          } else {
            onClose();
          }
        }
      } else {
        console.log('Not starting animation - isLongPressing:', isLongPressing, 'showLikesModal:', showLikesModal);
      }
    }
  }, [currentStoryIndex, isPlaying, storyDuration, isLongPressing, showLikesModal]);

  // Ensure animation starts when component mounts
  useEffect(() => {
    if (visible && stories.length > 0) {
      console.log('Component mounted, starting initial animation');
      setIsPlaying(true);
      // Reset all progress animations
      progressAnimations.forEach((anim, index) => {
        if (anim) {
          if (index < currentStoryIndex) {
            anim.setValue(1); // Previous stories are complete
          } else {
            anim.setValue(0); // Current and future stories start at 0
          }
        }
      });
    }
  }, [visible]);

  // Initialize progress animations when stories change
  useEffect(() => {
    if (stories.length > 0) {
      console.log('Initializing progress animations for', stories.length, 'stories');
      
      // Clear existing animations
      progressAnimations.length = 0;
      
      // Create new animations for current stories
      for (let i = 0; i < stories.length; i++) {
        progressAnimations.push(new Animated.Value(0));
      }
    }
  }, [stories.length]);

  // Handle user transitions with page turn animation
  useEffect(() => {
    if (visible && stories.length > 0) {
      console.log('User transition detected, playing page turn animation');
      
      // Use initialStoryIndex from props (set by the hook)
      setCurrentStoryIndex(initialStoryIndex);
      setProgress(0);
      
      // Page turn animation
      pageTurnAnim.setValue(0);
      Animated.sequence([
        // Fade out current content
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        // Page turn effect
        Animated.timing(pageTurnAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Fade in new content
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reset page turn animation
        pageTurnAnim.setValue(0);
        // Start playing the new user's stories
        setIsPlaying(true);
        
        // Reset all progress animations for new user
        progressAnimations.forEach((anim, index) => {
          if (anim) {
            if (index < initialStoryIndex) {
              anim.setValue(1); // Previous stories are complete
            } else {
              anim.setValue(0); // Current and future stories start at 0
            }
          }
        });
      });
    }
  }, [author?.id]); // Trigger when author changes

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      // Stop current animation
      if (progressAnimations[currentStoryIndex]) {
        progressAnimations[currentStoryIndex].stopAnimation();
      }
      
      // Set current story progress to full
      if (progressAnimations[currentStoryIndex]) {
        progressAnimations[currentStoryIndex].setValue(1);
      }
      
      // Fade transition
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      if (onNextUser) {
        onNextUser();
      } else {
        onClose();
      }
    }
  };

  const previousStory = () => {
    if (currentStoryIndex > 0) {
      // Stop current animation
      if (progressAnimations[currentStoryIndex]) {
        progressAnimations[currentStoryIndex].stopAnimation();
      }
      
      // Reset current story progress
      if (progressAnimations[currentStoryIndex]) {
        progressAnimations[currentStoryIndex].setValue(0);
      }
      
      // Fade transition
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else {
      if (onPreviousUser) {
        onPreviousUser();
      } else {
        // Don't close, just stay on the first story
        return;
      }
    }
  };


  const handleLongPress = () => {
    setIsLongPressing(true);
    setIsPlaying(false);
    // Stop the current progress animation
    progressAnimations[currentStoryIndex].stopAnimation();
  };

  const handleLongPressEnd = () => {
    setIsLongPressing(false);
    setIsPlaying(true);
    // Resume progress animation from current position
        const currentProgress = 0;
    const remainingDuration = storyDuration * (1 - currentProgress);
    
    if (remainingDuration > 0) {
      Animated.timing(progressAnimations[currentStoryIndex], {
        toValue: 1,
        duration: remainingDuration,
        useNativeDriver: false,
      }).start(() => {
        // Move to next story when current one finishes
        if (currentStoryIndex < stories.length - 1) {
          nextStory();
        } else if (onNextUser) {
          onNextUser();
        } else {
          onClose();
        }
      });
    }
  };


  // Swipe down to close gesture
  const swipeDownPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only respond to significant downward swipes
      return gestureState.dy > 50 && gestureState.vy > 0.3 && Math.abs(gestureState.dx) < 100;
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Close if swiped down significantly
      if (gestureState.dy > 150 && gestureState.vy > 0.5) {
        onClose();
      }
    },
  });

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      // TODO: Send reply to story
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Story Content */}
      <View style={styles.storyContainer} {...swipeDownPanResponder.panHandlers}>
        {/* Left Half - Previous Story */}
        <TouchableOpacity 
          style={styles.leftHalf} 
          activeOpacity={0.8}
          onPress={previousStory}
          onLongPress={handleLongPress}
          onPressOut={handleLongPressEnd}
          delayLongPress={200}
        />
        
        {/* Right Half - Next Story */}
        <TouchableOpacity 
          style={styles.rightHalf} 
          activeOpacity={0.8}
          onPress={nextStory}
          onLongPress={handleLongPress}
          onPressOut={handleLongPressEnd}
          delayLongPress={200}
        />
        
        {/* Story Content Overlay */}
        <View style={styles.storyContentOverlay}>
          <Animated.View style={[
            styles.storyContent, 
            { 
              opacity: fadeAnim,
              transform: [
                {
                  perspective: 1000,
                },
                {
                  rotateY: pageTurnAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ['0deg', '90deg', '0deg'],
                  }),
                },
                {
                  scale: pageTurnAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 0.95, 1],
                  }),
                },
              ],
            }
          ]}>
            {currentStory.type === 'image' ? (
              <Image 
                source={{ uri: currentStory.content }} 
                style={styles.storyImage}
                resizeMode="cover"
              />
            ) : currentStory.type === 'text' ? (
              <View style={styles.textStoryContainer}>
                <LinearGradient
                  colors={gradients.peacock}
                  style={styles.textStoryGradient}
                >
                  <Text style={styles.textStoryContent}>
                    {currentStory.content}
                  </Text>
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.videoPlaceholder}>
                <Ionicons name="play-circle" size={80} color="white" />
                <Text style={styles.videoPlaceholderText}>Video Story</Text>
              </View>
            )}
          </Animated.View>
          
          {/* Long Press Indicator */}
          {isLongPressing && (
            <View style={styles.longPressIndicator}>
              <Ionicons name="pause" size={40} color="white" />
              <Text style={styles.longPressText}>Paused</Text>
            </View>
          )}
        </View>
      </View>

      {/* Top Header */}
      <SafeAreaView style={styles.topHeader}>
        <View style={styles.progressContainer}>
          {stories.map((_, index) => (
            <View key={index} style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground} />
              {progressAnimations[index] && (
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width: progressAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.headerContent}>
          <View style={styles.authorInfo}>
            <View style={styles.avatarContainer}>
              {author.avatar ? (
                <Image source={{ uri: author.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{author.initials}</Text>
                </View>
              )}
            </View>
            <View style={styles.authorDetails}>
              <Text style={styles.authorName}>{author.name}</Text>
              <Text style={styles.storyTime}>{formatTime(currentStory.timestamp)}</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <BlurView intensity={20} style={styles.bottomActionsBlur}>
          <View style={styles.bottomActionsContent}>
            {/* Reply Input - Left Side */}
            <View style={styles.replyContainer}>
              <TextInput
                style={styles.replyInput}
                placeholder="Reply..."
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={replyText}
                onChangeText={setReplyText}
                multiline={false}
                maxLength={100}
              />
              <TouchableOpacity 
                style={[styles.sendButton, { opacity: replyText.trim() ? 1 : 0.5 }]}
                onPress={handleSendReply}
                disabled={!replyText.trim()}
              >
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Action Buttons - Middle */}
            <View style={styles.actionButtonsMiddle}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-outline" size={24} color="white" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="bookmark-outline" size={24} color="white" />
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>
            </View>

            {/* Like Button - Right Side - Only for self stories */}
            {(() => {
              const shouldShowLikeButton = currentUserId && author.id === currentUserId;
              console.log('=== LIKE BUTTON VISIBILITY DEBUG ===');
              console.log('currentUserId:', currentUserId);
              console.log('author.id:', author.id);
              console.log('shouldShowLikeButton:', shouldShowLikeButton);
              console.log('====================================');
              
              return shouldShowLikeButton && (
                <TouchableOpacity 
                  style={styles.likeButton}
                  onPress={handleLikesPress}
                >
                  <Ionicons name="heart-outline" size={24} color="white" />
                  <Text style={styles.actionButtonText}>
                    {currentStory.likes || 0}
                  </Text>
                </TouchableOpacity>
              );
            })()}
          </View>
        </BlurView>
      </View>

      {/* Story Info Overlay - Only show views for own stories */}
      {currentStory.views && currentUserId && author.id === currentUserId && (
        <View style={styles.viewsOverlay}>
          <View style={styles.viewsContainer}>
            <Ionicons name="eye" size={16} color="rgba(255,255,255,0.9)" />
            <Text style={styles.viewsText}>{currentStory.views}</Text>
          </View>
        </View>
      )}

      {/* Views & Likes Modal */}
      <Modal
        visible={showLikesModal}
        animationType="none"
        presentationStyle="overFullScreen"
        transparent={true}
        onRequestClose={closeLikesModal}
      >
        <Animated.View 
          style={[
            styles.likesModalOverlay,
            { opacity: likesOverlayAnim }
          ]}
        >
          <Animated.View 
            style={[
              styles.likesModalBlur,
              {
                transform: [{
                  translateY: likesModalAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenHeight * 0.5, 0],
                  })
                }]
              }
            ]}
          >
            <BlurView intensity={20} style={styles.likesModalBlurContent}>
              <View style={styles.likesModalContainer}>
                <SafeAreaView style={styles.likesModalSafeArea}>
                  {/* Header */}
                  <View style={styles.likesModalHeader}>
                    <Text style={styles.likesModalTitle}>Views & Likes</Text>
                    <TouchableOpacity 
                      style={styles.likesModalCloseButton}
                      onPress={closeLikesModal}
                    >
                      <Ionicons name="close" size={18} color="white" />
                    </TouchableOpacity>
                  </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Ionicons name="eye" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.statText}>{currentStory.views || 0} views</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="heart" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.statText}>{currentStory.likes || 0} likes</Text>
                  </View>
                </View>

                {/* Likes List */}
                <ScrollView style={styles.likesList} showsVerticalScrollIndicator={false}>
                  {getLikesForStory(currentStory.id).map((like) => (
                    <TouchableOpacity key={like.id} style={styles.likeItem}>
                      <Image source={{ uri: like.avatar }} style={styles.likeAvatar} />
                      <View style={styles.likeContent}>
                        <Text style={styles.likeName}>{like.name}</Text>
                        <Text style={styles.likeTimestamp}>{like.timestamp}</Text>
                      </View>
                      {like.hasLiked && (
                        <View style={styles.likeIconContainer}>
                          <Ionicons name="heart" size={16} color={gradients.peacock[0]} />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                </SafeAreaView>
              </View>
            </BlurView>
          </Animated.View>
        </Animated.View>
      </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  storyContainer: {
    flex: 1,
    position: 'relative',
  },
  leftHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    zIndex: 10,
  },
  rightHalf: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '100%',
    zIndex: 10,
  },
  storyContentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  storyContent: {
    flex: 1,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  textStoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  textStoryGradient: {
    padding: spacing.xl,
    borderRadius: 20,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStoryContent: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: 'white',
    textAlign: 'center',
    lineHeight: 36,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  videoPlaceholderText: {
    color: 'white',
    fontSize: typography.sizes.lg,
    marginTop: spacing.md,
  },
  topHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
    gap: spacing.xs,
  },
  progressBarContainer: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: gradients.peacock[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    color: 'white',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  storyTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: typography.sizes.sm,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  bottomActionsBlur: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  bottomActionsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  actionButtonsMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionButton: {
    alignItems: 'center',
    minWidth: 35,
  },
  likeButton: {
    alignItems: 'center',
    minWidth: 40,
  },
  actionButtonText: {
    color: 'white',
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
    fontWeight: typography.weights.medium,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flex: 1,
    marginRight: spacing.md,
    maxWidth: 300,
  },
  replyInput: {
    flex: 1,
    color: 'white',
    fontSize: typography.sizes.sm,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  sendButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  viewsOverlay: {
    position: 'absolute',
    bottom: 120,
    right: spacing.lg,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  viewsText: {
    color: 'white',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.xs,
  },
  longPressIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  longPressText: {
    color: 'white',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginTop: spacing.xs,
  },
  // Views & Likes Modal Styles - Glassmorphism
  likesModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  likesModalBlur: {
    height: screenHeight * 0.5, // True half screen
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  likesModalBlurContent: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  likesModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  likesModalSafeArea: {
    flex: 1,
  },
  likesModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  likesModalTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  likesModalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    gap: spacing.xl,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: typography.weights.medium,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  likesList: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  likeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  likeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  likeContent: {
    flex: 1,
  },
  likeName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  likeTimestamp: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  likeIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default StatusViewer;
