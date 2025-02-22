import { RiDeleteBin5Line } from 'react-icons/ri';
import { deleteFormMedicine, setFormMedicine } from '../../features/medicalHistory';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';

function MedicineInputs({ id, name, dose, duration, description }) {
    const dispatch = useDispatch();
    
    const medicineChange = (e) => {
        dispatch(setFormMedicine({ id, name: e.target.name, value: e.target.value }));
    };

    const handleDeleteMedicine = () => {
        dispatch(deleteFormMedicine({ id }));
    };

    return (
        <Row className="mb-3 g-2 align-items-center">
            <Col md={3}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Medicine Name"
                        onChange={medicineChange}
                    />
                </Form.Group>
            </Col>

            <Col md={2}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="dose"
                        value={dose}
                        placeholder="Dosage per day"
                        onChange={medicineChange}
                    />
                </Form.Group>
            </Col>

            <Col md={2}>
                <Form.Group>
                    <Form.Control
                        type="number"
                        name="duration"
                        value={duration}
                        placeholder="Duration (weeks)"
                        onChange={medicineChange}
                    />
                </Form.Group>
            </Col>

            <Col md={4}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="description"
                        value={description}
                        placeholder="Additional description"
                        onChange={medicineChange}
                    />
                </Form.Group>
            </Col>

            <Col md={1}>
                <Button 
                    variant="outline-danger" 
                    onClick={handleDeleteMedicine}
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: '100%' }}
                >
                    <RiDeleteBin5Line />
                </Button>
            </Col>
        </Row>
    );
}

export default MedicineInputs;