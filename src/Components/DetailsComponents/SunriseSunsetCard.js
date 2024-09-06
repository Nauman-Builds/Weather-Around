import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Images from '../../Assets/Images';
import Fonts from '../../Utils/Fonts';
import ThemeColors from '../../Utils/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const SunriseSunsetCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Icon name="sunrise" size={18} color={ThemeColors.Gray1} />
        <Text style={styles.label}>SUNRISE</Text>
      </View>
      <Text style={styles.time}>5:28 AM</Text>
      <Image source={Images.Sunrise} style={styles.sunriseImage} />
      <Text style={styles.sunset}>Sunset: 7:25PM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(22.2),
    width: responsiveWidth(44),
    backgroundColor: ThemeColors.DarkBlue,
    borderColor: ThemeColors.LightPurple,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderRadius: 22,
    alignItems: 'center',
  },
  sunriseCont: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 7,
  },
  label: {
    color: ThemeColors.Gray1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  time: {
    color: ThemeColors.White,
    fontSize: responsiveFontSize(3.9),
    fontFamily: Fonts.Light,
    marginVertical: 2,
  },
  sunriseImage: {
    height: responsiveHeight(6.7),
    width: responsiveWidth(43),
  },
  sunset: {
    color: ThemeColors.Gray2,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(1.7),
    marginTop: -3,
  },
});

export default SunriseSunsetCard;
