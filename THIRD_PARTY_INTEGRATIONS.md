# 🔌 LegacyKeep Third-Party Integrations Guide

## 🎯 Integration Overview

### Core Third-Party Services
- **Firebase** - Phone authentication, push notifications, analytics
- **AWS S3** - Media storage and CDN
- **Stripe** - Payment processing
- **Google Maps** - Location services
- **Expo** - Development and deployment platform

## 📱 Firebase Integration

### 1. Firebase Services Used
```typescript
// Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Services we'll use:
// - Firebase Auth (Phone authentication)
// - Firebase Cloud Messaging (Push notifications)
// - Firebase Analytics (User behavior tracking)
// - Firebase Crashlytics (Error reporting)
// - Firebase Remote Config (Feature flags)
```

### 2. Phone Authentication Flow
```typescript
// services/FirebaseAuthService.ts
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

class FirebaseAuthService {
  // Send OTP to phone number
  async sendOTP(phoneNumber: string): Promise<string> {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      return confirmation.verificationId;
    } catch (error) {
      throw new Error(`Failed to send OTP: ${error.message}`);
    }
  }

  // Verify OTP code
  async verifyOTP(verificationId: string, code: string): Promise<FirebaseAuthTypes.User> {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      const userCredential = await auth().signInWithCredential(credential);
      return userCredential.user;
    } catch (error) {
      throw new Error(`OTP verification failed: ${error.message}`);
    }
  }

  // Link phone number to existing account
  async linkPhoneNumber(phoneNumber: string): Promise<void> {
    try {
      const confirmation = await auth().currentUser?.linkWithPhoneNumber(phoneNumber);
      // Handle confirmation flow
    } catch (error) {
      throw new Error(`Failed to link phone number: ${error.message}`);
    }
  }
}

export default new FirebaseAuthService();
```

### 3. Push Notifications
```typescript
// services/PushNotificationService.ts
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class PushNotificationService {
  // Request permission for push notifications
  async requestPermission(): Promise<boolean> {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        await this.getFCMToken();
      }

      return enabled;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  // Get FCM token
  async getFCMToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      // Send token to backend for user association
      await this.sendTokenToBackend(token);
      return token;
    } catch (error) {
      console.error('Failed to get FCM token:', error);
      return null;
    }
  }

  // Send token to backend
  private async sendTokenToBackend(token: string): Promise<void> {
    try {
      await fetch('/api/v1/notifications/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ fcmToken: token }),
      });
    } catch (error) {
      console.error('Failed to send token to backend:', error);
    }
  }

  // Handle foreground messages
  setupForegroundListener(): () => void {
    return messaging().onMessage(async remoteMessage => {
      // Handle foreground notification
      this.showLocalNotification(remoteMessage);
    });
  }

  // Handle background messages
  setupBackgroundListener(): void {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // Handle background notification
      console.log('Background message:', remoteMessage);
    });
  }

  // Show local notification
  private showLocalNotification(remoteMessage: any): void {
    // Implementation for local notification display
  }
}

export default new PushNotificationService();
```

### 4. Firebase Analytics
```typescript
// services/AnalyticsService.ts
import analytics from '@react-native-firebase/analytics';

class AnalyticsService {
  // Track user events
  async trackEvent(eventName: string, parameters?: Record<string, any>): Promise<void> {
    try {
      await analytics().logEvent(eventName, parameters);
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }

  // Track screen views
  async trackScreenView(screenName: string, screenClass?: string): Promise<void> {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass || screenName,
      });
    } catch (error) {
      console.error('Screen tracking failed:', error);
    }
  }

  // Set user properties
  async setUserProperties(properties: Record<string, any>): Promise<void> {
    try {
      await analytics().setUserProperties(properties);
    } catch (error) {
      console.error('User properties setting failed:', error);
    }
  }

  // Track user engagement
  async trackUserEngagement(engagementTime: number): Promise<void> {
    try {
      await analytics().logEvent('user_engagement', {
        engagement_time_msec: engagementTime,
      });
    } catch (error) {
      console.error('Engagement tracking failed:', error);
    }
  }
}

export default new AnalyticsService();
```

## ☁️ AWS S3 Integration

