import { createBrowserRouter, Outlet } from "react-router-dom";
import { APPOINTMENTS, BLOOD_BANK, BLOOD_DONATION, BLOOD_REQUEST, DOCTOR, LOGIN, MEDICAL_HISTORY, NURSE, PATIENT, PROFILE, RECEPTIONIST, SEARCH, SIGNUP, UNAUTHORIZED, SETTINGS, DETAILED_DIAGNOSIS } from "./constants/routes";
import { lazy } from "react";


import PatientSharedLayout from "./pages/patient/shared-layout";
import DoctorSharedLayout from "./pages/doctor/shared";


import ProtectedRoute from "./routes-components/protected-route";
import NotFoundOrUnauthorized from "./routes-components/not-found-unauthed";
import AuthRoute from "./routes-components/authed-routes";
import { useSelector } from "react-redux";

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

const Dashboard = lazy(() => import('./pages/dashboard'));

const DoctorDashboard = lazy(() => import('./pages/doctor/dashboard'));
const DoctorAppointments =lazy(()=> import("./pages/doctor/appointments"));
const Settings = lazy(()=>import("./pages/doctor/settings"));

const NurseDashboard = lazy(() => import('./pages/nurse/dashboard'));

const ReceptionistDashboard = lazy(() => import('./pages/receptionist/dashboard'));

const Profile = lazy(()=>import("./pages/profile"));



const SharedLayoutForRoles = ()=>{
    const {userType} = useSelector(state=>state.authedUser.user);
    if(userType === PATIENT ) return <PatientSharedLayout />
    //we will see the other roles later this will be used for profile only 
    return ;    
}
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
        element: <ProtectedRoute allowedRoles={[PATIENT]}><PatientSharedLayout /></ProtectedRoute>,
        children: [
            { index: true, element: <PatientDashboard /> },
            { path: APPOINTMENTS, element: <PatientAppointments /> },
            { path: SEARCH, element: <Search /> },
            {
                path: BLOOD_BANK,
                children: [
                    {index:true, element: <BloodBank />},
                    { path: BLOOD_REQUEST, element: <BloodRequest /> },
                    { path: BLOOD_DONATION, element: <BloodDonation /> },
                ]
            },
            {
                path: MEDICAL_HISTORY,
                children: [
                    { index:true, element: <MedicalHistory /> },
                    { path: DETAILED_DIAGNOSIS + '/:diagnosisId', element: <DetailedDiagnosis /> },
                ]
            },
        ]
    },
    {
        path:`/${MEDICAL_HISTORY}`,
        element: <ProtectedRoute allowedRoles={[DOCTOR]} />,
        children: [
            {
                path: `:patientId`,
                children:[
                    {
                        index:true,
                        element: <MedicalHistory />,
                    },
                    {
                        path:`${DETAILED_DIAGNOSIS}/:diagnosisId`,
                        element: <DetailedDiagnosis />
                    },
                ]
            },
            ]
    },
    {
        path: '/'+PROFILE + '/:userType/:id',
        element: <ProtectedRoute allowedRoles={[PATIENT, DOCTOR, NURSE, RECEPTIONIST]}>
                        <SharedLayoutForRoles />
                </ProtectedRoute>,
        children:[{ index:true,element: <Profile />}]
    },
    {
        path: '/'+DOCTOR,
        element: <ProtectedRoute allowedRoles={[DOCTOR]}><DoctorSharedLayout /></ProtectedRoute>,
        children: [
            { 
                index: true,
                element: <DoctorDashboard /> 
            },
            {
                path: APPOINTMENTS,
                element:<DoctorAppointments />
            },
            {
                path: SETTINGS,
                element:<Settings />
            },
        ]
    },
    {
        path: '/'+NURSE,
        element: <ProtectedRoute allowedRoles={[NURSE]} />,
        children: [{ index: true, element: <NurseDashboard /> }]
    },
    {
        path: '/'+RECEPTIONIST,
        element: <ProtectedRoute allowedRoles={[RECEPTIONIST,DOCTOR]} />,
        children: [{ index: true, element: <ReceptionistDashboard /> }]
    },
    {
        path: '*',
        element: <NotFoundOrUnauthorized />
    } 
]);

export default router;