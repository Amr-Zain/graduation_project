import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { getDiagnosisPref, getDiagnosisById, getPatientMedicines, getPatientDiagnosisCategoy, getPatient, postDiagnosis } from "../api/data";

const initialState = {
    patientInfo:{
            data:{
            id:'',
            image:'',
            name:'',
            age:0,
            isLoading: false,
        }, 
        isLoading: false,
        error:''
    },
    filters: {  selectedCategories: [], date: '', byDoctor: false },
    medicines: { data: [], error:'', isLoading: false },
    diagnosis: {  data: [], patientDiagnosisCategories:[], error:'', isLoading: false },
    diagnosisFrom: { 
        description:'', 
        error:'', 
        isLoading:false,
        successed: '',
        medicines:[{ 
                    id: nanoid(12), 
                    name:'', 
                    dose:'', 
                    duration: '', 
                    description:'' 
                }]}
    
}
export const getPatientInfo = createAsyncThunk('medicalHistory/getPatientInfogetPatientInfo', 
    async ( { patientId }, thunkAPI)=>{
    try {
            const data = await getPatient({ patientId });
            return  { patientInfo: { isLoading: false, data }}
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getDiagnosis = createAsyncThunk('medicalHistory/getDiagnosis', 
    async ({ type, patientId, diagnosisId }, thunkAPI)=>{
    try {
        if(type === 'categories'){
            const patientDiagnosisCategories = await getPatientDiagnosisCategoy({ patientId });
            return{   patientDiagnosisCategories } 
        }
        else if(diagnosisId){
            const diagnosis = await getDiagnosisById({ patientId, id:diagnosisId });
            return { diagnosis:[diagnosis]}//return it as an array
        }
        const { date, selectedCategories, byDoctor } = thunkAPI.getState().medicalHistory.filters;
        const data = await getDiagnosisPref({ selectedCategories, date, patientId, byDoctor });
        return { diagnosis: data }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getMedicines = createAsyncThunk('medicalHistory/getMedicines', 
    async (_, thunkAPI)=>{
    try {
            const data = await getPatientMedicines();
            return  { medicines: { isLoading: false, data }}
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const createDiagnosis = createAsyncThunk('medicalHistory/createDiagnosis',async(data,thunkAPI)=>{
    try{
        const { description, medicines, patientId } = data;
        await postDiagnosis({ description, medicines, patientId });
    }catch(error){
        return thunkAPI.rejectWithValue(error.message);
    }
})

const medicalHistory = createSlice({
    name:'medicalHistory',
    initialState,
    reducers: {
        changeFilterCategory:(state,{ payload })=>{
            state.filters.selectedCategories = payload.categories
        },
        setFilterByDoctor:(state,{payload})=>{
            state.filters.byDoctor = payload.byDoctor;
        },
        setFilterDate:(state,{payload})=>{
            state.filters.date = payload.date;
        },
        addFormMedicine:(state,action)=>{
            state.diagnosisFrom.medicines.push({ id: nanoid(12), name:'', dose:'', duration: '' })
        },
        deleteFormMedicine:(state,{ payload })=>{
            state.diagnosisFrom.medicines = state.diagnosisFrom.medicines.filter(med=> med.id !== payload.id);
        },
        setFromDescription: ( state, { payload })=>{
            state.diagnosisFrom.description = payload
        },
        setFormMedicine:(state, { payload })=>{
            const index = state.diagnosisFrom.medicines.findIndex(med=>med.id === payload.id);
            state.diagnosisFrom.medicines[index][payload.name]= payload.value;
        },
        setFormError: ( state, { payload })=>{
            state.diagnosisFrom.error = payload
        }
            
    },
    extraReducers:  (builder) => {
        builder
            .addCase(getDiagnosis.pending, (state, action) => {
                if(action.meta.arg.type !== "categories") state.diagnosis.isLoading = true;
                state.diagnosis.error = '';
            })
            .addCase(getDiagnosis.fulfilled, (state, action) => {
                if(action.meta.arg.type === "diagnosisList") {
                    state.diagnosis.data = action.payload.diagnosis;
                    state.diagnosis.isLoading = false;
                    state.diagnosis.error = '';
                }else if(action.meta.arg.type === "diagnosis"){
                    if(state.diagnosis.data.every(diag=>diag.id !==action.payload.diagnosis[0].id)) 
                        state.diagnosis.data.push(...action.payload.diagnosis);
                    state.diagnosis.isLoading = false;
                    state.diagnosis.error = '';
                }
                else{
                    state.diagnosis.patientDiagnosisCategories = action.payload.patientDiagnosisCategories;
                }

            })
            .addCase(getDiagnosis.rejected, (state, { payload}) => {
                state.diagnosis.isLoading = false;
                state.error = payload;
            })
            .addCase(getMedicines.pending, (state, { payload }) => {
                state.medicines.isLoading = true;
                state.medicines.error = '';
            })
            .addCase(getMedicines.fulfilled, (state, { payload }) => {
                state.medicines = payload.medicines;
                state.medicines.error = '';
            })
            .addCase(getMedicines.rejected, (state, { payload}) => {
                state.medicines.isLoading = false;
                state.medicines.error = payload;
            })
            .addCase(getPatientInfo.pending, (state, { payload }) => {
                state.patientInfo.isLoading = true;
                state.patientInfo.error = '';
            })
            .addCase(getPatientInfo.fulfilled, (state, { payload }) => {
                state.patientInfo = payload.patientInfo;
                state.patientInfo.error = '';
            })
            .addCase(getPatientInfo.rejected, (state, { payload}) => {
                state.patientInfo.isLoading = false;
                state.patientInfo.error = payload;
            })
            .addCase(createDiagnosis.pending,(state,{ payload })=>{
                state.diagnosisFrom.isLoading = true;
                state.diagnosisFrom.error = '';
                state.diagnosisFrom.successed = '';
            })
            .addCase(createDiagnosis.fulfilled,(state,{ payload })=>{
                state.diagnosisFrom.isLoading = false;
                state.diagnosisFrom.successed = 'Diagnosis Created Sccessfully';
            })
            .addCase(createDiagnosis.rejected, (state, { payload })=>{
                state.diagnosisFrom.isLoading = false
                state.diagnosisFrom.successed = '';
                console.log(payload)
                state.diagnosisFrom.error = payload;
            })
    },
});

export const { changeFilterCategory, setFilterByDoctor, setFilterDate, addFormMedicine, deleteFormMedicine, setFromDescription, setFormError,setFormMedicine } = medicalHistory.actions;

export const selectDiagnosisById = diagnosisId => state => {
    return state.medicalHistory.diagnosis.data.find(diagnosis => diagnosis?.id === diagnosisId);
  };
export default medicalHistory.reducer;