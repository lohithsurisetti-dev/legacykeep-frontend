/**
 * Reminder Screen Sample
 * Daily chores, shopping lists, and family reminders
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '../../../../shared/constants';

const ReminderScreen = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const reminders = [
    {
      id: 'shopping',
      title: 'Shopping List',
      from: {
        name: 'Priya',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
      },
      priority: 'high',
      dueTime: 'Today, 6:00 PM',
      items: [
        { id: '1', text: 'Milk (2 liters)', checked: false },
        { id: '2', text: 'Bread (whole wheat)', checked: false },
        { id: '3', text: 'Vegetables for dinner', checked: false },
        { id: '4', text: 'Dad\'s medicines', checked: false, important: true },
        { id: '5', text: 'Eggs (1 dozen)', checked: false }
      ],
      note: 'Don\'t forget Dad\'s medicines! Pharmacy closes at 8 PM'
    },
    {
      id: 'chores',
      title: 'Weekend Chores',
      from: {
        name: 'Mom',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      priority: 'medium',
      dueTime: 'Saturday',
      items: [
        { id: '6', text: 'Fix the kitchen tap', checked: false },
        { id: '7', text: 'Water the garden', checked: false },
        { id: '8', text: 'Organize garage', checked: false },
        { id: '9', text: 'Call plumber for bathroom', checked: false, important: true }
      ],
      note: 'Plumber is available only on weekends'
    },
    {
      id: 'kids',
      title: 'Kids Activities',
      from: {
        name: 'Priya',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
      },
      priority: 'medium',
      dueTime: 'This Week',
      items: [
        { id: '10', text: 'Pick up Aarav from school (4 PM)', checked: false, important: true },
        { id: '11', text: 'Buy art supplies for Diya', checked: false },
        { id: '12', text: 'Schedule dentist appointment', checked: false },
        { id: '13', text: 'Sign permission slip for field trip', checked: false }
      ]
    }
  ];

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return ['#EF4444', '#DC2626'];
      case 'medium': return ['#F59E0B', '#D97706'];
      case 'low': return ['#10B981', '#059669'];
      default: return ['#6B7280', '#4B5563'];
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return 'alert-circle';
      case 'medium': return 'time';
      case 'low': return 'checkmark-circle';
      default: return 'information-circle';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Family Reminders</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={28} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {reminders.reduce((acc, r) => acc + r.items.length, 0)}
              </Text>
              <Text style={styles.summaryLabel}>Total Tasks</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{checkedItems.size}</Text>
              <Text style={styles.summaryLabel}>Completed</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {reminders.reduce((acc, r) => acc + r.items.filter(i => i.important).length, 0)}
              </Text>
              <Text style={styles.summaryLabel}>Important</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Reminder Lists */}
        {reminders.map((reminder) => {
          const completed = reminder.items.filter(item => checkedItems.has(item.id)).length;
          const total = reminder.items.length;
          const progress = (completed / total) * 100;

          return (
            <View key={reminder.id} style={styles.reminderCard}>
              {/* Card Header */}
              <View style={styles.reminderHeader}>
                <View style={styles.reminderTitleRow}>
                  <Image source={{ uri: reminder.from.avatar }} style={styles.fromAvatar} />
                  <View style={styles.reminderTitleInfo}>
                    <Text style={styles.reminderTitle}>{reminder.title}</Text>
                    <Text style={styles.reminderFrom}>From {reminder.from.name}</Text>
                  </View>
                  <LinearGradient
                    colors={getPriorityColor(reminder.priority)}
                    style={styles.priorityBadge}
                  >
                    <Ionicons name={getPriorityIcon(reminder.priority) as any} size={14} color="white" />
                  </LinearGradient>
                </View>

                {/* Due Time */}
                <View style={styles.dueTimeContainer}>
                  <Ionicons name="calendar" size={14} color="#6B7280" />
                  <Text style={styles.dueTimeText}>{reminder.dueTime}</Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{completed}/{total}</Text>
                </View>
              </View>

              {/* Items List */}
              <View style={styles.itemsList}>
                {reminder.items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.item}
                    onPress={() => toggleItem(item.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.checkbox,
                      checkedItems.has(item.id) && styles.checkboxChecked
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
                      <Ionicons name="star" size={16} color="#F59E0B" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Note */}
              {reminder.note && (
                <View style={styles.noteCard}>
                  <Ionicons name="chatbox-ellipses" size={16} color="#8B5CF6" />
                  <Text style={styles.noteText}>{reminder.note}</Text>
                </View>
              )}
            </View>
          );
        })}

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
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  addButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  summaryCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  summaryGradient: {
    flexDirection: 'row',
    padding: spacing.xl,
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  reminderCard: {
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  reminderHeader: {
    padding: spacing.lg,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  reminderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  fromAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  reminderTitleInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  reminderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
  },
  reminderFrom: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  priorityBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.md,
  },
  dueTimeText: {
    fontSize: 13,
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
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  itemsList: {
    padding: spacing.lg,
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
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  itemTextChecked: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    padding: spacing.md,
    margin: spacing.lg,
    marginTop: 0,
    borderRadius: 12,
    gap: spacing.sm,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    fontWeight: '500',
  },
});

export default ReminderScreen;
