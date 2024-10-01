import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AccuWeatherAPiKey} from '../../Utils/ApiKey';

export const getWeatherByAccuWeather = createApi({
  reducerPath: 'AccuWeatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://dataservice.accuweather.com/',
  }),
  endpoints: builder => ({
    getLocationKeyByCoords: builder.query({
      query: ({lat, lon}) =>
        `locations/v1/cities/geoposition/search?apikey=${AccuWeatherAPiKey}&q=${lat},${lon}`,
    }),
    getLocationKeyByCity: builder.query({
      query: city =>
        `locations/v1/cities/search?apikey=${AccuWeatherAPiKey}&q=${city}`,
    }),
    getAutoCompleteListByText: builder.query({
      query: text =>
        `locations/v1/cities/autocomplete?apikey=${AccuWeatherAPiKey}&q=${text}`,
    }),
    getCurrentWeatherByKey: builder.query({
      query: (locationKey) =>
        `currentconditions/v1/${locationKey}?apikey=${AccuWeatherAPiKey}`,
    }),
    getWeather1DForecastByKey: builder.query({
      query: (locationKey) =>
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${AccuWeatherAPiKey}`,
    }),
  }),
});

export const {
  useGetLocationKeyByCoordsQuery,
  useGetLocationKeyByCityQuery,
  useGetAutoCompleteListByTextQuery,
  useGetCurrentWeatherByKeyQuery,
  useGetWeather1DForecastByKeyQuery,
} = getWeatherByAccuWeather;
