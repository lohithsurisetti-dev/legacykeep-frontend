# 🚀 LegacyKeep Complete Onboarding Flow Documentation

## 📋 Overview

This document provides a comprehensive mapping of the complete user onboarding flow for LegacyKeep, based on the backend services analysis. It covers all screens, data collection, validation rules, and user journey steps.

## 🎯 Backend Services Analysis

### **Auth Service** ✅ **FULLY READY**
- **Registration**: Email/Phone + Username + Password + Terms
- **Login**: Multi-method authentication (email/username/phone)
- **2FA**: TOTP with QR codes and backup codes
- **Social Login**: Google, Apple, Facebook integration
- **Password Management**: Reset, change, history tracking
- **Session Management**: JWT tokens (15min access + 7-day refresh)
- **Account Management**: Deactivation, reactivation, deletion

### **User Service** ✅ **READY**
- **Profile Management**: Comprehensive user profile data
- **Settings**: Security, privacy, data management
- **Preferences**: Notifications, UI, accessibility, media
- **Profile Picture**: Upload, update, delete functionality

---

## 🗺️ Complete Onboarding Flow

### **Phase 1: Authentication & Registration**

#### **Screen 1: Welcome/Intro**
- **Purpose**: App introduction and value proposition
- **Content**: 
  - App logo and tagline
  - Brief description of LegacyKeep
  - "Get Started" button
- **Data**: None
- **Validation**: None

#### **Screen 2: Registration Method Selection**
- **Purpose**: Choose registration method
- **Content**:
  - "Create Account" title
  - Registration options:
    - Email + Password
    - Phone + Password
    - Social Login (Google, Apple, Facebook)
  - "Already have an account? Sign In" link
- **Data**: None
- **Validation**: None

#### **Screen 3: Email Registration**
- **Purpose**: Email-based registration
- **Content**:
  - Form fields:
    - Email (required)
    - Username (required, 3-50 chars, alphanumeric + _ -)
    - First Name (optional, 1-50 chars)
    - Last Name (optional, 1-50 chars)
    - Password (required, 8-128 chars, complexity rules)
    - Confirm Password (required, must match)
  - Terms & Conditions checkbox (required)
  - "Create Account" button
  - "Sign In" link
- **Data Collected**:
  ```typescript
  {
    email: string;           // Required, valid email format
    username: string;        // Required, 3-50 chars, alphanumeric + _ -
    firstName?: string;      // Optional, 1-50 chars
    lastName?: string;       // Optional, 1-50 chars
    password: string;        // Required, 8-128 chars, complexity
    confirmPassword: string; // Required, must match password
    acceptTerms: boolean;    // Required, must be true
  }
  ```
- **Validation Rules**:
  - Email: Valid email format, max 255 chars
  - Username: 3-50 chars, alphanumeric + underscore + hyphen only
  - Password: 8-128 chars, must contain: lowercase, uppercase, digit, special char
  - Terms: Must be accepted

#### **Screen 4: Phone Registration**
- **Purpose**: Phone-based registration
- **Content**:
  - Form fields:
    - Phone Number (required, international format)
    - Username (required, 3-50 chars, alphanumeric + _ -)
    - First Name (optional, 1-50 chars)
    - Last Name (optional, 1-50 chars)
    - Password (required, 8-128 chars, complexity rules)
    - Confirm Password (required, must match)
  - Terms & Conditions checkbox (required)
  - "Create Account" button
  - "Sign In" link
- **Data Collected**:
  ```typescript
  {
    phoneNumber: string;     // Required, international format
    username: string;        // Required, 3-50 chars, alphanumeric + _ -
    firstName?: string;      // Optional, 1-50 chars
    lastName?: string;       // Optional, 1-50 chars
    password: string;        // Required, 8-128 chars, complexity
    confirmPassword: string; // Required, must match password
    acceptTerms: boolean;    // Required, must be true
  }
  ```
- **Validation Rules**:
  - Phone: International format (+1234567890), max 20 chars
  - Username: 3-50 chars, alphanumeric + underscore + hyphen only
  - Password: 8-128 chars, must contain: lowercase, uppercase, digit, special char
  - Terms: Must be accepted

#### **Screen 5: Social Login**
- **Purpose**: Social media registration/login
- **Content**:
  - Social login buttons:
    - Google
    - Apple
    - Facebook
  - "Continue with Email" link
  - "Sign In" link
- **Data**: Handled by social providers
- **Validation**: OAuth flow validation

