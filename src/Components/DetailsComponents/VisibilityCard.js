import {View, Text, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';
import {getTitleByVisibility} from '../../Utils/WeatherConditions';

const VisibilityCard = ({visibility}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sunriseCont}>
        <Ionicons name="eye-outline" size={20} color={ThemeColors.Gray} />
        <Text style={styles.label}>VISIBILITY</Text>
      </View>
      <Text style={styles.level}>{visibility?.toFixed(1)}km</Text>
      <Text style={styles.sunset}>{getTitleByVisibility(visibility)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(22),
    width: responsiveWidth(43),
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
    gap: 7,
  },
  label: {
    color: ThemeColors.Gray,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.Regular,
  },
  level: {
    color: ThemeColors.White,
    fontSize: responsiveFontSize(4.1),
    fontFamily: Fonts.Light,
    alignSelf: 'center',
  },
  sunset: {
    color: ThemeColors.LightGray1,
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(1.7),
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default VisibilityCard;
