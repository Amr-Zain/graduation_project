import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appointments, doctorAppiontments, DeleteAppointment  } from "../api/data";


const initialState = {
    date: new Date(new Date().toDateString()).getTime(),
    appointments: [],
    isLoading: false,
}
export const setAppointmentsThunk = createAsyncThunk('appointments/setAppointments', 
    async ({ date }, thunkAPI)=>{
    try {
        const { userType, id } = thunkAPI.getState('authedUser').authedUser.user;
        //const { date } = thunkAPI.getState('authedUser').appointments;
        console.log(date)
        let result;
        if( userType === 'patient') result = await appointments({ id });
        else result = await doctorAppiontments({ doctorId: id, date})
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

