# 📁 LegacyKeep Mobile Project Structure

## 🏗️ Recommended Project Architecture

```
legacykeep-frontend/
├── 📱 LegacyKeepMobile/                 # Main React Native project
│   ├── 📁 src/
│   │   ├── 📁 components/              # Reusable UI components
│   │   │   ├── 📁 atoms/               # Basic building blocks
│   │   │   │   ├── 📁 Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 Input/
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Input.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 Text/
│   │   │   │   │   ├── Text.tsx
│   │   │   │   │   ├── Text.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   ├── 📁 molecules/           # Component combinations
│   │   │   │   ├── 📁 FormField/
│   │   │   │   │   ├── FormField.tsx
│   │   │   │   │   ├── FormField.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 Card/
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── Card.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 ListItem/
│   │   │   │   │   ├── ListItem.tsx
│   │   │   │   │   ├── ListItem.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   ├── 📁 organisms/           # Complex components
│   │   │   │   ├── 📁 Header/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Header.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 StoryCard/
│   │   │   │   │   ├── StoryCard.tsx
│   │   │   │   │   ├── StoryCard.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 FamilyMemberCard/
│   │   │   │   │   ├── FamilyMemberCard.tsx
│   │   │   │   │   ├── FamilyMemberCard.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 ChatBubble/
│   │   │   │   │   ├── ChatBubble.tsx
│   │   │   │   │   ├── ChatBubble.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   └── 📁 index.ts
│   │   ├── 📁 screens/                 # Screen components
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📁 LoginScreen/
│   │   │   │   │   ├── LoginScreen.tsx
│   │   │   │   │   ├── LoginScreen.test.tsx
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 RegisterScreen/
│   │   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   │   ├── RegisterScreen.test.tsx
│   │   │   │   │   ├── RegisterForm.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 ForgotPasswordScreen/
│   │   │   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   │   │   ├── ForgotPasswordScreen.test.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   ├── 📁 home/
│   │   │   │   ├── 📁 HomeScreen/
│   │   │   │   │   ├── HomeScreen.tsx
│   │   │   │   │   ├── HomeScreen.test.tsx
│   │   │   │   │   ├── Dashboard.tsx
│   │   │   │   │   ├── QuickActions.tsx
│   │   │   │   │   ├── RecentActivity.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   ├── 📁 family/
│   │   │   │   ├── 📁 FamilyTreeScreen/
│   │   │   │   │   ├── FamilyTreeScreen.tsx
│   │   │   │   │   ├── FamilyTreeScreen.test.tsx
│   │   │   │   │   ├── FamilyTree.tsx
│   │   │   │   │   ├── FamilyMember.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 FamilyMemberScreen/
│   │   │   │   │   ├── FamilyMemberScreen.tsx
│   │   │   │   │   ├── FamilyMemberScreen.test.tsx
│   │   │   │   │   ├── MemberProfile.tsx
│   │   │   │   │   ├── MemberStories.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   ├── 📁 stories/
│   │   │   │   ├── 📁 StoriesScreen/
│   │   │   │   │   ├── StoriesScreen.tsx
│   │   │   │   │   ├── StoriesScreen.test.tsx
│   │   │   │   │   ├── StoryList.tsx
│   │   │   │   │   ├── StoryCard.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 CreateStoryScreen/
│   │   │   │   │   ├── CreateStoryScreen.tsx
│   │   │   │   │   ├── CreateStoryScreen.test.tsx
│   │   │   │   │   ├── StoryForm.tsx
│   │   │   │   │   ├── MediaUpload.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   ├── 📁 chat/
│   │   │   │   ├── 📁 ChatListScreen/
│   │   │   │   │   ├── ChatListScreen.tsx
│   │   │   │   │   ├── ChatListScreen.test.tsx
│   │   │   │   │   ├── ChatRoomList.tsx
│   │   │   │   │   ├── ChatRoomItem.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 ChatScreen/
│   │   │   │   │   ├── ChatScreen.tsx
│   │   │   │   │   ├── ChatScreen.test.tsx
│   │   │   │   │   ├── MessageList.tsx
│   │   │   │   │   ├── MessageInput.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   ├── 📁 profile/
│   │   │   │   ├── 📁 ProfileScreen/
│   │   │   │   │   ├── ProfileScreen.tsx
│   │   │   │   │   ├── ProfileScreen.test.tsx
│   │   │   │   │   ├── ProfileHeader.tsx
│   │   │   │   │   ├── ProfileDetails.tsx
│   │   │   │   │   ├── ProfileSettings.tsx
│   │   │   │   │   ├── styles.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   └── 📁 index.ts
│   │   ├── 📁 navigation/              # Navigation configuration
│   │   │   ├── 📁 AuthNavigator/
│   │   │   │   ├── AuthNavigator.tsx
│   │   │   │   ├── AuthNavigator.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── 📁 AppNavigator/
│   │   │   │   ├── AppNavigator.tsx
│   │   │   │   ├── AppNavigator.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── 📁 TabNavigator/
│   │   │   │   ├── TabNavigator.tsx
│   │   │   │   ├── TabNavigator.test.tsx
│   │   │   │   └── index.ts
│   │   │   └── 📁 index.ts
│   │   ├── 📁 store/                   # Redux store configuration
│   │   │   ├── 📁 slices/
│   │   │   │   ├── 📁 authSlice/
│   │   │   │   │   ├── authSlice.ts
│   │   │   │   │   ├── authSlice.test.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 userSlice/
│   │   │   │   │   ├── userSlice.ts
│   │   │   │   │   ├── userSlice.test.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 chatSlice/
│   │   │   │   │   ├── chatSlice.ts
│   │   │   │   │   ├── chatSlice.test.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── 📁 index.ts
│   │   │   ├── 📁 middleware/
│   │   │   │   ├── authMiddleware.ts
│   │   │   │   ├── errorMiddleware.ts
│   │   │   │   └── index.ts
│   │   │   ├── store.ts
│   │   │   └── index.ts
│   │   ├── 📁 services/                # API services
│   │   │   ├── 📁 api/
│   │   │   │   ├── BaseApiService.ts
│   │   │   │   ├── AuthService.ts
│   │   │   │   ├── UserService.ts
│   │   │   │   ├── ChatService.ts
│   │   │   │   └── index.ts
│   │   │   ├── 📁 storage/
│   │   │   │   ├── SecureStorage.ts
│   │   │   │   ├── AsyncStorage.ts
│   │   │   │   └── index.ts
│   │   │   ├── 📁 websocket/
│   │   │   │   ├── WebSocketService.ts
│   │   │   │   ├── ChatWebSocket.ts
│   │   │   │   └── index.ts
│   │   │   ├── 📁 third-party/
│   │   │   │   ├── FirebaseAuthService.ts
│   │   │   │   ├── PushNotificationService.ts
│   │   │   │   ├── AnalyticsService.ts
│   │   │   │   ├── S3Service.ts
│   │   │   │   ├── MediaUploadService.ts
│   │   │   │   ├── StripeService.ts
│   │   │   │   ├── MapsService.ts
│   │   │   │   └── index.ts
│   │   │   └── 📁 index.ts
│   │   ├── 📁 hooks/                   # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useApi.ts
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useKeyboard.ts
│   │   │   ├── usePermissions.ts
│   │   │   └── index.ts
│   │   ├── 📁 utils/                   # Utility functions
│   │   │   ├── validation.ts
│   │   │   ├── formatting.ts
│   │   │   ├── dateUtils.ts
│   │   │   ├── imageUtils.ts
│   │   │   ├── constants.ts
│   │   │   └── index.ts
│   │   ├── 📁 types/                   # TypeScript type definitions
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   ├── chat.ts
│   │   │   ├── navigation.ts
│   │   │   └── index.ts
│   │   ├── 📁 constants/               # App constants
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── dimensions.ts
│   │   │   └── index.ts
│   │   ├── 📁 assets/                  # Static assets
│   │   │   ├── 📁 images/
│   │   │   │   ├── 📁 icons/
│   │   │   │   │   ├── home.png
│   │   │   │   │   ├── family.png
│   │   │   │   │   ├── stories.png
│   │   │   │   │   ├── chat.png
│   │   │   │   │   └── profile.png
│   │   │   │   ├── 📁 illustrations/
│   │   │   │   │   ├── empty-state.png
│   │   │   │   │   ├── onboarding-1.png
│   │   │   │   │   ├── onboarding-2.png
│   │   │   │   │   └── onboarding-3.png
│   │   │   │   └── 📁 backgrounds/
│   │   │   │       ├── gradient-bg.png
│   │   │   │       └── pattern-bg.png
│   │   │   ├── 📁 fonts/
│   │   │   │   ├── Inter-Regular.ttf
│   │   │   │   ├── Inter-Medium.ttf
│   │   │   │   ├── Inter-SemiBold.ttf
│   │   │   │   └── Inter-Bold.ttf
│   │   │   └── 📁 animations/
│   │   │       ├── loading.json
│   │   │       ├── success.json
│   │   │       └── error.json
│   │   ├── 📁 styles/                  # Global styles
│   │   │   ├── globalStyles.ts
│   │   │   ├── theme.ts
│   │   │   └── index.ts
│   │   ├── 📁 __tests__/               # Test files
│   │   │   ├── 📁 components/
│   │   │   ├── 📁 screens/
│   │   │   ├── 📁 services/
│   │   │   ├── 📁 utils/
│   │   │   └── 📁 __mocks__/
│   │   ├── App.tsx                     # Main app component
│   │   ├── App.test.tsx               # App tests
│   │   └── index.ts                   # Entry point
│   ├── 📁 android/                    # Android-specific files
│   │   ├── 📁 app/
│   │   │   ├── src/
│   │   │   └── build.gradle
│   │   ├── build.gradle
│   │   ├── gradle.properties
│   │   └── settings.gradle
│   ├── 📁 ios/                        # iOS-specific files
│   │   ├── 📁 LegacyKeepMobile/
│   │   │   ├── Info.plist
│   │   │   └── AppDelegate.mm
│   │   ├── 📁 LegacyKeepMobile.xcodeproj/
│   │   └── Podfile
│   ├── 📁 __tests__/                  # Root-level tests
│   ├── 📁 .expo/                      # Expo configuration
│   ├── 📁 node_modules/               # Dependencies
│   ├── .env                           # Environment variables
│   ├── .env.example                   # Environment variables template
│   ├── .gitignore                     # Git ignore rules
│   ├── .eslintrc.js                   # ESLint configuration
│   ├── .prettierrc                    # Prettier configuration
│   ├── app.json                       # Expo app configuration
│   ├── babel.config.js                # Babel configuration
│   ├── jest.config.js                 # Jest configuration
│   ├── metro.config.js                # Metro bundler configuration
│   ├── package.json                   # Dependencies and scripts
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── README.md                      # Project documentation
│   └── yarn.lock                      # Dependency lock file
├── 📁 docs/                           # Project documentation
│   ├── DEVELOPMENT_RULES.md           # Development guidelines
│   ├── API_INTEGRATION_GUIDE.md       # API integration guide
│   ├── THIRD_PARTY_INTEGRATIONS.md    # Third-party service integrations
│   ├── ENVIRONMENT_CONFIGURATION.md   # Environment configuration guide
│   ├── UI_STRUCTURE_PLAN.md           # Comprehensive UI architecture plan
│   ├── PROJECT_STRUCTURE.md           # This file
│   ├── DEPLOYMENT_GUIDE.md            # Deployment instructions
│   └── CONTRIBUTING.md                # Contribution guidelines
├── 📁 scripts/                        # Build and deployment scripts
│   ├── build.sh                       # Build script
│   ├── deploy.sh                      # Deployment script
│   └── test.sh                        # Test script
└── README.md                          # Root project documentation
```

