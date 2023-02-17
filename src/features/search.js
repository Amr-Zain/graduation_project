import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getSpecializations, search } from "../api/data";


const initialState ={
    searchFor: 'doctor',
    city:'',
    specialization:'',
    cities:[],
    specializations:[],
    bloodType: 0,
    name: '',
    sort:'0',
    today: false, // new Date().getDay() avialble today or not or may 
    isLoading: false,
    result:{
            data:[], 
            pageNumber:0,
            limit:10,
            count: 23
        },
}

export const getSearchResult = createAsyncThunk('search/getSearchResult', async(_, thunkAPI)=>{
    const {search:{ searchFor, city, specialization, bloodType, name, price, today,result:{pageNumber} }} = thunkAPI.getState('search');
    //console.log( { searchFor, city, specialization, bloodType, name, price, today, pageNumber })
    try {
        const result = await search({ searchFor, city, specialization, bloodType, name, price, today, limit:10, pageNumber });
        console.log(result)
        return {...result, limit:10};

    }catch(error){
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getCitiesAndSpecialization = createAsyncThunk('search/getCitiesAndSpecialization',async(_, thunkAPI)=>{
    try {
        const cities =  await getCities();
        const specializations = await getSpecializations();
        return {  cities, specializations };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setFilter:(state,{ payload })=>{
            //console.log(payload)
            return { ...state, ...payload};
        },
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(getSearchResult.fulfilled, (state, { payload}) => {
                    console.log(payload);
                    state.isLoading = false;
                    state.result = { ...payload, limit:10}
                    //return { ...state, isLoading: false, result: { ...payload, limit:10}};
                    
                }).addCase(getSearchResult.pending,(state,{ payload })=>{
                    state.isLoading = true;
                })
                .addCase(getSearchResult.rejected, (state, { payload }) => {
                    console.log(payload)
                    state.error = payload;
                })
                .addCase(getCitiesAndSpecialization.fulfilled, (state, { payload}) => {
                    const { cities, specializations } = payload;
                    //console.log(cities) 
                    //console.log(state) 
                    state.isLoading = false;
                    //return { ...state, cities, specializations};
                    state.cities = cities;
                    state.specializations = specializations;
                });
        }
});
export const { setFilter } = searchSlice.actions;

export default searchSlice.reducer;
