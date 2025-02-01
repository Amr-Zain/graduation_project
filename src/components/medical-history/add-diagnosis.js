import MedicineInputs from "./medicine-inputs";
import { MdAdd } from 'react-icons/md'
import '../../style/add-diagnosis.css'
import { useDispatch, useSelector } from "react-redux";
import { addFormMedicine, createDiagnosis, setFormError, setFromDescription } from "../../features/medicalHistory";

function AddDiagnosis({ patientId }) {
    const { description, error, medicines, successed, isLoading } = useSelector(state=>state.medicalHistory.diagnosisFrom)
    const MedicinedList = medicines.map((med)=><MedicineInputs key={med.id}  id={med.id}{ ...med } /> )
    const dispatch = useDispatch();
    const handelSubmitDiagnosis = async(e)=>{
        e.preventDefault();
        if(medicines.every(med=>( med.name && med.dose && med.duration )) && description ){
            dispatch(setFormError(''));
            dispatch(createDiagnosis({ description, medicines, patientId }));
        }
        else dispatch(setFormError( 'Please Fillout The Medicines Fields First' ));        
    }
    const addMedicineHandeler= ()=>{
            dispatch(addFormMedicine());
    }
    return ( <div className="add-diagnosis">
        <form>
            { error && <div style={{textAlign:'center',color:'red'}} className="error">{error}</div>}
            { isLoading && <div style={{textAlign:'center'}} className="error">Loading...</div>}
            { successed && <div style={{textAlign:'center'}} className="error">{successed}</div>}
            <div className="description">
                <textarea 
                    name= 'description'
                    value={description}
                    placeholder= 'description'
                    onChange={(e)=>dispatch(setFromDescription(e.target.value))}
                />
            </div>
            {
            medicines.length !==0 && 
                <fieldset>
                    <legend>Medicines:</legend>
                    <div className="medicines-input">
                        {MedicinedList}
                    </div>
                </fieldset>
            }
            <div className="add-medicine" onClick={addMedicineHandeler}> <MdAdd /> Medicine</div>
            <button className ='btn-submit' onClick={handelSubmitDiagnosis}>Submit</button>
        </form>
    </div> );
}

export default AddDiagnosis;