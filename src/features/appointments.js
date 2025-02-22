import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appointments, doctorAppiontments, DeleteAppointment, UpdateAppointment  } from "../api/data";
import {  } from 'react-icons/md'

const initialState = {
    date: new Date(new Date().toDateString()).getTime(),
    appointments: [],
    isLoading: false,
    error:'',
    appointmentUpdateLoading:false,
    appointmentUpdateError:''
}
export const getAppointments = createAsyncThunk('appointments/getAppointments', 
    async ({ date }, thunkAPI)=>{
    try {
        const { userType, id } = thunkAPI.getState().authedUser.user;
        let result=[];
        if( userType === 'patient'){
                result = await appointments({ id });
                return { appointments: result}
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
            return { date: new Date(date).getTime(), id };

        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
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
            return thunkAPI.rejectWithValue(error.message);
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
                        return { ...appointment, appointmentDate: new Date(payload.date).getTime() };
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
            .addCase(updateAppointment.pending, (state, action) => {
                state.appointmentUpdateLoading = true;
            })
            .addCase(updateAppointment.rejected, (state, { payload}) => {
                state.appointmentUpdateLoading = false;
                state.appointmentUpdateError = payload;
            })
            .addCase(updateAppointment.fulfilled,(state, { payload })=>{
                //state.appointments = state.appointments.map(app=>app.id === appointment.id? {...app,...appointment} : app );
                const index = state.appointments.findIndex(app=>app.id === payload.id);
                state.appointments[index].bookingDate = payload.date;
                state.appointmentUpdateLoading = false;

            })
            .addCase(cancelAppointment.fulfilled,(state, { payload })=>{
                state.appointments = state.appointments.filter( app => app.id !== payload.id);
                state.appointmentUpdateLoading = false;
                state.appointmentUpdateError = '';
            }).addCase(cancelAppointment.pending, (state, action) => {
                state.appointmentUpdateLoading = true;
                state.appointmentUpdateError = '';
            })
            .addCase(cancelAppointment.rejected, (state, { payload}) => {
                state.appointmentUpdateLoading = false;
                state.appointmentUpdateError = payload;
            })
    },
});
export const { addAppointment, deleteAppointment, updateAppointmentDate, setDate } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