### 1. S3 Configuration
```typescript
// services/S3Service.ts
import AWS from 'aws-sdk';
import { Platform } from 'react-native';

interface S3Config {
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

class S3Service {
  private s3: AWS.S3;
  private bucket: string;

  constructor(config: S3Config) {
    AWS.config.update({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region,
    });

    this.s3 = new AWS.S3();
    this.bucket = config.bucket;
  }

  // Upload file to S3
  async uploadFile(
    file: any,
    key: string,
    contentType: string,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read', // Make file publicly accessible
      };

      const upload = this.s3.upload(params);

      if (onProgress) {
        upload.on('httpUploadProgress', (progress) => {
          const percentage = Math.round((progress.loaded / progress.total) * 100);
          onProgress(percentage);
        });
      }

      const result = await upload.promise();
      return result.Location;
    } catch (error) {
      throw new Error(`S3 upload failed: ${error.message}`);
    }
  }

  // Generate presigned URL for direct upload
  async generatePresignedUrl(key: string, contentType: string): Promise<string> {
    try {
      const params = {
        Bucket: this.bucket,
        Key: key,
        ContentType: contentType,
        Expires: 3600, // 1 hour
      };

      const url = await this.s3.getSignedUrlPromise('putObject', params);
      return url;
    } catch (error) {
      throw new Error(`Presigned URL generation failed: ${error.message}`);
    }
  }

  // Delete file from S3
  async deleteFile(key: string): Promise<void> {
    try {
      const params = {
        Bucket: this.bucket,
        Key: key,
      };

      await this.s3.deleteObject(params).promise();
    } catch (error) {
      throw new Error(`S3 delete failed: ${error.message}`);
    }
  }

  // Get file metadata
  async getFileMetadata(key: string): Promise<AWS.S3.HeadObjectOutput> {
    try {
      const params = {
        Bucket: this.bucket,
        Key: key,
      };

      return await this.s3.headObject(params).promise();
    } catch (error) {
      throw new Error(`S3 metadata fetch failed: ${error.message}`);
    }
  }
}

export default S3Service;
```

### 2. Media Upload Service
```typescript
// services/MediaUploadService.ts
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import S3Service from './S3Service';
import { Platform } from 'react-native';

interface MediaUploadOptions {
  type: 'image' | 'video' | 'audio';
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

class MediaUploadService {
  private s3Service: S3Service;

  constructor(s3Service: S3Service) {
    this.s3Service = s3Service;
  }

  // Select media from gallery
  async selectFromGallery(options: MediaUploadOptions): Promise<ImagePickerResponse> {
    return new Promise((resolve, reject) => {
      const pickerOptions = {
        mediaType: options.type,
        quality: options.quality || 0.8,
        maxWidth: options.maxWidth || 1920,
        maxHeight: options.maxHeight || 1080,
        includeBase64: false,
      };

      launchImageLibrary(pickerOptions, (response) => {
        if (response.didCancel || response.errorMessage) {
          reject(new Error(response.errorMessage || 'User cancelled'));
        } else {
          resolve(response);
        }
      });
    });
  }

  // Capture media from camera
  async captureFromCamera(options: MediaUploadOptions): Promise<ImagePickerResponse> {
    return new Promise((resolve, reject) => {
      const pickerOptions = {
        mediaType: options.type,
        quality: options.quality || 0.8,
        maxWidth: options.maxWidth || 1920,
        maxHeight: options.maxHeight || 1080,
        includeBase64: false,
      };

      launchCamera(pickerOptions, (response) => {
        if (response.didCancel || response.errorMessage) {
          reject(new Error(response.errorMessage || 'User cancelled'));
        } else {
          resolve(response);
        }
      });
    });
  }

  // Upload media to S3
  async uploadMedia(
    mediaResponse: ImagePickerResponse,
    folder: string,
    onProgress?: (progress: number) => void
  ): Promise<{ url: string; thumbnailUrl?: string }> {
    try {
      if (!mediaResponse.assets || mediaResponse.assets.length === 0) {
        throw new Error('No media selected');
      }

      const asset = mediaResponse.assets[0];
      const fileExtension = asset.fileName?.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
      const key = `${folder}/${fileName}`;

      // Upload main file
      const url = await this.s3Service.uploadFile(
        asset.uri,
        key,
        asset.type || 'image/jpeg',
        onProgress
      );

      // Generate thumbnail for images
      let thumbnailUrl: string | undefined;
      if (asset.type?.startsWith('image/')) {
        thumbnailUrl = await this.generateThumbnail(asset.uri, folder);
      }

      return { url, thumbnailUrl };
    } catch (error) {
      throw new Error(`Media upload failed: ${error.message}`);
    }
  }

  // Generate thumbnail
  private async generateThumbnail(originalUri: string, folder: string): Promise<string> {
    try {
      // Use react-native-image-resizer to create thumbnail
      const resizedImage = await ImageResizer.createResizedImage(
        originalUri,
        300,
        300,
        'JPEG',
        80,
        0,
        undefined,
        false,
        { mode: 'contain', onlyScaleDown: true }
      );

      const thumbnailKey = `${folder}/thumbnails/${Date.now()}_thumb.jpg`;
      const thumbnailUrl = await this.s3Service.uploadFile(
        resizedImage.uri,
        thumbnailKey,
        'image/jpeg'
      );

      return thumbnailUrl;
    } catch (error) {
      console.error('Thumbnail generation failed:', error);
      return '';
    }
  }

  // Compress image before upload
  async compressImage(uri: string, quality: number = 0.8): Promise<string> {
    try {
      const compressedImage = await ImageResizer.createResizedImage(
        uri,
        1920,
        1080,
        'JPEG',
        quality * 100,
        0,
        undefined,
        false,
        { mode: 'contain', onlyScaleDown: true }
      );

      return compressedImage.uri;
    } catch (error) {
      throw new Error(`Image compression failed: ${error.message}`);
    }
  }
}

export default MediaUploadService;
```

