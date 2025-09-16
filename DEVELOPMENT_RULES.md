# 🚀 LegacyKeep Mobile Development Rules & Principles

## 🎯 Core Development Philosophy
- **Clean Code First** - Readable, maintainable, self-documenting
- **Performance Optimized** - Fast, efficient, minimal memory usage
- **Family-Friendly** - Works on older devices, accessible to all ages
- **Scalable Architecture** - Grows with your business needs

## 📏 File Size & Code Organization Rules

### 1. File Size Limits
```typescript
// ✅ GOOD: Focused, single responsibility
// Button.tsx - 50-100 lines max
// LoginScreen.tsx - 150-200 lines max
// AuthService.ts - 100-150 lines max

// ❌ BAD: Bloated files
// AllComponents.tsx - 500+ lines
// EverythingScreen.tsx - 300+ lines
```

### 2. Component Size Rules
- **Atoms**: 20-50 lines (Button, Input, Text)
- **Molecules**: 50-100 lines (FormField, Card, ListItem)
- **Organisms**: 100-200 lines (Header, StoryCard, FamilyMemberCard)
- **Screens**: 150-300 lines (LoginScreen, HomeScreen)

### 3. Function Size Rules
- **Single Responsibility** - One function, one purpose
- **Max 20 lines** per function
- **Max 3 parameters** per function
- **Early returns** to reduce nesting

## 🏗️ Code Organization Principles

### 1. Import Organization
```typescript
// ✅ GOOD: Organized imports
// 1. React/React Native imports
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// 2. Third-party libraries
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// 3. Internal imports (absolute paths)
import { Button } from '@/components/atoms/Button';
import { colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

// 4. Relative imports (same directory)
import { styles } from './styles';
import { LoginForm } from './LoginForm';
```

### 2. Export Rules
```typescript
// ✅ GOOD: Named exports for components
export const Button: React.FC<ButtonProps> = ({ ... }) => { ... };

// ✅ GOOD: Default export for screens
const LoginScreen: React.FC = () => { ... };
export default LoginScreen;

// ✅ GOOD: Named exports for utilities
export const formatDate = (date: Date) => { ... };
export const validateEmail = (email: string) => { ... };
```

## 🧩 Component Design Rules

### 1. Props Interface Rules
```typescript
// ✅ GOOD: Clear, typed props
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

// ❌ BAD: Any types or unclear props
interface ButtonProps {
  title: any;
  onPress: any;
  style?: any;
}
```

### 2. Component Structure
```typescript
// ✅ GOOD: Consistent component structure
const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  // 1. Hooks
  const [isPressed, setIsPressed] = useState(false);
  
  // 2. Computed values
  const buttonStyle = getButtonStyle(variant, size, disabled);
  
  // 3. Event handlers
  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };
  
  // 4. Render
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      <Text style={textStyle}>{loading ? 'Loading...' : title}</Text>
    </TouchableOpacity>
  );
};
```

## 📱 Performance Rules

### 1. Bundle Size Optimization
```typescript
// ✅ GOOD: Tree-shakable imports
import { Button } from '@/components/atoms/Button';
import { formatDate } from '@/utils/dateUtils';

// ❌ BAD: Importing entire libraries
import * as React from 'react';
import { Button, Input, Text, View } from 'react-native';
```

### 2. Image Optimization
```typescript
// ✅ GOOD: Optimized images
import { Image } from 'expo-image';
<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  contentFit="cover"
  transition={200}
/>

// ❌ BAD: Unoptimized images
import { Image } from 'react-native';
<Image source={{ uri: imageUrl }} style={styles.image} />
```

### 3. Memory Management
```typescript
// ✅ GOOD: Cleanup subscriptions
useEffect(() => {
  const subscription = chatService.subscribe(handleMessage);
  return () => subscription.unsubscribe();
}, []);

// ✅ GOOD: Memoized expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

## 🔒 Type Safety Rules

### 1. Strict TypeScript
```typescript
// ✅ GOOD: Strict typing
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

// ❌ BAD: Loose typing
interface User {
  id: any;
  email: any;
  [key: string]: any;
}
```

### 2. API Response Types (Backend Integration)
```typescript
// ✅ GOOD: Typed API responses matching backend ApiResponse structure
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}

// ✅ GOOD: Specific response types
interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message?: string;
  error?: string;
  timestamp: string;
  path: string;
}

// ❌ BAD: Untyped responses
const response: any = await api.login(credentials);
```

## 🧪 Testing Rules

### 1. Test Coverage
- **Components**: 80%+ coverage
- **Utils**: 90%+ coverage
- **Services**: 85%+ coverage
- **Critical flows**: 100% coverage

### 2. Test Organization
```typescript
// ✅ GOOD: Organized test files
// Button.test.tsx
// LoginScreen.test.tsx
// authService.test.ts

// ❌ BAD: Mixed test files
// allTests.test.tsx
```

## 📁 File Naming Conventions

### 1. Component Files
```
// ✅ GOOD: PascalCase for components
Button.tsx
LoginScreen.tsx
FamilyMemberCard.tsx

// ✅ GOOD: camelCase for utilities
dateUtils.ts
validationUtils.ts
apiService.ts
```

### 2. Directory Structure
```
// ✅ GOOD: Clear hierarchy
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── Input/
│   └── molecules/
```

## 🚫 Anti-Patterns to Avoid

### 1. Code Smells
```typescript
// ❌ BAD: God components
const EverythingScreen = () => {
  // 500+ lines of code
  // Handles auth, family, stories, chat
};

