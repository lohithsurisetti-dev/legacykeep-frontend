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
  hiddenContent?: string; // Hidden message content
  hasHiddenContent?: boolean; // Flag to indicate if message has hidden content
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
  },
  {
    id: '3',
    type: 'individual',
    name: 'Grandma Betty',
    avatar: 'https://picsum.photos/100/100?random=3',
    participants: [
      {
        id: 'grandma',
        name: 'Grandma Betty',
        avatar: 'https://picsum.photos/100/100?random=3',
        isOnline: false,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'grandma',
        senderName: 'Grandma Betty',
        senderAvatar: 'https://picsum.photos/100/100?random=3',
        content: "Sweetheart, I found your grandfather's old recipe book! There are so many family secrets in here. 📖",
        timestamp: 'Yesterday',
        isOwnMessage: false,
        reactions: [
          { emoji: '❤️', count: 3, users: ['user1', 'user2', 'user3'] }
        ]
      },
      {
        id: '2',
        senderId: 'me',
        senderName: 'You',
        content: "Grandma! That's amazing! Can't wait to see those recipes. 🥧",
        timestamp: 'Yesterday',
        isOwnMessage: true,
      }
    ],
    isOnline: false,
    lastMessage: "Sweetheart, I found your grandfather's old recipe book! There are so many family secrets in here. 📖",
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '4',
    type: 'individual',
    name: 'Uncle Mike',
    avatar: 'https://picsum.photos/100/100?random=4',
    participants: [
      {
        id: 'uncle',
        name: 'Uncle Mike',
        avatar: 'https://picsum.photos/100/100?random=4',
        isOnline: true,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'uncle',
        senderName: 'Uncle Mike',
        senderAvatar: 'https://picsum.photos/100/100?random=4',
        content: "Hey! I'm digitizing all the old family videos. Found some gems from your childhood! 🎥",
        timestamp: '2 hours ago',
        isOwnMessage: false,
      },
      {
        id: '2',
        senderId: 'me',
        senderName: 'You',
        content: "That's incredible! I'd love to see those. Thanks for doing this! 🎬",
        timestamp: '2 hours ago',
        isOwnMessage: true,
      },
      {
        id: '3',
        senderId: 'uncle',
        senderName: 'Uncle Mike',
        senderAvatar: 'https://picsum.photos/100/100?random=4',
        content: "I'll share the link once they're ready. Some of these are priceless! 💎",
        timestamp: '1 hour ago',
        isOwnMessage: false,
      }
    ],
    isOnline: true,
    lastMessage: "I'll share the link once they're ready. Some of these are priceless! 💎",
    lastMessageTime: '1 hour ago',
    unreadCount: 0,
  },
  {
    id: '5',
    type: 'individual',
    name: 'Cousin Emma',
    avatar: 'https://picsum.photos/100/100?random=5',
    participants: [
      {
        id: 'emma',
        name: 'Cousin Emma',
        avatar: 'https://picsum.photos/100/100?random=5',
        isOnline: false,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'emma',
        senderName: 'Cousin Emma',
        senderAvatar: 'https://picsum.photos/100/100?random=5',
        content: "Remember our summer adventures at the lake house? I found some photos! 🏖️",
        timestamp: '3 days ago',
        isOwnMessage: false,
      }
    ],
    isOnline: false,
    lastMessage: "Remember our summer adventures at the lake house? I found some photos! 🏖️",
    lastMessageTime: '3 days ago',
    unreadCount: 1,
  },
  {
    id: '6',
    type: 'individual',
    name: 'Aunt Carol',
    avatar: 'https://picsum.photos/100/100?random=6',
    participants: [
      {
        id: 'aunt',
        name: 'Aunt Carol',
        avatar: 'https://picsum.photos/100/100?random=6',
        isOnline: false,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'aunt',
        senderName: 'Aunt Carol',
        senderAvatar: 'https://picsum.photos/100/100?random=6',
        content: "I'm so excited for the reunion! I have stories from my travels that I can't wait to share. ✈️",
        timestamp: '1 week ago',
        isOwnMessage: false,
      },
      {
        id: '2',
        senderId: 'me',
        senderName: 'You',
        content: "We're all looking forward to hearing your adventures, Aunt Carol! 🌍",
        timestamp: '1 week ago',
        isOwnMessage: true,
      }
    ],
    isOnline: false,
    lastMessage: "I'm so excited for the reunion! I have stories from my travels that I can't wait to share. ✈️",
    lastMessageTime: '1 week ago',
    unreadCount: 0,
  }
];

