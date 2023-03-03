import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPortal } from "react-dom";
import { addAppointment, deleteAppointment, updateAppointmentDate } from "../../../features/appointments";
import { DeleteAppointment, UpdateAppointment, AddAppointment } from "../../../api/data";
import { useDispatch, useSelector } from "react-redux";
import '../../../style/delete-update-overlay.css'

function DeletteUpdateOverlay({ setOverlay, overlay }) {
    const currentSelected = useSelector(store=>store.appointments.date)
    const dispatch  = useDispatch();
    const [state, setState ]= useState({date:currentSelected, patientEmail:''});

    const onDateChange = (date)=>{
        console.log(new Date(date.toDateString()).getTime())
        setState(prv=>({ ...prv, date: new Date(date.toDateString()).getTime()}));
    }
    const doctorId = useSelector(store=>store.authedUser.user.id);
    const confirmClickHandler = async ()=>{
        try{
            if(overlay.type === 'delete'){
                await DeleteAppointment(overlay.id);
                dispatch(deleteAppointment({ appointmentId: overlay.id }));
            }else if(overlay.type === 'update'){
                await UpdateAppointment({ id: overlay.id, date:state.date});
                dispatch(updateAppointmentDate({ id: overlay.id, date:state.date }));
            }else{
                await AddAppointment({ patientEmail:state.patientEmail, doctorId, appointmentDate:state.date})
                dispatch(addAppointment({
                    id: 'qedlcsdsssnfsnc',
                    doctorId: 'qedlnfsnc',
                    appointmentDate: state.date,
                    bookedAte:  new Date(2023,2,1).getTime(),
                    patientId: 'dskfhklddsdsjklf',
                    patientName: 'Fathi Ahmed ',
                    age: 32,
                    img: '/images/avatars/karl.jpg'
                }));
            }
            setOverlay(prv=>({ ...prv, show:false}))
        }catch(e){
            console.log(e)
        }
    }
    console.log(overlay.name)
    return createPortal( 
            <>
                <div className="overlay-container">
                    {overlay.type === 'delete' ?
                        <div style={{minWidth:'300px',fontSize:'1.2rem',color:'#262626'}}>Do want to delete the Appointment with <span style={{fontWeight:'bold'}}>{overlay.name}</span></div>
                        :
                        <>
                            <div> {overlay.type ==='update'?'Update The Appointment Date with'+ <span>{overlay.name}</span>:'Add An Appointment'}</div>
                            <div className="date">
                                <DatePicker 
                                    showIcon
                                    selected={ new Date(state.date) }
                                    closeOnScroll={(e) => e.target === document}
                                    minDate={new Date()} 
                                    onChange={onDateChange}
                                    placeholderText="Date"
                                />
                            </div>
                            {overlay.type ==='add'&&
                                <div className="patient-email">
                                    <input name='patientEmail' 
                                        placeholder="Patient Email"
                                        value={state.patientEmail} 
                                        onChange={(e)=>setState(prv=>({...prv,[e.target.name]:e.target.value}))} 
                                    />
                                </div>
                            }
                        </>
                    }
                        <div className={`confirm ${overlay.type}`} onClick={confirmClickHandler}> {overlay.type}</div>
                        <div className="back" > Cancel</div>
                </div>
                    
                <div onClick={()=>{ setOverlay(prv=>({ ...prv,show:false}) )}} className="over" style={{
                position: 'fixed',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                zIndex:"50",
                backgroundColor: 'rgb(0 0 0 / 60%)',
                display:'block'
                }}></div>
            </>, document.getElementById('root2') );
}

export default DeletteUpdateOverlay;