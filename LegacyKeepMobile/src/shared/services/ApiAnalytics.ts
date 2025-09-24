/**
 * API Analytics & Monitoring
 * 
 * Comprehensive request/response tracking, performance monitoring, and analytics
 */

export interface RequestMetrics {
  requestId: string;
  service: string;
  endpoint: string;
  method: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  statusCode?: number;
  success: boolean;
  errorType?: string;
  requestSize?: number;
  responseSize?: number;
  retryCount: number;
  userAgent: string;
  timestamp: string;
}

export interface ApiHealthMetrics {
  service: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  errorRate: number;
  lastRequestTime: string;
  isHealthy: boolean;
}

export interface PerformanceThresholds {
  warningResponseTime: number; // ms
  criticalResponseTime: number; // ms
  maxErrorRate: number; // percentage
  maxRetryAttempts: number;
}

/**
 * API Analytics Service
 */
export class ApiAnalytics {
  private metrics: Map<string, RequestMetrics> = new Map();
  private healthMetrics: Map<string, ApiHealthMetrics> = new Map();
  private performanceThresholds: PerformanceThresholds = {
    warningResponseTime: 2000,
    criticalResponseTime: 5000,
    maxErrorRate: 10,
    maxRetryAttempts: 3,
  };

  /**
   * Track request start
   */
  trackRequestStart(
    requestId: string,
    service: string,
    endpoint: string,
    method: string,
    requestSize?: number
  ): void {
    const metrics: RequestMetrics = {
      requestId,
      service,
      endpoint,
      method,
      startTime: Date.now(),
      success: false,
      retryCount: 0,
      userAgent: this.getUserAgent(),
      timestamp: new Date().toISOString(),
      requestSize,
    };

    this.metrics.set(requestId, metrics);
    
    if (__DEV__) {
      console.log(`📊 API Analytics: Request started`, {
        requestId,
        service,
        endpoint,
        method,
        requestSize,
      });
    }
  }

  /**
   * Track request completion
   */
  trackRequestEnd(
    requestId: string,
    statusCode: number,
    success: boolean,
    errorType?: string,
    responseSize?: number
  ): void {
    const metrics = this.metrics.get(requestId);
    if (!metrics) return;

    const endTime = Date.now();
    const duration = endTime - metrics.startTime;

    metrics.endTime = endTime;
    metrics.duration = duration;
    metrics.statusCode = statusCode;
    metrics.success = success;
    metrics.errorType = errorType;
    metrics.responseSize = responseSize;

    this.metrics.set(requestId, metrics);
    this.updateHealthMetrics(metrics);

    // Log performance warnings
    this.checkPerformanceThresholds(metrics);

    if (__DEV__) {
      console.log(`📊 API Analytics: Request completed`, {
        requestId,
        service: metrics.service,
        endpoint: metrics.endpoint,
        duration: `${duration}ms`,
        statusCode,
        success,
        responseSize,
      });
    }

    // Clean up old metrics (keep last 1000)
    if (this.metrics.size > 1000) {
      const oldestKey = this.metrics.keys().next().value;
      if (oldestKey) {
        this.metrics.delete(oldestKey);
      }
    }
  }

  /**
   * Track retry attempt
   */
  trackRetry(requestId: string): void {
    const metrics = this.metrics.get(requestId);
    if (metrics) {
      metrics.retryCount++;
      this.metrics.set(requestId, metrics);
    }
  }

  /**
   * Get health metrics for a service
   */
  getHealthMetrics(service: string): ApiHealthMetrics | null {
    return this.healthMetrics.get(service) || null;
  }

  /**
   * Get all health metrics
   */
  getAllHealthMetrics(): Map<string, ApiHealthMetrics> {
    return new Map(this.healthMetrics);
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    slowestEndpoints: Array<{ endpoint: string; averageTime: number }>;
    mostFailingEndpoints: Array<{ endpoint: string; errorRate: number }>;
  } {
    const allMetrics = Array.from(this.metrics.values());
    const totalRequests = allMetrics.length;
    
    if (totalRequests === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        slowestEndpoints: [],
        mostFailingEndpoints: [],
      };
    }

    const successfulRequests = allMetrics.filter(m => m.success);
    const failedRequests = allMetrics.filter(m => !m.success);
    const averageResponseTime = successfulRequests.reduce((sum, m) => sum + (m.duration || 0), 0) / successfulRequests.length;
    const errorRate = (failedRequests.length / totalRequests) * 100;

