import { useEffect } from "react";
import { setAppointmentsThunk } from "../../features/appointments";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "./appointment";
import "../../style/appointment.css";
const Appointments = ()=>{
    const { appointments } = useSelector((store)=>store.userAppointments);
    const dispatch = useDispatch()
    console.log(appointments);
    const AppointmentsList = appointments.map(app =><Appointment key={app.id} {...app}/> )
    useEffect(()=>{
        dispatch(setAppointmentsThunk());
    },[]);
    return (  <div  className="popular_doctors">
        <div className="top-text">المواعيد القادمه</div>
        <div style={{display:'flex'}}className="doctors">
            {AppointmentsList} 
        </div>
    </div>);
}

export default Appointments;