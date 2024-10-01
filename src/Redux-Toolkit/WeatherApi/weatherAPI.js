import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {VisualCrossingKey} from '../../Utils/ApiKey';

export const getWeatherByVisualCrossing = createApi({
  reducerPath: 'VisualCrossingApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
  }),
  endpoints: builder => ({
    getWeatherByCityOrCoords: builder.query({
      query: ({lat, lon, periods}) =>
        `${lat}%2C${lon}/${periods}?unitGroup=metric&include=days%2Ccurrent&key=${VisualCrossingKey}&contentType=json`,
      transformResponse: res => ({
        currentConditions: res?.currentConditions || {},
        days: res?.days[0] || {},
      }),
    }),
  }),
});

export const {useGetWeatherByCityOrCoordsQuery} = getWeatherByVisualCrossing;
