import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPortal } from "react-dom";
import { cancelAppointment, updateAppointment } from "../../../features/appointments";
import { useDispatch, useSelector } from "react-redux";
import '../../../style/delete-update-overlay.css'
import { Link } from "react-router-dom";
import { PROFILE } from "../../../constants/routes";

function DeleteUpdateOverlay({ overlay:{ id, type, appType, DoctorNurseId, name, }, setOverlay }) {
    const dispatch  = useDispatch();
    const [date, setDate ]= useState(new Date());
    const { appointmentUpdateLoading:isLoading, appointmentUpdateError:error } = useSelector(store=>store.appointments);

    const onDateChange = (date)=>{
        setDate(date);
    }
    // use toaster
    //show the user some effects while excuting the actions could I use the same appointments fetching pendding and error lets t
    const confirmClickHandler = async ()=>{
        if(type === 'delete'){
            await dispatch(cancelAppointment({ id }))
        }else if(type === 'update'){
            await dispatch(updateAppointment({id, date}))
        }
        setOverlay({show:false});
    }
    return createPortal( 
            <>
                <div className="overlay-container">
                        <div style={{minWidth:'300px',fontSize:'1.2rem',color:'#262626'}}>
                            Do You Want To {type} The Appointment With 
                                <Link to={'/'+PROFILE + '/'+appType + "/" + DoctorNurseId } style={{fontWeight:'bold'}}> {name}</Link>
                        </div>
                        
                        {
                            type ==='update'&&<div className="date">
                            <DatePicker 
                                showIcon
                                selected={ date }
                                closeOnScroll={(e) => e.target === document}
                                minDate={new Date()} 
                                onChange={onDateChange}
                                placeholderText="Date"
                            />
                            </div>
                        }
                        <div className={`confirm `} 
                            onClick={confirmClickHandler}
                            onKeyDown={(e) => e.key === 'Enter' && confirmClickHandler()}
                        > {isLoading?'loading':type}</div>
                        <div className="back" onClick={()=>setOverlay({show:false})}> Cancel</div>
                </div>
                    
                <div onClick={()=>setOverlay({show:false})} className="over" style={{
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

export default DeleteUpdateOverlay;