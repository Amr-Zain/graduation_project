import { MdFilterListAlt } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from '../../../features/search';
import SearchFilterOverlay from "./search-filter-overlay";
import ResultCard from "./result-card";
import '../../../style/search-results.css'
import '../../../style/result-card.css';
import { useEffect, useState } from 'react';
import { getSearchResult } from '../../../features/search'
import { Row } from 'react-bootstrap';
import BloodCard from './blood-results';
function SearchResults() {
    const { filter:{ for:searchFor, sort }, url,result:{data, count} } = useSelector(store=>store.search);
    const dispatch = useDispatch();
    const [ overlay, setOverlay ] = useState(false);
    const handleChange = (e)=>dispatch(setFilter({[e.target.name]:e.target.value}))
    const Result = (searchFor ==='doctor' || searchFor  === 'nurse')? ResultCard : BloodCard;
    const ResultsItems = data.map(item=><Result key={item.id} {...item} />)
    useEffect(()=>{
        dispatch(getSearchResult())
    },[url])
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
                            <select name="sort" value={sort} onChange={handleChange}>
                                <option id='0' value = '0'>Best Matched</option>
                                {(searchFor === 'doctor' || searchFor==='nurse')&&<option id='1' value='1'>Top Rating</option>}
                                <option id='2' value='2'>{(searchFor === 'doctor' || searchFor==='nurse')?"Price Low to High":"Free"}</option>
                                <option id='3' value='3'>{(searchFor === 'doctor' || searchFor==='nurse')?"Price High to Low":"Paid"}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='results' >
                    <Row style={{width: '100%',margin: '0'}}>
                        {ResultsItems}
                    </Row>
                </div>
            </aside>
            {overlay && <SearchFilterOverlay setOverlay={setOverlay} />}
            </>);
}

export default SearchResults;