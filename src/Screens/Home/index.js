import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useGetWeatherByCoordsQuery} from '../../Redux-Toolkit/WeatherSlice/openWeatherApi';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Components/Common/Loader';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Images} from '../../Assets/Images';
import MessageAlert from '../../Components/Common/MessageAlert';
import Icons from '../../Assets/Icons';
import WeatherComponent from '../../Components/HomeComponents/WeatherComponent';
import ThemeColors from '../../Utils/Colors';

const WeatherScreen = () => {
  const [location, setLocation] = useState({lat: null, lon: null});
  const [locationError, setLocationError] = useState(null);

  const {data, error, isLoading, refetch} = useGetWeatherByCoordsQuery(
    location,
    {
      skip: !location.lat || !location.lon,
    },
  );

  // const {
  //   data: LocationKeyData,
  //   error: LocationKeyError,
  //   isLoading: LocationKeyLoading,
  //   refetch: LocationKeyRefetch,
  // } = useGetLocationKeyByCoordsQuery(
  //   {lat: location.lat, lon: location.lon},
  //   {
  //     skip: !location.lat || !location.lon,
  //   },
  // );

  // const {
  //   data: CurrentWeatherData,
  //   error: CurrentWeatherError,
  //   isLoading: CurrentWeatherLoading,
  //   refetch: CurrentWeatherRefetch,
  // } = useGetCurrentWeatherByKeyQuery(LocationKeyData?.Key, {
  //   skip: !LocationKeyData?.Key,
  // });

  const requestLocation = useCallback(async () => {
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

    Geolocation.setRNConfiguration({
      locationProvider: Platform.OS === 'android' ? 'playServices' : 'auto',
    });

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
              timeout: 10000,
              maximumAge: 5000,
            },
          );
        } else {
          if (error.code == '2') {
            setLocationError('Please Turn ON Location');
          } else {
            setLocationError(error.message);
          }
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
      },
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      requestLocation();
    }, [requestLocation]),
  );

  useEffect(() => {
    // if (location.lat && location.lon) {
    //   LocationKeyRefetch();
    // }
    // if (LocationKeyData?.Key) {
    //   CurrentWeatherRefetch();
    // }
    if (location.lat && location.lon) {
      refetch();
    }
  }, [location, refetch]);

  if (locationError || error) {
    return (
      <ImageBackground
        source={Images.Background}
        style={[styles.container, {paddingTop: 180}]}>
        <MessageAlert
          Icon={Icons.alertIcon}
          MessageText={error?.message || locationError}
        />
        <Image source={Images.House} style={styles.houseImg} />
      </ImageBackground>
    );
  }

  if (isLoading || !location.lat || !location.lon) {
    return (
      <ImageBackground
        source={Images.Background}
        style={[styles.container, {paddingTop: 180}]}>
        <Loader
          size={'large'}
          color={ThemeColors.White}
          LoadingText={
            isLoading ? 'Loading weather data' : 'Waiting for location'
          }
        />
        <Image source={Images.House} style={styles.houseImg} />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={Images.Background} style={styles.container}>
      {data && <WeatherComponent data={data} />}
      <Image source={Images.House} style={styles.houseImg} />
    </ImageBackground>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
    paddingTop: 110,
  },
  houseImg: {
    height: responsiveHeight(35),
    width: responsiveWidth(80),
    opacity: 0.95,
  },
});