## 🎯 Key Architectural Principles

### 1. **Atomic Design Pattern**
- **Atoms**: Basic building blocks (Button, Input, Text)
- **Molecules**: Simple combinations (FormField, Card, ListItem)
- **Organisms**: Complex components (Header, StoryCard, FamilyMemberCard)
- **Templates**: Page layouts
- **Pages**: Complete screens

### 2. **Feature-Based Organization**
- Each feature has its own directory
- Related components are grouped together
- Clear separation of concerns

### 3. **Scalable Structure**
- Easy to add new features
- Consistent naming conventions
- Clear import paths

### 4. **Test-Driven Development**
- Tests co-located with components
- Comprehensive test coverage
- Mock services for testing

## 📱 Component Organization Rules

### 1. **Component Directory Structure**
```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.test.tsx     # Component tests
├── ComponentName.stories.tsx  # Storybook stories (optional)
├── styles.ts                  # Component-specific styles
├── types.ts                   # Component-specific types (if needed)
└── index.ts                   # Export file
```

### 2. **Screen Directory Structure**
```
ScreenName/
├── ScreenName.tsx             # Main screen
├── ScreenName.test.tsx        # Screen tests
├── components/                # Screen-specific components
│   ├── Component1.tsx
│   └── Component2.tsx
├── hooks/                     # Screen-specific hooks
│   └── useScreenLogic.ts
├── styles.ts                  # Screen-specific styles
└── index.ts                   # Export file
```

