import React, {memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icons from '../../Assets/Icons';
import Images from '../../Assets/Images';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';
import {useGetWeatherByCityQuery} from '../../Redux-Toolkit/WeatherApi/weatherAPI';
import Loader from '../Common/Loader';
import MessageAlert from '../Common/MessageAlert';
import {
  getWeatherIcon,
  getWeatherIconSize,
} from '../../Utils/WeatherConditions';
import {useNavigation} from '@react-navigation/native';

const WeatherCard = ({location}) => {
  const {data, isLoading, error} = useGetWeatherByCityQuery(
    {cityName: location},
    {
      skip: !location,
    },
  );

  const navigation = useNavigation();

  const handlePress = () => {
    if (data) {
      // Navigate to details screen with weather data
      navigation.navigate('Details', {weatherData: data});
    }
  };

  if (isLoading) {
    return (
      <View style={styles.error_Loading}>
        <Loader
          size={'large'}
          color={ThemeColors.White}
          LoadingText={'Loading weather data'}
        />
      </View>
    );
  }

  if (error) {
    if (
      error?.data === 'Bad API Request:Invalid location parameter value.' ||
      error?.originalStatus === 400 ||
      error?.data?.message === 'city not found'
    ) {
      return ToastAndroid.show('City Not Found', ToastAndroid.SHORT);
    } else {
      return (
        <View style={styles.error_Loading}>
          <MessageAlert
            Icon={Icons.alertIcon}
            MessageText={error?.data || 'Please check Search Query & Network'}
          />
        </View>
      );
    }
  }

  if (!data) return null;

  const {
    currentConditions: {temp, feelslike, conditions, icon},
    city,
  } = data || {};

  return (
    <TouchableOpacity onPress={handlePress}>
      <ImageBackground source={Images.WeatherCardBack} style={styles.card}>
        <Text style={styles.temperature}>{temp?.toFixed(0)}°</Text>
        <View style={styles.tempDetails}>
          <Text style={styles.location}>
            {city?.split(', ').slice(0, 2).join(' ')}
          </Text>
          <Text style={styles.highLow}>{`Feels like°: ${feelslike?.toFixed(
            0,
          )}°`}</Text>
        </View>
        <View style={styles.weatherIconContainer}>
          <Image
            source={getWeatherIcon(icon)}
            style={getWeatherIconSize(icon)}
          />
          <Text style={styles.weatherDescription}>{conditions}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: rw(88),
    height: rh(21.7),
    marginVertical: rh(1.3),
    paddingHorizontal: rw(5.2),
    paddingVertical: rh(1.2),
  },
  error_Loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rh(1.5),
    paddingHorizontal: rw(7),
    paddingVertical: rh(3),
  },
  temperature: {
    color: ThemeColors.White,
    fontSize: rf(8.2),
    fontFamily: Fonts.ExtraLight,
  },
  highLow: {
    color: ThemeColors.White,
    fontSize: rf(1.9),
    fontFamily: Fonts.Light,
  },
  location: {
    color: ThemeColors.White,
    fontSize: rf(2),
  },
  weatherIconContainer: {
    position: 'absolute',
    right: 13,
    gap: 12,
  },
  weatherDescription: {
    color: ThemeColors.White,
    fontSize: rf(1.9),
    fontFamily: Fonts.ExtraLight,
    left: 3,
    textAlign: 'center',
  },
});

export default memo(WeatherCard);
