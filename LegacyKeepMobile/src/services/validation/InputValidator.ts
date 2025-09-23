/**
 * Input Validation & Sanitization
 * 
 * Comprehensive input validation, sanitization, and security utilities
 */

import { ApiError, ErrorCode } from '../errors/ApiError';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
  sanitize?: (value: any) => any;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  sanitizedData: any;
}

/**
 * Input Validator Service
 */
export class InputValidator {
  private commonPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-\(\)]+$/,
    username: /^[a-zA-Z0-9_]{3,20}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    url: /^https?:\/\/.+/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  };

  /**
   * Validate data against schema
   */
  validate(data: any, schema: ValidationSchema): ValidationResult {
    const errors: Array<{ field: string; message: string; code: string }> = [];
    const sanitizedData: any = {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];
      const sanitizedValue = this.sanitizeValue(value, rules);

      // Check required
      if (rules.required && (sanitizedValue === undefined || sanitizedValue === null || sanitizedValue === '')) {
        errors.push({
          field,
          message: `${field} is required`,
          code: 'REQUIRED',
        });
        continue;
      }

      // Skip validation if value is empty and not required
      if (sanitizedValue === undefined || sanitizedValue === null || sanitizedValue === '') {
        sanitizedData[field] = sanitizedValue;
        continue;
      }

      // Validate string length
      if (typeof sanitizedValue === 'string') {
        if (rules.minLength && sanitizedValue.length < rules.minLength) {
          errors.push({
            field,
            message: `${field} must be at least ${rules.minLength} characters`,
            code: 'MIN_LENGTH',
          });
        }

        if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
          errors.push({
            field,
            message: `${field} must be no more than ${rules.maxLength} characters`,
            code: 'MAX_LENGTH',
          });
        }
      }

      // Validate pattern
      if (rules.pattern && typeof sanitizedValue === 'string' && !rules.pattern.test(sanitizedValue)) {
        errors.push({
          field,
          message: `${field} format is invalid`,
          code: 'INVALID_FORMAT',
        });
      }

      // Custom validation
      if (rules.custom) {
        const customResult = rules.custom(sanitizedValue);
        if (customResult !== true) {
          errors.push({
            field,
            message: typeof customResult === 'string' ? customResult : `${field} is invalid`,
            code: 'CUSTOM_VALIDATION',
          });
        }
      }

      sanitizedData[field] = sanitizedValue;
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData,
    };
  }

  /**
   * Sanitize value based on rules
   */
  private sanitizeValue(value: any, rules: ValidationRule): any {
    if (value === undefined || value === null) {
      return value;
    }

    let sanitized = value;

    // Apply custom sanitization
    if (rules.sanitize) {
      try {
        sanitized = rules.sanitize(sanitized);
      } catch (error) {
        console.warn('Sanitization error:', error);
        sanitized = value; // Return original value if sanitization fails
      }
    }

    // Default sanitization for strings
    if (typeof sanitized === 'string') {
      sanitized = this.sanitizeString(sanitized);
    }

    return sanitized;
  }

  /**
   * Sanitize string input
   */
  private sanitizeString(input: string): string {
    return input
      .trim() // Remove leading/trailing whitespace
      .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
      .replace(/[<>]/g, ''); // Remove potential HTML tags
  }

  /**
   * Validate email
   */
  validateEmail(email: string): boolean {
    return this.commonPatterns.email.test(email);
  }

  /**
   * Validate phone number
   */
  validatePhone(phone: string): boolean {
    return this.commonPatterns.phone.test(phone);
  }

  /**
   * Validate username
   */
  validateUsername(username: string): boolean {
    return this.commonPatterns.username.test(username);
  }

  /**
   * Validate password strength
   */
  validatePassword(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Password must be at least 8 characters long');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Password must contain at least one lowercase letter');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Password must contain at least one uppercase letter');
    }

    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('Password must contain at least one number');
    }

    if (/[@$!%*?&]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Password must contain at least one special character');
    }

    return {
      isValid: score >= 4,
      score,
      feedback,
    };
  }

  /**
   * Sanitize HTML content
   */
  sanitizeHtml(html: string): string {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
  }

  /**
   * Validate and sanitize API request data
   */
  validateApiRequest(data: any, schema: ValidationSchema): any {
    const result = this.validate(data, schema);

    if (!result.isValid) {
      throw new ApiError({
        code: ErrorCode.VALIDATION_ERROR,
        message: 'Validation failed',
        userMessage: 'Please check your input and try again',
        timestamp: new Date().toISOString(),
      });
    }

    return result.sanitizedData;
  }

  /**
   * Common validation schemas
   */
  getCommonSchemas() {
    return {
      email: {
        required: true,
        pattern: this.commonPatterns.email,
        maxLength: 255,
        sanitize: (value: string) => value?.toLowerCase()?.trim() || '',
      },
      username: {
        required: true,
        pattern: this.commonPatterns.username,
        minLength: 3,
        maxLength: 20,
        sanitize: (value: string) => value?.toLowerCase()?.trim() || '',
      },
      password: {
        required: true,
        minLength: 8,
        maxLength: 128,
        custom: (value: string) => {
          const validation = this.validatePassword(value);
          return validation.isValid ? true : validation.feedback.join(', ');
        },
      },
      phone: {
        required: false,
        pattern: this.commonPatterns.phone,
        maxLength: 20,
        sanitize: (value: string) => value?.replace(/[\s\-\(\)]/g, '') || '',
      },
      firstName: {
        required: true,
        minLength: 1,
        maxLength: 50,
        sanitize: (value: string) => value?.trim() || '',
      },
      lastName: {
        required: true,
        minLength: 1,
        maxLength: 50,
        sanitize: (value: string) => value?.trim() || '',
      },
    };
  }
}

// Export singleton instance
export const inputValidator = new InputValidator();
