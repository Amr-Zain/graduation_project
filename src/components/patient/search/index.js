import SearchSection from './search-section'
import SearchFilter from './search-filter';
import SearchResults from './search-results';
import '../../../style/search-section.css'
import '../../../style/search-filter.css'
import '../../../style/search-filter-overlay.css'


function Search() {
    return (<>
            <section className={"search-section"}>
                <SearchSection isOverlay={false}/>
            </section>
            <div className="search-body" style={{display:'flex',justifyContent:'space-between'}}>
                <SearchFilter />
                <SearchResults />
            </div> 
        </>);
}
export default Search;