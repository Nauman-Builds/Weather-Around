import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APiKey } from "../../components/ApiKey";
import axios from "axios";

const initialState = {
    isLoading: false,
    isError: false,
    data: null,
};

export const getApi = createAsyncThunk('GetApiData', async (arg) => {
    try {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${arg}&appid=${APiKey}`)
    return res.data;
}
catch (err){
    console.log(err)
}
})

const ApiSlice = createSlice({
    name: 'ApiCall',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(
            getApi.pending, (state, action) => {
                state.isLoading = true;
            }
        )
        builder.addCase(
            getApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            }
        )
        builder.addCase(
            getApi.rejected, (state) => {
                state.isError = true;
                state.isLoading =false;
            }
        )
    }

})


export default ApiSlice.reducer;