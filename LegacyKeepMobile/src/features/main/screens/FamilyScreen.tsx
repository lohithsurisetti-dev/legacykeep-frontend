/**
 * Family Screen - Expandable Tree Structure
 * 
 * Hierarchical family tree with expand/collapse functionality
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../../shared/constants';
import { HomeHeader } from '../../../shared/components/ui';
import { useAuth } from '../../../app/providers/AuthContext';
import { useLanguage } from '../../../app/providers/LanguageContext';
import { useTheme } from '../../../app/providers/ThemeContext';

// Family member data structure with hierarchical relationships
interface FamilyMember {
  id: string;
  name: string;
  surname: string;
  relation: string;
  photo?: string;
  isAlive: boolean;
  birthYear?: string;
  email?: string;
  phone?: string;
  spouse?: string; // Spouse ID
  children?: FamilyMember[]; // Nested children
  siblings?: FamilyMember[]; // Siblings
}

// Complete family tree structure with ALL possible relations
const familyTreeData = {
  // Generation 0: Great-Grandparents (Father's Side)
  greatGrandparentsFatherSide: {
    husband: {
      id: 'gg1',
      name: 'William',
      surname: 'Smith',
      relation: 'Great-Grandfather',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isAlive: false,
      birthYear: '1920',
    },
    wife: {
      id: 'gg2',
      name: 'Elizabeth',
      surname: 'Smith',
      relation: 'Great-Grandmother',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isAlive: false,
      birthYear: '1922',
    },
  },

  // Generation 0: Great-Grandparents (Mother's Side)
  greatGrandparentsMotherSide: {
    husband: {
      id: 'gg3',
      name: 'Charles',
      surname: 'Johnson',
      relation: 'Great-Grandfather',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isAlive: false,
      birthYear: '1918',
    },
    wife: {
      id: 'gg4',
      name: 'Rose',
      surname: 'Johnson',
      relation: 'Great-Grandmother',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isAlive: false,
      birthYear: '1921',
    },
  },

  // Generation 1: Grandparents (Father's Side)
  grandparentsFatherSide: {
    husband: {
      id: '1',
      name: 'John',
      surname: 'Smith',
      relation: 'Grandfather',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isAlive: false,
      birthYear: '1945',
    },
    wife: {
      id: '2',
      name: 'Mary',
      surname: 'Davis',
      relation: 'Grandmother',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1948',
      email: 'mary@example.com',
    },
  },

  // Generation 1: Grandparents (Mother's Side)
  grandparentsMotherSide: {
    husband: {
      id: 'gp3',
      name: 'Richard',
      surname: 'Johnson',
      relation: 'Grandfather',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isAlive: false,
      birthYear: '1943',
    },
    wife: {
      id: 'gp4',
      name: 'Patricia',
      surname: 'Johnson',
      relation: 'Grandmother',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1946',
      email: 'patricia@example.com',
      phone: '+1 555-0130',
    },
  },
  
  // Generation 2: Parents
  parents: {
    father: {
      id: '3',
      name: 'Robert',
      surname: 'Smith',
      relation: 'Father',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1970',
      email: 'robert@example.com',
      phone: '+1 555-0123',
    },
    mother: {
      id: '4',
      name: 'Sarah',
      surname: 'Johnson',
      relation: 'Mother',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1972',
      email: 'sarah@example.com',
      phone: '+1 555-0124',
    },
    unclesAunts: [
      {
        id: '8',
        name: 'James',
        surname: 'Smith',
        relation: 'Uncle (Paternal)',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        isAlive: true,
        birthYear: '1973',
        email: 'james@example.com',
      },
      {
        id: '10',
        name: 'Linda',
        surname: 'Thompson',
        relation: 'Aunt (Paternal)',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isAlive: true,
        birthYear: '1975',
      },
      {
        id: '11',
        name: 'Tom',
        surname: 'Johnson',
        relation: 'Uncle (Maternal)',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isAlive: true,
        birthYear: '1969',
        email: 'tom@example.com',
      },
      {
        id: '12',
        name: 'Jennifer',
        surname: 'Martinez',
        relation: 'Aunt (Maternal)',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        isAlive: true,
        birthYear: '1974',
      },
    ],
  },
  
  // Step-Parents (if applicable)
  stepParents: [
    {
      id: 'sp1',
      name: 'Mark',
      surname: 'Wilson',
      relation: 'Step-Father',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1968',
    },
  ],

  // Generation 3: You & Siblings
  children: [
    {
      id: '5',
      name: 'Michael',
      surname: 'Smith',
      relation: 'You',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1995',
      email: 'michael@example.com',
      phone: '+1 555-0125',
    },
    {
      id: '6',
      name: 'Emma',
      surname: 'Smith',
      relation: 'Sister',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1997',
      email: 'emma@example.com',
      phone: '+1 555-0126',
    },
    {
      id: '7',
      name: 'David',
      surname: 'Smith',
      relation: 'Brother',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1999',
      email: 'david@example.com',
      phone: '+1 555-0127',
    },
  ],

  // Half-Siblings
  halfSiblings: [
    {
      id: 'hs1',
      name: 'Sophie',
      surname: 'Wilson',
      relation: 'Half-Sister',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '2005',
    },
  ],

  // Step-Siblings
  stepSiblings: [
    {
      id: 'ss1',
      name: 'Tyler',
      surname: 'Wilson',
      relation: 'Step-Brother',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '2003',
    },
  ],
  
  // Cousins
  cousins: [
    {
      id: '9',
      name: 'Olivia',
      surname: 'Smith',
      relation: 'Cousin (James\'s Daughter)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '2000',
    },
    {
      id: 'c2',
      name: 'Noah',
      surname: 'Thompson',
      relation: 'Cousin (Linda\'s Son)',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '2001',
    },
    {
      id: 'c3',
      name: 'Sophia',
      surname: 'Johnson',
      relation: 'Cousin (Tom\'s Daughter)',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1998',
    },
    {
      id: 'c4',
      name: 'Lucas',
      surname: 'Martinez',
      relation: 'Cousin (Jennifer\'s Son)',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '2002',
    },
  ],

  // Nieces & Nephews (Your siblings' children)
  niecesNephews: [
    {
      id: 'nn1',
      name: 'Lily',
      surname: 'Smith',
      relation: 'Niece (Emma\'s Daughter)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '2020',
    },
    {
      id: 'nn2',
      name: 'Jack',
      surname: 'Smith',
      relation: 'Nephew (David\'s Son)',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '2022',
    },
  ],

  // In-Laws (Spouses of siblings)
  inLaws: [
    {
      id: 'il1',
      name: 'Alex',
      surname: 'Brown',
      relation: 'Brother-in-Law (Emma\'s Husband)',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1996',
    },
    {
      id: 'il2',
      name: 'Jessica',
      surname: 'Smith',
      relation: 'Sister-in-Law (David\'s Wife)',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isAlive: true,
      birthYear: '1998',
    },
  ],
};

const FamilyScreen: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { colors: themeColors } = useTheme();
  
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showGreatGrandparents, setShowGreatGrandparents] = useState(false);
  const [showGrandparents, setShowGrandparents] = useState(true);
  const [showParents, setShowParents] = useState(true);
  const [showYourGeneration, setShowYourGeneration] = useState(false);
  const [showUnclesAunts, setShowUnclesAunts] = useState(false);
  const [showStepParents, setShowStepParents] = useState(false);
  const [showCousins, setShowCousins] = useState(false);
  const [showHalfSiblings, setShowHalfSiblings] = useState(false);
  const [showStepSiblings, setShowStepSiblings] = useState(false);
  const [showInLaws, setShowInLaws] = useState(false);
  const [showNiecesNephews, setShowNiecesNephews] = useState(false);

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleMemberPress = (member: any) => {
    setSelectedMember(member);
  };

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}` 
    : 'LS';

  const styles = createStyles(themeColors);

  // Render single member
  const renderMember = (member: any) => (
    <View key={member.id} style={styles.memberContainer}>
      <TouchableOpacity
        onPress={() => handleMemberPress(member)}
        activeOpacity={0.7}
      >
        <View style={styles.circularPhotoContainer}>
          {member.photo ? (
            <Image source={{ uri: member.photo }} style={styles.circularPhoto} />
          ) : (
            <View style={styles.circularPhotoPlaceholder}>
              <Ionicons name="person" size={32} color="#9E9E9E" />
            </View>
          )}
          {!member.isAlive && (
            <View style={styles.deceasedBadge}>
              <Ionicons name="heart" size={8} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={[styles.memberName, { color: themeColors.text }]} numberOfLines={1}>
          {member.name}
        </Text>
        <Text style={[styles.memberSurname, { color: themeColors.text }]} numberOfLines={1}>
          {member.surname}
        </Text>
        <Text style={[styles.memberRelation, { color: themeColors.textSecondary }]} numberOfLines={1}>
          {member.relation}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Render couple side by side
  const renderCouple = (husband: any, wife: any) => (
    <View style={styles.coupleContainer}>
      {renderMember(husband)}
      <View style={styles.heartConnector}>
        <Ionicons name="heart" size={16} color="#FF6B9D" />
      </View>
      {renderMember(wife)}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <HomeHeader 
          onProfilePress={handleProfilePress} 
          userInitials={userInitials}
        />
        
        {/* Family Tree Content */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Tree Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.headerTitle, { color: themeColors.text }]}>
                Family Tree
              </Text>
              <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
                Tap to expand and explore family branches
            </Text>
            </View>
          </View>

          {/* Hierarchical Tree */}
          <View style={styles.treeContainer}>
            {/* Great-Grandparents Toggle */}
            <View style={styles.sideSection}>
              <TouchableOpacity
                onPress={() => setShowGreatGrandparents(!showGreatGrandparents)}
                style={styles.sideSectionButton}
              >
                <Text style={styles.sideSectionLabel}>
                  {showGreatGrandparents ? '▼' : '▶'} Great-Grandparents (4)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Great-Grandparents */}
            {showGreatGrandparents && (
              <View style={styles.generationSection}>
                <Text style={styles.generationLabel}>Father's Side</Text>
                {renderCouple(familyTreeData.greatGrandparentsFatherSide.husband, familyTreeData.greatGrandparentsFatherSide.wife)}
                <Text style={[styles.generationLabel, { marginTop: spacing.lg }]}>Mother's Side</Text>
                {renderCouple(familyTreeData.greatGrandparentsMotherSide.husband, familyTreeData.greatGrandparentsMotherSide.wife)}
              </View>
            )}

            {/* Generation 1: Grandparents */}
            <View style={styles.generationSection}>
              <Text style={styles.generationLabel}>Grandparents</Text>
              <Text style={styles.sideLabel}>Father's Side</Text>
              {renderCouple(familyTreeData.grandparentsFatherSide.husband, familyTreeData.grandparentsFatherSide.wife)}
              <Text style={[styles.sideLabel, { marginTop: spacing.lg }]}>Mother's Side</Text>
              {renderCouple(familyTreeData.grandparentsMotherSide.husband, familyTreeData.grandparentsMotherSide.wife)}
              <TouchableOpacity
                onPress={() => setShowParents(!showParents)}
                style={styles.expandButton}
              >
                <Ionicons 
                  name={showParents ? "chevron-down" : "chevron-forward"} 
                  size={20} 
                  color="#4A90E2" 
                />
              </TouchableOpacity>
            </View>

            {/* Generation 2: Parents */}
            {showParents && (
              <View style={styles.generationSection}>
                <Text style={styles.generationLabel}>Parents</Text>
                {renderCouple(familyTreeData.parents.father, familyTreeData.parents.mother)}
                <TouchableOpacity
                  onPress={() => setShowYourGeneration(!showYourGeneration)}
                  style={styles.expandButton}
                >
                  <Ionicons 
                    name={showYourGeneration ? "chevron-down" : "chevron-forward"} 
                    size={20} 
                    color="#4A90E2" 
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Uncles & Aunts Toggle */}
            {showParents && (
              <View style={styles.sideSection}>
                <TouchableOpacity
                  onPress={() => setShowUnclesAunts(!showUnclesAunts)}
                  style={styles.sideSectionButton}
                >
                  <Text style={styles.sideSectionLabel}>
                    {showUnclesAunts ? '▼' : '▶'} Uncles & Aunts ({familyTreeData.parents.unclesAunts.length})
                  </Text>
                </TouchableOpacity>
                {showUnclesAunts && (
                  <View style={styles.childRow}>
                    {familyTreeData.parents.unclesAunts.map((person: any) => renderMember(person))}
                  </View>
                )}
              </View>
            )}

            {/* Step-Parents Toggle */}
            {showParents && (
              <View style={styles.sideSection}>
                <TouchableOpacity
                  onPress={() => setShowStepParents(!showStepParents)}
                  style={styles.sideSectionButton}
                >
                  <Text style={styles.sideSectionLabel}>
                    {showStepParents ? '▼' : '▶'} Step-Parents ({familyTreeData.stepParents.length})
                  </Text>
                </TouchableOpacity>
                {showStepParents && (
                  <View style={styles.childRow}>
                    {familyTreeData.stepParents.map((person: any) => renderMember(person))}
                  </View>
                )}
              </View>
            )}

            {/* Generation 3: Your Generation */}
            {showYourGeneration && (
              <View style={styles.generationSection}>
                <Text style={styles.generationLabel}>Your Generation</Text>
                <View style={styles.childRow}>
                  {familyTreeData.children.map((child: any) => renderMember(child))}
                </View>
              </View>
            )}

            {/* Half-Siblings Toggle */}
            {showYourGeneration && (
              <View style={styles.sideSection}>
                <TouchableOpacity
                  onPress={() => setShowHalfSiblings(!showHalfSiblings)}
                  style={styles.sideSectionButton}
                >
                  <Text style={styles.sideSectionLabel}>
                    {showHalfSiblings ? '▼' : '▶'} Half-Siblings ({familyTreeData.halfSiblings.length})
                  </Text>
                </TouchableOpacity>
                {showHalfSiblings && (
                  <View style={styles.childRow}>
                    {familyTreeData.halfSiblings.map((person: any) => renderMember(person))}
                  </View>
                )}
              </View>
            )}

            {/* Step-Siblings Toggle */}
            {showYourGeneration && (
              <View style={styles.sideSection}>
                <TouchableOpacity
                  onPress={() => setShowStepSiblings(!showStepSiblings)}
                  style={styles.sideSectionButton}
                >
                  <Text style={styles.sideSectionLabel}>
                    {showStepSiblings ? '▼' : '▶'} Step-Siblings ({familyTreeData.stepSiblings.length})
                  </Text>
                </TouchableOpacity>
                {showStepSiblings && (
                  <View style={styles.childRow}>
                    {familyTreeData.stepSiblings.map((person: any) => renderMember(person))}
                  </View>
                )}
              </View>
            )}

            {/* Cousins Toggle */}
            {showYourGeneration && (
              <View style={styles.sideSection}>
                <TouchableOpacity
                  onPress={() => setShowCousins(!showCousins)}
                  style={styles.sideSectionButton}
                >
                  <Text style={styles.sideSectionLabel}>
                    {showCousins ? '▼' : '▶'} Cousins ({familyTreeData.cousins.length})
                  </Text>
                </TouchableOpacity>
                {showCousins && (
                  <View style={styles.childRow}>
                    {familyTreeData.cousins.map((cousin: any) => renderMember(cousin))}
                  </View>
                )}
              </View>
            )}

            {/* In-Laws Toggle */}
            {showYourGeneration && (
              <View style={styles.sideSection}>
                <TouchableOpacity
                  onPress={() => setShowInLaws(!showInLaws)}
                  style={styles.sideSectionButton}
                >
                  <Text style={styles.sideSectionLabel}>
                    {showInLaws ? '▼' : '▶'} In-Laws ({familyTreeData.inLaws.length})
                  </Text>
                </TouchableOpacity>
                {showInLaws && (
                  <View style={styles.childRow}>
                    {familyTreeData.inLaws.map((person: any) => renderMember(person))}
                  </View>
                )}
              </View>
            )}

            {/* Nieces & Nephews Toggle */}
            {showYourGeneration && (
              <View style={styles.sideSection}>
                <TouchableOpacity
                  onPress={() => setShowNiecesNephews(!showNiecesNephews)}
                  style={styles.sideSectionButton}
                >
                  <Text style={styles.sideSectionLabel}>
                    {showNiecesNephews ? '▼' : '▶'} Nieces & Nephews ({familyTreeData.niecesNephews.length})
                  </Text>
                </TouchableOpacity>
                {showNiecesNephews && (
                  <View style={styles.childRow}>
                    {familyTreeData.niecesNephews.map((person: any) => renderMember(person))}
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Selected Member Modal */}
        {selectedMember && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              style={styles.modalBackground}
              activeOpacity={1}
              onPress={() => setSelectedMember(null)}
            />
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.modalClose}
                onPress={() => setSelectedMember(null)}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              
              <View style={styles.modalHeader}>
                <Image source={{ uri: selectedMember.photo }} style={styles.modalPhoto} />
                <View style={styles.modalInfo}>
                  <Text style={styles.modalName}>{selectedMember.name}</Text>
                  <Text style={styles.modalRelation}>{selectedMember.relation}</Text>
                  <View style={styles.modalStatus}>
                    <View style={[
                      styles.modalStatusDot,
                      { backgroundColor: selectedMember.isAlive ? '#4CAF50' : '#9E9E9E' }
                    ]} />
                    <Text style={styles.modalStatusText}>
                      {selectedMember.isAlive ? 'Living' : 'Deceased'}
                    </Text>
                  </View>
                </View>
              </View>

              {selectedMember.birthYear && (
                <View style={styles.modalDetail}>
                  <Ionicons name="calendar-outline" size={20} color="#4A90E2" />
                  <Text style={styles.modalDetailText}>Born in {selectedMember.birthYear}</Text>
                </View>
              )}

              {selectedMember.email && (
                <View style={styles.modalDetail}>
                  <Ionicons name="mail-outline" size={20} color="#4A90E2" />
                  <Text style={styles.modalDetailText}>{selectedMember.email}</Text>
                </View>
              )}

              {selectedMember.phone && (
                <View style={styles.modalDetail}>
                  <Ionicons name="call-outline" size={20} color="#4A90E2" />
                  <Text style={styles.modalDetailText}>{selectedMember.phone}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  // Header
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  // Tree Container
  treeContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  generationSection: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  generationLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: '#1A1A1A',
    marginBottom: spacing.lg,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sideSection: {
    marginVertical: spacing.lg,
    alignItems: 'center',
    width: '100%',
  },
  sideSectionButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: '#E8EAED',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sideSectionLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: '#4A90E2',
  },
  sideLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: '#757575',
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  coupleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heartConnector: {
    marginHorizontal: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE4EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFB6C1',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  coupleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberContainer: {
    alignItems: 'center',
    width: 110,
  },
  circularCard: {
    marginBottom: spacing.md,
  },
  circularPhotoContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  circularPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  circularPhotoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  expandButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: '#90CAF9',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  childrenContainer: {
    marginTop: spacing.lg,
    alignItems: 'center',
    width: '100%',
  },
  childRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  deceasedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#757575',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  memberName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: '#1A1A1A',
    textAlign: 'center',
    maxWidth: 90,
    lineHeight: 18,
    marginBottom: 2,
  },
  memberSurname: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: '#4A90E2',
    marginBottom: spacing.xs,
    textAlign: 'center',
    maxWidth: 90,
    lineHeight: 16,
  },
  memberRelation: {
    fontSize: typography.sizes.xs,
    color: '#757575',
    fontWeight: typography.weights.medium,
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: spacing.xs,
  },
  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    maxWidth: 400,
    width: '85%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  modalClose: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: spacing.xs,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingRight: spacing.xl,
  },
  modalPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.lg,
    borderWidth: 3,
    borderColor: '#E8EAED',
  },
  modalInfo: {
    flex: 1,
  },
  modalName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
    color: '#1A1A1A',
    lineHeight: 28,
  },
  modalRelation: {
    fontSize: typography.sizes.md,
    color: '#4A90E2',
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
  },
  modalStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  modalStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  modalStatusText: {
    fontSize: typography.sizes.xs,
    color: '#757575',
    fontWeight: typography.weights.semibold,
  },
  modalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: spacing.xs,
  },
  modalDetailText: {
    fontSize: typography.sizes.sm,
    color: '#1A1A1A',
    marginLeft: spacing.md,
    flex: 1,
  },
});

export default FamilyScreen;