import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities, getSpecializations, searchDoctors, searchNurses,
        searchDonators, searchDonatonRequests } from "../api/data";
                

const initialState ={
    searchFor: 'doctor',
    city: {id:0, value:''},
    specialization:{id:0, value:''},
    cities:[],
    specializations:[],
    bloodType: 0,
    name: '',
    price: false, /* false low or 1 high */
    today: false, // new Date().getDay() avialble today or not or may 
    isLoading: false,
    result:{
            data:[], 
            pageNumber:0,
            limit:10
        },
}

export const getSearchResult = createAsyncThunk('search/getSearchResult', async(_, thunkAPI)=>{
    const { searchFor, citiy, specialization, bloodType, name, price, today, limit } = thunkAPI.getState('search');
    try {
        if(searchFor === 'doctor'){
            const result = await searchDoctors({ citiy, specialization, limit, price, today, name});
            thunkAPI.dispatch(setFilter({ result: result.doctors, pageNumber: result.pageNumber }))
        }else if( searchFor === 'nurse' ){
            const result = await searchNurses({ citiy, price, today, name, limit });
            thunkAPI.dispatch(setFilter({ result: result.nurses, pageNumber: result.pageNumber }))
        }
        else if(searchFor === 'blood donator'){
            const result = await searchDonators({ citiy, bloodType, price, limit });//price here is free or not
            thunkAPI.dispatch(setFilter({ result: result.donators, pageNumber: result.pageNumber  }));
        }else { //donation request
            const result = await searchDonatonRequests({ citiy, bloodType, limit });
            thunkAPI.dispatch(setFilter({ result: result.donationRequests, pageNumber: result.pageNumber }));
        }

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
