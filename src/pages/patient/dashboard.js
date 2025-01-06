import PopulerDoctors from "../../components/popular/popular_doctors";
import Appointments from "../../components/appointments";
import PopulerNurses from "../../components/popular/popular_nurses";
import SearchBar from "../../components/patient/search/search-bar";
import { Container } from "react-bootstrap";
import '../../style/search-section.css'

function Dashboadrd() {
    
    return (
        <>
        <main >
            <Container>
                <section className="search-section">
                    <SearchBar isOverlay={false}/>
                </section>
                <Appointments isAppPage={false} type ={ 'patient'}/>
                <PopulerDoctors />
                <PopulerNurses />
            </Container>
        
        </main>
        </>
    );
}

export default Dashboadrd;