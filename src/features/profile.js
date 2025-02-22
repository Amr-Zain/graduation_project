import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  createDoctorApointment, createNurseAppointment, getClinic, getProfileData, setAppointment } from "../api/data";
import { DOCTOR } from "../constants/routes";



const d = new Date(); 
const initialState = {
    profileData:{ 
        isLoading: false,
        error:''
    },
    clinic:{
        initShecheduleDate: new Date(d.getFullYear(),d.getMonth(),d.getDay(),9).getTime(),//that houre will be handled later in the backend
        appointmentTime: null,
        shecheduleDay:[],//
        clinicId:null,
        clinicName:'',
        clinicLocation:'',
        appointmentPeriod:0, //in minutes,
        isLoading: false, 
        error: ''
    },
    isLoading: false,
    error:''
}
export const getProfile = createAsyncThunk('profile/getProfile', 
    async ({ userType, id }, thunkAPI)=>{
    try {
        const result = await getProfileData({ userType, id });
        return(result)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getClinicAppointments = createAsyncThunk('profile/getClinicAppointments', 
    async ({ date, clinicId }, thunkAPI)=>{
    try {
        const clinic = await getClinic({ clinicId, date });
        return({ clinic })
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const bookAppointment = createAsyncThunk('profile/bookAppointment', 
    async ({ type, date,clinicId, doctorId, nurseId }, thunkAPI)=>{
    try {
        if(type ===DOCTOR)   {
            return await createDoctorApointment({ date, clinicId, doctorId});
            //add to the appointments slice
        } 
        else return await createNurseAppointment({ date, nurseId  });

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
const profile = createSlice({
    name:'profile',
    initialState,
    reducers: {
        setClinicId:(state, { payload })=>{
            state.clinic.clinicId = payload.clinicId
        },
        setAppointmentTime: (state, { payload })=>{
            state.clinic.appointmentTime = payload.appointmentTime;
            state.error ='';
        },
        setInitShecheduleDate:( state, { payload })=>{
            state.clinic.initShecheduleDate = payload.initDate;
        },
        setError:(state,{ payload })=>{
            state.error = payload;
        }

    },

    extraReducers:  (builder) => {
        builder
            .addCase(getProfile.pending, (state, action) => {
                state.profileData.isLoading = true;
                state.profileData.error ='';
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profileData = action.payload;
                state.profileData.isLoading = false;
                state.profileData.error = '';
            })
            .addCase(getProfile.rejected, (state, { payload}) => {
                state.profileData.isLoading = false;
                state.profileData.error = payload;
            })
            .addCase(getClinicAppointments.pending, (state, action) => {
                state.clinic.isLoading = true;
                state.clinic.error ='';
                state.error ='';
            })
            .addCase(getClinicAppointments.fulfilled, (state, {payload}) => {
                
                state.clinic = {appointmentTime:'',...payload.clinic, isLoading: false, error:'' }
            })
            .addCase(getClinicAppointments.rejected, (state, { payload}) => {
                state.clinic.isLoading = false;
                state.clinic.error = payload;
            })
            .addCase(bookAppointment.fulfilled, ( state,{ payload })=>{
                state.isLoading = false;
                state.error = '';
            })
            .addCase(bookAppointment.pending, ( state,{ payload })=>{
                state.isLoading = true;
                state.error = '';
            })
            .addCase(bookAppointment.rejected, ( state,{ payload })=>{
                state.isLoading = false;
                state.error = payload;
            })
            ;
    },
});

export const { setClinicId, setInitShecheduleDate, setAppointmentTime, setError } = profile.actions

export default profile.reducer;

