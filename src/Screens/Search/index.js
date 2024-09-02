import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherCard from '../../Components/SearchComponents/WeatherCard';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState(null);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setSearchHistory(JSON.parse(history));
        } else {
          setSearchHistory([]); // Initialize with an empty array if there's no history
        }
      } catch (error) {
        console.error('Error loading search history:', error);
        setSearchHistory([]); // Handle error by setting to an empty array
      }
    };

    loadSearchHistory();
  }, []);

  const handleSearch = async () => {
    if (!searchText) return;

    try {
      let updatedHistory = [searchText, ...(searchHistory || [])];

      // Keep only the last three search results
      if (updatedHistory.length > 3) {
        updatedHistory = updatedHistory.slice(0, 3);
      }

      // Save to AsyncStorage
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

      // Update state
      setSearchHistory(updatedHistory);

      // Clear search input
      setSearchText('');
    } catch (error) {
      console.error('Error saving search result:', error);
    }
  };


  return (
    <LinearGradient
      colors={['#2C0F5D', '#5E1B80', '#612FAB', '#2C0F5D']}
      style={styles.container}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.9, y: 1.0}}>
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
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
      </View>
      <View style={{ marginVertical: 25, gap: 25 }}>
        {searchHistory === null ? (
          <Text style={styles.placeholderText}>Loading search history...</Text>
        ) : searchHistory.length === 0 ? (
          <Text style={styles.placeholderText}>No search history available</Text>
        ) : (
          searchHistory.map((city, index) => (
            <WeatherCard key={index} cityName={city} />
          ))
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '300',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A0A66',
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
  placeholderText: {
    color: '#9E9E9E',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SearchScreen;
