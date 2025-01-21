import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appointments, doctorAppiontments, DeleteAppointment, UpdateAppointment  } from "../api/data";
import {  } from 'react-icons/md'

const initialState = {
    date: new Date(new Date().toDateString()).getTime(),
    appointments: [],
    isLoading: false,
    error:''
}
export const getAppointments = createAsyncThunk('appointments/getAppointments', 
    async ({ date }, thunkAPI)=>{
    try {
        const { userType, id } = thunkAPI.getState().authedUser.user;
        let result;
        if( userType === 'patient'){
            if(thunkAPI.getState().appointments.appointments.length ===0 ) result = await appointments({ id });
        } 
        else result = await doctorAppiontments({ doctorId: id, date});
        return { appointments: result };
    
    } catch (error) {
        console.error(error)
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const updateAppointment = createAsyncThunk('appointments/updateAppointment',
    async(data,thunkAPI)=>{
        try {
            const { id, date } = data;//appointmentId, new date
            // API call her
            const {appointment} = await UpdateAppointment({id, date});
            appointment.id=id; //remove it after using the api
            return { appointment };

        }catch(error){

        }
    });
export const cancelAppointment = createAsyncThunk('appointments/cancelAppointment',
    async(data,thunkAPI)=>{
        try {
            const { id } = data;
            // API call her
            const {message} = await DeleteAppointment({id});
            //remove it after using the api
            return { id };

        }catch(error){
            
        }
    });
const appointmentsSlice = createSlice({
    name:'appointments',
    initialState,
    reducers: {
        addAppointment: (state, { payload })=>{
            state.appointments.push(payload);
        },
        deleteAppointment: (state, { payload })=>{
            state.appointments = state.appointments.filter(app=>app.id !== payload.appointmentId);
        },
        updateAppointmentDate: (state, { payload })=>{
            state.appointments = state.appointments.map((appointment)=>{
                    if (appointment.id === payload.id){
                        return { ...appointment, appointmentDate: payload.date };
                    }else{
                        return appointment;
                    }
            })
        },
        setDate: (state,{payload})=>{
            state.date = payload.date;
        }
    },
    extraReducers:  (builder) => {
        builder
            .addCase(getAppointments.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.appointments = payload.appointments;
            })
            .addCase(getAppointments.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAppointments.rejected, (state, { payload}) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(updateAppointment.fulfilled,(state, { payload })=>{
                console.log(payload)
                const appointment = payload.appointment;
                state.appointments = state.appointments.map(app=>app.id === appointment.id? {...app,...appointment} : app );
            })
            .addCase(cancelAppointment.fulfilled,(state, { payload })=>{
                state.appointments = state.appointments.filter( app => app.id !== payload.id);
            })
    },
});
export const { addAppointment, deleteAppointment, updateAppointmentDate, setDate } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

