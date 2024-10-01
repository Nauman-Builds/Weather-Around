import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetWeatherByCityQuery} from '../../Redux-Toolkit/WeatherApi/openWeatherAPI';
import Loader from '../../Components/Common/Loader';
import MessageAlert from '../../Components/Common/MessageAlert';
import Icons from '../../Assets/Icons';
import Images from '../../Assets/Images';
import Fonts from '../../Utils/Fonts';
import ThemeColors from '../../Utils/Colors';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Header from '../../Components/Common/Header';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [fetchWeather, setFetchWeather] = useState('');

  const {data, error, isLoading} = useGetWeatherByCityQuery(fetchWeather, {
    skip: !fetchWeather,
  });

  const loadSearchHistory = useCallback(async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
      setSearchHistory([]);
    }
  }, []);

  useEffect(() => {
    loadSearchHistory();
  }, [loadSearchHistory]);

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    setFetchWeather(searchText);
  };

  useEffect(() => {
    const updateHistory = async () => {
      if (data) {
        const updatedHistory = [
          fetchWeather,
          ...searchHistory.filter(
            city => city.toLowerCase() !== fetchWeather.toLowerCase(),
          ),
        ].slice(0, 3);
        await AsyncStorage.setItem(
          'searchHistory',
          JSON.stringify(updatedHistory),
        );
        setSearchHistory(updatedHistory);
        setSearchText('');
      } else if (error && error?.data?.message === 'city not found') {
        ToastAndroid.show('City Not Found', ToastAndroid.SHORT);
        setFetchWeather(''); // Clear the fetchWeather state if city is not found
      }
    };

    if (data) {
      updateHistory();
    }
  }, [data, error, fetchWeather]);

  const WeatherCard = ({cityName}) => {
    const {data: cityData} = useGetWeatherByCityQuery(cityName, {
      skip: !cityName,
    });

    const temperature = cityData?.main?.temp
      ? (cityData.main.temp - 273.15).toFixed(0)
      : 0;
    const feels_like = cityData?.main?.feels_like
      ? (cityData.main.feels_like - 273.15).toFixed(0)
      : 0;
    const weatherDescription = cityData?.weather[0]?.description;
    const capitalizedDescription = weatherDescription
      ? weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)
      : '';

    return (
      <TouchableOpacity>
        <ImageBackground source={Images.WeatherCardBack} style={styles.card}>
          <Text style={styles.temperature}>{temperature}°</Text>
          <View style={styles.tempDetails}>
            <Text style={styles.location}>{cityData?.name}</Text>
            <Text style={styles.highLow}>{`Feels like: ${feels_like}°`}</Text>
          </View>
          <View style={styles.weatherIconContainer}>
            <Image
              source={Icons.moonCloudFastWindIcon}
              style={styles.weatherIcon}
            />
            <Text style={styles.weatherDescription}>
              {capitalizedDescription}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#2C0F5D', '#5E1B80', '#2C0F5D', '#612FAB']}
      style={styles.container}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.9, y: 1.0}}>
      <Header Title={'Weather'} />
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for a city or airport"
          placeholderTextColor="#9E9E9E"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          accessible
          accessibilityLabel="Search Input"
        />
      </View>
      <View
        style={[
          styles.searchResultsContainer,
          {marginVertical: searchHistory.length === 0 ? 30 : 15},
        ]}>
        {searchHistory.length === 0 ? (
          <Text style={styles.placeholderText}>
            No search history available
          </Text>
        ) : (
          <>
            <Text style={styles.recentSearch}>Recent Search</Text>
            {searchHistory.map((city, index) => (
              <WeatherCard key={index} cityName={city} />
            ))}
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
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 15,
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
  searchResultsContainer: {
    alignItems: 'center',
  },
  recentSearch: {
    marginHorizontal: 7,
    fontFamily: Fonts.Light,
    color: ThemeColors.LightGray2,
  },
  placeholderText: {
    color: ThemeColors.LightGray2,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.ExtraLight,
  },
  card: {
    width: rw(87),
    height: rh(21.7),
    marginVertical: rh(1.25),
    paddingHorizontal: 19,
    paddingVertical: 14,
    gap: rh(1.1),
    alignSelf: 'center',
  },
  temperature: {
    color: ThemeColors.White,
    fontSize: rf(8.3),
    fontFamily: Fonts.ExtraLight,
  },
  tempDetails: {
    gap: rh(0.37),
  },
  highLow: {
    color: ThemeColors.White,
    fontSize: rf(2.0),
    fontFamily: Fonts.Light,
  },
  location: {
    color: ThemeColors.White,
    fontSize: rf(2.0),
  },
  weatherIconContainer: {
    position: 'absolute',
    right: 12,
    top: -10,
    alignItems: 'center',
  },
  weatherIcon: {
    width: rw(36),
    height: rh(18),
  },
  weatherDescription: {
    color: ThemeColors.White,
    fontSize: rf(1.9),
    fontFamily: Fonts.ExtraLight,
  },
});

export default SearchScreen;
