import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { popularDoctors as doctors } from "../api/data";

const initialState = {
    popularDoctors: [],
    isLoading: false,
    error:''
}
export const setPopularDoctorsThunk = createAsyncThunk('authedUser/setpopularDoctor', 
    async (_, thunkAPI)=>{
    try {
        const result = await doctors();
        //console.log(result)
        return { popularDoctors: result };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
const popularDoctors = createSlice({
    name:'popularDoctors',
    initialState,
    reducers: {},

    extraReducers:  (builder) => {
        builder
            .addCase(setPopularDoctorsThunk.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(setPopularDoctorsThunk.fulfilled, (state, action) => {
                //console.log(action);
                return action.payload;
            })
            .addCase(setPopularDoctorsThunk.rejected, (state, { payload}) => {
                console.log(payload)
                state.error = payload;
            });
    },
});

export const {  } = popularDoctors.actions;

export default popularDoctors.reducer;

