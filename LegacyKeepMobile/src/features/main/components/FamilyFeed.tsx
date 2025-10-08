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
  Pressable,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
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
  },
  {
    id: 'post_4',
    type: 'single_image',
    author: {
      id: 'user_6',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      relationship: 'Sister'
    },
    content: {
      caption: 'Throwback to our childhood adventures! Remember when we used to explore the woods behind grandpa\'s house? Good times! 🌲✨',
      media: [{
        id: 'media_4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 38,
      comments: 11,
      shares: 5,
      bookmarks: 14,
      views: 234,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'MEMORY', emoji: '🧠' },
        { userId: 'user_3', type: 'LOVE', emoji: '❤️' }
      ]
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_5',
    type: 'single_image',
    author: {
      id: 'user_7',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      relationship: 'Cousin'
    },
    content: {
      caption: 'Family game night was epic! Nothing beats the competitive spirit and laughter we share. Who\'s ready for round two? 🎲🏆',
      media: [{
        id: 'media_5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 45,
      comments: 18,
      shares: 6,
      bookmarks: 9,
      views: 312,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'LAUGH', emoji: '😂' },
        { userId: 'user_4', type: 'PRIDE', emoji: '🏆' }
      ]
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_6',
    type: 'single_image',
    author: {
      id: 'user_8',
      name: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      relationship: 'Aunt'
    },
    content: {
      caption: 'Captured this beautiful sunset during our family picnic. Grateful for these peaceful moments together. 🌅💛',
      media: [{
        id: 'media_6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 56,
      comments: 9,
      shares: 8,
      bookmarks: 21,
      views: 398,
      ratings: [],
      reactions: [
        { userId: 'user_3', type: 'GRATITUDE', emoji: '🙏' },
        { userId: 'user_5', type: 'LOVE', emoji: '❤️' }
      ]
    },
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_7',
    type: 'single_image',
    author: {
      id: 'user_2',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      relationship: 'Brother'
    },
    content: {
      caption: 'Found this old photo from our trip to the mountains! Can\'t believe how time flies. Miss these carefree days! ⛰️📸',
      media: [{
        id: 'media_7',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 29,
      comments: 7,
      shares: 4,
      bookmarks: 11,
      views: 187,
      ratings: [],
      reactions: [
        { userId: 'user_3', type: 'MEMORY', emoji: '🧠' },
        { userId: 'user_4', type: 'LOVE', emoji: '❤️' }
      ]
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_8',
    type: 'single_image',
    author: {
      id: 'user_4',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      relationship: 'Mother'
    },
    content: {
      caption: 'Sharing grandma\'s handwritten recipe book. Each page holds precious memories and love. Let\'s keep these traditions alive! 📖💕',
      media: [{
        id: 'media_8',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 52,
      comments: 14,
      shares: 11,
      bookmarks: 28,
      views: 423,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'WISDOM', emoji: '🧙‍♂️' },
        { userId: 'user_5', type: 'TRADITION', emoji: '🏛️' },
        { userId: 'user_6', type: 'GRATITUDE', emoji: '🙏' }
      ]
    },
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_9',
    type: 'single_image',
    author: {
      id: 'user_6',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      relationship: 'Sister'
    },
    content: {
      caption: 'Our old family home before the renovation. So many memories made in these rooms. 🏡💭',
      media: [{
        id: 'media_9',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 41,
      comments: 13,
      shares: 6,
      bookmarks: 17,
      views: 267,
      ratings: [],
      reactions: [
        { userId: 'user_3', type: 'MEMORY', emoji: '🧠' },
        { userId: 'user_4', type: 'LOVE', emoji: '❤️' }
      ]
    },
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_10',
    type: 'single_image',
    author: {
      id: 'user_3',
      name: 'David Thompson',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
      relationship: 'Father'
    },
    content: {
      caption: 'Teaching the next generation our family\'s woodworking traditions. Proud to pass on these skills! 🪵🔨',
      media: [{
        id: 'media_10',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 37,
      comments: 9,
      shares: 5,
      bookmarks: 15,
      views: 221,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'TRADITION', emoji: '🏛️' },
        { userId: 'user_4', type: 'PRIDE', emoji: '🏆' }
      ]
    },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_11',
    type: 'single_image',
    author: {
      id: 'user_7',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      relationship: 'Cousin'
    },
    content: {
      caption: 'Beach day with the fam! Building sandcastles and making memories. Life is good! 🏖️☀️',
      media: [{
        id: 'media_11',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 62,
      comments: 16,
      shares: 8,
      bookmarks: 19,
      views: 412,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'LOVE', emoji: '❤️' },
        { userId: 'user_6', type: 'GRATITUDE', emoji: '🙏' }
      ]
    },
    createdAt: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_12',
    type: 'single_image',
    author: {
      id: 'user_8',
      name: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      relationship: 'Aunt'
    },
    content: {
      caption: 'Organizing old family albums. Found so many treasures! Each photo tells a beautiful story. 📚✨',
      media: [{
        id: 'media_12',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 48,
      comments: 11,
      shares: 7,
      bookmarks: 24,
      views: 334,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'MEMORY', emoji: '🧠' },
        { userId: 'user_4', type: 'WISDOM', emoji: '🧙‍♂️' }
      ]
    },
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_13',
    type: 'single_image',
    author: {
      id: 'user_2',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      relationship: 'Brother'
    },
    content: {
      caption: 'Just found this gem from our high school days! Can\'t stop laughing at our old fashion choices! 😂📸',
      media: [{
        id: 'media_13',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 33,
      comments: 19,
      shares: 6,
      bookmarks: 8,
      views: 198,
      ratings: [],
      reactions: [
        { userId: 'user_4', type: 'LAUGH', emoji: '😂' },
        { userId: 'user_6', type: 'MEMORY', emoji: '🧠' }
      ]
    },
    createdAt: new Date(Date.now() - 84 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_14',
    type: 'single_image',
    author: {
      id: 'user_4',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      relationship: 'Mother'
    },
    content: {
      caption: 'Morning meditation in the garden. Finding peace in our family sanctuary. 🧘‍♀️🌿',
      media: [{
        id: 'media_14',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 44,
      comments: 7,
      shares: 4,
      bookmarks: 18,
      views: 267,
      ratings: [],
      reactions: [
        { userId: 'user_3', type: 'GRATITUDE', emoji: '🙏' },
        { userId: 'user_7', type: 'BLESSING', emoji: '🙏' }
      ]
    },
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_15',
    type: 'single_image',
    author: {
      id: 'user_3',
      name: 'David Thompson',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
      relationship: 'Father'
    },
    content: {
      caption: 'Sunset fishing trip with the boys. These quiet moments are what life is all about. 🎣🌅',
      media: [{
        id: 'media_15',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 51,
      comments: 8,
      shares: 4,
      bookmarks: 12,
      views: 289,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'GRATITUDE', emoji: '🙏' },
        { userId: 'user_7', type: 'LOVE', emoji: '❤️' }
      ]
    },
    createdAt: new Date(Date.now() - 108 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_16',
    type: 'single_image',
    author: {
      id: 'user_6',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      relationship: 'Sister'
    },
    content: {
      caption: 'Coffee and conversations. The best therapy is family time. ☕💬',
      media: [{
        id: 'media_16',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 39,
      comments: 14,
      shares: 5,
      bookmarks: 11,
      views: 223,
      ratings: [],
      reactions: [
        { userId: 'user_4', type: 'LOVE', emoji: '❤️' },
        { userId: 'user_8', type: 'GRATITUDE', emoji: '🙏' }
      ]
    },
    createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_17',
    type: 'single_image',
    author: {
      id: 'user_7',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      relationship: 'Cousin'
    },
    content: {
      caption: 'Hiking adventures with the crew! Nature heals everything. 🏔️🥾',
      media: [{
        id: 'media_17',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 58,
      comments: 12,
      shares: 9,
      bookmarks: 16,
      views: 387,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'WOW', emoji: '😮' },
        { userId: 'user_6', type: 'PRIDE', emoji: '🏆' }
      ]
    },
    createdAt: new Date(Date.now() - 132 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_18',
    type: 'single_image',
    author: {
      id: 'user_8',
      name: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      relationship: 'Aunt'
    },
    content: {
      caption: 'Baking grandma\'s famous cookies with the kids. Passing down traditions one recipe at a time! 🍪👨‍🍳',
      media: [{
        id: 'media_18',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 67,
      comments: 21,
      shares: 11,
      bookmarks: 28,
      views: 456,
      ratings: [],
      reactions: [
        { userId: 'user_2', type: 'TRADITION', emoji: '🏛️' },
        { userId: 'user_4', type: 'WISDOM', emoji: '🧙‍♂️' },
        { userId: 'user_6', type: 'LOVE', emoji: '❤️' }
      ]
    },
    createdAt: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_19',
    type: 'single_image',
    author: {
      id: 'user_2',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      relationship: 'Brother'
    },
    content: {
      caption: 'Dad\'s old guitar. Learning his favorite songs brings me closer to him every day. 🎸🎵',
      media: [{
        id: 'media_19',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 41,
      comments: 16,
      shares: 7,
      bookmarks: 14,
      views: 267,
      ratings: [],
      reactions: [
        { userId: 'user_3', type: 'MEMORY', emoji: '🧠' },
        { userId: 'user_4', type: 'LOVE', emoji: '❤️' }
      ]
    },
    createdAt: new Date(Date.now() - 156 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'post_20',
    type: 'single_image',
    author: {
      id: 'user_4',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      relationship: 'Mother'
    },
    content: {
      caption: 'Family yoga session in the backyard. Health and togetherness go hand in hand. 🧘‍♀️☀️',
      media: [{
        id: 'media_20',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
      }]
    },
    interactions: {
      likes: 53,
      comments: 9,
      shares: 6,
      bookmarks: 19,
      views: 312,
      ratings: [],
      reactions: [
        { userId: 'user_3', type: 'BLESSING', emoji: '🙏' },
        { userId: 'user_6', type: 'GRATITUDE', emoji: '🙏' }
      ]
    },
    createdAt: new Date(Date.now() - 168 * 60 * 60 * 1000).toISOString(),
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

interface FamilyFeedProps {
  scrollY?: Animated.Value;
}

export const FamilyFeed: React.FC<FamilyFeedProps> = ({ scrollY: parentScrollY }) => {
  const { colors } = useTheme();
  const [posts, setPosts] = useState<FeedPost[]>(mockFeedPosts);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [authorPostIndex, setAuthorPostIndex] = useState<Record<string, number>>({});

  // Animation values
  const cardAnimations = useRef<Record<string, Animated.Value>>({}).current;
  const likeAnimations = useRef<Record<string, Animated.Value>>({}).current;
  const shimmerAnimation = useRef(new Animated.Value(0)).current;
  const swipeAnimations = useRef<Record<string, Animated.Value>>({}).current;
  const cardSwapAnimations = useRef<Record<string, Animated.Value>>({}).current;

  const styles = createStyles(colors);

  // Get all posts by an author, sorted by timestamp (newest first)
  const getAuthorPosts = (authorId: string) => {
    return posts
      .filter(p => p.author.id === authorId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // Initialize animations for each post
  useEffect(() => {
    posts.forEach((post, index) => {
      if (!cardAnimations[post.id]) {
        cardAnimations[post.id] = new Animated.Value(0);
        likeAnimations[post.id] = new Animated.Value(1);
        
        // Staggered entrance animation
        setTimeout(() => {
          Animated.timing(cardAnimations[post.id], {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }).start();
        }, index * 100);
      }
    });
  }, [posts]);

  // Shimmer effect for loading states
  useEffect(() => {
    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerLoop.start();
    return () => shimmerLoop.stop();
  }, []);

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
    
    // Animate like button
    Animated.sequence([
      Animated.timing(likeAnimations[postId], {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimations[postId], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

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
    Vibration.vibrate(30);
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
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
      {posts.map((post, index) => {
        // Tesseract Grid Logic: Get all posts by this author
        const authorPosts = getAuthorPosts(post.author.id);
        const currentIndex = authorPostIndex[post.author.id] || 0;
        const currentPost = authorPosts[currentIndex] || post;
        const hasMultiplePosts = authorPosts.length > 1;

        // Initialize animations
        if (!swipeAnimations[post.id]) {
          swipeAnimations[post.id] = new Animated.Value(0);
        }
        if (!cardSwapAnimations[post.id]) {
          cardSwapAnimations[post.id] = new Animated.Value(1);
        }

        // Handle horizontal swipe for author's posts with smooth slide transition
        const handleSwipeGesture = (event: any) => {
          const { translationX, state } = event.nativeEvent;
          
          if (state === State.ACTIVE) {
            // Check boundaries
            const isAtNewest = currentIndex === 0;
            const isAtOldest = currentIndex === authorPosts.length - 1;
            const isSwipingLeft = translationX < 0;
            const isSwipingRight = translationX > 0;
            
            // Block swipe right at newest post (no newer content)
            if (isAtNewest && isSwipingRight) {
              swipeAnimations[post.id].setValue(0);
              cardSwapAnimations[post.id].setValue(1);
              return;
            }
            
            // Block swipe left at oldest post (no older content)
            if (isAtOldest && isSwipingLeft) {
              swipeAnimations[post.id].setValue(0);
              cardSwapAnimations[post.id].setValue(1);
              return;
            }
            
            // Follow finger smoothly when within valid range
            swipeAnimations[post.id].setValue(translationX);
            
            // Scale down as user swipes
            const scaleValue = 1 - (Math.abs(translationX) / screenWidth) * 0.15;
            cardSwapAnimations[post.id].setValue(Math.max(0.85, scaleValue));
          } else if (state === State.END) {
            const isAtNewest = currentIndex === 0;
            const isAtOldest = currentIndex === authorPosts.length - 1;
            const isSwipingLeft = translationX < 0;
            const isSwipingRight = translationX > 0;
            
            // Block invalid swipes at boundaries
            if ((isAtNewest && isSwipingRight) || (isAtOldest && isSwipingLeft)) {
              Animated.spring(swipeAnimations[post.id], {
                toValue: 0,
                useNativeDriver: true,
                friction: 8,
                tension: 40,
              }).start();
              return;
            }
            
            // Determine if swipe threshold met
            if (Math.abs(translationX) > 100 && hasMultiplePosts) {
              Vibration.vibrate(20);
              
              const direction = translationX > 0 ? 1 : -1; // 1 for right, -1 for left
              
              // Slide out current card completely with scale
              Animated.parallel([
                Animated.timing(swipeAnimations[post.id], {
                  toValue: direction * screenWidth,
                  duration: 200,
                  useNativeDriver: true,
                }),
                Animated.timing(cardSwapAnimations[post.id], {
                  toValue: 0.85,
                  duration: 200,
                  useNativeDriver: true,
                }),
              ]).start(() => {
                // Update which post to show
                if (direction > 0) {
                  // Swipe right - show older post
                  setAuthorPostIndex(prev => ({
                    ...prev,
                    [post.author.id]: Math.min(authorPosts.length - 1, (prev[post.author.id] || 0) + 1)
                  }));
                } else {
                  // Swipe left - show newer post
                  setAuthorPostIndex(prev => ({
                    ...prev,
                    [post.author.id]: Math.max(0, (prev[post.author.id] || 0) - 1)
                  }));
                }
                
                // Position new card off-screen on opposite side, scaled down
                swipeAnimations[post.id].setValue(-direction * screenWidth);
                cardSwapAnimations[post.id].setValue(0.85);
                
                // Slide in new card with scale up
                Animated.parallel([
                  Animated.spring(swipeAnimations[post.id], {
                    toValue: 0,
                    useNativeDriver: true,
                    friction: 7,
                    tension: 35,
                  }),
                  Animated.spring(cardSwapAnimations[post.id], {
                    toValue: 1,
                    useNativeDriver: true,
                    friction: 7,
                    tension: 35,
                  }),
                ]).start();
              });
            } else {
              // Spring back to center if threshold not met
              Animated.parallel([
                Animated.spring(swipeAnimations[post.id], {
                  toValue: 0,
                  useNativeDriver: true,
                  friction: 8,
                  tension: 40,
                }),
                Animated.spring(cardSwapAnimations[post.id], {
                  toValue: 1,
                  useNativeDriver: true,
                  friction: 8,
                  tension: 40,
                }),
              ]).start();
            }
          }
        };

        const postContent = (
          <Animated.View 
            key={post.id} 
            style={[
              styles.postContainer,
              {
                transform: [
                  {
                    translateX: swipeAnimations[post.id],
                  },
                  {
                    scale: cardSwapAnimations[post.id],
                  },
                ],
              },
            ]}
          >
            {/* Post Header */}
            <View style={styles.postHeader}>
                <View style={styles.authorInfo}>
                  <Image
                    source={{ uri: currentPost.author.avatar }}
                    style={styles.authorAvatar}
                  />
                  <View style={styles.authorDetails}>
                    <Text style={styles.authorName}>{currentPost.author.name}</Text>
                    <Text style={styles.authorRelation}>{currentPost.author.relationship}</Text>
                  </View>
                </View>
              </View>

              {/* Post Media */}
              {renderPostMedia(currentPost)}

              {/* Post Interactions */}
              <View style={styles.interactionsContainer}>
                <View style={styles.interactionRow}>
                  <View style={styles.leftInteractions}>
                    <Animated.View
                      style={{
                        transform: [
                          {
                            scale: likeAnimations[currentPost.id]?.interpolate({
                              inputRange: [1, 1.3],
                              outputRange: [1, 1.3],
                            }) || 1,
                          },
                        ],
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.interactionButton,
                          currentPost.isLiked && styles.likedButton
                        ]}
                        onPress={() => handleLike(currentPost.id)}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={currentPost.isLiked ? "sparkles" : "sparkles-outline"}
                          size={24}
                          color={currentPost.isLiked ? "#FF6B35" : "#6B7280"}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                    
                    <TouchableOpacity
                      style={styles.interactionButton}
                      onPress={() => setShowReactions(currentPost.id)}
                    >
                      <Ionicons name="happy-outline" size={24} color={colors.text} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.interactionButton}
                      onPress={() => setShowComments(currentPost.id)}
                    >
                      <Ionicons name="chatbubble-outline" size={24} color={colors.text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.interactionButton}>
                      <Ionicons name="share-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.interactionButton,
                      bookmarkedPosts.has(currentPost.id) && styles.bookmarkedButton
                    ]}
                    onPress={() => handleBookmark(currentPost.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={bookmarkedPosts.has(currentPost.id) ? "bookmark" : "bookmark-outline"}
                      size={24}
                      color={bookmarkedPosts.has(currentPost.id) ? "#FF9800" : "#6B7280"}
                    />
                  </TouchableOpacity>
                </View>

                {/* Interaction Counts */}
                <View style={styles.interactionCounts}>
                  <Text style={styles.interactionCount}>
                    {currentPost.interactions.likes} likes
                  </Text>
                  {currentPost.interactions.reactions.length > 0 && (
                    <View style={styles.reactionsDisplay}>
                      {currentPost.interactions.reactions.slice(0, 3).map((reaction, idx) => (
                        <Text key={idx} style={styles.reactionEmoji}>
                          {reaction.emoji}
                        </Text>
                      ))}
                      {currentPost.interactions.reactions.length > 3 && (
                        <Text style={styles.reactionCount}>
                          +{currentPost.interactions.reactions.length - 3}
                        </Text>
                      )}
                    </View>
                  )}
                </View>

                {/* Post Caption */}
                <View>
                  <Text style={[
                    styles.postCaption,
                    !expandedPosts.has(currentPost.id) && styles.postCaptionTruncated
                  ]} numberOfLines={expandedPosts.has(currentPost.id) ? 0 : 1}>
                    <Text style={styles.authorNameInline}>{currentPost.author.name}</Text>
                    <Text>{` ${currentPost.content.caption}`}</Text>
                  </Text>
                  {(currentPost.content.caption.length > 50 || currentPost.content.caption.includes('\n')) && (
                    <TouchableOpacity onPress={() => togglePostExpansion(currentPost.id)}>
                      <Text style={styles.showMoreText}>
                        {expandedPosts.has(currentPost.id) ? 'Show less' : 'Show more...'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Comments Preview */}
                {currentPost.interactions.comments > 0 && (
                  <TouchableOpacity
                    style={styles.commentsPreview}
                    onPress={() => setShowComments(currentPost.id)}
                  >
                    <Text style={styles.commentsCount}>
                      View all {currentPost.interactions.comments} comments
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
          </Animated.View>
        );

        // Wrap with PanGestureHandler if author has multiple posts
        if (hasMultiplePosts) {
          return (
            <PanGestureHandler
              key={post.id}
              onGestureEvent={handleSwipeGesture}
              onHandlerStateChange={handleSwipeGesture}
              activeOffsetX={[-20, 20]}
              failOffsetY={[-10, 10]}
            >
              {postContent}
            </PanGestureHandler>
          );
        }

        return postContent;
      })}

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
    paddingHorizontal: 0,
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
    borderRadius: 20,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.xs,
    backgroundColor: '#FFFFFF',
    // Deep layered shadow for 3D effect
    shadowColor: '#000000',
    shadowOffset: { 
      width: 0, 
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 25,
    overflow: 'visible',
    // Stronger border for definition
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
  postGradient: {
    borderRadius: 20,
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
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
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  interactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  leftInteractions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  interactionButton: {
    padding: spacing.xs,
    borderRadius: 10,
    marginRight: spacing.xs,
  },
  likedButton: {
    // No special background, just the icon color change
  },
  bookmarkedButton: {
    // No special background, just the icon color change
  },
  interactionCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
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
