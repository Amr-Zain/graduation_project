import { useState } from "react";
import DiagnosisList from "./diagnosisList";
import Diseases from "./diseades";
import Medicines from "./medicines";
import '../../style/medical-histor.css'
export default function MedicalHistoryComponents(){
    const [ type, setType ] = useState('diagnosis');

    return(<>
            <div className="choose">
                <div className= {`diagnosis ${type ==='diagnosis'?'active':''}`} onClick={()=>setType('diagnosis')}>Diagnosis</div>
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