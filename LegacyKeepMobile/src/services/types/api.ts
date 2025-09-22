/**
 * API Types
 * 
 * Type definitions for API requests and responses
 */

// =============================================================================
// Base API Response (matches backend ApiResponse<T>)
// =============================================================================

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  timestamp: string;
  error?: string;
  statusCode: number;
  path?: string;
}

// =============================================================================
// Common API Types
// =============================================================================

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  field?: string;
}

// =============================================================================
// HTTP Request Configuration
// =============================================================================

export interface RequestConfig {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

// =============================================================================
// Network Status
// =============================================================================

export interface NetworkStatus {
  isConnected: boolean;
  connectionType: 'wifi' | 'cellular' | 'none' | 'unknown';
}
