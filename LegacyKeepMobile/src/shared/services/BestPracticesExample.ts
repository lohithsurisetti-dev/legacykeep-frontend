/**
 * Best Practices Usage Examples
 * 
 * Comprehensive examples showing how to use all the API best practices
 */

import { 
  authService, 
  userService, 
  apiAnalytics, 
  apiCache, 
  requestOptimizer, 
  inputValidator,
  getEndpointPath 
} from './index';

/**
 * Example 1: Basic API Call with All Best Practices
 */
export async function loginWithBestPractices(email: string, password: string) {
  try {
    // 1. Input Validation
    const validationSchema = inputValidator.getCommonSchemas();
    const validatedData = inputValidator.validateApiRequest(
      { email, password },
      {
        email: validationSchema.email,
        password: validationSchema.password,
      }
    );

    // 2. Request Deduplication (prevents multiple identical requests)
    const result = await requestOptimizer.deduplicate(
      `login:${email}`,
      () => authService.login(validatedData)
    );

    // 3. Analytics tracking is automatic via HttpClient
    // 4. Error handling is automatic via ApiError system
    // 5. Token storage is automatic via AuthService

    return result;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

/**
 * Example 2: Cached API Call with Offline Support
 */
export async function getUserProfileWithCache(userId: number) {
  try {
    // 1. Generate cache key
    const cacheKey = apiCache.generateKey('user', getEndpointPath('user', 'getProfile'), { userId });

    // 2. Try cache first
    const cachedData = await apiCache.get(cacheKey);
    if (cachedData) {
      console.log('📱 Using cached profile data');
      return cachedData;
    }

    // 3. Make API call if not cached
    const profile = await userService.getProfile(userId);

    // 4. Cache the result (5 minutes TTL)
    await apiCache.set(cacheKey, profile, 5 * 60 * 1000);

    return profile;
  } catch (error) {
    // 5. Try cache as fallback if offline
    if (!apiCache.isOnlineMode()) {
      const cacheKey = apiCache.generateKey('user', getEndpointPath('user', 'getProfile'), { userId });
      const cachedData = await apiCache.get(cacheKey);
      if (cachedData) {
        console.log('📱 Using cached data (offline mode)');
        return cachedData;
      }
    }
    throw error;
  }
}

/**
 * Example 3: Batched Requests for Better Performance
 */
export async function loadMultipleProfiles(userIds: number[]) {
  try {
    // Batch multiple profile requests together
    const profilePromises = userIds.map(userId => 
      requestOptimizer.batch(
        'profiles-batch',
        `profile-${userId}`,
        () => userService.getProfile(userId),
        { maxWaitTime: 100, maxBatchSize: 5 }
      )
    );

    const profiles = await Promise.all(profilePromises);
    return profiles;
  } catch (error) {
    console.error('Failed to load profiles:', error);
    throw error;
  }
}

/**
 * Example 4: Comprehensive Registration with All Best Practices
 */
export async function registerWithAllBestPractices(userData: any) {
  try {
    // 1. Input Validation & Sanitization
    const validationSchema = inputValidator.getCommonSchemas();
    const validatedData = inputValidator.validateApiRequest(userData, {
      email: validationSchema.email,
      username: validationSchema.username,
      password: validationSchema.password,
      firstName: validationSchema.firstName,
      lastName: validationSchema.lastName,
    });

    // 2. Request Deduplication (prevent duplicate registrations)
    const registrationResult = await requestOptimizer.deduplicate(
      `register:${validatedData.email}`,
      () => authService.register(validatedData),
      5000 // 5 second deduplication window
    );

    // 3. Cache user profile data
    if (registrationResult.data?.id) {
      const profileCacheKey = apiCache.generateKey('user', 'profile', { userId: registrationResult.data.id });
      await apiCache.set(profileCacheKey, registrationResult.data, 10 * 60 * 1000); // 10 minutes
    }

    // 4. Analytics tracking is automatic
    // 5. Error handling is automatic
    // 6. Token storage is automatic

    return registrationResult;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

/**
 * Example 5: API Health Monitoring
 */
export function checkApiHealth() {
  const healthMetrics = apiAnalytics.getAllHealthMetrics();
  const performanceSummary = apiAnalytics.getPerformanceSummary();
  const cacheStats = apiCache.getStats();

  console.log('🏥 API Health Report:', {
    services: Object.fromEntries(healthMetrics),
    performance: performanceSummary,
    cache: cacheStats,
  });

  // Check for unhealthy services
  for (const [service, metrics] of healthMetrics) {
    if (!metrics.isHealthy) {
      console.warn(`⚠️ Service ${service} is unhealthy:`, metrics);
    }
  }

  return {
    health: healthMetrics,
    performance: performanceSummary,
    cache: cacheStats,
  };
}

/**
 * Example 6: Smart Search with Caching and Debouncing
 */
export function createSmartSearch(searchFunction: (query: string) => Promise<any[]>) {
  // Debounce search requests (wait 300ms after user stops typing)
  const debouncedSearch = requestOptimizer.debounce(async (query: string) => {
    if (!query.trim()) return [];

    try {
      // Check cache first
      const cacheKey = apiCache.generateKey('search', 'profiles', { query });
      const cachedResults = await apiCache.get(cacheKey);
      
      if (cachedResults) {
        return cachedResults;
      }

      // Make API call
      const results = await searchFunction(query);
      
      // Cache results for 2 minutes
      await apiCache.set(cacheKey, results, 2 * 60 * 1000);
      
      return results;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }, 300);

  return debouncedSearch;
}

/**
 * Example 7: Offline-First Data Loading
 */
export async function loadDataOfflineFirst<T>(
  cacheKey: string,
  apiCall: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
): Promise<T> {
  try {
    // 1. Try cache first (works offline)
    const cachedData = await apiCache.get<T>(cacheKey);
    if (cachedData) {
      console.log('📱 Using cached data');
      return cachedData;
    }

    // 2. Make API call if online
    if (apiCache.isOnlineMode()) {
      const freshData = await apiCall();
      await apiCache.set(cacheKey, freshData, ttl);
      return freshData;
    }

    // 3. If offline and no cache, throw error
    throw new Error('No cached data available and device is offline');
  } catch (error) {
    // 4. Last resort: try cache again
    const cachedData = await apiCache.get<T>(cacheKey);
    if (cachedData) {
      console.log('📱 Using stale cached data as fallback');
      return cachedData;
    }
    throw error;
  }
}

/**
 * Example 8: Performance Monitoring
 */
export function setupPerformanceMonitoring() {
  // Log performance summary every 30 seconds
  setInterval(() => {
    const summary = apiAnalytics.getPerformanceSummary();
    
    if (summary.totalRequests > 0) {
      console.log('📊 Performance Summary:', {
        totalRequests: summary.totalRequests,
        averageResponseTime: `${summary.averageResponseTime.toFixed(2)}ms`,
        errorRate: `${summary.errorRate.toFixed(2)}%`,
        slowestEndpoints: summary.slowestEndpoints.slice(0, 3),
        mostFailingEndpoints: summary.mostFailingEndpoints.slice(0, 3),
      });
    }
  }, 30000);

  // Log cache stats every minute
  setInterval(() => {
    const cacheStats = apiCache.getStats();
    console.log('💾 Cache Stats:', {
      entries: cacheStats.totalEntries,
      hitRate: `${cacheStats.hitRate.toFixed(2)}%`,
      size: `${(cacheStats.cacheSize / 1024).toFixed(2)}KB`,
    });
  }, 60000);
}

/**
 * Example 9: Error Recovery and Retry Logic
 */
export async function resilientApiCall<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`🔄 Retry attempt ${attempt}/${maxRetries} in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Example 10: Complete API Service with All Best Practices
 */
export class EnhancedApiService {
  /**
   * Get user profile with all optimizations
   */
  async getUserProfile(userId: number) {
    const cacheKey = apiCache.generateKey('user', 'profile', { userId });
    
    return this.loadDataOfflineFirst(
      cacheKey,
      () => userService.getProfile(userId),
      5 * 60 * 1000 // 5 minutes cache
    );
  }

  /**
   * Search users with debouncing and caching
   */
  async searchUsers(query: string) {
    if (!query.trim()) return [];

    const cacheKey = apiCache.generateKey('user', 'search', { query });
    
    return requestOptimizer.deduplicate(
      `search:${query}`,
      () => this.loadDataOfflineFirst(
        cacheKey,
        () => userService.searchProfiles(query),
        2 * 60 * 1000 // 2 minutes cache
      )
    );
  }

  /**
   * Batch load multiple profiles
   */
  async loadMultipleProfiles(userIds: number[]) {
    const profilePromises = userIds.map(userId => 
      requestOptimizer.batch(
        'profiles-batch',
        `profile-${userId}`,
        () => this.getUserProfile(userId),
        { maxWaitTime: 100, maxBatchSize: 5 }
      )
    );

    return Promise.all(profilePromises);
  }

  private async loadDataOfflineFirst<T>(
    cacheKey: string,
    apiCall: () => Promise<T>,
    ttl: number
  ): Promise<T> {
    // Try cache first
    const cachedData = await apiCache.get<T>(cacheKey);
    if (cachedData) return cachedData;

    // Make API call
    const freshData = await apiCall();
    await apiCache.set(cacheKey, freshData, ttl);
    return freshData;
  }
}

// Export enhanced service instance
export const enhancedApiService = new EnhancedApiService();
