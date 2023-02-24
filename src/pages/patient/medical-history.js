import { useEffect } from "react";
import { Container } from "react-bootstrap";
import MedicahComponents from '../../components/medical-history'
import Header from '../../components/header'
export default function MedicalHistory(){
    useEffect(()=>{
        document.title = 'Medical History';
    });
    return(<>
            <Header />
            <main className="medical-history">
                <Container>
                    <MedicahComponents />
                </Container>
            </main>
        </> )
}