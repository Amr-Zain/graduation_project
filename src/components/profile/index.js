import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from 'react-select';
import ResultCard from "../patient/search/result-card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../style/appointment.css'; 
//import '../../style/result-card.css';// I should add this style but it overrite the popular in the dashboard
import AppPicker from "../doctor-schedule/appointment-picker";
import { useDispatch, useSelector } from "react-redux";
import {  bookAppointment, getProfile, setAppointmentTime, setClinicId, setInitShecheduleDate } from "../../features/profile";
function Profile() {
    const dispatch = useDispatch();
    const { profileData, clinic:{clinicId, initShecheduleDate,appointmentTime },isLoading, error } = useSelector(state=>state.profile);
    const { userType, id } = useParams();
    
    const changeClinicHandler = (item) => {
        if(clinicId !== item.id)
            dispatch(setClinicId({ clinicId: item.id}))
    }
    const dateChangeHandler = (initDate)=>{
        if (userType === 'nurse') dispatch(setAppointmentTime({ appointmentTime: initDate}))
        dispatch(setInitShecheduleDate({ initDate}))
    }
    const SubmitHandler = async(e)=>{
        e.preventDefault();
        dispatch(bookAppointment({ date: appointmentTime, type:userType, doctorId:id, nurseId: id} ))
    }
    useEffect(()=>{
        dispatch(getProfile({ id, userType }));
    },[ id, userType ]);

    if(profileData.isLoading) return 'Loading...';
    if(profileData.error) return 'Error:' + profileData.error;
    return ( <div>
        <ResultCard  isPage type={userType} {...profileData} />
        <form className="book-appoitment" onSubmit={SubmitHandler}>
            <div> 
                <h3>Book An Appointment</h3>
            </div>
            {error&&<p>{error}</p>}
            {userType ==='doctor'&&<div className='clinics'>
                <Select  
                    options= { profileData.clinics } 
                    placeholder = {'choose clinic'}
                    onChange ={changeClinicHandler} 
                />
            </div>}
            {
                (clinicId || userType === 'nurse') 
                    &&<div className='date'>
                        <DatePicker 
                            showIcon
                            selected={initShecheduleDate}
                            closeOnScroll={(e) => e.target === document}
                            minDate={new Date()} 
                            onChange={dateChangeHandler}
                            placeholderText="Date"
                        />
                    </div>
            }
            { 
                userType ==='doctor' && <AppPicker doctorId={id} />
            }
            <div className="submit">
                <button>
                    {isLoading?"submmitng":"Book"}
                </button>
            </div>
        </form>
    </div> );
}

export default Profile;