import { useEffect, useState } from "react";
import 'react-datalist-input/dist/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { bloodType } from '../../constants/utilites'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCitiesAndSpecializations } from "../../features/cities-specializations";
import '../../style/blood-bank.css'

function BloodDonation() {
    const { cities } = useSelector(store=>store.citiesAndSpecializations);
    const dispatch = useDispatch();
    const { city } = useSelector(store=>store.authedUser.user);
    const [ formState, setFormState ] = useState({ bloodType: '', city:'', date:''});
    const submit = async(e)=>{
        e.preventDefault();
        //await donate( data );
    }
    useEffect(()=>{
        document.title = 'Blood Donation';
        if(cities.length === 0)dispatch(getCitiesAndSpecializations('cities'))
    });
    return (<main className="blood-donation">
                <form >
                    <div className='date'>
                        <DatePicker 
                            showIcon
                            selected={formState.date}
                            closeOnScroll={(e) => e.target === document}
                            minDate={new Date()} 
                            onChange={(date)=>setFormState( prv => ({ ...prv, date}) )}
                            placeholderText="Date"
                        />
                    </div>
                    <div className='blood-type'>
                        <Select  
                            options= { bloodType } 
                            placeholder = {'Blood Type'}
                            onChange ={(item)=>setFormState( prv => ({ ...prv, bloodType:item}) )} 
                        />
                    </div>
                    <div className='city'>
                        <Select  
                            options= { cities } 
                            placeholder = {'City'}
                            onChange ={(item)=>setFormState( prv => ({ ...prv, city:item}) )} 
                            defaultInputValue = {city}
                        />
                    </div>
                    <div className="button">
                        <button onClick={submit}>Submit Donation</button>
                    </div>
                </form>
            </main>);
}

export default BloodDonation;