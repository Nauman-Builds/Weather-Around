import {StyleSheet} from 'react-native';
import ThemeColors from '../../../Utils/Colors';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import Fonts from '../../../Utils/Fonts';

const styles = StyleSheet.create({
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 3,
  },
  city: {
    fontFamily: Fonts.Light,
    fontSize: rf(5),
    color: ThemeColors.White,
    marginVertical: -10,
  },
  temperature: {
    fontFamily: Fonts.ExtraLight,
    fontSize: rf(12),
    color: ThemeColors.White,
    marginLeft: 7,
  },
  condition: {
    fontSize: rf(3),
    fontFamily: Fonts.Thin,
    color: ThemeColors.Gray2,
  },
  feels_like: {
    fontFamily: Fonts.Light,
    fontSize: rf(2.6),
    color: ThemeColors.White,
  },
});

export default styles;
