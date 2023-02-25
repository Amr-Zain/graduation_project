import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDiagnosisPref, getMedicines, getPatientDiagnosisCategoy, getPatientInfo } from "../api/data";

const initialState = {
    patientInfo:{
        data:{
        id:'',
        image:'/images/avatars/default.png',
        name:'',
        age:0
    }, 
    isLoading: true
    },
    selectedCategories: [],
    date: '',
    medicines:{ isLoading: true, data: [] },
    diagnosis:{ isLoading: true, data: [], patientDiagnosisCategories:[] },
    error: ''
}
export const setDiagnosis = createAsyncThunk('medicalHistory/setDiagnosis', 
    async ({ type, selectedCategories, date }, thunkAPI)=>{
    try {
        if(type === 'categories'){
            const patientDiagnosisCategories = await getPatientDiagnosisCategoy();
            return{ diagnosis: { isLoading: false, patientDiagnosisCategories } } 
        }
        console.log({ type, selectedCategories, date })
        const data = await getDiagnosisPref({ selectedCategories, date});
        return { diagnosis: { isLoading: false, data }}
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const setMedicines = createAsyncThunk('medicalHistory/setMedicines', 
    async (_, thunkAPI)=>{
    try {
            const data = await getMedicines();
            return  { medicines: { isLoading: false, data }}
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const setPatientInfo = createAsyncThunk('medicalHistory/setPatientInfo', 
    async ( id, thunkAPI)=>{
    try {
            const data = await getPatientInfo({ id });
            return  { patientInfo: { isLoading: false, data }}
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const medicalHistory = createSlice({
    name:'medicalHistory',
    initialState,
    reducers: {setDate_category:(state,{ payload })=>{
        return{ ...state, ...payload};
    }
        
    },
    extraReducers:  (builder) => {
        builder
            .addCase(setDiagnosis.fulfilled, (state, { payload }) => {
                state.diagnosis ={ ...state.diagnosis, ...payload.diagnosis};
            })
            .addCase(setDiagnosis.rejected, (state, { payload}) => {
                state.diagnosis.isLoading = false;
                state.error = payload;
            })
            .addCase(setDiagnosis.pending, (state, { payload }) => {
                state.diagnosis.isLoading = true;
            })
            .addCase(setMedicines.fulfilled, (state, { payload }) => {
                state.medicines = payload.medicines;
            })
            .addCase(setMedicines.rejected, (state, { payload}) => {
                state.medicines.isLoading = false;
                state.error = payload;
            })
            .addCase(setMedicines.pending, (state, { payload }) => {
                state.medicines.isLoading = true;
            })
            .addCase(setPatientInfo.fulfilled, (state, { payload }) => {
                state.patientInfo = payload.patientInfo;
            })
            .addCase(setPatientInfo.rejected, (state, { payload}) => {
                state.patientInfo.isLoading = false;
                state.error = payload;
            })
            .addCase(setPatientInfo.pending, (state, { payload }) => {
                state.patientInfo.isLoading = true;
            });
    },
});

export const { setDate_category } = medicalHistory.actions;

export default medicalHistory.reducer;