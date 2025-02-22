import { BiSearch } from 'react-icons/bi';
import { setFilter } from '../../../features/search'
import { useSelector, useDispatch } from "react-redux";
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getCitiesAndSpecializations } from '../../../features/cities-specializations'
import 'react-datalist-input/dist/styles.css';
import { useEffect } from 'react';
import DataList from './data-list';
import { bloodTypes, searchTypes } from '../../../api/api';
import { PATIENT, SEARCH } from '../../../constants/routes';
import '../../../style/search-section.css'
import { Button } from 'react-bootstrap';
const SearchBar = ({ isOverlay, removeOverlay })=>{

    const {searchFor, availability, sort, page, specialization, name, gender, bloodType, city } = useSelector(store=>store.search.filter);
    const { cities, specializations } = useSelector(store=>store.citiesAndSpecializations);
    const dispatch = useDispatch();
    const [ , setSearshParams ] = useSearchParams();
    const navigate = useNavigate();
    const handleSearch = () => {
        if (removeOverlay) removeOverlay();
        const queries = { searchFor, city, availability, sort, page }
        if(searchFor === 'donator' || searchFor === 'donation_request') queries.bloodType = bloodType;
        else {
            if(searchFor ==='doctor')queries.specialization = specialization;
            queries.name = name; 
            queries.gender = gender;
        }
        if(!isOverlay) {
            navigate({
                pathname: `/${PATIENT}/${SEARCH}`,
                search:`?${createSearchParams(queries)}`
            });
        }
        else{
            setSearshParams(queries);
        }
    };

    const handleChange = (name, value) => {
        dispatch(setFilter({ [name]: value }));
    };
    useEffect(()=>{
        if(cities.length === 0)dispatch(getCitiesAndSpecializations());
    },[])
return(<>
        <div className="search-for">
            <DataList name="searchFor" value={searchFor} items={searchTypes} onChange={handleChange} />
        </div>
        <div className="city">
            <DataList name="city" value={city} items={cities} onChange={handleChange} />
        </div>
        {searchFor === 'doctor' && (
            <DataList
            name="specialization"
            value={specialization}
            items={specializations}
            onChange={handleChange}
            />
        )}
        {['donation_request', 'donator'].includes(searchFor) && (
            <DataList name="bloodType" value={bloodType} items={bloodTypes} onChange={handleChange} />
        )}
        {['doctor', 'nurse'].includes(searchFor) && (
            <div className="name">
            <input
                className="text-name"
                type="search"
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
                name="name"
                placeholder={`Name Of The ${
                searchFor.charAt(0).toUpperCase() + searchFor.slice(1)
                }`}
            />
            </div>
        )}
        <div style={{ order: '10' }} >
            <Button 
                onClick={handleSearch}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                    handleSearch();
                    }
                }}
                variant="primary" 
                type="submit" 
                style={{whiteSpace:'nowrap'}}
            >
                 <BiSearch /> Search
            </Button>
        </div>
        </>);}

export default SearchBar;