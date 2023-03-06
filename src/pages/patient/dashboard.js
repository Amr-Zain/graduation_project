import PopulerDoctors from "../../components/patient/popular_doctors";
import Appointments from "../../components/patient/appointments";
import PopulerNurses from "../../components/patient/popular_nurses";
import SearchSection from "../../components/patient/search/search-section";
import { Container } from "react-bootstrap";
import Header from "../../components/header";
import Footer from '../../components/Footer/Footer';
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
                <Appointments isAppPage={false} type ={ 'patient'}/>
                <PopulerDoctors />
                <PopulerNurses />
            </Container>
        
        </main>
         <Footer />
        </>
    );
}

export default Dashboadrd;