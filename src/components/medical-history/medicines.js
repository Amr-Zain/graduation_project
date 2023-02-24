import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDiagnosisAndMedicines } from '../../features/medicalHistory';
export default function Medicines(){
    const medicines = useSelector(store=>store.medicalHistory.medicines);
    console.log(medicines)
    const dispatch = useDispatch();
    const medicinesList = medicines?.map(med=>(<tr key={med.id} className="medicine">
                                                <td className="medicine-name">{med.name}</td>
                                                <td className="dose">{med.dose}</td>
                                                <td className="duration">{med.duration}</td>
                                            </tr>));
    useEffect(()=>{
        console.log('getMedicines')
        dispatch(setDiagnosisAndMedicines('medicines'));
    });
    return(
        <table className="medicines-table">
            <thead>
                <tr>
                    <th>Medicine name</th>
                    <th>Dose</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {medicinesList}
            </tbody>
    </table>);    
}