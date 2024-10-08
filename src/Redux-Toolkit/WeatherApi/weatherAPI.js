import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const transformWeatherResponse = res => ({
  currentConditions: res?.currentConditions || {},
  days: res?.days[0] || {},
  city: res?.resolvedAddress,
});

export const getWeatherByVisualCrossing = createApi({
  reducerPath: 'VisualCrossingApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
  }),
  endpoints: builder => ({
    getWeatherByCoords: builder.query({
      query: ({lat, lon, periods}) =>
        `${lat}%2C${lon}/${periods}?unitGroup=metric&include=days%2Ccurrent&key=${process.env.VISUAL_CROSSING_API_KEY}&contentType=json`,
      transformResponse: transformWeatherResponse,
    }),
    getWeatherByCity: builder.query({
      query: ({cityName, periods = 'today'}) =>
        `${cityName}/${periods}?unitGroup=metric&include=days%2Ccurrent&key=${process.env.VISUAL_CROSSING_API_KEY}&contentType=json`,
      transformResponse: transformWeatherResponse,
    }),
  }),
});

export const {useGetWeatherByCoordsQuery, useGetWeatherByCityQuery} =
  getWeatherByVisualCrossing;
