import React, {useState} from 'react';
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
} from '../../Redux-Toolkit/CurrentWeatherSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import Payment from '../../Components/PaymentComponent';
import ShareModal from '../../Components/Common/ShareModal';

const DetailScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const reduxCityName = useSelector(selectCityName);
  const reduxWeatherData = useSelector(selectWeatherData);
  const airQualityData = useSelector(selectAirQualityData);

  const {weatherData: navWeatherData} = route.params || {};

  const cityName = navWeatherData?.city || reduxCityName;
  const weatherData = navWeatherData || reduxWeatherData;

  const shareData = `Current weather in ${cityName}:
  - Temperature: ${weatherData?.currentConditions?.temp?.toFixed(0)}°
  - Condition: ${weatherData?.currentConditions?.conditions}
  - Air Quality: ${airQualityData?.aqi || 0}`;

  return (
    <LinearGradient
      colors={['#2C0F5D', '#5E1B80', '#612FAB', '#2C0F5D']}
      style={styles.container}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.9, y: 1.0}}>
      <Header
        Title={'Weather Details'}
        backButtonPress={() => navigation.navigate('Home')}
        shareButton={true}
        onPress={() => setModalVisible(true)}
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
        <Payment />
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
      <ShareModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        shareData={shareData}
      />
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
    gap: 10,
  },
  background: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default DetailScreen;
