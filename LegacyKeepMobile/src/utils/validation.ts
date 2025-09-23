/**
 * Validation Utilities
 * 
 * Centralized validation functions for forms
 */

// Enhanced email validation regex with better syntax checking
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Username validation regex (alphanumeric, underscore, hyphen, 3-20 chars)
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

// Password validation regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

// Enhanced phone number validation regex (international format with better digit handling)
const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates email format with enhanced syntax checking
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const trimmedEmail = email.trim();
  
  // Check for basic structure
  if (!trimmedEmail.includes('@')) {
    return { isValid: false, error: 'Email must contain @ symbol' };
  }
  
  if (!trimmedEmail.includes('.')) {
    return { isValid: false, error: 'Email must contain a domain' };
  }
  
  // Check for multiple @ symbols
  if ((trimmedEmail.match(/@/g) || []).length > 1) {
    return { isValid: false, error: 'Email can only contain one @ symbol' };
  }
  
  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return { isValid: false, error: 'Email cannot contain consecutive dots' };
  }
  
  // Check for spaces
  if (trimmedEmail.includes(' ')) {
    return { isValid: false, error: 'Email cannot contain spaces' };
  }
  
  // Check length limits
  if (trimmedEmail.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }
  
  // Use enhanced regex
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

/**
 * Validates username format with enhanced checks
 */
export const validateUsername = (username: string): ValidationResult => {
  if (!username.trim()) {
    return { isValid: false, error: 'Username is required' };
  }
  
  const trimmedUsername = username.trim();
  
  // Check length
  if (trimmedUsername.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' };
  }
  
  if (trimmedUsername.length > 20) {
    return { isValid: false, error: 'Username must be less than 20 characters' };
  }
  
  // Check for spaces
  if (trimmedUsername.includes(' ')) {
    return { isValid: false, error: 'Username cannot contain spaces' };
  }
  
  // Check for consecutive special characters
  if (trimmedUsername.includes('__') || trimmedUsername.includes('--') || trimmedUsername.includes('_-') || trimmedUsername.includes('-_')) {
    return { isValid: false, error: 'Username cannot contain consecutive special characters' };
  }
  
  // Check if starts or ends with special characters
  if (trimmedUsername.startsWith('_') || trimmedUsername.startsWith('-') || 
      trimmedUsername.endsWith('_') || trimmedUsername.endsWith('-')) {
    return { isValid: false, error: 'Username cannot start or end with underscore or hyphen' };
  }
  
  // Check for reserved usernames (basic check)
  const reservedUsernames = ['admin', 'root', 'user', 'test', 'guest', 'api', 'www', 'mail', 'support'];
  if (reservedUsernames.includes(trimmedUsername.toLowerCase())) {
    return { isValid: false, error: 'This username is reserved' };
  }
  
  // Use regex for final validation
  if (!USERNAME_REGEX.test(trimmedUsername)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, underscore, and hyphen' };
  }
  
  return { isValid: true };
};

/**
 * Validates password strength (more lenient - only requires length and at least one complexity requirement)
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  
  // Check if password has at least one complexity requirement (uppercase, lowercase, number, or special char)
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const complexityCount = [hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
  if (complexityCount === 0) {
    return { 
      isValid: false, 
      error: 'Password must contain at least one letter, number, or special character' 
    };
  }
  
  return { isValid: true };
};

/**
 * Validates phone number format with enhanced digit checking
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  const trimmedPhone = phone.trim();
  
  // Remove all non-digit characters except +
  const cleanPhone = trimmedPhone.replace(/[^\d+]/g, '');
  
  // Check if phone contains only digits and optional +
  if (!/^\+?[\d]+$/.test(cleanPhone)) {
    return { isValid: false, error: 'Phone number can only contain digits and +' };
  }
  
  // Check for multiple + symbols
  if ((cleanPhone.match(/\+/g) || []).length > 1) {
    return { isValid: false, error: 'Phone number can only contain one + symbol' };
  }
  
  // Check if + is at the beginning
  if (cleanPhone.includes('+') && !cleanPhone.startsWith('+')) {
    return { isValid: false, error: '+ symbol must be at the beginning' };
  }
  
  // Check minimum length (7 digits minimum for international)
  const digitsOnly = cleanPhone.replace(/\+/g, '');
  if (digitsOnly.length < 7) {
    return { isValid: false, error: 'Phone number must be at least 7 digits' };
  }
  
  // Check maximum length (15 digits maximum for international)
  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number cannot exceed 15 digits' };
  }
  
  // Use enhanced regex
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
 * Validates email or phone number (for registration)
 */
export const validateEmailOrPhone = (input: string): ValidationResult => {
  if (!input.trim()) {
    return { isValid: false, error: 'Email or phone number is required' };
  }
  
  const trimmedInput = input.trim();
  
  // Check if it's an email (contains @)
  if (trimmedInput.includes('@')) {
    return validateEmail(trimmedInput);
  }
  
  // Check if it's a phone number (contains only digits, +, spaces, dashes, parentheses)
  if (/^[\d\s\-\+\(\)]+$/.test(trimmedInput)) {
    return validatePhoneNumber(trimmedInput);
  }
  
  // If it doesn't match either pattern, it's invalid
  return { isValid: false, error: 'Please enter a valid email address or phone number' };
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
