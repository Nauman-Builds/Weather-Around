import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';

const UVIndexCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Icon name="sunny-sharp" size={18} color={ThemeColors.Gray1} />
        <Text style={styles.label}>UV INDEX</Text>
      </View>
      <Text style={styles.level}>4</Text>
      <Text style={styles.description}>Moderate</Text>
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
    height: responsiveHeight(22.2),
    width: responsiveWidth(43),
    backgroundColor: ThemeColors.DarkBlue,
    borderColor: ThemeColors.LightPurple,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  level: {
    color: ThemeColors.White,
    fontSize: responsiveFontSize(4.3),
    fontFamily: Fonts.Light,
    marginTop: 2,
  },
  description: {
    color: ThemeColors.White,
    fontSize: responsiveFontSize(2.6),
    fontFamily: Fonts.Regular,
    marginBottom: 6,
  },
  progressBar: {
    flexDirection: 'row',
    width: responsiveWidth(35),
    height: responsiveHeight(0.8),
    borderRadius: 10,
    marginVertical: 7,
    alignItems: 'center',
  },
  indicator: {
    width: responsiveWidth(3.3),
    height: responsiveHeight(1.5),
    backgroundColor: ThemeColors.White,
    left: responsiveWidth(10),
    borderRadius: 6,
  },
});

export default UVIndexCard;
