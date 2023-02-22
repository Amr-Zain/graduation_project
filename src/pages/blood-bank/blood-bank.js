import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BLOOD_BANK, BLOOD_DONATION, BLOOD_REQUEST } from "../../constants/routes";

function BloodBank() {

    useEffect(()=>{
        document.title = 'Blood Bank';
    });
    return (
            <Container>
            <main className="blood-bank" style={{ height:'100vh', display:'flex', justifyContent: 'space-around',alignItems: 'center'}}>
                <div className="donate">
                    <Link to={BLOOD_BANK+BLOOD_DONATION}> Donate Blood</Link>
                </div>
                <div className="blood-request">
                    <Link to={BLOOD_BANK+BLOOD_REQUEST}> Blood Request</Link>
                </div>
            </main>
            </Container>);
}

export default BloodBank;