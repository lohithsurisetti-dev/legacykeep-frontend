/**
 * API Error Handling System
 * 
 * Comprehensive error handling with proper typing and user-friendly messages
 */

export enum ErrorCode {
  // Network Errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  
  // HTTP Errors
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMITED = 'RATE_LIMITED',
  SERVER_ERROR = 'SERVER_ERROR',
  
  // Authentication Errors
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  
  // Business Logic Errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  USERNAME_TAKEN = 'USERNAME_TAKEN',
  INVALID_OTP = 'INVALID_OTP',
  OTP_EXPIRED = 'OTP_EXPIRED',
  
  // Client Errors
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  
  // Unknown Error
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface ErrorDetails {
  code: ErrorCode;
  message: string;
  userMessage: string;
  statusCode?: number;
  field?: string;
  timestamp: string;
  requestId?: string;
}

/**
 * Base API Error Class
 */
export class ApiError extends Error {
  public readonly code: ErrorCode;
  public readonly userMessage: string;
  public readonly statusCode?: number;
  public readonly field?: string;
  public readonly timestamp: string;
  public readonly requestId?: string;

  constructor(details: ErrorDetails) {
    super(details.message);
    this.name = 'ApiError';
    this.code = details.code;
    this.userMessage = details.userMessage;
    this.statusCode = details.statusCode;
    this.field = details.field;
    this.timestamp = details.timestamp;
    this.requestId = details.requestId;
  }

  /**
   * Check if error is retryable
   */
  public isRetryable(): boolean {
    const retryableCodes = [
      ErrorCode.NETWORK_ERROR,
      ErrorCode.TIMEOUT_ERROR,
      ErrorCode.CONNECTION_ERROR,
      ErrorCode.SERVER_ERROR,
    ];
    return retryableCodes.includes(this.code);
  }

  /**
   * Check if error is authentication related
   */
  public isAuthError(): boolean {
    const authCodes = [
      ErrorCode.UNAUTHORIZED,
      ErrorCode.INVALID_CREDENTIALS,
      ErrorCode.TOKEN_EXPIRED,
      ErrorCode.TOKEN_INVALID,
      ErrorCode.ACCOUNT_LOCKED,
    ];
    return authCodes.includes(this.code);
  }

  /**
   * Get user-friendly error message
   */
  public getUserMessage(): string {
    return this.userMessage;
  }

  /**
   * Convert to JSON for logging
   */
  public toJSON(): object {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      userMessage: this.userMessage,
      statusCode: this.statusCode,
      field: this.field,
      timestamp: this.timestamp,
      requestId: this.requestId,
    };
  }
}

/**
 * Error Factory for creating standardized errors
 */
export class ApiErrorFactory {
  /**
   * Create error from HTTP response
   */
  static fromHttpResponse(
    statusCode: number,
    responseData: any,
    requestId?: string
  ): ApiError {
    const timestamp = new Date().toISOString();
    
    // Extract error details from response
    const serverMessage = responseData?.message || responseData?.error || 'Unknown server error';
    const serverCode = responseData?.code || responseData?.errorCode;
    
    // Map HTTP status codes to error codes
    const errorCode = this.mapStatusCodeToErrorCode(statusCode, serverCode);
    const userMessage = this.getUserFriendlyMessage(errorCode, serverMessage);

    return new ApiError({
      code: errorCode,
      message: serverMessage,
      userMessage,
      statusCode,
      timestamp,
      requestId,
    });
  }

  /**
   * Create error from network/connection issues
   */
  static fromNetworkError(error: any, requestId?: string): ApiError {
    const timestamp = new Date().toISOString();
    
    let errorCode = ErrorCode.NETWORK_ERROR;
    let message = 'Network error occurred';
    let userMessage = 'Please check your internet connection and try again';

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      errorCode = ErrorCode.TIMEOUT_ERROR;
      message = 'Request timeout';
      userMessage = 'The request took too long. Please try again';
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorCode = ErrorCode.CONNECTION_ERROR;
      message = 'Connection failed';
      userMessage = 'Unable to connect to server. Please try again later';
    }

