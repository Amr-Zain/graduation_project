import { useNavigate } from "react-router-dom";
import { DOCTOR, NURSE, PROFILE } from '../../constants/routes';
import { AiFillStar } from "react-icons/ai";
import { Card, Col } from "react-bootstrap";
import { DEFAULT_IMG_URL } from "../../constants/default";

const DoctorNurseCard = ({ id, imageURL, name, rating, specialization }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        const path = specialization ? 
            `/${PROFILE}/${DOCTOR}/${id}` : 
            `/${PROFILE}/${NURSE}/${id}`;
        navigate(path);
    };

    return (
        <Col  sm={8} md={7} lg={5} xl={4} className="mb-4" style={{maxWidth:'fit-content'}}>
        <Card className="h-100 appointment-card shadow-sm" onClick={handleClick}>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex align-items-start mb-3">
                    <Card.Img
                        variant="top"
                        src={imageURL || DEFAULT_IMG_URL}
                        alt={name}
                        className="rounded-circle me-3"
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}
                    />
                    <div className="flex-grow-1">
                        <Card.Title className="mb-0 "/* text-primary */ style={{ cursor: 'pointer',color:'var(--text--primary)' }}>
                            {name}
                        </Card.Title>
                        <div className="d-flex align-items-center mt-2">
                            <AiFillStar className="text-warning me-1" />
                            <span className="text-muted">{rating}</span>
                        </div>
                        {specialization && (
                    <div className="mt-auto">
                        <p className="text-secondary mb-0">
                            Specialization: {specialization}
                        </p>
                    </div>
                )}
                    </div>
                </div>

                
            </Card.Body>
        </Card>
        </Col>
    );
};

export default DoctorNurseCard;