#### **Screen 6: Email Verification**
- **Purpose**: Verify email address
- **Content**:
  - "Check your email" message
  - Email address display
  - "Resend verification email" button
  - "Change email address" link
  - "Back to login" link
- **Data**: None
- **Validation**: None

#### **Screen 7: Phone Verification**
- **Purpose**: Verify phone number
- **Content**:
  - "Enter verification code" message
  - Phone number display
  - 6-digit code input field
  - "Resend code" button
  - "Change phone number" link
- **Data Collected**:
  ```typescript
  {
    verificationCode: string; // Required, 6 digits
  }
  ```
- **Validation**: 6-digit numeric code

#### **Screen 8: Login**
- **Purpose**: User authentication
- **Content**:
  - Form fields:
    - Email/Username/Phone (required)
    - Password (required)
  - "Remember me" checkbox
  - "Forgot password?" link
  - "Sign In" button
  - "Create account" link
- **Data Collected**:
  ```typescript
  {
    identifier: string;      // Required, email/username/phone
    password: string;        // Required
    rememberMe?: boolean;    // Optional
  }
  ```
- **Validation**: Valid identifier format, password required

#### **Screen 9: Forgot Password**
- **Purpose**: Password reset initiation
- **Content**:
  - "Reset your password" title
  - Email/Phone input field
  - "Send reset link" button
  - "Back to login" link
- **Data Collected**:
  ```typescript
  {
    identifier: string; // Required, email or phone
  }
  ```
- **Validation**: Valid email or phone format

#### **Screen 10: Password Reset**
- **Purpose**: Set new password
- **Content**:
  - "Set new password" title
  - New password field
  - Confirm password field
  - "Update password" button
- **Data Collected**:
  ```typescript
  {
    newPassword: string;        // Required, 8-128 chars, complexity
    confirmPassword: string;    // Required, must match
  }
  ```
- **Validation**: Same as registration password rules

---

### **Phase 2: Profile Setup**

#### **Screen 11: Profile Setup Welcome**
- **Purpose**: Introduce profile setup
- **Content**:
  - "Let's set up your profile" title
  - Brief explanation of profile benefits
  - "Get Started" button
  - "Skip for now" link
- **Data**: None
- **Validation**: None

#### **Screen 12: Basic Profile Information**
- **Purpose**: Collect basic profile data
- **Content**:
  - Form fields:
    - Display Name (optional, max 100 chars)
    - Bio (optional, max 1000 chars)
    - Date of Birth (optional, past date)
    - Profile Picture (optional, upload button)
  - "Continue" button
  - "Skip" link
- **Data Collected**:
  ```typescript
  {
    displayName?: string;    // Optional, max 100 chars
    bio?: string;           // Optional, max 1000 chars
    dateOfBirth?: Date;     // Optional, past date
    profilePicture?: File;  // Optional, image file
  }
  ```
- **Validation**:
  - Display Name: Max 100 chars
  - Bio: Max 1000 chars
  - Date of Birth: Must be in the past

#### **Screen 13: Contact Information**
- **Purpose**: Collect contact details
- **Content**:
  - Form fields:
    - Phone Number (optional, if not provided during registration)
    - Address Line 1 (optional, max 255 chars)
    - Address Line 2 (optional, max 255 chars)
    - City (optional, max 100 chars)
    - State (optional, max 100 chars)
    - Country (optional, max 100 chars)
    - Postal Code (optional, max 20 chars)
  - "Continue" button
  - "Skip" link
- **Data Collected**:
  ```typescript
  {
    phoneNumber?: string;    // Optional, if not in registration
    addressLine1?: string;   // Optional, max 255 chars
    addressLine2?: string;   // Optional, max 255 chars
    city?: string;          // Optional, max 100 chars
    state?: string;         // Optional, max 100 chars
    country?: string;       // Optional, max 100 chars
    postalCode?: string;    // Optional, max 20 chars
  }
  ```
- **Validation**:
  - Phone: Valid phone format
  - Address fields: Respective max lengths
  - Postal Code: Valid format

#### **Screen 14: Location & Preferences**
- **Purpose**: Set location and basic preferences
- **Content**:
  - Form fields:
    - Timezone (required, dropdown)
    - Language (required, dropdown)
    - Profile Visibility (required, radio buttons)
  - "Continue" button
- **Data Collected**:
  ```typescript
  {
    timezone: string;           // Required, valid timezone
    language: string;          // Required, language code (en, en-US)
    profileVisibility: string; // Required, PUBLIC/PRIVATE/FRIENDS_ONLY
  }
  ```
