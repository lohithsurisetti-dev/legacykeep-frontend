/**
 * Mock Chat Data
 * 
 * Sample data for chat conversations (individual and group chats)
 */

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
  replyTo?: {
    id: string;
    senderName: string;
    content: string;
  };
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface ChatConversation {
  id: string;
  type: 'individual' | 'group';
  name: string;
  avatar?: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  isOnline?: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

// Mock individual chat conversations
export const mockIndividualChats: ChatConversation[] = [
  {
    id: '1',
    type: 'individual',
    name: 'Sarah Miller',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
    participants: [
      {
        id: 'sarah',
        name: 'Sarah Miller',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        isOnline: true,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'sarah',
        senderName: 'Sarah Miller',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        content: "Hey! Can't wait for the reunion. I found some amazing old photos of grandma and grandpa from the 50s! 📸",
        timestamp: '10:30 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '❤️', count: 2, users: ['user1', 'user2'] }
        ]
      },
      {
        id: '2',
        senderId: 'me',
        senderName: 'You',
        content: "That's fantastic! I'll be there. I'm bringing my famous apple pie. 🥧",
        timestamp: '10:32 AM',
        isOwnMessage: true,
      },
      {
        id: '3',
        senderId: 'sarah',
        senderName: 'Sarah Miller',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        content: "See you all there. Let's make sure to record some stories from the elders. 🎙️",
        timestamp: '10:40 AM',
        isOwnMessage: false,
      },
      {
        id: '4',
        senderId: 'sarah',
        senderName: 'Sarah Miller',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        content: "I have so many questions for Aunt Carol about her time living abroad. 🗺️",
        timestamp: '10:41 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '👍', count: 1, users: ['user1'] }
        ]
      },
      {
        id: '5',
        senderId: 'me',
        senderName: 'You',
        content: "Great idea! I'll bring my recorder. We should prepare some questions beforehand. 🤔",
        timestamp: '10:42 AM',
        isOwnMessage: true,
        replyTo: {
          id: '4',
          senderName: 'Sarah Miller',
          content: "I have so many questions for Aunt Carol about her time living abroad. 🗺️"
        },
        reactions: [
          { emoji: '💡', count: 3, users: ['user1', 'user2', 'user3'] }
        ]
      },
      {
        id: '6',
        senderId: 'sarah',
        senderName: 'Sarah Miller',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        content: "I'll make my special lemonade for everyone. 🍋 And yes, preparing questions is a wonderful idea, honey.",
        timestamp: '10:45 AM',
        isOwnMessage: false,
      },
      {
        id: '7',
        senderId: 'me',
        senderName: 'You',
        content: "Perfect! It wouldn't be a family gathering without your lemonade, Mom! ❤️",
        timestamp: '10:46 AM',
        isOwnMessage: true,
        reactions: [
          { emoji: '😊', count: 1, users: ['user1'] }
        ]
      }
    ],
    isOnline: true,
    lastMessage: "Perfect! It wouldn't be a family gathering without your lemonade, Mom! ❤️",
    lastMessageTime: '10:46 AM',
    unreadCount: 0,
  },
  {
    id: '2',
    type: 'individual',
    name: 'Dad',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fhAQL1gzMLSGG9fVGiJkcvJISvVDALmsSSSf46tPxFnuYQFuRpUdVumeU140iCuUMj5QnJ1pxXD-b7mzXv3ssIVfLOSo-wQlkuQRfntNVQV_KK46BT7LhknEc1WEu6Ugaoowhb6-mIB9yGijisrul6ds_xvM_8BuZ2PwSUeMby0b4RtYHIMlKy2nC_5Rdui7ZwHXcBdo8LNZyhtIYwKnbOXNw4E-mETPhphWGbLHDDPRJ7A_iEhOnOYSvZUZ3rSUkuvriBLWnbU',
    participants: [
      {
        id: 'dad',
        name: 'Dad',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fhAQL1gzMLSGG9fVGiJkcvJISvVDALmsSSSf46tPxFnuYQFuRpUdVumeU140iCuUMj5QnJ1pxXD-b7mzXv3ssIVfLOSo-wQlkuQRfntNVQV_KK46BT7LhknEc1WEu6Ugaoowhb6-mIB9yGijisrul6ds_xvM_8BuZ2PwSUeMby0b4RtYHIMlKy2nC_5Rdui7ZwHXcBdo8LNZyhtIYwKnbOXNw4E-mETPhphWGbLHDDPRJ7A_iEhOnOYSvZUZ3rSUkuvriBLWnbU',
        isOnline: false,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'dad',
        senderName: 'Dad',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fhAQL1gzMLSGG9fVGiJkcvJISvVDALmsSSSf46tPxFnuYQFuRpUdVumeU140iCuUMj5QnJ1pxXD-b7mzXv3ssIVfLOSo-wQlkuQRfntNVQV_KK46BT7LhknEc1WEu6Ugaoowhb6-mIB9yGijisrul6ds_xvM_8BuZ2PwSUeMby0b4RtYHIMlKy2nC_5Rdui7ZwHXcBdo8LNZyhtIYwKnbOXNw4E-mETPhphWGbLHDDPRJ7A_iEhOnOYSvZUZ3rSUkuvriBLWnbU',
        content: "Don't forget the giant oak tree in the backyard. We spent countless hours climbing it. 🌳",
        timestamp: '10:55 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '😄', count: 2, users: ['user1', 'user2'] }
        ]
      }
    ],
    isOnline: false,
    lastMessage: "Don't forget the giant oak tree in the backyard. We spent countless hours climbing it. 🌳",
    lastMessageTime: '10:55 AM',
    unreadCount: 1,
  }
];

