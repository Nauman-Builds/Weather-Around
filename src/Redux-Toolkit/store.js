import {configureStore} from '@reduxjs/toolkit';
import {getWeatherByOpenWeather} from './WeatherApi/openWeatherAPI';
import {getWeatherByAccuWeather} from './WeatherApi/accuWeatherAPI';
import weatherDataReducer from './CurrentWeatherSlice';
import searchWeatherReducer from './SearchWeatherSlice';
import {getCityNameByCoords} from './WeatherApi/geoCodingAPI';
import {getWeatherByVisualCrossing} from './WeatherApi/weatherAPI';
import {getPaymentIntentByStripe} from './PaymentAPI';

export const store = configureStore({
  reducer: {
    [getPaymentIntentByStripe.reducerPath]: getPaymentIntentByStripe.reducer,
    [getWeatherByOpenWeather.reducerPath]: getWeatherByOpenWeather.reducer,
    [getWeatherByAccuWeather.reducerPath]: getWeatherByAccuWeather.reducer,
    [getWeatherByVisualCrossing.reducerPath]:
      getWeatherByVisualCrossing.reducer,
    [getCityNameByCoords.reducerPath]: getCityNameByCoords.reducer,
    weatherData: weatherDataReducer,
    searchWeather: searchWeatherReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      getWeatherByOpenWeather.middleware,
      getWeatherByAccuWeather.middleware,
      getCityNameByCoords.middleware,
      getWeatherByVisualCrossing.middleware,
      getPaymentIntentByStripe.middleware,
    ),
});
