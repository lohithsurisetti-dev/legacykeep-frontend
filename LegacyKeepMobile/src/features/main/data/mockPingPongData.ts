import { Ping, Pong, PingIntent, PongType, PingStatus } from '../types/pingpong.types';

/**
 * Mock data for Ping & Pong feature testing
 */

export const mockPings: Ping[] = [
  {
    id: 'ping_1',
    userId: 'user_2',
    familyId: 'family_1',
    intent: PingIntent.BOOST,
    message: 'Interview in 10 minutes!',
    durationMinutes: 30,
    expiresAt: new Date(Date.now() + 25 * 60 * 1000).toISOString(), // 25 minutes from now
    status: PingStatus.ACTIVE,
    contextData: {
      eventType: 'INTERVIEW',
      location: 'Tech Corp Office',
      urgency: 'HIGH'
    },
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    userName: 'John Doe',
    userAvatar: 'https://example.com/avatar1.jpg',
    timeRemaining: 25 * 60, // 25 minutes in seconds
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
    userAvatar: 'https://example.com/avatar2.jpg',
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
    userName: 'Mom',
    userAvatar: 'https://example.com/avatar3.jpg',
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
    userName: 'Dad',
    userAvatar: 'https://example.com/avatar4.jpg',
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
    userAvatar: 'https://example.com/avatar5.jpg',
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
    userAvatar: 'https://example.com/avatar2.jpg'
  },
  {
    id: 'pong_2',
    pingId: 'ping_1',
    userId: 'user_4',
    pongType: PongType.HUG,
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    userName: 'Mom',
    userAvatar: 'https://example.com/avatar3.jpg'
  },
  {
    id: 'pong_3',
    pingId: 'ping_1',
    userId: 'user_5',
    pongType: PongType.TIP,
    content: 'Remember to mention your project experience!',
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    userName: 'Dad',
    userAvatar: 'https://example.com/avatar4.jpg'
  },
  {
    id: 'pong_4',
    pingId: 'ping_1',
    userId: 'user_6',
    pongType: PongType.TIP,
    content: 'You got this! Stay confident and be yourself.',
    createdAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    userName: 'Emma Wilson',
    userAvatar: 'https://example.com/avatar5.jpg'
  },
  {
    id: 'pong_5',
    pingId: 'ping_1',
    userId: 'user_7',
    pongType: PongType.PRAYER,
    createdAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    userName: 'Grandma',
    userAvatar: 'https://example.com/avatar6.jpg'
  },
  {
    id: 'pong_6',
    pingId: 'ping_1',
    userId: 'user_8',
    pongType: PongType.CALL_OFFER,
    createdAt: new Date(Date.now() - 30 * 1000).toISOString(),
    userName: 'Uncle Mike',
    userAvatar: 'https://example.com/avatar7.jpg'
  },
  {
    id: 'pong_7',
    pingId: 'ping_1',
    userId: 'user_9',
    pongType: PongType.HUG,
    createdAt: new Date(Date.now() - 20 * 1000).toISOString(),
    userName: 'Aunt Lisa',
    userAvatar: 'https://example.com/avatar8.jpg'
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
    avatar: 'https://example.com/avatar1.jpg',
    relationship: 'brother'
  },
  {
    id: 'user_3',
    name: 'Sarah Johnson',
    avatar: 'https://example.com/avatar2.jpg',
    relationship: 'sister'
  },
  {
    id: 'user_4',
    name: 'Mom',
    avatar: 'https://example.com/avatar3.jpg',
    relationship: 'mother'
  },
  {
    id: 'user_5',
    name: 'Dad',
    avatar: 'https://example.com/avatar4.jpg',
    relationship: 'father'
  },
  {
    id: 'user_6',
    name: 'Emma Wilson',
    avatar: 'https://example.com/avatar5.jpg',
    relationship: 'cousin'
  },
  {
    id: 'user_7',
    name: 'Grandma',
    avatar: 'https://example.com/avatar6.jpg',
    relationship: 'grandmother'
  },
  {
    id: 'user_8',
    name: 'Uncle Mike',
    avatar: 'https://example.com/avatar7.jpg',
    relationship: 'uncle'
  },
  {
    id: 'user_9',
    name: 'Aunt Lisa',
    avatar: 'https://example.com/avatar8.jpg',
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
