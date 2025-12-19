import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

const { width: screenWidth } = Dimensions.get('window');

interface HLSVideoPlayerProps {
  source: string;
  title?: string;
  poster?: string;
}

export default function HLSVideoPlayer({ source, title, poster }: HLSVideoPlayerProps) {
  const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loadAsync({ uri: source }, { shouldPlay: false });
    }
  }, [source]);

  const handlePlayPause = async () => {
    if (!status.isLoaded) return;

    try {
      if (status.isPlaying) {
        await videoRef.current?.pauseAsync();
      } else {
        await videoRef.current?.playAsync();
      }
    } catch (error) {
      console.error('Error de reproducción:', error);
      Alert.alert('Error de reproducción', 'No se pudo reproducir el video');
    }
  };

  const handleFullscreenUpdate = (event: any) => {
    console.log('Fullscreen update:', event);
  };

  const handleStatusUpdate = (newStatus: AVPlaybackStatus) => {
    setStatus(newStatus);
    
    if (newStatus.isLoaded) {
      setIsLoading(false);
      setHasError(false);
    } else if (newStatus.error) {
      setHasError(true);
      setIsLoading(false);
      console.warn('Video error:', newStatus.error);
    }
  };

  const formatTime = (millis: number) => {
    if (!millis || isNaN(millis)) return '0:00';
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = async (progress: number) => {
    if (!status.isLoaded || !status.durationMillis) return;
    
    try {
      const seekPosition = progress * status.durationMillis;
      await videoRef.current?.setPositionAsync(seekPosition);
    } catch (error) {
      console.warn('Seek error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}
      
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: source }}
          style={styles.video}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={handleStatusUpdate}
          onFullscreenUpdate={handleFullscreenUpdate}
          shouldPlay={false}
          isLooping={false}
          posterSource={poster ? { uri: poster } : undefined}
        />
        
        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingSpinner} />
            <Text style={styles.loadingText}>Cargando video HLS...</Text>
          </View>
        )}

        {/* Error State */}
        {hasError && (
          <View style={styles.errorOverlay}>
            <IconSymbol name="exclamationmark.triangle.fill" size={32} color="#ff3b30" />
            <Text style={styles.errorText}>Error al cargar video</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => {
                setHasError(false);
                setIsLoading(true);
                videoRef.current?.loadAsync({ uri: source }, { shouldPlay: false });
              }}
            >
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {!isLoading && !hasError && (
          <TouchableOpacity 
            style={styles.controlsOverlay}
            onPress={handlePlayPause}
            disabled={!status.isLoaded}
            activeOpacity={0.8}
          >
            <View style={styles.playButton}>
              <IconSymbol 
                name={status.isLoaded && status.isPlaying ? 'pause.fill' : 'play.fill'} 
                size={28} 
                color="white" 
              />
            </View>
          </TouchableOpacity>
        )}

        {status.isLoaded && !isLoading && !hasError && (
          <View style={styles.progressContainer}>
            <TouchableOpacity 
              style={styles.progressBar}
              onPress={(event) => {
                const { locationX } = event.nativeEvent;
                const progressBarWidth = screenWidth - 64;
                const progress = locationX / progressBarWidth;
                handleSeek(Math.max(0, Math.min(1, progress)));
              }}
            >
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${status.durationMillis ? 
                      ((status.positionMillis || 0) / status.durationMillis) * 100 : 0}%` 
                  }
                ]} 
              />
            </TouchableOpacity>
            
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {formatTime(status.positionMillis || 0)}
              </Text>
              <Text style={styles.timeDivider}>/</Text>
              <Text style={styles.timeText}>
                {formatTime(status.durationMillis || 0)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  videoContainer: {
    position: 'relative',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  video: {
    width: screenWidth - 48,
    height: (screenWidth - 48) * (9/16), // 16:9 aspect ratio
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 40, // Leave space for progress bar
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    gap: 12,
  },
  loadingSpinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: '#007AFF',
  },
  loadingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    gap: 12,
    padding: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  timeDivider: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginHorizontal: 6,
  },
});