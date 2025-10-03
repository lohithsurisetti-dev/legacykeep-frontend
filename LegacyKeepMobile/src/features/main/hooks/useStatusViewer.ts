/**
 * Status Viewer Hook
 * 
 * Manages state and logic for the status/story viewer
 */

import { useState, useCallback } from 'react';

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

interface StoryUser {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  stories: Story[];
}

interface StatusViewerState {
  isVisible: boolean;
  stories: Story[];
  author: StoryAuthor | null;
  initialStoryIndex: number;
  allUsers: StoryUser[];
  currentUserIndex: number;
}

export const useStatusViewer = () => {
  const [state, setState] = useState<StatusViewerState>({
    isVisible: false,
    stories: [],
    author: null,
    initialStoryIndex: 0,
    allUsers: [],
    currentUserIndex: 0,
  });

  const openStatusViewer = useCallback((
    allUsers: StoryUser[],
    initialUserIndex: number = 0,
    initialStoryIndex: number = 0
  ) => {
    const currentUser = allUsers[initialUserIndex];
    setState({
      isVisible: true,
      stories: currentUser.stories,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        initials: currentUser.initials,
      },
      initialStoryIndex,
      allUsers,
      currentUserIndex: initialUserIndex,
    });
  }, []);

  const closeStatusViewer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const nextUser = useCallback(() => {
    setState(prev => {
      const nextUserIndex = prev.currentUserIndex + 1;
      if (nextUserIndex < prev.allUsers.length) {
        const nextUser = prev.allUsers[nextUserIndex];
        console.log('Moving to next user:', nextUser.name, 'at index:', nextUserIndex);
        return {
          ...prev,
          stories: nextUser.stories,
          author: {
            id: nextUser.id,
            name: nextUser.name,
            avatar: nextUser.avatar,
            initials: nextUser.initials,
          },
          initialStoryIndex: 0, // Always start from first story of new user
          currentUserIndex: nextUserIndex,
        };
      } else {
        // No more users, close the viewer
        console.log('No more users, closing viewer');
        return {
          ...prev,
          isVisible: false,
        };
      }
    });
  }, []);

  const previousUser = useCallback(() => {
    setState(prev => {
      const prevUserIndex = prev.currentUserIndex - 1;
      if (prevUserIndex >= 0) {
        const prevUser = prev.allUsers[prevUserIndex];
        console.log('Moving to previous user:', prevUser.name, 'at index:', prevUserIndex);
        return {
          ...prev,
          stories: prevUser.stories,
          author: {
            id: prevUser.id,
            name: prevUser.name,
            avatar: prevUser.avatar,
            initials: prevUser.initials,
          },
          initialStoryIndex: prevUser.stories.length - 1, // Start from last story of previous user
          currentUserIndex: prevUserIndex,
        };
      } else {
        // No previous users, stay on current user's first story
        console.log('No previous users, staying on current user');
        return prev; // Don't change state, stay on current user
      }
    });
  }, []);

  return {
    ...state,
    openStatusViewer,
    closeStatusViewer,
    nextUser,
    previousUser,
  };
};
