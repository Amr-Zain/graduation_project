import { useState } from "react";
import DiagnosisList from "./diagnosisList";
import Medicines from "./medicines";
import { useSelector } from "react-redux";
import PatientInfo from "./patientInfo";
import { MdAdd } from 'react-icons/md';
import AddDiagnosis from "./add-diagnosis";
import { useParams } from "react-router-dom";

const tabs = [
    { id: 'diagnosis', label: 'Diagnosis' },
    { id: 'medicines', label: 'Medicines' },
];
export default function MedicalHistoryComponents() {
    const {userType, id} = useSelector(store => store.authedUser.user);
    const [type, setType] = useState('diagnosis');
    const { patientId } = useParams();
    const ID = patientId?  patientId : id;
    return (
        <>
            <PatientInfo patientId={ID} />
            <div className="tab-list" role="tablist">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={type === tab.id}
                        className={`tab-button ${type === tab.id ? 'active' : ''}`}
                        onClick={() => setType(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
                {userType === 'patient' && (
                    <button
                        role="tab"
                        aria-selected={type === 'add-diagnosis'}
                        className={`tab-button ${type === 'add-diagnosis' ? 'active' : ''}`}
                        onClick={() => setType('add-diagnosis')}
                    >
                        <MdAdd aria-hidden="true" /> Add Diagnosis
                    </button>
                )}
            </div>
            <div className="tab-content">
                {type === 'diagnosis' && <DiagnosisList patientId ={ID} />}
                {type === 'medicines' && <Medicines patientId ={ID} />}
                {type === 'add-diagnosis' && <AddDiagnosis patientId ={ID} onSuccess={() => setType('diagnosis')} />}
            </div>
        </>
    );
}
    