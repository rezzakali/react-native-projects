import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LocationScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  // 📍 Get User's Exact Location
  const getLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'GPS access is needed to fetch your location.'
      );
      setLoading(false);
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest, // 🎯 Get precise GPS location
    });

    setLocation(currentLocation);
    setLoading(false);
  };

  useEffect(() => {
    getLocation(); // Fetch location when screen loads
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Exact Location </Text>

      {/* Show Loader While Fetching Location */}
      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {/* Show Map with Marker at Exact Location */}
      {!loading && location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005, // Zoom In
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true} // 🔵 Show blue dot for user location
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="You are here!"
          />
        </MapView>
      )}

      {/* Refresh Button */}
      {!loading && (
        <TouchableOpacity style={styles.button} onPress={getLocation}>
          <Text style={styles.buttonText}>🔄 Refresh Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  map: {
    width: '100%',
    height: '60%', // Adjust height
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
