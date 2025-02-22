import { useEffect, useState } from "react";
import { Col, Card } from 'react-bootstrap';
import { AppointmentPicker } from "react-appointment-picker";
import { useDispatch, useSelector } from "react-redux";
import { getClinicAppointments, setAppointmentTime } from "../../features/profile";

function AppPicker() {
    const { 
        shecheduleDay, 
        clinicLocation, 
        initShecheduleDate, 
        clinicId, 
        appointmentPeriod, 
        isLoading, 
    } = useSelector(state => state.profile.clinic);
    const [widthMatchs, setWidth] = useState(false);

    const dispatch = useDispatch();

    const addAppointmentCallback = ({
        addedAppointment: { day, number, time, id },
        addCb,
        removedAppointment: params,
        removeCb
    }) => {
        if(removeCb) removeCb(params.day, params.number);
        addCb(day, number, time, id);
        const date = new Date(`${day} ${time}`).getTime();
        dispatch(setAppointmentTime({ appointmentTime: date }));
    };
    const removeAppointmentCallback = ({ day, number }, removeCb) => {
        removeCb(day, number);
    };
    useEffect(()=>{
        const handleResize = () => setWidth(window.innerWidth<768);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    },[])
    useEffect(() => {
        if(clinicId){
            dispatch(getClinicAppointments({ date: initShecheduleDate, clinicId }));
        }
    }, [clinicId, initShecheduleDate, dispatch]);

    return (
                <Col xs={12}>

                    {clinicLocation && !isLoading && (
                        <Card className="mb-3 shadow-sm">
                            <Card.Body className="py-2">
                                <h5 className="mb-0 text-center text-primary">
                                    {clinicLocation}
                                </h5>
                            </Card.Body>
                        </Card>
                    )}

                    <div className="d-flex justify-content-center mt-3">
                        <AppointmentPicker
                            addAppointmentCallback={addAppointmentCallback}
                            removeAppointmentCallback={removeAppointmentCallback}
                            initialDay={new Date(initShecheduleDate)}
                            unitTime={appointmentPeriod * 60 * 1000}
                            days={shecheduleDay.slice(0,widthMatchs?3:shecheduleDay.length)}
                            className="appointment-picker-with-offset"
                            maxReservableAppointments={1}
                            local="en-IN"
                            visible
                            loading={isLoading}
                            continuous
                        />
                    </div>
                </Col>
    );
}

export default AppPicker;