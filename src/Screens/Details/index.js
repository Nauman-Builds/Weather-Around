import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Common/Header';
import SunriseSunsetCard from '../../Components/DetailsComponents/SunriseSunsetCard';
import AirQualityCard from '../../Components/DetailsComponents/AirQualityCard';
import UVIndexCard from '../../Components/DetailsComponents/UVIndexCard';
import WindsCard from '../../Components/DetailsComponents/WindCard';
import HumidityCard from '../../Components/DetailsComponents/HumidityCard';
import RainCard from '../../Components/DetailsComponents/RainCard';
import WeatherCard from '../../Components/SearchComponents/WeatherCard';
import VisibilityCard from '../../Components/DetailsComponents/VisibilityCard';

const DetailScreen = () => {
  return (
    <LinearGradient
      colors={['#2C0F5D', '#5E1B80', '#612FAB', '#2C0F5D']}
      style={styles.container}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.9, y: 1.0}}>
      <Header Title={'Weather Details'} />
      <ScrollView
        style={{borderRadius: 10}}
        contentContainerStyle={styles.cardsContainer}>
        <AirQualityCard />
        <View style={styles.background}>
          <UVIndexCard />
          <SunriseSunsetCard />
        </View>
        <View style={styles.background}>
          <WindsCard speed={9.7} direction="N" />
          <HumidityCard />
        </View>
        <View style={styles.background}>
          <RainCard />
          <VisibilityCard />
        </View>
        <View style={styles.background}>
          <RainCard />
          <HumidityCard />
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
