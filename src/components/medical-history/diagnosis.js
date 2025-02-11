import { Link, useNavigate } from "react-router-dom";
import { DOCTOR, MEDICAL_HISTORY, PATIENT, DIAGNOSIS, PROFILE } from "../../constants/routes";


export default function Diagnosis({ children, id, doctorId, doctorImageURL, doctorName, specializations, date, description, isPage }){
    const navigate = useNavigate();
    const handleDaiagnosisClick = ()=>{
        if(!isPage) navigate(MEDICAL_HISTORY+PATIENT+DIAGNOSIS+`/${id}`)
    }
    return(<div className="diagnosis" >
            <div className="doctor" >
                <div className="img" >
                    <Link to={'/'+PROFILE+'/'+DOCTOR +`/${doctorId}`}>
                        <img src={doctorImageURL} alt={`Dr.${doctorName}`} />
                    </Link>
                </div>
            <div>
                    <div className="name">
                        <Link to={'/'+PROFILE+'/'+DOCTOR +`/${doctorId}`}>Dr.{doctorName}</Link>
                    </div>
                    <div>
                        <p>
                            <span>
                            
                            </span>
                            {specializations}</p>
                    </div>
                </div>
            </div>
            <div className="diagnosis-info" onClick = {handleDaiagnosisClick}>
                <div className="diagnosis-description">
                    <p>Description : {description}</p>
                </div>
                {children }
                <div className="date">
                    <p> {new Date(date).toDateString()}</p>
                </div>
            </div>
    </div>);    
}
