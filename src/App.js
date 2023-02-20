import React,{ lazy } from "react";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import { DASHBOARD, PATIENT, DOCTOR, NURSE, RECEPTIONIST, SIGNUP, LOGIN, PROFILE, MEDICAL_HISTORY, DONATOR,
        RESERVATIONS, SEARCH, PATIENTS_SCHEDULE, APPOINTMENTS, BLOOD_REQUEST, BLOOD_BANK, SPECIALIZATION, CITY  } from "./constants/routes";

const SignUp = lazy(() => import('./pages/signup'));
const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not_found'));
const BloodRequest = lazy(() => import('./pages/blood_request'));

const DoctorDashboard = lazy(() => import('./pages/doctor/dashboard'));
const PatientQueue = lazy(() => import('./pages/doctor/patients'));

const PatientDashboard = lazy(() => import('./pages/patient/dashboard'));
const Search = lazy(() => import('./pages/patient/searsh'));
const PatientMedicalHistory = lazy(() => import('./pages/patient/patient-medical-history'));
const Appointments = lazy(() => import('./pages/patient/Appointments'));

const NurseDashboard = lazy(() => import('./pages/nurse/dashboard'));

const ReceptionistDashboard = lazy(()=> import('./pages/receptionist/dashboard'));


function App() {
  return (
      <Router>

        <React.Suspense fallback={<h3>Loading</h3>}>

        <Routes>
          <Route path= {DASHBOARD} element = {<Dashboard/>}></Route>
          <Route path = {SIGNUP} element={ <SignUp /> }/>
          <Route path = {LOGIN} element={ <Login /> }/>
          <Route path = {'/:userType'+PROFILE+'/:id'} element={ <Profile /> }/>

            <Route path = {PATIENT} element = { <PatientDashboard /> }>
              <Route path = {PATIENT+MEDICAL_HISTORY} element = { <PatientMedicalHistory /> }/>
              <Route path = {PATIENT+APPOINTMENTS} element = { <Appointments /> }/>
            </Route>

            <Route path = {DOCTOR}>
              <Route path = {DOCTOR+DASHBOARD} element={ <DoctorDashboard /> }/>
              <Route path = {DOCTOR+PATIENTS_SCHEDULE} element={ <PatientQueue /> }/>{/* list of the patient in a day */}
            </Route>

            <Route path = {NURSE}>
              <Route path = { NURSE+DASHBOARD } element = { <NurseDashboard /> }/> {/* list of reservation of a day */}
            </Route>
            <Route path = {RECEPTIONIST}>
              <Route path = {RECEPTIONIST+DASHBOARD} element = { <ReceptionistDashboard /> }/> {/* list of reservation of a day */}
            </Route>
            {/* <Route path = {BLOOD_BANK} >
              <Route path = {BLOOD_BANK+BLOOD_REQUEST} element={ <BloodRequest /> }/>
            </Route> */}
            
            <Route path = {SEARCH} element = {<Search />} >
              <Route path = {SEARCH + '/:searchFor'}  >
                <Route path = {SEARCH + '/:searchFor' +CITY} element = {<Search />} >
                </Route>
              </Route>
            </Route> 
            <Route path="*" element ={<NotFound/>}/>
          </Routes>
        </React.Suspense>
      </Router>

  );
}

export default App;
