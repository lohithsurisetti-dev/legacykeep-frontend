/**
 * Chat Stack Navigator
 * 
 * Stack navigator for chat-related screens (Chat list and Chat conversation)
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../../../shared/constants';

// Import chat screens
import ChatScreen from '../screens/ChatScreen';
import ChatConversationScreen from '../screens/ChatConversationScreen';

export type ChatStackParamList = {
  ChatList: undefined;
  ChatConversation: {
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

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerShown: false, // We use custom headers in each screen
        cardStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatScreen}
        options={{
          title: 'Chats',
        }}
      />
      
      <Stack.Screen
        name="ChatConversation"
        component={ChatConversationScreen}
        options={{
          title: 'Chat',
          presentation: 'card',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
