import { useEffect, useState } from "react";
import 'react-datalist-input/dist/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { bloodType } from '../../constants/utilites'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCitiesAndSpecializations } from "../../features/cities-specializations";
import '../../style/blood-bank.css'
import { PostDonation } from "../../api/data";

function BloodDonation() {
    const { cities } = useSelector(store=>store.citiesAndSpecializations);
    const dispatch = useDispatch();
    const { city } = useSelector(store=>store.authedUser.user);
    const [ formState, setFormState ] = useState({ bloodType: '', city:'', date:''});
    const [ { isLoading, error, successed }, setStatus ] = useState({ isLoading:false, error:'', successed:''});

    const submit = async(e)=>{
        e.preventDefault();
        //await donate( data );
        try{
            setStatus(prv=>({...prv, isLoading:true}));
            await PostDonation({ ...formState });
        }catch(error){
            setStatus(prv=>({ isLoading: false, successed:'', error: 'Some Wrong Happend, Please Try Again' }))
        }finally {
            setStatus(prv=>({ isLoading: false, successed: 'Donation Request Created successfully', error: '' }))
        }
    }
    useEffect(()=>{
        document.title = 'Blood Donation';
        if(cities.length === 0)dispatch(getCitiesAndSpecializations('cities'))
    });
    return (<main className="blood-donation">
                <form >
                { error && <div style={{textAlign:'center',color:'red'}} className="error">{error}</div>}
                { isLoading && <div style={{textAlign:'center'}} className="error">Loading...</div>}
                { successed && <div style={{textAlign:'center'}} className="error">{successed}</div>}
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