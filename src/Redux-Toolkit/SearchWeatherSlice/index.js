import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  lastSearches: [],
};

const searchWeatherSlice = createSlice({
  name: 'searchWeather',
  initialState,
  reducers: {
    setStoredSearches: (state, action) => {
      state.lastSearches = action.payload;
    },
    addSearch: (state, action) => {
      const newSearch = action.payload;
      const updatedSearches = state.lastSearches.filter(
        search => search.location !== newSearch.location,
      );
      state.lastSearches = [newSearch, ...updatedSearches.slice(0, 2)];
      AsyncStorage.setItem('lastSearches', JSON.stringify(state.lastSearches));
    },
  },
});

export const {addSearch, setStoredSearches} = searchWeatherSlice.actions;
export default searchWeatherSlice.reducer;

export const selectLastSearches = state => state.searchWeather.lastSearches;

export const loadStoredSearches = () => async dispatch => {
  try {
    const storedSearches = await AsyncStorage.getItem('lastSearches');
    if (storedSearches) {
      const parsedSearches = JSON.parse(storedSearches);
      console.log(parsedSearches);
      dispatch(setStoredSearches(parsedSearches));
    }
  } catch (error) {
    console.error('Failed to load stored searches:', error);
  }
};
