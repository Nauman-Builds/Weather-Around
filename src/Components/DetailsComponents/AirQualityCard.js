import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import ThemeColors from '../../Utils/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Fonts from '../../Utils/Fonts';
import {getIndicatorByAQI, getTitleByAQI} from '../../Utils/WeatherConditions';

const AirQualityCard = ({CurrentAirQuality}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Ionicons name="logo-apple-ar" size={18} color={ThemeColors.Gray} />
        <Text style={styles.label}>AIR QUALITY</Text>
      </View>
      <Text style={styles.riskLevel}>{`${CurrentAirQuality} ${getTitleByAQI(
        CurrentAirQuality,
      )}`}</Text>
      <LinearGradient
        colors={['#3D89D4', '#AB3FC6', '#F23D57']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.progressBar}>
        <View
          style={[
            styles.indicator,
            {left: responsiveWidth(getIndicatorByAQI(CurrentAirQuality))},
          ]}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(15.5),
    width: responsiveWidth(88),
    backgroundColor: ThemeColors.DarkBlue,
    borderColor: ThemeColors.LightPurple,
    padding: 18,
    borderWidth: 1.5,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sunriseCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  label: {
    color: ThemeColors.Gray,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  riskLevel: {
    color: ThemeColors.White,
    fontSize: responsiveFontSize(2.4),
    fontFamily: Fonts.Regular,
    marginVertical: 9,
  },
  progressBar: {
    flexDirection: 'row',
    width: responsiveWidth(77),
    height: responsiveHeight(0.9),
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  indicator: {
    width: responsiveWidth(3.3),
    height: responsiveHeight(1.6),
    backgroundColor: ThemeColors.White,
    borderRadius: 6,
  },
});

export default AirQualityCard;
