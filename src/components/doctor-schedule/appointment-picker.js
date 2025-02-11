import { useEffect } from "react";
import { AppointmentPicker } from "react-appointment-picker";
import { useDispatch, useSelector } from "react-redux";
import { getClinicAppointments, setAppointmentTime } from "../../features/profile";

function AppPicker() {
   
    const { shecheduleDay, clinicLocation, initShecheduleDate, clinicId, appointmentPeriod, isLoading, error } = useSelector(state=>state.profile.clinic)
    const dispatch = useDispatch();

    const addAppointmentCallback =({
        addedAppointment: { day, number, time, id },
        addCb,
        removedAppointment: params,
        removeCb
        }) => {
            
            if(removeCb) removeCb(params.day,params.number);

            addCb(day, number, time, id);
            const date = new Date(`${day} ${time}`).getTime();
            dispatch(setAppointmentTime({ appointmentTime:date }));
        };
    
    const removeAppointmentCallback = (
        { day, number },
        removeCb) => {
        removeCb(day, number);
    };
    useEffect(()=>{
        if(clinicId){
            dispatch(getClinicAppointments( { date: initShecheduleDate, clinicId }));
        }
        
    },[ clinicId, initShecheduleDate ])
    return(<div>
                {isLoading&& <div>Loading...</div>}
                {error&& <div>Error:{error}</div>}
                {(clinicLocation && !isLoading)&& <div>{clinicLocation}</div>}
                <div className='app-picker'>
                    <AppointmentPicker
                        addAppointmentCallback={addAppointmentCallback}
                        removeAppointmentCallback={removeAppointmentCallback}
                        initialDay={new Date(initShecheduleDate)}
                        unitTime={ appointmentPeriod * 60 *1000 }
                        days={shecheduleDay}
                        maxReservableAppointments={1}
                        visible
                        loading={isLoading}
                        min={new Date()}
                        continuous
                        />
                </div>
            </div>);
}

export default AppPicker;