import {StyleSheet} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import ThemeColors from '../../Utils/Colors';

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    position: 'absolute',
    height: rh(10.8),
    width: rw(100),
    justifyContent: 'space-around',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    gap: rw(47),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -4,
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
    width: rw(18),
    height: rw(18),
    borderRadius: 40,
    backgroundColor: ThemeColors.LightPurple,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },
  plusButton: {
    width: rw(16.5),
    height: rw(16.5),
    borderRadius: 35,
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
