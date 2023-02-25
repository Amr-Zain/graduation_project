import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPatientInfo } from "../../features/medicalHistory";
function PatientInfo() {
    const {data:{ id,
        image,
        name,
        age}, isLoading }= useSelector(store => store.medicalHistory.patientInfo);
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setPatientInfo(params.id))
    },[])
    return ( <div className="patient-info">
        <div className="image"> 
            <img src={image} alt={name} />
        </div>
        <div className="info">
            <h3>{name}</h3>
            <p>Age: {age} year</p>
        </div>
    </div> );
}

export default PatientInfo;