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
import {useGetWeatherByCityQuery} from '../../Redux-Toolkit/WeatherApi/openWeatherAPI';
import Loader from '../Common/Loader';
import MessageAlert from '../Common/MessageAlert';

const WeatherCard = ({cityName, onPress}) => {
  const {data, error, isLoading} = useGetWeatherByCityQuery(cityName, {
    skip: !cityName,
  });

  if (isLoading) {
    return (
      <Loader
        size={'large'}
        color={ThemeColors.White}
        LoadingText={'Loading weather data'}
      />
    );
  }

  if (error) {
    if (error?.data?.message === 'city not found') {
      return ToastAndroid.show('City Not Found', ToastAndroid.SHORT);
    } else {
      return (
        <MessageAlert
          Icon={Icons.alertIcon}
          MessageText={error?.data?.message?.toUpperCase()}
          bodyStyle={styles.card}
        />
      );
    }
  }

  const temperature = data?.main?.temp
    ? (data.main.temp - 273.15).toFixed(0)
    : 0;
  const feels_like = data?.main?.feels_like
    ? (data.main.feels_like - 273.15).toFixed(0)
    : 0;
  const weatherDescription = data?.weather[0]?.description;
  const capitalizedDescription = weatherDescription
    ? weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)
    : '';

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground source={Images.WeatherCardBack} style={styles.card}>
        <Text style={styles.temperature}>{temperature}°</Text>
        <View style={styles.tempDetails}>
          <Text style={styles.location}>{data?.name}</Text>
          <Text style={styles.highLow}>{`Feels like°: ${feels_like}°`}</Text>
        </View>
        <View style={styles.weatherIconContainer}>
          <Image
            source={Icons.moonCloudFastWindIcon}
            style={styles.weatherIcon}
          />
          <Text style={styles.weatherDescription}>
            {capitalizedDescription}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: rw(88),
    height: rh(21.7),
    marginVertical: rh(1.25),
    paddingHorizontal: rw(5.2),
    paddingVertical: rh(1.2),
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
    right: 12,
    top: -11,
    alignItems: 'center',
  },
  weatherIcon: {
    width: rw(36),
    height: rh(18),
  },
  weatherDescription: {
    color: ThemeColors.White,
    fontSize: rf(1.9),
    fontFamily: Fonts.ExtraLight,
  },
});

export default memo(WeatherCard);
