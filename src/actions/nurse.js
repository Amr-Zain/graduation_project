
import { RECEIVE_RESERVATIONS, CANCEL_RESERVATIONS } from "../constants/action_constats";
import { getReservations, removeReservation } from "../constants/action_constats";

const receiveReservations = (reservations)=>({ type: RECEIVE_RESERVATIONS, payload: { reservations}});
const canelReservations = (reservationsId)=>({ type: CANCEL_RESERVATIONS, payload: { reservationsId }});

export const handleReceiveReservations = (nurseId)=>{
    
    return (dispatch) => {
        //showloading
        return getReservations({ nurseId }).then(( reservations ) =>{
            //hideloading
            dispatch(receiveReservations());
            //remove from to sessionStorage
        });
    }

}

export const handleCanelReservations = (reservationId)=>{
    
    return (dispatch) => {
        //showloading
        return removeReservation({ reservationId }).then(( ) =>{
            //hideloading
            dispatch(canelReservations(reservationId));
            //remove from to sessionStorage
        });
    }

}