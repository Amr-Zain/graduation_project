import propType from "prop-type";
import { useNavigate } from "react-router-dom";
import { APPOINTMENTS, DOCTOR, PROFILE } from "../../constants/routes";
import { RiStethoscopeLine } from "react-icons/ri";
import { BiMoney } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import "../../style/appointment.css";
import { Container, Row } from "react-bootstrap";
const Appointment = (props) => {
  const navigate = useNavigate();

  const handleDcotorClick = (e) => {
    navigate(DOCTOR + PROFILE + "/" + props.doctorId);
  };
  const handleAppointmentClick = (e) => {
    navigate(DOCTOR + APPOINTMENTS + "/" + props.id);
  };
  return (
    <div className="appointment">
      <div className="doctor" style={{ dispay: "flex", flexDirection: "column" }}>
        <div className="image-text" style={{ dispay: "flex" }}>
          <div className="image" onClick={handleDcotorClick}>
            <img width={"100px"} src={props.doctorImg} alt={`الدكتور ${props.doctorName}`}/>
          </div>
          <div className="text-name-doctor">
            <h3 className="text-name-doctor" onClick={handleDcotorClick}>{props.doctorName}</h3>
            <div>
              <div className="app_date">
                {props.bookingDate}
                <div />
                <div className="name-rating">
                <div className="rating" style={{ display: "flex" }}>
                  <AiFillStar className="start"/>
                  <p className="rating_value">{props.docotorRating}</p>
                 <p className="rating-exerient"> 3er</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container className="collection">
        <div className="specialization" style={{ display: "flex" }}>
          <RiStethoscopeLine />
          <p>{props.doctorSpecialization}</p>
        </div>
        <div className="location" style={{ display: "flex" }}>
          <MdLocationPin />
          <p>{props.doctorLocation}</p>
        </div>
        <div className="fees" style={{ display: "flex" }}>
          <BiMoney />
          <p>{props.fees}</p>
        </div>
        </Container>
      </div>
      <div className="available">
        <p>
          {" "}
          متاح من {props.from} الي {props.to}
        </p>
      </div>
    </div>
  );
};
export default Appointment;

/* bookedAte,
bookingDate,
doctorId,
doctorImg,
doctorName,
location,
patientId,
specialization
: 
3 */
