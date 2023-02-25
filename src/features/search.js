import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { search } from "../api/data";


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
        pageNumber:0,
        limit:5
    },
    url:'',
    isLoading: true,
    result:{
            data:[], 
            count: 23
        },
}

export const getSearchResult = createAsyncThunk('search/getSearchResult', async(_, thunkAPI)=>{
    const {search:{ filter:{searchFor, city, specialization, 
            bloodType, name, sort,gender, pageNumber, limit, availability}}} = thunkAPI.getState('search');
    try {
        const result = await search({searchFor, city, specialization, 
            bloodType, name, sort,gender, pageNumber, limit, availability});
        return { ...result };

    }catch(error){
        return thunkAPI.rejectWithValue(error.message);
    }
});
const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setFilter:(state,{ payload })=>{
            state.filter = { ...state.filter, ...payload };
        },
        setUrl:(state,{ payload })=>{
            state.url = payload.url;
        },
        setPageNumber: (state, { payload })=>{
            state.result.pageNumber = payload.pageNumber;
        }
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(getSearchResult.fulfilled, (state, { payload}) => {
                    //console.log(payload);
                    state.isLoading = false;
                    state.result = { ...payload }
                }).addCase(getSearchResult.pending,(state,{ payload })=>{
                    state.isLoading = true;
                })
                .addCase(getSearchResult.rejected, (state, { payload }) => {
                    console.log(payload)
                    state.error = payload;
                })
            }
});
export const { setFilter, setUrl, setPageNumber } = searchSlice.actions;

export default searchSlice.reducer;
