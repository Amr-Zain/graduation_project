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
    return createPortal(
        <>
            <aside className="search-filter-overlay">
                <SearchSection  />
                <SearchFilter overlay={true} />
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