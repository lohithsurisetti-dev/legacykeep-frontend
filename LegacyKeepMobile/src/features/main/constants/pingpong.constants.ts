import { PingIntentConfig, PongActionConfig } from '../types/pingpong.types';
import { PingIntent, PongType } from '../types/pingpong.types';

/**
 * Ping Intent Configurations
 * Defines the UI configuration for each ping intent type
 */
export const PING_INTENT_CONFIGS: PingIntentConfig[] = [
  {
    type: PingIntent.BOOST,
    label: 'Boost',
    description: 'Need encouragement or motivation',
    icon: 'rocket-outline',
    color: '#10B981', // emerald-500
    defaultDuration: 30,
    placeholder: 'What do you need a boost for?',
    maxLength: 60
  },
  {
    type: PingIntent.ASK,
    label: 'Ask',
    description: 'Need quick guidance or help',
    icon: 'help-circle-outline',
    color: '#3B82F6', // blue-500
    defaultDuration: 60,
    placeholder: 'What do you need help with?',
    maxLength: 60
  },
  {
    type: PingIntent.CHECK_IN,
    label: 'Check-in',
    description: 'Let family know you\'re safe',
    icon: 'checkmark-circle-outline',
    color: '#8B5CF6', // violet-500
    defaultDuration: 30,
    placeholder: 'Share your status update',
    maxLength: 60
  },
  {
    type: PingIntent.SOS_LITE,
    label: 'SOS Lite',
    description: 'Need immediate support',
    icon: 'warning-outline',
    color: '#EF4444', // red-500
    defaultDuration: 10,
    placeholder: 'What support do you need?',
    maxLength: 60
  }
];

/**
 * Pong Action Configurations
 * Defines the UI configuration for each pong action type
 */
export const PONG_ACTION_CONFIGS: PongActionConfig[] = [
  {
    type: PongType.HUG,
    label: 'Hug',
    icon: 'heart-outline',
    color: '#EC4899', // pink-500
    description: 'Send virtual hug and support',
    hasContent: false
  },
  {
    type: PongType.PRAYER,
    label: 'Prayer',
    icon: 'leaf-outline',
    color: '#84CC16', // lime-500
    description: 'Send positive vibes and prayers',
    hasContent: false
  },
  {
    type: PongType.TIP,
    label: 'Tip',
    icon: 'bulb-outline',
    color: '#F59E0B', // amber-500
    description: 'Share helpful advice or tip',
    hasContent: true,
    maxContentLength: 120
  },
  {
    type: PongType.CALL_OFFER,
    label: 'Call',
    icon: 'call-outline',
    color: '#06B6D4', // cyan-500
    description: 'Offer to call right now',
    hasContent: false
  },
  {
    type: PongType.CHECKLIST,
    label: 'Checklist',
    icon: 'checkmark-done-outline',
    color: '#10B981', // emerald-500
    description: 'Send a helpful reminder',
    hasContent: false
  },
  {
    type: PongType.TIMER,
    label: 'Timer',
    icon: 'timer-outline',
    color: '#8B5CF6', // violet-500
    description: 'Set a countdown timer',
    hasContent: false
  }
];

/**
 * Duration Options for Pings
 */
export const PING_DURATION_OPTIONS = [
  { label: '10 minutes', value: 10 },
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 }
];

/**
 * Context Presets for Different Intents
 */
export const PING_CONTEXT_PRESETS = {
  [PingIntent.BOOST]: [
    { label: 'Interview', value: 'INTERVIEW' },
    { label: 'Exam', value: 'EXAM' },
    { label: 'Presentation', value: 'PRESENTATION' },
    { label: 'Job Search', value: 'JOB_SEARCH' },
    { label: 'Work Project', value: 'WORK_PROJECT' }
  ],
  [PingIntent.ASK]: [
    { label: 'Document Upload', value: 'DOCUMENT_UPLOAD' },
    { label: 'Form Help', value: 'FORM_HELP' },
    { label: 'Decision Making', value: 'DECISION_MAKING' },
    { label: 'Technical Issue', value: 'TECHNICAL_ISSUE' },
    { label: 'General Question', value: 'GENERAL_QUESTION' }
  ],
  [PingIntent.CHECK_IN]: [
    { label: 'Travel', value: 'TRAVEL' },
    { label: 'Hospital', value: 'HOSPITAL' },
    { label: 'Work', value: 'WORK' },
    { label: 'School', value: 'SCHOOL' },
    { label: 'Home Safe', value: 'HOME_SAFE' }
  ],
  [PingIntent.SOS_LITE]: [
    { label: 'Feeling Unwell', value: 'FEELING_UNWELL' },
    { label: 'Emergency', value: 'EMERGENCY' },
    { label: 'Need Support', value: 'NEED_SUPPORT' },
    { label: 'Stressed', value: 'STRESSED' },
    { label: 'Overwhelmed', value: 'OVERWHELMED' }
  ]
};

/**
 * Helper function to get intent config by type
 */
export const getIntentConfig = (intent: PingIntent): PingIntentConfig => {
  return PING_INTENT_CONFIGS.find(config => config.type === intent) || PING_INTENT_CONFIGS[0];
};

/**
 * Helper function to get pong config by type
 */
export const getPongConfig = (pongType: PongType): PongActionConfig => {
  return PONG_ACTION_CONFIGS.find(config => config.type === pongType) || PONG_ACTION_CONFIGS[0];
};

/**
 * Helper function to get context presets for intent
 */
export const getContextPresets = (intent: PingIntent) => {
  return PING_CONTEXT_PRESETS[intent] || [];
};
