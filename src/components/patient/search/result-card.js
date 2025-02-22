import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { RiStethoscopeLine } from 'react-icons/ri';
import { MdLocationPin, MdEmail } from 'react-icons/md';
import { BiMoney } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { Link, useSearchParams } from 'react-router-dom';
import { PROFILE } from '../../../constants/routes';
import { DEFAULT_IMG_URL } from '../../../constants/default';
const ResultCard = ({ isPage, id, name, imageURL, specialization, fees, 
                    location, rating, email, description }) => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get('searchFor');

    return (
        <Col md={12} lg={12} className="mb-2">
            <Card className="h-100 shadow-sm hover-shadow  bg-white">
                <Row className="g-0 h-100">
                    <Col sm={4} className="d-flex align-items-center ">
                        <Card.Img 
                            src={imageURL || DEFAULT_IMG_URL} 
                            alt={name}
                            className="rounded-start object-fit-cover ratio ratio-4x3 doctor-nurse-img"
                        />
                    </Col>
                    <Col sm={8}>
                        <Card.Body className="h-100 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <Card.Title className="mb-0">
                                    <Link to={`/${PROFILE}/${type}/${id}`} className='underline-pointer text-dark'>
                                        {type === 'doctor' && 'Dr. '}
                                        {name}
                                    </Link>
                                </Card.Title>
                                <Badge bg="warning" className="d-flex align-items-center gap-1">
                                    <AiFillStar />
                                    <span>{rating}</span>
                                </Badge>
                            </div>

                            {type === 'doctor' && (
                                <div className="d-flex align-items-center gap-2 mb-2 border-bottom">
                                    <RiStethoscopeLine className="text-primary" />
                                    <Card.Text className="mb-0 fw-bold">{specialization}</Card.Text>
                                </div>
                            )}

                            {description && (
                                <Card.Text className="text-muted mb-3 border-bottom">{description}</Card.Text>
                            )}

                            <Row className=" d-flex flex-column g-2 mb-3 border-bottom">
                                {location && (
                                    <Col xs={12}>
                                        <div className="d-flex align-items-center gap-2 border-bottom">
                                            <MdLocationPin className="text-danger" />
                                            <span>{location}</span>
                                        </div>
                                    </Col>
                                )}
                                
                                <Col xs={12}>
                                    <div className="d-flex align-items-center gap-2 border-bottom">
                                        <BiMoney className="text-success" />
                                        <span>{fees}</span>
                                    </div>
                                </Col>
                                
                                <Col xs={6}>
                                    <div className="d-flex align-items-center gap-2">
                                        <MdEmail className="text-primary" />
                                        <Button 
                                            variant="link" 
                                            className="p-0 text-dark text-decoration-none underline-pointer"
                                            href={`mailto:${email}`}
                                        >
                                            {email}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <div className={`mt-auto d-flex justify-content-${isPage?'end':'between'} align-items-center`}>
                                {!isPage&&<Button 
                                    variant="outline-primary" 
                                    as={Link} 
                                    to={`/${PROFILE}/${type}/${id}`}
                                >
                                    View Profile
                                </Button>}
                                <Button variant="primary" className="d-flex align-items-center gap-2">
                                    <BsFillChatDotsFill />
                                    <span>Chat</span>
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default ResultCard;