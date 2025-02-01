import { useNavigate } from "react-router-dom";
import { /* APPOINTMENTS, */ DOCTOR, PROFILE } from "./../../../constants/routes";
import { RiDeleteBin5Line, RiStethoscopeLine } from "react-icons/ri";
import { BiMoney } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { Col, Container } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
const Appointment = ({ type, id,  img, name, bookingDate,rating, DoctorNurseId, specialization , location, fees, from, to, setOverlay  }) => {
  const navigate = useNavigate();
  const handleDcotorClick = () => {
    navigate( PROFILE + DOCTOR + "/" + id);
  };
  /* const handleAppointmentClick = (e) => {
    navigate(DOCTOR + APPOINTMENTS + "/" + props.id);
  }; */
  return (
        <Col sm={12} md={6} lg={4} xxl={3}>
        <div className="appointment" >
                <div className="doctor" >
                    <div className="image-text" >
                        <div className="image" onClick={handleDcotorClick}>
                            <img width={"90px"} height={'90px'} src={ img || './images/avatars/default.png' } alt={`${type ==='doctor'?'Dr.':'Nurse'} ${name}`}/>
                        </div>
                        <div className="text-name-doctor">
                            <h3 className="text-name-doctor" onClick={handleDcotorClick}>{`${type ==='doctor'?'Dr.':'Nurse'} ${name}`}</h3>
                            <div >
                                <div className="app_date">
                                    {new Date(bookingDate).toDateString()}
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
                <div className="delete-update-patient">
                    <div className="delete" onClick={()=>setOverlay({show:true, type:'delete', id, name, DoctorNurseId, appType:type})}>
                        <RiDeleteBin5Line  />
                    </div>
                    <div className="update">
                        <FiEdit onClick={()=>setOverlay({show:true, type:'update', id, name, DoctorNurseId, appType:type})} />
                    </div>
                </div>
                {type ==='doctor' && <div className="available">
                    <p>Available From {from} To {to}</p>
                </div>}
        </div>
        </Col>
    );
};
export default Appointment;
