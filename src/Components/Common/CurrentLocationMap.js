import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const LocationMap = ({latitude, longitude}) => {
  if (!latitude || !longitude) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Latitude and Longitude are required
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="Your Location"
          description="This is where you are now!"
        />
      </MapView>
    </View>
  );
};

export default LocationMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
