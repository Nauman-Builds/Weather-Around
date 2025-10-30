import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Header = ({Title, backButtonPress, shareButton, onPress}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          accessible
          accessibilityLabel="Go Back"
          onPress={backButtonPress}>
          <Ionicons name="chevron-back-sharp" size={31} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{Title}</Text>
      </View>
      <TouchableOpacity
        accessible
        accessibilityLabel="More Options"
        onPress={onPress}>
        <Ionicons
          name={
            shareButton ? 'share-social-outline' : 'ellipsis-horizontal-circle'
          }
          size={shareButton ? 29 : 33}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: responsiveWidth(89.5),
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  headerText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '300',
  },
});
