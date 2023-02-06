
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCities } from "../api/data";

const initialState = {
        userType: 'patient',
        name:'',
        email:'',
        phone:'',
        password:'',
        error:'',
        birthDay: '',
        /* governorate:[], */
        city:'',
        cities:[],
        isLoading: true
    };
export  const getCitiesThunk = createAsyncThunk('signupfrom/getCities', async (name, thunkAPI) => {
        try {
            const resp = await getCities();
            console.log(resp)
            return resp;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
});

const signupFormDataSlice = createSlice({
    name:'signupForm',
    initialState,
    reducers:{
        updateForm:(state,{ payload })=>{
            console.log(payload)
            state = { ...state, ...payload};
            console.log(state)
        }
    },
    extraReducers:  (builder) => {
        builder
            .addCase(getCitiesThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCitiesThunk.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.cities = action.payload;
            })
            .addCase(getCitiesThunk.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
      },
})

export const { updateForm } = signupFormDataSlice.actions;
export default signupFormDataSlice.reducer;
