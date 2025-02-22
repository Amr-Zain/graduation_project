import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../features/appointments";
import Patient from "./patient";

function DoctorAppointments({ date }) {
    const {appointments} = useSelector(state=>state.appointments);
    const dispatch = useDispatch();
    const Appointments = appointments.map(app=><Patient key={app.id}{...app}/>);

    useEffect(()=>{
        dispatch(getAppointments({ date }));
    },[date]);

    return ( <div style={{display:'flex', flexWrap:'wrap',gap:'2rem'}}>
        {Appointments}
    </div> );
}

export default DoctorAppointments;