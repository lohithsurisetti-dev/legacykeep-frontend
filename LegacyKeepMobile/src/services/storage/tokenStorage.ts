/**
 * Token Storage Service
 * 
 * Secure storage for JWT tokens using react-native-keychain
 */

import * as Keychain from 'react-native-keychain';
// Fallback for Expo environments where Keychain may be unavailable
// eslint-disable-next-line import/no-extraneous-dependencies
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// =============================================================================
// Constants
// =============================================================================

const KEYCHAIN_SERVICE = 'LegacyKeepTokens';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';
const USER_ID_KEY = 'userId';

// =============================================================================
// Types
// =============================================================================

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  userId: number;
}

// =============================================================================
// Token Storage Service
// =============================================================================

class TokenStorageService {
  private isSecureStoreAvailable: boolean = false;

  constructor() {
    this.checkSecureStoreAvailability();
  }

  private async checkSecureStoreAvailability() {
    try {
      this.isSecureStoreAvailable = await SecureStore.isAvailableAsync();
      console.log('🔍 TOKEN STORAGE: SecureStore available:', this.isSecureStoreAvailable);
    } catch (error) {
      console.error('❌ TOKEN STORAGE: Failed to check SecureStore availability:', error);
      this.isSecureStoreAvailable = false;
    }
  }
  
