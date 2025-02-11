import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { APPOINTMENTS, BLOOD_BANK, BLOOD_DONATION, BLOOD_REQUEST, DIAGNOSIS, DOCTOR, LOGIN, MEDICAL_HISTORY, NURSE, PATIENT, PROFILE, RECEPTIONIST, SEARCH, SIGNUP, UNAUTHORIZED } from "./constants/routes";
import SharedLayout from "./pages/shared-layout";
import { lazy } from "react";
import { useSelector } from 'react-redux';

const SignUp = lazy(() => import('./pages/signup'));
const Login = lazy(() => import('./pages/login'));

const PatientDashboard = lazy(() => import('./pages/patient/dashboard'));
const Search = lazy(() => import('./pages/patient/searsh'));
const PatientAppointments = lazy(() => import('./pages/patient/Appointments'));

const BloodBank = lazy(() => import('./pages/blood-bank/blood-bank'));
const BloodRequest = lazy(() => import('./pages/blood-bank/blood-request'));
const BloodDonation = lazy(() => import('./pages/blood-bank/blood-donation'));

const MedicalHistory = lazy(() => import('./pages/patient/medical-history'));
const DetailedDiagnosis = lazy(() => import('./pages/patient/detailed-diagnosis'));

const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not_found'));
const Dashboard = lazy(() => import('./pages/dashboard'));

const DoctorDashboard = lazy(() => import('./pages/doctor/dashboard'));
const PatientQueue = lazy(() => import('./pages/doctor/patients'));

const NurseDashboard = lazy(() => import('./pages/nurse/dashboard'));

const ReceptionistDashboard = lazy(() => import('./pages/receptionist/dashboard'));


const ProtectedRoute = ({ allowedRoles, children }) => {
    const {user} = useSelector(state => state.authedUser);
    const location = useLocation();
    console.log(location.pathname)
    if (Object.keys(user).length === 0) {
        return <Navigate to={'/'+LOGIN} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.userType)) {
        return <Navigate to={'/'+UNAUTHORIZED} replace />;
    }

    return children || <Outlet />;
};

const AuthRoute = ({ children }) => {
    const { user } = useSelector(state => state.authedUser);

    if (Object.keys(user).length !==0) {
        return <Navigate to={`/${user.userType}`} replace />;
    }

    return <Outlet />;
};

const Unauthorized = () => (
    <div>
        <h1>Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
    </div>
);


const NotFoundOrUnauthorized = () => {
    const {user} = useSelector(state => state.authedUser);
    const location = useLocation();

    if (location.pathname === '/'+UNAUTHORIZED && Object.keys(user).length === 0) {
        return <Navigate to={'/'+LOGIN} replace />;
    }

    if (location.pathname === '/'+UNAUTHORIZED) {
        return <Unauthorized />;
    } else {
        return <NotFound />;
    }
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: LOGIN, element:<Login /> },
            { path: SIGNUP, element: <SignUp /> },
        ]
    },
     {
        path: '/'+PATIENT,
        element: <ProtectedRoute allowedRoles={['patient']}><SharedLayout /></ProtectedRoute>,
        children: [
            { index: true, element: <PatientDashboard /> },
            { path: APPOINTMENTS, element: <PatientAppointments /> },
            { path: SEARCH, element: <Search /> },
            {
                path: BLOOD_BANK,
                element: <BloodBank />,
                children: [
                    { path: BLOOD_REQUEST, element: <BloodRequest /> },
                    { path: BLOOD_DONATION, element: <BloodDonation /> },
                ]
            },
            {
                path: MEDICAL_HISTORY,
                children: [
                    { index: true, element: <MedicalHistory /> },
                    { path: DIAGNOSIS + '/:diagnosisId', element: <DetailedDiagnosis /> },
                ]
            },
        ]
    },
    {
        path:'/'+ MEDICAL_HISTORY,
        children: [
            {
                path: PATIENT + '/:patientId',
                element: <MedicalHistory />
            },
            {
                path: PATIENT + DIAGNOSIS + '/:diagnosisId',
                element: <DetailedDiagnosis />
            }]
    },
    {
        path: '/'+PROFILE + '/:userType/:id',
        element: <Profile />
    },
    {
        path: '/'+DOCTOR,
        element: <ProtectedRoute allowedRoles={['doctor']} />,
        children: [{ index: true, element: <DoctorDashboard /> }]
    },
    {
        path: '/'+NURSE,
        element: <ProtectedRoute allowedRoles={['nurse']} />,
        children: [{ index: true, element: <NurseDashboard /> }]
    },
    {
        path: '/'+RECEPTIONIST,
        element: <ProtectedRoute allowedRoles={['receptionist']} />,
        children: [{ index: true, element: <ReceptionistDashboard /> }]
    },
    {
        path: '*',
        element: <NotFoundOrUnauthorized />
    } 
]);

export default router;