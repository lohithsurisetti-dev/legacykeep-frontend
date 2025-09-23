/**
 * Request Optimization
 * 
 * Request deduplication, batching, and optimization utilities
 */

export interface PendingRequest<T = any> {
  promise: Promise<T>;
  timestamp: number;
  resolve: (value: T) => void;
  reject: (error: any) => void;
}

export interface BatchRequest<T = any> {
  id: string;
  requests: Array<{
    key: string;
    request: () => Promise<T>;
    resolve: (value: T) => void;
    reject: (error: any) => void;
  }>;
  maxWaitTime: number;
  maxBatchSize: number;
}

/**
 * Request Optimizer Service
 */
export class RequestOptimizer {
  private pendingRequests: Map<string, PendingRequest> = new Map();
  private batchQueues: Map<string, BatchRequest> = new Map();
  private batchTimers: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Deduplicate identical requests
   */
  async deduplicate<T>(
    key: string,
    requestFn: () => Promise<T>,
    ttl: number = 1000 // 1 second default
  ): Promise<T> {
    // Check if request is already pending
    const existing = this.pendingRequests.get(key);
    if (existing) {
      if (__DEV__) {
        console.log(`🔄 Request deduplicated: ${key}`);
      }
      return existing.promise;
    }

    // Create new request
    let resolve: (value: T) => void;
    let reject: (error: any) => void;

    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const pendingRequest: PendingRequest<T> = {
      promise,
      timestamp: Date.now(),
      resolve: resolve!,
      reject: reject!,
    };

    this.pendingRequests.set(key, pendingRequest);

    try {
      const result = await requestFn();
      pendingRequest.resolve(result);
      return result;
    } catch (error) {
      pendingRequest.reject(error);
      throw error;
    } finally {
      // Clean up after TTL
      setTimeout(() => {
        this.pendingRequests.delete(key);
      }, ttl);
    }
  }

  /**
   * Batch multiple requests together
   */
  async batch<T>(
    batchId: string,
    requestKey: string,
    requestFn: () => Promise<T>,
    options: {
      maxWaitTime?: number;
      maxBatchSize?: number;
    } = {}
  ): Promise<T> {
    const { maxWaitTime = 100, maxBatchSize = 10 } = options;

    return new Promise<T>((resolve, reject) => {
      // Get or create batch queue
      let batch = this.batchQueues.get(batchId);
      if (!batch) {
        batch = {
          id: batchId,
          requests: [],
          maxWaitTime,
          maxBatchSize,
        };
        this.batchQueues.set(batchId, batch);
      }

      // Add request to batch
      batch.requests.push({
        key: requestKey,
        request: requestFn,
        resolve,
        reject,
      });

      // Check if batch should be executed
      if (batch.requests.length >= maxBatchSize) {
        this.executeBatch(batchId);
      } else if (batch.requests.length === 1) {
        // Start timer for first request
        const timer = setTimeout(() => {
          this.executeBatch(batchId);
        }, maxWaitTime);
        this.batchTimers.set(batchId, timer);
      }
    });
  }

  /**
   * Execute a batch of requests
   */
  private async executeBatch(batchId: string): Promise<void> {
    const batch = this.batchQueues.get(batchId);
    if (!batch || batch.requests.length === 0) return;

    // Clear timer
    const timer = this.batchTimers.get(batchId);
    if (timer) {
      clearTimeout(timer);
      this.batchTimers.delete(batchId);
    }

    // Remove batch from queue
    this.batchQueues.delete(batchId);

    if (__DEV__) {
      console.log(`🔄 Executing batch: ${batchId} (${batch.requests.length} requests)`);
    }

    // Execute all requests in parallel
    const promises = batch.requests.map(async ({ request, resolve, reject }) => {
      try {
        const result = await request();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Debounce function calls
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle function calls
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Get pending requests count
   */
  getPendingRequestsCount(): number {
    return this.pendingRequests.size;
  }

  /**
   * Get batch queues count
   */
  getBatchQueuesCount(): number {
    return this.batchQueues.size;
  }

  /**
   * Clear all pending requests and batches
   */
  clear(): void {
    // Reject all pending requests
    for (const [key, request] of this.pendingRequests.entries()) {
      request.reject(new Error('Request cancelled'));
    }
    this.pendingRequests.clear();

    // Clear all batch timers
    for (const timer of this.batchTimers.values()) {
      clearTimeout(timer);
    }
    this.batchTimers.clear();

    // Reject all batched requests
    for (const [batchId, batch] of this.batchQueues.entries()) {
      for (const { reject } of batch.requests) {
        reject(new Error('Batch cancelled'));
      }
    }
    this.batchQueues.clear();

    if (__DEV__) {
      console.log(`🔄 Request optimizer cleared`);
    }
  }
}

// Export singleton instance
export const requestOptimizer = new RequestOptimizer();