## 🔧 Configuration Files

### 1. **TypeScript Configuration**
```json
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/screens/*": ["screens/*"],
      "@/services/*": ["services/*"],
      "@/utils/*": ["utils/*"],
      "@/types/*": ["types/*"],
      "@/constants/*": ["constants/*"]
    }
  }
}
```

### 2. **Babel Configuration**
```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/services': './src/services',
            '@/utils': './src/utils',
            '@/types': './src/types',
            '@/constants': './src/constants',
          },
        },
      ],
    ],
  };
};
```

### 3. **Metro Configuration**
```javascript
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@': './src',
  '@/components': './src/components',
  '@/screens': './src/screens',
  '@/services': './src/services',
  '@/utils': './src/utils',
  '@/types': './src/types',
  '@/constants': './src/constants',
};

module.exports = config;
```

## 🧪 Testing Structure

### 1. **Test Organization**
```
__tests__/
├── components/                # Component tests
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── screens/                   # Screen tests
│   ├── auth/
│   ├── home/
│   └── family/
├── services/                  # Service tests
│   ├── api/
│   └── storage/
├── utils/                     # Utility tests
└── __mocks__/                 # Mock files
    ├── services/
    └── components/
```

### 2. **Test Naming Conventions**
- Component tests: `ComponentName.test.tsx`
- Screen tests: `ScreenName.test.tsx`
- Service tests: `serviceName.test.ts`
- Utility tests: `utilityName.test.ts`

