/**
 * Services Index
 * 
 * Clean, organized exports for all services
 * Modern API architecture with proper error handling
 */

// =============================================================================
// API Services
// =============================================================================

export { authService } from './api/AuthService';
export { userService } from './api/UserService';
export { httpClient } from './api/HttpClient';

// =============================================================================
// Storage Services
// =============================================================================

export { tokenStorage } from './storage/tokenStorage';

// =============================================================================
// Configuration
// =============================================================================

export { getApiConfig, getEndpoint } from './config/apiConfig';
export { getEndpointPath, buildEndpointUrl, API_ENDPOINTS } from './config/endpoints';

// =============================================================================
// Error Handling
// =============================================================================

export { 
  ApiError, 
  ApiErrorFactory, 
  ErrorCode 
} from './errors/ApiError';

// =============================================================================
// Monitoring & Analytics
// =============================================================================

export { apiAnalytics } from './monitoring/ApiAnalytics';

// =============================================================================
// Caching & Offline Support
// =============================================================================

export { apiCache } from './cache/ApiCache';

// =============================================================================
// Request Optimization
// =============================================================================

export { requestOptimizer } from './optimization/RequestOptimizer';

// =============================================================================
// Input Validation
// =============================================================================

export { inputValidator } from './validation/InputValidator';

// =============================================================================
// Types
// =============================================================================

export * from './types/ApiTypes';

// =============================================================================
// Legacy Compatibility (for gradual migration)
// =============================================================================

// Re-export with legacy names for backward compatibility
export { authService as authApi } from './api/AuthService';
export { userService as userApi } from './api/UserService';
export { httpClient as apiClient } from './api/HttpClient';