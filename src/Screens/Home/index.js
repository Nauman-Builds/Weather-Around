import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  PermissionsAndroid,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Icons from '../../Assets/Icons';
import Images from '../../Assets/Images';
import styles from './styles';
import ThemeColors from '../../Utils/Colors';
import Geolocation from '@react-native-community/geolocation';
import { useFocusEffect } from '@react-navigation/native';
import { useGetAirQualityByCoordsQuery } from '../../Redux-Toolkit/WeatherApi/openWeatherAPI';
import Loader from '../../Components/Common/Loader';
import MessageAlert from '../../Components/Common/MessageAlert';
import WeatherComponent from '../../Components/HomeComponents/WeatherComponent';
import {
  selectIsDayTimeStatus,
  setAirQuality,
  setCityName,
  setDayTimeStatus,
  setWeatherData,
} from '../../Redux-Toolkit/CurrentWeatherSlice';
import { useGetCityNameByCoordsQuery } from '../../Redux-Toolkit/WeatherApi/geoCodingAPI';
import { useGetWeatherByCoordsQuery } from '../../Redux-Toolkit/WeatherApi/weatherAPI';
import { onWeatherNotification } from '../../Notification/NotificationBar';

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

  const { data: AirQualityData, refetch: AirQualityRefetch } =
    useGetAirQualityByCoordsQuery(location, {
      skip: !location.lat || !location.lon,
    });

  const requestLocation = useCallback(async () => {
    setLocationError(null);

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
      skipPermissionRequests: true,
      authorizationLevel: 'auto',
      enableBackgroundLocationUpdates: true,
      locationProvider: Platform.OS === 'android' ? 'playServices' : 'auto',
    });

    let attempts = 0;
    const maxAttempts = 3;
    const retryDelay = 3000;
    let successFound = false;

    const tryGetLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          if (successFound) return;

          successFound = true;
          setLocationError(null);
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude, periods: 'today' });
        },
        error => {
          if (!successFound && attempts < maxAttempts - 1) {
            attempts++;
            setTimeout(tryGetLocation, retryDelay);
          } else if (!successFound) {
            if (error.code === 2) {
              setLocationError('Please Turn ON Location');
            } else {
              setLocationError(error.message);
            }
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000,
        },
      );
    };

    tryGetLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      requestLocation();
    }, [requestLocation]),
  );

  const cityName = useMemo(() => {
    if (!GeocodingData) return null;
    return (
      GeocodingData?.neighborhood?.split(' ').slice(0, 2).join(' ') ||
      GeocodingData?.city?.split(' ').slice(0, 2).join(' ')
    );
  }, [GeocodingData]);

  useEffect(() => {
    if (location.lat && location.lon) {
      Promise.all([weatherRefetch(), AirQualityRefetch(), GeocodingRefetch()]);
    }
  }, [location.lat, location.lon]);

  useEffect(() => {
    if (weatherData && !weatherLoading) {
      dispatch(setCityName(GeocodingData));
      dispatch(setWeatherData(weatherData));
      dispatch(setAirQuality(AirQualityData));

      const { sunriseEpoch, sunsetEpoch } = weatherData?.currentConditions;
      const sunrise = moment.unix(sunriseEpoch);
      const sunset = moment.unix(sunsetEpoch);
      const now = moment();
      const isDay = now.isBetween(sunrise, sunset);
      dispatch(setDayTimeStatus(isDay));

      onWeatherNotification(weatherData, cityName);
    }
  }, [weatherData, weatherLoading, dispatch]);

  const isDayTimeStatus = useSelector(selectIsDayTimeStatus);
  const backgroundSource = isDayTimeStatus
    ? Images.DayBackground
    : Images.NightBackground;

  if (locationError || weatherError?.message || GeocodingError?.message) {
    return (
      <ImageBackground
        source={backgroundSource}
        style={[styles.container, { paddingTop: 180 }]}
      >
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
        source={backgroundSource}
        style={[styles.container, { paddingTop: 180 }]}
      >
        <Loader
          size="large"
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
    <ImageBackground
      source={backgroundSource}
      style={[styles.container, { paddingTop: isDayTimeStatus ? 90 : 105 }]}
    >
      {weatherData && (
        <>
          <WeatherComponent
            WeatherData={weatherData}
            CityName={GeocodingData}
          />
          <Image source={Images.House} style={styles.houseImg} />
        </>
      )}
    </ImageBackground>
  );
};

export default WeatherScreen;