## 📦 Package Management

### 1. **Dependencies Organization**
```json
// package.json
{
  "dependencies": {
    // React Native core
    "react": "18.2.0",
    "react-native": "0.72.0",
    
    // Navigation
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    
    // State management
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.1.0",
    
    // UI components
    "react-native-elements": "^3.4.0",
    "react-native-vector-icons": "^10.0.0",
    
    // Firebase
    "@react-native-firebase/app": "^18.0.0",
    "@react-native-firebase/auth": "^18.0.0",
    "@react-native-firebase/messaging": "^18.0.0",
    "@react-native-firebase/analytics": "^18.0.0",
    
    // AWS S3
    "aws-sdk": "^2.1400.0",
    "react-native-image-picker": "^5.0.0",
    "react-native-image-resizer": "^3.0.0",
    
    // Stripe
    "@stripe/stripe-react-native": "^0.35.0",
    
    // Google Maps
    "react-native-maps": "^1.8.0",
    "react-native-geocoding": "^0.5.0",
    
    // Utilities
    "expo": "~49.0.0",
    "expo-image": "~1.3.0",
    "expo-secure-store": "~12.3.0",
    "expo-location": "~16.0.0",
    "expo-camera": "~13.0.0",
    "expo-media-library": "~15.0.0"
  },
  "devDependencies": {
    // Testing
    "@testing-library/react-native": "^12.0.0",
    "jest": "^29.0.0",
    "jest-expo": "~49.0.0",
    
    // Linting
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    
    // Development
    "typescript": "^5.0.0",
    "@types/react": "~18.2.0",
    "@types/react-native": "~0.72.0"
  }
}
```

## 🚀 Build and Deployment

### 1. **Build Scripts**
```json
// package.json scripts
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write .",
    "build:android": "expo build:android",
    "build:ios": "expo build:ios",
    "build:web": "expo build:web"
  }
}
```

---

**This structure ensures LegacyKeep is organized, scalable, and maintainable!** 🚀✨
