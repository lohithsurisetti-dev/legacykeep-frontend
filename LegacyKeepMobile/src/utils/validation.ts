/**
 * Validation Utilities
 * 
 * Centralized validation functions for forms
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username validation regex (alphanumeric, underscore, hyphen, 3-20 chars)
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

// Password validation regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Phone number validation regex (basic international format)
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates email format
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

/**
 * Validates username format
 */
export const validateUsername = (username: string): ValidationResult => {
  if (!username.trim()) {
    return { isValid: false, error: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' };
  }
  
  if (username.length > 20) {
    return { isValid: false, error: 'Username must be less than 20 characters' };
  }
  
  if (!USERNAME_REGEX.test(username)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, underscore, and hyphen' };
  }
  
  return { isValid: true };
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (!PASSWORD_REGEX.test(password)) {
    return { 
      isValid: false, 
      error: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number' 
    };
  }
  
  return { isValid: true };
};

/**
 * Validates phone number format
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  if (!PHONE_REGEX.test(cleanPhone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true };
};

/**
 * Validates email or username (for login)
 */
export const validateEmailOrUsername = (input: string): ValidationResult => {
  if (!input.trim()) {
    return { isValid: false, error: 'Email or username is required' };
  }
  
  // Check if it's an email
  if (input.includes('@')) {
    return validateEmail(input);
  }
  
  // Otherwise treat as username
  return validateUsername(input);
};

/**
 * Validates required field
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
};

/**
 * Validates minimum length
 */
export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationResult => {
  if (value.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  
  return { isValid: true };
};

/**
 * Validates maximum length
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationResult => {
  if (value.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }
  
  return { isValid: true };
};

/**
 * Validates password confirmation
 */
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true };
};

/**
 * Validates terms acceptance
 */
export const validateTermsAcceptance = (accepted: boolean): ValidationResult => {
  if (!accepted) {
    return { isValid: false, error: 'You must accept the terms and conditions' };
  }
  
  return { isValid: true };
};

/**
 * Validates age (must be 13+)
 */
export const validateAge = (birthDate: string): ValidationResult => {
  if (!birthDate) {
    return { isValid: false, error: 'Birth date is required' };
  }
  
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  if (age < 13) {
    return { isValid: false, error: 'You must be at least 13 years old' };
  }
  
  return { isValid: true };
};

/**
 * Validates postal code (basic format)
 */
export const validatePostalCode = (postalCode: string): ValidationResult => {
  if (!postalCode.trim()) {
    return { isValid: false, error: 'Postal code is required' };
  }
  
  // Basic postal code validation (5 digits for US, more flexible for international)
  const postalRegex = /^[0-9]{5}(-[0-9]{4})?$|^[A-Za-z0-9\s-]{3,10}$/;
  
  if (!postalRegex.test(postalCode)) {
    return { isValid: false, error: 'Please enter a valid postal code' };
  }
  
  return { isValid: true };
};

/**
 * Validates timezone
 */
export const validateTimezone = (timezone: string): ValidationResult => {
  if (!timezone.trim()) {
    return { isValid: false, error: 'Timezone is required' };
  }
  
  // Basic timezone validation (should be in format like "America/New_York")
  const timezoneRegex = /^[A-Za-z_]+\/[A-Za-z_]+$/;
  
  if (!timezoneRegex.test(timezone)) {
    return { isValid: false, error: 'Please enter a valid timezone' };
  }
  
  return { isValid: true };
};

/**
 * Validates language code
 */
export const validateLanguage = (language: string): ValidationResult => {
  if (!language.trim()) {
    return { isValid: false, error: 'Language is required' };
  }
  
  // Basic language code validation (ISO 639-1 format)
  const languageRegex = /^[a-z]{2}(-[A-Z]{2})?$/;
  
  if (!languageRegex.test(language)) {
    return { isValid: false, error: 'Please enter a valid language code' };
  }
  
  return { isValid: true };
};
