import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {OpenWeatherAPiKey} from '../../Utils/ApiKey';

export const getWeatherByOpenWeather = createApi({
  reducerPath: 'CurrentWeatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: builder => ({
    getWeatherByCity: builder.query({
      query: cityName => `weather?q=${cityName}&appid=${OpenWeatherAPiKey}`,
    }),
    getWeatherByCoords: builder.query({
      query: ({lat, lon}) =>
        `weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPiKey}`,
    }),
  }),
});

export const {useGetWeatherByCityQuery, useGetWeatherByCoordsQuery} =
  getWeatherByOpenWeather;
