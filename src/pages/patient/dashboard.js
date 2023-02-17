import PopulerDoctors from "../../components/patient/popular_doctors";
import Appointments from "../../components/patient/appointments";
import PopulerNurses from "../../components/patient/popular_nurses";
import Search from "../../components/patient/search/search-section";
import { Container } from "react-bootstrap";
import Header from "../../components/header";

function Dashboadrd() {
    
    return (
        <>
        <Header />
        <main >
            <Container>
                <Search isDashboard={true}/>
                <PopulerDoctors />
                <Appointments />
                <PopulerNurses />
            </Container>
        </main>
        </>
    );
}

export default Dashboadrd;