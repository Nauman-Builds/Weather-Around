import {configureStore} from '@reduxjs/toolkit';
import {getCurrentWeather} from './WeatherSlice/weatherApi';

export const store = configureStore({
  reducer: {
    [getCurrentWeather.reducerPath]: getCurrentWeather.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(getCurrentWeather.middleware),
});
