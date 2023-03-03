import { useEffect } from "react";
import { setAppointmentsThunk, setDate } from "../../../features/appointments";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "./patient-appointment"; 
import DoctorNurseAppointment from "./doctor-nurse-appointment"; 
import "../../../style/appointment.css";
import { Link, useNavigate } from "react-router-dom";
import { APPOINTMENTS, PATIENT } from "../../../constants/routes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdAdd } from 'react-icons/md'
import { useState } from "react";
import DeletteUpdateOverlay from "./delete-update-overlay";
const Appointments = ({ isAppPage })=>{
    const { appointments, date } = useSelector((store)=>store.appointments);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userType: type } = useSelector((store=>store.authedUser.user));
    const onDateChange = (date)=>{
        dispatch(setDate({ date: new Date(date.toDateString()).getTime()}));
    }
    const [ overlay, setOverlay ] = useState({show:false, type: '', id:'', name:''});
    const appClick = ()=>{
        if(type === 'patient') navigate( PATIENT+APPOINTMENTS);
        else {
            navigate( '/'+type);
        }
    }
    console.log({appointments, date, type, isAppPage })
    const AppointmentsList = type !=='patient'?
            appointments.map(app =><DoctorNurseAppointment key={app.id} overlay={overlay} 
                                                    setOverlay={setOverlay}{...app}/> )
        :
            appointments.map(app =><Appointment key={app.id} {...app}/> )
    console.log(appointments)
    useEffect(()=>{
        dispatch(setAppointmentsThunk({ type, date }));
    },[date]);
    return (  <div  className={isAppPage?'appoint-page':"appointmets"}>
        <div className="top-text" onClick={appClick} ><Link to={PATIENT+APPOINTMENTS}>Upcoming Appointments</Link></div>
        { type !=='patient' &&<div className="date">
            <DatePicker 
                showIcon
                selected={ new Date(date) }
                closeOnScroll={(e) => e.target === document}
                /* minDate={new Date()}  */
                onChange={onDateChange}
                placeholderText="Date"
            />
        </div>}
        <div className="appointmets-container">
            {AppointmentsList} 
        </div>
        { 
            type !== 'patient' && 
            <div className="add-appointment" onClick={()=>setOverlay(prv=>({...prv, show:true, type:'add' }))}>
                <MdAdd /> Appointment
            </div>
        }
        {overlay.show && <DeletteUpdateOverlay setOverlay={setOverlay} overlay={overlay} />}
    </div>);
}

export default Appointments;