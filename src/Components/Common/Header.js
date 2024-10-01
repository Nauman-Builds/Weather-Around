import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Header = ({Title, backButtonPress}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          accessible
          accessibilityLabel="Go Back"
          onPress={backButtonPress}>
          <Icon name="chevron-back-sharp" size={31} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{Title}</Text>
      </View>
      <TouchableOpacity accessible accessibilityLabel="More Options">
        <Icon name="ellipsis-horizontal-circle" size={33} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: responsiveWidth(92),
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '300',
  },
});
