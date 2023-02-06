
import { DOCTOR_QUEUE, REMOVE_DONE_APPOINTMENT ,RECEIVE_PATIENT_DIAGNOSIS, ADD_DIAGNOSIS } from "../constants/action_constats";
import { saveDiagnosis, getDoctorQueue, getPatientData } from "../api/data";

const doctorQueue = ({ Patients })=>({ type: DOCTOR_QUEUE, payload: { Patients }}); //search by ? or forwarded from the reseotin dirctly
const removeDone = ({ appointmentId }) => ({ type: REMOVE_DONE_APPOINTMENT, payload: { appointmentId }});
const receivePatientDiagnosis = ({ patientDiagnosis }) =>({ type: RECEIVE_PATIENT_DIAGNOSIS, payload: { patientDiagnosis }  });

const addDiagnosis = ({ diagnosis }) =>({ type: ADD_DIAGNOSIS, payload: { diagnosis } });

export const handleAddDiagnosis = ({ patientId, docotorId, describtion, medicines }) => {
    return (dispatch) =>{
        //showloading
        return saveDiagnosis({ patientId, docotorId, describtion, medicines }).then((diagnosis)=>{
            //hideloading
            dispatch( addDiagnosis(diagnosis) );
        });
    }

}
export const handleRemoveDone = ({ patientId, docotorId, describtion, medicines }) => {
    return (dispatch) =>{
        //showloading
        return saveDiagnosis({ appointmentId }).then(()=>{
            //hideloading
            dispatch( removeDone(appointmentId) );
        });
    }

}


export const handleReceivePatientDiagnosis = ({ patientId }) => {//it will get the doctor by the token
    return (dispatch) =>{
        //showloading
        return getPatientData({ patientId }).then(( patientData )=>{
            //hideloading
            dispatch( receivePatientDiagnosis( patientData ) );
        });
    }

}

export const handledoctorQueue = ( { docotorId, date } ) =>{
    return (dispatch) =>{
        //showloading
        return getDoctorQueue({ docotorId, date }).then(( patients )=>{
            //hideloading
            dispatch( doctorQueue( { patients } ) );
        });
    }
}