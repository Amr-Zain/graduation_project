import { RiDeleteBin5Line } from 'react-icons/ri'; 

function MedicineInputs({ id, name, dose, duration, setMedicines  }) {
    const medicineChange = (e)=>{
        setMedicines(prv=>({...prv, error:'',medicines: prv.medicines.map((med,i)=>{
            return i === id?{ ...med, [e.target.name]:e.target.value}:med;
        })}));
    } 
    const handelDeleteMedicine = ()=>{
        setMedicines(prv=>({ ...prv, error:'', medicines: prv.medicines.splice(id,1)}))
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
                            type='text'
                            name= 'dose'
                            value={dose}
                            placeholder= 'Dosage'
                            onChange={medicineChange}
                        />
                    </div>
                    <div className="duration">
                        <input
                            type='text'
                            name= 'duration'
                            value={duration}
                            placeholder= 'Duration'
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