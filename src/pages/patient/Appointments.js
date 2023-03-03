import AppComponents from '../../components/patient/appointments'
import Header from '../../components/header';
import { useEffect } from 'react';
const Appointments = ()=>{
    useEffect(()=>{
        document.title = 'Appointments';
    },[])
    return(<>
        <Header />
        <AppComponents isAppPage ={ true } type ={'patient'}/>
    </>
    );
}

export default Appointments;