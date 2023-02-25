import { useState } from "react";
import DiagnosisList from "./diagnosisList";
import Diseases from "./diseases";
import Medicines from "./medicines";
import { useSelector } from "react-redux";
import PatientInfo from "./patientInfo";
export default function MedicalHistoryComponents(){
    const userType = useSelector(store=> store.authedUser.userType);

    const [ type, setType ] = useState('diagnosis');

    return(<>
            {userType === 'doctor' && <PatientInfo /> }
            <div className="choose">
                <div className= {`diagnosis-btn ${type ==='diagnosis'?'active':''}`} onClick={()=>setType('diagnosis')}>Diagnosis</div>
                <div className= {`current-medicines ${type === 'medicines' ?'active':''}`} onClick={()=>setType('medicines')}>Medicines</div>
                <div className= {`diseases ${type === 'diseases' ?'active':''}`} onClick={()=>setType('diseases')}>Diseases</div>
            </div>
            <div className="choosed-container">
                {type === 'diagnosis'? 
                                    <DiagnosisList />
                                    :
                                    type === 'medicines'?
                                        <Medicines /> 
                                        : 
                                        <Diseases />}
            </div>
        </>)
}