/**
 * Text Constants - Single Source of Truth for All UI Text
 * 
 * This file contains all text content used throughout the app.
 * Change any text here and it updates everywhere automatically.
 * 
 * Benefits:
 * - Single source of truth for all text
 * - Easy to implement internationalization (i18n)
 * - Consistent messaging across the app
 * - Easy to update text without touching components
 * - Type-safe text management
 */

// ============================================================================
// AUTHENTICATION TEXTS
// ============================================================================

export const authTexts = {
  // Login Screen
  login: {
    title: 'LegacyKeep',
    subtitle: 'Preserving Family Stories',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    loginButton: 'Log In',
    forgotPassword: 'Forgot password?',
    socialLoginDivider: 'Or continue with',
    noAccount: "Don't have an account?",
    signUpLink: 'Sign up',
  },
  
  // Welcome Screen
  welcome: {
    title: 'LegacyKeep',
    subtitle: 'Preserving Family Stories',
    description: 'Connect with your family, share stories, and preserve memories for generations to come.',
    getStartedButton: 'Get Started',
    signInButton: 'Sign In',
    features: {
      title: 'What you can do:',
      familyTree: {
        title: 'Family Tree',
        description: 'Build your family tree',
      },
      shareStories: {
        title: 'Share Stories',
        description: 'Preserve family stories',
      },
      preserveMemories: {
        title: 'Preserve Memories',
        description: 'Keep memories safe',
      },
    },
  },
  
  // Splash Screen
  splash: {
    title: 'LegacyKeep',
    tagline: "Preserve your family's stories",
  },
  
  // Validation Messages
  validation: {
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordComplexity: 'Password must contain uppercase, lowercase, number, and special character',
    generalError: 'Please correct the errors in the form.',
    loginFailed: 'Login failed. Please try again.',
  },
  
  // Social Login
  social: {
    google: 'Google',
    facebook: 'Facebook',
    instagram: 'Instagram',
    comingSoon: 'Coming Soon',
    googleComingSoon: 'Google login will be available soon!',
    facebookComingSoon: 'Facebook login will be available soon!',
    instagramComingSoon: 'Instagram login will be available soon!',
  },
  
  // Registration Method Screen
  registrationMethod: {
    title: 'Create Account',
    subtitle: 'Choose how you\'d like to sign up',
    emailOption: 'Continue with Email',
    phoneOption: 'Continue with Phone',
    socialOption: 'Continue with Social',
    alreadyHaveAccount: 'Already have an account?',
    signInLink: 'Sign In',
  },
  
  // Registration Screen
  registration: {
    appTitle: 'LegacyKeep',
    title: 'Create Account',
    subtitle: 'Create your account to start preserving your family\'s stories.',
    firstNamePlaceholder: 'First Name',
    lastNamePlaceholder: 'Last Name',
    usernamePlaceholder: 'Username',
    emailOrPhonePlaceholder: 'Email/Phone',
    passwordPlaceholder: 'Password',
    createAccountButton: 'Create Account',
    termsText: 'I agree to the',
    termsLink: 'Terms and Conditions',
    alreadyHaveAccount: 'Already have an account?',
    signInLink: 'Sign In',
  },
  
  // Phone Registration Screen
  phoneRegistration: {
    title: 'Create Account',
    subtitle: 'Enter your phone number to get started',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+1 (555) 123-4567',
    sendCodeButton: 'Send Verification Code',
    verificationTitle: 'Verify Your Phone',
    verificationSubtitle: 'Enter the code sent to your phone',
    codeLabel: 'Verification Code',
    codePlaceholder: 'Enter 6-digit code',
    verifyButton: 'Verify & Create Account',
    resendCode: 'Resend Code',
    changeNumber: 'Change Phone Number',
  },
  
  // Registration Success Screen
  registrationSuccess: {
    title: 'Account Created!',
    subtitle: 'Welcome to LegacyKeep',
    description: 'Your account has been successfully created. You can now start preserving your family stories.',
    getStartedButton: 'Get Started',
  },
  
  // Forgot Password Screen
  forgotPassword: {
    appTitle: 'LegacyKeep',
    title: 'Set your new password',
    newPasswordLabel: 'New Password',
    newPasswordPlaceholder: 'Enter new password',
    confirmPasswordLabel: 'Confirm New Password',
    confirmPasswordPlaceholder: 'Confirm new password',
    resetPasswordButton: 'Reset Password',
    backToLogin: 'Back to Login',
  },
  
  // Registration Validation Messages
  registrationValidation: {
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordMismatch: 'Passwords do not match',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Please enter a valid phone number',
    codeRequired: 'Verification code is required',
    codeInvalid: 'Please enter a valid 6-digit code',
  },
} as const;

// ============================================================================
// COMMON TEXTS
// ============================================================================

export const commonTexts = {
  // Loading States
  loading: 'Loading...',
  
  // Actions
  submit: 'Submit',
  cancel: 'Cancel',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  done: 'Done',
  
  // Navigation
  back: 'Back',
  next: 'Next',
  previous: 'Previous',
  skip: 'Skip',
  
  // Status Messages
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Information',
  
  // Accessibility
  accessibility: {
    button: 'Button',
    input: 'Input field',
    link: 'Link',
    image: 'Image',
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type AuthTextKey = keyof typeof authTexts;
export type CommonTextKey = keyof typeof commonTexts;

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * HOW TO USE:
 * 
 * 1. Import the text constants:
 *    import { authTexts, commonTexts } from '../constants/texts';
 * 
 * 2. Use in components:
 *    <Text>{authTexts.login.title}</Text>
 *    <Button title={authTexts.login.loginButton} />
 * 
 * 3. For internationalization (future):
 *    - Replace direct imports with i18n functions
 *    - All text will be automatically translated
 * 
 * 4. To change any text:
 *    - Update the value in this file
 *    - Text updates everywhere automatically
 * 
 * 5. To add new text:
 *    - Add to appropriate section
 *    - Use descriptive key names
 *    - Follow existing naming conventions
 */
