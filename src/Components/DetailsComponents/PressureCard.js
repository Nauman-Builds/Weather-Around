import {View, Text, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
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
        <Ionicons name="speedometer-outline" size={20} color={ThemeColors.Gray} />
        <Text style={styles.label}>PRESSURE</Text>
      </View>
      <Image source={Icons.pressure} style={styles.sunriseImage} />
      <View style={styles.PressureCont}>
        <Ionicons
          name={
            pressure > 1000 ? 'arrow-up-outline' : 'arrow-down-outline'
          }
          size={25}
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
    top: responsiveHeight(8.5),
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
