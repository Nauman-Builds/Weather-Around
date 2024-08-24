import {StyleSheet} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#362e6b',
    height: rh(9),
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 0.1,
    borderColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
    tintColor: 'white',
  },
  iconFocused: {
    tintColor: '#7582F4',
  },
  plusButtonContainer: {
    width: rw(18.7),
    height: rw(18.7),
    borderRadius: 35,
    backgroundColor: '#7582F4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1,
  },
  plusButton: {
    width: rw(16.7),
    height: rw(16.7),
    borderRadius: 30,
    backgroundColor: 'white',
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
    tintColor: '#48319D',
  },
});
