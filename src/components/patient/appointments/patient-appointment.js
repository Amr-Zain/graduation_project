import { useNavigate } from "react-router-dom";
import { /* APPOINTMENTS, */ DOCTOR, PROFILE } from "../../../constants/routes";
import { RiStethoscopeLine } from "react-icons/ri";
import { BiMoney } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { Container } from "react-bootstrap";
const Appointment = ({ type, patientId, id, DoctorNurseId, img, name, 
    bookingDate,rating, specialization , location, fees, from, to  }) => {
  const navigate = useNavigate();

  const handleDcotorClick = () => {
    navigate( PROFILE + DOCTOR + "/" + id);
  };
  /* const handleAppointmentClick = (e) => {
    navigate(DOCTOR + APPOINTMENTS + "/" + props.id);
  }; */
  return (
        <div className="appointment" >
                <div className="doctor" >
                    <div className="image-text" >
                        <div className="image" onClick={handleDcotorClick}>
                            <img width={"100px"} src={img} alt={`${type ==='doctor'?'Dr.':'Nurse'} ${name}`}/>
                        </div>
                        <div className="text-name-doctor">
                            <h3 className="text-name-doctor" onClick={handleDcotorClick}>{`${type ==='doctor'?'Dr.':'Nurse'} ${name}`}</h3>
                            <div >
                                <div className="app_date">
                                    {bookingDate}
                                <div />
                                <div className="name-rating">
                                    <div className="rating" >
                                        <AiFillStar className="start"/>
                                        <p className="rating_value">{rating}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <Container className="collection">
                        {
                            type ==='doctor' &&
                            <div className="specialization" >
                            <RiStethoscopeLine />
                            <p>{specialization}</p>
                            </div>
                        }
                        <div className="location" >
                        <MdLocationPin className="location-icon" />
                        <p>{location}</p>
                        </div>
                        <div className="fees" >
                        <BiMoney  className="fees-icon"/>
                        <p>{fees}</p>
                        </div>
                    </Container>
                </div>
                {type ==='doctor' && <div className="available">
                    <p>Available From {from} To {to}</p>
                </div>}
        </div>
    );
};
export default Appointment;