- **Validation**:
  - Timezone: Valid timezone identifier
  - Language: Valid language code
  - Profile Visibility: Valid enum value

---

### **Phase 3: Security & Settings**

#### **Screen 15: Two-Factor Authentication Setup**
- **Purpose**: Optional 2FA setup
- **Content**:
  - "Secure your account" title
  - 2FA benefits explanation
  - QR code display
  - Manual setup key
  - 6-digit verification code input
  - Backup codes display
  - "Enable 2FA" button
  - "Skip for now" link
- **Data Collected**:
  ```typescript
  {
    verificationCode: string; // Required if enabling 2FA
    enable2FA: boolean;       // User choice
  }
  ```
- **Validation**: 6-digit TOTP code

#### **Screen 16: Notification Preferences**
- **Purpose**: Set notification preferences
- **Content**:
  - Toggle switches:
    - Email Notifications (default: ON)
    - Push Notifications (default: ON)
    - SMS Notifications (default: OFF)
    - Marketing Emails (default: OFF)
  - "Continue" button
- **Data Collected**:
  ```typescript
  {
    emailNotifications: boolean;    // Default: true
    pushNotifications: boolean;     // Default: true
    smsNotifications: boolean;      // Default: false
    marketingEmails: boolean;       // Default: false
  }
  ```
- **Validation**: Boolean values

#### **Screen 17: Privacy Settings**
- **Purpose**: Set privacy preferences
- **Content**:
  - Radio buttons:
    - Story Visibility (FAMILY_ONLY, PRIVATE, PUBLIC)
    - Media Visibility (FAMILY_ONLY, PRIVATE, PUBLIC)
  - Privacy level selection:
    - Minimal (minimal data collection)
    - Standard (standard data collection)
    - Maximum (maximum data collection)
  - "Continue" button
- **Data Collected**:
  ```typescript
  {
    storyVisibility: string;    // FAMILY_ONLY/PRIVATE/PUBLIC
    mediaVisibility: string;    // FAMILY_ONLY/PRIVATE/PUBLIC
    privacyLevel: string;       // MINIMAL/STANDARD/MAXIMUM
  }
  ```
- **Validation**: Valid enum values

---

### **Phase 4: Accessibility & UI Preferences**

#### **Screen 18: Theme & Display Preferences**
- **Purpose**: Set UI preferences
- **Content**:
  - Theme selection:
    - Light (default)
    - Dark
    - Auto (follow system)
  - Font size selection:
    - Small
    - Medium (default)
    - Large
    - Extra Large
  - Accessibility options:
    - High Contrast (toggle)
    - Reduced Motion (toggle)
  - "Continue" button
- **Data Collected**:
  ```typescript
  {
    themePreference: string;    // LIGHT/DARK/AUTO
    fontSize: string;          // SMALL/MEDIUM/LARGE/EXTRA_LARGE
    highContrast: boolean;     // Default: false
    reducedMotion: boolean;    // Default: false
  }
  ```
- **Validation**: Valid enum values

#### **Screen 19: Media & Data Preferences**
- **Purpose**: Set media and data preferences
- **Content**:
  - Toggle switches:
    - Auto-play Videos (default: ON)
    - Data Saver Mode (default: OFF)
  - Data retention period:
    - 1 year
    - 3 years
    - 7 years (default)
    - Forever
  - "Continue" button
- **Data Collected**:
  ```typescript
  {
    autoPlayVideos: boolean;    // Default: true
    dataSaverMode: boolean;     // Default: false
    dataRetentionDays: number;  // 365/1095/2555/forever
  }
  ```
- **Validation**: Valid boolean and number values

---

### **Phase 5: Terms & Final Setup**

#### **Screen 20: Terms & Conditions**
- **Purpose**: Detailed terms acceptance
- **Content**:
  - Scrollable terms and conditions text
  - Privacy policy link
  - Data processing agreement link
  - "I agree to the terms" checkbox
  - "Accept & Continue" button
- **Data Collected**:
  ```typescript
  {
    acceptDetailedTerms: boolean; // Required, must be true
  }
  ```
- **Validation**: Must be true

#### **Screen 21: Welcome & Onboarding Complete**
- **Purpose**: Welcome user and complete onboarding
- **Content**:
  - "Welcome to LegacyKeep!" message
  - User's name display
  - Brief app tour offer
  - "Start using LegacyKeep" button
  - "Take a tour" link
