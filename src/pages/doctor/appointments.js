import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDate } from "../../features/appointments";
import { useDispatch, useSelector } from "react-redux";
import DoctorAppointments from "../../components/doctor/appointments";

function Appointments() {
    const { appointments, date, isLoading, error } = useSelector((store) => store.appointments);
    const dispatch = useDispatch();
    const handleDateChange = (date) => {
            dispatch(setDate({ date: new Date(date.toDateString()).getTime() }));
        };
    useEffect(()=>{
        document.title = 'Doctor-Appointments'
    },[])
    return ( <main>
            <div className="date">
                <DatePicker
                    showIcon
                    selected={new Date(date)}
                    closeOnScroll={(e) => e.target === document}
                    minDate={new Date()} 
                    onChange={handleDateChange}
                    placeholderText="Date"
                    />
            </div>
            <div>
                <DoctorAppointments date={date} />
            </div>
        </main> );
}

export default Appointments;