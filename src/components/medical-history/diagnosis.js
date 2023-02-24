import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { diagnosis } from "../../api/api";
import { DOCTOR, MEDICAL_HISTORY, PATIENT, DIAGNOSIS } from "../../constants/routes";
import medicalHistory, { setDiagnosisAndMedicines } from '../../features/medicalHistory';


export default function Diagnosis(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return(<div className="diagnosis" onClick={()=>navigate(PATIENT+MEDICAL_HISTORY+DIAGNOSIS+`/${props.id}`)}>
            <div className="doctor" >
                <div className="img" >
                    <Link to={DOCTOR +`/${props.doctorId}`}>
                        <img src={props.doctorImageURL} alt={`Dr.${props.doctorName}`} />
                    </Link>
                </div>
                <div className="name">
                    <Link to={DOCTOR +`/${props.doctorId}`}>{props.doctorName}</Link>
                </div>
            </div>
            <div className="diagnosis-description">
                <p>discription : {props.description}</p>
            </div>
            <div className="date">
                <p> {new Date(props.date).toDateString()}</p>
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