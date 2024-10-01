import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const WeatherComponent = ({CityName, WeatherData}) => {
  const {
    currentConditions: {temp, feelslike, conditions},
    days: {tempmax, tempmin},
  } = WeatherData;

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.city}>
        {CityName?.neighborhood?.split(' ').slice(0, 2).join(' ') ||
          CityName?.city?.split(' ').slice(0, 2).join(' ')}
      </Text>
      <Text style={styles.temperature}>{temp?.toFixed(0) || 0}°</Text>
      <Text style={styles.condition}>{conditions || ''}</Text>
      <View style={styles.lowHigh}>
        <Text style={styles.lowHighText}>
          L:<Text style={styles.feelsLikeTxt}>{tempmin?.toFixed(0) || 0}°</Text>
        </Text>
        <Text style={styles.lowHighText}>
          H:<Text style={styles.feelsLikeTxt}>{tempmax?.toFixed(0) || 0}°</Text>
        </Text>
      </View>
      <Text style={styles.feels_like}>
        Feels like:{' '}
        <Text style={styles.feelsLikeTxt}>{feelslike?.toFixed(0) || 0}°</Text>
      </Text>
    </View>
  );
};

export default React.memo(WeatherComponent);
