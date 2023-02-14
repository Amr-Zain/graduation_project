import { createSlice } from "@reduxjs/toolkit";



initialState = [ ] //list of users

const doctorQueue = createSlice({
    initialState,
    name:'doctorQueue',
    reducers:{
        getAppointments:(state,{ payload })=>{
            state = payload;
        },
        removeDoneAppointments: (state,{ payload })=>{
            const { appointmentId } = payload;
            state = state.filtur(app=>app.id !== appointmentId);
        }
    }
});
export const { setAppointments, removeDoneAppointments } = doctorQueue.actions;

export default doctorQueue.reducer;


