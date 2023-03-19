
import { PATIENT, DIAGNOSIS, APPOINTMENTS, LOGIN, SEARCH, DOCTOR, NURSE, BLOOD_BANK, DASHBOARD, MEDICAL_HISTORY } from '../../constants/routes';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { removeAuthedUser } from '../../features/authedUser';
import { deleteUserSession } from '../../api/data'
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import '../header/header.css'

import { BsBackspaceReverseFill } from "react-icons/bs";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Header() {
    const { user, token, refreshToken } = useSelector((state)=> state.authedUser);
    const dispatch = useDispatch();
    const handleLogout = async()=>{
        await deleteUserSession({ token, refreshToken});
        dispatch(removeAuthedUser());
    }
    return (
        <div className='background-header'>
            <Navbar className='background-header' expand="lg">
                <Container fluid>
                    <a href="#">
                        <img src='/images/logo-white.png' width={64} alt={'logo'} ></img>
                    </a>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll >
                            <Nav.Link className='link-header' href={'/'+user.userType + DASHBOARD }>Home</Nav.Link>
                            {/* <Nav.Link className='link-header' href={'/donate' }>Donate Blood</Nav.Link>
                            <Nav.Link className='link-header' href={'/blood_request' }>Blood Request</Nav.Link> */} 
                            <Nav.Link className='link-header' href={BLOOD_BANK}>Blood Bank</Nav.Link>
                            <Nav.Link className='link-header' href={MEDICAL_HISTORY+PATIENT +`/${user.id}` }>Medical History</Nav.Link>
                            <Nav.Link className='link-header' href={PATIENT + APPOINTMENTS }>Appointments</Nav.Link>
                        </Nav>
                
                        <Button variant="outline-blue  " className='exit-button'>
                        Logout
                        <BsBackspaceReverseFill className='mx-1 hover-none' />
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        );}

export default Header;

