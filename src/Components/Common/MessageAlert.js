import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';
import {
  responsiveFontSize as rf,
  responsiveWidth as rw,
  responsiveHeight as rh,
} from 'react-native-responsive-dimensions';

const MessageAlert = ({Icon, MessageText, bodyStyle}) => {
  return (
    <View style={[styles.container, bodyStyle]}>
      <Image source={Icon} style={styles.Img} />
      <Text style={styles.title}>{MessageText}</Text>
    </View>
  );
};

export default MessageAlert;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: ThemeColors.Purple,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 18,
    gap: 10,
    elevation: 15,
    shadowColor: ThemeColors.Black,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    opacity: 0.8,
  },
  title: {
    fontSize: rf(1.5),
    color: ThemeColors.White,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
  Img: {
    height: rh(3.9),
    width: rw(7.7),
  },
});
