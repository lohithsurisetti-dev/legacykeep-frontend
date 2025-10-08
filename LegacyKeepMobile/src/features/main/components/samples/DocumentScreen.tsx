/**
 * Document Screen Sample
 * Clean, premium design with pink theme
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../../shared/constants';

// Pink theme
const THEME = {
  primary: '#be185d',
  light: '#FCE7F3',
  dark: '#9d174d',
};

const DocumentScreen = () => {
  const [isSaved, setIsSaved] = useState(false);

  const document = {
    title: 'Family Property Deed',
    type: 'Legal Document',
    author: {
      name: 'Father Ramesh',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face',
    },
    uploadedDate: 'February 20, 2024',
    fileSize: '2.4 MB',
    pages: 12,
    description: 'Original property deed of our ancestral home in Kerala. This document dates back to 1952 and has been carefully preserved through generations.',
    importance: 'High',
    category: 'Property',
    tags: ['Legal', 'Property', 'Ancestral Home', 'Kerala'],
    sharedWith: ['All Family Members'],
    thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=500&fit=crop',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Document</Text>
        <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
          <Ionicons 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={isSaved ? THEME.primary : "#1F2937"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Document Preview */}
        <View style={styles.previewContainer}>
          <Image source={{ uri: document.thumbnail }} style={styles.documentPreview} />
          <View style={styles.previewOverlay}>
            <View style={[styles.pagesBadge, { backgroundColor: THEME.primary }]}>
              <Text style={styles.pagesBadgeText}>{document.pages} pages</Text>
            </View>
          </View>
        </View>

        {/* Document Info */}
        <View style={styles.documentInfo}>
          <View style={styles.titleRow}>
            <View style={[styles.typeBadge, { backgroundColor: THEME.light }]}>
              <Text style={[styles.typeText, { color: THEME.dark }]}>{document.type}</Text>
            </View>
            {document.importance === 'High' && (
              <View style={styles.importanceBadge}>
                <Ionicons name="alert-circle" size={14} color="#EF4444" />
                <Text style={styles.importanceText}>Important</Text>
              </View>
            )}
          </View>

          <Text style={styles.documentTitle}>{document.title}</Text>

          <View style={styles.authorRow}>
            <Image source={{ uri: document.author.avatar }} style={styles.authorAvatar} />
            <View>
              <Text style={styles.authorName}>{document.author.name}</Text>
              <Text style={styles.uploadDate}>Uploaded {document.uploadedDate}</Text>
            </View>
          </View>

          <Text style={styles.description}>{document.description}</Text>
        </View>

        {/* Document Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="folder-outline" size={20} color={THEME.primary} />
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{document.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="document-outline" size={20} color={THEME.primary} />
            <Text style={styles.detailLabel}>File Size</Text>
            <Text style={styles.detailValue}>{document.fileSize}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={20} color={THEME.primary} />
            <Text style={styles.detailLabel}>Shared With</Text>
            <Text style={styles.detailValue}>{document.sharedWith[0]}</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {document.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: THEME.light }]}>
              <Text style={[styles.tagText, { color: THEME.dark }]}>#{tag}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: THEME.primary }]}>
            <Ionicons name="eye-outline" size={20} color="white" />
            <Text style={styles.actionText}>View Full</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Ionicons name="download-outline" size={20} color={THEME.primary} />
            <Text style={[styles.actionTextSecondary, { color: THEME.primary }]}>Download</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
  previewContainer: {
    height: 320,
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  documentPreview: {
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  pagesBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pagesBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  documentInfo: {
    backgroundColor: 'white',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  typeBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  importanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  importanceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DC2626',
  },
  documentTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  uploadDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
  },
  detailsCard: {
    backgroundColor: 'white',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  actionButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.xs,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#be185d',
  },
  actionTextSecondary: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default DocumentScreen;
