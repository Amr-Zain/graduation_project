import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdAdd } from "react-icons/md";
import { Row } from "react-bootstrap";

import { getAppointments, setDate } from "./../../features/appointments";
import DoctorNurseAppointment from "./doctor-nurse-appointment";
import DeletteUpdateOverlay from "./delete-update-overlay";
import { APPOINTMENTS, PATIENT } from "./../../constants/routes";
import "./../../style/appointment.css";

const Appointments = ({ isAppPage }) => {
    const dispatch = useDispatch();

    const { appointments, date, isLoading, error } = useSelector((store) => store.appointments);

    const [overlay, setOverlay] = useState({ show: false, type: "", id: "", name: "" });

    const handleDateChange = (date) => {
        dispatch(setDate({ date: new Date(date.toDateString()).getTime() }));
    };

    useEffect(() => {
        dispatch(getAppointments({ date }));
    }, [date, dispatch]);

    const renderAppointmentsList = () => {
        if (isLoading) {
        return <div style={{ marginTop: "7rem", textAlign: "center" }}>Loading appointments...</div>;
        }

        if (error) {
        return (
            <div style={{ marginTop: "7rem", textAlign: "center", color: "red" }}>
            Error: {error}. Please try again later.
            </div>
        );
        }

        if (appointments.length === 0) {
        return isAppPage && <div style={{ marginTop: "7rem", textAlign: "center" }}>There Are No Appointments</div>;
        }

        return (
        <Row className={!isAppPage ? "flex-nowrap" : ""}>
            {appointments.map((app) => (
            <DoctorNurseAppointment
                key={app.id}
                overlay={overlay}
                setOverlay={setOverlay}
                {...app}
            />
            ))}
        </Row>
        );
    };

    return (
        <div className={isAppPage ? "appoint-page" : "appointmets"}>
        {appointments.length !== 0 && (
            <div className="top-text">
            <Link to={PATIENT + APPOINTMENTS}>Appointments</Link>
            </div>
        )}

        <div className="date">
            <DatePicker
            showIcon
            selected={new Date(date)}
            closeOnScroll={(e) => e.target === document}
            onChange={handleDateChange}
            placeholderText="Date"
            />
        </div>

        <div className="appointmets-container">{renderAppointmentsList()}</div>

        <div
            className="add-appointment"
            onClick={() => setOverlay((prev) => ({ ...prev, show: true, type: "add" }))}
        >
            <MdAdd /> Appointment
        </div>

        {overlay.show && <DeletteUpdateOverlay setOverlay={setOverlay} overlay={overlay} />}
        </div>
    );
};

export default Appointments;