import { Ping, Pong, PingIntent, PongType, PingStatus } from '../types/pingpong.types';

/**
 * Mock data for Ping & Pong feature testing
 */

export const mockPings: Ping[] = [
  {
    id: 'ping_6',
    userId: 'user_7',
    familyId: 'family_1',
    intent: PingIntent.CHECK_IN,
    message: 'Quick family meetup at the park? Anyone free in 30 mins?',
    durationMinutes: 30,
    expiresAt: new Date(Date.now() + 25 * 60 * 1000).toISOString(), // 25 minutes from now
    status: PingStatus.ACTIVE,
    contextData: {
      eventType: 'MEETUP',
      location: 'Central Park',
      urgency: 'LOW'
    },
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    userName: 'Kamala Devi',
    userAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    timeRemaining: 25 * 60, // 25 minutes in seconds
    aggregation: {
      hugCount: 2,
      prayerCount: 0,
      tipCount: 1,
      callOfferCount: 3,
      checklistCount: 0,
      timerCount: 0,
      totalPongs: 6,
      lastUpdated: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'ping_7',
    userId: 'user_8',
    familyId: 'family_1',
    intent: PingIntent.BOOST,
    message: 'Gaming night! Who\'s up for some family Mario Kart? 🎮',
    durationMinutes: 30,
    expiresAt: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // 20 minutes from now
    status: PingStatus.ACTIVE,
    contextData: {
      eventType: 'GAMING',
      gameType: 'Mario Kart',
      urgency: 'MEDIUM'
    },
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    userName: 'Mike Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    timeRemaining: 20 * 60, // 20 minutes in seconds
    aggregation: {
      hugCount: 1,
      prayerCount: 0,
      tipCount: 0,
      callOfferCount: 4,
      checklistCount: 1,
      timerCount: 0,
      totalPongs: 6,
      lastUpdated: new Date(Date.now() - 1 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'ping_1',
    userId: 'user_2',
    familyId: 'family_1',
    intent: PingIntent.BOOST,
    message: 'Interview in 10 minutes!',
    durationMinutes: 30,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
    status: PingStatus.ACTIVE,
    contextData: {
      eventType: 'INTERVIEW',
      location: 'Tech Corp Office',
      urgency: 'HIGH'
    },
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
    updatedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timeRemaining: 5 * 60, // 5 minutes in seconds
    aggregation: {
      hugCount: 3,
      prayerCount: 1,
      tipCount: 2,
      callOfferCount: 1,
      checklistCount: 0,
      timerCount: 0,
      totalPongs: 7,
      lastUpdated: new Date(Date.now() - 1 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'ping_2',
    userId: 'user_3',
    familyId: 'family_1',
    intent: PingIntent.ASK,
    message: 'Which form do I upload for the visa application?',
    durationMinutes: 60,
    expiresAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 minutes from now
    status: PingStatus.ACTIVE,
    contextData: {
      eventType: 'DOCUMENT_UPLOAD',
      urgency: 'MEDIUM'
    },
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    timeRemaining: 45 * 60, // 45 minutes in seconds
    aggregation: {
      hugCount: 1,
      prayerCount: 0,
      tipCount: 3,
      callOfferCount: 0,
      checklistCount: 1,
      timerCount: 0,
      totalPongs: 5,
      lastUpdated: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'ping_3',
    userId: 'user_4',
    familyId: 'family_1',
    intent: PingIntent.CHECK_IN,
    message: 'Landed safely in Mumbai!',
    durationMinutes: 30,
    expiresAt: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // 20 minutes from now
    status: PingStatus.ACTIVE,
    contextData: {
      eventType: 'TRAVEL',
      location: 'Mumbai Airport'
    },
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    userName: 'Priya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    timeRemaining: 20 * 60, // 20 minutes in seconds
    aggregation: {
      hugCount: 5,
      prayerCount: 2,
      tipCount: 1,
      callOfferCount: 2,
      checklistCount: 0,
      timerCount: 0,
      totalPongs: 10,
      lastUpdated: new Date(Date.now() - 1 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'ping_4',
    userId: 'user_5',
    familyId: 'family_1',
    intent: PingIntent.SOS_LITE,
    message: 'Feeling unwell, anyone nearby?',
    durationMinutes: 10,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
    status: PingStatus.ACTIVE,
    contextData: {
      eventType: 'FEELING_UNWELL',
      urgency: 'HIGH'
    },
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    userName: 'Rajesh Kumar',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timeRemaining: 5 * 60, // 5 minutes in seconds
    aggregation: {
      hugCount: 4,
      prayerCount: 3,
      tipCount: 1,
      callOfferCount: 3,
      checklistCount: 2,
      timerCount: 0,
      totalPongs: 13,
      lastUpdated: new Date(Date.now() - 30 * 1000).toISOString()
    }
  },
  {
    id: 'ping_5',
    userId: 'user_6',
    familyId: 'family_1',
    intent: PingIntent.BOOST,
    message: 'Final exam tomorrow morning',
    durationMinutes: 60,
    expiresAt: new Date(Date.now() + 50 * 60 * 1000).toISOString(), // 50 minutes from now
    status: PingStatus.ACTIVE,
    contextData: {
      eventType: 'EXAM',
      urgency: 'HIGH'
    },
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    userName: 'Emma Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    timeRemaining: 50 * 60, // 50 minutes in seconds
    aggregation: {
      hugCount: 2,
      prayerCount: 4,
      tipCount: 2,
      callOfferCount: 1,
      checklistCount: 1,
      timerCount: 1,
      totalPongs: 11,
      lastUpdated: new Date(Date.now() - 3 * 60 * 1000).toISOString()
    }
  }
];

export const mockPongs: Pong[] = [
  {
    id: 'pong_1',
    pingId: 'ping_1',
    userId: 'user_3',
    pongType: PongType.HUG,
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_2',
    pingId: 'ping_1',
    userId: 'user_4',
    pongType: PongType.HUG,
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    userName: 'Priya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_3',
    pingId: 'ping_1',
    userId: 'user_5',
    pongType: PongType.TIP,
    content: 'Remember to mention your project experience!',
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    userName: 'Rajesh Kumar',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_4',
    pingId: 'ping_1',
    userId: 'user_6',
    pongType: PongType.TIP,
    content: 'You got this! Stay confident and be yourself.',
    createdAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    userName: 'Emma Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_5',
    pingId: 'ping_1',
    userId: 'user_7',
    pongType: PongType.PRAYER,
    createdAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    userName: 'Kamala Devi',
    userAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_6',
    pingId: 'ping_1',
    userId: 'user_8',
    pongType: PongType.CALL_OFFER,
    createdAt: new Date(Date.now() - 30 * 1000).toISOString(),
    userName: 'Mike Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_7',
    pingId: 'ping_1',
    userId: 'user_9',
    pongType: PongType.HUG,
    createdAt: new Date(Date.now() - 20 * 1000).toISOString(),
    userName: 'Lisa Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_8',
    pingId: 'ping_6',
    userId: 'user_2',
    pongType: PongType.CALL_OFFER,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_9',
    pingId: 'ping_6',
    userId: 'user_3',
    pongType: PongType.HUG,
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_10',
    pingId: 'ping_7',
    userId: 'user_4',
    pongType: PongType.CALL_OFFER,
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    userName: 'Priya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_11',
    pingId: 'ping_7',
    userId: 'user_5',
    pongType: PongType.CALL_OFFER,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    userName: 'Rajesh Kumar',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'pong_12',
    pingId: 'ping_7',
    userId: 'user_6',
    pongType: PongType.CALL_OFFER,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    userName: 'Emma Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

// Mock family members for testing
export const mockFamilyMembers = [
  {
    id: 'user_1',
    name: 'You',
    avatar: 'https://example.com/your_avatar.jpg',
    relationship: 'self'
  },
  {
    id: 'user_2',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    relationship: 'brother'
  },
  {
    id: 'user_3',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    relationship: 'sister'
  },
  {
    id: 'user_4',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    relationship: 'mother'
  },
  {
    id: 'user_5',
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    relationship: 'father'
  },
  {
    id: 'user_6',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    relationship: 'cousin'
  },
  {
    id: 'user_7',
    name: 'Kamala Devi',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    relationship: 'grandmother'
  },
  {
    id: 'user_8',
    name: 'Mike Thompson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    relationship: 'uncle'
  },
  {
    id: 'user_9',
    name: 'Lisa Chen',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    relationship: 'aunt'
  }
];

// Helper functions for mock data
export const getActivePings = (familyId: string): Ping[] => {
  return mockPings.filter(ping => 
    ping.familyId === familyId && ping.status === PingStatus.ACTIVE
  );
};

export const getPingsByUser = (userId: string): Ping[] => {
  return mockPings.filter(ping => ping.userId === userId);
};

export const getPongsByPing = (pingId: string): Pong[] => {
  return mockPongs.filter(pong => pong.pingId === pingId);
};

export const getFamilyMember = (userId: string) => {
  return mockFamilyMembers.find(member => member.id === userId);
};

// Mock function to simulate creating a new ping
export const createMockPing = (pingData: Partial<Ping>): Ping => {
  const newPing: Ping = {
    id: `ping_${Date.now()}`,
    userId: 'user_1', // Current user
    familyId: 'family_1',
    intent: PingIntent.BOOST,
    message: 'Test ping message',
    durationMinutes: 30,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    status: PingStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userName: 'You',
    userAvatar: 'https://example.com/your_avatar.jpg',
    timeRemaining: 30 * 60,
    aggregation: {
      hugCount: 0,
      prayerCount: 0,
      tipCount: 0,
      callOfferCount: 0,
      checklistCount: 0,
      timerCount: 0,
      totalPongs: 0,
      lastUpdated: new Date().toISOString()
    },
    ...pingData
  };

  return newPing;
};

// Mock function to simulate sending a pong
export const createMockPong = (pingId: string, pongType: PongType, content?: string): Pong => {
  return {
    id: `pong_${Date.now()}`,
    pingId,
    userId: 'user_1', // Current user
    pongType,
    content,
    createdAt: new Date().toISOString(),
    userName: 'You',
    userAvatar: 'https://example.com/your_avatar.jpg'
  };
};
