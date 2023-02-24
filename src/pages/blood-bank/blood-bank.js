import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BLOOD_BANK, BLOOD_DONATION, BLOOD_REQUEST } from "../../constants/routes";
import '../../style/blood-bank.css'
function BloodBank() {

    useEffect(()=>{
        document.title = 'Blood Bank';
    });
    return (
            <Container>
            <main className="blood-bank">
                <div className="donate">
                    <Link to={BLOOD_BANK+BLOOD_DONATION}>
                        <img src="\images\blood_request.png" alt="blood request" width={'100px'}/>
                        <div>Donate Blood</div>
                    </Link>
                </div>
                <div className="blood-request">
                    <Link to={BLOOD_BANK+BLOOD_REQUEST}>
                        <img src="\images\blood_request.png" alt="blood request" width={'100px'}/>
                        <div>Blood Request</div>
                    </Link>
                </div>
            </main>
            </Container>);
}

export default BloodBank;