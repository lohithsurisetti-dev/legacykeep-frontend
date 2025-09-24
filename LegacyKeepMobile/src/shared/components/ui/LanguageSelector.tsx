/**
 * Language Selector Component
 * 
 * Allows users to select their preferred language
 * with dynamic switching and visual feedback
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../../shared/constants';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { GlassmorphismContainer } from './';

interface LanguageSelectorProps {
  style?: any;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentLanguage, availableLanguages, changeLanguage, t, isLoading } = useLanguage();

  const currentLanguageData = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageSelect = async (languageCode: string) => {
    await changeLanguage(languageCode);
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Language Selector Button */}
      <TouchableOpacity
        style={[styles.selector, style]}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <View style={styles.selectorContent}>
          <Ionicons name="language" size={20} color={colors.secondary.teal[600]} />
          <Text style={styles.selectorText}>
            {currentLanguageData?.nativeName || 'English'}
          </Text>
          <Ionicons name="chevron-down" size={16} color={colors.neutral[400]} />
        </View>
      </TouchableOpacity>

      {/* Language Selection Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <GlassmorphismContainer style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Language</Text>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={colors.neutral[600]} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.languageList}>
                {availableLanguages.map((language) => (
                  <TouchableOpacity
                    key={language.code}
                    style={[
                      styles.languageItem,
                      currentLanguage === language.code && styles.languageItemActive
                    ]}
                    onPress={() => handleLanguageSelect(language.code)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.languageInfo}>
                      <Text style={styles.languageName}>{language.name}</Text>
                      <Text style={styles.languageNative}>{language.nativeName}</Text>
                    </View>
                    {currentLanguage === language.code && (
                      <Ionicons name="checkmark" size={20} color={colors.secondary.teal[600]} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </GlassmorphismContainer>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // Selector Button
  selector: {
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral[200],
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
    color: colors.neutral[900],
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    padding: spacing.lg,
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
    color: colors.neutral[900],
  },
  closeButton: {
    padding: spacing.xs,
  },
  // Language List
  languageList: {
    maxHeight: 400,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.xs,
  },
  languageItemActive: {
    backgroundColor: colors.secondary.teal[50],
    borderWidth: 1,
    borderColor: colors.secondary.teal[200],
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.neutral[900],
  },
  languageNative: {
    fontSize: typography.sizes.sm,
    color: colors.neutral[600],
    marginTop: 2,
  },
});

export default LanguageSelector;