    // Group by endpoint for analysis
    const endpointMetrics = new Map<string, { total: number; successful: number; totalTime: number }>();
    
    allMetrics.forEach(metric => {
      const key = `${metric.service}:${metric.endpoint}`;
      const existing = endpointMetrics.get(key) || { total: 0, successful: 0, totalTime: 0 };
      existing.total++;
      if (metric.success) existing.successful++;
      if (metric.duration) existing.totalTime += metric.duration;
      endpointMetrics.set(key, existing);
    });

    const slowestEndpoints = Array.from(endpointMetrics.entries())
      .map(([endpoint, data]) => ({
        endpoint,
        averageTime: data.totalTime / data.total,
      }))
      .sort((a, b) => b.averageTime - a.averageTime)
      .slice(0, 5);

    const mostFailingEndpoints = Array.from(endpointMetrics.entries())
      .map(([endpoint, data]) => ({
        endpoint,
        errorRate: ((data.total - data.successful) / data.total) * 100,
      }))
      .filter(item => item.errorRate > 0)
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, 5);

    return {
      totalRequests,
      averageResponseTime,
      errorRate,
      slowestEndpoints,
      mostFailingEndpoints,
    };
  }

  /**
   * Update health metrics for a service
   */
  private updateHealthMetrics(metrics: RequestMetrics): void {
    const existing = this.healthMetrics.get(metrics.service) || {
      service: metrics.service,
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      errorRate: 0,
      lastRequestTime: '',
      isHealthy: true,
    };

    existing.totalRequests++;
    if (metrics.success) {
      existing.successfulRequests++;
    } else {
      existing.failedRequests++;
    }

    // Update average response time
    if (metrics.duration) {
      const totalTime = existing.averageResponseTime * (existing.totalRequests - 1) + metrics.duration;
      existing.averageResponseTime = totalTime / existing.totalRequests;
    }

    existing.errorRate = (existing.failedRequests / existing.totalRequests) * 100;
    existing.lastRequestTime = metrics.timestamp;
    existing.isHealthy = existing.errorRate < this.performanceThresholds.maxErrorRate;

    this.healthMetrics.set(metrics.service, existing);
  }

  /**
   * Check performance thresholds and log warnings
   */
  private checkPerformanceThresholds(metrics: RequestMetrics): void {
    if (!metrics.duration) return;

    if (metrics.duration > this.performanceThresholds.criticalResponseTime) {
      console.warn(`🚨 CRITICAL: API response time exceeded threshold`, {
        service: metrics.service,
        endpoint: metrics.endpoint,
        duration: `${metrics.duration}ms`,
        threshold: `${this.performanceThresholds.criticalResponseTime}ms`,
      });
    } else if (metrics.duration > this.performanceThresholds.warningResponseTime) {
      console.warn(`⚠️ WARNING: API response time exceeded warning threshold`, {
        service: metrics.service,
        endpoint: metrics.endpoint,
        duration: `${metrics.duration}ms`,
        threshold: `${this.performanceThresholds.warningResponseTime}ms`,
      });
    }

    if (metrics.retryCount > this.performanceThresholds.maxRetryAttempts) {
      console.warn(`🔄 WARNING: Excessive retry attempts`, {
        service: metrics.service,
        endpoint: metrics.endpoint,
        retryCount: metrics.retryCount,
        threshold: this.performanceThresholds.maxRetryAttempts,
      });
    }
  }

  /**
   * Get user agent string
   */
  private getUserAgent(): string {
    return `LegacyKeep-Mobile/1.0.0 (${__DEV__ ? 'Development' : 'Production'})`;
  }

  /**
   * Export metrics for external analysis
   */
  exportMetrics(): {
    requests: RequestMetrics[];
    health: ApiHealthMetrics[];
    summary: {
      totalRequests: number;
      averageResponseTime: number;
      errorRate: number;
      slowestEndpoints: Array<{ endpoint: string; averageTime: number }>;
      mostFailingEndpoints: Array<{ endpoint: string; errorRate: number }>;
    };
  } {
    return {
      requests: Array.from(this.metrics.values()),
      health: Array.from(this.healthMetrics.values()),
      summary: this.getPerformanceSummary(),
    };
  }

  /**
   * Clear all metrics (useful for testing)
   */
  clearMetrics(): void {
    this.metrics.clear();
    this.healthMetrics.clear();
  }
}

// Export singleton instance
export const apiAnalytics = new ApiAnalytics();
