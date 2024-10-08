import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const getWeatherByAccuWeather = createApi({
  reducerPath: 'AccuWeatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://dataservice.accuweather.com/',
  }),
  endpoints: builder => ({
    getLocationKeyByCoords: builder.query({
      query: ({lat, lon}) =>
        `locations/v1/cities/geoposition/search?apikey=${process.env.ACCU_WEATHER_API_KEY}&q=${lat},${lon}`,
    }),
    getLocationKeyByCity: builder.query({
      query: city =>
        `locations/v1/cities/search?apikey=${process.env.ACCU_WEATHER_API_KEY}&q=${city}`,
    }),
    getAutoCompleteListByText: builder.query({
      query: text =>
        `locations/v1/cities/autocomplete?apikey=${process.env.ACCU_WEATHER_API_KEY}&q=${text}`,
    }),
    getCurrentWeatherByKey: builder.query({
      query: locationKey =>
        `currentconditions/v1/${locationKey}?apikey=${process.env.ACCU_WEATHER_API_KEY}`,
    }),
    getWeather1DForecastByKey: builder.query({
      query: locationKey =>
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.ACCU_WEATHER_API_KEY}`,
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
