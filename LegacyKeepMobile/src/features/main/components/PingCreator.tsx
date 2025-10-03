import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/constants/colors';
import { spacing } from '../../../shared/constants/spacing';
import { PingIntent, CreatePingRequest, PingContext } from '../types/pingpong.types';
import { PING_INTENT_CONFIGS, PING_DURATION_OPTIONS, getContextPresets } from '../constants/pingpong.constants';

interface PingCreatorProps {
  isVisible: boolean;
  onClose: () => void;
  onPingCreated: (ping: CreatePingRequest) => void;
}

const { width: screenWidth } = Dimensions.get('window');

const PingCreator: React.FC<PingCreatorProps> = ({ isVisible, onClose, onPingCreated }) => {
  const [selectedIntent, setSelectedIntent] = useState<PingIntent>(PingIntent.BOOST);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(30);
  const [contextPreset, setContextPreset] = useState<string>('');
  const [customContext, setCustomContext] = useState('');

  const selectedIntentConfig = PING_INTENT_CONFIGS.find(config => config.type === selectedIntent)!;
  const contextPresets = getContextPresets(selectedIntent);
  const remainingChars = selectedIntentConfig.maxLength - message.length;

  useEffect(() => {
    if (isVisible) {
      // Reset form when modal opens
      setSelectedIntent(PingIntent.BOOST);
      setMessage('');
      setDuration(selectedIntentConfig.defaultDuration);
      setContextPreset('');
      setCustomContext('');
    }
  }, [isVisible, selectedIntentConfig.defaultDuration]);

  const handleCreatePing = () => {
    if (!message.trim()) {
      Alert.alert('Message Required', 'Please enter a message for your ping.');
      return;
    }

    if (message.length > selectedIntentConfig.maxLength) {
      Alert.alert('Message Too Long', `Message must be ${selectedIntentConfig.maxLength} characters or less.`);
      return;
    }

    const contextData: PingContext = {};
    if (contextPreset) {
      contextData.eventType = contextPreset;
    }
    if (customContext.trim()) {
      contextData.customContext = customContext.trim();
    }

    const pingRequest: CreatePingRequest = {
      intent: selectedIntent,
      message: message.trim(),
      durationMinutes: duration,
      contextData: Object.keys(contextData).length > 0 ? contextData : undefined
    };

    onPingCreated(pingRequest);
    onClose();
  };

  const renderIntentSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What type of support do you need?</Text>
      <View style={styles.intentGrid}>
        {PING_INTENT_CONFIGS.map((config) => (
          <TouchableOpacity
            key={config.type}
            style={[
              styles.intentCard,
              selectedIntent === config.type && styles.intentCardSelected
            ]}
            onPress={() => {
              setSelectedIntent(config.type);
              setDuration(config.defaultDuration);
              setContextPreset('');
              setCustomContext('');
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.intentIcon, { backgroundColor: config.color + '20' }]}>
              <Ionicons name={config.icon as any} size={24} color={config.color} />
            </View>
            <Text style={[styles.intentLabel, selectedIntent === config.type && styles.intentLabelSelected]}>
              {config.label}
            </Text>
            <Text style={styles.intentDescription}>{config.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderContextPresets = () => {
    if (contextPresets.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick context (optional)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetScroll}>
          {contextPresets.map((preset) => (
            <TouchableOpacity
              key={preset.value}
              style={[
                styles.presetChip,
                contextPreset === preset.value && styles.presetChipSelected
              ]}
              onPress={() => setContextPreset(contextPreset === preset.value ? '' : preset.value)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.presetText,
                contextPreset === preset.value && styles.presetTextSelected
              ]}>
                {preset.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderMessageInput = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your message</Text>
      <View style={styles.messageContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder={selectedIntentConfig.placeholder}
          placeholderTextColor={colors.text.secondary}
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={selectedIntentConfig.maxLength}
          autoFocus
        />
        <Text style={[
          styles.charCount,
          remainingChars < 10 && styles.charCountWarning
        ]}>
          {remainingChars}
        </Text>
      </View>
    </View>
  );

  const renderDurationSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>How long should this ping be active?</Text>
      <View style={styles.durationGrid}>
        {PING_DURATION_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.durationCard,
              duration === option.value && styles.durationCardSelected
            ]}
            onPress={() => setDuration(option.value)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.durationText,
              duration === option.value && styles.durationTextSelected
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCustomContext = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Additional context (optional)</Text>
      <TextInput
        style={styles.customContextInput}
        placeholder="Add any additional details..."
        placeholderTextColor={colors.text.secondary}
        value={customContext}
        onChangeText={setCustomContext}
        multiline
        maxLength={100}
      />
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Ping</Text>
          <TouchableOpacity
            onPress={handleCreatePing}
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled
            ]}
            disabled={!message.trim()}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.sendButtonText,
              !message.trim() && styles.sendButtonTextDisabled
            ]}>
              Send
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderIntentSelector()}
          {renderContextPresets()}
          {renderMessageInput()}
          {renderCustomContext()}
          {renderDurationSelector()}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Ionicons name="information-circle-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.footerText}>
              Your ping will be visible to family members for {duration} minutes
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  sendButton: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  sendButtonDisabled: {
    backgroundColor: colors.border.light,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  sendButtonTextDisabled: {
    color: colors.text.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  intentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  intentCard: {
    width: (screenWidth - spacing.md * 2 - spacing.sm) / 2,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  intentCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[500] + '10',
  },
  intentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  intentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  intentLabelSelected: {
    color: colors.primary[500],
  },
  intentDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  presetScroll: {
    marginBottom: spacing.sm,
  },
  presetChip: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  presetChipSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  presetText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  presetTextSelected: {
    color: 'white',
  },
  messageContainer: {
    position: 'relative',
  },
  messageInput: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  charCount: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    fontSize: 12,
    color: colors.text.secondary,
  },
  charCountWarning: {
    color: colors.error[500],
  },
  customContextInput: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 14,
    color: colors.text.primary,
    minHeight: 60,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  durationCard: {
    width: (screenWidth - spacing.md * 2 - spacing.sm) / 2,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  durationCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[500] + '10',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  durationTextSelected: {
    color: colors.primary[500],
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.primary,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
    flex: 1,
  },
});

export default PingCreator;
