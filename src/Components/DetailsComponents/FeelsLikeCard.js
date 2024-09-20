import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';

const FeelsLikeCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Icon name="temperature-low" size={18} color={ThemeColors.Gray1} />
        <Text style={styles.label}>FEELS LIKE</Text>
      </View>
      <Text style={styles.level}>50°</Text>
      <Text style={styles.sunset}>Similar to the actual temperature</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(22),
    width: responsiveWidth(44),
    backgroundColor: ThemeColors.DarkBlue,
    borderColor: ThemeColors.LightPurple,
    paddingVertical: 15,
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
    color: ThemeColors.Gray1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  level: {
    color: ThemeColors.White,
    fontSize: responsiveFontSize(4.5),
    fontFamily: Fonts.Light,
    alignSelf: 'center',
  },
  sunset: {
    color: ThemeColors.Gray2,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(1.7),
    textAlign: 'center',
  },
});

export default FeelsLikeCard;
