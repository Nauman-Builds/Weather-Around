import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loader = ({size, LoadingText}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={'#fff'} />
      <Text style={styles.title}>{LoadingText}</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: '#362e6b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    gap: 15,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      height: 5,
      width: 5,
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'sans-serif',
  },
});
