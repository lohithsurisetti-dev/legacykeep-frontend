/**
 * LegacyKeep Type Definitions
 *
 * Centralized type definitions for the entire application
 */

// Navigation Types
export interface RootStackParamList {
  Auth: undefined;
  Main: undefined;
  Modal: { screen: string; params?: any };
}

export interface AuthStackParamList {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  EmailVerification: { email: string };
  PhoneVerification: { phoneNumber: string };
  TwoFactorAuth: undefined;
}

export interface MainTabParamList {
  Home: undefined;
  Family: undefined;
  Stories: undefined;
  Chat: undefined;
  Profile: undefined;
}

export interface HomeStackParamList {
  HomeScreen: undefined;
  QuickActions: undefined;
  RecentActivity: undefined;
}

export interface FamilyStackParamList {
  FamilyTree: undefined;
  FamilyMember: { memberId: string };
  AddFamilyMember: undefined;
  FamilySettings: undefined;
}

export interface StoriesStackParamList {
  StoriesList: undefined;
  CreateStory: undefined;
  StoryViewer: { storyId: string };
  MyStories: undefined;
}

export interface ChatStackParamList {
  ChatList: undefined;
  Chat: { chatRoomId: string };
  GroupChat: { chatRoomId: string };
  CreateChat: undefined;
}

export interface ProfileStackParamList {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  NotificationSettings: undefined;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  bio?: string;
  location?: string;
  profilePictureUrl?: string;
  profilePictureThumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  privacyLevel: 'PUBLIC' | 'FRIENDS' | 'PRIVATE';
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

// Chat Types
export interface ChatRoom {
  id: string;
  name: string;
  type: 'PRIVATE' | 'GROUP';
  participants: string[];
  lastMessage?: Message;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'AUDIO' | 'VIDEO';
  timestamp: string;
  editedAt?: string;
  isEdited?: boolean;
}

// Family Types
export interface FamilyMember {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  relationship: string;
  profilePictureUrl?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  bio?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyRelationship {
  id: string;
  fromMemberId: string;
  toMemberId: string;
  relationshipType: 'PARENT' | 'CHILD' | 'SPOUSE' | 'SIBLING' | 'OTHER';
  createdAt: string;
}

// Story Types
export interface Story {
  id: string;
  title: string;
  content: string;
  authorId: string;
  category: string;
  tags: string[];
  mediaUrls: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Media Types
export interface MediaFile {
  id: string;
  fileName: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT';
  fileSize: number;
  uploadedBy: string;
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'EMAIL' | 'PUSH' | 'SMS' | 'IN_APP';
  isRead: boolean;
  createdAt: string;
}

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void; // eslint-disable-line no-unused-vars
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
}

export interface CardProps {
  children: any;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
}

// Redux State Types
export interface RootState {
  auth: AuthState;
  user: UserState;
  chat: ChatState;
  family: FamilyState;
  stories: StoriesState;
  media: MediaState;
  notifications: NotificationState;
  ui: UIState;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  profile: UserProfile | null;
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
}

export interface ChatState {
  rooms: ChatRoom[];
  messages: { [chatRoomId: string]: Message[] };
  activeRoom: string | null;
  loading: boolean;
  error: string | null;
}

export interface FamilyState {
  members: FamilyMember[];
  relationships: FamilyRelationship[];
  loading: boolean;
  error: string | null;
}

export interface StoriesState {
  stories: Story[];
  myStories: Story[];
  loading: boolean;
  error: string | null;
}

export interface MediaState {
  files: MediaFile[];
  uploading: boolean;
  loading: boolean;
  error: string | null;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark';
  loading: boolean;
  error: string | null;
}

// Environment Types
export type Environment = 'development' | 'qa' | 'staging' | 'production';

// Feature Flag Types
export interface FeatureFlags {
  enableAnalytics: boolean;
  enableCrashlytics: boolean;
  enablePushNotifications: boolean;
  enableBiometricAuth: boolean;
  enablePremiumFeatures: boolean;
  enableSocialLogin: boolean;
  enableLocationServices: boolean;
  enableCamera: boolean;
  enableGallery: boolean;
}
