import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/constants/colors';
import { spacing } from '../../../shared/constants/spacing';
import { Ping, PingIntent, PongType } from '../types/pingpong.types';
import { getIntentConfig, PONG_ACTION_CONFIGS } from '../constants/pingpong.constants';

interface PingCardProps {
  ping: Ping;
  currentUserId: string;
  onPong: (pingId: string, pongType: PongType, content?: string) => void;
  onExpire: (pingId: string) => void;
}

const { width: screenWidth } = Dimensions.get('window');

const PingCard: React.FC<PingCardProps> = ({ ping, currentUserId, onPong, onExpire }) => {
  const [timeRemaining, setTimeRemaining] = useState(ping.timeRemaining || 0);
  const [pulseAnim] = useState(new Animated.Value(1));

  const intentConfig = getIntentConfig(ping.intent);
  const isOwnPing = ping.userId === currentUserId;
  const hasExpired = timeRemaining <= 0;

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            onExpire(ping.id);
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, ping.id, onExpire]);

  useEffect(() => {
    // Pulse animation for urgent pings
    if (ping.intent === PingIntent.SOS_LITE && timeRemaining > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [ping.intent, timeRemaining, pulseAnim]);

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return 'Expired';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${remainingSeconds}s`;
  };

  const getTimeColor = (): string => {
    if (hasExpired) return colors.error[500];
    if (timeRemaining < 60) return colors.warning[500]; // Less than 1 minute
    if (timeRemaining < 300) return colors.warning[600]; // Less than 5 minutes
    return colors.text.secondary;
  };

  const renderPongActions = () => {
    if (isOwnPing) return null;

    return (
      <View style={styles.pongActions}>
        {PONG_ACTION_CONFIGS.slice(0, 4).map((config) => (
          <TouchableOpacity
            key={config.type}
            style={[styles.pongButton, { backgroundColor: config.color + '10' }]}
            onPress={() => onPong(ping.id, config.type)}
            activeOpacity={0.7}
          >
            <Ionicons name={config.icon as any} size={16} color={config.color} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderAggregation = () => {
    if (!ping.aggregation || ping.aggregation.totalPongs === 0) return null;

    const { aggregation } = ping;
    const topPong = Object.entries({
      [PongType.HUG]: aggregation.hugCount,
      [PongType.PRAYER]: aggregation.prayerCount,
      [PongType.TIP]: aggregation.tipCount,
      [PongType.CALL_OFFER]: aggregation.callOfferCount,
    }).reduce((a, b) => a[1] > b[1] ? a : b);

    if (topPong[1] === 0) return null;

    const topPongConfig = PONG_ACTION_CONFIGS.find(c => c.type === topPong[0]);

    return (
      <View style={styles.aggregation}>
        <View style={styles.aggregationIcon}>
          <Ionicons 
            name={topPongConfig?.icon as any} 
            size={16} 
            color={topPongConfig?.color} 
          />
        </View>
        <Text style={styles.aggregationText}>
          {topPong[1]} {topPongConfig?.label.toLowerCase()}
          {aggregation.totalPongs > topPong[1] && ` +${aggregation.totalPongs - topPong[1]} more`}
        </Text>
      </View>
    );
  };

  return (
    <Animated.View style={[
      styles.container,
      ping.intent === PingIntent.SOS_LITE && { transform: [{ scale: pulseAnim }] }
    ]}>
      <View style={styles.glassmorphism}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={[styles.avatar, { backgroundColor: intentConfig.color + '15' }]}>
              <Ionicons name="person" size={18} color={intentConfig.color} />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{ping.userName || 'Family Member'}</Text>
              <View style={styles.intentBadge}>
                <Ionicons name={intentConfig.icon as any} size={12} color={intentConfig.color} />
                <Text style={[styles.intentText, { color: intentConfig.color }]}>
                  {intentConfig.label}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.timeContainer}>
            <Text style={[styles.timeText, { color: getTimeColor() }]}>
              {formatTimeRemaining(timeRemaining)}
            </Text>
          </View>
        </View>

        {/* Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{ping.message}</Text>
        </View>

        {/* Context */}
        {ping.contextData?.eventType && (
          <View style={styles.contextContainer}>
            <View style={styles.contextBadge}>
              <Ionicons name="information-circle" size={14} color={colors.text.secondary} />
              <Text style={styles.contextText}>
                {ping.contextData.eventType.replace('_', ' ').toLowerCase()}
              </Text>
            </View>
          </View>
        )}

        {/* Aggregation */}
        {renderAggregation()}

        {/* Pong Actions */}
        {renderPongActions()}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  intentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  intentText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  messageContainer: {
    marginBottom: spacing.sm,
  },
  messageText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 22,
  },
  contextContainer: {
    marginBottom: spacing.sm,
  },
  contextBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contextText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  aggregation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  aggregationIcon: {
    marginRight: spacing.xs,
  },
  aggregationText: {
    fontSize: 12,
    color: colors.text.primary,
    fontWeight: '500',
  },
  pongActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  pongButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});

export default PingCard;
