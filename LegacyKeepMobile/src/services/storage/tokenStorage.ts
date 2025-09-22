/**
 * Token Storage Service
 * 
 * Secure storage for JWT tokens using react-native-keychain
 */

import * as Keychain from 'react-native-keychain';
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
  
  /**
   * Store JWT tokens securely
   */
  async storeTokens(tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number; // seconds
    userId: number;
  }): Promise<void> {
    try {
      // Check if Keychain is available
      if (!Keychain || !Keychain.setInternetCredentials) {
        console.warn('Keychain not available, cannot store tokens');
        return;
      }

      const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000);
      
      // Store sensitive tokens in Keychain (most secure)
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
      
      // Store non-sensitive data in AsyncStorage
      await AsyncStorage.multiSet([
        [TOKEN_EXPIRY_KEY, expiresAt.toISOString()],
        [USER_ID_KEY, tokens.userId.toString()],
      ]);
      
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
      // Check if Keychain is available
      if (!Keychain || !Keychain.getInternetCredentials) {
        console.warn('Keychain not available, returning null');
        return null;
      }

      // Get access token from Keychain
      const accessTokenResult = await Keychain.getInternetCredentials(KEYCHAIN_SERVICE);
      if (!accessTokenResult) {
        return null;
      }

      // Get refresh token from Keychain
      const refreshTokenResult = await Keychain.getInternetCredentials(`${KEYCHAIN_SERVICE}_refresh`);
      if (!refreshTokenResult) {
        return null;
      }

      // Get expiry and user ID from AsyncStorage
      const [[, expiryString], [, userIdString]] = await AsyncStorage.multiGet([
        TOKEN_EXPIRY_KEY,
        USER_ID_KEY,
      ]);

      if (!expiryString || !userIdString) {
        return null;
      }

      return {
        accessToken: accessTokenResult.password,
        refreshToken: refreshTokenResult.password,
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
      // Check if Keychain is available
      if (!Keychain || !Keychain.getInternetCredentials) {
        console.warn('Keychain not available, returning null');
        return null;
      }

      const result = await Keychain.getInternetCredentials(KEYCHAIN_SERVICE);
      if (!result) {
        return null;
      }
      return result.password;
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
      return null;
    }
  }

  /**
   * Get only the refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      const result = await Keychain.getInternetCredentials(`${KEYCHAIN_SERVICE}_refresh`);
      if (!result) {
        return null;
      }
      return result.password;
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
      // Clear from Keychain
      await Keychain.resetInternetCredentials({ service: KEYCHAIN_SERVICE });
      await Keychain.resetInternetCredentials({ service: `${KEYCHAIN_SERVICE}_refresh` });
      
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
      
      // Update access token in Keychain
      await Keychain.setInternetCredentials(
        KEYCHAIN_SERVICE,
        ACCESS_TOKEN_KEY,
        accessToken
      );
      
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
