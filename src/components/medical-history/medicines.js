import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMedicines } from '../../features/medicalHistory';

const MedicineMap = (medicines)=>{
    return medicines.map(med=>(<tr key={med.id} className="medicine">
    <td className="medicine-name">{med.name}</td>
    <td className="dose">{med.dose}</td>
    <td className="duration">{med.duration}</td>
</tr>))
}
export default function Medicines(props){
    const { data:medicines, isLoading } = useSelector(store=>store.medicalHistory.medicines);
    console.log(props.medicines)
    const dispatch = useDispatch();
    const medicinesList =props.medicines?MedicineMap(props.medicines):MedicineMap(medicines);
    useEffect(()=>{
        //console.log('getMedicines')
        if(!props.medicines) dispatch(setMedicines());
    },[]);
    return(
        <table className={` medicines-table ${!props.medicines?"":'diagonsis-medicines-table'}`}>
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