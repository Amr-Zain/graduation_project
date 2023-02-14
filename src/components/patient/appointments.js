import { useEffect } from "react";
import { setAppointmentsThunk } from "../../features/appointments";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "./appointment";
import "../../style/appointment.css";
import { Link, useNavigate } from "react-router-dom";
import { APPOINTMENTS, PATIENT } from "../../constants/routes";
const Appointments = ()=>{
    const { appointments } = useSelector((store)=>store.userAppointments);
    const dispatch = useDispatch()
    console.log(appointments);
    const AppointmentsList = appointments.map(app =><Appointment key={app.id} {...app}/> )
    useEffect(()=>{
        dispatch(setAppointmentsThunk());
    },[]);
    return (  <div  className="appointmets">
        <div className="top-text" ><Link to={PATIENT+APPOINTMENTS}>Upcoming Appointments</Link></div>
        <div className="appointmets-container">
            {AppointmentsList} 
        </div>
    </div>);
}

export default Appointments;