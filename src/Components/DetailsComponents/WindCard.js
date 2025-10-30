import {View, Text, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import Images from '../../Assets/Images';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';

const WindsCard = ({speed}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Ionicons name="navigate-outline" size={17} color={ThemeColors.Gray} />
        <Text style={styles.label}>WIND</Text>
      </View>
      <Image source={Images.WindMeter} style={styles.sunriseImage} />
      <Text style={styles.windSpeed}>{speed?.toFixed(1)} km/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(22.2),
    width: responsiveWidth(43),
    backgroundColor: ThemeColors.DarkBlue,
    borderColor: ThemeColors.LightPurple,
    paddingTop: 11,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 22,
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
  windSpeed: {
    width: responsiveWidth(13),
    position: 'absolute',
    top: responsiveHeight(8.8),
    textAlign: 'center',
    color: ThemeColors.White,
    fontSize: responsiveFontSize(2.1),
    fontFamily: Fonts.Regular,
  },
  sunriseImage: {
    height: responsiveHeight(16.4),
    width: responsiveWidth(36),
  },
});

export default WindsCard;
