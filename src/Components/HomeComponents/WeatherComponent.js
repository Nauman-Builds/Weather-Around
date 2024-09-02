import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ThemeColors from '../../Utils/Colors';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import {Fonts} from '../../Utils/Fonts';

const WeatherComponent = ({data}) => {
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.city}>{data?.name || ''}</Text>
      <Text style={styles.temperature}>
        {(data?.main?.temp - 273.15).toFixed(0) || 0}°
      </Text>
      <Text style={styles.condition}>
        {data?.weather[0]?.description?.charAt(0).toUpperCase() +
          data?.weather[0]?.description?.slice(1)}
      </Text>
      <Text style={styles.feels_like}>
        Feels like°: {(data?.main?.feels_like - 273.15).toFixed(0) || 0}°
      </Text>
    </View>
  );
};

export default WeatherComponent;

const styles = StyleSheet.create({
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  city: {
    fontFamily: Fonts.Light,
    fontSize: rf(4.7),
    color: ThemeColors.White,
  },
  temperature: {
    fontFamily: Fonts.ExtraLight,
    fontSize: rf(12.5),
    color: ThemeColors.White,
  },
  condition: {
    fontSize: rf(3),
    fontFamily: Fonts.Light,
    color: ThemeColors.Gray,
  },
  feels_like: {
    fontFamily: Fonts.Regular,
    fontSize: rf(2.6),
    color: ThemeColors.White,
  },
});
