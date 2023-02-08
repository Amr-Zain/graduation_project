import PopulerDoctors from "../../components/patient/popular_doctors";
import Appointments from "../../components/patient/appointments";
import PopulerNurses from "../../components/patient/popular_nurses";

function Dashboadrd() {
    
    return (<main>
        <PopulerDoctors />
        <Appointments />
        <PopulerNurses />
    </main>);
}

export default Dashboadrd;