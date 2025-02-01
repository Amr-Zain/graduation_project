import Appointments from "../../components/appointments/patient-appointments";
import SearchBar from "../../components/patient/search/search-bar";
import { Container } from "react-bootstrap";
import '../../style/search-section.css'
import Populers from "../../components/popular";

function Dashboard() {
    return (
        <>
        <main >
            <Container>
                <section className="search-section">
                    <SearchBar isOverlay={false}/>
                </section>
                <Appointments isAppPage={false} type ={ 'patient'}/>
                <Populers />
            </Container>
        
        </main>
        </>
    );
}

export default Dashboard;