## 💳 Stripe Integration

### 1. Stripe Configuration
```typescript
// services/StripeService.ts
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

interface StripeConfig {
  publishableKey: string;
  merchantId: string;
  urlScheme: string;
}

class StripeService {
  private stripe: any;

  constructor(config: StripeConfig) {
    this.stripe = useStripe();
  }

  // Create payment intent
  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<string> {
    try {
      const response = await fetch('/api/v1/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ amount, currency }),
      });

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      throw new Error(`Payment intent creation failed: ${error.message}`);
    }
  }

  // Process payment
  async processPayment(
    clientSecret: string,
    paymentMethodId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error, paymentIntent } = await this.stripe.confirmPayment(clientSecret, {
        paymentMethodId,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Create payment method
  async createPaymentMethod(): Promise<string> {
    try {
      const { error, paymentMethod } = await this.stripe.createPaymentMethod({
        type: 'Card',
      });

      if (error) {
        throw new Error(error.message);
      }

      return paymentMethod.id;
    } catch (error) {
      throw new Error(`Payment method creation failed: ${error.message}`);
    }
  }
}

export default StripeService;
```

## 🗺️ Google Maps Integration

### 1. Maps Configuration
```typescript
// services/MapsService.ts
import MapView, { Marker, Region } from 'react-native-maps';
import Geocoding from 'react-native-geocoding';

class MapsService {
  constructor(apiKey: string) {
    Geocoding.init(apiKey);
  }

  // Get current location
  async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    try {
      const { status } = await Permissions.requestAsync(Permissions.LOCATION);
      
      if (status !== 'granted') {
        throw new Error('Location permission denied');
      }

      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      throw new Error(`Location fetch failed: ${error.message}`);
    }
  }

  // Geocode address to coordinates
  async geocodeAddress(address: string): Promise<{ latitude: number; longitude: number }> {
    try {
      const response = await Geocoding.from(address);
      const { lat, lng } = response.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } catch (error) {
      throw new Error(`Geocoding failed: ${error.message}`);
    }
  }

  // Reverse geocode coordinates to address
  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    try {
      const response = await Geocoding.from(latitude, longitude);
      return response.results[0].formatted_address;
    } catch (error) {
      throw new Error(`Reverse geocoding failed: ${error.message}`);
    }
  }

  // Calculate distance between two points
  calculateDistance(
    point1: { latitude: number; longitude: number },
    point2: { latitude: number; longitude: number }
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(point2.latitude - point1.latitude);
    const dLon = this.deg2rad(point2.longitude - point1.longitude);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(point1.latitude)) *
        Math.cos(this.deg2rad(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export default MapsService;
```

