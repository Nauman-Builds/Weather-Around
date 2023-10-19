import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import  ApiReducer from "../Redux Toolkit/Slices/ApiSlice";
import { getRTKApi } from "./Slices/rtkApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: ApiReducer,
    reducer: {
        [getRTKApi.reducerPath] : getRTKApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getRTKApi.middleware),
})
