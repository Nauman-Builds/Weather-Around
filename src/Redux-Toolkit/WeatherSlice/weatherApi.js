import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {APiKey} from '../../Utils/ApiKey';

export const getCurrentWeather = createApi({
  reducerPath: 'CurrentWeatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: builder => ({
    getWeatherByCity: builder.query({
      query: (cityName) => `weather?q=${cityName}&appid=${APiKey}`,
    }),
    getWeatherByCoords: builder.query({
      query: ({lat, lon}) => `weather?lat=${lat}&lon=${lon}&appid=${APiKey}`,
    }),
  }),
});

export const {useGetWeatherByCityQuery, useGetWeatherByCoordsQuery} = getCurrentWeather;
