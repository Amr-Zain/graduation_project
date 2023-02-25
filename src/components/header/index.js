
import { PATIENT, DIAGNOSIS, APPOINTMENTS, LOGIN, SEARCH, DOCTOR, NURSE, BLOOD_BANK, DASHBOARD, MEDICAL_HISTORY } from '../../constants/routes';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { removeAuthedUser } from '../../features/authedUser';
import { deleteUserSession } from '../../api/data'
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import '../header/header.css'
// import logo from '../../../public/images/logo-white.png';
import { BsBackspaceReverseFill } from "react-icons/bs";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Header() {
    const { user, token, refreshToken, userType } = useSelector((state)=> state.authedUser);
    const dispatch = useDispatch();
    console.log(userType)
    const handleLogout = async()=>{
        await deleteUserSession({ token, refreshToken});
        dispatch(removeAuthedUser());
    }
    return (
        <div className='background-header'>
            <Navbar className='background-header' expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img src='/images/logo-white.png' width={110} ></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll >
                            <Nav.Link className='link-header' href={'/'+userType + DASHBOARD }>Home</Nav.Link>
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




{/* <Navbar className='header'>
<Container>
    <Navbar.Brand><Link to={ '/'+userType }><img src={'./images/logo.png'} width='50px'/></Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse  id="basic-navbar-nav">
        <Nav className="me-auto" style={{dispay:'flex', justifyContent:'space-between'}}>
            <div >
                <Link to={ PATIENT }>الرائسيه</Link>
                {
                    !user ?
                    <>
                        <Link to={SEARCH + DOCTOR}>الاطباء</Link>
                        <Link to={SEARCH + NURSE}>الممرضين</Link>
                        <Link to={SEARCH + BLOOD_BANK}>التبرع بالدم</Link>
                    </>
                    :
                    <>
                        <Link  to={ PATIENT + DIAGNOSIS }>التاريخ المرضي</Link>
                        <Link to={ PATIENT + APPOINTMENTS }>المواعيد</Link>
                    </>
                }
            </div>
            <div>
                <div>
                    {!user ?
                    <Link to ={ LOGIN }>تسجيل الدخول</Link>
                    :
                    <div style={{width:'2.2rem'}} onClick = {handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </div>
                    }
                </div>
            </div>
        </Nav>
    </Navbar.Collapse>
</Container>
</Navbar> */}