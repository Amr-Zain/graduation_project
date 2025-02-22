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
        gender:'0',
        availability: 0,
        page:0,
        limit:10
    },
    result:{
        data:[], 
        count: 0
    },
    isLoading: false,
    error: '',
}

export const getSearchResult = createAsyncThunk('search/getSearchResult', async({ searchQueries }, thunkAPI)=>{
    const {search:{ filter:{searchFor, city, specialization, 
            bloodType, name, sort,gender, page, limit, availability}}} = thunkAPI.getState('search');
    try {
        const result = await search({ searchQueries,searchFor, city, specialization, 
            bloodType, name, sort,gender, page, limit, availability});
            console.log('results', result);
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
                    state.isLoading = false;
                    state.error = '';
                    state.result.data = payload.data;
                    state.result.count = payload.count;
                }).addCase(getSearchResult.pending,(state,{ payload })=>{
                    state.isLoading = true;
                    state.error = '';
                })
                .addCase(getSearchResult.rejected, (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                })
            }
});
export const { setFilter, setUrl, setPageNumber } = searchSlice.actions;

export default searchSlice.reducer;
