import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appointments, doctorAppiontments, DeleteAppointment  } from "../api/data";
import {  } from 'react-icons/md'


const initialState = {
    date: new Date(new Date().toDateString()).getTime(),
    appointments: [
    {
        id: 'qedldfffnfsnc',
        doctorId: 'qedlnfsnc',
        appointmentDate: new Date(2023,2,2).getTime(),
        bookedAte:  new Date(2023,3,1).getTime(),
        patientId: 'dskfhkldsjklf',
        patientName: 'Amr Zain',
        age: 22,
        img: '/images/avatars/raphael.jpg'
    },
    {
        id: 'qedlcsdnfsnc',
        doctorId: 'qedlnfsnc',
        appointmentDate: new Date(2023,2,2).getTime(),
        bookedAte:  new Date(2023,2,1).getTime(),
        patientId: 'dskfhkldsjklf',
        patientName: 'Amr Zain',
        age: 22,
        img: '/images/avatars/raphael.jpg'
    },
    {
        id: 'dskkjoesssadrpeww',
        doctorId: 'qedlnfsnc',
        bookingDate: new Date(2023,2,2).getTime(),
        bookedAte:  new Date(2023,2,1).getTime(),
        patientId: 'dskfhkldsjklf',
        patientName: 'Zain Fathi',
        age: 22,
        img: '/images/avatars/default.png'
    },
    {
        id: 'qsedldfffnfsncs',
        doctorId: 'qedlnfsnc',
        appointmentDate: new Date(2023,2,1).getTime(),
        bookedAte:  new Date(2023,2,3).getTime(),
        patientId: 'dskfhkldsjklf',
        patientName: 'Amr Zain',
        age: 22,
        img: '/images/avatars/raphael.jpg'
    },
    {
        id: 'qedlcssdnfssnc',
        doctorId: 'qedlnfsnc',
        appointmentDate: new Date(2023,3,3).getTime(),
        bookedAte:  new Date(2023,3,1).getTime(),
        patientId: 'dskfhkldsjklf',
        patientName: 'Amr Zain',
        age: 22,
        img: '/images/avatars/raphael.jpg'
    },
    {
        id: 'dskkjoessssadspeww',
        doctorId: 'qedlnfsnc',
        bookingDate: new Date(2023,2,3).getTime(),
        bookedAte:  new Date(2023,2,1).getTime(),
        patientId: 'dskfhkldsjklf',
        patientName: 'Zain Fathi',
        age: 22,
        img: '/images/avatars/default.png'
    },
    {
        id: 'kdfjffdhfghfgddfslk',
        doctorId: 'qedlnfsnc',
        appointmentDate: new Date(2023,2,3).getTime(),
        bookedAte:  new Date(2023,2,3).getTime(),
        patientId: 'sdjfds',
        patientName: 'Mohamed Zain',
        age: 22,
        img: '/images/avatars/raphael.jpg'
    }, {
        id: 'kdsssfjdfdfsddfslk',
        doctorId: 'qedlnfsnc',
        appointmentDate: new Date(2023,2,3).getTime(),
        bookedAte:  new Date(2023,3,1).getTime(),
        patientId: 'dskfhkldsjklf',
        patientName: 'Amr Zain',
        age: 12,
        img: '/images/avatars/raphael.jpg'
    },
],
    isLoading: false,
}
export const setAppointmentsThunk = createAsyncThunk('appointments/setAppointments', 
    async ({ date }, thunkAPI)=>{
    try {
        const { userType, id } = thunkAPI.getState('authedUser').authedUser.user;
        //const { date } = thunkAPI.getState('authedUser').appointments;
    
        console.log(userType)
        let result;
        if( userType === 'patient') result = await appointments({ id });
        else result = await doctorAppiontments({ doctorId: id, date})
        console.log(result)
        return { appointments: result };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
const appointmentsSlice = createSlice({
    name:'appointments',
    initialState,
    reducers: {
        setDate: (state, { payload })=>{
            console.log(payload.date)
            state.date = payload.date;
        },
        addAppointment: (state, { payload })=>{
            console.log(payload)
            state.appointments = [...state.appointments, payload];
        },
        deleteAppointment: (state, { payload })=>{
            console.log('payload')
            return { ...state, appointments:state.appointments.filter(app=>app.id !== payload.appointmentId)}
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
    },
    extraReducers:  (builder) => {
        builder
            .addCase(setAppointmentsThunk.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.appointments = payload.appointments;
            })
            .addCase(setAppointmentsThunk.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(setAppointmentsThunk.rejected, (state, { payload}) => {
                //console.log(payload)
                //state.error = payload;
            });
    },
});

export const { setDate, addAppointment, deleteAppointment, updateAppointmentDate } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

