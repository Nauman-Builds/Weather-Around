import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Fontisto';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';

const RainCard = ({precipitation, rain}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Icon name="blood-drop" size={17} color={ThemeColors.Gray} />
        <Text style={styles.label}>RAINFALL</Text>
      </View>
      <Text style={styles.level1}>
        {rain || 0} mm <Text style={styles.level2}>last hour</Text>
      </Text>
      <Text style={styles.sunset}>
        {precipitation || 0} mm expected in next 24h
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(22),
    width: responsiveWidth(43),
    backgroundColor: ThemeColors.DarkBlue,
    borderColor: ThemeColors.LightPurple,
    padding: 15,
    borderWidth: 1.5,
    borderRadius: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sunriseCont: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: ThemeColors.Gray,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  level1: {
    width: responsiveWidth(22),
    color: ThemeColors.White,
    fontSize: responsiveFontSize(2.3),
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
  level2: {
    width: responsiveWidth(26),
    color: ThemeColors.LightPurple,
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.Light,
    textAlign: 'center',
  },
  sunset: {
    color: ThemeColors.LightGray1,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
  },
});

export default RainCard;
