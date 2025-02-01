import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

import { getAppointments } from "../../../features/appointments";
import Appointment from "./patient-appointment";
import { APPOINTMENTS, PATIENT } from "../../../constants/routes";
import "./../../../style/appointment.css";
import DeleteUpdateOverlay from "./delete-update-overlay";

const Appointments = ({ isAppPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const { appointments, isLoading, error } = useSelector((store) => store.appointments);
  const [overlay, setOverlay] = useState({ show: false, type: "", id: "", name: "" });
    const updateOverlay = useCallback((updates)=>{
      setOverlay((state=>{
        return{...state,...updates}
      }))
    },[])
    const handleAppClick = () => {
        navigate(PATIENT + APPOINTMENTS);
    };
    useEffect(() => {
        if(appointments.length ===0)dispatch(getAppointments({ date:null}));
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
          <Appointment key={app.id} {...app} setOverlay={updateOverlay} />
        ))}
      </Row>
    );
  };

  return (
    <div className={isAppPage ? "appoint-page" : "appointmets"}>
      {(appointments.length !== 0 || isLoading ) && (
        <div className="top-text" onClick={handleAppClick}>
          <Link to={PATIENT + APPOINTMENTS}>Upcoming Appointments</Link>
        </div>
      )}

      <div className="appointmets-container">{renderAppointmentsList()}</div>
      {overlay.show && <DeleteUpdateOverlay setOverlay={updateOverlay} overlay={overlay} />}
    </div>

  );
};

export default Appointments;