    return new ApiError({
      code: errorCode,
      message,
      userMessage,
      timestamp,
      requestId,
    });
  }

  /**
   * Create validation error
   */
  static validationError(
    message: string,
    field?: string,
    requestId?: string
  ): ApiError {
    return new ApiError({
      code: ErrorCode.VALIDATION_ERROR,
      message,
      userMessage: message,
      field,
      timestamp: new Date().toISOString(),
      requestId,
    });
  }

  /**
   * Create authentication error
   */
  static authError(
    code: ErrorCode,
    message: string,
    requestId?: string
  ): ApiError {
    const userMessage = this.getUserFriendlyMessage(code, message);
    
    return new ApiError({
      code,
      message,
      userMessage,
      statusCode: 401,
      timestamp: new Date().toISOString(),
      requestId,
    });
  }

  /**
   * Map HTTP status codes to error codes
   */
  private static mapStatusCodeToErrorCode(statusCode: number, serverCode?: string): ErrorCode {
    // Check for specific server error codes first
    if (serverCode) {
      const serverErrorCode = Object.values(ErrorCode).find(code => 
        code === serverCode.toUpperCase()
      );
      if (serverErrorCode) {
        return serverErrorCode;
      }
    }

    // Map by HTTP status code
    switch (statusCode) {
      case 400:
        return ErrorCode.BAD_REQUEST;
      case 401:
        return ErrorCode.UNAUTHORIZED;
      case 403:
        return ErrorCode.FORBIDDEN;
      case 404:
        return ErrorCode.NOT_FOUND;
      case 409:
        return ErrorCode.CONFLICT;
      case 422:
        return ErrorCode.VALIDATION_ERROR;
      case 429:
        return ErrorCode.RATE_LIMITED;
      case 500:
      case 502:
      case 503:
      case 504:
        return ErrorCode.SERVER_ERROR;
      default:
        return ErrorCode.UNKNOWN_ERROR;
    }
  }

  /**
   * Get user-friendly error messages
   */
  private static getUserFriendlyMessage(code: ErrorCode, serverMessage?: string): string {
    const messages: Record<ErrorCode, string> = {
      [ErrorCode.NETWORK_ERROR]: 'Please check your internet connection and try again',
      [ErrorCode.TIMEOUT_ERROR]: 'The request took too long. Please try again',
      [ErrorCode.CONNECTION_ERROR]: 'Unable to connect to server. Please try again later',
      [ErrorCode.BAD_REQUEST]: 'Invalid request. Please check your input and try again',
      [ErrorCode.UNAUTHORIZED]: 'Please log in to continue',
      [ErrorCode.FORBIDDEN]: 'You do not have permission to perform this action',
      [ErrorCode.NOT_FOUND]: 'The requested resource was not found',
      [ErrorCode.CONFLICT]: 'This action conflicts with existing data',
      [ErrorCode.VALIDATION_ERROR]: serverMessage || 'Please check your input and try again',
      [ErrorCode.RATE_LIMITED]: 'Too many requests. Please wait a moment and try again',
      [ErrorCode.SERVER_ERROR]: 'Server error occurred. Please try again later',
      [ErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
      [ErrorCode.TOKEN_EXPIRED]: 'Your session has expired. Please log in again',
      [ErrorCode.TOKEN_INVALID]: 'Invalid authentication token. Please log in again',
      [ErrorCode.ACCOUNT_LOCKED]: 'Your account has been locked. Please contact support',
      [ErrorCode.USER_NOT_FOUND]: 'User not found',
      [ErrorCode.EMAIL_ALREADY_EXISTS]: 'An account with this email already exists',
      [ErrorCode.USERNAME_TAKEN]: 'This username is already taken',
      [ErrorCode.INVALID_OTP]: 'Invalid verification code. Please try again',
      [ErrorCode.OTP_EXPIRED]: 'Verification code has expired. Please request a new one',
      [ErrorCode.INVALID_INPUT]: 'Invalid input provided',
      [ErrorCode.MISSING_REQUIRED_FIELD]: 'Required field is missing',
      [ErrorCode.INVALID_FORMAT]: 'Invalid format provided',
      [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again',
    };

    return messages[code] || messages[ErrorCode.UNKNOWN_ERROR];
  }
}
