import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ImageBackground,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useGetWeatherByCoordsQuery} from '../../Redux-Toolkit/WeatherSlice/weatherApi';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Images} from '../../Assets/Images';

const WeatherScreen = () => {
  const [location, setLocation] = useState({lat: null, lon: null});
  const [locationError, setLocationError] = useState(null);

  const {data, error, isLoading, refetch} = useGetWeatherByCoordsQuery(
    location,
    {
      skip: !location.lat || !location.lon,
    },
  );

  useFocusEffect(
    React.useCallback(() => {
      requestLocation();
      if (location.lat && location.lon) {
        refetch();
      }
    }, [location]),
  );

  const requestLocation = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Permission',
          message:
            'We need access to your location to provide weather information.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setLocationError('Location permission denied');
        return;
      }
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({lat: latitude, lon: longitude});
      },
      error => {
        if (error.code === error.TIMEOUT) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setLocation({lat: latitude, lon: longitude});
            },
            error => setLocationError(error.message),
            {
              enableHighAccuracy: false,
              timeout: 15000,
              maximumAge: 10000,
            },
          );
        } else {
          setLocationError(error.message);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 10000,
      },
    );
  };

  if (isLoading) {
    return (
      <ImageBackground source={Images.Background} style={styles.container}>
        <Loader
          size={'large'}
          color={'#000'}
          LoadingText={'Loading weather data'}
        />
      </ImageBackground>
    );
  }

  if (error || locationError) {
    return (
      <ImageBackground source={Images.Background} style={styles.container}>
        <Text style={styles.title}>
          Error: {error?.message || locationError}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={Images.Background} style={styles.container}>
      {data ? (
        <>
          <Text style={styles.title}>Weather in Your Location</Text>
          <Text style={styles.title}>
            Temperature: {(data.main.temp - 273.15).toFixed(2)}°C
          </Text>
          <Text style={styles.title}>
            Weather: {data.weather[0].description}
          </Text>
          <Text style={styles.title}>Location: {data.name}</Text>
        </>
      ) : (
        <Loader
          size={50}
          color={'#0000ff'}
          LoadingText={'Waiting for location'}
        />
      )}
    </ImageBackground>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imgbg: {
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    fontFamily: 'sans-serif',
  },
});
