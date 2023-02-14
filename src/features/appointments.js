import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appointments } from "../api/data";


const initialState = {
    appointments: [],
    isLoading: false,
}
export const setAppointmentsThunk = createAsyncThunk('authedUser/setAppointments', 
    async (_, thunkAPI)=>{
    try {
        const id = thunkAPI.getState('authedUser').authedUser.user.id;//later we will use the token
        //console.log(id);
        
        const result = await appointments({ id });
        //console.log(result)
        return { appointments: result };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
const appointmentsSlice = createSlice({
    name:'userAppointments',
    initialState,
    reducers: {},

    extraReducers:  (builder) => {
        builder
            .addCase(setAppointmentsThunk.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(setAppointmentsThunk.fulfilled, (state, action) => {
                //console.log(action);
                return action.payload;
            })
            .addCase(setAppointmentsThunk.rejected, (state, { payload}) => {
                //console.log(payload)
                //state.error = payload;
            });
    },
});

export const {  } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

