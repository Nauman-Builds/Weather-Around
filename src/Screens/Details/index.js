import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Header from '../../Components/Common/Header';
import SunriseSunsetCard from '../../Components/DetailsComponents/SunriseSunsetCard';
import AirQualityCard from '../../Components/DetailsComponents/AirQualityCard';
import UVIndexCard from '../../Components/DetailsComponents/UVIndexCard';
import WindsCard from '../../Components/DetailsComponents/WindCard';
import HumidityCard from '../../Components/DetailsComponents/HumidityCard';
import RainCard from '../../Components/DetailsComponents/RainCard';
import VisibilityCard from '../../Components/DetailsComponents/VisibilityCard';
import FeelsLikeCard from '../../Components/DetailsComponents/FeelsLikeCard';
import PressureCard from '../../Components/DetailsComponents/PressureCard';
import WeatherCard from '../../Components/DetailsComponents/WeatherCard';
import {
  selectCityName,
  selectWeatherData,
  selectAirQualityData,
} from '../../Redux-Toolkit/WeatherSlice/WeatherDataSlice';
import {useNavigation} from '@react-navigation/native';

const DetailScreen = () => {
  const cityName = useSelector(selectCityName);
  const weatherData = useSelector(selectWeatherData);
  const airQualityData = useSelector(selectAirQualityData);

  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#2C0F5D', '#5E1B80', '#612FAB', '#2C0F5D']}
      style={styles.container}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.9, y: 1.0}}>
      <Header
        Title={'Weather Details'}
        backButtonPress={() => navigation.navigate('Home')}
      />
      <ScrollView
        style={{borderRadius: 10}}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}>
        <WeatherCard cityName={cityName} weatherData={weatherData} />
        <AirQualityCard CurrentAirQuality={airQualityData?.aqi || 0} />
        <View style={styles.background}>
          <UVIndexCard UVIndex={weatherData?.currentConditions?.uvindex} />
          <SunriseSunsetCard
            sunrise={weatherData?.currentConditions?.sunriseEpoch || '0:00'}
            sunset={weatherData?.currentConditions?.sunsetEpoch || '0:00'}
          />
        </View>
        <View style={styles.background}>
          <WindsCard speed={weatherData?.currentConditions?.windspeed} />
          <RainCard
            precipitation={weatherData?.currentConditions?.precip?.toFixed(0)}
            rain={weatherData?.currentConditions?.snow?.toFixed(1)}
          />
        </View>
        <View style={styles.background}>
          <FeelsLikeCard
            feelsLike={weatherData?.currentConditions?.feelslike}
          />
          <HumidityCard humidity={weatherData?.currentConditions?.humidity} />
        </View>
        <View style={styles.background}>
          <VisibilityCard
            visibility={weatherData?.currentConditions?.visibility}
          />
          <PressureCard pressure={weatherData?.currentConditions?.pressure} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    alignItems: 'center',
  },
  cardsContainer: {
    paddingBottom: 110,
    marginTop: 10,
    alignItems: 'center',
    gap: 12,
  },
  background: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default DetailScreen;
