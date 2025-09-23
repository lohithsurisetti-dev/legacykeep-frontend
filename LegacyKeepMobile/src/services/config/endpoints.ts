/**
 * API Endpoints Configuration
 * 
 * Single source of truth for all API endpoint paths
 * No hardcoded endpoints anywhere in the codebase
 */

export interface AuthEndpoints {
  login: string;
  register: string;
  generateOtp: string;
  verifyOtp: string;
  refreshToken: string;
  logout: string;
  forgotPassword: string;
  resetPassword: string;
  changePassword: string;
  validateUsername: string;
}

export interface UserEndpoints {
  createProfile: string;
  getProfile: string;
  updateProfile: string;
  deleteProfile: string;
  getProfiles: string;
  searchProfiles: string;
  uploadProfilePicture: string;
  deleteProfilePicture: string;
}

export interface NotificationEndpoints {
  getNotifications: string;
  markAsRead: string;
  deleteNotification: string;
  updatePreferences: string;
}

export interface ServiceEndpoints {
  auth: AuthEndpoints;
  user: UserEndpoints;
  notification: NotificationEndpoints;
}

/**
 * All API endpoint paths - Single source of truth
 */
export const API_ENDPOINTS: ServiceEndpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    generateOtp: '/auth/generate-otp',
    verifyOtp: '/auth/verify-otp',
    refreshToken: '/auth/refresh',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/change-password',
    validateUsername: '/auth/validate/username',
  },
  user: {
    createProfile: '/profiles',
    getProfile: '/profiles/me',
    updateProfile: '/profiles',
    deleteProfile: '/profiles',
    getProfiles: '/profiles',
    searchProfiles: '/profiles/search',
    uploadProfilePicture: '/profiles/picture',
    deleteProfilePicture: '/profiles/picture',
  },
  notification: {
    getNotifications: '/notifications',
    markAsRead: '/notifications',
    deleteNotification: '/notifications',
    updatePreferences: '/notifications/preferences',
  },
};

/**
 * Get endpoint path for specific service and operation
 */
export function getEndpointPath<T extends keyof ServiceEndpoints>(
  service: T,
  operation: keyof ServiceEndpoints[T]
): string {
  return API_ENDPOINTS[service][operation] as string;
}

/**
 * Build full URL with query parameters
 */
export function buildEndpointUrl(
  service: keyof ServiceEndpoints,
  operation: string,
  params?: Record<string, string | number>
): string {
  let endpoint = operation;
  
  if (params) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');
    
    if (queryString) {
      endpoint += `?${queryString}`;
    }
  }
  
  return endpoint;
}