// Mock group chat conversations
export const mockGroupChats: ChatConversation[] = [
  {
    id: '3',
    type: 'group',
    name: 'The Millers',
    participants: [
      {
        id: 'sarah',
        name: 'Sarah Miller',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        isOnline: true,
      },
      {
        id: 'dad',
        name: 'Dad',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fhAQL1gzMLSGG9fVGiJkcvJISvVDALmsSSSf46tPxFnuYQFuRpUdVumeU140iCuUMj5QnJ1pxXD-b7mzXv3ssIVfLOSo-wQlkuQRfntNVQV_KK46BT7LhknEc1WEu6Ugaoowhb6-mIB9yGijisrul6ds_xvM_8BuZ2PwSUeMby0b4RtYHIMlKy2nC_5Rdui7ZwHXcBdo8LNZyhtIYwKnbOXNw4E-mETPhphWGbLHDDPRJ7A_iEhOnOYSvZUZ3rSUkuvriBLWnbU',
        isOnline: false,
      },
      {
        id: 'mom',
        name: 'Mom',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBgiSi3s70Q08CblD0FMv4wSOv6GLz6ol2c2J4AswyRdr9IaCrMYRlbr3UeFI9FTjpc3fyBruFPzJoRVIOJfhd05lHX4RF07_TPc_MSKod8E-uYHYuIalnmg325AvtSpQRiRAKHwAszMCuxEjWQYWNtETC5so_Q6QmuiArOjroZAH4mekmWcEcmnzNdwVKTGV6nJHsxcWqxAV3qokCfL44Y33ZRGnxN1bn7Q0acH-WYlLzwb0X8Fj_orz6nTH8wgeyJYIBzu44TQ',
        isOnline: true,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'sarah',
        senderName: 'Sarah Miller',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        content: "Hey everyone! Can't wait for the reunion. I found some amazing old photos of grandma and grandpa from the 50s! 📸",
        timestamp: '10:30 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '❤️', count: 2, users: ['user1', 'user2'] }
        ]
      },
      {
        id: '2',
        senderId: 'me',
        senderName: 'You',
        content: "That's fantastic! I'll be there. I'm bringing my famous apple pie. 🥧",
        timestamp: '10:32 AM',
        isOwnMessage: true,
        replyTo: {
          id: '1',
          senderName: 'Sarah Miller',
          content: "Hey everyone! Can't wait for..."
        }
      },
      {
        id: '3',
        senderId: 'dad',
        senderName: 'Dad',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fhAQL1gzMLSGG9fVGiJkcvJISvVDALmsSSSf46tPxFnuYQFuRpUdVumeU140iCuUMj5QnJ1pxXD-b7mzXv3ssIVfLOSo-wQlkuQRfntNVQV_KK46BT7LhknEc1WEu6Ugaoowhb6-mIB9yGijisrul6ds_xvM_8BuZ2PwSUeMby0b4RtYHIMlKy2nC_5Rdui7ZwHXcBdo8LNZyhtIYwKnbOXNw4E-mETPhphWGbLHDDPRJ7A_iEhOnOYSvZUZ3rSUkuvriBLWnbU',
        content: "See you all there. Let's make sure to record some stories from the elders. 🎙️",
        timestamp: '10:40 AM',
        isOwnMessage: false,
      },
      {
        id: '4',
        senderId: 'dad',
        senderName: 'Dad',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fhAQL1gzMLSGG9fVGiJkcvJISvVDALmsSSSf46tPxFnuYQFuRpUdVumeU140iCuUMj5QnJ1pxXD-b7mzXv3ssIVfLOSo-wQlkuQRfntNVQV_KK46BT7LhknEc1WEu6Ugaoowhb6-mIB9yGijisrul6ds_xvM_8BuZ2PwSUeMby0b4RtYHIMlKy2nC_5Rdui7ZwHXcBdo8LNZyhtIYwKnbOXNw4E-mETPhphWGbLHDDPRJ7A_iEhOnOYSvZUZ3rSUkuvriBLWnbU',
        content: "I have so many questions for Aunt Carol about her time living abroad. 🗺️",
        timestamp: '10:41 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '👍', count: 1, users: ['user1'] }
        ]
      },
      {
        id: '5',
        senderId: 'me',
        senderName: 'You',
        content: "Great idea! I'll bring my recorder. We should prepare some questions beforehand. 🤔",
        timestamp: '10:42 AM',
        isOwnMessage: true,
        reactions: [
          { emoji: '💡', count: 3, users: ['user1', 'user2', 'user3'] }
        ]
      },
      {
        id: '6',
        senderId: 'mom',
        senderName: 'Mom',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBgiSi3s70Q08CblD0FMv4wSOv6GLz6ol2c2J4AswyRdr9IaCrMYRlbr3UeFI9FTjpc3fyBruFPzJoRVIOJfhd05lHX4RF07_TPc_MSKod8E-uYHYuIalnmg325AvtSpQRiRAKHwAszMCuxEjWQYWNtETC5so_Q6QmuiArOjroZAH4mekmWcEcmnzNdwVKTGV6nJHsxcWqxAV3qokCfL44Y33ZRGnxN1bn7Q0acH-WYlLzwb0X8Fj_orz6nTH8wgeyJYIBzu44TQ',
        content: "I'll make my special lemonade for everyone. 🍋 And yes, preparing questions is a wonderful idea, honey.",
        timestamp: '10:45 AM',
        isOwnMessage: false,
      },
      {
        id: '7',
        senderId: 'me',
        senderName: 'You',
        content: "Perfect! It wouldn't be a family gathering without your lemonade, Mom! ❤️",
        timestamp: '10:46 AM',
        isOwnMessage: true,
        reactions: [
          { emoji: '😊', count: 1, users: ['user1'] }
        ]
      },
      {
        id: '8',
        senderId: 'sarah',
        senderName: 'Sarah Miller',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        content: "Speaking of questions, what's the first thing you remember about grandma's house? 🏡",
        timestamp: '10:50 AM',
        isOwnMessage: false,
      },
      {
        id: '9',
        senderId: 'mom',
        senderName: 'Mom',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBgiSi3s70Q08CblD0FMv4wSOv6GLz6ol2c2J4AswyRdr9IaCrMYRlbr3UeFI9FTjpc3fyBruFPzJoRVIOJfhd05lHX4RF07_TPc_MSKod8E-uYHYuIalnmg325AvtSpQRiRAKHwAszMCuxEjWQYWNtETC5so_Q6QmuiArOjroZAH4mekmWcEcmnzNdwVKTGV6nJHsxcWqxAV3qokCfL44Y33ZRGnxN1bn7Q0acH-WYlLzwb0X8Fj_orz6nTH8wgeyJYIBzu44TQ',
        content: "For me, it was the smell of her baking bread the moment you walked in. Pure magic. ✨",
        timestamp: '10:52 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '💖', count: 1, users: ['user1'] }
        ]
      },
      {
        id: '10',
        senderId: 'me',
        senderName: 'You',
        content: "Yes! And the sound of the old cuckoo clock in the hallway. I can almost hear it now. 🕰️",
        timestamp: '10:53 AM',
        isOwnMessage: true,
      },
      {
        id: '11',
        senderId: 'dad',
        senderName: 'Dad',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fhAQL1gzMLSGG9fVGiJkcvJISvVDALmsSSSf46tPxFnuYQFuRpUdVumeU140iCuUMj5QnJ1pxXD-b7mzXv3ssIVfLOSo-wQlkuQRfntNVQV_KK46BT7LhknEc1WEu6Ugaoowhb6-mIB9yGijisrul6ds_xvM_8BuZ2PwSUeMby0b4RtYHIMlKy2nC_5Rdui7ZwHXcBdo8LNZyhtIYwKnbOXNw4E-mETPhphWGbLHDDPRJ7A_iEhOnOYSvZUZ3rSUkuvriBLWnbU',
        content: "Don't forget the giant oak tree in the backyard. We spent countless hours climbing it. 🌳",
        timestamp: '10:55 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '😄', count: 2, users: ['user1', 'user2'] }
        ]
      }
    ],
    isOnline: true,
    lastMessage: "Don't forget the giant oak tree in the backyard. We spent countless hours climbing it. 🌳",
    lastMessageTime: '10:55 AM',
    unreadCount: 2,
  }
];

// Combine all chats
export const mockAllChats: ChatConversation[] = [
  ...mockIndividualChats,
  ...mockGroupChats
];

// Helper function to get chat by ID
export const getChatById = (id: string): ChatConversation | undefined => {
  return mockAllChats.find(chat => chat.id === id);
};
