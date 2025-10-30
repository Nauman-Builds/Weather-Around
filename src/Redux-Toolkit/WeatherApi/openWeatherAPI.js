import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const transformWeatherResponse = res => ({
  main: res?.main || {},
  wind: res?.wind?.speed || '',
  visibility: res?.visibility || '',
  sys: res?.sys || {},
  name: res?.name || '',
  weather: res?.weather[0]?.description || '',
  clouds: res?.clouds?.all || '',
});

export const getWeatherByOpenWeather = createApi({
  reducerPath: 'CurrentWeatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: builder => ({
    getWeatherByCity: builder.query({
      query: cityName =>
        `weather?q=${cityName}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
      transformResponse: transformWeatherResponse,
    }),
    getWeatherByCoords: builder.query({
      query: ({ lat, lon }) =>
        `weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
      transformResponse: transformWeatherResponse,
    }),
    getForecastByCoords: builder.query({
      query: ({ lat, lon }) =>
        `forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
      transformResponse: res => res?.list,
    }),
    getAirQualityByCoords: builder.query({
      query: ({ lat, lon }) =>
        `/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
      transformResponse: res => res?.list[0]?.main,
    }),
  }),
});

export const {
  useGetWeatherByCityQuery,
  useGetWeatherByCoordsQuery,
  useGetAirQualityByCoordsQuery,
  useGetForecastByCoordsQuery,
} = getWeatherByOpenWeather;
