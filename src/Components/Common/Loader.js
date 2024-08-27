import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThemeColors from '../../Utils/Colors';

const Loader = ({size, LoadingText}) => {
  return (
    <View style={styles.container}>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: ThemeColors.Black,
    fontFamily: 'sans-serif',
  },
});
