import PopulerDoctors from "../../components/patient/popular_doctors";
import Appointments from "../../components/patient/appointments";
import PopulerNurses from "../../components/patient/popular_nurses";
import { Container } from "react-bootstrap";

function Dashboadrd() {
    
    return (<main >
        <Container>
            <PopulerDoctors />
            <Appointments />
            <PopulerNurses />
        </Container>
    </main>);
}

export default Dashboadrd;