## 🔧 Integration Configuration

### 1. Environment Variables
```typescript
// config/environment.ts
export const ENV = {
  // Firebase
  FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,

  // AWS S3
  AWS_REGION: process.env.EXPO_PUBLIC_AWS_REGION,
  AWS_S3_BUCKET: process.env.EXPO_PUBLIC_AWS_S3_BUCKET,
  AWS_ACCESS_KEY_ID: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,

  // Stripe
  STRIPE_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_MERCHANT_ID: process.env.EXPO_PUBLIC_STRIPE_MERCHANT_ID,

  // Google Maps
  GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
};
```

### 2. Service Initialization
```typescript
// services/index.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';
import { ENV } from '@/config/environment';

// Initialize Firebase
const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const messaging = getMessaging(firebaseApp);
export const analytics = getAnalytics(firebaseApp);

// Initialize other services
export { default as S3Service } from './S3Service';
export { default as StripeService } from './StripeService';
export { default as MapsService } from './MapsService';
export { default as MediaUploadService } from './MediaUploadService';
```

## 🧪 Testing Third-Party Integrations

### 1. Mock Services
```typescript
// __mocks__/FirebaseAuthService.ts
export const mockFirebaseAuthService = {
  sendOTP: jest.fn().mockResolvedValue('mock-verification-id'),
  verifyOTP: jest.fn().mockResolvedValue({ uid: 'mock-uid' }),
  linkPhoneNumber: jest.fn().mockResolvedValue(undefined),
};

// __mocks__/S3Service.ts
export const mockS3Service = {
  uploadFile: jest.fn().mockResolvedValue('https://mock-s3-url.com/file.jpg'),
  deleteFile: jest.fn().mockResolvedValue(undefined),
  generatePresignedUrl: jest.fn().mockResolvedValue('https://mock-presigned-url.com'),
};
```

### 2. Integration Tests
```typescript
// __tests__/services/FirebaseAuthService.test.ts
import FirebaseAuthService from '@/services/FirebaseAuthService';

describe('FirebaseAuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send OTP successfully', async () => {
    const phoneNumber = '+1234567890';
    const verificationId = await FirebaseAuthService.sendOTP(phoneNumber);
    
    expect(verificationId).toBeDefined();
    expect(verificationId).toMatch(/^[a-zA-Z0-9-_]+$/);
  });

  it('should verify OTP successfully', async () => {
    const verificationId = 'mock-verification-id';
    const code = '123456';
    
    const user = await FirebaseAuthService.verifyOTP(verificationId, code);
    
    expect(user).toBeDefined();
    expect(user.uid).toBeDefined();
  });
});
```

## 📱 Platform-Specific Considerations

### 1. iOS Configuration
```xml
<!-- ios/LegacyKeepMobile/Info.plist -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access to show family members on a map</string>
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to capture family photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to select family photos</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access to record family stories</string>
```

### 2. Android Configuration
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

## 🚀 Deployment Considerations

### 1. Environment-Specific Configurations
```typescript
// config/environments.ts
export const environments = {
  development: {
    firebase: { /* dev config */ },
    s3: { /* dev config */ },
    stripe: { /* dev config */ },
  },
  staging: {
    firebase: { /* staging config */ },
    s3: { /* staging config */ },
    stripe: { /* staging config */ },
  },
  production: {
    firebase: { /* prod config */ },
    s3: { /* prod config */ },
    stripe: { /* prod config */ },
  },
};
```

### 2. Security Best Practices
- **API Keys**: Store in environment variables, never in code
- **S3 Buckets**: Use IAM roles and bucket policies
- **Firebase**: Enable App Check for additional security
- **Stripe**: Use webhooks for payment verification
- **Maps**: Restrict API key usage by bundle ID

---

**This comprehensive integration guide ensures LegacyKeep has robust third-party service support!** 🚀✨
