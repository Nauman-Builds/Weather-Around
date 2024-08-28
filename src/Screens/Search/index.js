import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Icon name="chevron-back-sharp" size={31} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Weather</Text>
        </View>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal-circle" size={33} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for a city or airport"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082', // Background color from the image
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '300',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A0A66', // Slightly darker background for the search bar
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 4,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
  },
});

export default SearchScreen;
