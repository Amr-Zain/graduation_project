import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/header'
import Appointments from '../../components/patient/appointments';
function Dashboadrd() {
    const doctorApp = useSelector(store => store.appointments);
    return <>
            <Header />
            <main>
                <Appointments isAppPage ={ true } type ={'doctor'}/>
            </main>
        </>;
}

export default Dashboadrd;