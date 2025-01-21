import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getSpecializations } from "../api/data";


const initialState ={
    cities:[],
    specializations:[],
}


export const getCitiesAndSpecializations = createAsyncThunk('citiesAndSpecializations/getCitiesAndSpecializations',async(_, thunkAPI)=>{
    try {
        if(thunkAPI.getState().cities.length === 0){
            
            const [ cities, specializations ] = await Promise.all([ getCities(), getSpecializations() ]);
            return { cities, specializations };
        }
        return {};
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const citiesAndSpecializations = createSlice({
    name:'citiesAndSpecializations',
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(getCitiesAndSpecializations.fulfilled, (state, { payload:{ cities, specializations } }) => {
                    if(cities){
                        state.cities = cities;
                        state.specializations = specializations;
                    } 
                });
        }
});

export default citiesAndSpecializations.reducer;
