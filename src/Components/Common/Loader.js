import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThemeColors from '../../Utils/Colors';
import Fonts from '../../Utils/Fonts';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';

const Loader = ({size, LoadingText, bodyStyle}) => {
  return (
    <View style={[styles.container, bodyStyle]}>
      <ActivityIndicator size={size} color={ThemeColors.White} />
      <Text style={styles.title}>{LoadingText}</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: ThemeColors.Purple,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 12,
    elevation: 15,
    shadowColor: ThemeColors.Black,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    opacity: 0.9,
  },
  title: {
    fontSize: rf(1.6),
    color: ThemeColors.White,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
});
