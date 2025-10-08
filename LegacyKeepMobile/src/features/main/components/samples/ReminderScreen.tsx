/**
 * Reminder Screen Sample
 * Clean, premium design with blue theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

// Blue theme
const THEME = {
  primary: '#3B82F6',
  light: '#DBEAFE',
  dark: '#2563EB',
};

const ReminderScreen = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const reminder = {
    title: 'Shopping List',
    from: {
      name: 'Priya',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    },
    dueTime: 'Today, 6:00 PM',
    items: [
      { id: '1', text: 'Milk (2 liters)' },
      { id: '2', text: 'Bread (whole wheat)' },
      { id: '3', text: 'Vegetables for dinner' },
      { id: '4', text: 'Dad\'s medicines', important: true },
      { id: '5', text: 'Eggs (1 dozen)' },
      { id: '6', text: 'Rice (5kg bag)' },
    ],
    note: 'Don\'t forget Dad\'s medicines! Pharmacy closes at 8 PM'
  };

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const progress = (checkedItems.size / reminder.items.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminder</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Reminder Header */}
        <View style={styles.reminderHeader}>
          <View style={styles.titleRow}>
            <Image source={{ uri: reminder.from.avatar }} style={styles.fromAvatar} />
            <View style={styles.titleInfo}>
              <Text style={styles.reminderTitle}>{reminder.title}</Text>
              <Text style={styles.fromText}>From {reminder.from.name}</Text>
            </View>
            <View style={[styles.dueBadge, { backgroundColor: THEME.light }]}>
              <Ionicons name="time" size={14} color={THEME.dark} />
            </View>
          </View>

          <View style={styles.dueRow}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.dueText}>{reminder.dueTime}</Text>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: THEME.primary }]} />
            </View>
            <Text style={[styles.progressText, { color: THEME.primary }]}>
              {checkedItems.size}/{reminder.items.length}
            </Text>
          </View>
        </View>

        {/* Items List */}
        <View style={styles.itemsList}>
          {reminder.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => toggleItem(item.id)}
            >
              <View style={[
                styles.checkbox,
                checkedItems.has(item.id) && { backgroundColor: THEME.primary, borderColor: THEME.primary }
              ]}>
                {checkedItems.has(item.id) && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={[
                styles.itemText,
                checkedItems.has(item.id) && styles.itemTextChecked
              ]}>
                {item.text}
              </Text>
              {item.important && !checkedItems.has(item.id) && (
                <Ionicons name="alert-circle" size={18} color="#EF4444" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Note */}
        {reminder.note && (
          <View style={[styles.noteCard, { backgroundColor: THEME.light }]}>
            <Ionicons name="information-circle" size={20} color={THEME.dark} />
            <Text style={[styles.noteText, { color: THEME.dark }]}>{reminder.note}</Text>
          </View>
        )}

        {/* Add Item Button */}
        <TouchableOpacity style={[styles.addButton, { backgroundColor: THEME.primary }]}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  reminderHeader: {
    backgroundColor: 'white',
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  fromAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  titleInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  reminderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  fromText: {
    fontSize: 13,
    color: '#6B7280',
  },
  dueBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  dueText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '800',
  },
  itemsList: {
    backgroundColor: 'white',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
  },
  itemTextChecked: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12,
    gap: spacing.md,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});

export default ReminderScreen;