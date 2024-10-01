import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icoon from 'react-native-vector-icons/FontAwesome6';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';
import Icons from '../../Assets/Icons';

const PressureCard = ({pressure}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Icon name="gauge" size={20} color={ThemeColors.Gray} />
        <Text style={styles.label}>PRESSURE</Text>
      </View>
      <Image source={Icons.pressure} style={styles.sunriseImage} />
      <View style={styles.PressureCont}>
        <Icoon
          name={
            pressure > 1000 ? 'arrow-up-wide-short' : 'arrow-down-wide-short'
          }
          size={20}
          color={ThemeColors.Gray}
        />
        <Text style={styles.windSpeed}>{pressure}mb</Text>
      </View>
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
    gap: 6,
  },
  label: {
    color: ThemeColors.Gray,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  PressureCont: {
    width: responsiveWidth(28),
    position: 'absolute',
    top: responsiveHeight(9),
    alignItems: 'center',
    gap: 2,
  },
  windSpeed: {
    textAlign: 'center',
    color: ThemeColors.White,
    fontSize: responsiveFontSize(2.1),
    fontFamily: Fonts.Regular,
  },
  sunriseImage: {
    height: responsiveHeight(16.5),
    width: responsiveWidth(35),
  },
});

export default PressureCard;
