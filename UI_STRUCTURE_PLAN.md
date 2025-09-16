# 📱 LegacyKeep Mobile UI Structure Plan

## 🎯 Backend Services Analysis

Based on comprehensive analysis of all backend services, here's the complete feature set and UI structure plan:

## 🏗️ Backend Services Overview

### **Core Services Identified:**
1. **Auth Service** - Authentication & Authorization
2. **User Service** - Profile & Preferences Management  
3. **Chat Service** - Real-time Communication
4. **Family Service** - Family Tree & Relationships
5. **Story Service** - Story Creation & Management
6. **Media Service** - File Upload & Processing
7. **Notification Service** - Multi-channel Notifications
8. **API Gateway** - Centralized Routing

## 📱 Mobile App UI Structure

### **1. Authentication Flow**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Splash Screen │ -> │   Login Screen  │ -> │ Register Screen │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         v                       v                       v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Forgot Password│    │  Email Verify   │    │  Phone Verify   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         v                       v                       v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Reset Password │    │  Welcome Screen │    │  Setup Profile  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **2. Main App Navigation (Tab Navigator)**
```
┌─────────────────────────────────────────────────────────────┐
│                    Bottom Tab Navigator                     │
├─────────────────┬─────────────────┬─────────────────────────┤
│      Home       │     Family      │       Stories           │
│   (Dashboard)   │   (Tree View)   │    (Content Hub)        │
├─────────────────┼─────────────────┼─────────────────────────┤
│      Chat       │     Profile     │       More              │
│  (Messaging)    │   (Settings)    │    (Additional)         │
└─────────────────┴─────────────────┴─────────────────────────┘
```

