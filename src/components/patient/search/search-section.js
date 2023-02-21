import { BiSearch } from 'react-icons/bi';
import { setFilter, setUrl } from '../../../features/search'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from 'react-router-dom';
import { SEARCH } from '../../../constants/routes';
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
const SearchSection = ()=>{
    const { cities, specializations, searchFor, city, specialization, bloodType,name, gender, availability, sort } = useSelector(store=>store.search.filter);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e)=>dispatch(setFilter({[e.target.name]:e.target.value}));
    const handleSearch = ()=>{
        const route = `${SEARCH}/${searchFor}/${city ? city:'all'}`;
        let queries;
        if(searchFor === 'doctor' ) queries = { name, specialization, gender,  availability, sort};
        else if(searchFor === 'nurse') queries = { name, gender, availability, sort } ;
        else if(searchFor === 'donator' || searchFor === 'donation_request') queries = { bloodType, availability, sort };
        dispatch(setUrl({url:route+ `?${createSearchParams(queries)}`}));
        navigate({
            pathname: route,
            search: `?${createSearchParams(queries)}`,
        });
    }

    
    return(<>
                <div className='search-for'>
                    <select className='search-for' value={searchFor} name="searchFor" onChange={ handleChange }>
                        <option id='1' value='doctor'>Doctor</option>
                        <option id='2'value='nurse' >Nurse</option>
                        <option id='3'value='donator' >Blood Donator</option>
                        <option id='4'value='donation_request' >Blood Request </option>
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
                (searchFor === 'donation_request'|| searchFor === 'donator') && 
                    <div className='blood-type'>
                        <select name='bloodType'  value={bloodType}  onChange={ handleChange } >
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
                }

                {(searchFor === 'doctor'|| searchFor === 'nurse') &&
                    <div className='name'> 
                        <input 
                        className='text-name'
                        type='text'
                        value={name}
                        onChange={handleChange}
                        name='name'
                        placeholder='Name'
                        />
                    </div>}
                    <div style={ {order:'10'}} className='search-button'>
                        <button onClick={handleSearch} className='icon-search'>
                            <BiSearch /> search
                        </button>
                    </div>
            </>);}

export default SearchSection;