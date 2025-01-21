import React,{ lazy } from "react";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import { DASHBOARD, PATIENT, DOCTOR, NURSE, RECEPTIONIST, SIGNUP, LOGIN, PROFILE, MEDICAL_HISTORY, DONATOR,DIAGNOSIS,
        RESERVATIONS, SEARCH, PATIENTS_SCHEDULE, APPOINTMENTS, BLOOD_REQUEST, BLOOD_BANK, BLOOD_DONATION, SPECIALIZATION, CITY  } from "./constants/routes";

import SharedLayout from'./pages/shared-layout';        
const SignUp = lazy(() => import('./pages/signup'));
const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not_found'));

const BloodBank = lazy(() => import('./pages/blood-bank/blood-bank'));
const BloodRequest = lazy(() => import('./pages/blood-bank/blood-request'));
const BloodDonation = lazy(() => import('./pages/blood-bank/blood-donation'));

const DoctorDashboard = lazy(() => import('./pages/doctor/dashboard'));
const PatientQueue = lazy(() => import('./pages/doctor/patients'));

const PatientDashboard = lazy(() => import('./pages/patient/dashboard'));
const Search = lazy(() => import('./pages/patient/searsh'));
const MedicalHistory = lazy(() => import('./pages/patient/medical-history'));
const DetailedDiagnosis = lazy(() => import('./pages/patient/detailed-diagnosis'));
const PatientAppointments = lazy(() => import('./pages/patient/Appointments'));

const NurseDashboard = lazy(() => import('./pages/nurse/dashboard'));

const ReceptionistDashboard = lazy(()=> import('./pages/receptionist/dashboard'));


function App() {
  return (
      <Router>

        <React.Suspense fallback={<h3>Loading</h3>}>

        <Routes>
          <Route path = {SIGNUP} element={ <SignUp /> }/>
          <Route path = {LOGIN} element={ <Login /> }/>
          <Route path= {DASHBOARD} element = {<SharedLayout/>}>

            <Route index path="/" element={<Dashboard />}/>
            
            <Route path = {PROFILE +'/:for/:id'} element={ <Profile /> }/>

            <Route path={MEDICAL_HISTORY}>
              <Route path = {MEDICAL_HISTORY+PATIENT+'/:id'} element = { <MedicalHistory /> }/>
              <Route path = {MEDICAL_HISTORY+PATIENT+DIAGNOSIS+'/:id'} element = { <DetailedDiagnosis/> }/>
            </Route>

            <Route path = {PATIENT} >
              <Route path= {PATIENT+DASHBOARD} element={<PatientDashboard />} />
              <Route path = {PATIENT+APPOINTMENTS} element = { <PatientAppointments /> }/>
            </Route>

            <Route path = {DOCTOR}>
              <Route path = {DOCTOR+DASHBOARD} element={ <DoctorDashboard /> }/>
              <Route path = {DOCTOR+PATIENTS_SCHEDULE} element={ <PatientQueue /> }/>
            </Route>

            <Route path = {NURSE}>
              <Route path = { NURSE+DASHBOARD } element = { <NurseDashboard /> }/> 
            </Route>
            <Route path = {RECEPTIONIST}>
              <Route path = {RECEPTIONIST+DASHBOARD} element = { <ReceptionistDashboard /> }/>
            </Route>
            <Route path = {SEARCH} element = {<Search />} >
              <Route path = {SEARCH + '/:for'}  >
                <Route path = {SEARCH + '/:for' +CITY} element = {<Search />} >
                </Route>
              </Route>
            </Route> 
            <Route path = {BLOOD_BANK} >
              <Route path = {BLOOD_BANK + DASHBOARD} element = {<BloodBank />} />
              <Route path = {BLOOD_BANK + BLOOD_REQUEST} element = {<BloodRequest />} />
              <Route path = {BLOOD_BANK + BLOOD_DONATION} element = {<BloodDonation />}  />
            </Route> 

            <Route path="*" element ={<NotFound/>}/>
          </Route>
        </Routes>
      </React.Suspense>
      </Router>

  );
}

export default App;
