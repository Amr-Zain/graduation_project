import AppComponents from '../../components/patient/appointments'
import Header from '../../components/header';
import Footer from '../../components/Footer/Footer';
import { useEffect } from 'react';
const Appointments = ()=>{
    useEffect(()=>{
        document.title = 'Appointments';
    },[])
    return(<>
        <Header />
        <AppComponents isAppPage ={ true } type ={'patient'}/>
        <Footer />
    </>
    );
}

export default Appointments;