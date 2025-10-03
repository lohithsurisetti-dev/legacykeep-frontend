import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/constants/colors';
import { spacing } from '../../../shared/constants/spacing';
import { PongType, SendPongRequest } from '../types/pingpong.types';
import { PONG_ACTION_CONFIGS, getPongConfig } from '../constants/pingpong.constants';

interface PongActionsProps {
  isVisible: boolean;
  pingId: string;
  onClose: () => void;
  onPongSent: (pingId: string, pongRequest: SendPongRequest) => void;
}

const { width: screenWidth } = Dimensions.get('window');

const PongActions: React.FC<PongActionsProps> = ({ 
  isVisible, 
  pingId, 
  onClose, 
  onPongSent 
}) => {
  const [selectedPongType, setSelectedPongType] = useState<PongType | null>(null);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPongConfig = selectedPongType ? getPongConfig(selectedPongType) : null;

  const handlePongAction = (pongType: PongType) => {
    if (pongType === PongType.TIP) {
      setSelectedPongType(pongType);
    } else {
      // Send immediate pong for non-content types
      sendPong(pongType);
    }
  };

  const sendPong = async (pongType: PongType, pongContent?: string) => {
    setIsSubmitting(true);
    
    try {
      const pongRequest: SendPongRequest = {
        pongType,
        content: pongContent,
        metadata: pongType === PongType.TIP ? {
          isVoice: false,
          duration: pongContent?.length || 0
        } : undefined
      };

      await onPongSent(pingId, pongRequest);
      
      // Reset form
      setSelectedPongType(null);
      setContent('');
      onClose();
      
      // Show success feedback
      const config = getPongConfig(pongType);
      Alert.alert(
        'Pong Sent! 🎉',
        `Your ${config.label.toLowerCase()} has been sent to the family.`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send pong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendTip = () => {
    if (!content.trim()) {
      Alert.alert('Tip Required', 'Please enter a helpful tip.');
      return;
    }

    if (content.length > (selectedPongConfig?.maxContentLength || 120)) {
      Alert.alert('Tip Too Long', `Tip must be ${selectedPongConfig?.maxContentLength || 120} characters or less.`);
      return;
    }

    sendPong(PongType.TIP, content.trim());
  };

  const renderPongGrid = () => (
    <View style={styles.pongGrid}>
      {PONG_ACTION_CONFIGS.map((config) => (
        <TouchableOpacity
          key={config.type}
          style={[styles.pongCard, { backgroundColor: config.color + '15' }]}
          onPress={() => handlePongAction(config.type)}
          activeOpacity={0.7}
        >
          <View style={[styles.pongIcon, { backgroundColor: config.color + '30' }]}>
            <Ionicons name={config.icon as any} size={28} color={config.color} />
          </View>
          <Text style={styles.pongLabel}>{config.label}</Text>
          <Text style={styles.pongDescription}>{config.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTipInput = () => {
    if (selectedPongType !== PongType.TIP) return null;

    const maxLength = selectedPongConfig?.maxContentLength || 120;
    const remainingChars = maxLength - content.length;

    return (
      <View style={styles.tipContainer}>
        <View style={styles.tipHeader}>
          <View style={styles.tipIcon}>
            <Ionicons name="bulb" size={20} color={selectedPongConfig?.color} />
          </View>
          <Text style={styles.tipTitle}>Share a helpful tip</Text>
        </View>
        
        <TextInput
          style={styles.tipInput}
          placeholder="What advice or tip would you like to share?"
          placeholderTextColor={colors.text.secondary}
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={maxLength}
          autoFocus
        />
        
        <View style={styles.tipFooter}>
          <Text style={[
            styles.charCount,
            remainingChars < 20 && styles.charCountWarning
          ]}>
            {remainingChars} characters remaining
          </Text>
          
          <View style={styles.tipActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setSelectedPongType(null);
                setContent('');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sendTipButton,
                (!content.trim() || isSubmitting) && styles.sendTipButtonDisabled
              ]}
              onPress={handleSendTip}
              disabled={!content.trim() || isSubmitting}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.sendTipButtonText,
                (!content.trim() || isSubmitting) && styles.sendTipButtonTextDisabled
              ]}>
                {isSubmitting ? 'Sending...' : 'Send Tip'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {selectedPongType ? 'Send ' + selectedPongConfig?.label : 'Send Support'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {!selectedPongType ? (
            <>
              <View style={styles.introSection}>
                <Text style={styles.introTitle}>How would you like to support?</Text>
                <Text style={styles.introDescription}>
                  Choose an action to send support to your family member.
                </Text>
              </View>
              {renderPongGrid()}
            </>
          ) : (
            renderTipInput()
          )}
        </ScrollView>

        {/* Quick Actions Footer */}
        {!selectedPongType && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Tap any action above to send support instantly
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  introSection: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  pongGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
  },
  pongCard: {
    width: (screenWidth - spacing.md * 2 - spacing.sm) / 2,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  pongIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  pongLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  pongDescription: {
    fontSize: 11,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  tipContainer: {
    paddingVertical: spacing.lg,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500] + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  tipInput: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border.light,
    marginBottom: spacing.md,
  },
  tipFooter: {
    gap: spacing.md,
  },
  charCount: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  charCountWarning: {
    color: colors.error[500],
  },
  tipActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.medium,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  sendTipButton: {
    flex: 2,
    backgroundColor: colors.primary[500],
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendTipButtonDisabled: {
    backgroundColor: colors.border.light,
  },
  sendTipButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  sendTipButtonTextDisabled: {
    color: colors.text.secondary,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default PongActions;
