
import { PATIENT_SEARCH_RESULT, RECEIVE_PROFILE, ADD_DONATION_REQUEST, REMOVE_DONATION_REQUEST, 
        DONATE_REQUEST, BOOK_APPOINTMENT, REMOVE_APPOINTMENT } from "../constants/action_constats";

import { PatientSearsh, getUser, setDonationRequest, removeDonationRequest, updateDonatorsOfRequest, 
        setAppointment, deleteAppointment } from "../api/data";

const patientSearshResult = ({ result })=>({ type: PATIENT_SEARCH_RESULT, payload: { result }}) 

const receiveProfile = ({ user }) =>({ type: RECEIVE_PROFILE, payload: { user }  });

const addDonationRequest = ( donationRequest ) =>({ type: ADD_DONATION_REQUEST, payload: { donationRequest } });// i don't know i will need this
const deleteDonationRequest = ( donationRequest ) =>({ type: REMOVE_DONATION_REQUEST, payload: { donationRequest } });// i don't know i will need this
const donate = ({ donaterId, requestId }) =>({ type: DONATE_REQUEST, payload: { donaterId, requestId } });

const addAppointment = ({ appointment }) =>({ type: BOOK_APPOINTMENT, payload: { appointment }});//date of booking
const removeAppointment = ({ appointmentId}) =>({ type: REMOVE_APPOINTMENT, payload: { appointmentId }})
export const handlePatientSearch = ( { userType, governorate, city, name , price, raing  } )=>{// SearchFor =>doctor, donationRequest or nurse price(0 lowest,1 highest)
    return (dispatch) =>{
        //load
        return PatientSearsh({ userType, governorate, city, name , price, raing  }).then((result) => {
            //hide
            dispatch(patientSearshResult(result));
        });
    }
} 
export const getPofile = ( { userId, userType  } )=>{
    return (dispatch) =>{
        //load
        return getUser({ userId, userType }).then((data) => {
            //hide
            dispatch(receiveProfile(data));
        });
    }
} 
export const createDonationRequest = ( { patientId, governorate, city, bloodType, requiredDonaters } ) => {
    return (dispatch) =>{
        //load
        return setDonationRequest({ patientId, governorate, city, bloodType, requiredDonaters }).then((donationRequest) => { //userId provided by the token
            //hide
            dispatch(addDonationRequest(donationRequest));
        });
    }
} 
export const removeDonation = ( { requestId, patientId } ) => {
    return (dispatch) =>{
        //load
        return removeDonationRequest( { requestId, patientId } ).then(() => { //userId provided by the token
            //hide
            dispatch(deleteDonationRequest(requestId));
        });
    }
} 
export const donateRequestToggle = ( { donaterId, requestId } ) => {// SearchFor =>doctor donater nurse price(0 lowest,1 highest)
    return (dispatch) =>{
        //load
        return updateDonatorsOfRequest( { donaterId, requestId } ).then(() => { //userId provided by the token
            //hide
            dispatch(donate(donaterId));
        });
    }
} 
export const bookAppointment = ( { doctorId, patientId, bookingDate } ) => {// SearchFor =>doctor donater nurse price(0 lowest,1 highest)
    return (dispatch) =>{
        //load
        return setAppointment( { doctorId, patientId, bookingDate } ).then((appointment) => { //userId provided by the token
            //hide
            dispatch(addAppointment((appointment)));
        });
    }
} 
export const canelAppointment = ( { appointmentId, patientId } ) => {// SearchFor =>doctor donater nurse price(0 lowest,1 highest)
    return (dispatch) =>{
        //load
        return deleteAppointment( { appointmentId, patientId } ).then(() => { //userId provided by the token
            //hide
            dispatch(removeAppointment((appointmentId)));
        });
    }
} 

/* 
 */