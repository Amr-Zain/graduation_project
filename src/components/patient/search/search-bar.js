import { BiSearch } from 'react-icons/bi';
import { setFilter } from '../../../features/search'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getCitiesAndSpecializations } from '../../../features/cities-specializations'
import 'react-datalist-input/dist/styles.css';
import { useEffect } from 'react';
import DataList from './data-list';
import { bloodTypes, searchTypes } from '../../../api/api';
import HandleUrl from '../../../util/handle-url-filter';
const SearchBar = ({ removeOverlay })=>{

const filter = useSelector(store=>store.search.filter);
const { cities, specializations } = useSelector(store=>store.citiesAndSpecializations);
const dispatch = useDispatch();
const navigate = useNavigate();
const handleSearch = () => {
    if (removeOverlay) removeOverlay();
    navigate(HandleUrl(filter));
    };

    const handleChange = (name, value) => {
    dispatch(setFilter({ [name]: value }));
    };
    useEffect(()=>{
        if(cities.length === 0)dispatch(getCitiesAndSpecializations());
    },)
return(<>
        <div className="search-for">
            <DataList name="searchFor" value={filter.searchFor} items={searchTypes} onChange={handleChange} />
        </div>
        <div className="city">
            <DataList name="city" value={filter.city} items={cities} onChange={handleChange} />
        </div>
        {filter.searchFor === 'doctor' && (
            <DataList
            name="specialization"
            value={filter.specialization}
            items={specializations}
            onChange={handleChange}
            />
        )}
        {['donation_request', 'donator'].includes(filter.searchFor) && (
            <DataList name="bloodType" value={filter.bloodType} items={bloodTypes} onChange={handleChange} />
        )}
        {['doctor', 'nurse'].includes(filter.searchFor) && (
            <div className="name">
            <input
                className="text-name"
                type="search"
                value={filter.name}
                onChange={(e) => handleChange('name', e.target.value)}
                name="name"
                placeholder={`Name Of The ${
                filter.searchFor.charAt(0).toUpperCase() + filter.searchFor.slice(1)
                }`}
            />
            </div>
        )}
        <div style={{ order: '10' }} className="search-button">
            <button
            className="icon-search"
            onClick={handleSearch}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                handleSearch();
                }
            }}
            >
            <BiSearch /> Search
            </button>
        </div>
        </>);}

export default SearchBar;