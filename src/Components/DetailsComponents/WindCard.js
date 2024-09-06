import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Images from '../../Assets/Images';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';

const WindsCard = ({speed = 9.7, direction = 'N'}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Icon name="wind" size={18} color={ThemeColors.Gray1} />
        <Text style={styles.label}>WIND</Text>
      </View>
      <Image source={Images.WindMeter} style={styles.sunriseImage} />
      <Text style={styles.windSpeed}>{speed} km/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(22.2),
    width: responsiveWidth(43.3),
    backgroundColor: ThemeColors.DarkBlue,
    borderColor: ThemeColors.LightPurple,
    paddingTop: 12,
    paddingHorizontal: 14,
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
  windSpeed: {
    width: responsiveWidth(13),
    position: 'absolute',
    top: responsiveHeight(9),
    textAlign: 'center',
    color: ThemeColors.White,
    fontSize: responsiveFontSize(2.1),
    fontFamily: Fonts.Regular,
  },
  sunriseImage: {
    height: responsiveHeight(16.5),
    width: responsiveWidth(36.3),
  },
});

export default WindsCard;
