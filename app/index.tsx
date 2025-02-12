import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! 🌟</Text>
      <Text style={styles.subtitle}>Choose an option:</Text>

      <TouchableOpacity style={styles.button}>
        <Link href={'/todo'}>
          <Text style={styles.buttonText}>📋 Todo App</Text>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link href={'/weather'}>
          <Text style={styles.buttonText}>🌤 Weather App</Text>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Link href={'/camera-gallery'}>
          <Text style={styles.buttonText}>📸 Camera & Gallery</Text>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Link href={'/location'}>
          <Text style={styles.buttonText}>📍 GPS Location</Text>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Link href={'/music'}>
          <Text style={styles.buttonText}>🎶 Music Player</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
});
