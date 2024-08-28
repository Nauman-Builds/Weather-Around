import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ThemeColors from '../../Utils/Colors';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';

const WeatherComponent = ({data}) => {
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.city}>{data?.name}</Text>
      <Text style={styles.temperature}>
        {(data?.main?.temp - 273.15).toFixed(0)}°
      </Text>
      <Text style={styles.condition}>
        {data?.weather[0]?.description?.charAt(0).toUpperCase() +
          data?.weather[0]?.description?.slice(1)}
      </Text>
      <View style={styles.highLowContainer}>
        <Text style={styles.highLow}>
          H: {(data?.main?.temp_max - 273.15).toFixed(0)}°
        </Text>
        <Text style={styles.highLow}>
          L: {(data?.main?.temp_min - 273.15).toFixed(0)}°
        </Text>
      </View>
    </View>
  );
};

export default WeatherComponent;

const styles = StyleSheet.create({
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: rf(5),
    color: ThemeColors.White,
    fontWeight: '300',
  },
  temperature: {
    fontSize: rf(12.5),
    color: ThemeColors.White,
    fontWeight: '200',
  },
  condition: {
    fontSize: rf(2.96),
    color: ThemeColors.Gray,
    fontWeight: '300',
  },
  highLowContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  highLow: {
    fontSize: rf(2.96),
    color: ThemeColors.White,
    fontWeight: 'semibold',
    marginHorizontal: 10,
  },
});
