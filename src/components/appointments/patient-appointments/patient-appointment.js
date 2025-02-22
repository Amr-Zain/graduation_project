import { useNavigate } from "react-router-dom";
import { PROFILE } from "../../../constants/routes";
import { RiDeleteBin5Line, RiStethoscopeLine } from "react-icons/ri";
import { BiMoney } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { Card, Col, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { DEFAULT_IMG_URL } from "../../../constants/default";

const Appointment = ({ type, id, img, name, bookingDate, rating, DoctorNurseId, specialization, location, fees, from, to, setOverlay }) => {
const navigate = useNavigate();

const handleDoctorClick = () => {
navigate(`/${PROFILE}/${type}/${id}`);
};

return (
<Col xs={12} sm={6} md={6} lg={4} className="mb-4" style={{maxWidth:'320px'}}>
    <Card  className="h-90 appointment-card align-items-center shadow-sm p-0">
    <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
        <Card.Img
            variant="top"
            src={img || DEFAULT_IMG_URL}
            alt={`${type === 'doctor' ? 'Dr.' : 'Nurse'} ${name}`}
            className="rounded-circle me-3"
            style={{ 
            width: '80px', 
            height: '80px', 
            objectFit: 'cover', 
            cursor: 'pointer' 
            }}
            onClick={handleDoctorClick}
        />
        <div className="flex-grow-1">
            <Card.Title 
            className="mb-0 "/* text-primary */ 
            style={{ cursor: 'pointer', color:'var(--text--primary)' }}
            onClick={handleDoctorClick}
            >
            {`${type === 'doctor' ? 'Dr.' : 'Nurse'} ${name}`}
            </Card.Title>
            <small className="text-muted d-block">
            {new Date(bookingDate).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })}
            </small>
            <div className="d-flex align-items-center mt-1">
            <AiFillStar className="text-warning me-1" />
            <span className="text-muted">{rating}</span>
            </div>
        </div>
        </div>

        <div className="mb-3">
        {type === 'doctor' && (
            <Row className="mb-2">
            <Col xs={12}>
                <div className="d-flex align-items-center text-secondary">
                <RiStethoscopeLine className="me-2" />
                <small>{specialization}</small>
                </div>
            </Col>
            </Row>
        )}
        
        <Row className="g-2">
            <Col xs={12}>
            <div className="d-flex align-items-center text-secondary">
                <MdLocationPin className="me-2 text-danger" />
                <small>{location}</small>
            </div>
            </Col>
            <Col xs={12}>
            <div className="d-flex align-items-center text-secondary">
                <BiMoney className="me-2" style={{color:'#2aac51'}} />
                <small>${fees}</small>
            </div>
            </Col>
        </Row>
        </div>

        <div className="mt-auto d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
            <FiEdit 
            className="text-primary action-icon" 
            onClick={() => setOverlay({ 
                show: true, 
                type: 'update', 
                id, 
                name, 
                DoctorNurseId, 
                appType: type 
            })}
            />
            <RiDeleteBin5Line 
            className="text-danger action-icon"
            onClick={() => setOverlay({
                show: true,
                type: 'delete',
                id,
                name,
                DoctorNurseId,
                appType: type
            })}
            />
        </div>
        {type === 'doctor' && (
            <small className="text-muted">
            {from} - {to}
            </small>
        )}
        </div>
    </Card.Body>
    </Card>
</Col>
);
};

export default Appointment;