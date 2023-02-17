import { BiSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { setFilter, setUrl, getCitiesAndSpecialization, getSearchResult } from '../../../features/search'
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import '../../../style/search-section.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { DOCTOR, NURSE, SEARCH, DONATION_REQUEST, DONATOR } from '../../../constants/routes';
const Search = ({ isDashboar })=>{
    const { cities, specializations, searchFor, city, specialization, bloodType,name, gender, availability, sort } = useSelector(store=>store.search.filter);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams, setSearchParams ] = useSearchParams();
    const handleChange = (e)=>dispatch(setFilter({[e.target.name]:e.target.value}));
    const query = searchParams.values;
    const handleSearch = ()=>{
        dispatch(getSearchResult())
        var route='';
        if(searchFor === 'doctor')
            route = `${SEARCH}${DOCTOR}/${city ? city:'all'}/${specialization ? specialization : 'all'}`;
        else if(searchFor === 'nurse')
            route = `${SEARCH}${NURSE}/${city ? city:'all'}?name=${name}`;
        else if(searchFor === 'blood donator') 
        route = `${SEARCH}${DONATOR}/${city ? city:'all'}/${bloodType}`;
        else route = `${SEARCH}${DONATION_REQUEST}/${city ? city:'all'}/${bloodType}`;
        dispatch(setUrl({url:route}))
        setSearchParams({ name, gender, availability, sort },route)
        //console.log('route')
        console.log(route);
        navigate(route);
    }
    useEffect(() => {
        if(cities.length === 0) {
            dispatch(getCitiesAndSpecialization());
        }
    }, []);
    return(<section className="search-section">
                <div>
                    <select className='search-for' name="searchFor" onChange={ handleChange }>
                        <option id='1' value='doctor' checked={searchFor==='doctor'}>Doctor</option>
                        <option id='2' value='nurse' checked={searchFor==='nurse'}>Nurse</option>
                        <option id='3' value='blood donator' checked={searchFor==='blood donator'}>Blood Donator</option>
                        <option id='4' value='blood request' checked={searchFor==='blood request'}>Blood Request </option>
                    </select>
                </div>
                <div className='city'>
                    <DatalistInput
                        id="city"
                        name='city'
                        placeholder="City"
                        value={city}
                        onSelect={({ value })=>dispatch(setFilter({city: value})) }
                        items={cities}
                    /> 
                </div>
                { 
                searchFor === 'doctor'&& 
                <div className='specialization'>
                    <DatalistInput
                        value={specialization}
                        id="specialization"
                        name='specialization'
                        placeholder="Specialization"
                        onSelect={ ({ value })=>dispatch(setFilter({specialization: value})) }
                        items={specializations}
                    /> 
                </div>
                }
                { 
                (searchFor === 'blood donator'|| searchFor === 'blood request') && 
                    <div className='blood-type'>
                        <select name='bloodType' onChange={ handleChange } >
                            <option value='A+' checked={bloodType==='A+'} >A+</option>
                            <option value='A-' checked={bloodType==='A-'}>A-</option>
                            <option value='B+' checked={bloodType==='B+'}>B+</option>
                            <option value='B-' checked={bloodType==='B-'}>B-</option>
                            <option value='O+' checked={bloodType==='O+'}>O+</option>
                            <option value='O-' checked={bloodType==='O-'}>O-</option>
                            <option value='AB+'checked={bloodType==='AB+'}>AB+</option>
                            <option value='AB-'checked={bloodType==='AB-'}>AB-</option>
                        </select>
                    </div>
                }

                {(searchFor === 'doctor'|| searchFor === 'nurse') &&
                    <div className='blood-type '> 
                        <input 
                        className='text-name'
                        type='text'
                        value={name}
                        onChange={handleChange}
                        name='name'
                        placeholder='Name'
                        />
                    </div>}
                    <div className='search-button'>
                        <button onClick={handleSearch} className='icon-search'>
                            <BiSearch /> search
                        </button>
                    </div>
            </section>);}

export default Search;