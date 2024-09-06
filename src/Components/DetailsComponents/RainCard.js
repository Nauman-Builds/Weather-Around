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

const RainCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Icon name="blood-drop" size={17} color={ThemeColors.Gray1} />
        <Text style={styles.label}>RAINFALL</Text>
      </View>
      <Text style={styles.level1}>
        102.8 mm <Text style={styles.level2}>last hour</Text>
      </Text>

      <Text style={styles.sunset}>1.2 mm expected in next 24h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(22),
    width: responsiveWidth(44),
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
    color: ThemeColors.Gray1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  level1: {
    width: responsiveWidth(26),
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
    color: ThemeColors.Gray2,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
  },
});

export default RainCard;
