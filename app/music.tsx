import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Slider } from 'react-native-elements'; // Import Slider

const MusicScreen = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      if (!permissionResponse?.granted) {
        const response = await requestPermission();
        if (!response.granted) {
          Alert.alert('Permission Denied', 'Music access is required.');
          return;
        }
      }
      getMusicFiles();
    })();

    return () => {
      stopAndUnloadSound(); // Unload sound when leaving screen
    };
  }, []);

  const getMusicFiles = async () => {
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
        first: 50,
      });

      if (media.assets.length > 0) {
        setSongs(media.assets);
      } else {
        Alert.alert('No Music Found');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch music files');
    }
  };

  const stopAndUnloadSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  const playSong = async (index: number) => {
    try {
      await stopAndUnloadSound(); // Stop and unload previous song

      const { uri } = songs[index];

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );

      setSound(newSound);
      setCurrentSongIndex(index);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !isSeeking) {
          setCurrentTime(Math.floor(status.positionMillis || 0));
          setDuration(Math.floor(status.durationMillis || 0));
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Cannot play this file');
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextSong = () => {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
      playSong(currentSongIndex + 1);
    }
  };

  const playPreviousSong = () => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      playSong(currentSongIndex - 1);
    }
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      setIsSeeking(true);
      await sound.setPositionAsync(value);
      setCurrentTime(value);
      setIsSeeking(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Music Player</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id || item.uri}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.songCard,
              currentSongIndex === index && styles.currentSong,
            ]}
            onPress={() => playSong(index)}
          >
            <Ionicons
              name={
                currentSongIndex === index ? 'play-circle' : 'musical-notes'
              }
              size={32}
              color={currentSongIndex === index ? '#fff' : '#007AFF'}
            />
            <View style={styles.songInfo}>
              <Text
                style={[
                  styles.songTitle,
                  currentSongIndex === index && styles.currentSongText,
                ]}
              >
                {item.filename}
              </Text>
              <Text style={styles.songArtist}>Unknown Artist</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {currentSongIndex !== null && (
        <View style={styles.controls}>
          <Text style={styles.nowPlaying}>
            🎶 {songs[currentSongIndex]?.filename}
          </Text>

          <View style={styles.sliderContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Slider
              style={{ flex: 1 }}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              onValueChange={(value) => setCurrentTime(value)}
              onSlidingComplete={handleSeek}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#444"
              thumbTintColor="#fff"
            />
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={playPreviousSong}
              style={styles.controlButton}
            >
              <Ionicons name="play-back" size={30} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={togglePlayPause}
              style={styles.playPauseButton}
            >
              <Ionicons
                name={isPlaying ? 'pause-circle' : 'play-circle'}
                size={60}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={playNextSong}
              style={styles.controlButton}
            >
              <Ionicons name="play-forward" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: '#1E1E1E' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 10,
  },
  songInfo: { marginLeft: 10 },
  songTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  songArtist: { fontSize: 14, color: 'gray' },
  currentSong: { backgroundColor: '#007AFF' },
  currentSongText: { color: '#fff' },
  controls: { marginTop: 20, alignItems: 'center' },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  nowPlaying: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  progressBar: { width: '100%', marginBottom: 5 },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timerText: { fontSize: 12, color: '#fff' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: { padding: 10, backgroundColor: '#007AFF', borderRadius: 50 },
  playPauseButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 50,
  },
});
