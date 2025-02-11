import SearchBar from './search-bar'
import SearchFilter from './search-filter';
import SearchResults from './search-results';
import '../../../style/search-section.css'
import '../../../style/search-filter.css'
import '../../../style/search-filter-overlay.css'
import SearchPagination from './search-pagination';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../../features/search';


function Search() {
    //I should get the queires in hear and set the state of filter to be reltive to it
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setFilter(Object.fromEntries(searchParams)));
    },[searchParams])
    return (<>
            <section className={"search-section"}>
                <SearchBar isOverlay={false}/>
            </section>
            <div className="search-body" style={{display:'flex',justifyContent:'space-between'}}>
                <SearchFilter />
                <div className='result-pagination'>
                    <SearchResults />
                    <SearchPagination />
                </div>
            </div> 
        </>);
}
export default Search;