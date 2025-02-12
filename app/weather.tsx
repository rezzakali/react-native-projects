import axios from 'axios';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY; // Replace with your OpenWeather API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherScreen = () => {
  const [city, setCity] = useState('New York');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Change to "imperial" for Fahrenheit
        },
      });

      setWeather(response.data);
    } catch (err) {
      setError('City not found. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App 🌤</Text>

      {/* Input for City Name */}
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      {/* Fetch Weather Button */}
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Weather Info */}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            🌍 {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.weatherText}>
            🌡 Temperature: {weather.main.temp}°C
          </Text>
          <Text style={styles.weatherText}>
            💧 Humidity: {weather.main.humidity}%
          </Text>
          <Text style={styles.weatherText}>
            💨 Wind Speed: {weather.wind.speed} m/s
          </Text>
        </View>
      )}
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
