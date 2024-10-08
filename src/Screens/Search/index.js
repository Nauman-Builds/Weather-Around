import React, {useState, useEffect, useCallback} from 'react';
import {TextInput, StyleSheet, FlatList, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WeatherCard from '../../Components/SearchComponents/WeatherCard';
import {
  addSearch,
  loadStoredSearches,
  selectLastSearches,
} from '../../Redux-Toolkit/SearchWeatherSlice';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../Components/Common/Header';
import Fonts from '../../Utils/Fonts';
import ThemeColors from '../../Utils/Colors';

const SearchWeatherScreen = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const dispatch = useDispatch();
  const recentSearches = useSelector(selectLastSearches);

  useEffect(() => {
    dispatch(loadStoredSearches());
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    const trimmedLocation = searchLocation.trim();
    if (trimmedLocation !== '') {
      dispatch(addSearch({location: trimmedLocation}));
      setSearchLocation('');
    }
  }, [searchLocation, dispatch]);

  const renderItem = useCallback(
    ({item}) => <WeatherCard location={item?.location} />,
    [],
  );

  return (
    <LinearGradient
      colors={['#FF69B4', '#5E1B80', '#2C0F5D', '#612FAB', '#3e8ce8']} //'#8A2BE2', '#3e8ce8', '#fd8a96', '#FF69B4'
      style={styles.container}
      start={{x: -0.55, y: 0.15}}
      end={{x: 0.35, y: 1.15}}>
      <Header Title={'Weather'} />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for a city or airport"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
          value={searchLocation}
          onChangeText={setSearchLocation}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          accessible
          accessibilityLabel="Search Input"
        />
      </View>
      <View
        style={[
          styles.searchResultsContainer,
          {marginVertical: recentSearches.length === 0 ? 18 : 12},
        ]}>
        {recentSearches.length === 0 ? (
          <Text style={styles.placeholderText}>
            No search history available
          </Text>
        ) : (
          <>
            <Text style={styles.recentSearch}>Recent Search</Text>
            <FlatList
              data={recentSearches}
              renderItem={renderItem}
              keyExtractor={item => item.location}
              ListEmptyComponent={() => (
                <Text>
                  No recent searches found. Search a location to begin!
                </Text>
              )}
            />
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    paddingHorizontal: rw(4),
    paddingTop: rh(4.3),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A0A66',
    borderRadius: 10,
    marginTop: rh(1.2),
    marginHorizontal: 4,
    paddingHorizontal: 12,
    height: rh(5),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
  },
  searchResultsContainer: {
    alignItems: 'center',
  },
  recentSearch: {
    fontFamily: Fonts.Light,
    color: ThemeColors.DarkGray,
    marginBottom: -5,
  },
  placeholderText: {
    color: ThemeColors.DarkGray,
    fontSize: rf(1.8),
    textAlign: 'center',
    fontFamily: Fonts.ExtraLight,
  },
});

export default SearchWeatherScreen;
