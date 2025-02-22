import { Link, useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { DOCTOR, MEDICAL_HISTORY, PATIENT, PROFILE, DETAILED_DIAGNOSIS } from "../../constants/routes";
import { useSelector } from "react-redux";
import { DEFAULT_IMG_URL } from "../../constants/default";
import '../../style/medical-history.css'
export default function Diagnosis({ children, id, doctorId, doctorImageURL, patientId, doctorName, specializations, date, description, isPage }) {
    const { userType } = useSelector(state => state.authedUser.user);
    const navigate = useNavigate();

    const handleDiagnosisClick = (e) => {
        if (!isPage && userType === PATIENT) {
            navigate(`/${PATIENT}/${MEDICAL_HISTORY}/${DETAILED_DIAGNOSIS}/${id}`);
            return;
        }
        if (!isPage) navigate(`/${MEDICAL_HISTORY}/${patientId}/${DETAILED_DIAGNOSIS}/${id}`);
    };

    return (
        <Card className={`mb-1 shadow-sm card-hover-effect ${isPage?'mt-5':''}`} onClick={handleDiagnosisClick} style={{ cursor: 'pointer' }}>
            <Card.Body>
                <Row className="g-3 align-items-center">
                    <Col xs="auto">
                        <Link 
                            to={`/${PROFILE}/${DOCTOR}/${doctorId}`} 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Card.Img 
                                src={doctorImageURL || DEFAULT_IMG_URL} 
                                alt={`Dr. ${doctorName}`} 
                                className="rounded-circle"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                        </Link>
                    </Col>
                    
                    <Col>
                        <div className="d-flex flex-column ">
                            <Link 
                                to={`/${PROFILE}/${DOCTOR}/${doctorId}`} 
                                className="text-decoration-none h5 mb-1 fs-4 "
                                onClick={(e) => e.stopPropagation()}
                            >
                                Dr. {doctorName}
                            </Link>
                            <small className="text-muted">{specializations}</small>
                        </div>
                    </Col>
                </Row>

                {/* Diagnosis Content */}
                <div className="mt-3">
                    <Card.Text className="mb-2">
                        <strong>Description:</strong> {description}
                    </Card.Text>
                    {children}
                    <small className="text-muted d-block mt-2">
                        {new Date(date).toDateString()}
                    </small>
                </div>
            </Card.Body>
        </Card>
    );
}