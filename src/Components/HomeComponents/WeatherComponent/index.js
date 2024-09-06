import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

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
