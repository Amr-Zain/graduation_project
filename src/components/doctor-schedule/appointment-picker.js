import { useEffect } from "react";
import { useState } from "react";
import { AppointmentPicker } from "react-appointment-picker";

function AppPicker({ doctorId, initDate, clinicId, appointmentTime }) {
    const [state, setState ] = useState({ 
        isLoading:false,
        days:[[
            { id: 1, number: 1, isSelected: true/* , periods: 2  */},
            { id: 2, number: 2, peroids:1 },
            { id: 3, number: '3', isReserved: true, peroids:1 },
            { id: 4, number: '4', peroids:1 },
            { id: 5, number: 5, peroids:1 },
            { id: 6, number: 6, peroids:1 },
        ],
        [
            { id: 7, number: 1, isReserved: true, peroids:1 },
            { id: 8, number: 2, isReserved: true, peroids:1 },
            { id: 9, number: '3', isReserved: true, peroids:1 },
            { id: 10, number: '4', peroids:1 },
            { id: 11, number: 5, peroids:1 },
            { id: 12, number: 6, peroids:1 }
        ],
        [
            { id: 13, number: 1, peroids:1 },
            { id: 14, number: 2, peroids:1 },
            { id: 15, number: 3, isReserved: true, peroids:1 },
            { id: 16, number: '4', peroids:1 },
            { id: 17, number: 5, peroids:1 },
            { id: 18, number: 6, peroids:1 }
        ],
        [
            { id: 19, number: 1, peroids:1 },
            { id: 20, number: 2, peroids:1 },
            { id: 21, number: 3, peroids:1 },
            { id: 22, number: '4', peroids:1 },
            null,
            { id: 23, number: 5, peroids:1 },
            { id: 24, number: 6, peroids:1 }
        ],
        [
            { id: 25, number: 1, isReserved: true, peroids:1 },
            { id: 26, number: 2, peroids:1 },
            null,
            { id: 27, number: '3', isReserved: true, peroids:1 },
            { id: 28, number: '4', peroids:1 },
            null,
            { id: 29, number: 5, peroids:1 },
            { id: 30, number: 6, isReserved: true, peroids:1 }
        ]]});
    const addAppointmentCallback =({ addedAppointment: { day, number, time, id }, addCb }) => {
            setState(prv=>({...prv, isLoading: true}));
            addCb(day, number, time, id);
            setState(prv=>({...prv, isLoading: false}));
        };
    
    const removeAppointmentCallback = ({ day ,number, time, id }, removeCb) => {
        setState(prv=>({...prv, isLoading: true}));
        removeCb(day, number);
        setState(prv=>({...prv, isLoading: false}));
    };
    const onAppointmentValueChanged =(date)=>{
        console.log(date)
    }
    useEffect(()=>{
        const getAppointments = async()=>{
            const result = await getAppointments({ initDate, doctorId, clinicId})
        }
    })
    return(<form>
                <div className='app-picker'>
                    <AppointmentPicker
                        addAppointmentCallback={addAppointmentCallback}
                        removeAppointmentCallback={removeAppointmentCallback}
                        initialDay={new Date()}
                        unitTime={ appointmentTime * 60 *1000 }
                        days={state.days}
                        maxReservableAppointments={1}
                        visible
                        loading={state.isLoading}
                        onValueChanged={onAppointmentValueChanged}
                        min={new Date()}
                    />
                </div>
            </form>);
}

export default AppPicker;