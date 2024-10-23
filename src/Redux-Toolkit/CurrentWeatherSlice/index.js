import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  weatherData: null,
  airQuality: null,
  cityName: null,
  isDayTime: true,
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
    setDayTimeStatus: (state, action) => {
      state.isDayTime = action.payload;
    },
  },
});

export const {setWeatherData, setAirQuality, setCityName, setDayTimeStatus} =
  weatherDataSlice.actions;

export const selectCityName = state => state.weatherData?.cityName;
export const selectWeatherData = state => state.weatherData?.weatherData;
export const selectAirQualityData = state => state.weatherData?.airQuality;
export const selectIsDayTimeStatus = state => state.weatherData?.isDayTime;

export default weatherDataSlice.reducer;
