import {configureStore} from '@reduxjs/toolkit';
import {getWeatherByOpenWeather} from './WeatherSlice/openWeatherApi';
import {getWeatherByAccuWeather} from './WeatherSlice/accuWeatherApi';

export const store = configureStore({
  reducer: {
    [getWeatherByOpenWeather.reducerPath]: getWeatherByOpenWeather.reducer,
    [getWeatherByAccuWeather.reducerPath]: getWeatherByAccuWeather.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      getWeatherByOpenWeather.middleware,
      getWeatherByAccuWeather.middleware,
    ),
});
