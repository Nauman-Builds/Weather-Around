import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APiKey } from "../../components/ApiKey";

export const getRTKApi = createApi({
    reducerPath: "RTKApiData",
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.openweathermap.org/'}),
    endpoints: (builder) => ({
        getRTKApiData: builder.query({
            query: (name) => `data/2.5/weather?q=${name}&appid=${APiKey}`,
        })
    })
})

export const { useGetRTKApiDataQuery } = getRTKApi;