  /**
   * Store JWT tokens securely
   */
  async storeTokens(tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number; // seconds
    userId?: number;
    refreshExpiresIn?: number;
  }): Promise<void> {
    try {
      const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000);
      
      // Try Keychain first, fallback to SecureStore if it fails
      let keychainWorked = false;
      if (Keychain && Keychain.setInternetCredentials) {
        try {
          console.log('🔍 TOKEN STORAGE: Attempting to use Keychain for token storage');
          await Keychain.setInternetCredentials(
            KEYCHAIN_SERVICE,
            ACCESS_TOKEN_KEY,
            tokens.accessToken
          );
          
          await Keychain.setInternetCredentials(
            `${KEYCHAIN_SERVICE}_refresh`,
            REFRESH_TOKEN_KEY,
            tokens.refreshToken
          );
          keychainWorked = true;
          console.log('✅ TOKEN STORAGE: Successfully stored tokens in Keychain');
        } catch (keychainError: any) {
          console.warn('⚠️ TOKEN STORAGE: Keychain failed, falling back to SecureStore:', keychainError.message);
        }
      }
      
      if (!keychainWorked && this.isSecureStoreAvailable) {
        console.log('🔍 TOKEN STORAGE: Using SecureStore for token storage');
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken, { keychainService: KEYCHAIN_SERVICE });
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken, { keychainService: `${KEYCHAIN_SERVICE}_refresh` });
      } else {
        console.warn('⚠️ TOKEN STORAGE: No secure storage available, storing in AsyncStorage (less secure)');
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
      }

      // Store non-sensitive metadata in AsyncStorage
      const multiSetPairs: [string, string][] = [[TOKEN_EXPIRY_KEY, expiresAt.toISOString()]];
      if (typeof tokens.userId === 'number') {
        multiSetPairs.push([USER_ID_KEY, tokens.userId.toString()]);
      }
      await AsyncStorage.multiSet(multiSetPairs);
      
    } catch (error) {
      console.error('Failed to store tokens:', error);
      throw new Error('Failed to store authentication tokens');
    }
  }

  /**
   * Retrieve stored tokens
   */
  async getTokens(): Promise<StoredTokens | null> {
    try {
      let accessToken: string | null = null;
      let refreshToken: string | null = null;

      // Try Keychain first, fallback to SecureStore if it fails
      if (Keychain && Keychain.getInternetCredentials) {
        try {
          const accessTokenResult = await Keychain.getInternetCredentials(KEYCHAIN_SERVICE);
          const refreshTokenResult = await Keychain.getInternetCredentials(`${KEYCHAIN_SERVICE}_refresh`);
          accessToken = accessTokenResult ? accessTokenResult.password : null;
          refreshToken = refreshTokenResult ? refreshTokenResult.password : null;
        } catch (keychainError: any) {
          console.warn('⚠️ TOKEN STORAGE: Keychain failed in getTokens, falling back to SecureStore:', keychainError.message);
        }
      }
      
      // If Keychain didn't work or wasn't available, try SecureStore
      if ((!accessToken || !refreshToken) && this.isSecureStoreAvailable) {
        accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY, { keychainService: KEYCHAIN_SERVICE });
        refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY, { keychainService: `${KEYCHAIN_SERVICE}_refresh` });
      } else {
        accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
        refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      }

      if (!accessToken || !refreshToken) return null;

      // Get expiry and user ID from AsyncStorage
      const [[, expiryString], [, userIdString]] = await AsyncStorage.multiGet([
        TOKEN_EXPIRY_KEY,
        USER_ID_KEY,
      ]);

      if (!expiryString || !userIdString) {
        return null;
      }

      return {
        accessToken,
        refreshToken,
        expiresAt: new Date(expiryString),
        userId: parseInt(userIdString, 10),
      };
      
    } catch (error) {
      console.error('Failed to retrieve tokens:', error);
      // Return null instead of throwing to prevent app crashes
      return null;
    }
  }

  /**
   * Get only the access token (for API requests)
   */
  async getAccessToken(): Promise<string | null> {
    try {
      // Try Keychain first, fallback to SecureStore if it fails
      if (Keychain && Keychain.getInternetCredentials) {
        try {
          console.log('🔍 TOKEN STORAGE: Attempting to retrieve token from Keychain');
          const result = await Keychain.getInternetCredentials(KEYCHAIN_SERVICE);
          if (result) {
            console.log('✅ TOKEN STORAGE: Successfully retrieved token from Keychain');
            return result.password;
          }
        } catch (keychainError: any) {
          console.warn('⚠️ TOKEN STORAGE: Keychain failed, falling back to SecureStore:', keychainError.message);
        }
      }
      if (this.isSecureStoreAvailable) {
        console.log('🔍 TOKEN STORAGE: Retrieving token from SecureStore');
        return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY, { keychainService: KEYCHAIN_SERVICE });
      }
      console.log('🔍 TOKEN STORAGE: Retrieving token from AsyncStorage');
      return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('❌ TOKEN STORAGE: Failed to retrieve access token:', error);
      return null;
    }
  }

  /**
   * Get only the refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      // Try Keychain first, fallback to SecureStore if it fails
      if (Keychain && Keychain.getInternetCredentials) {
        try {
          const result = await Keychain.getInternetCredentials(`${KEYCHAIN_SERVICE}_refresh`);
          if (result) {
            return result.password;
          }
        } catch (keychainError: any) {
          console.warn('⚠️ TOKEN STORAGE: Keychain failed in getRefreshToken, falling back to SecureStore:', keychainError.message);
        }
      }
      if (this.isSecureStoreAvailable) {
        return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY, { keychainService: `${KEYCHAIN_SERVICE}_refresh` });
      }
      return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to retrieve refresh token:', error);
      return null;
    }
  }

  /**
   * Check if tokens are expired
   */
  async isTokenExpired(): Promise<boolean> {
    try {
      const expiryString = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);
      if (!expiryString) {
        return true;
      }

      const expiryDate = new Date(expiryString);
      const now = new Date();
      
      // Consider token expired if it expires within the next 5 minutes
      const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
      
      return expiryDate <= fiveMinutesFromNow;
    } catch (error) {
      console.error('Failed to check token expiry:', error);
      return true;
    }
  }

  /**
   * Clear all stored tokens
   */
  async clearTokens(): Promise<void> {
    try {
      // Clear from secure storage
      if (Keychain?.resetInternetCredentials) {
        await Keychain.resetInternetCredentials({ service: KEYCHAIN_SERVICE });
        await Keychain.resetInternetCredentials({ service: `${KEYCHAIN_SERVICE}_refresh` });
      }
      if (SecureStore?.isAvailableAsync && await SecureStore.isAvailableAsync()) {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY, { keychainService: KEYCHAIN_SERVICE });
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY, { keychainService: `${KEYCHAIN_SERVICE}_refresh` });
      }
      
      // Clear from AsyncStorage
      await AsyncStorage.multiRemove([TOKEN_EXPIRY_KEY, USER_ID_KEY]);
      
    } catch (error) {
      console.error('Failed to clear tokens:', error);
      // Don't throw error on cleanup failure
    }
  }

  /**
   * Update only the access token (after refresh)
   */
  async updateAccessToken(accessToken: string, expiresIn: number): Promise<void> {
    try {
      const expiresAt = new Date(Date.now() + expiresIn * 1000);
      
      // Update access token in secure storage
      if (Keychain?.setInternetCredentials) {
        await Keychain.setInternetCredentials(
          KEYCHAIN_SERVICE,
          ACCESS_TOKEN_KEY,
          accessToken
        );
      } else if (SecureStore?.isAvailableAsync && await SecureStore.isAvailableAsync()) {
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken, { keychainService: KEYCHAIN_SERVICE });
      }
      
      // Update expiry in AsyncStorage
      await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toISOString());
      
    } catch (error) {
      console.error('Failed to update access token:', error);
      throw new Error('Failed to update access token');
    }
  }

  /**
   * Check if tokens exist (without retrieving them)
   */
  async hasTokens(): Promise<boolean> {
    try {
      const accessTokenResult = await Keychain.getInternetCredentials(KEYCHAIN_SERVICE);
      return !!accessTokenResult;
    } catch (error) {
      console.error('Failed to check token existence:', error);
      return false;
    }
  }
}

// =============================================================================
// Export singleton instance
// =============================================================================

export const tokenStorage = new TokenStorageService();
export default tokenStorage;
