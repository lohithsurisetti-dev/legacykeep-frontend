/**
 * API Response Caching
 * 
 * Intelligent caching system with offline support, TTL, and cache invalidation
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
  etag?: string;
  lastModified?: string;
  key: string;
}

export interface CacheConfig {
  defaultTtl: number; // Default TTL in milliseconds
  maxSize: number; // Maximum number of cache entries
  enableOfflineMode: boolean;
  enableCompression: boolean;
}

export interface CacheStats {
  totalEntries: number;
  hitRate: number;
  missRate: number;
  totalHits: number;
  totalMisses: number;
  cacheSize: number; // in bytes
  oldestEntry: number;
  newestEntry: number;
}

/**
 * API Cache Service
 */
export class ApiCache {
  private cache: Map<string, CacheEntry> = new Map();
  private config: CacheConfig = {
    defaultTtl: 5 * 60 * 1000, // 5 minutes
    maxSize: 1000,
    enableOfflineMode: true,
    enableCompression: false,
  };
  private stats = {
    hits: 0,
    misses: 0,
  };
  private isOnline: boolean = true;

  constructor() {
    this.initializeNetworkListener();
    this.loadCacheFromStorage();
  }

  /**
   * Get cached data
   */
  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if entry is expired
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    
    if (__DEV__) {
      console.log(`💾 Cache HIT: ${key}`, {
        age: Date.now() - entry.timestamp,
        ttl: entry.ttl,
      });
    }

    return entry.data as T;
  }

  /**
   * Set cached data
   */
  async set<T>(
    key: string, 
    data: T, 
    ttl?: number, 
    etag?: string, 
    lastModified?: string
  ): Promise<void> {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTtl,
      etag,
      lastModified,
      key,
    };

    this.cache.set(key, entry);
    
    // Enforce max size
    if (this.cache.size > this.config.maxSize) {
      this.evictOldestEntry();
    }

    // Persist to storage
    await this.persistCacheToStorage();

    if (__DEV__) {
      console.log(`💾 Cache SET: ${key}`, {
        ttl: entry.ttl,
        size: JSON.stringify(data).length,
      });
    }
  }

  /**
   * Delete cached data
   */
  async delete(key: string): Promise<void> {
    this.cache.delete(key);
    await this.persistCacheToStorage();
    
    if (__DEV__) {
      console.log(`💾 Cache DELETE: ${key}`);
    }
  }

  /**
   * Clear all cached data
   */
  async clear(): Promise<void> {
    this.cache.clear();
    await AsyncStorage.removeItem('api_cache');
    
    if (__DEV__) {
      console.log(`💾 Cache CLEARED`);
    }
  }

  /**
   * Invalidate cache by pattern
   */
  async invalidatePattern(pattern: string): Promise<void> {
    const regex = new RegExp(pattern);
    const keysToDelete: string[] = [];

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
    await this.persistCacheToStorage();

    if (__DEV__) {
      console.log(`💾 Cache INVALIDATED: ${pattern} (${keysToDelete.length} entries)`);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;
    const missRate = totalRequests > 0 ? (this.stats.misses / totalRequests) * 100 : 0;

    let cacheSize = 0;
    let oldestEntry = Date.now();
    let newestEntry = 0;

    for (const entry of this.cache.values()) {
      cacheSize += JSON.stringify(entry.data).length;
      oldestEntry = Math.min(oldestEntry, entry.timestamp);
      newestEntry = Math.max(newestEntry, entry.timestamp);
    }

    return {
      totalEntries: this.cache.size,
      hitRate,
      missRate,
      totalHits: this.stats.hits,
      totalMisses: this.stats.misses,
      cacheSize,
      oldestEntry,
      newestEntry,
    };
  }

  /**
   * Check if we're online
   */
  isOnlineMode(): boolean {
    return this.isOnline;
  }

  /**
   * Generate cache key from request parameters
   */
  generateKey(service: string, endpoint: string, params?: any): string {
    const baseKey = `${service}:${endpoint}`;
    
    if (!params) {
      return baseKey;
    }

    // Sort params for consistent keys
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result, key) => {
        result[key] = params[key];
        return result;
      }, {} as any);

    const paramString = JSON.stringify(sortedParams);
    return `${baseKey}:${this.hashString(paramString)}`;
  }

  /**
   * Check if entry is expired
   */
  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  /**
   * Evict oldest cache entry
   */
  private evictOldestEntry(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Load cache from persistent storage
   */
  private async loadCacheFromStorage(): Promise<void> {
    try {
      const cached = await AsyncStorage.getItem('api_cache');
      if (cached) {
        const data = JSON.parse(cached);
        this.cache = new Map(data);
        
        // Remove expired entries
        for (const [key, entry] of this.cache.entries()) {
          if (this.isExpired(entry)) {
            this.cache.delete(key);
          }
        }

        if (__DEV__) {
          console.log(`💾 Cache loaded from storage: ${this.cache.size} entries`);
        }
      }
    } catch (error) {
      console.error('Failed to load cache from storage:', error);
    }
  }

  /**
   * Persist cache to storage
   */
  private async persistCacheToStorage(): Promise<void> {
    try {
      const data = Array.from(this.cache.entries());
      await AsyncStorage.setItem('api_cache', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to persist cache to storage:', error);
    }
  }

  /**
   * Initialize network status listener
   */
  private initializeNetworkListener(): void {
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected ?? false;
      
      if (__DEV__) {
        console.log(`🌐 Network status: ${this.isOnline ? 'ONLINE' : 'OFFLINE'}`);
      }
    });
  }

  /**
   * Simple hash function for cache keys
   */
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

// Export singleton instance
export const apiCache = new ApiCache();
