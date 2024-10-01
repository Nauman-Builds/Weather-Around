import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {GeocodingAPiKey} from '../../Utils/ApiKey';

export const getCityNameByCoords = createApi({
  reducerPath: 'GeocodingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.opencagedata.com/geocode/v1/',
  }),
  endpoints: builder => ({
    getCityNameByCoords: builder.query({
      query: ({lat, lon}) =>
        `google-v3-json?q=${lat},${lon}&key=${GeocodingAPiKey}&language=en&address_only=1`,
      transformResponse: res => {
        const result = res?.results?.[0];
        const city = result.address_components?.find(component =>
          component.types.includes('_normalized_city'),
        );
        const neighborhood = result.address_components?.find(component =>
          component.types.includes('neighborhood'),
        );
        const district = result.address_components?.find(component =>
          component.types.includes('district'),
        );
        const formatted_address = result.formatted_address || '';

        return {
          formatted_address,
          city: city?.short_name || '',
          neighborhood: neighborhood?.short_name || '',
          district: district?.short_name || '',
        };
      },
    }),
  }),
});

export const {useGetCityNameByCoordsQuery} = getCityNameByCoords;
