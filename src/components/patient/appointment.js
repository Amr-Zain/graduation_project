import propType from "prop-type";
import { useNavigate } from "react-router-dom";
import { APPOINTMENTS, DOCTOR, PROFILE } from "../../constants/routes";
import { RiStethoscopeLine } from "react-icons/ri";
import { BiMoney } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
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
        <section className="appointment">
                <div className="doctor" >
                    <div className="image-text" >
                    <div className="image" onClick={handleDcotorClick}>
                        <img width={"100px"} src={props.doctorImg} alt={`Appointment with  ${props.doctorName}`}/>
                    </div>
                    <div className="text-name-doctor">
                        <h3 className="text-name-doctor" onClick={handleDcotorClick}>{props.doctorName}</h3>
                        <div>
                        <div className="app_date">
                            {props.bookingDate}
                            <div />
                            <div className="name-rating">
                            <div className="rating" >
                            <AiFillStar className="start"/>
                            <p className="rating_value">{props.docotorRating}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <Container className="collection">
                    <div className="specialization" >
                    <RiStethoscopeLine />
                    <p>{props.doctorSpecialization}</p>
                    </div>
                    <div className="location" >
                    <MdLocationPin className="location-icon" />
                    <p>{props.doctorLocation}</p>
                    </div>
                    <div className="fees" >
                    <BiMoney  className="fees-icon"/>
                    <p>{props.fees}</p>
                    </div>
                    </Container>
                </div>
                <div className="available">
                    <p>
                    {" "}
                    Available From {props.from} To {props.to}
                    </p>
                </div>
        </section>
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
