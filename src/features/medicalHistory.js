import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDiagnosis, getMedicines, getPatientDiagnosisCategoy } from "../api/data";

const initialState = {
    medicines:[],
    diagnosis:[],
    selectedCategories: [],
    patientDiagnosisCategoy:[],
    date: '',
    isLoading: true,
}
export const setDiagnosisAndMedicines = createAsyncThunk('medicalHistory/setDiagnosisAndMedicines', 
    async (type, thunkAPI)=>{
        console.log(type)
    try {
        if( type === 'diagnosis'){
            const { diagnosisCategory, date } =  thunkAPI.getState('medicalHistory');
            const diagnosis = await getDiagnosis({ diagnosisCategory, date});
            return { diagnosis };
        }else if(type === 'medicines'){
            const medicines = await getMedicines();
            return { medicines}
        }else if(type === 'both'){//spech && diagnosis
            console.log('7mada')
            const { diagnosisCategory, date } =  thunkAPI.getState('medicalHistory');
            const diagnosis = await getDiagnosis({ diagnosisCategory, date});
            const patientDiagnosisCategoy = await getPatientDiagnosisCategoy();
            console.log(diagnosis)

            return { diagnosis, patientDiagnosisCategoy };
        }
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
            .addCase(setDiagnosisAndMedicines.fulfilled, (state, { payload }) => {
                return { ...state, ...payload, isLoading:false };
            })
            .addCase(setDiagnosisAndMedicines.rejected, (state, { payload}) => {
                console.log(payload)
                state.error = payload;
            })
            .addCase(setDiagnosisAndMedicines.pending, (state, { payload }) => {
                state.isLoading = true;
            });
    },
});

export const { setDate_category } = medicalHistory.actions;

export default medicalHistory.reducer;