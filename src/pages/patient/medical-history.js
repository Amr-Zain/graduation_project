import { useEffect } from "react";
import { Container } from "react-bootstrap";
import MedicahComponents from '../../components/medical-history'
import Header from '../../components/header'
import '../../style/medical-history.css'
import { useLocation, useParams } from "react-router-dom";
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