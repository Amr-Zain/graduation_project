import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines } from '../../features/medicalHistory';

const MedicineMap = (medicines) => {
  return medicines.map(med => (
    <tr key={med.id} className="medicine">
      <td className="medicine-name">{med.name}</td>
      <td className="dose">{med.dose}</td> 
      <td className="dose">{new Date(med.date).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    }).replace(/\//g, '-')}</td> 
      <td className="duration">{med.duration}</td>
    </tr>
  ));
};

export default function Medicines({ patientId, isDiagnosis, medicines:DiagnosisMedicinies }) {
    const dispatch = useDispatch();
    const { data: medicines, isLoading, error } = useSelector(store => store.medicalHistory.medicines);

    const medicinesList = isDiagnosis && DiagnosisMedicinies ?  MedicineMap(DiagnosisMedicinies):MedicineMap(medicines);// see if it medicines of a diagnosis or the one the patient takes 

    useEffect(() => {
            if(!DiagnosisMedicinies && !isDiagnosis && medicines.length ===0) dispatch(getMedicines({ patientId }));
    }, [ patientId, isDiagnosis ]); 

    if (isLoading) {
        return <div className="loading-message">Loading medicines...</div>;
    }
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }
    return (
        <table className={`medicines-table diagnosis-medicines-table`}>
        <thead>
            <tr>
            <th>Medicine name</th>
            <th>Dose</th>
            <th>Date</th>
            <th>Duration</th>
            </tr>
        </thead>
        <tbody>
            {medicinesList.length > 0 ? medicinesList : <tr><td colSpan="3">No medicines found.</td></tr>}
        </tbody>
        </table>
    );
}