- **Data**: None
- **Validation**: None

---

## 🔄 Alternative Flows

### **Social Login Flow**
1. **Screen 3/4**: Social login buttons
2. **OAuth Redirect**: External provider
3. **Account Creation**: Auto-create account
4. **Profile Setup**: Continue from Screen 11

### **Existing User Login Flow**
1. **Screen 8**: Login form
2. **2FA Challenge**: If enabled (Screen 15)
3. **Dashboard**: Direct to main app

### **Password Reset Flow**
1. **Screen 9**: Forgot password
2. **Email/SMS**: Reset link/code
3. **Screen 10**: New password
4. **Login**: Return to Screen 8

---

## 📊 Data Summary

### **Registration Data (Auth Service)**
```typescript
interface RegistrationData {
  // Required fields
  email?: string;           // OR phoneNumber
  phoneNumber?: string;     // OR email
  username: string;         // Always required
  password: string;         // Always required
  acceptTerms: boolean;     // Always required
  
  // Optional fields
  firstName?: string;
  lastName?: string;
}
```

### **Profile Data (User Service)**
```typescript
interface ProfileData {
  // Basic Info
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  dateOfBirth?: Date;
  profilePictureUrl?: string;
  profilePictureThumbnailUrl?: string;
  
  // Contact Info
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  
  // Preferences
  timezone?: string;
  language?: string;
  isPublic?: boolean;
}
```

### **Settings Data (User Service)**
```typescript
interface SettingsData {
  // Security
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  deviceManagement: boolean;
  
  // Privacy
  privacyLevel: 'MINIMAL' | 'STANDARD' | 'MAXIMUM';
  dataRetentionDays: number;
  
  // Data Management
  dataExportEnabled: boolean;
  accountDeletionScheduledAt?: Date;
}
```

### **Preferences Data (User Service)**
```typescript
interface PreferencesData {
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  
  // Privacy
  profileVisibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS_ONLY';
  storyVisibility: 'PUBLIC' | 'FAMILY_ONLY' | 'PRIVATE';
  mediaVisibility: 'PUBLIC' | 'FAMILY_ONLY' | 'PRIVATE';
  
  // UI
  themePreference: 'LIGHT' | 'DARK' | 'AUTO';
  fontSize: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
  highContrast: boolean;
  reducedMotion: boolean;
  
  // Media
  autoPlayVideos: boolean;
  dataSaverMode: boolean;
}
```

---

## 🎯 Implementation Priority

### **Phase 1: Core Authentication (High Priority)**
1. **Screen 2**: Registration method selection
2. **Screen 3**: Email registration
3. **Screen 8**: Login
4. **Screen 9**: Forgot password
5. **Screen 10**: Password reset

### **Phase 2: Basic Profile (Medium Priority)**
1. **Screen 11**: Profile setup welcome
2. **Screen 12**: Basic profile information
3. **Screen 14**: Location & preferences

### **Phase 3: Advanced Features (Lower Priority)**
1. **Screen 15**: 2FA setup
2. **Screen 16**: Notification preferences
3. **Screen 17**: Privacy settings
4. **Screen 18**: Theme & display preferences
5. **Screen 19**: Media & data preferences

### **Phase 4: Social & Alternative Flows (Future)**
1. **Screen 4**: Phone registration
2. **Screen 5**: Social login
3. **Screen 6**: Email verification
4. **Screen 7**: Phone verification

---

## 🔧 Technical Implementation Notes

### **API Endpoints Required**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Password reset initiation
- `POST /auth/reset-password` - Password reset completion
- `POST /auth/verify-email` - Email verification
- `POST /auth/verify-phone` - Phone verification
- `POST /api/v1/2fa/setup` - 2FA setup
- `POST /api/v1/2fa/verify` - 2FA verification
- `POST /api/v1/social/login` - Social login
- `POST /user/profile` - Create/update profile
- `POST /user/settings` - Create/update settings
- `POST /user/preferences` - Create/update preferences

### **State Management Requirements**
- Authentication state (JWT tokens, user info)
- Onboarding progress tracking
- Form data persistence
- Error handling and validation
- Loading states

### **Navigation Structure**
- Auth stack (registration, login, verification)
- Onboarding stack (profile setup, preferences)
- Main app stack (dashboard, features)

---

This comprehensive documentation provides the complete roadmap for implementing the LegacyKeep onboarding flow. Each screen is mapped to backend services with specific data requirements and validation rules. 🚀✨
