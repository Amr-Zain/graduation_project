import {  useEffect } from 'react';
import DoctorAppointments from '../../components/doctor/appointments';

function Dashboadrd() {
    
    useEffect(()=>{
        document.title = 'Doctor-Dashboard';
    })
    return (
            <main >
                <div>
                    <h2>Today Appointments</h2>
                    <div>
                        <DoctorAppointments date={Date.now()} />
                    </div>
                </div>
            </main>
            );
}

export default Dashboadrd;