
import { SEARCH_BOOKED_APPOINTMETS, RECEIVE_QUEUE, BOOK_FOR_PATIENT } from '../constants/action_constats'
import { getAppointment, setAppointment } from '../api/data'


const searchBookedAppointments = ({ appointment })=>({ type: SEARCH_BOOKED_APPOINTMETS, payload: { appointment }}) ;
//const RECEIVE_QUEUE = ({ appointments })=>({ type: RECEIVE_QUEUE, payload: { appointments }});
const bookAppointment = ({ appointment })=>({ type: BOOK_FOR_PATIENT, payload: { appointment }});

export const handleSearchAppointments = ({ patientId, doctorId })=>{
    
    return (dispatch)=>{
        return getAppointment({ patientId, doctorId}).then((appointment)=>{
            searchBookedAppointments(appointment);
        })
    }
}

export const handleBookAppointment = ({ patientId, doctorId, appointmentDate })=>{
    
    return async (dispatch)=>{
        return setAppointment({ doctorId, patientId, appointmentDate }).then((appointment)=>{
            searchBookedAppointments(appointment);
        })
    }
}

