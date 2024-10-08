import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  PermissionsAndroid,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icons from '../../Assets/Icons';
import Images from '../../Assets/Images';
import styles from './styles';
import ThemeColors from '../../Utils/Colors';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import {useGetAirQualityByCoordsQuery} from '../../Redux-Toolkit/WeatherApi/openWeatherAPI';
import Loader from '../../Components/Common/Loader';
import MessageAlert from '../../Components/Common/MessageAlert';
import WeatherComponent from '../../Components/HomeComponents/WeatherComponent';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {
  setAirQuality,
  setCityName,
  setWeatherData,
} from '../../Redux-Toolkit/CurrentWeatherSlice';
import {useGetCityNameByCoordsQuery} from '../../Redux-Toolkit/WeatherApi/geoCodingAPI';
import {useGetWeatherByCoordsQuery} from '../../Redux-Toolkit/WeatherApi/weatherAPI';

const WeatherScreen = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    periods: null,
  });
  const [locationError, setLocationError] = useState(null);
  const dispatch = useDispatch();

  const {
    data: GeocodingData,
    error: GeocodingError,
    refetch: GeocodingRefetch,
  } = useGetCityNameByCoordsQuery(location, {
    skip: !location.lat || !location.lon,
  });

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
    refetch: weatherRefetch,
  } = useGetWeatherByCoordsQuery(location, {
    skip: !location.lat || !location.lon,
  });

  const {data: AirQualityData, refetch: AirQualityRefetch} =
    useGetAirQualityByCoordsQuery(location, {
      skip: !location.lat || !location.lon,
    });

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
        setLocation({lat: latitude, lon: longitude, periods: 'today'});
      },
      error => {
        if (error.code === error.TIMEOUT) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setLocation({lat: latitude, lon: longitude, periods: 'today'});
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

  const cityName = useMemo(() => {
    return (
      GeocodingData?.neighborhood?.split(' ').slice(0, 2).join(' ') ||
      GeocodingData?.city?.split(' ').slice(0, 2).join(' ')
    );
  }, [GeocodingData]);

  const onDisplayNotification = useCallback(
    async weather => {
      if (!weatherData || !GeocodingData) return;
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'important',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      const {temp, conditions} = weather?.currentConditions;

      await notifee.displayNotification({
        title: cityName,
        body: `${temp?.toFixed(0)}°C - ${conditions}`,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          smallIcon: 'app_logo',
          color: ThemeColors.LightPurple,
          pressAction: {
            id: 'default',
          },
        },
      });
    },
    [weatherData, GeocodingData, cityName],
  );

  useEffect(() => {
    if (location.lat && location.lon) {
      weatherRefetch();
      AirQualityRefetch();
      GeocodingRefetch();
    }
  }, [location.lat, location.lon]);

  useEffect(() => {
    if (weatherData && !weatherLoading) {
      dispatch(setCityName(GeocodingData));
      dispatch(setWeatherData(weatherData));
      dispatch(setAirQuality(AirQualityData));
      onDisplayNotification(weatherData);
    }
  }, [weatherData]);

  if (locationError || weatherError?.message || GeocodingError?.message) {
    return (
      <ImageBackground
        source={Images.Background}
        style={[styles.container, {paddingTop: 180}]}>
        <MessageAlert
          Icon={Icons.alertIcon}
          MessageText={weatherError?.message || locationError}
        />
        <Image source={Images.House} style={styles.houseImg} />
      </ImageBackground>
    );
  }

  if (weatherLoading || !location.lat || !location.lon) {
    return (
      <ImageBackground
        source={Images.Background}
        style={[styles.container, {paddingTop: 180}]}>
        <Loader
          size={'large'}
          color={ThemeColors.White}
          LoadingText={
            weatherLoading ? 'Loading weather data' : 'Waiting for location'
          }
        />
        <Image source={Images.House} style={styles.houseImg} />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={Images.Background} style={styles.container}>
      {weatherData && (
        <WeatherComponent WeatherData={weatherData} CityName={GeocodingData} />
      )}
      <Image source={Images.House} style={styles.houseImg} />
    </ImageBackground>
  );
};

export default WeatherScreen;
