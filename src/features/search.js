import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getSpecializations, search } from "../api/data";
                

const initialState ={
    searchFor: 'doctor',
    city: {id:0, value:''},
    specialization:{id:0, value:''},
    cities:[],
    specializations:[],
    bloodType: 0,
    name: '',
    sort:'0',
    price: false, /* false low or 1 high */
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
    const {search:{ searchFor, city, specialization, bloodType, name, price, today, limit,result:{pageNumber} }} = thunkAPI.getState('search');
    console.log( { searchFor, city, specialization, bloodType, name, price, today, limit,pageNumber })
    try {
        const results = await search({ searchFor, city, specialization, bloodType, name, price, today, limit,pageNumber });
        return ;

    }catch(error){
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getCitiesAndSpecialization = createAsyncThunk('search/getSearchResult',async(_, thunkAPI)=>{
    try {
        const cities =  await getCities();
        const specializations = await getSpecializations();
        //console.log({ ...thunkAPI.getState('search'), cities, specializations })
        thunkAPI.dispatch(setFilter({ ...thunkAPI.getState('search'), cities, specializations }));
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
                    state.isLoading = false
                    return {...state, ...payload};
                }).addCase(getSearchResult.pending,(state,{ payload })=>{
                    state.isLoading = true;
                })
                .addCase(getSearchResult.rejected, (state, { payload }) => {
                    console.log(payload)
                    state.error = payload;
                });
        }
});
export const { setFilter } = searchSlice.actions;

export default searchSlice.reducer;
