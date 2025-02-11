
import { PATIENT, APPOINTMENTS,BLOOD_BANK, MEDICAL_HISTORY, LOGIN } from '../../constants/routes';
import { Link, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { removeAuthedUser } from '../../features/authedUser';
import { deleteUserSession } from '../../api/data'
import { Container, Navbar } from 'react-bootstrap';
import '../header/header.css'

import { BsBackspaceReverseFill } from "react-icons/bs";

import Button from 'react-bootstrap/Button';


function Header() {
    const { user } = useSelector((state)=> state.authedUser);
    const dispatch = useDispatch();
    const LogOutHandler = async()=>{
        await deleteUserSession();
        dispatch(removeAuthedUser());
        return <Navigate to={'/'+LOGIN} replace />;
    }
    return (
        <div className='background-header'>
            <Navbar className='background-header' expand="lg">
                <Container >
                    <Link to={'/'+user.userType  }>
                        <img src='/images/logo-white.png' width={64} alt={'logo'} ></img>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <div className=" nav me-auto my-2 my-lg-0" navbarScroll >
                            <Link className='link-header' to={'/'+user.userType  }>Home</Link>
                            <Link className='link-header' to={'/'+PATIENT+'/'+BLOOD_BANK}>Blood Bank</Link>
                            <Link className='link-header' to={'/'+PATIENT+'/'+ MEDICAL_HISTORY }>Medical History</Link>
                            <Link className='link-header' to={'/'+PATIENT + '/'+APPOINTMENTS }>Appointments</Link>
                        </div>
                
                        <Button variant="outline-blue  " className='exit-button' onClick={LogOutHandler}>
                        Logout
                        <BsBackspaceReverseFill className='mx-1 hover-none' />
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        );}

export default Header;

