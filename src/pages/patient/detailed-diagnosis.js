import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDiagnosis } from "../../api/data";
import Header from "../../components/header";
import Footer from '../../components/Footer/Footer';
import Diagnosis from "../../components/medical-history/diagnosis";
import Medicines from "../../components/medical-history/medicines";
import '../../style/medical-history.css'
function DetailedDiagnosis() {
    const params = useParams();
    const [ diagnosis, setDiagnosis ] = useState({ medicine:[]})
    useEffect(()=>{
        document.title = 'Diagnosis';
        const Diagnosis = async()=>{
            const result = await getDiagnosis(params.id);
            setDiagnosis(result);
            console.log(result)
        }
        Diagnosis();
    })
    return ( <>
            <Header />
            <main className="detailed-diagnosis">
                <Container>
                    <Diagnosis {...diagnosis}  >
                        <Medicines medicines = {diagnosis.medicine}/>
                    </Diagnosis>
                </Container>
            </main>
            <Footer />
            </>);
}

export default DetailedDiagnosis;