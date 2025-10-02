/**
 * Family Data Adapter - Backend Data Transformation
 * 
 * Transforms any backend data structure into the standardized format
 * used by our dynamic family tree components
 */

// Backend data interfaces (adapt these to match your actual backend structure)
interface BackendPerson {
  id: string;
  firstName: string;
  lastName?: string;
  fullName?: string;
  relationship: string;
  profilePicture?: string;
  isDeceased: boolean;
  dateOfBirth?: string;
  dateOfDeath?: string;
  contactEmail?: string;
  contactPhone?: string;
  // Add any other fields your backend provides
  [key: string]: any;
}

interface BackendFamilyData {
  greatGrandparents?: {
    paternal?: BackendPerson[];
    maternal?: BackendPerson[];
  };
  grandparents?: {
    paternal?: BackendPerson[];
    maternal?: BackendPerson[];
  };
  parents?: BackendPerson[];
  siblings?: BackendPerson[];
  cousins?: BackendPerson[];
  unclesAunts?: BackendPerson[];
  niecesNephews?: BackendPerson[];
  inLaws?: BackendPerson[];
  // Add any other family sections your backend provides
  [key: string]: any;
}

// Standardized interfaces for our components
interface StandardizedPerson {
  id: string;
  name: string;
  surname?: string;
  relation: string;
  photo?: string;
  isAlive: boolean;
  birthYear?: string;
  deathYear?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

interface StandardizedFamilyData {
  generations: Array<{
    id: string;
    title: string;
    couples?: Array<{ person1: StandardizedPerson; person2: StandardizedPerson }>;
    individuals?: StandardizedPerson[];
    isExpandable?: boolean;
    defaultExpanded?: boolean;
  }>;
  sideSections?: Array<{
    id: string;
    title: string;
    individuals: StandardizedPerson[];
    isExpandable?: boolean;
    defaultExpanded?: boolean;
  }>;
}

/**
 * Transform backend person data to standardized format
 */
const transformPerson = (backendPerson: BackendPerson): StandardizedPerson => {
  // Extract name - handle different backend formats
  const name = backendPerson.fullName || backendPerson.firstName || 'Unknown';
  const surname = backendPerson.lastName || undefined;
  
  // Extract birth/death years from dates
  const birthYear = backendPerson.dateOfBirth ? 
    new Date(backendPerson.dateOfBirth).getFullYear().toString() : undefined;
  const deathYear = backendPerson.dateOfDeath ? 
    new Date(backendPerson.dateOfDeath).getFullYear().toString() : undefined;

  return {
    id: backendPerson.id,
    name,
    surname,
    relation: backendPerson.relationship,
    photo: backendPerson.profilePicture,
    isAlive: !backendPerson.isDeceased,
    birthYear,
    deathYear,
    email: backendPerson.contactEmail,
    phone: backendPerson.contactPhone,
    // Pass through any additional fields
    ...Object.fromEntries(
      Object.entries(backendPerson).filter(([key]) => 
        !['id', 'firstName', 'lastName', 'fullName', 'relationship', 'profilePicture', 
          'isDeceased', 'dateOfBirth', 'dateOfDeath', 'contactEmail', 'contactPhone'].includes(key)
      )
    ),
  };
};

/**
 * Create couples from array of people (assumes adjacent people are couples)
 */
const createCouples = (people: BackendPerson[]): Array<{ person1: StandardizedPerson; person2: StandardizedPerson }> => {
  const couples = [];
  for (let i = 0; i < people.length; i += 2) {
    if (i + 1 < people.length) {
      couples.push({
        person1: transformPerson(people[i]),
        person2: transformPerson(people[i + 1]),
      });
    } else {
      // Handle odd number of people - single person
      couples.push({
        person1: transformPerson(people[i]),
        person2: transformPerson(people[i]), // Same person for single display
      });
    }
  }
  return couples;
};

/**
 * Transform backend family data to standardized format
 */
export const transformFamilyData = (backendData: BackendFamilyData): StandardizedFamilyData => {
  const generations = [];
  const sideSections = [];

  // Great-Grandparents (Oldest Generation) - Start from history
  if (backendData.greatGrandparents) {
    const greatGrandparentsCouples = [];
    
    if (backendData.greatGrandparents.paternal?.length) {
      greatGrandparentsCouples.push(...createCouples(backendData.greatGrandparents.paternal));
    }
    if (backendData.greatGrandparents.maternal?.length) {
      greatGrandparentsCouples.push(...createCouples(backendData.greatGrandparents.maternal));
    }

    if (greatGrandparentsCouples.length > 0) {
      generations.push({
        id: 'great-grandparents',
        title: 'Great-Grandparents',
        couples: greatGrandparentsCouples,
        isExpandable: true,
        defaultExpanded: false,
      });
    }
  }

  // Grandparents (Next Generation)
  if (backendData.grandparents) {
    const grandparentsCouples = [];
    
    if (backendData.grandparents.paternal?.length) {
      grandparentsCouples.push(...createCouples(backendData.grandparents.paternal));
    }
    if (backendData.grandparents.maternal?.length) {
      grandparentsCouples.push(...createCouples(backendData.grandparents.maternal));
    }

    if (grandparentsCouples.length > 0) {
      generations.push({
        id: 'grandparents',
        title: 'Grandparents',
        couples: grandparentsCouples,
        isExpandable: true,
        defaultExpanded: false,
      });
    }
  }

  // Parents (Next Generation)
  if (backendData.parents?.length) {
    const parentCouples = createCouples(backendData.parents);
    generations.push({
      id: 'parents',
      title: 'Parents',
      couples: parentCouples,
      isExpandable: true,
      defaultExpanded: false,
    });
  }

  // Your Generation (Current Generation) - Default expanded and centered
  if (backendData.siblings?.length) {
    generations.push({
      id: 'siblings',
      title: 'Your Generation',
      individuals: backendData.siblings.map(transformPerson),
      isExpandable: true,
      defaultExpanded: true, // Keep this expanded by default
    });
  }

  // Side Sections
  if (backendData.unclesAunts?.length) {
    sideSections.push({
      id: 'uncles-aunts',
      title: 'Uncles & Aunts',
      individuals: backendData.unclesAunts.map(transformPerson),
      isExpandable: true,
      defaultExpanded: false,
    });
  }

  if (backendData.cousins?.length) {
    sideSections.push({
      id: 'cousins',
      title: 'Cousins',
      individuals: backendData.cousins.map(transformPerson),
      isExpandable: true,
      defaultExpanded: false,
    });
  }

  if (backendData.niecesNephews?.length) {
    sideSections.push({
      id: 'nieces-nephews',
      title: 'Nieces & Nephews',
      individuals: backendData.niecesNephews.map(transformPerson),
      isExpandable: true,
      defaultExpanded: false,
    });
  }

  if (backendData.inLaws?.length) {
    sideSections.push({
      id: 'in-laws',
      title: 'In-Laws',
      individuals: backendData.inLaws.map(transformPerson),
      isExpandable: true,
      defaultExpanded: false,
    });
  }

  return {
    generations,
    sideSections,
  };
};

/**
 * Example usage with mock data transformation
 */
export const createMockFamilyData = (): StandardizedFamilyData => {
  // Import mock data
  const { mockBackendFamilyData } = require('../data/mockFamilyData');
  
  return transformFamilyData(mockBackendFamilyData);
};
