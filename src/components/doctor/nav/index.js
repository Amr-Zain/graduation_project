import { Navigate, NavLink } from "react-router-dom";
import DoctorInfo from "./doctorInfo";
import { APPOINTMENTS, DOCTOR, LOGIN, PROFILE, SETTINGS } from "../../../constants/routes";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserSession } from './../../../api/data';
import { MdSchedule } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { removeAuthedUser } from "../../../features/authedUser";
import { FaUser } from "react-icons/fa";

function Navbar() {
    const dispatch = useDispatch();
    const {userType, id} = useSelector(state=>state.authedUser.user)
    const logoutHandler =  async()=>{
                await deleteUserSession();
                dispatch(removeAuthedUser());
                return <Navigate to={'/'+LOGIN} replace />;
            }
    return ( <aside>
        <DoctorInfo />
        <nav>
            <ul>
                <li>
                    <NavLink to={`/${userType}`}><i><MdSpaceDashboard /></i>Dashboadrd</NavLink>
                </li>
                <li>
                    <NavLink to={`/${userType}/${APPOINTMENTS}`}><i><MdSchedule /></i>Appointments</NavLink>
                </li>
                <li>
                    <NavLink to={`/${PROFILE}/${userType}/${id}`}><i><FaUser /></i>Profile</NavLink>
                </li>
                <li>
                    <NavLink to={`/${userType}/${SETTINGS}`}><i><IoSettings /></i>setting</NavLink>
                </li>
                <li>
                    <button onClick={logoutHandler}><i><MdLogout /></i>Logout</button>
                </li>
            </ul>
        </nav>
    </aside>
);
}

export default Navbar;