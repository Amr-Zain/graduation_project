import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from '../../api/data'
import Select from 'react-select';
import ResultCard from "../patient/search/result-card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../style/appointment.css';
import '../../style/result-card.css';
import AppPicker from "../doctor-schedule/appointment-picker";
function Profile({ isPage }) {
    const { for:userType, id } = useParams();
    const [ userProfile, setUserProfile ] = useState({ id:'', name:'', imageURL:'', specialization:'', fees:'',
        location:'', bloodType:'', rating:'', email:'', phone:'', description:'', appointmentTime:'', clinics:[{id:'',location:''}] });
    const [ pickAppointment, setPickAppointment ] = useState({
        initDate: new Date(new Date().toDateString()),
        choosedDate:'',
        clinicId:'',
        error:''
    })
    const SubmitHandler = async(e)=>{
        e.preventDefault();
        if(!pickAppointment.clinicId ){
            setPickAppointment(prv=>({...prv, error:'Please Choose Clinic'}));
            return;
        }
        if(!pickAppointment.choosedDate ){
            setPickAppointment(prv=>({...prv, error:'Please Choose Date'}));
            return;
        }
        //await bookedAppointments({ id, type: userType, clinicId: pickAppointment.clinicId, date: pickAppointment.choosedDate })
    }
    console.log(pickAppointment)
    useEffect(()=>{
        const getUser = async ()=>{
            const result = await getProfile({ userType, id });
            setUserProfile({...result, clinics:[{id:'fsdkljfkdl', location:'Jahan Street',label:'geh'}, {id:'fsdkljfkdl', location:'Jahan Street', label:'Jahan Street'}]})
        }
        getUser();
    },[ id, userType ])
    return ( <div>
        <ResultCard  isPage type={userType} {...userProfile} />
        <form className="book-appoitment" onSubmit={SubmitHandler}>
            {pickAppointment.error && <div>
                <p>{pickAppointment.error}</p>
            </div>}
            <div> 
                <h3>Book An Appointment</h3>
            </div>
            <div className='clinics'>
                <Select  
                    options= { userProfile.clinics } 
                    placeholder = {'choose clinic'}
                    onChange ={(item)=>setPickAppointment( prv => ({ ...prv, clinicId: item.id, error:''}) )} 
                />
            </div>
            <div className='date'>
                <DatePicker 
                    showIcon
                    selected={pickAppointment.initDate}
                    closeOnScroll={(e) => e.target === document}
                    minDate={new Date()} 
                    onChange={(initDate)=>setPickAppointment( prv => ({ ...prv, initDate, error:''}) )}
                    placeholderText="Date"
                />
            </div>
            {/* { doctorId, initDate, clinicId, appointmentTime } */}
            { 
                userType ==='doctor'&&
                <AppPicker 
                    doctorId={id}
                    {...pickAppointment} 
                    appointmentTime={userProfile.appointmentTime}
                />
            }
            <div className="submit">
                <button>
                    Book
                </button>
            </div>
        </form>
    </div> );
}

export default Profile;