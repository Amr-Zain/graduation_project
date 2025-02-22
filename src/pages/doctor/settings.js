import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ClinicForm from "../../components/doctor/settings/clinicForm";

function Settings() {
    
    const [showClincForm, setShowClincForm] = useState(false);

    useEffect(()=>{
        document.title = 'Doctor-Settings';
    },[])
    return ( <main>
        <div>
            <button onClick={(e)=>setShowClincForm(pev=>!pev)}>
                {showClincForm?<IoIosArrowUp />:<IoIosArrowDown />}
                Add Clinic
                </button>
            {showClincForm&&<ClinicForm />}
        </div>

        <div>
            create clinic shechedule
        </div>
        <div>
            add receptionist
        </div>
        <div>
            upload profile image
        </div>
        <div>
            verify the email
        </div>
        <div>
            page for reset the forgeting password
        </div>

    </main> );
}

export default Settings;