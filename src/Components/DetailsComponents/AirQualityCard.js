import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ThemeColors from '../../Utils/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Fonts from '../../Utils/Fonts';

const AirQualityCard = ({CurrentAirQuality}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Icons name="dots-hexagon" size={18} color={ThemeColors.Gray1} />
        <Text style={styles.label}>AIR QUALITY</Text>
      </View>
      <Text style={styles.riskLevel}>{CurrentAirQuality}</Text>
      <LinearGradient
        colors={['#3D89D4', '#AB3FC6', '#F23D57']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.progressBar}>
        <View style={styles.indicator} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(15.5),
    width: responsiveWidth(90),
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
    color: ThemeColors.Gray1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  riskLevel: {
    color: ThemeColors.White,
    fontSize: responsiveFontSize(2.6),
    fontFamily: Fonts.Regular,
    marginTop: 7,
    marginBottom: 6,
  },
  progressBar: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    height: responsiveHeight(0.8),
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
  },
  indicator: {
    width: responsiveWidth(3.3),
    height: responsiveHeight(1.6),
    backgroundColor: ThemeColors.White,
    left: responsiveWidth(25),
    borderRadius: 6,
  },
});

export default AirQualityCard;
