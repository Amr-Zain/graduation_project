import PopulerDoctors from "../../components/patient/popular_doctors";
import Appointments from "../../components/patient/appointments/appointments";
import PopulerNurses from "../../components/patient/popular_nurses";
import SearchSection from "../../components/patient/search/search-section";
import { Container } from "react-bootstrap";
import Header from "../../components/header";
import '../../style/search-section.css'

function Dashboadrd() {
    
    return (
        <>
        <Header />
        <main >
            <Container>
                <section className={"search-section"}>
                    <SearchSection isOverlay={false}/>
                </section>
                <PopulerDoctors />
                <Appointments isAppPage={false}/>
                <PopulerNurses />
            </Container>
        </main>
        </>
    );
}

export default Dashboadrd;