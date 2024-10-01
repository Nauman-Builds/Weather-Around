import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';
import Icons from '../../Assets/Icons';
import {getTitleByHumidity} from '../../Utils/WeatherConditions';

const HumidityCard = ({humidity}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Image source={Icons.humidityIcon} style={styles.humidityIcon} />
        <Text style={styles.label}>HUMIDITY</Text>
      </View>
      <Text style={styles.level}>{humidity}%</Text>
      <Text style={styles.sunset}>{getTitleByHumidity(humidity)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(22),
    width: responsiveWidth(43.2),
    backgroundColor: ThemeColors.DarkBlue,
    borderColor: ThemeColors.LightPurple,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderRadius: 22,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sunriseCont: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: ThemeColors.Gray,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  level: {
    color: ThemeColors.White,
    fontSize: responsiveFontSize(4.3),
    fontFamily: Fonts.Light,
    alignSelf: 'center',
  },
  sunset: {
    color: ThemeColors.LightGray1,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(1.7),
    textAlign: 'center',
    alignSelf: 'center',
  },
  humidityIcon: {
    height: responsiveHeight(1.8),
    width: responsiveWidth(4.55),
    marginTop: 2,
  },
});

export default HumidityCard;
