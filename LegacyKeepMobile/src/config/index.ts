/**
 * LegacyKeep Configuration Export
 *
 * Centralized export of all configuration modules
 */

export { environmentManager } from './environments';
export type { AppConfig, Environment } from './environments';

// Re-export environment manager as default
export { default } from './environments';
