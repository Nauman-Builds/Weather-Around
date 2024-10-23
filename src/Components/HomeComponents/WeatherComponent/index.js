import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {selectIsDayTimeStatus} from '../../../Redux-Toolkit/CurrentWeatherSlice';
import ThemeColors from '../../../Utils/Colors';
import {useSelector} from 'react-redux';

const WeatherComponent = ({CityName, WeatherData}) => {
  const isDayTime = useSelector(selectIsDayTimeStatus);
  const {
    currentConditions: {temp, feelslike, conditions},
    days: {tempmax, tempmin},
  } = WeatherData;

  const textColor = isDayTime ? ThemeColors.DelftBlue : ThemeColors.White;

  return (
    <View style={styles.weatherContainer}>
      <Text style={[styles.city, {color: textColor}]}>
        {CityName?.neighborhood?.split(' ').slice(0, 2).join(' ') ||
          CityName?.city?.split(' ').slice(0, 2).join(' ')}
      </Text>
      <Text style={[styles.temperature, {color: textColor}]}>
        {temp?.toFixed(0) || 0}°
      </Text>
      <Text style={[styles.condition, {color: textColor}]}>
        {conditions || ''}
      </Text>
      <View style={styles.lowHigh}>
        <Text style={[styles.lowHighText, {color: textColor}]}>
          L:
          <Text style={[styles.feelsLikeTxt, {color: textColor}]}>
            {tempmin?.toFixed(0) || 0}°
          </Text>
        </Text>
        <Text style={[styles.lowHighText, {color: textColor}]}>
          H:
          <Text style={[styles.feelsLikeTxt, {color: textColor}]}>
            {tempmax?.toFixed(0) || 0}°
          </Text>
        </Text>
      </View>
      <Text style={[styles.feels_like, {color: textColor}]}>
        Feels like:{' '}
        <Text style={[styles.feelsLikeTxt, {color: textColor}]}>
          {feelslike?.toFixed(0) || 0}°
        </Text>
      </Text>
    </View>
  );
};

export default React.memo(WeatherComponent);
