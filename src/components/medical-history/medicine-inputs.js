import { RiDeleteBin5Line } from 'react-icons/ri'; 

function MedicineInputs({ id, name, dose, duration, description, setMedicines  }) {
    const medicineChange = (e)=>{
        setMedicines(prv=>({...prv, error:'',medicines: prv.medicines.map((med)=>{
            return med.id === id?{ ...med, [e.target.name]:e.target.value}:med;
        })}));
    } 
    const handelDeleteMedicine = ()=>{
        setMedicines(prv=>({ ...prv, error:'', medicines: prv.medicines.filter((med)=>med.id !==id)}))
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