import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  weatherData: null,
  airQuality: null,
  cityName: null,
};

const weatherDataSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setAirQuality: (state, action) => {
      state.airQuality = action.payload;
    },
  },
});

export const {setWeatherData, setAirQuality, setCityName} =
  weatherDataSlice.actions;

export const selectCityName = state => state.weatherData?.cityName;
export const selectWeatherData = state => state.weatherData?.weatherData;
export const selectAirQualityData = state => state.weatherData?.airQuality;

export default weatherDataSlice.reducer;
