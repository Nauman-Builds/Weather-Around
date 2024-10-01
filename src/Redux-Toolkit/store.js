import {configureStore} from '@reduxjs/toolkit';
import {getWeatherByOpenWeather} from './WeatherApi/openWeatherAPI';
import {getWeatherByAccuWeather} from './WeatherApi/accuWeatherAPI';
import weatherDataReducer from './WeatherSlice/WeatherDataSlice';
import {getCityNameByCoords} from './WeatherApi/geoCodingAPI';
import {getWeatherByVisualCrossing} from './WeatherApi/weatherAPI';

export const store = configureStore({
  reducer: {
    [getWeatherByOpenWeather.reducerPath]: getWeatherByOpenWeather.reducer,
    [getWeatherByAccuWeather.reducerPath]: getWeatherByAccuWeather.reducer,
    [getWeatherByVisualCrossing.reducerPath]: getWeatherByVisualCrossing.reducer,
    [getCityNameByCoords.reducerPath]: getCityNameByCoords.reducer,
    weatherData: weatherDataReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      getWeatherByOpenWeather.middleware,
      getWeatherByAccuWeather.middleware,
      getCityNameByCoords.middleware,
      getWeatherByVisualCrossing.middleware,
    ),
});
