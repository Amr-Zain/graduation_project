import AppComponents from '../../components/appointments';
import { useEffect } from 'react';
const Appointments = ()=>{
    useEffect(()=>{
        document.title = 'Appointments';
    },[])
    return(<>
        <AppComponents isAppPage type ={'patient'}/>
    </>
    );
}

export default Appointments;