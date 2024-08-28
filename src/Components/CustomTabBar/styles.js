import {StyleSheet} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import ThemeColors from '../../Utils/Colors';

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.Purple,
    height: rh(8.5),
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 0.1,
    borderColor: ThemeColors.White,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    gap: rw(42),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: rw(5.4),
    height: rh(5.5),
    tintColor: ThemeColors.White,
  },
  iconFocused: {
    tintColor: ThemeColors.LightPurple,
  },
  plusButtonContainer: {
    width: rw(18.7),
    height: rw(18.7),
    borderRadius: 35,
    backgroundColor: ThemeColors.LightPurple,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1,
  },
  plusButton: {
    width: rw(16.7),
    height: rw(16.7),
    borderRadius: 30,
    backgroundColor: ThemeColors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonBackground: {
    position: 'absolute',
    height: rh(12),
    width: rw(62),
    bottom: 0,
    left: rw(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: rw(6),
    height: rh(5.3),
    tintColor: ThemeColors.Purple2,
  },
});
