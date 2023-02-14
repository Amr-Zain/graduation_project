
import { PATIENT, DIAGNOSIS, APPOINTMENTS, LOGIN, SEARCH, DOCTOR, NURSE, BLOOD_BANK } from '../../constants/routes';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { removeAuthedUser } from '../../features/authedUser';
import { deleteUserSession } from '../../api/data'
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import '../../style/header.css'
function Header() {
    const { user, token, refreshToken, userType } = useSelector((state)=> state.authedUser);
    const dispatch = useDispatch();
    console.log(userType)
    const handleLogout = async()=>{
        await deleteUserSession({ token, refreshToken});
        dispatch(removeAuthedUser());
    }
    return (
            <Navbar className='header'>
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
            </Navbar>
        );}

export default Header;