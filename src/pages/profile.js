import { useEffect } from "react";
import { Container } from "react-bootstrap";
import ProfileComponents from "../components/doctor-nurse-profile";
import '../style/profile.css'

function Profile() {
    useEffect(()=>{
        document.title = 'Profile';
    })
    return<main className="profile">
        <Container>
            <ProfileComponents isPage />
        </Container>
    </main>;
}   

export default Profile;