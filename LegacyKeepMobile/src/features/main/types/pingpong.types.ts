/**
 * Ping & Pong Feature Types
 * 
 * This file defines all TypeScript interfaces for the Ping & Pong feature,
 * including pings, pongs, and related data structures.
 */

export enum PingIntent {
  BOOST = 'BOOST',
  ASK = 'ASK',
  CHECK_IN = 'CHECK_IN',
  SOS_LITE = 'SOS_LITE'
}

export enum PongType {
  HUG = 'HUG',
  PRAYER = 'PRAYER',
  TIP = 'TIP',
  CALL_OFFER = 'CALL_OFFER',
  CHECKLIST = 'CHECKLIST',
  TIMER = 'TIMER'
}

export enum PingStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}

export interface PingContext {
  eventType?: string;
  location?: string;
  urgency?: 'LOW' | 'MEDIUM' | 'HIGH';
  [key: string]: any;
}

export interface Ping {
  id: string;
  userId: string;
  familyId: string;
  intent: PingIntent;
  message: string;
  durationMinutes: number;
  expiresAt: string;
  status: PingStatus;
  contextData?: PingContext;
  createdAt: string;
  updatedAt: string;
  // UI display fields
  userName?: string;
  userAvatar?: string;
  timeRemaining?: number; // seconds
  aggregation?: PingAggregation;
}

export interface Pong {
  id: string;
  pingId: string;
  userId: string;
  pongType: PongType;
  content?: string; // For TIP type
  metadata?: {
    isVoice?: boolean;
    duration?: number;
    [key: string]: any;
  };
  createdAt: string;
  // UI display fields
  userName?: string;
  userAvatar?: string;
}

export interface PingAggregation {
  hugCount: number;
  prayerCount: number;
  tipCount: number;
  callOfferCount: number;
  checklistCount: number;
  timerCount: number;
  totalPongs: number;
  lastUpdated: string;
}

export interface CreatePingRequest {
  intent: PingIntent;
  message: string;
  durationMinutes: number;
  contextData?: PingContext;
}

export interface SendPongRequest {
  pongType: PongType;
  content?: string;
  metadata?: {
    isVoice?: boolean;
    duration?: number;
    [key: string]: any;
  };
}

export interface PingIntentConfig {
  type: PingIntent;
  label: string;
  description: string;
  icon: string;
  color: string;
  defaultDuration: number;
  placeholder: string;
  maxLength: number;
}

export interface PongActionConfig {
  type: PongType;
  label: string;
  icon: string;
  color: string;
  description: string;
  hasContent?: boolean;
  maxContentLength?: number;
}

export interface PingPongStats {
  totalPings: number;
  totalPongs: number;
  activePings: number;
  familyEngagement: number; // percentage
  mostUsedIntent: PingIntent;
  mostUsedPong: PongType;
}
