import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

import { getAppointments } from "../../../features/appointments";
import Appointment from "./patient-appointment";
import { APPOINTMENTS, PATIENT } from "../../../constants/routes";
import "./../../../style/appointment.css";

const Appointments = ({ isAppPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
    const { appointments, isLoading, error } = useSelector((store) => store.appointments);

  
    const handleAppClick = () => {
        navigate(PATIENT + APPOINTMENTS);
    };
    useEffect(() => {
        console.log('apps',appointments)
        dispatch(getAppointments({ date:null}));
    },[]);

  const renderAppointmentsList = () => {
    if (isLoading) {
      return <div>Loading appointments...</div>;
    }
    if(error){
        return (
            <div style={{ marginTop: "7rem", textAlign: "center", color: "red" }}>
            Error: {error}. Please try again later.
            </div>
        );
    }
    if (appointments.length === 0) {
      return isAppPage && <div style={{ marginTop: "7rem", textAlign: "center" }}>There Are No Upcoming Appointments</div>;
    }

    return (
      <Row className={!isAppPage ? "flex-nowrap" : ""}>
        {appointments.map((app) => (
          <Appointment key={app.id} {...app} />
        ))}
      </Row>
    );
  };

  return (
    <div className={isAppPage ? "appoint-page" : "appointmets"}>
      {appointments.length !== 0 && (
        <div className="top-text" onClick={handleAppClick}>
          <Link to={PATIENT + APPOINTMENTS}>Upcoming Appointments</Link>
        </div>
      )}

      <div className="appointmets-container">{renderAppointmentsList()}</div>
    </div>
  );
};

export default Appointments;