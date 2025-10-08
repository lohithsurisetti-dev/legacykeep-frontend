/**
 * Video Call Screen
 * Premium video calling interface with modern design
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const VideoCallScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contact } = route.params as any;

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');

  // Animations
  const fadeAnim = new Animated.Value(0);
  const controlsAnim = new Animated.Value(1);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Simulate call connecting
    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (callStatus === 'connected') {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Main Video View */}
      <View style={styles.mainVideoContainer}>
        <Image
          source={{ uri: contact?.avatar || 'https://i.pravatar.cc/800' }}
          style={styles.mainVideo}
          blurRadius={isVideoOff ? 20 : 0}
        />
        
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        />

        {/* Top Bar */}
        <Animated.View style={[styles.topBar, { opacity: controlsAnim }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleEndCall}
          >
            <View style={styles.iconButton}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <View style={styles.callInfo}>
            <Text style={styles.contactName}>{contact?.name || 'Contact'}</Text>
            <Text style={styles.callDuration}>
              {callStatus === 'connecting' && 'Connecting...'}
              {callStatus === 'connected' && formatDuration(callDuration)}
              {callStatus === 'ended' && 'Call Ended'}
            </Text>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        {/* Self Video Preview */}
        <Animated.View style={[styles.selfVideoContainer, { opacity: fadeAnim }]}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/400?img=33' }}
            style={styles.selfVideo}
          />
          {isVideoOff && (
            <View style={styles.videoOffOverlay}>
              <Ionicons name="videocam-off" size={32} color="white" />
            </View>
          )}
        </Animated.View>

        {/* Bottom Controls */}
        <Animated.View style={[styles.bottomControls, { opacity: controlsAnim }]}>
          <View style={styles.controlsRow}>
            {/* Mute Button */}
            <TouchableOpacity
              style={[styles.controlButton, isMuted && styles.controlButtonActive]}
              onPress={() => setIsMuted(!isMuted)}
            >
              <Ionicons
                name={isMuted ? 'mic-off' : 'mic'}
                size={28}
                color={isMuted ? '#ef4444' : 'white'}
              />
            </TouchableOpacity>

            {/* Video Toggle */}
            <TouchableOpacity
              style={[styles.controlButton, isVideoOff && styles.controlButtonActive]}
              onPress={() => setIsVideoOff(!isVideoOff)}
            >
              <Ionicons
                name={isVideoOff ? 'videocam-off' : 'videocam'}
                size={28}
                color={isVideoOff ? '#ef4444' : 'white'}
              />
            </TouchableOpacity>

            {/* End Call Button */}
            <TouchableOpacity
              style={styles.endCallButton}
              onPress={handleEndCall}
            >
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                style={styles.endCallGradient}
              >
                <Ionicons name="call" size={32} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Flip Camera */}
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsFrontCamera(!isFrontCamera)}
            >
              <Ionicons name="camera-reverse" size={28} color="white" />
            </TouchableOpacity>

            {/* Speaker */}
            <TouchableOpacity
              style={[styles.controlButton, !isSpeaker && styles.controlButtonActive]}
              onPress={() => setIsSpeaker(!isSpeaker)}
            >
              <Ionicons
                name={isSpeaker ? 'volume-high' : 'volume-mute'}
                size={28}
                color={!isSpeaker ? '#ef4444' : 'white'}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainVideoContainer: {
    flex: 1,
    position: 'relative',
  },
  mainVideo: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBar: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  callInfo: {
    flex: 1,
    alignItems: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  callDuration: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  selfVideoContainer: {
    position: 'absolute',
    top: 120,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  selfVideo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOffOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  controlButtonActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  endCallButton: {
    borderRadius: 32,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  endCallGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoCallScreen;
