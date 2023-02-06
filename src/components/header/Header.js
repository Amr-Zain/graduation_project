import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Nav from 'react-bootstrap/Nav';
import { PATIENT, DIAGNOSIS, APPOINTMENTS, LOGIN, SEARCH, DOCTOR, NURSE, BLOOD_BANK } from '../../constants/routes';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { removeAuthedUser } from '../../features/authedUser';
import { deleteUserSession } from '../../api/data'
function Header() {
    const { user, token, refreshToken } = useSelector((state)=> state.authedUser);
    const dispatch = useDispatch();
    console.log(user)
    const handleLogout = async()=>{
        await deleteUserSession({ token, refreshToken});
        dispatch(removeAuthedUser());
    }
    return (
        <container>
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
                <div>
                        {
                            !user ?
                                <>
                                    <Link to={SEARCH + DOCTOR}>الاطباء</Link>
                                    <Link to={SEARCH + NURSE}>الممرضين</Link>
                                    <Link to={SEARCH + BLOOD_BANK}>التبرع بالدم</Link>
                                </>
                            :
                                <>
                                    <Link to={ PATIENT + DIAGNOSIS }>التاريخ المرضي</Link>
                                    <Link to={ PATIENT + APPOINTMENTS }>المواعيد</Link>
                                </>
                        }

                        <Link href={ PATIENT }>الرائسيه</Link>
                        <Link href={ PATIENT }><img src={'./images/logo.png'} width='50px'/></Link>
                </div>
        </container>);}

export default Header;