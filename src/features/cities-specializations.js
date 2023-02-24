import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getSpecializations } from "../api/data";


const initialState ={
    cities:[],
    specializations:[],
}


export const getCitiesAndSpecializations = createAsyncThunk('citiesAndSpecializations/getCitiesAndSpecializations',async(message, thunkAPI)=>{
    try {
        if(message === 'cities'){
            const cities =  await getCities();
            return { cities };
        }else if(message === 'specializations'){
            const specializations = await getSpecializations();
            return { specializations };
        }else{
            const cities =  await getCities();
            const specializations = await getSpecializations();
            return { cities, specializations };
        }

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
                .addCase(getCitiesAndSpecializations.fulfilled, (state, { payload}) => {
                    return {...state, ...payload}
                });
        }
});

export default citiesAndSpecializations.reducer;
