import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: responsiveHeight(101),
    width: responsiveWidth(100),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 65,
    paddingTop: 110,
  },
  houseImg: {
    height: responsiveHeight(35),
    width: responsiveWidth(80),
    opacity: 0.97,
  },
});

export default styles;
