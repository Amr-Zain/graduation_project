import SearchFilter from "./search-filter";
import SearchSection from './search-section'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from 'react-router-dom';
import { SEARCH } from '../../../constants/routes';
import {  setUrl } from '../../../features/search'
function SearchFilterOverlay({setOverlay}) {
    const { cities, specializations, searchFor, city, specialization, bloodType,name, gender, availability, sort } = useSelector(store=>store.search.filter);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    return createPortal(
        <>
            <aside className="search-filter-overlay">
                <SearchSection isDashboard={false} />
                <SearchFilter overlay={true} />
                <button onClick={()=>setOverlay(false)}>done</button>
            </aside>
            <div onClick={()=>{ setOverlay(false) }} className="over" style={{
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    zIndex:"50",
                    backgroundColor: 'rgb(0 0 0 / 60%)',
                    display:'block'
                }}></div>
        </>
            ,
            document.getElementById('root2'));
}

export default SearchFilterOverlay;