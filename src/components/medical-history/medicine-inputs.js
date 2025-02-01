import { RiDeleteBin5Line } from 'react-icons/ri'; 
import { deleteFormMedicine, setFormMedicine } from '../../features/medicalHistory';
import { useDispatch } from 'react-redux';

function MedicineInputs({ id, name, dose, duration, description  }) {
    const dispatch = useDispatch();
    const medicineChange = (e)=>{
        dispatch(setFormMedicine({ id, name:e.target.name, value: e.target.value }))
    } 
    const handelDeleteMedicine = ()=>{
        dispatch(deleteFormMedicine({ id }))
    }
    return ( <div className="medicine-inputs-delete">
                <div className="medicine-inputs">
                    <div className="medicine-name">
                        <input
                            type='text'
                            name= 'name'
                            value={name}
                            placeholder= 'Medicine Name'
                            onChange={medicineChange}
                        />
                    </div>
                    <div className="dose">
                        <input
                            type='number'
                            name= 'dose'
                            value={dose}
                            placeholder= 'Dosage Aday'
                            onChange={medicineChange}
                        />
                    </div>
                    <div className="duration">
                        <input
                            type='number'
                            name= 'duration'
                            value={duration}
                            placeholder= 'Duration in weeks'
                            onChange={medicineChange}
                        />
                    </div>
                    <div className="med-description">
                        <input
                            type='text'
                            name= 'description'
                            value={description}
                            placeholder= 'Description'
                            onChange={medicineChange}
                        />
                    </div>
                </div>
                <div className="delete" onClick={handelDeleteMedicine}>
                    <RiDeleteBin5Line />
                </div>
            </div>);
}

export default MedicineInputs;