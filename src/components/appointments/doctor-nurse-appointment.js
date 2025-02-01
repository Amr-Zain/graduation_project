import { Link } from "react-router-dom";
import { MEDICAL_HISTORY, PATIENT } from "./../../constants/routes";
import { RiDeleteBin5Line } from 'react-icons/ri'; 
import { FiEdit } from 'react-icons/fi'; 


const Appointment = ({ patientId, id, DoctorNurseId, age,
    img, patientName, appointmentDate, overlay, setOverlay }
    ) => {


return (<div className="appointment app-doctor" >
            <div className="patient" >
                <div className="image-text" >
                    <Link to={MEDICAL_HISTORY+PATIENT+'/'+patientId}>
                            <div className="image" >
                                <img width={"100px"} src={img} alt={patientName}/>
                            </div>
                            <div className="name-age">
                                <h3 className="name" >{patientName}</h3>
                                <div className="age">
                                    <h3>{age}y</h3>
                                </div>
                                <div className="app-date">
                                    {new Date(appointmentDate).toDateString()}
                                </div>
                            </div>
                    </Link>
                </div>
                <div className="delete-update-patient">
                    <div className="delete" onClick={()=>setOverlay(prv=>({...prv,show:true, type:'delete', id, name: patientName}))}>
                        <RiDeleteBin5Line  />
                    </div>
                    <div className="update">
                        <FiEdit onClick={()=>setOverlay(prv=>({...prv,show:true, type:'update', id, name: patientName}))} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Appointment;