// ❌ BAD: Prop drilling
<Grandparent>
  <Parent>
    <Child>
      <Grandchild prop={deeplyNestedProp} />
    </Child>
  </Parent>
</Grandparent>

// ❌ BAD: Inline styles
<View style={{ backgroundColor: 'blue', padding: 10, margin: 5 }}>
```

### 2. Performance Anti-Patterns
```typescript
// ❌ BAD: Unnecessary re-renders
const Component = () => {
  const [count, setCount] = useState(0);
  
  // This creates a new function on every render
  const handlePress = () => setCount(count + 1);
  
  return <Button onPress={handlePress} />;
};

// ❌ BAD: Large bundle imports
import * as React from 'react';
import { Button, Input, Text, View, ScrollView } from 'react-native';
```

## 📊 Code Quality Metrics

### 1. Maintainability Targets
- **Cyclomatic Complexity**: < 10 per function
- **Function Length**: < 20 lines
- **File Length**: < 200 lines
- **Import Count**: < 10 per file

### 2. Performance Targets
- **Bundle Size**: < 50MB
- **App Size**: < 100MB
- **Startup Time**: < 3 seconds
- **Memory Usage**: < 150MB

## 🔄 Development Workflow Rules

### 1. Before Coding
1. **Plan the component** - What does it do?
2. **Define the interface** - What props does it need?
3. **Write tests first** - TDD approach
4. **Keep it simple** - Start with basic functionality

### 2. During Coding
1. **Follow naming conventions**
2. **Add TypeScript types**
3. **Write clean, readable code**
4. **Add comments for complex logic**

### 3. After Coding
1. **Run tests** - Ensure everything works
2. **Check bundle size** - No unnecessary bloat
3. **Test on device** - Real-world performance
4. **Code review** - Self-review before commit

## ✅ Code Review Checklist

### Before Committing
- [ ] File size < 200 lines
- [ ] Function size < 20 lines
- [ ] TypeScript types defined
- [ ] Tests written and passing
- [ ] No console.log statements
- [ ] No unused imports
- [ ] Performance optimized
- [ ] Accessibility considered
- [ ] API responses match backend structure
- [ ] Error handling implemented

## 🎨 Design System Rules

### 1. Color Usage
- **Primary**: Instagram Blue (#0095F6) for main actions
- **Gradients**: Teal-to-purple for decorative elements
- **Consistent**: Use design tokens, not hardcoded colors

### 2. Typography
- **Hierarchy**: Clear heading levels (H1, H2, H3)
- **Readability**: Minimum 16px for body text
- **Accessibility**: High contrast ratios

### 3. Spacing
- **Consistent**: Use 8px grid system
- **Responsive**: Adapt to different screen sizes
- **Breathing room**: Adequate white space

## 🔐 Security Rules

### 1. Data Handling
- **Sensitive data**: Never log passwords or tokens
- **Storage**: Use secure storage for tokens
- **Validation**: Validate all user inputs
- **HTTPS**: Always use secure connections

### 2. Authentication
- **Token management**: Proper refresh token handling
- **Session security**: Secure session management
- **Biometric**: Support for biometric authentication

## 📱 Platform-Specific Rules

### 1. iOS Guidelines
- **Human Interface Guidelines**: Follow Apple's HIG
- **Navigation**: Use native iOS navigation patterns
- **Gestures**: Support standard iOS gestures

### 2. Android Guidelines
- **Material Design**: Follow Google's Material Design
- **Navigation**: Use Android navigation patterns
- **Permissions**: Handle permissions gracefully

## 🚀 Performance Optimization Rules

### 1. Bundle Optimization
- **Code splitting**: Split code by routes
- **Tree shaking**: Remove unused code
- **Image optimization**: Use appropriate image formats
- **Lazy loading**: Load components when needed

### 2. Runtime Performance
- **Memoization**: Use React.memo for expensive components
- **Virtualization**: For large lists
- **Debouncing**: For search and input handlers
- **Caching**: Cache API responses appropriately

## 🔌 Third-Party Integration Rules

### 1. Service Integration Standards
- **Firebase**: Phone auth, push notifications, analytics
- **AWS S3**: Media storage and CDN
- **Stripe**: Payment processing
- **Google Maps**: Location services
- **Expo**: Development and deployment platform

### 2. Integration Best Practices
- **Environment variables**: Store API keys securely
- **Error handling**: Comprehensive error handling for all services
- **Offline support**: Graceful degradation when services unavailable
- **Testing**: Mock all third-party services for testing
- **Security**: Follow security best practices for each service

## 🌍 Environment Management Rules

### 1. Environment Types
- **Development (dev)**: Local development with mock services
- **Quality Assurance (qa)**: Testing environment with real services
- **Staging (staging)**: Pre-production environment
- **Production (prod)**: Live environment with production services

### 2. Environment Configuration
- **Separate configs**: Each environment has its own configuration
- **Feature flags**: Environment-specific feature toggles
- **API endpoints**: Different endpoints for each environment
- **Security**: Environment-specific security settings
- **Logging**: Appropriate log levels for each environment

---

**Remember: These rules ensure LegacyKeep is built with clean, maintainable, and performant code that scales beautifully!** 🚀✨

**Last Updated**: December 2024
**Version**: 1.0
