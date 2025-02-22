import { IoChatbubbleEllipses } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MEDICAL_HISTORY, PATIENT } from "../../../constants/routes";

function Patient({ img, patientName, appointmentDate, patientId }) {
    const navigate = useNavigate();
    const patientClickHandler = ()=>{
        navigate(`/${MEDICAL_HISTORY}/${patientId}`)
    }
    return ( <div style={{display:'flex',gap:'2rem', alignItems:'center', backgroundColor:'gray'}}>
                <div>
                    <img style={{widows:'5rem',height:'5rem',borderRadius:'50%'}} src={ img || './images/avatars/default.png' } alt={patientName} />
                </div>
                <div style={{cursor:'pointer'}} onClick={patientClickHandler}>
                    <h3>{patientName}</h3>
                </div>
                <div style={{fontSize:'2rem', cursor:'pointer'}}>
                    <IoChatbubbleEllipses />{/* app the chat between them on click */}
                </div>
            </div> );
}

export default Patient;