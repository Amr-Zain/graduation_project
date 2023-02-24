import SearchSection from './search-section'
import SearchFilter from './search-filter';
import SearchResults from './search-results';
import '../../../style/search-section.css'
import '../../../style/search-filter.css'
import '../../../style/search-filter-overlay.css'
import SearchPagination from './search-pagination';


function Search() {
    return (<>
            <section className={"search-section"}>
                <SearchSection isOverlay={false}/>
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