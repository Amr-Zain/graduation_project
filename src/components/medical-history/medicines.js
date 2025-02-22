import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spinner, Alert } from "react-bootstrap";
import { getMedicines } from '../../features/medicalHistory';



const MedicineMap = (medicines) => {
  return medicines.map(med => (
    <tr key={med.id} className="medicine">
      <td className="medicine-name medicine-mobile-sm">{med.name}</td>
      <td className="dose medicine-mobile-sm">{med.dose}, duration:{med.duration}</td> 
      <td className="date medicine-mobile-sm">
        {new Date(med.date).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replace(/\//g, '-')}
      </td> 
    </tr>
  ));
};

export default function Medicines({ patientId, isDiagnosis, medicines: DiagnosisMedicines }) {
    const dispatch = useDispatch();
    const { data: medicines, isLoading, error } = useSelector(store => store.medicalHistory.medicines);

    const medicinesList = isDiagnosis && DiagnosisMedicines 
        ? MedicineMap(DiagnosisMedicines)
        : MedicineMap(medicines);

    useEffect(() => {
        if (!DiagnosisMedicines && !isDiagnosis && medicines.length === 0) {
            dispatch(getMedicines({ patientId }));
        }
    }, [patientId, isDiagnosis, dispatch, DiagnosisMedicines, medicines.length]);

    if (isLoading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading medicines...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="my-4 fs-6 fs-sm-7">
                Error loading medicines: {error}
            </Alert>
        );
    }

    return (
        <>
            <div className="table-responsive">
                <Table striped bordered hover className="medicines-table">
                    <thead className="" >
                        <tr>
                            <th className="medicine-mobile-sm" >Medicine </th>
                            <th className="medicine-mobile-sm">Dose</th>
                            <th className="medicine-mobile-sm">Prescribed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicinesList.length > 0 ? (
                            medicinesList
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-muted text-center py-4 fs-6 fs-sm-7">
                                    No medicines found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
}