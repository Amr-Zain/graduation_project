import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { useSelector } from "react-redux";
function BloodDonation() {
    const { register, handleSubmit } = useForm();
    const { cities } = useSelector(store=>store.citiesAndSpecializations)
    const { city } = useSelector(store=>store.authedUser.user)
    const submit = async(data)=>{
        //await donateRequest( data );
    }
    useEffect(()=>{
        document.title = 'Blood Donation';
    });
    return (<main className="blood-donation">
                <form onSubmit={handleSubmit(submit)}>
                    <input 
                    { ...register('date', { required: true })}
                    type={'date'}
                    placeholder={'Preferred Date'} 
                    />
                    <div className='blood-type'>
                        <select name='bloodType' { ...register('bloodType',  { required: true })} >
                            <option value='Any' >Any</option>
                            <option value='A+' >A+</option>
                            <option value='A-' >A-</option>
                            <option value='B+' >B+</option>
                            <option value='B-' >B-</option>
                            <option value='O+' >O+</option>
                            <option value='O-' >O-</option>
                            <option value='AB+'>AB+</option>
                            <option value='AB-'>AB-</option>
                        </select>
                    </div>
                    <div className='city'>
                        <DatalistInput
                            id="city"
                            name='city'
                            placeholder="City"
                            value={city}
                            items={cities}
                        /> 
                    </div>
                    <button onClick={handleSubmit(submit)}>Submit Donation</button>
                </form>
            </main>);
}

export default BloodDonation;