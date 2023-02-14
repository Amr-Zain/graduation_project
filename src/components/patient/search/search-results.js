import { MdFilterListAlt } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from '../../../features/search';
import { useNavigate } from 'react-router-dom';
import SearchFilterOverlay from "./search-filter-overlay";
import '../../../style/search-results.css'
import { useEffect, useState } from 'react';
import { getSearchResult } from '../../../features/search'
function SearchResults() {
    const { searchFor ,result:{data, count} } = useSelector(store=>store.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ overlay, setOverlay ] = useState(false);
    useEffect(()=>{
        //dispatch(getSearchResult())
    })
    return ( 
        <>
            <aside className="search-results">
                <div className='search-sort'>
                    <div className='filter-icon' onClick={()=>setOverlay(true)}>
                        <MdFilterListAlt /> <p>filter</p>
                    </div>
                    <div className='search-sort-select'>
                        <div className='result-count'>
                            Search results: {count}
                        </div>
                        <div>
                            <label> sort by: </label>
                            <select name="searchFor" onChange={(e)=>dispatch(setFilter({sort:e.target.value}))}>
                                <option id='0' value = '0'>Best Matched</option>
                                <option id='1' value='1'>Top Rating</option>
                                <option id='2' value='2'>Price Low to High</option>
                                <option id='3' value='3'>Price High To Low</option>
                            </select>
                        </div>
                    </div>
                </div>
                results
            </aside>
            {overlay && <SearchFilterOverlay setOverlay={setOverlay} />}
            </>);
}

export default SearchResults;