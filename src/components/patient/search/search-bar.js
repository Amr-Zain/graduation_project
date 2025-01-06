import { BiSearch } from 'react-icons/bi';
import { setFilter } from '../../../features/search'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getCitiesAndSpecializations } from '../../../features/cities-specializations'
import 'react-datalist-input/dist/styles.css';
import { useEffect } from 'react';
import DataList from './data-list';
import { bloodTypes, searchTypes } from '../../../api/api';
import Input from './input';
import HandleUrl from '../../../util/handle-url-filter';
const SearchBar = ({ removeOverlay })=>{
    const {filter:{searchFor, 
        city, 
        specialization, 
        bloodType,
        name, 
        },
        } = useSelector(store=>store.search);
    const filter = useSelector(store=>store.search.filter)
    const { cities, specializations } = useSelector(store=>store.citiesAndSpecializations);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(cities.length === 0 && specializations.length === 0 ) dispatch(getCitiesAndSpecializations());
        else if(cities.length === 0 )dispatch(getCitiesAndSpecializations('cities'));
        else if(specializations.length === 0 )dispatch(getCitiesAndSpecializations('specializations'));
    },)
    return(<>
                <div className='search-for'>
                    <DataList name ='searchFor' value ={searchFor} items ={searchTypes}/>
                </div>
                <div className='city'>
                    <DataList name='city'value={city} items={cities} /> 
                </div>
                { 
                    searchFor === 'doctor'
                    &&
                    <DataList name ='specialization' value ={specialization} items ={specializations}/>
                }
                { 
                    (searchFor === 'donation_request'|| searchFor === 'donator') 
                    && 
                    <DataList name ='bloodType' value ={bloodType} items ={bloodTypes}/>
                }
                {
                    (searchFor === 'doctor'|| searchFor === 'nurse') 
                    && 
                    <div className='name'>
                        <input 
                            className = 'text-name'
                            type = 'search'
                            value = { name }
                            onChange = { (e)=>dispatch(setFilter({[e.target.name]:e.target.value})) }
                            name ='name'
                            placeholder = { `Name Of The ${String(searchFor).charAt(0).toUpperCase()+ String(searchFor).slice(1)}`  }
                        />
                    </div>
                }
                    <div style={{order:'10'}} className='search-button'>
                        <button  
                        onClick={()=>{ 
                            if(removeOverlay) removeOverlay();
                            navigate(HandleUrl(filter))
                        }} 
                        className='icon-search'
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                if(removeOverlay) removeOverlay();
                                navigate(HandleUrl(filter));
                            }
                            }}
                        >
                            <BiSearch /> Search
                        </button>
                    </div>
            </>);}

export default SearchBar;