### **3. Home Dashboard Structure**
```
┌─────────────────────────────────────────────────────────────┐
│                    Home Dashboard                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐ │
│  │   Quick Stats   │  │  Recent Activity│  │  Family News  │ │
│  │                 │  │                 │  │               │ │
│  │ • Stories: 12   │  │ • New Story     │  │ • Birthday    │ │
│  │ • Messages: 5   │  │ • Message       │  │ • Anniversary │ │
│  │ • Family: 8     │  │ • Family Update │  │ • Achievement │ │
│  └─────────────────┘  └─────────────────┘  └───────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Quick Actions                            │ │
│  │  [Create Story] [Add Family] [Send Message] [Upload]   │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Recent Stories                           │ │
│  │  [Story Card 1] [Story Card 2] [Story Card 3]          │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Features (Auth Service)

### **Screens & Components:**
- **LoginScreen** - Email/Phone/Username + Password
- **RegisterScreen** - Multi-step registration with validation
- **ForgotPasswordScreen** - Password reset flow
- **EmailVerificationScreen** - Email verification
- **PhoneVerificationScreen** - OTP verification
- **TwoFactorAuthScreen** - 2FA setup and verification
- **SocialLoginScreen** - Google, Apple, Facebook login

### **Key Features:**
- Multi-method authentication (email, phone, username)
- JWT token management with refresh tokens
- Session management and concurrent session limits
- Account lockout and rate limiting
- Social login integration
- Two-factor authentication (2FA)
- Password policy enforcement

## 👤 User Profile Features (User Service)

### **Screens & Components:**
- **ProfileScreen** - Main profile view
- **EditProfileScreen** - Profile editing
- **SettingsScreen** - App settings
- **PreferencesScreen** - User preferences
- **PrivacySettingsScreen** - Privacy controls
- **NotificationSettingsScreen** - Notification preferences
- **SecuritySettingsScreen** - Security options
- **AccountSettingsScreen** - Account management

### **Key Features:**
- Profile picture upload and management
- Personal information management
- Privacy level controls (Public, Friends, Private)
- Notification preferences (Email, Push, SMS)
- Two-factor authentication settings
- Account deactivation and deletion
- User interests and preferences
- Activity logging and tracking

## 💬 Chat Features (Chat Service)

### **Screens & Components:**
- **ChatListScreen** - List of all conversations
- **ChatScreen** - Individual conversation
- **GroupChatScreen** - Group conversation
- **CreateChatScreen** - Start new conversation
- **ChatSettingsScreen** - Chat room settings
- **MessageSearchScreen** - Search messages
- **MediaViewerScreen** - View shared media
- **VoiceMessageScreen** - Record voice messages

### **Key Features:**
- Real-time messaging with WebSocket
- Group messaging with multi-user chat rooms
- Message CRUD operations (create, read, update, delete)
- Message forwarding and replies
- Message reactions with emoji support
- Message starring for important messages
- Read receipts and delivery status
- Message search and filtering
- AES-256-GCM encryption for secure messaging
- Tone detection and emotion analysis
- Protected messages with access levels
- Scheduled messages
- Message threading and replies
- Edit history and version control
- Bulk message operations

## 👨‍👩‍👧‍👦 Family Features (Family Service)

### **Screens & Components:**
- **FamilyTreeScreen** - Interactive family tree
- **FamilyMemberScreen** - Individual family member
- **AddFamilyMemberScreen** - Add new family member
- **EditFamilyMemberScreen** - Edit family member info
- **FamilyInviteScreen** - Invite family members
- **FamilySettingsScreen** - Family circle settings
- **RelationshipScreen** - Manage relationships
- **FamilyMapScreen** - Location-based family view

### **Key Features:**
- Interactive family tree visualization
- Family member profiles and relationships
- Family circle management
- Relationship mapping and management
- Family invitation system
- Family privacy controls
- Family activity tracking
- Location-based family discovery

## 📖 Story Features (Story Service)

### **Screens & Components:**
- **StoriesScreen** - Story feed and discovery
- **CreateStoryScreen** - Story creation
- **EditStoryScreen** - Story editing
- **StoryViewerScreen** - Story reading
- **StorySearchScreen** - Search stories
- **StoryCategoriesScreen** - Browse by category
- **MyStoriesScreen** - User's own stories
- **StoryAnalyticsScreen** - Story performance

### **Key Features:**
- Story creation with rich text editor
- Media integration (photos, videos, audio)
- Story categorization and tagging
- Story sharing and collaboration
- Story privacy controls
- Story search and discovery
- Story analytics and engagement
- Story templates and prompts

## 📸 Media Features (Media Service)

### **Screens & Components:**
- **MediaGalleryScreen** - Media library
- **MediaUploadScreen** - Upload media
- **MediaViewerScreen** - View media
- **MediaEditScreen** - Edit media
- **MediaSearchScreen** - Search media
- **MediaAlbumsScreen** - Organize media
- **MediaSharingScreen** - Share media

### **Key Features:**
- File upload and processing
- Image and video editing
- Media compression and optimization
- Media organization and albums
- Media sharing and collaboration
- Media search and filtering
- Media metadata management
- Cloud storage integration

## 🔔 Notification Features (Notification Service)

### **Screens & Components:**
- **NotificationsScreen** - Notification center
- **NotificationSettingsScreen** - Notification preferences
- **EmailTemplatesScreen** - Email customization
- **PushNotificationScreen** - Push notification settings

### **Key Features:**
- Multi-channel notifications (Email, Push, SMS)
- Template-based messaging
- User preference management
- Delivery tracking and analytics
- Quiet hours and scheduling
- A/B testing capabilities
- Rate limiting and throttling

## 🎨 Design System Components

### **Atomic Components:**
- **Button** - Primary, Secondary, Outline variants
- **Input** - Text, Email, Password, Search
- **Text** - Headings, Body, Caption variants
- **Card** - Story, Family, Chat variants
- **Avatar** - User, Family member avatars
- **Badge** - Notification, Status badges
- **Icon** - Consistent icon system

### **Molecular Components:**
- **FormField** - Input with label and validation
- **ListItem** - Chat, Story, Family list items
- **SearchBar** - Global search functionality
- **NavigationTab** - Bottom tab navigation
- **StoryCard** - Story preview card
- **FamilyMemberCard** - Family member card
- **ChatBubble** - Message bubble

### **Organismic Components:**
- **Header** - Screen headers with actions
- **StoryFeed** - Story timeline
- **FamilyTree** - Interactive family tree
- **ChatList** - Conversation list
- **MediaGrid** - Media gallery grid
- **NotificationList** - Notification feed

## 🚀 Navigation Structure

### **Stack Navigators:**
```
AppNavigator
├── AuthStack
│   ├── SplashScreen
│   ├── LoginScreen
│   ├── RegisterScreen
│   ├── ForgotPasswordScreen
│   ├── EmailVerificationScreen
│   └── PhoneVerificationScreen
├── MainStack
│   ├── TabNavigator
│   │   ├── HomeStack
│   │   │   ├── HomeScreen
│   │   │   ├── QuickActionsScreen
│   │   │   └── RecentActivityScreen
│   │   ├── FamilyStack
│   │   │   ├── FamilyTreeScreen
│   │   │   ├── FamilyMemberScreen
│   │   │   ├── AddFamilyMemberScreen
│   │   │   └── FamilySettingsScreen
│   │   ├── StoriesStack
│   │   │   ├── StoriesScreen
│   │   │   ├── CreateStoryScreen
│   │   │   ├── StoryViewerScreen
│   │   │   └── MyStoriesScreen
│   │   ├── ChatStack
│   │   │   ├── ChatListScreen
│   │   │   ├── ChatScreen
│   │   │   ├── GroupChatScreen
│   │   │   └── CreateChatScreen
│   │   └── ProfileStack
│   │       ├── ProfileScreen
│   │       ├── EditProfileScreen
│   │       ├── SettingsScreen
│   │       └── NotificationSettingsScreen
│   └── ModalStack
│       ├── MediaViewerScreen
│       ├── StoryViewerScreen
│       └── FamilyMemberScreen
```

## 📊 State Management Structure

### **Redux Slices:**
- **authSlice** - Authentication state
- **userSlice** - User profile and preferences
- **chatSlice** - Chat messages and rooms
- **familySlice** - Family tree and relationships
- **storySlice** - Stories and content
- **mediaSlice** - Media files and uploads
- **notificationSlice** - Notifications and preferences
- **uiSlice** - UI state and navigation

### **API Services:**
- **AuthService** - Authentication APIs
- **UserService** - User profile APIs
- **ChatService** - Chat and messaging APIs
- **FamilyService** - Family tree APIs
- **StoryService** - Story management APIs
- **MediaService** - Media upload APIs
- **NotificationService** - Notification APIs

## 🎯 Feature Prioritization

### **Phase 1 - Core Features (MVP):**
1. Authentication flow (Login, Register, Verification)
2. User profile management
3. Basic chat functionality
4. Simple family tree view
5. Basic story creation
6. Media upload and viewing

### **Phase 2 - Enhanced Features:**
1. Advanced chat features (reactions, threading, encryption)
2. Interactive family tree
3. Rich story editor
4. Advanced media processing
5. Push notifications
6. Search functionality

### **Phase 3 - Advanced Features:**
1. AI-powered features (tone detection, suggestions)
2. Advanced analytics
3. Social features
4. Premium features
5. Advanced security features
6. Performance optimizations

## 🔧 Technical Implementation

### **Key Technologies:**
- **React Native** with Expo
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **React Navigation** for navigation
- **Expo Image** for optimized images
- **Expo Secure Store** for secure storage
- **React Native Maps** for location features
- **Expo Camera** for media capture

### **Performance Considerations:**
- Lazy loading for screens and components
- Image optimization and caching
- Message virtualization for large chat lists
- Family tree virtualization for large families
- Story content pagination
- Media compression and thumbnails

---

**This comprehensive UI structure plan ensures LegacyKeep mobile app covers all backend functionality with a scalable, maintainable architecture!** 🚀✨
