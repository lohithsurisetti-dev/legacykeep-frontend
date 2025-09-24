/**
 * Theme Selector Component
 * 
 * Allows users to select their preferred theme:
 * - System (follows phone settings)
 * - Light (always light)
 * - Dark (always dark)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography, spacing } from '../../../shared/constants';
import { useTheme } from '../../../app/providers/ThemeContext';

interface ThemeSelectorProps {
  style?: any;
}

const themeOptions = [
  {
    mode: 'system' as const,
    title: 'System',
    description: 'Follow device settings',
    icon: 'phone-portrait' as const,
  },
  {
    mode: 'light' as const,
    title: 'Light',
    description: 'Always light theme',
    icon: 'sunny' as const,
  },
  {
    mode: 'dark' as const,
    title: 'Dark',
    description: 'Always dark theme',
    icon: 'moon' as const,
  },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ style }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mode, effectiveTheme, systemTheme, setMode, colors, isLoading } = useTheme();

  const getCurrentModeData = () => {
    const modeData = themeOptions.find(option => option.mode === mode);
    if (mode === 'system' && systemTheme && modeData) {
      return {
        ...modeData,
        title: `System (${systemTheme.charAt(0).toUpperCase() + systemTheme.slice(1)})`,
      };
    }
    return modeData || themeOptions[0]; // Fallback to first option
  };

  const currentModeData = getCurrentModeData();

  const handleModeSelect = async (selectedMode: typeof mode) => {
    await setMode(selectedMode);
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Theme Selector Button */}
      <TouchableOpacity
        style={[styles.selector, { backgroundColor: colors.surface, borderColor: colors.border }, style]}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <View style={styles.selectorContent}>
          <Ionicons 
            name={(currentModeData?.icon as any) || 'phone-portrait'} 
            size={20} 
            color={colors.primary} 
          />
          <Text style={[styles.selectorText, { color: colors.text }]}>
            {currentModeData?.title || 'System'}
          </Text>
          <Ionicons name="chevron-down" size={16} color={colors.textTertiary} />
        </View>
      </TouchableOpacity>

      {/* Theme Selection Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Select Theme</Text>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.themeList}>
                {themeOptions.map((option) => {
                  const isActive = mode === option.mode;
                  const displayTitle = option.mode === 'system' && systemTheme 
                    ? `${option.title} (${systemTheme.charAt(0).toUpperCase() + systemTheme.slice(1)})`
                    : option.title;

                  return (
                    <TouchableOpacity
                      key={option.mode}
                      style={[
                        styles.themeItem,
                        { borderColor: colors.border },
                        isActive && { 
                          backgroundColor: colors.surfaceSecondary,
                          borderColor: colors.primary 
                        }
                      ]}
                      onPress={() => handleModeSelect(option.mode)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.themeIconContainer, { backgroundColor: colors.surfaceSecondary }]}>
                        <Ionicons 
                          name={option.icon as any} 
                          size={24} 
                          color={isActive ? colors.primary : colors.textSecondary} 
                        />
                      </View>
                      <View style={styles.themeInfo}>
                        <Text style={[styles.themeTitle, { color: colors.text }]}>{displayTitle}</Text>
                        <Text style={[styles.themeDescription, { color: colors.textSecondary }]}>
                          {option.description}
                        </Text>
                      </View>
                      {isActive && (
                        <Ionicons name="checkmark" size={20} color={colors.primary} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // Selector Button
  selector: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  selectorText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalContent: {
    borderRadius: 20,
    padding: spacing.lg,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  closeButton: {
    padding: spacing.xs,
  },
  // Theme List
  themeList: {
    maxHeight: 300,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  themeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  themeInfo: {
    flex: 1,
  },
  themeTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  themeDescription: {
    fontSize: typography.sizes.sm,
    marginTop: 2,
  },
});

export default ThemeSelector;
