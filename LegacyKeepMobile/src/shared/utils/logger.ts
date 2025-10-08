/**
 * Logger Utility
 * 
 * Centralized logging with environment-aware behavior
 * - Development: All logs enabled
 * - Production: Only errors and critical warnings
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enableDebug: boolean;
  enableInfo: boolean;
  enableWarn: boolean;
  enableError: boolean;
  prefix?: string;
}

class Logger {
  private config: LoggerConfig;

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      enableDebug: __DEV__,
      enableInfo: __DEV__,
      enableWarn: true,
      enableError: true,
      ...config,
    };
  }

  /**
   * Debug logs - only in development
   */
  debug(message: string, ...args: any[]): void {
    if (this.config.enableDebug) {
      const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
      console.log(`${prefix} 🔍 DEBUG:`, message, ...args);
    }
  }

  /**
   * Info logs - only in development
   */
  info(message: string, ...args: any[]): void {
    if (this.config.enableInfo) {
      const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
      console.log(`${prefix} ℹ️ INFO:`, message, ...args);
    }
  }

  /**
   * Log - general purpose logging (only in development)
   */
  log(message: string, ...args: any[]): void {
    if (this.config.enableInfo) {
      const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
      console.log(`${prefix}`, message, ...args);
    }
  }

  /**
   * Warning logs - always enabled
   */
  warn(message: string, ...args: any[]): void {
    if (this.config.enableWarn) {
      const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
      console.warn(`${prefix} ⚠️ WARN:`, message, ...args);
    }
  }

  /**
   * Error logs - always enabled
   */
  error(message: string, error?: any, ...args: any[]): void {
    if (this.config.enableError) {
      const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
      console.error(`${prefix} ❌ ERROR:`, message, error, ...args);
    }
  }

  /**
   * Success logs - only in development
   */
  success(message: string, ...args: any[]): void {
    if (this.config.enableInfo) {
      const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
      console.log(`${prefix} ✅`, message, ...args);
    }
  }

  /**
   * Create a child logger with a specific prefix
   */
  child(prefix: string): Logger {
    return new Logger({
      ...this.config,
      prefix: this.config.prefix ? `${this.config.prefix}:${prefix}` : prefix,
    });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export named loggers for specific modules
export const apiLogger = new Logger({ prefix: 'API' });
export const authLogger = new Logger({ prefix: 'AUTH' });
export const navigationLogger = new Logger({ prefix: 'NAV' });
export const storageLogger = new Logger({ prefix: 'STORAGE' });
export const uiLogger = new Logger({ prefix: 'UI' });

// Export class for custom loggers
export { Logger };
