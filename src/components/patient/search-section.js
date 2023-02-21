import { BiSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { setFilter, getCitiesAndSpecialization, getSearchResult } from '../../features/search'
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import '../../style/search-section.css'
import { useNavigate } from 'react-router-dom';
import { DOCTOR, NURSE, SEARCH, DONATION_REQUEST, DONATOR } from '../../constants/routes';
const Search = ()=>{
    const { cities, specializations, searchFor, city, specialization, bloodType,name } = useSelector(store=>store.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = ()=>{
        //dispatch(getSearchResult())
        var route='';
        if(searchFor === 'doctor')
            route = `${SEARCH}${DOCTOR}/${city.value ? city.value:'all'}/${specialization.value ? specialization.value : 'all'}?name=${name}`;
        else if(searchFor === 'nurse')
            route = `${SEARCH}${NURSE}/${city.value ? city.value:'all'}?name=${name}`;
        else if(searchFor === 'blood donator') 
        route = `${SEARCH}${DONATOR}/${city.value ? city.value:'all'}/${bloodType}`;
        else route = `${SEARCH}${DONATION_REQUEST}/${city.value ? city.value:'all'}/${bloodType}`;
        console.log('route')
        console.log(route);
        navigate(route);
    }
    useEffect(() => {
        if(cities.length === 0) {
            dispatch(getCitiesAndSpecialization());
        }
    }, []);
    return(
        <section className="search-section" id ={'search-bar'}>
            <div style={{display:'flex'}}>
                <div>
                    <select className='search-for' name="searchFor" onChange={(e)=>dispatch(setFilter({searchFor:e.target.value}))}>
                        <option id='1' value='doctor'>Doctor</option>
                        <option id='2' value='nurse'>Nurse</option>
                        <option id='3' value='blood donator'>Blood Donator</option>
                        <option id='4' value='blood request'>Blood Request </option>
                    </select>
                </div>
                <div className='city'>
                    <DatalistInput
                        id="city"
                        name='city'
                        placeholder="City"
                        onSelect={(value) =>dispatch(setFilter( { city: value })) }
                        items={cities}
                    /> 
                </div>
                { 
                searchFor == 'doctor'&& 
                <div className='specialization '>
                    <DatalistInput
                    
                        id="specialization"
                        name='specialization'
                        placeholder="Specialization"
                        onSelect={(value) =>dispatch(setFilter( { specialization: value })) }
                        items={specializations}
                    /> 
                </div>
                }
                { 
                (searchFor == 'blood donator'|| searchFor == 'blood request') && 
                    <div className='blood-type'>
                        <select className='blood-text' name='bloodType' onChange={(e)=>dispatch(setFilter({bloodType:e.target.value}))} >
                            <option >A+</option>
                            <option >A-</option>
                            <option >B+</option>
                            <option >B-</option>
                            <option >O+</option>
                            <option >O-</option>
                            <option >AB+</option>
                            <option >AB-</option>
                        </select>
                    </div>
                }

                {(searchFor == 'doctor'|| searchFor == 'nurse') &&
                <div className='blood-type '> 
                    <input 
                    className='text-name'
                    type='text' 
                    onChange={(e)=>dispatch(setFilter({name:e.target.value}))}
                    name='name'
                    placeholder='Name'
                    />
                </div>}
                <div className='search-button'>
                    <button onClick={handleSearch} className='icon-search'>
                        <BiSearch /> search
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Search;