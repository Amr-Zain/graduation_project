import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientInfo } from "../../features/medicalHistory";
function PatientInfo({ patientId }) {
    const {data:{ 
        image,
        name,
        age}, isLoading, error }= useSelector(store => store.medicalHistory.patientInfo);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPatientInfo({ patientId }))
    },[ patientId ])
    if(isLoading){
        return <div style={{textAlign:'center'}}> Loading...</div>
    }
    if(error){
        return <div style={{textAlign:'center'}}>Error:{error}</div>
    }
    return ( 
            <div className="patient-info">
                <div className="image"> 
                    <img src={image || '/images/avatars/default.png'} alt={name} />
                </div>
                <div className="info">
                    <h3>{name}</h3>
                    <p>Age: {age} year</p>
                </div>
            </div> 
            );
}

export default PatientInfo;