import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getSpecializations, search } from "../api/data";


const initialState ={
    filter:{
        searchFor: 'doctor',
        city:'',
        specialization:'',
        bloodType: '',
        name: '',
        sort:'0',
        gender:'0',// 0 any ,1 man and 2 women
        availability: 0, //  0 any ,1 today and 2 tommo
    },
    url:'',
    isLoading: true,
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
        //console.log(result)
        return {...result, limit:10};

    }catch(error){
        return thunkAPI.rejectWithValue(error.message);
    }
});
const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setFilter:(state,{ payload })=>{
            state.filter = { ...state.filter, ...payload }
        },
        setUrl:(state,{ payload })=>{
            //console.log(payload)
            state.url = payload.url
        },
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(getSearchResult.fulfilled, (state, { payload}) => {
                    //console.log(payload);
                    state.isLoading = false;
                    state.result = { ...payload, limit:10}
                }).addCase(getSearchResult.pending,(state,{ payload })=>{
                    state.isLoading = true;
                })
                .addCase(getSearchResult.rejected, (state, { payload }) => {
                    console.log(payload)
                    state.error = payload;
                })
            }
});
export const { setFilter, setUrl } = searchSlice.actions;

export default searchSlice.reducer;