// Mock group chat conversations
export const mockGroupChats: ChatConversation[] = [
  {
    id: '7',
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
        hiddenContent: "That's where I taught you to tie your first knot. You were so proud when you finally got it right! Remember how you wanted to live up there? 😊",
        hasHiddenContent: true,
        timestamp: '10:55 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '😄', count: 2, users: ['user1', 'user2'] }
        ]
      },
      {
        id: '12',
        senderId: 'mom',
        senderName: 'Mom',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBgiSi3s70Q08CblD0FMv4wSOv6GLz6ol2c2J4AswyRdr9IaCrMYRlbr3UeFI9FTjpc3fyBruFPzJoRVIOJfhd05lHX4RF07_TPc_MSKod8E-uYHYuIalnmg325AvtSpQRiRAKHwAszMCuxEjWQYWNtETC5so_Q6QmuiArOjroZAH4mekmWcEcmnzNdwVKTGV6nJHsxcWqxAV3qokCfL44Y33ZRGnxN1bn7Q0acH-WYlLzwb0X8Fj_orz6nTH8wgeyJYIBzu44TQ',
        content: "I can't wait to see everyone's faces when they taste my lemonade! 🍋",
        hiddenContent: "I've been perfecting this recipe for 30 years. Your grandmother taught me the secret ingredient - a pinch of love and memories from our family gatherings. This will be the best batch yet! 💕",
        hasHiddenContent: true,
        timestamp: '10:57 AM',
        isOwnMessage: false,
        reactions: [
          { emoji: '🍋', count: 3, users: ['user1', 'user2', 'user3'] }
        ]
      }
    ],
    isOnline: true,
    lastMessage: "I can't wait to see everyone's faces when they taste my lemonade! 🍋",
    lastMessageTime: '10:57 AM',
    unreadCount: 2,
  },
  {
    id: '8',
    type: 'group',
    name: 'Family Recipes',
    participants: [
      {
        id: 'grandma',
        name: 'Grandma Betty',
        avatar: 'https://picsum.photos/100/100?random=3',
        isOnline: false,
      },
      {
        id: 'mom',
        name: 'Mom',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBgiSi3s70Q08CblD0FMv4wSOv6GLz6ol2c2J4AswyRdr9IaCrMYRlbr3UeFI9FTjpc3fyBruFPzJoRVIOJfhd05lHX4RF07_TPc_MSKod8E-uYHYuIalnmg325AvtSpQRiRAKHwAszMCuxEjWQYWNtETC5so_Q6QmuiArOjroZAH4mekmWcEcmnzNdwVKTGV6nJHsxcWqxAV3qokCfL44Y33ZRGnxN1bn7Q0acH-WYlLzwb0X8Fj_orz6nTH8wgeyJYIBzu44TQ',
        isOnline: true,
      },
      {
        id: 'aunt',
        name: 'Aunt Carol',
        avatar: 'https://picsum.photos/100/100?random=6',
        isOnline: false,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'grandma',
        senderName: 'Grandma Betty',
        senderAvatar: 'https://picsum.photos/100/100?random=3',
        content: "I'm sharing the secret ingredient for my apple pie! 🥧",
        timestamp: 'Yesterday',
        isOwnMessage: false,
        reactions: [
          { emoji: '🤫', count: 2, users: ['user1', 'user2'] }
        ]
      },
      {
        id: '2',
        senderId: 'mom',
        senderName: 'Mom',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBgiSi3s70Q08CblD0FMv4wSOv6GLz6ol2c2J4AswyRdr9IaCrMYRlbr3UeFI9FTjpc3fyBruFPzJoRVIOJfhd05lHX4RF07_TPc_MSKod8E-uYHYuIalnmg325AvtSpQRiRAKHwAszMCuxEjWQYWNtETC5so_Q6QmuiArOjroZAH4mekmWcEcmnzNdwVKTGV6nJHsxcWqxAV3qokCfL44Y33ZRGnxN1bn7Q0acH-WYlLzwb0X8Fj_orz6nTH8wgeyJYIBzu44TQ',
        content: "Mom! You're the best! I can't wait to try this. 👩‍🍳",
        timestamp: 'Yesterday',
        isOwnMessage: false,
      }
    ],
    isOnline: true,
    lastMessage: "Mom! You're the best! I can't wait to try this. 👩‍🍳",
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '9',
    type: 'group',
    name: 'Family Memories',
    participants: [
      {
        id: 'uncle',
        name: 'Uncle Mike',
        avatar: 'https://picsum.photos/100/100?random=4',
        isOnline: true,
      },
      {
        id: 'emma',
        name: 'Cousin Emma',
        avatar: 'https://picsum.photos/100/100?random=5',
        isOnline: false,
      },
      {
        id: 'me',
        name: 'You',
        isOnline: true,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'uncle',
        senderName: 'Uncle Mike',
        senderAvatar: 'https://picsum.photos/100/100?random=4',
        content: "I found the video from your 5th birthday party! You were so adorable! 🎂",
        timestamp: '2 hours ago',
        isOwnMessage: false,
        reactions: [
          { emoji: '🥺', count: 3, users: ['user1', 'user2', 'user3'] }
        ]
      },
      {
        id: '2',
        senderId: 'emma',
        senderName: 'Cousin Emma',
        senderAvatar: 'https://picsum.photos/100/100?random=5',
        content: "I remember that party! The cake was huge! 😄",
        timestamp: '1 hour ago',
        isOwnMessage: false,
      }
    ],
    isOnline: true,
    lastMessage: "I remember that party! The cake was huge! 😄",
    lastMessageTime: '1 hour ago',
    unreadCount: 1,
  },
  {
    id: '10',
    type: 'group',
    name: 'Reunion Planning',
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
        id: 'aunt',
        name: 'Aunt Carol',
        avatar: 'https://picsum.photos/100/100?random=6',
        isOnline: false,
      }
    ],
    messages: [
      {
        id: '1',
        senderId: 'sarah',
        senderName: 'Sarah Miller',
        senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWU95jILiA6O2GEDVhrqB1imTQTWW2dPoQbCoRuFo36BvT31Vxt1FKU14tTAJuV06ntD9QGeQET4Y_M-MwS4YfxGOSmkLnpilwnavc9zPh17YCWzAQNjkfGadiNU1maoB6ANit9SeaoBsD1t_3QWKf0eLgjvzUJI56QTqJ5ZeC8lLyrAf9ZKIAt02L9LD6v9PNKLgQhWt9zwBj1VKjWICP5r8XwdzugVbK4SOhbqfzBuvnNbRFOle2sKEyKYv4eVgIlcWL4-R-vxY',
        content: "Let's plan the reunion menu! Who's bringing what? 🍽️",
        timestamp: '4 hours ago',
        isOwnMessage: false,
      },
      {
        id: '2',
        senderId: 'aunt',
        senderName: 'Aunt Carol',
        senderAvatar: 'https://picsum.photos/100/100?random=6',
        content: "I'll bring my famous pasta salad! 🥗",
        timestamp: '3 hours ago',
        isOwnMessage: false,
      }
    ],
    isOnline: true,
    lastMessage: "I'll bring my famous pasta salad! 🥗",
    lastMessageTime: '3 hours ago',
    unreadCount: 0,
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
