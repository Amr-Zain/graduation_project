import { Link, useNavigate } from "react-router-dom";
import { DOCTOR, MEDICAL_HISTORY, PATIENT, DIAGNOSIS } from "../../constants/routes";


export default function Diagnosis(props){
    const navigate = useNavigate();
    return(<div className="diagnosis" >
            <div className="doctor" >
                <div className="img" >
                    <Link to={DOCTOR +`/${props.doctorId}`}>
                        <img src={props.doctorImageURL} alt={`Dr.${props.doctorName}`} />
                    </Link>
                </div>
                <div>
                    <div className="name">
                        <Link to={DOCTOR +`/${props.doctorId}`}>Dr.{props.doctorName}</Link>
                    </div>
                    <div>
                        <p>
                            <span>
                            
                            </span>
                            {props.specializations}</p>
                    </div>
                </div>
            </div>
            <div className="diagnosis-info" onClick={()=>navigate(MEDICAL_HISTORY+PATIENT+DIAGNOSIS+`/${props.id}`)}>
                <div className="diagnosis-description">
                    <p>Discription : {props.description}</p>
                </div>
                {props.children }
                <div className="date">
                    <p> {new Date(props.date).toDateString()}</p>
                </div>
            </div>
    </div>);    
}

/* id: 'dssdfdfsgkfl',
            PatientId: 'dskfhkldsjklf',
            doctorId: 'dskkjoerpeww',
            dcotorName: 'Amr Zain',
            DoctorImageURL:'./images/avatars/raphael',
            date: Date.now(),
            discription : 'headache',
            medicine:[ not here
                {
                    name: 'Panadol',
                    dose: 'thee time aday after eating', 
                    duration: 'for 2 weeks'
                },{
                    name: 'Panadol',
                    dose: 'thee time aday after eating', 
                    duration: 'for 2 weeks'
                },{
                    name: 'Panadol',
                    dose: 'thee time aday after eating', 
                    duration: 'for 2 weeks'
                },
            ] */