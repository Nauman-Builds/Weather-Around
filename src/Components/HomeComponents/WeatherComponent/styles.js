import {StyleSheet} from 'react-native';
import ThemeColors from '../../../Utils/Colors';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import Fonts from '../../../Utils/Fonts';

const styles = StyleSheet.create({
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 2,
  },
  city: {
    fontFamily: Fonts.Light,
    fontSize: rf(5),
    color: ThemeColors.White,
    marginVertical: -7,
    textAlign: 'center',
  },
  temperature: {
    fontFamily: Fonts.ExtraLight,
    fontSize: rf(12),
    color: ThemeColors.White,
    marginLeft: 7,
    textAlign: 'center',
  },
  condition: {
    fontSize: rf(2.8),
    fontFamily: Fonts.ExtraLight,
    color: ThemeColors.LightGray2,
    textAlign: 'center',
  },
  feels_like: {
    fontFamily: Fonts.ExtraLight,
    fontSize: rf(2.5),
    color: ThemeColors.LightGray,
  },
  feelsLikeTxt: {
    fontFamily: Fonts.ExtraLight,
    fontSize: rf(2.5),
    color: ThemeColors.LightGray,
  },
  lowHigh: {
    flexDirection: 'row',
    gap: 8,
  },
  lowHighText: {
    fontFamily: Fonts.ExtraLight,
    color: ThemeColors.LightGray,
    fontSize: rf(2.5),
  },
});

export default styles;
