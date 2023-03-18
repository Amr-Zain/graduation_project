import { useState } from "react";
import MedicineInputs from "./medicine-inputs";
import { MdAdd } from 'react-icons/md'
import { medicines } from "../../api/api";
import '../../style/add-diagnosis.css'
import { useParams } from "react-router-dom";
import { createDiagnosis } from'../../api/data'

function AddDiagnosis() {
    const [ state, setState ] = useState({description:'', error:'', medicines:[{ id: Math.ceil(Math.random() *10000), name:'', dose:'', duration: '', description:'' }]});
    const MedicinedList = state.medicines.map((med)=><MedicineInputs key={med.id}  id={med.id}{ ...med } setMedicines={setState} /> )
    const { id:patientId } = useParams();
    console.log(patientId)
    const handelSubmitDiagnosis = async(e)=>{
        e.preventDefault();
        if(state.medicines.every(med=>( med.name && med.dose && med.duration )) && state.description ){
            const diagnosis = await createDiagnosis({ ...state, patientId });
        }
        setState(prv=>({...prv, error: 'Please Fillout All The Diagnosis Fields First'}));
        
    }
    const addMedicine= ()=>{
        console.log(state.medicines.every(med=>(!med.name || !med.dose || !med.duration)) )
        if(state.medicines.every(med=>( med.name && med.dose && med.duration )) ){
            setState(prv=>({ ...prv, medicines:[ ...prv.medicines, { id: Math.ceil(Math.random() *10000), name:'', dose:'', duration: '' }]}));
            return;
        }
        setState(prv=>({...prv, error: 'Please Fillout The Medicines Fields First'}));
    }
    console.log(state);
    return ( <div className="add-diagnosis">
        <form>
            { state.error.length>0 && <div style={{textAlign:'center'}} className="error">{state.error}</div>}
            <div className="description">
                <textarea 
                    name= 'description'
                    value={state.description}
                    placeholder= 'description'
                    onChange={(e)=>setState(prv=>({...prv, description:e.target.value}))}
                />
            </div>
            {
            state.medicines.length !==0 && 
                <fieldset>
                    <legend>Medicines:</legend>
                    <div className="medicines-input">
                        {MedicinedList}
                    </div>
                </fieldset>
            }
            <div className="add-medicine" onClick={addMedicine}> <MdAdd /> Medicine</div>
            <button className ='btn-submit' onClick={handelSubmitDiagnosis}>Submit</button>
        </form>
    </div> );
}

export default AddDiagnosis;